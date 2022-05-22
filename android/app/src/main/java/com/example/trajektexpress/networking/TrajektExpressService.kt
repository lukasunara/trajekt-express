package com.example.trajektexpress.networking

import com.example.trajektexpress.networking.model.TripsNetworkResponse
import io.reactivex.Single
import retrofit2.http.GET

interface TrajektExpressService {

    @GET("/trips/getAll")
    fun getAllTrips() : Single<TripsNetworkResponse>
}