package com.example.trajektexpress.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import com.example.trajektexpress.networking.model.TripsNetworkResponse
import com.example.trajektexpress.networking.repository.TripRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import io.reactivex.android.schedulers.AndroidSchedulers
import javax.inject.Inject

@HiltViewModel
class TripsViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val tripRepository: TripRepository
): ViewModel() {

    protected val disposables = CompositeDisposable()

    override fun onCleared() {
        super.onCleared()
        disposables.dispose()
    }

    private val _trips = MutableLiveData<TripsNetworkResponse>()
    val trips: LiveData<TripsNetworkResponse>
        get() = _trips

    private val _tripsFail = MutableLiveData<String>()
    val tripsFail: LiveData<String>
        get() = _tripsFail

    fun getTrips(){
        disposables.add(
            tripRepository
                .getAllTrips()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe({
                    _trips.value = it
                }, {
                    _tripsFail.value = it.message
                })
        )
    }
}