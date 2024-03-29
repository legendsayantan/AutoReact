package com.legendsayantan.autoreact;

import android.annotation.SuppressLint;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.borutsky.neumorphism.NeumorphicFrameLayout;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {
    WebView webView;
    boolean finished;
    boolean fbmode;
    SeekBar seekBar;
    CheckBox checkBox;
    Timer t;
    String defaultAgent,fbCode,instaCode;
    NeumorphicFrameLayout neumorphicFrameLayout;
    ImageView imageView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        fbmode=true;
        webView=findViewById(R.id.web);
        seekBar=findViewById(R.id.seekBar2);
        checkBox=findViewById(R.id.checkBox);
        neumorphicFrameLayout=findViewById(R.id.button);
        imageView = findViewById(R.id.imageView);
        webView.getSettings().setSupportZoom(true);
        WebView.setWebContentsDebuggingEnabled(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            webView.getSettings().setForceDark(WebSettings.FORCE_DARK_ON);
        }
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setLoadWithOverviewMode(true);
        webView.getSettings().setUseWideViewPort(true);
        webView.getSettings().setBuiltInZoomControls(true);
        webView.getSettings().setDisplayZoomControls(false);
        defaultAgent=webView.getSettings().getUserAgentString();
        webView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        webView.setScrollbarFadingEnabled(false);
        loadPage();
        fbCode=readAsset("FbAutoReactor.js");
        instaCode=readAsset("InstaAutoReactor.js");
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                finished=false;
                try {
                    t.cancel();
                }catch (Exception ignored){}
                super.onPageStarted(view, url, favicon);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                finished=true;
                webView.evaluateJavascript("window.onscroll = async function (e){\n" +
                                "    //Ad remover\n" +
                                "    var allpost = document.getElementsByClassName('_55wo _5rgr _5gh8 async_like')\n" +
                                "    for(var i = 0 ; i<allpost.length;i++){\n" +
                                "        var ads = allpost[i].getElementsByTagName('iframe')\n" +
                                "        var suggested = allpost[i].getElementsByClassName('_52jh _5rgs _78cx _5sg5')\n" +
                                "        if(ads.length>0 || suggested.length>0){\n" +
                                "            console.log(\"ad removed\")\n" +
                                "            allpost[i].remove();\n" +
                                "        }\n" +
                                "    }\n" +
                                "}"
                        , s -> { });
                super.onPageFinished(view, url);
            }
        });
        webView.setWebChromeClient(new WebChromeClient(){
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                System.out.println(consoleMessage.message());
                return super.onConsoleMessage(consoleMessage);
            }
        });
        checkBox.setOnCheckedChangeListener((compoundButton, b) -> new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(() -> {
                    if(checkBox.isChecked()){
                        if(fbmode){
                            webView.evaluateJavascript(fbCode, s -> {});
                        }else{
                            webView.evaluateJavascript(instaCode, s -> {});
                        }
                    }else{
                        webView.evaluateJavascript("window.onscroll = async function (e){\n" +
                                        "    //Ad remover\n" +
                                        "    var allpost = document.getElementsByClassName('_55wo _5rgr _5gh8 async_like')\n" +
                                        "    for(var i = 0 ; i<allpost.length;i++){\n" +
                                        "        var ads = allpost[i].getElementsByTagName('iframe')\n" +
                                        "        var suggested = allpost[i].getElementsByClassName('_52jh _5rgs _78cx _5sg5')\n" +
                                        "        if(ads.length>0 || suggested.length>0){\n" +
                                        "            console.log(\"ad removed\")\n" +
                                        "            allpost[i].remove();\n" +
                                        "        }\n" +
                                        "    }\n" +
                                        "}"
                                , s -> { });
                    }
                });
            }
        },500));
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

            }
            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }
            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                scroller(seekBar.getProgress());
            }
        });
        new nAnimator(neumorphicFrameLayout, NeumorphicFrameLayout.State.CONCAVE, () -> {
            Toast.makeText(getApplicationContext(),"Switching...",Toast.LENGTH_LONG).show();
            seekBar.setProgress(0);
            checkBox.setChecked(false);
            fbmode=!fbmode;
            loadPage();
        });
        registerForContextMenu(webView);
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);
        menu.add(0, v.getId(), 0, "Open in Browser").setOnMenuItemClickListener(item -> {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(webView.getUrl()));
            startActivity(browserIntent);
            return true;
        });
        menu.add(1, v.getId(), 0, "Copy Link").setOnMenuItemClickListener(item -> {
            ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
            ClipData clip = ClipData.newPlainText("Link", webView.getUrl());
            clipboard.setPrimaryClip(clip);
            Toast.makeText(getApplicationContext(),"Link Copied",Toast.LENGTH_LONG).show();
            return true;
        });
    }

    @Override
    public void onBackPressed() {
        if(webView.canGoBack())webView.goBack();
        else super.onBackPressed();
    }
    public void scroller(int time){
        try {
            t.cancel();
        }catch (Exception ignored){}
        t = new Timer();
        if(time==0) {
            webView.setKeepScreenOn(false);
            return;
        }
        webView.setKeepScreenOn(true);
        t.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
               if(finished){
                   webView.post(() -> {
                       System.out.println("Scrolling in fb");
                       webView.pageDown(false);
                   });
               }
            }
        },0,(15000-(time*2400L)));
    }
    public void loadPage(){
        if(fbmode) {
            String newUA= "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36";
            webView.getSettings().setUserAgentString(newUA);
            webView.loadUrl("https://m.facebook.com");
            imageView.setImageResource(R.drawable.ig_white);
        } else {
            webView.getSettings().setUserAgentString(defaultAgent);
            webView.loadUrl("https://instagram.com");
            imageView.setImageResource(R.drawable.fb_white);
        }
    }
    String readAsset(String file){
        StringBuilder data = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(getAssets().open(file), StandardCharsets.UTF_8))) {

            // do reading, usually loop until end of file reading
            String mLine;
            while ((mLine = reader.readLine()) != null) {
                //process line
                data.append("\n").append(mLine);
            }
        } catch (IOException e) {
            showText(e.getMessage());
        }
        //log the exception
        return data.toString();
    }
    public void showText(String message){
     Toast.makeText(getApplicationContext(),message,Toast.LENGTH_LONG).show();
    }
}