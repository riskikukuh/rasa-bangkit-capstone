package com.dicoding.dhimas.rasaapp

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import androidx.viewpager2.widget.ViewPager2

class HomeFragment : Fragment(){

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)

        val viewPager = activity?.findViewById<ViewPager2>(R.id.view_pager)
        val btnList: Button = view.findViewById(R.id.btn_nav_list)
        val btnHistory: Button = view.findViewById(R.id.btn_nav_history)

        btnList.setOnClickListener {
            viewPager?.currentItem = 0
        }

        btnHistory.setOnClickListener {
            viewPager?.currentItem = 2
        }

        return view
    }
}