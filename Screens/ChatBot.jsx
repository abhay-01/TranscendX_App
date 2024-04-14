import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTab from "../components/bottombar";
import { ChatBubbleLeftRightIcon } from "react-native-heroicons/solid";

const ChatBot = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const typingAnimation = new Animated.Value(0);

  // Ref for the ScrollView
  const scrollViewRef = useRef();

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isTyping]);

  useEffect(() => {
    // Load messages from AsyncStorage when component mounts
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem("chatMessages");
        if (storedMessages !== null) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error("Error loading chat messages:", error);
      }
    };

    loadMessages();
  }, []);

  const saveMessagesToStorage = async (messages) => {
    try {
      await AsyncStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving chat messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      const message = inputMessage;
      const newMessages = [...messages, { sender: "user", text: message }];
      setMessages(newMessages);
      setInputMessage("");
      setIsTyping(true);

      const response = await axios.post(
        "https://transcendx.onrender.com/chat",
        { message }
      );
      const botResponse = response.data;

      setTimeout(() => {
        const updatedMessages = [...newMessages, { sender: "bot", text: botResponse }];
        setMessages(updatedMessages);
        saveMessagesToStorage(updatedMessages);
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to scroll to the end of messages
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          marginLeft={5}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            padding: 20,
            marginHorizontal: 63,
          }}
        >
          Chat with our AI Bot
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.message,
              msg.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
        {isTyping && (
          <Animated.View style={{ opacity: typingAnimation }}>
            <Text style={[styles.messageText, styles.botMessage]}>
              Typing...
            </Text>
          </Animated.View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={setInputMessage}
          clearTextOnFocus
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  message: {
    maxWidth: "80%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#64CCC5",
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFD700",
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#64CCC5",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChatBot;
