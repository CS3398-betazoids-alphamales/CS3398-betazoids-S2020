package com.example.witchesbrewandroid;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        WebView browser = findViewById(R.id.browser);
        WebSettings settings = browser.getSettings();
        settings.setJavaScriptEnabled(true);
        browser.loadUrl("http://jonathanandrewdesign.com/witchesbrew/");
    }
}
