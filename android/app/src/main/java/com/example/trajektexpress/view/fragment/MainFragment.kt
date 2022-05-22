package com.example.trajektexpress.view.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.example.trajektexpress.R
import com.example.trajektexpress.databinding.FragmentMainBinding
import dagger.hilt.android.AndroidEntryPoint


class MainFragment : BaseFragment() {

    private var _binding: FragmentMainBinding? = null
    private val binding: FragmentMainBinding
        get() = _binding!!


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentMainBinding.inflate(layoutInflater, container, false)
        return binding.root
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {

        binding.apply {
            prijaviSe.setOnClickListener {
                val tekst = textFieldInput.text
                if(tekst.isNullOrBlank()) {
                    Toast.makeText(binding.root.context, "Upišite ime!", Toast.LENGTH_SHORT).show()
                }else {
                    val action =
                        MainFragmentDirections.mainFragmentToTripsFragment(tekst.toString())
                    findNavController().navigate(action)
                }
            }
        }
    }
}