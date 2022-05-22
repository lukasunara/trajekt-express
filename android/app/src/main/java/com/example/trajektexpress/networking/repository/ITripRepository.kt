package com.example.trajektexpress.networking.repository

import com.example.trajektexpress.networking.model.TripsNetworkResponse
import io.reactivex.Single

interface ITripRepository {
    fun getAllTrips() : Single<TripsNetworkResponse>
}