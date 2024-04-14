import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BottomTab from "../components/bottombar";
import { ChatBubbleLeftRightIcon } from "react-native-heroicons/solid";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images = [
  "https://res.cloudinary.com/dvmk4d0kb/image/upload/v1713056140/7_rk3gr8.jpg",
  "https://res.cloudinary.com/dvmk4d0kb/image/upload/v1713056140/6_fpzubi.jpg",
  "https://res.cloudinary.com/dvmk4d0kb/image/upload/v1713056140/5_b8hgqt.jpg",
  "https://res.cloudinary.com/dvmk4d0kb/image/upload/v1713056140/4_jxnmfl.jpg",
  "https://res.cloudinary.com/dvmk4d0kb/image/upload/v1713056140/2_alcayc.jpg",
  "https://res.cloudinary.com/dvmk4d0kb/image/upload/v1713056140/8_updpy6.jpg",
  "https://res.cloudinary.com/dvmk4d0kb/image/upload/v1713056140/3_qct0ha.jpg",
  "https://res.cloudinary.com/dvmk4d0kb/image/upload/v1713056140/1_vjv4dr.jpg",
];

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
}));

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item, index }) => (
    <View>
      <Image
        source={{ uri: item.photo }}
        style={{
          width: ITEM_WIDTH,
          height: 334,
          resizeMode: "cover",
          borderRadius: 14,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <ScrollView style={{ flex: 1 , marginTop:53}}>
          <Carousel
            layout="default"
            data={data}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={0.4}
            contentContainerCustomStyle={{ paddingHorizontal: 20 }}
          />

          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={{ paddingVertical: 10 }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#66CCC5",
            }}
            inactiveDotStyle={{
              backgroundColor: "#000",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />

          <View
            style={{ paddingHorizontal: 20, marginBottom: 20, marginTop: 22 }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
            >
              TranscendX
            </Text>
            <Text style={{ fontSize: 16, textAlign: "center", marginTop: 5 }}>
              Beyond the frame, beyond expectations
            </Text>
          </View>
        </ScrollView>
      </ScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#66CCC5",
          padding: 10,
          borderRadius: 30,
        }}
        onPress={() => navigation.navigate("Caption")}
      >
        <ChatBubbleLeftRightIcon color={"#fff"} size={34} />
      </TouchableOpacity>
      <BottomTab
        style={{
          marginTop: "auto",
        }}
      />
    </SafeAreaView>
  );
}
