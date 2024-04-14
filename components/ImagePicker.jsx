import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { CameraIcon, PhotoIcon } from "react-native-heroicons/outline";
import * as ImagePicker from "react-native-image-picker";
import { PermissionsAndroid } from "react-native";

export const ImagePickerComp =  ({OnImageUrl}) => {
  const [responseCamera, setResponseCamera] = React.useState(null);
  const [responseGallery, setResponseGallery] = React.useState(null);
  const [url, setUrl] = React.useState(null);

  const openCameraWithPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchCamera(
          {
            mediaType: "photo",
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          (response) => {
            console.log(response);
            setResponseCamera(response);
            console.log("Camera Response", response);

            let newFile = {
              uri: response.assets[0].uri,
              type: `test/${response.assets[0].uri.split(".")[1]}`,
              name: `test/${response.assets[0].uri.split(".")[1]}`,
            }

            handleUpload(newFile);
            setResponseGallery(null);
          }
        );
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUpload = (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "test_cl");
    formData.append("cloud_name", "dctz4wuix");

    fetch("https://api.cloudinary.com/v1_1/dctz4wuix/image/upload", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data-->", JSON.stringify(data, null, 2));
        // console.log("IMAGE URL", data.url)
        setUrl(data.url);
        OnImageUrl(data.url);
      });
  };

  


  console.log("IMAGE URL---->", url)

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 2,
        marginLeft: 70,
      }}
    >
      <TouchableOpacity onPress={() => openCameraWithPermission()}>
      <View
        style={{
          alignItems: "center",
          marginRight: 60,
          borderWidth: 2, 
          borderColor: "#176B87",
          borderRadius: 100, 
          padding: 10,
        }}
      >
            <CameraIcon style = {{
                height: 300,
                width: 200,
                color:"#000",
            }} />
            <Text style = {{
                color: "#000"
            
            }}>Camera</Text>
            </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          ImagePicker.launchImageLibrary(
            {
              mediaType: "photo",
              includeBase64: false,
              maxHeight: 120,
              maxWidth: 120,
            },
            (response) => {
              setResponseGallery(response);
              setResponseCamera(null);
              let newFile = {
                uri: response.assets[0].uri,
                type: `test/${response.assets[0].uri.split(".")[1]}`,
                name: `test/${response.assets[0].uri.split(".")[1]}`,
              }
              handleUpload(newFile);
            }
          )
        }
      ><View
      style={{
        alignItems: "center",
        marginRight: 60,
        borderWidth: 2, 
        borderColor: "#176B87",
        borderRadius: 100,
        padding: 10, 
      }}
    >
              <PhotoIcon style = {{
                  height: 300,
                  width: 200,
                  color:"#000"
              }} />
              <Text style = {{
                  color: "#000"
              
              }}>Gallery</Text>
              </View>
      </TouchableOpacity>
    </View>
  );
};
