package com.dicoding.dhimas.rasaapp.ui.detail

import DetailMakananResponse
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.dicoding.dhimas.rasaapp.databinding.ActivityDetailBinding
import com.dicoding.dhimas.rasaapp.utils.ViewModelFactory

class DetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDetailBinding
    private lateinit var viewModel: DetailViewModel
    private lateinit var id: String
    private lateinit var nama: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()
        binding.toolbar.setNavigationOnClickListener { onBackPressed() }

        viewModel = obtainViewModel(this as AppCompatActivity)

        nama = intent.getStringExtra(EXTRA_NAME) as String
        id = intent.getStringExtra(EXTRA_ID) as String
        viewModel.getDetailMakanan(id).observe(this@DetailActivity) { detail ->
            populateContentDetail(detail)
        }
        binding.btnMap.setOnClickListener {
            val gmmIntentUri = Uri.parse("geo:0,0?q=tempat makan "+nama+" terdekat")
            val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
            mapIntent.setPackage("com.google.android.apps.maps")
            startActivity(mapIntent)
        }
    }

    private fun populateContentDetail(detail: DetailMakananResponse) {
        binding.apply {
            tvDetailNama.text = detail.data.name
            tvDetailProvinsi.text = detail.data.province
            tvDetailKota.text = detail.data.origin
            tvDetailDeskripsi.text = detail.data.description
            Glide.with(this@DetailActivity).load(detail.data.image).into(imgDetailFoto)
        }
    }

    private fun obtainViewModel(activity: AppCompatActivity): DetailViewModel {
        val factory = ViewModelFactory.getInstance(activity.application)
        return ViewModelProvider(activity, factory)[DetailViewModel::class.java]
    }


    companion object {
        const val EXTRA_ID = "extra_id"
        const val EXTRA_NAME = "extra_name"

    }
}