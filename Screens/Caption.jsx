import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ImagePickerComp } from "../components/ImagePicker";
import axios from "axios";
import BottomTab from "../components/bottombar";
import { ChatBubbleLeftRightIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const Caption = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [captions, setCaptions] = useState(null);
  const navigation = useNavigation();

  const fetchCaptions = async () => {
    try {
      console.log("IMAGE URL", imageUrl);
      setCaptions(undefined);
      const response = await axios.post(
        "https://transcendx.onrender.com/caption",
        {
          url: imageUrl,
        }
      );

      console.log("Response--->", response.data);
      setCaptions(response.data); // store the captions
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  useEffect(() => {
    if (imageUrl) {
      fetchCaptions();
    }
  }, [imageUrl]);

  const handleImageUrl = (url) => {
    console.log("URL--->", url);
    setImageUrl(url);
  };

  return (
    <View style={styles.container}>
      <ImagePickerComp OnImageUrl={handleImageUrl} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {captions === undefined ? (
          <Text
            style={{
              color: "#000",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: "#ddd",
              padding: 10,
              borderRadius: 10,
              margin: 10,
            }}
          >
            Loading...
          </Text>
        ) : (
          <Text
            style={{
              color: "#000",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: "#ddd",
              padding: 10,
              borderRadius: 10,
              margin: 10,
            }}
          >
            {captions}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 90,
          right: 20,
          backgroundColor: '#66CCC5',
          padding: 10,
          borderRadius: 30,
        }}

        onPress={() => navigation.navigate("ChatBot")}
      >
        <ChatBubbleLeftRightIcon color={"#fff"} size={34} />
      </TouchableOpacity>

      <BottomTab style={{ marginTop: "auto" }} />
    </View>
  );
};

export default Caption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    marginTop: 60,
  },
});
