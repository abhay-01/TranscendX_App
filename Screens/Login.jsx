import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  UserIcon,
  LockClosedIcon,
} from "react-native-heroicons/solid";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    // For example, you can call an API to authenticate the user
    navigation.navigate("HomeScreen");
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    // For example, you can navigate to a Forgot Password screen
    navigation.navigate("ForgotPassword");
  };

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
              Welome Back!
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
