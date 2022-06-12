package com.dicoding.dhimas.rasaapp.ui.home

import android.app.Application
import androidx.lifecycle.ViewModel
import com.dicoding.dhimas.rasaapp.data.repository.FoodRepository

class HomeViewModel(application: Application) : ViewModel() {
    private val repository = FoodRepository(application)

    fun getDetailMakanan(id: String) = repository.detailMakanan(id)
}