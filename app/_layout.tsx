import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
      <Stack.Screen name="hotels" />
      <Stack.Screen name="hotel-detail" />
      <Stack.Screen name="manager-dashboard" />
    </Stack>
  );
}
