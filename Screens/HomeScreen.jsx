import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3Icon,
  HomeIcon,
  CameraIcon,
} from "react-native-heroicons/solid";
import {
  UserCircleIcon,
  BellAlertIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function HomeScreen() {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  console.log("userInfo --- Home", userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://transcendx.onrender.com");
        setUsers(response.data);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchData();
  }, []);

  const getData = async () => {
    const res = await myFetchGet();
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 13,
            justifyContent: "flex-end",
          }}
        >
        
          <TouchableOpacity>
            <Bars3Icon color={"#000"} size={30} />
          </TouchableOpacity>
        </View>

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
            borderRadius: 60,
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
          <TouchableOpacity style={{ width: 50 }} onPress={logout}>
          <View style={{ alignItems: 'center' }}>
            <BellAlertIcon color={"#000"} size={50} />
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
      </View>
    </SafeAreaView>
  );
}