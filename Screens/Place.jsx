import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "../components/bottombar";
import {
  ChatBubbleLeftRightIcon,
} from "react-native-heroicons/solid";

const Place = ({ navigation }) => {
  const [placeName, setPlaceName] = useState("");
  const [placeData, setPlaceData] = useState(null);
  const [estheticsLocations, setEstheticsLocations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [culturalHappenings, setCulturalHappenings] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://transcendx.onrender.com/place",
        {
          name: placeName,
        }
      );
      const data = response.data;

      const estheticsLocationsNames = data.estheticsLocations.map(
        (place) => place.name
      );
      const hotelsNames = data.hotels.map((hotel) => hotel.name);
      const restaurantsNames = data.restaurants.map(
        (restaurant) => restaurant.name
      );
      const culturalHappeningsNames = data.culturalHappenings.map(
        (event) => event.name
      );

      setEstheticsLocations(estheticsLocationsNames);
      setHotels(hotelsNames);
      setRestaurants(restaurantsNames);
      setCulturalHappenings(culturalHappeningsNames);

      console.log("Esthetics Locations:", estheticsLocationsNames);
      console.log("Hotels:", hotelsNames);
      console.log("Restaurants:", restaurantsNames);
      console.log("Cultural Happenings:", culturalHappeningsNames);
    } catch (error) {
      ToastAndroid.show("Try Again...!", ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#f0f0f0", justifyContent: "center" }}
    >
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <View
            style={{ alignSelf: "flex-start", marginRight: 96, marginTop: 65 }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ alignSelf: "flex-start" }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: "#000",
              paddingTop: 50,
              fontSize: 25,
              paddingBottom: 10,
              marginBottom: 25,
              marginTop: 10,
              marginRight: 97,
            }}
          >
            Name of Place
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter place or Place description"
          value={placeName}
          onChangeText={setPlaceName}
        />
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <ScrollView>
        {estheticsLocations.length > 0 && (
          <View style={styles.placeDetailsContainer}>
            <Text style={styles.sectionTitle}>Aesthetics Locations</Text>
            {estheticsLocations.map((place, index) => (
              <Text style={styles.placeInfo} key={index}>
                {place}
              </Text>
            ))}
          </View>
        )}
        {hotels.length > 0 && (
          <View style={styles.placeDetailsContainer}>
            <Text style={styles.sectionTitle}>Hotels</Text>
            {hotels.map((hotel, index) => (
              <Text style={styles.placeInfo} key={index}>
                {hotel}
              </Text>
            ))}
          </View>
        )}
        {restaurants.length > 0 && (
          <View style={styles.placeDetailsContainer}>
            <Text style={styles.sectionTitle}>Restaurants</Text>
            {restaurants.map((restaurant, index) => (
              <Text style={styles.placeInfo} key={index}>
                {restaurant}
              </Text>
            ))}
          </View>
        )}
        {culturalHappenings.length > 0 && (
          <View style={styles.placeDetailsContainer}>
            <Text style={styles.sectionTitle}>Cultural Happenings</Text>
            {culturalHappenings.map((event, index) => (
              <Text style={styles.placeInfo} key={index}>
                {event}
              </Text>
            ))}
          </View>
        )}
        </ScrollView>
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

        onPress={() => navigation.navigate("ChatBot")}
      >
        <ChatBubbleLeftRightIcon color={"#fff"} size={34} />
      </TouchableOpacity>
      <BottomTab
        style={{
          marginTop: "auto",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 18,
    marginBottom: 20,
    width: "90%",
    backgroundColor: "#ECECEC",
    fontSize: 20,
    padding: 20,
    marginTop: 0,
  },
  button: {
    backgroundColor: "#176B87",
    padding: 10,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  placeDetailsContainer: {
    width: "90%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    color: "#333",
  },
  placeInfo: {
    fontSize: 18,
    marginBottom: 10,
    color: "#444",
  },
});

export default Place;
