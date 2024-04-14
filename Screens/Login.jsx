import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  UserIcon,
  LockClosedIcon,
} from "react-native-heroicons/solid";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ route }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
    if (route.params?.password) {
      setPassword(route.params.password);
    }
  }, [route.params]);

  const { isLoading, login, userInfo } = useContext(AuthContext);

  const handleLogin = () => {
    axios.post("https://transcendx.onrender.com/login", {
      email: email,
      password: password
    }).then(async (resp) => {
      console.log("Response from login API", resp);
      if (resp.status === 200 && resp.data != null) {
        let info = resp.data;
        login(email, password);
        console.log("User logged in successfully");
        ToastAndroid.show("User logged in successfully", ToastAndroid.SHORT);
        navigation.navigate("HomeScreen", { email, password });
  
        // Store email and password in AsyncStorage
        try {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
          console.log("Email and password stored in AsyncStorage");
        } catch (error) {
          console.log("Error storing email and password:", error);
        }
      } else if (resp.status === 401 || resp.data.message === "undefined" || resp.data === null) {
        alert(resp.data.message);
      }
    }).catch((err) => {
      console.log("Error in logging in user", err);
      ToastAndroid.show("Invalid Credentials", ToastAndroid.SHORT);
    });
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
  }

  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#092C4C",
        paddingHorizontal: 20,
        paddingTop: 16,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#092C4C",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            marginTop: 50,
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text
              style={{ color: "#092C4C", fontSize: 28, fontWeight: "bold" }}
            >
              Welcome Back!
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <UserIcon size={20} color="#555" style={{ marginRight: 8 }} />
            <TextInput
              style={{
                flex: 1,
                padding: 12,
                backgroundColor: "#f0f0f0",
                borderRadius: 20,
                marginBottom: 16,
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your Email"
              keyboardType="email-address"
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LockClosedIcon size={20} color="#555" style={{ marginRight: 8 }} />
            <TextInput
              style={{
                flex: 1,
                padding: 12,
                backgroundColor: "#f0f0f0",
                borderRadius: 20,
                marginBottom: 24,
              }}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter your Password"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#3498db",
              borderRadius: 20,
              paddingVertical: 16,
              alignItems: "center",
              marginBottom: 16,
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleForgotPassword}
            // style={{ alignItems: "center" }}
          >
            <Text style={{ color: "#3498db", fontSize: 14 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "#555",
              marginVertical: 16,
            }}
          >
            Or
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 16,
                backgroundColor: "#fff",
                borderRadius: 20,
                marginRight: 2,
              }}
            >
              <Image
                source={require("../assets/icons/google.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 16,
                backgroundColor: "#fff",
                borderRadius: 20,
                marginRight: 2,
              }}
            >
              <Image
                source={require("../assets/icons/twitter.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 16,
                backgroundColor: "#fff",
                borderRadius: 20,
              }}
            >
              <Image
                source={require("../assets/icons/facebook.jpg")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#555", fontSize: 16 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ color: "#3498db", fontSize: 16, marginLeft: 5 }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
