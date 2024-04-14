import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; 
import BottomTab from "../components/bottombar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ChatBubbleLeftRightIcon } from "react-native-heroicons/solid";

const Account = () => {
  const [showPosts, setShowPosts] = useState(true);
  const [email, setEmail] = useState("");
  const [profileData, setProfileData] = useState([]); 
  const [image, setImage] = useState(true);

  useEffect(() => {
    getEmailFromStorage();
  }, []);

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      if (storedEmail !== null) {
        setEmail(storedEmail);
      }
    } catch (error) {
      console.log("Error retrieving email from AsyncStorage:", error);
    }
  };

  console.log("Email:", email);
  const fetchProfileData = async () => {
    try {
      const response = await axios.post(
        "https://transcendx.onrender.com/profile",
        {
          email: email,
        }
      );

      console.log("Profile data:", JSON.stringify(response, null, 2));

      const results = response.data.map((item) => ({
        url: item.url,
      }));

      setProfileData(results);

      console.log("Profile data:", JSON.stringify(profileData, null, 2));
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (showPosts) {
      fetchProfileData();
    }
  }, [showPosts]);

  const userData = {
    name: "John Doe",
  };

  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity style = {{
          position: "absolute",
          left: -112,
          top: 10,
        }} onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />

        </TouchableOpacity>
        <Image
          source={require("../assets/dummy.png")}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Show Posts</Text>
        <Switch
          value={showPosts}
          onValueChange={(value) => setShowPosts(value)}
        />
        <Text style={styles.switchText}>Show Images</Text>
      </View>
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {showPosts ? (
          <View>
            <Text style={styles.tabTitle}>Posts</Text>
            <View style={styles.imageContainer}>
              {profileData?.map((item, index) => (
                <Image
                  key={index}
                  source={{ uri: item.url }}
                  style={styles.image}
                />
              ))}
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.tabTitle}>Images</Text>
            <View style={styles.imageContainer}>
              {profileData?.map((item, index) => (
                <Image
                  key={index}
                  source={{ uri: item.url }}
                  style={styles.image}
                />
              ))}
            </View>
          </View>
        )}

      </ScrollView>
      {/* <BottomTab style={{ marginTop: "auto", width:"100%" ,marginRight:34}} /> */}
      
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          backgroundColor: '#66CCC5',
          padding: 10,
          borderRadius: 30,
        }}

        onPress={() => navigation.navigate("Caption")}
      >
        <ChatBubbleLeftRightIcon color={"#fff"} size={34} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  post: {
    fontSize: 16,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  image: {
    width: "48%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Account;
