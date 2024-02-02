import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./Navigation/AppNavigation";
import { AuthData } from "./backend/TranscendX/mongoDB";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation/>
    </AuthProvider>
  );
}
