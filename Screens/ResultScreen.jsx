import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ResultScreen({ route }) {
  const { caption, textSolution, url } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={25} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Results</Text>
      </View>
      <Image source={{ uri: url }} style={styles.image} />
      <Text style={styles.caption}>Caption:</Text>
      <Text style={styles.caption}>{caption}</Text>
      <Text style={styles.textSolution}>Text Solution:</Text>
      <Text style={styles.textSolution}>{textSolution}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
    borderRadius: 20,
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  textSolution: {
    fontSize: 18,
    marginBottom: 30,
    color: "#666",
  },
});
