package com.example.trajektexpress.networking.repository

import com.example.trajektexpress.networking.TrajektExpressService
import com.example.trajektexpress.networking.model.TripsNetworkResponse
import io.reactivex.Single
import javax.inject.Inject

class TripRepository @Inject constructor(private val trajektExpressService: TrajektExpressService) : ITripRepository{
    override fun getAllTrips(): Single<TripsNetworkResponse> {
        return trajektExpressService.getAllTrips()
    }

    override fun deleteTrip(tripId: Int): Single<Unit> {
        return trajektExpressService.deleteTrip(tripId)
    }
}