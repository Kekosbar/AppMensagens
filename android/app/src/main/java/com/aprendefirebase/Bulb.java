package com.aprendefirebase;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

public class Bulb extends ReactContextBaseJavaModule  {

    private static Boolean isOn = false;
    static final int REQUEST_IMAGE_CAPTURE = 1;
    static final int RESULT_LOAD_IMG = 2;
    private static Callback callback;

    public Bulb(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener(){
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == activity.RESULT_OK) {
                Bundle extras = data.getExtras();
                Bitmap imageBitmap = (Bitmap) extras.get("data");
                String encodedImage = convertBitmapToString(imageBitmap);
                Bulb.callback.invoke(encodedImage);
            }else if (requestCode == RESULT_LOAD_IMG && resultCode == activity.RESULT_OK) {
                try {
                    final Uri imageUri = data.getData();
                    final InputStream imageStream = activity.getContentResolver().openInputStream(imageUri);
                    final Bitmap imageBitmap = BitmapFactory.decodeStream(imageStream);
                    String encodedImage = convertBitmapToString(imageBitmap);
                    Bulb.callback.invoke(encodedImage);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
            }
        }
    };

    private String convertBitmapToString(Bitmap imageBitmap){
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        imageBitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos); //bm is the bitmap object
        byte[] b = baos.toByteArray();
        return Base64.encodeToString(b, Base64.DEFAULT);
    }

    @ReactMethod
    public void usaCamera(Callback callback){
        Bulb.callback = callback;
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            return;
        }
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(currentActivity.getPackageManager()) != null) {
            currentActivity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }

    @ReactMethod
    public void getFotoGaleria(Callback callback){
        Bulb.callback = callback;
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            return;
        }
        Intent photoPickerIntent = new Intent(Intent.ACTION_PICK);
        photoPickerIntent.setType("image/*");
        currentActivity.startActivityForResult(photoPickerIntent, RESULT_LOAD_IMG);
    }

    @Override
    public String getName() {
        return "Bulb";
    }

}