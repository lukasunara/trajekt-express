package com.example.trajektexpress.di

import android.content.Context
import android.util.Log
import com.chuckerteam.chucker.api.ChuckerInterceptor
import com.example.trajektexpress.BuildConfig
import com.example.trajektexpress.networking.TrajektExpressService
import com.squareup.moshi.JsonDataException
import com.squareup.moshi.JsonReader
import com.squareup.moshi.Moshi
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import okio.Buffer
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.moshi.MoshiConverterFactory
import javax.inject.Singleton
import com.squareup.moshi.adapters.Rfc3339DateJsonAdapter
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import java.util.*

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    internal enum class Flavour {
        DEV,
        PROD;

        companion object {
            fun fromString(string: String): Flavour {
                return when {
                    string.contains("dev") -> DEV
                    else -> PROD
                }
            }
        }
    }

    internal enum class Type {
        DEBUG,
        RELEASE;

        companion object {
            fun fromString(string: String): Type {
                return when (string) {
                    "debug" -> DEBUG
                    else -> RELEASE
                }
            }
        }
    }

    object BuildType {

        private val flavour: Flavour = Flavour.fromString(BuildConfig.FLAVOR)
        private val type: Type = Type.fromString(BuildConfig.BUILD_TYPE)

        val isDev: Boolean = flavour == Flavour.DEV
        val isProd: Boolean = flavour == Flavour.PROD

        val isDebug = type == Type.DEBUG
        val isRelease = type == Type.RELEASE

        val prefsPrefix: String by lazy {
            when (flavour) {
                Flavour.PROD -> ""
                Flavour.DEV -> "dev"
            }
        }

        val prefsSecondPrefix: String by lazy {
            when (type) {
                Type.RELEASE -> ""
                Type.DEBUG -> "debug"
            }
        }
    }

    @Provides
    @Singleton
    fun provideApiService(retrofit: Retrofit): TrajektExpressService {
        return retrofit.create(TrajektExpressService::class.java)
    }

    @Provides
    fun provideRetrofit(moshi: Moshi, okHttpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .baseUrl(BuildConfig.BASE_URL)
            .client(okHttpClient)
            .build()
    }

    @Provides
    fun provideOkHttpClient(
        @ApplicationContext context: Context,
    ): OkHttpClient {
        return OkHttpClient()
            .newBuilder()
            .addInterceptor(ChuckerInterceptor.Builder(context).build())
            .addInterceptor(loggingInterceptor())
            .build()
    }

    @Provides
    fun provideMoshi(): Moshi =
        Moshi.Builder()
            .add(KotlinJsonAdapterFactory())
            .add(Date::class.java, Rfc3339DateJsonAdapter().nullSafe())
            .build()

    private fun loggingInterceptor(): Interceptor {
        val logTag = "OkHttp"
        return HttpLoggingInterceptor { message ->
            if (message.startsWith("{") || message.startsWith("[")) {
                try {
                    val prettyJson = formatMessageIntoPrettyJson(message)
                    Log.d(logTag, prettyJson)
                } catch (exception: JsonDataException) {
                }
            } else {
            }
        }.apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
    }


    private fun formatMessageIntoPrettyJson(message: String): String {
        val bufferedMessage = Buffer().writeUtf8(message)
        val reader = JsonReader.of(bufferedMessage)
        val uglyJson = reader.readJsonValue()
        val adapter = Moshi.Builder()
            .build()
            .adapter(Any::class.java)
            .indent("    ")
        return adapter.toJson(uglyJson)
    }
}