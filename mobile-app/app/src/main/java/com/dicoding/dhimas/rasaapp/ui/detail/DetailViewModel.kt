package com.dicoding.dhimas.rasaapp.ui.detail

import android.app.Application
import androidx.lifecycle.ViewModel
import com.dicoding.dhimas.rasaapp.data.repository.FoodRepository

class DetailViewModel(application: Application) : ViewModel() {
    private val repository = FoodRepository(application)

    fun getDetailMakanan(id: String) = repository.detailMakanan(id)
}