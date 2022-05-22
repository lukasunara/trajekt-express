package com.example.trajektexpress.view.fragment

import android.graphics.Rect
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.trajektexpress.R
import com.example.trajektexpress.databinding.FragmentTripsBinding
import com.example.trajektexpress.util.adapter.TripsAdapter
import com.example.trajektexpress.viewmodel.TripsViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class TripsFragment() : BaseFragment() {

    private var _binding: FragmentTripsBinding? = null
    private val binding: FragmentTripsBinding
        get() = _binding!!

    private val tripsViewModel : TripsViewModel by viewModels()

    private val tripsAdapter = TripsAdapter()

    private val args : TripsFragmentArgs by navArgs()

    private var tripsItemDecoration = object : RecyclerView.ItemDecoration() {
        override fun getItemOffsets(outRect: Rect, itemPosition: Int, parent: RecyclerView) {
            outRect.bottom = resources.getDimensionPixelSize(R.dimen.trips_padding)
            outRect.right = resources.getDimensionPixelSize(R.dimen.trips_padding)
            outRect.left = resources.getDimensionPixelSize(R.dimen.trips_padding)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTripsBinding.inflate(layoutInflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        tripsViewModel.getTrips()

        binding.pozdrav.text = "Pozdrav, ${args.ime}"
        initRecyclerView()
        observeLiveData()

        initLayout()
    }

    private fun initLayout() {
        binding.apply {
            btnFiltriraj.setOnClickListener {
                val polaziste = textFieldInput.text
                if(polaziste.isNullOrBlank()){
                    Toast.makeText(requireContext(), "Unesite polazište!", Toast.LENGTH_SHORT).show()
                    tripsViewModel.getTrips()
                }else{
                    tripsAdapter.filtriraj(polaziste.toString())
                }
            }
        }
    }

    private fun observeLiveData() {
        tripsViewModel.trips.observe(viewLifecycleOwner){
            tripsAdapter.setTrips(it.trips)
        }

        tripsViewModel.tripsFail.observe(viewLifecycleOwner){
            Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
            Log.d("ALO", it)
        }
    }

    private fun initRecyclerView() {
        binding.rvTrips.apply {
            adapter = tripsAdapter
            layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
            addItemDecoration(tripsItemDecoration)
        }
    }
}