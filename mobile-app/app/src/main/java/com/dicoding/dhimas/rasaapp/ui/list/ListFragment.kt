package com.dicoding.dhimas.rasaapp.ui.list

import DataItemMakanan
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.dicoding.dhimas.rasaapp.databinding.FragmentListBinding
import com.dicoding.dhimas.rasaapp.adapter.ListMakananAdapter
import com.dicoding.dhimas.rasaapp.utils.ViewModelFactory
import retrofit2.*

class ListFragment : Fragment() {
    private var _binding: FragmentListBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: ListViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentListBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = obtainViewModel(requireActivity() as AppCompatActivity)

        binding.rvListMakanan.setHasFixedSize(true)
        showLoading(true)

        viewModel.getListMakanan().observe(requireActivity()){ list ->
            showLoading(false)
            binding.rvListMakanan.layoutManager = GridLayoutManager(getActivity(), 2)
            val listMakananAdapter = ListMakananAdapter(list.data as ArrayList<DataItemMakanan>)
            binding.rvListMakanan.adapter = listMakananAdapter
        }
    }

    private fun showLoading(isLoading: Boolean) {
        if (isLoading) {
            binding.progressBar.visibility = View.VISIBLE
        } else {
            binding.progressBar.visibility = View.GONE
        }
    }

    private fun obtainViewModel(activity: AppCompatActivity): ListViewModel {
        val factory = ViewModelFactory.getInstance(activity.application)
        return ViewModelProvider(activity, factory)[ListViewModel::class.java]
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    companion object{
        private const val TAG = "ListFragment"
    }
}