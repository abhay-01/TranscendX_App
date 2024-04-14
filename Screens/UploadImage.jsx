import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerComp } from "../components/ImagePicker";
import BottomTab from "../components/bottombar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatBubbleLeftRightIcon } from "react-native-heroicons/solid";


export default function UploadImage() {
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [textSolution, setTextSolution] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [cloud,setCloud] = useState(null);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    getEmailFromStorage();
  }, []);

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail !== null) {
        setEmail(storedEmail);
      }
    } catch (error) {
      console.log('Error retrieving email from AsyncStorage:', error);
    }
  };


  const handlePress = async () => {
    try {
      const response = await axios.post(
        "https://transcendx.onrender.com/generate",
        {
          email:email,
          prompt: description,
        }
      );

      console.log("Response", response.data);
      const { caption, textSolution, url } = response.data;
      setCaption(caption);
      setTextSolution(textSolution);
      setUrl(url);
      setShowResult(true);
      console.log("url", url)
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  useEffect(() => {

    const fetchPrompt = async () => {
      try {
        const response = await axios.post(
          "https://transcendx.onrender.com/prompt",{
            url:imageUrl
          }
        );

        console.log("Prompt", response.data);

        if(imageUrl === null){
          setDescription(null)
        }else{
          setDescription(response.data);
        }
      } catch (error) {
        console.error("Error fetching prompt:", error);
      }
    }

    fetchPrompt();


  }, [imageUrl]);

  const handleImageUrl = (url) => {
    setImageUrl(url);
  };

  console.log("imageUrl", imageUrl,description);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Image Description</Text>
            <TextInput
              placeholder="A man standing in front of a building..."
              style={styles.textInput}
              onChangeText={(text) => setDescription(text)}
              value={description}
              multiline
            />

            <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
              <Text style={styles.submitText}>Upload Image Description</Text>
            </TouchableOpacity>
          </View>
          
          {showResult ? (
            <ScrollView style={styles.resultContainer}>
              <Image source={{uri:url}} style= {styles.resultImage}/>
              <Text style={styles.caption}>Caption:</Text>
              <Text style={styles.resultText}>{caption}</Text>
              <Text style={styles.textSolution}>Text Solution:</Text>
              <Text style={styles.resultText}>{textSolution}</Text>
            </ScrollView>
          ) : (
            <>
              <View style={styles.imageContainer}>
                {/* Image component to display the image */}
                {imageUrl && (
                  <Image source={{ uri: imageUrl }} style={styles.image} />
                )}
              </View>

              <View style={styles.optionsContainer}>
                <ImagePickerComp OnImageUrl={handleImageUrl} />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
          backgroundColor: '#66CCC5',
          padding: 10,
          borderRadius: 30,
        }}

        onPress={() => navigation.navigate("Caption")}
      >
        <ChatBubbleLeftRightIcon color={"#fff"} size={34} />
      </TouchableOpacity>
      <BottomTab style={{ marginTop: "auto" }} />
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
    height: "40%",
    marginTop: 50,
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
  descriptionContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 55,
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
  resultContainer: {
    marginTop: 20,
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 15,

  },
  textSolution: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
  

  },
  resultText: {
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 10,


  },
  resultImage: {
    width: 350,
    height: 400,
    marginBottom: 30,
    borderRadius: 20,
    marginLeft: 25,
  },
});
