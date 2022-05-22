package com.example.trajektexpress.networking

import com.example.trajektexpress.networking.model.TripsNetworkResponse
import io.reactivex.Single
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface TrajektExpressService {

    @GET("/trips/getAll")
    fun getAllTrips() : Single<TripsNetworkResponse>

    @DELETE("/trips/delete/{tripId}")
    fun deleteTrip(@Path("tripId") tripId: Int) : Single<Unit>
}