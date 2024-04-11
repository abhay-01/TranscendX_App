import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import axios from "axios";
import BottomTab from "../components/bottombar";
import { Ionicons } from "@expo/vector-icons";

const Place = ({ navigation }) => {
  const [placeName, setPlaceName] = useState("");
  const [placeData, setPlaceData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://transcendx.onrender.com/place",
        {
          name: placeName,
        }
      );
      const data = response.data;

      // Extracting important details
      const { bestPlaces, culturalEvents } = extractDetails(data);

      setPlaceData({ bestPlaces, culturalEvents });
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  };

  // Extract important details from the response data
  const extractDetails = (data) => {
    const bestPlacesRegex = /\*\*(.*?)\*\*/g;
    const culturalEventsRegex = /(?:\*\*(.*?)\*\*:\*\*(.*?)\*\*)/g;

    let bestPlaces = [];
    let culturalEvents = [];

    let match;
    while ((match = bestPlacesRegex.exec(data)) !== null) {
      bestPlaces.push(match[1]);
    }

    while ((match = culturalEventsRegex.exec(data)) !== null) {
      culturalEvents.push({ event: match[1], details: match[2] });
    }

    return { bestPlaces, culturalEvents };
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              marginRight: 96,
              marginTop: 65,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                alignSelf: "flex-start",
              }}
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
        {placeData && (
          <ScrollView style={styles.placeDetailsContainer}>
            <Text style={styles.sectionTitle}>Best Places to Visit</Text>
            {placeData.bestPlaces.map((place, index) => (
              <Text key={index} style={styles.placeInfo}>
                {place}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Cultural Events</Text>
            {placeData.culturalEvents.map((event, index) => (
              <View key={index}>
                <Text style={styles.eventTitle}>{event.event}</Text>
                <Text style={styles.eventDetails}>{event.details}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <BottomTab style={{ marginTop: "auto" }} />
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
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  eventDetails: {
    fontSize: 16,
    marginBottom: 10,
    color: "#444",
  },
});
export default Place;
