import './i18n';
import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {useInitialRootStore} from './models';
import {AppNavigator} from './navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

/**
 * This is the root component of our app.
 */
function App() {
  const {rehydrated} = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.
    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    // setTimeout(hideSplashScreen, 500);
  });

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated) {
    return null;
  }

  // otherwise, we're ready to render the app
  return (
      <GestureHandlerRootView style={{flex:1}}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigator />
    </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}

export default App;
