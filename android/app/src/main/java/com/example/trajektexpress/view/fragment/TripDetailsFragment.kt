package com.example.trajektexpress.view.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.trajektexpress.R
import com.example.trajektexpress.databinding.FragmentTripDetailsBinding
import com.example.trajektexpress.databinding.FragmentTripsBinding

class TripDetailsFragment : BaseFragment() {

    private var _binding: FragmentTripDetailsBinding? = null
    private val binding: FragmentTripDetailsBinding
        get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTripDetailsBinding.inflate(layoutInflater, container, false)
        return binding.root
    }

}