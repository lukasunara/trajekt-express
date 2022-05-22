package com.example.trajektexpress.model

data class Trip(
    val departure : String,
    val destination : String,
    val departureTime : String,
    val arrivalTime : String,
    val price : String
)