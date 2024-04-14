import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import HomeScreen from "../Screens/HomeScreen";
import UploadImage from "../Screens/UploadImage";
import ResultScreen from "../Screens/ResultScreen";
import Place from "../Screens/Place";
import Caption from "../Screens/Caption";
import ChatBot from "../Screens/ChatBot";
import Account from "../Screens/Account";

const Stack = createStackNavigator();

export default function AppNavigation() {
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      if (storedEmail) {
        setInitialRoute("HomeScreen");
      }
    } catch (error) {
      console.log("Error retrieving email from AsyncStorage:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UploadImage"
          component={UploadImage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Place"
          component={Place}
          options={{
            headerShown: false,
          }}
        />
        {/* 
        <Stack.Screen
        name = "ChatBot"
        component={ChatBot}
        options={{
          headerShown: false,
        }}
        /> */}

        <Stack.Screen
          name="Caption"
          component={Caption}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ChatBot"
          component={ChatBot}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
