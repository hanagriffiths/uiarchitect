import {
  Inter_300Light_Italic,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_600SemiBold_Italic,
  Inter_700Bold
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";

import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_300Light_Italic,
    Inter_600SemiBold_Italic
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }
  
  return <Stack screenOptions={{ headerShown: false }} />;
}
