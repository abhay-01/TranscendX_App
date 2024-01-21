import React from 'react'
import { View, Text } from 'react-native'
import { usePushNotifications } from './usePushNotifications'

export default function HomeScreen() {
  const {expoPushToken} = usePushNotifications();

  console.log("expoPushToken: ", expoPushToken);
  return (
    <View>
        <Text>HomeScreen</Text>
    </View>
  )
}
