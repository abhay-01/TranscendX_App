import React, { useContext, useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3Icon,
} from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import BottomTab from "../components/bottombar";

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
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity>
            <Bars3Icon color={"#000"} size={30} />
          </TouchableOpacity>
        </View>
        
        <Image source={require('../assets/logo/logo.jpg')} style={{width: 320, height: 200, marginHorizontal: 40, marginTop: 20}} />
        <Text style={{ fontSize: 17, marginLeft: 100, color: "grey", marginTop: 0 }}>AI Driven Content Creation</Text>
        <BottomTab logout={logout} />
      </View>
    </SafeAreaView>
  );
}