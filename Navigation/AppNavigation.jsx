import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import HomeScreen from "../Screens/HomeScreen";
import UploadImage from "../Screens/UploadImage";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import ResultScreen from "../Screens/ResultScreen";
import Place from "../Screens/Place";
import Caption from "../Screens/Caption";

const Stack = createStackNavigator();
export default function AppNavigation() {
  const { userInfo } = useContext(AuthContext);
  console.log("userInfo", userInfo);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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

        <Stack.Screen
          name="Caption"
          component={Caption}
          options={{
            headerShown: false,
          }}
        />
        {/* {userInfo?.access_token ? (
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
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
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
