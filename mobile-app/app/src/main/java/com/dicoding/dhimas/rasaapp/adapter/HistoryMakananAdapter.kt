package com.dicoding.dhimas.rasaapp.adapter

import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.dicoding.dhimas.rasaapp.data.model.DataItemHistory
import com.dicoding.dhimas.rasaapp.databinding.ItemRowHistoryBinding
import com.dicoding.dhimas.rasaapp.ui.detail.DetailActivity

class HistoryMakananAdapter(private val historyMakanan: ArrayList<DataItemHistory>) :
    RecyclerView.Adapter<HistoryMakananAdapter.HistoryViewHolder>() {
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): HistoryViewHolder {
        val binding =
            ItemRowHistoryBinding.inflate(LayoutInflater.from(viewGroup.context), viewGroup, false)
        return HistoryViewHolder(binding)
    }

    override fun onBindViewHolder(holder: HistoryViewHolder, position: Int) {
        val makanan = historyMakanan[position]
        holder.bind(makanan)
        holder.itemView.setOnClickListener {
            if (makanan.food != null) {
                val intent = Intent(holder.itemView.context, DetailActivity::class.java)
                intent.putExtra(DetailActivity.EXTRA_ID, makanan.food?.id)
                intent.putExtra(DetailActivity.EXTRA_NAME, makanan.food?.name)
                holder.itemView.context.startActivity(intent)
            }
        }
    }

    override fun getItemCount(): Int = historyMakanan.size

    inner class HistoryViewHolder(private val binding: ItemRowHistoryBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(makanan: DataItemHistory) {
            binding.apply {
                tvNamaHistory.text = makanan.food?.name
                tvTempatHistory.text = makanan.food?.origin
                Glide.with(itemView.context).load(makanan.image).into(imgFotoHistory)
            }
        }
    }
}