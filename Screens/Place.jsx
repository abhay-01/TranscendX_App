import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Place = () => {
  const [placeName, setPlaceName] = useState("");
  const [placeData, setPlaceData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post("https://transcendx.onrender.com/place", {
        name: placeName,
      });
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter place name"
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
            <Text key={index} style={styles.placeInfo}>{place}</Text>
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
      {/* <BottomTab logout={logout} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  placeDetailsContainer: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    color: "#333",
  },
  placeInfo: {
    fontSize: 16,
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
