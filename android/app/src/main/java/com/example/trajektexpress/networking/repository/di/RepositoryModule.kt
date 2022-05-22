package com.example.trajektexpress.networking.repository.di

import com.example.trajektexpress.networking.repository.ITripRepository
import com.example.trajektexpress.networking.repository.TripRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    abstract fun bindLoginRepository(authRepository: TripRepository): ITripRepository
}