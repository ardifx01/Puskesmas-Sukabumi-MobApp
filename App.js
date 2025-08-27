import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { isLoaded, useFonts } from 'expo-font';

import LoginScreens from "./components/login_screen";
import AppTabs from "./components/tabs";
import DetailPatient from "./components/screenComponents/historyScreen/detailPatient_screen";
import NewPatientScreen from "./components/screenComponents/homeScreen/newPatientSubmission_screen";
import MedicinePicker from "./components/screenComponents/homeScreen/medicinePicker_screen";
import { AuthProvider, useAuth } from "./components/middleware/context/authContext";

// var isSignedIn = true;
const Stack = createNativeStackNavigator();

export const Application = () => {
  const {authData} = useAuth();
    return (
      <SafeAreaProvider>
        <NavigationContainer >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {authData?.isSignedIn ? (
              <>
              <Stack.Screen name="main" component={AppTabs}/>
              <Stack.Screen name="detail-patient" component={DetailPatient}/>
              <Stack.Screen name="new-patient" component={NewPatientScreen}/>
              <Stack.Screen name="medicine-picker" component={MedicinePicker}/>
              </>

              
            ) : (
              <Stack.Screen
                name="login"
                component={LoginScreens}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>   
    );
};

export default function App() {


  const [fontsLoaded, fontsLoadError] = useFonts({
    // normal font
    'HelveticaNeue-Thin': require('./assets/fonts/HelveticaNeue/HelveticaNeue_100.otf'),
    'HelveticaNeue-ExtraLight': require('./assets/fonts/HelveticaNeue/HelveticaNeue_200.otf'),
    'HelveticaNeue-Light': require('./assets/fonts/HelveticaNeue/HelveticaNeue_300.otf'),
    'HelveticaNeue': require('./assets/fonts/HelveticaNeue/HelveticaNeue_400.otf'),
    'HelveticaNeue-Medium': require('./assets/fonts/HelveticaNeue/HelveticaNeue_500.otf'),
    'HelveticaNeue-Bold': require('./assets/fonts/HelveticaNeue/HelveticaNeue_700.otf'),
    'HelveticaNeue-Heavy': require('./assets/fonts/HelveticaNeue/HelveticaNeue_800.otf'),
    'HelveticaNeue-Black': require('./assets/fonts/HelveticaNeue/HelveticaNeue_900.otf'),

    //italic font
    'HelveticaNeue-ThinItalic': require('./assets/fonts/HelveticaNeue/HelveticaNeue_100Italic.otf'),
    'HelveticaNeue-ExtraLightItalic': require('./assets/fonts/HelveticaNeue/HelveticaNeue_200Italic.otf'),
    'HelveticaNeue-LightItalic': require('./assets/fonts/HelveticaNeue/HelveticaNeue_300Italic.otf'),
    'HelveticaNeue-Italic': require('./assets/fonts/HelveticaNeue/HelveticaNeue_400Italic.ttf'),
    'HelveticaNeue-MediumItalic': require('./assets/fonts/HelveticaNeue/HelveticaNeue_500Italic.otf'),
    'HelveticaNeue-BoldItalic': require('./assets/fonts/HelveticaNeue/HelveticaNeue_700Italic.otf'),
    'HelveticaNeue-HeavyItalic': require('./assets/fonts/HelveticaNeue/HelveticaNeue_800Italic.otf'),
    'HelveticaNeue-BlackItalic': require('./assets/fonts/HelveticaNeue/HelveticaNeue_900Italic.otf'),
  });

  if (!fontsLoaded && !fontsLoadError) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Application/>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#red",
  },
});
