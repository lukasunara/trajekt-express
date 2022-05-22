package com.example.trajektexpress.view.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs
import com.example.trajektexpress.R
import com.example.trajektexpress.databinding.FragmentTripDetailsBinding
import com.example.trajektexpress.databinding.FragmentTripsBinding

class TripDetailsFragment : BaseFragment() {

    private var _binding: FragmentTripDetailsBinding? = null
    private val binding: FragmentTripDetailsBinding
        get() = _binding!!

    private val args: TripDetailsFragmentArgs by navArgs()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTripDetailsBinding.inflate(layoutInflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.apply {
            with(args) {
                tripItem.arrivalTime.text = trip.schedule.arrivalTime
                tripItem.departureTime.text = trip.schedule.departureTime
                tripItem.departure.text = trip.ferryRoute.departureCity.name
                tripItem.destination.text = trip.ferryRoute.destinationCity.name
                tripItem.price.text = "Cijena: ${trip.price} kn"
                travelCompanyName.text = trip.ferryRoute.travelCompany.name
                travelCompanyCid.text = "CID: ${trip.ferryRoute.travelCompany.CID}"
                ferryName.text = trip.ferryRoute.ferry.name
                ferryCapacity.text = "Capacity: ${trip.ferryRoute.ferry.capacity}"
                ferryCanTransport.text = if (trip.ferryRoute.ferry.canTransportVehicles) "YES" else "NO"
            }
        }
    }

}