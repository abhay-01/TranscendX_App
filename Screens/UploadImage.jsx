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
      const { caption, textSolution, url } = response.data;
      setCaption(caption);
      setTextSolution(textSolution);
      setUrl(url);

      // Navigate to ResultScreen passing states as route params
      navigation.navigate("ResultScreen", {
        caption: caption,
        textSolution: textSolution,
        url: url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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

      <View style={styles.imageContainer}>
        {/* Image component to display the image */}
        <Image source={{ uri: url }} style={styles.image} />
      </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#092C4C",
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
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textInput: {
    height: 50,
    borderRadius: 20,
    marginTop: 20,
    width: "100%",
  },
  submitButton: {
    backgroundColor: "orange",
    borderRadius: 30,
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
