package com.dicoding.dhimas.rasaapp.ui.main

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.dicoding.dhimas.rasaapp.R
import com.dicoding.dhimas.rasaapp.adapter.ViewPagerAdapter
import com.dicoding.dhimas.rasaapp.databinding.ActivityMainBinding
import com.dicoding.dhimas.rasaapp.ui.history.HistoryFragment
import com.dicoding.dhimas.rasaapp.ui.home.HomeFragment
import com.dicoding.dhimas.rasaapp.ui.list.ListFragment
import me.relex.circleindicator.CircleIndicator3

class MainActivity : AppCompatActivity(){
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val historyFragment = HistoryFragment()
        val homeFragment = HomeFragment() {
            historyFragment.checkToken()
        }
        val listFragment = ListFragment()


        val fragments: ArrayList<Fragment> = arrayListOf(
            listFragment,
            homeFragment,
            historyFragment,
        )

        val adapter = ViewPagerAdapter(fragments, this)
        binding.viewPager.adapter = adapter

        // jika menambah animasi
        // viewPager.setPageTransformer(DepthPageTransformer())
        binding.viewPager.currentItem = binding.viewPager.currentItem + 1

        val indicator:CircleIndicator3 = findViewById<CircleIndicator3>(R.id.indicator_nav)
        indicator.setViewPager(binding.viewPager)
    }

    override fun onBackPressed() {
        if (binding.viewPager.currentItem == 1){
            super.onBackPressed()
        }else if (binding.viewPager.currentItem == 2){
            binding.viewPager.currentItem = binding.viewPager.currentItem - 1
        }else if (binding.viewPager.currentItem == 0){
            binding.viewPager.currentItem = binding.viewPager.currentItem + 1
        }
    }
}