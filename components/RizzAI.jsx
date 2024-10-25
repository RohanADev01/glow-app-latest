import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider"; // Add import for Slider
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator"; // Add import for ImageManipulator
import * as ImagePicker from "expo-image-picker"; // Update import
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const RizzAI = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const router = useRouter();
  const [showResponse, setShowResponse] = useState(false); // New state for response screen
  const [spiceLevel, setSpiceLevel] = useState(0); // New state for spice level

  const compressImage = async (uri) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.size > 1000000) {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1000 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    }
    return uri;
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      const base64 = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/jpeg;base64,${base64}`); // Update to set base64 image
    }
  };

  const handleSubmit = async () => {
    if (!chatInput.trim() && !image) {
      alert("Please enter a message before submitting.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/(api)/(openai)/rizz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, chatInput, spiceLevel }), // Include spiceLevel in the request body
      });
      const data = await res.json();
      console.log(data);
      setResponse(data);
      setShowResponse(true); // Show response screen after fetching
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle text share
  const handleTextShare = async (text) => {
    try {
      await Share.share({
        message: text, // Share the text
      });
    } catch (error) {
      console.error("Error sharing text:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <ScrollView className="flex-1">
        {loading ? ( // Show loading screen
          <View className="flex-1 justify-center items-center h-screen space-y-5">
            <Text className="text-black text-xl px-5 text-center">
              Just a moment while we find the best rizz for you...
            </Text>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : showResponse ? ( // Show response screen
          <View className="flex-1 bg-white p-5">
            <Text className="text-black text-2xl mb-4 font-bold">
              Here is your Rizz!
            </Text>
            <Text className="text-black pb-3">Our Pick</Text>
            <TouchableOpacity
              className="bg-blue-500 py-3 px-5 font-semibold rounded-2xl space-y-2 mb-2"
              onPress={() => handleTextShare(response.flirtyResponse)} // Update to share text
            >
              <Text className="text-white">{response.flirtyResponse}</Text>
              <Ionicons
                name="copy"
                size={20}
                color="white"
                className="absolute left-3 bottom-3"
              />
            </TouchableOpacity>
            <Text className="text-black pb-3">Alternate Responses</Text>
            {response.alternativeResponses.map((altResponse, index) => (
              <TouchableOpacity
                key={index}
                className="bg-blue-500 py-3 px-5 font-semibold rounded-2xl mb-2 space-y-2"
                onPress={() => handleTextShare(altResponse)} // Update to share text
              >
                <Text className="text-white ">{altResponse}</Text>
                <Ionicons
                  name="copy"
                  size={20}
                  color="white"
                  className="absolute left-3 bottom-3"
                />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setShowResponse(false)} // Go back to input
              className="border border-stone-300 p-3 rounded-full space-x-3 mt-10 flex-row items-center justify-center"
            >
              <Ionicons
                name="reload"
                size={24}
                color="black"
                className="mr-2"
              />
              <Text className="text-black text-xl text-center font-bold">
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView className="px-5">
            <TouchableOpacity onPress={() => router.back()} className="mb-4">
              <Text className="text-blue-500">Back</Text>
            </TouchableOpacity>
            <View className="flex-row items-center mb-4">
              <View className="flex justify-center items-center w-full">
                <Image
                      source={require("@/assets/images/aura/logo.png")}
                  className="w-10 h-10"
                />
              </View>
            </View>
            <Text className="text-black text-2xl mb-10 mx-7 font-bold text-center">
              Upload screenshot and get rizz ideas!
            </Text>
            {image && ( // Check if an image has been uploaded
              <View className="flex items-center relative">
                <Image
                  source={{ uri: image }} // Display the uploaded image
                  style={{
                    width: "100%", // Match the width to the container
                    height: 200, // Match image height
                    borderRadius: 10,
                    marginVertical: 10,
                    borderWidth: 2, // Add border width
                    borderColor: "#D3D3D3", // Set border color to light gray
                  }}
                />
                <TouchableOpacity
                  onPress={() => setImage(null)} // Function to remove the image
                  className="absolute top-2 right-2 bg-white rounded p-1"
                >
                  <Ionicons name="close" size={20} color="black" />
                </TouchableOpacity>
              </View>
            )}
            {/* <TextInput
              placeholder="Or tell me more about your chat..."
              placeholderTextColor="#666"
              value={chatInput}
              onChangeText={setChatInput}
              className="bg-gray-100 text-black p-4 rounded-lg mb-4"
            /> */}
            <TouchableOpacity
              onPress={handleImageUpload}
              className="flex-row items-center justify-center border-stone-300 border w-full p-4 rounded-full"
            >
              <Ionicons name="cloud-upload-outline" size={24} color="black" />
              <Text className="ml-2 text-xl font-semibold">Upload Image</Text>
            </TouchableOpacity>
            <Text className="text-black text-xl mb-2 mt-7 font-bold">
              Spice Level <Text className="text-blue-500 ">{spiceLevel}</Text>
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={spiceLevel}
              onValueChange={setSpiceLevel} // Update spice level on change
              minimumTrackTintColor="#3B82F6" // Blue background for minimum track
              maximumTrackTintColor="#000000" // Keep maximum track color as black
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className="mb-24 bg-blue-500 text-white font-bold w-full mt-4 py-3 rounded-full"
            >
              <Text className="text-center text-white font-bold text-2xl">
                Get Rizz Reply
              </Text>
            </TouchableOpacity>
            {loading && <Text className="text-black">Loading...</Text>}

            {/* {response && (
              <View className="mt-4">
                <Text className="text-black bg-blue-200 p-3 rounded-lg mb-2 shadow-md">
                  Analysis: {response.analysis}
                </Text>
                <Text className="text-black bg-green-200 p-2 rounded-lg mb-2">
                  Flirty Response: {response.flirtyResponse}
                </Text>
              </View>
            )} */}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RizzAI;
