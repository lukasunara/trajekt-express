package com.example.trajektexpress.networking.model

data class TripsNetworkResponse(
    val trips : List<TripNR>
)

data class TripNR(
    val tripId : Double,
    val price : String,
    val schedule : Schedule,
    val ferryRoute : FerryRoute
)

data class Schedule(
    val scheduleId : Double,
    val departureTime : String,
    val arrivalTime : String,
    val duration : String
)

data class FerryRoute(
    val routeId : Double,
    val departureCity : City,
    val destinationCity : City,
    val travelCompany : TravelCompany,
    val ferry : Ferry
)

data class City(
    val postalNumber : String,
    val name : String,
    val country : Country,
)

data class Country(
    val countryCode : String,
    val name : String
)

data class TravelCompany(
    val travelCompanyId : Double,
    val CID : String,
    val name : String
)

data class Ferry(
    val ferryId : Double,
    val name : String,
    val capacity : Double,
    val canTransportVehicles : Boolean
)