import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    HomeIcon,
    CameraIcon,
  } from "react-native-heroicons/solid";
  import {
    UserCircleIcon,
    BellAlertIcon,
    MapPinIcon,
    PhotoIcon
  } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function BottomTab({ logout }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#ECECEC',
        marginTop: "auto",
        margin: 0,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity>
        <View style={{ alignItems: 'center', paddingLeft: 5 }}>
          <HomeIcon color={"#000"} size={50} />
          <Text style={{ color: 'grey' }}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Place")}>
        <View style={{ alignItems: 'center' }}>
          <MapPinIcon color={"#000"} size={50} />
          <Text style={{ color: 'grey' }}>Place</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("UploadImage")}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 50,
          width: 80,
          height: 80,
          marginTop: -30,
        }}>
          <View style={{
            backgroundColor: '#ECECEC',
            borderRadius: 60,
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
            shadowColor: "#000",
            elevation: 9,
          }}>
            <CameraIcon color={"#000"} size={50} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 50 }}  onPress={() => navigation.navigate("Caption")}>
        <View style={{ alignItems: 'center' }}>
          <PhotoIcon color={"#000"} size={50} />
          <Text style={{ color: 'grey' }}>Inbox</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{ alignItems: 'center', paddingRight: 5 }}>
          <UserCircleIcon color={"#000"} size={50} />
          <Text style={{ color: 'grey' }}>Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}