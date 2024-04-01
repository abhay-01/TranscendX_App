import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EnvelopeIcon,
  UserCircleIcon,
  Bars3Icon,
} from "react-native-heroicons/solid";
import { ArrowUpOnSquareIcon } from "react-native-heroicons/outline";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerComp } from "../components/ImagePicker";
import BottomTab from "../components/bottombar";

export default function UploadImage() {
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [textSolution, setTextSolution] = useState("");
  const [url, setUrl] = useState("");
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const response = await axios.post(
        "https://transcendx.onrender.com/generate",
        {
          prompt: description,
        }
      );

      console.log("Response", response.data);
      const { caption, textSolution, url } = response.data;
      setCaption(caption);
      setTextSolution(textSolution);
      setUrl(url);

      // Navigate to ResultScreen passing states as route params

      navigation.navigate("ResultScreen", {
        caption: caption,
        textSolution: textSolution,
        url: url ? url : " ",
      });
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Bars3Icon color={"#000"} />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {/* Image component to display the image */}
        <Image source={{ uri: url }} style={styles.image} />
      </View>
      <Text style={{ color: '#000', marginVertical: 10, fontSize: 25, paddingHorizontal: 25 }}>Image Description</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Describe your Image..."
          style={styles.textInput}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <Text style = {{
        color: "#000",
        textAlign: "center",
        marginTop: 20,
        fontSize: 20
      }}>
        OR
      </Text>

      <ImagePickerComp />
      
    <BottomTab style={{ marginTop: 'auto'}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 13,
    justifyContent: "flex-end",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  inputContainer: {
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    marginTop: 10,
    height: 90,
  },
  textInput: {
    height: 50,
    borderRadius: 20,
    marginTop: 0,
    width: "90%",
  },
  submitButton: {
    backgroundColor: "#000",
    borderRadius: 10,
    marginHorizontal: 45,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 20,
  },
  submitText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
