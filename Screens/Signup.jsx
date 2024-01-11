import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";

export default function Signup() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Implement your signup logic here
    // For example, you can call an API to register the user
    navigation.navigate("HomeScreen");
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#092C4C", // Set background color to #092C4C
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "start",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 10,
              borderRadius: 20,
              backgroundColor: "white", // Back button in white color
            }}
          >
            <ChevronLeftIcon size={20} color="#092C4C" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View
        style={{
          flex: 1,
          backgroundColor: "#092C4C",
          paddingHorizontal: 20,
          paddingTop: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "white", // White card background
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            marginTop: 90,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <UserIcon size={20} color="#555" style={{ marginRight: 8 }} />
            <Text style={{ color: "#555", marginBottom: 8 }}>Full Name</Text>
          </View>
          <TextInput
            style={{
              padding: 12,
              backgroundColor: "#f0f0f0",
              borderRadius: 20,
              marginBottom: 16,
            }}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            placeholder="Enter your full name"
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <EnvelopeIcon size={20} color="#555" style={{ marginRight: 8 }} />
            <Text style={{ color: "#555", marginBottom: 8 }}>
              Email Address
            </Text>
          </View>
          <TextInput
            style={{
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

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LockClosedIcon size={20} color="#555" style={{ marginRight: 8 }} />
            <Text style={{ color: "#555", marginBottom: 8 }}>Password</Text>
          </View>
          <TextInput
            style={{
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

          <TouchableOpacity
            style={{
              backgroundColor: "#3498db",
              borderRadius: 20,
              paddingVertical: 16,
              alignItems: "center",
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Sign Up
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
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#3498db", fontSize: 16, marginLeft: 5 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
