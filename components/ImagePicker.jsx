import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import {CameraIcon,PhotoIcon} from "react-native-heroicons/outline";
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

export const ImagePickerComp = () => {
  const [responseCamera, setResponseCamera] = React.useState(null);
  const [responseGallery, setResponseGallery] = React.useState(null);

  const openCameraWithPermission = async () => {
    try {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          (response) => {
            console.log(response);
            setResponseCamera(response);
            setResponseGallery(null);
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

//   console.log("Gallery Camera",JSON.stringify(responseGallery,null,2));
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 4,
      }}>
      <TouchableOpacity onPress={() => openCameraWithPermission()}>
        {responseCamera === null ? (
            <CameraIcon style = {{
                height: 50,
                width: 50,
                color:"white"
            }} />
        ) : (
            <Image style={{
                height: 200,
                width: 200,
                color: "white"
            
            }} source={{uri: responseCamera.assets[0].uri}} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              setResponseGallery(response);
              setResponseCamera(null);
            },
          )
        }>
        {responseGallery === null ? (
            <PhotoIcon style ={{
                height: 50,
                width: 50,
                color: "white"
            
            }} />
        ) : (
            <Image style = {{
                height: 200,
                width: 200,
                color: "white"
            
            }} source={{uri: responseGallery.assets[0].uri}} />
            )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 50,
    width: 50,
    color: "white"
  },
});