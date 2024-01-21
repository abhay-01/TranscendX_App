import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import HomeScreen from '../Screens/HomeScreen';
import UploadImage from '../Screens/UploadImage';

const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
   <NavigationContainer>
        <Stack.Navigator initialRouteName = "Login">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options ={{
                headerShown: false
            }}/>
            <Stack.Screen name="Login" component={Login} options = {{
                headerShown:false
            }}/>
            <Stack.Screen name="Signup" component={Signup} options = {{
                headerShown:false
            }}/>

            <Stack.Screen name="UploadImage" component={UploadImage} options = {{
                headerShown:false
            }}/>
        </Stack.Navigator>
   </NavigationContainer>
  )
}
