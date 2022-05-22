package com.example.trajektexpress.view.activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import by.kirich1409.viewbindingdelegate.viewBinding
import com.example.trajektexpress.R
import com.example.trajektexpress.databinding.ActivityMainBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : BaseActivity() {

    private lateinit var bindnig : ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        bindnig = ActivityMainBinding.inflate(layoutInflater)
        setContentView(bindnig.root)
    }
}