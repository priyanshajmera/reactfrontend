package vite.react.typescript.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import android.view.View;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Handle window insets to prevent overlap
        getWindow().getDecorView().setOnApplyWindowInsetsListener((v, insets) -> {
            int insetTop = insets.getSystemWindowInsetTop();
            v.setPadding(0, insetTop, 0, 0); // Add padding for the status bar
            return insets;
        });
    }
}