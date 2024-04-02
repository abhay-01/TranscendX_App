import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { ImagePickerComp } from "../components/ImagePicker";
import axios from "axios";

const Caption = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [captions, setCaptions] = useState(null);

  const fetchCaptions = async () => {
    try {
      console.log("IMAGE URL-->", imageUrl);
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
      <View style ={{
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}>

      <Text style = {{
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
      
      }}>{captions}</Text> 
            </View>

    </View>
  );
};

export default Caption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});