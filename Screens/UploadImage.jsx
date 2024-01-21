import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EnvelopeIcon,
  UserCircleIcon,
  Bars3Icon,
} from "react-native-heroicons/solid";
import { ArrowUpOnSquareIcon } from "react-native-heroicons/outline";
import { TextInput } from "react-native-gesture-handler";

export default function UploadImage() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#092C4C",
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
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderRadius: 30,
          marginVertical: 20,
          marginHorizontal: 20,
          height: 300,
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <ArrowUpOnSquareIcon size={100} color="#092C4C" marginTop={90} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 30,
          marginVertical: 20,
          marginHorizontal: 20,
          alignItems: "center",
          height: 80,
        }}
      >
        <TextInput
          placeholder="Describe your Image..."
          style={{
            borderRadius: 20,
            width: 300,
            marginTop: 20,
            height: 50,
            alignContent: "center",
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "orange",
          borderRadius: 30,
          marginVertical: 20,
          marginHorizontal: 45,
          alignItems: "center",
          height: 40,
          width: 300,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
