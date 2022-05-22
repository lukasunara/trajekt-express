package com.example.trajektexpress.util.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.trajektexpress.databinding.ItemTripBinding
import com.example.trajektexpress.model.Trip
import com.example.trajektexpress.networking.model.TripNR
import com.example.trajektexpress.networking.model.TripsNetworkResponse

class TripsAdapter(private var trips: MutableList<TripNR> = mutableListOf()) :
    RecyclerView.Adapter<TripsAdapter.TripsVH>() {

    private lateinit var tripsInteractionListener: InteractionListener

    interface InteractionListener{
        fun onClick(trip : TripNR)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TripsVH {
        val binding = ItemTripBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return TripsVH(binding)
    }

    override fun onBindViewHolder(holder: TripsVH, position: Int) {
        holder.bind(trips[position])
    }

    override fun getItemCount(): Int {
        return trips.size
    }

    fun setTrips(newTrips: List<TripNR>) {
        trips.clear()
        trips.addAll(newTrips)
        notifyDataSetChanged()
    }

    fun setInteractionListener(interactionListener: InteractionListener){
        tripsInteractionListener = interactionListener
    }


    inner class TripsVH(private val binding: ItemTripBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(trip: TripNR) {
            binding.apply {
                departure.text = trip.ferryRoute.departureCity.name
                departureTime.text = trip.schedule.departureTime
                destination.text = trip.ferryRoute.destinationCity.name
                arrivalTime.text = trip.schedule.arrivalTime
                price.text = "Cijena: ${trip.price} kn"

                root.setOnClickListener {
                    tripsInteractionListener.onClick(trip)
                }
            }
        }
    }
}