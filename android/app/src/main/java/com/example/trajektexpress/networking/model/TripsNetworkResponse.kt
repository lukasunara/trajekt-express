package com.example.trajektexpress.networking.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

data class TripsNetworkResponse(
    val trips: List<TripNR>
)

@Parcelize
data class TripNR(
    val tripId: Double,
    val price: String,
    val schedule: Schedule,
    val ferryRoute: FerryRoute
) : Parcelable

@Parcelize
data class Schedule(
    val scheduleId: Double,
    val departureTime: String,
    val arrivalTime: String,
    val duration: String
) : Parcelable

@Parcelize
data class FerryRoute(
    val routeId: Double,
    val departureCity: City,
    val destinationCity: City,
    val travelCompany: TravelCompany,
    val ferry: Ferry
) : Parcelable

@Parcelize
data class City(
    val postalNumber: String,
    val name: String,
    val country: Country,
) : Parcelable

@Parcelize
data class Country(
    val countryCode: String,
    val name: String
) : Parcelable

@Parcelize
data class TravelCompany(
    val travelCompanyId: Double,
    val CID: String,
    val name: String
) : Parcelable

@Parcelize
data class Ferry(
    val ferryId: Double,
    val name: String,
    val capacity: Double,
    val canTransportVehicles: Boolean
) : Parcelable