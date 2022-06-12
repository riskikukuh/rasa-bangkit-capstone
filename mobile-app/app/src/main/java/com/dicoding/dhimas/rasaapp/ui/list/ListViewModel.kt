package com.dicoding.dhimas.rasaapp.ui.list

import android.app.Application
import androidx.lifecycle.ViewModel
import com.dicoding.dhimas.rasaapp.data.repository.FoodRepository

class ListViewModel(application: Application) : ViewModel() {
    private val repository = FoodRepository(application)

    fun getListMakanan() = repository.listMakanan()
}