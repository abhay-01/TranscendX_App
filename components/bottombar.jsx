import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraIcon } from "react-native-heroicons/solid";
import {
  UserCircleIcon,
  MapPinIcon,
  PhotoIcon,
  HomeIcon,
  ChatBubbleBottomCenterIcon,
  GlobeEuropeAfricaIcon,
  ChatBubbleLeftEllipsisIcon
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function BottomTab({ logout }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "#ECECEC",
        marginTop: "auto",
        margin: 0,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <View style={{ alignItems: "center", paddingLeft: 5 }}>
          <HomeIcon color={"black"} size={35} marginTop={5} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Place")}>
        <View style={{ alignItems: "center" }}>
          <GlobeEuropeAfricaIcon color={"black"} size={40} marginTop={4} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("UploadImage")}>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 50,
            width: 80,
            height: 80,
            marginTop: -30,
          }}
        >
          <View
            style={{
              backgroundColor: "#ECECEC",
              borderRadius: 60,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5,
              shadowColor: "#000",
              elevation: 9,
            }}
          >
            <CameraIcon color={"black"} size={50} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: 50 }}
        onPress={() => navigation.navigate("Caption")}
      >
        <View style={{ alignItems: "center" }}>
          <ChatBubbleLeftEllipsisIcon color={"black"} size={40} marginTop={4} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <View style={{ alignItems: "center", paddingRight: 5 }}>
          <UserCircleIcon color={"black"} size={40} marginTop={4} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
