import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUserId } from "@/lib/auth";

const TaskChatModal = ({ isVisible, onClose, taskDetails }) => {
  const userId = getUserId();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const prompt = `You are an AI assistant. This is some data about a task: ${taskDetails}. Based on the data, tailor your responses specifically to the topic in the template, ensuring they are helpful and actionable.`;
  console.log("prompt from modalllll ", prompt);

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = { text: inputText, user: true };
      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setLoading(true);

      try {
        const response = await fetch("/(api)/(openai)/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: inputText,
            prompt: prompt,
            userId: userId,
          }),
        });

        const data = await response.json();
        if (data.response) {
          setMessages((prev) => [
            ...prev,
            { text: data.response, user: false },
          ]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      className="bg-white rounded-t-3xl z-50"
    >
      <View className="flex-1 bg-white rounded-t-3xl">
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose} className="mr-4">
            <Ionicons name="close" size={24} color="#4B5563" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Chat</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                className={`p-2 m-2 rounded-lg ${
                  item.user ? "bg-blue-500 self-end" : "bg-gray-200 self-start"
                }`}
              >
                <Text
                  className={`${item.user ? "text-white" : "text-black"} text-lg`}
                >
                  {item.text}
                </Text>
              </View>
            )}
            contentContainerStyle={{ flexGrow: 1 }}
            inverted
          />
          <View className="flex-row items-center p-4 border-t border-gray-200">
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2 text-lg"
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={handleSend}
              className="bg-blue-500 rounded-full p-3"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="send" size={15} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default TaskChatModal;
