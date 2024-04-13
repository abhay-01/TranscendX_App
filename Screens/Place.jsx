import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const Place = ({ navigation }) => {
  const [placeName, setPlaceName] = useState("");
  const [placeData, setPlaceData] = useState(null);

  const fetchData = async () => {
    try {
      // Assuming your backend API endpoint is correct
      const response = await axios.post(
        "https://transcendx.onrender.com/place",
        {
          name: placeName,
        }
      );
      const data = response.data;

      console.log("Place data:", response.data.destination);

      // Extracting important details
      const { estheticsLocations, hotels, restaurants, culturalHappenings } = data;

      setPlaceData({ estheticsLocations, hotels, restaurants, culturalHappenings });
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0", justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center" }}>
          <View style={{ alignSelf: "flex-start", marginRight: 96, marginTop: 65 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: "flex-start" }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={{ color: "#000", paddingTop: 50, fontSize: 25, paddingBottom: 10, marginBottom: 25, marginTop: 10, marginRight: 97 }}>
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
        {placeData && (
          <ScrollView style={styles.placeDetailsContainer}>
            <Text style={styles.sectionTitle}>Best Places to Visit</Text>
            {placeData.estheticsLocations?.map((place, index) => (
              <Text key={index} style={styles.placeInfo}>
                {place}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Hotels</Text>
            {placeData.hotels?.map((hotel, index) => (
              <Text key={index} style={styles.placeInfo}>
                {hotel}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Restaurants</Text>
            {placeData.restaurants?.map((restaurant, index) => (
              <Text key={index} style={styles.placeInfo}>
                {restaurant}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Cultural Happenings</Text>
            {placeData.culturalHappenings?.map((event, index) => (
              <Text key={index} style={styles.placeInfo}>
                {event}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>
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
