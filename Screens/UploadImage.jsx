import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
  const [imageUrl, setImageUrl] = useState(null);
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

  const handleImageUrl = (url) => {
    setImageUrl(url);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            {/* Image component to display the image */}
            {imageUrl && (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
          </View>

          <View style={styles.optionsContainer}>
          <ImagePickerComp OnImageUrl={handleImageUrl} />

          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Image Description</Text>
            <TextInput
              placeholder="Describe your Image..."
              style={styles.textInput}
              onChangeText={(text) => setDescription(text)}
              value={description}
              multiline
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handlePress}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomTab />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#64CCC5",
    height: "50%",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#64CCC5",
  },
  optionText: {
    color: "#64CCC5",
    fontSize: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop:55
  },
  descriptionText: {
    color: "#000",
    fontSize: 20,
    marginBottom: 25,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#176B87",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#64CCC5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  submitText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
