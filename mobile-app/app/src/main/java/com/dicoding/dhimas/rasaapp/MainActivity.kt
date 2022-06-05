package com.dicoding.dhimas.rasaapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import androidx.fragment.app.Fragment
import androidx.viewpager2.widget.ViewPager2
import me.relex.circleindicator.CircleIndicator3

class MainActivity : AppCompatActivity(){
    lateinit var viewPager: ViewPager2

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewPager = findViewById(R.id.view_pager)

        val fragments: ArrayList<Fragment> = arrayListOf(
            ListFragment(),
            HomeFragment(),
            HistoryFragment()
        )

        val adapter = ViewPagerAdapter(fragments, this)
        viewPager.adapter = adapter
//        viewPager.setPageTransformer(DepthPageTransformer())
        viewPager.currentItem = viewPager.currentItem + 1

        val indicator:CircleIndicator3 = findViewById<CircleIndicator3>(R.id.indicator_nav)
        indicator.setViewPager(viewPager)
    }

    override fun onBackPressed() {
        if (viewPager.currentItem == 1){
            super.onBackPressed()
        }else if (viewPager.currentItem == 2){
            viewPager.currentItem = viewPager.currentItem - 1
        }else if (viewPager.currentItem == 0){
            viewPager.currentItem = viewPager.currentItem + 1
        }
    }
}