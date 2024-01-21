import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EnvelopeIcon,
  UserCircleIcon,
  Bars3Icon,
} from "react-native-heroicons/solid";
import {
  GlobeEuropeAfricaIcon,
  HomeIcon,
  CameraIcon,
} from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {

  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#092C4C",
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
            <EnvelopeIcon color={"white"} marginRight={10} />
          </TouchableOpacity>
          <TouchableOpacity>
            <UserCircleIcon color={"white"} marginRight={10} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Bars3Icon color={"white"} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: "auto",
            margin: 23,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <GlobeEuropeAfricaIcon color={"white"} size={60} />
          </TouchableOpacity>

          <TouchableOpacity>
            <HomeIcon color={"white"} size={60} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate("UploadImage")}>
            <CameraIcon color={"white"} size={60} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
