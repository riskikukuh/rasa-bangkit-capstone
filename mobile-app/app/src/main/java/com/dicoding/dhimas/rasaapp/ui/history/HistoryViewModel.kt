package com.dicoding.dhimas.rasaapp.ui.history

import android.app.Application
import androidx.lifecycle.ViewModel
import com.dicoding.dhimas.rasaapp.data.repository.FoodRepository

class HistoryViewModel(application: Application) : ViewModel() {
    private val repository = FoodRepository(application)

    fun getHistoryMakanan(headers: Map<String, String>) = repository.historyMakanan(headers)
}