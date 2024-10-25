import { fetchAPI } from "@/lib/fetch";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import auracheck from "../assets/images/aura/auracheck.png";
import AuraResultModal from "./AuraResultModal";

const CheckAura = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auraResult, setAuraResult] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const compressImage = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);

      console.log("original size: ", fileInfo.size);

      if (fileInfo.size > 1000000) {
        console.log("compressing file...");
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 1000 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        return manipResult.uri;
      } else {
        return uri;
      }
    } catch (error) {
      console.error("Error compressing image:", error);
      return uri;
    }
  };

  const handleCameraCapture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      // Updated this line
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      const base64 = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/jpeg;base64,${base64}`);
    }
  };

  const handleGalleryUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      const base64 = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/jpeg;base64,${base64}`);
    }
  };

  const handleImageUpload = () => {
    Alert.alert(
      "Choose Image Source",
      "Would you like to take a photo or choose from your gallery?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Take Photo",
          onPress: handleCameraCapture,
        },
        {
          text: "Choose from Gallery",
          onPress: handleGalleryUpload,
        },
      ]
    );
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await fetchAPI("/(api)/(openai)/aurascore", {
        method: "POST",
        body: JSON.stringify({ text: inputText, imageUri: image }),
      });

      console.log(response);
      setAuraResult(response);
      setIsModalVisible(true);
      setInputText("");
      setImage(null);
    } catch (error) {
      console.error("Error checking aura:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isExpanded) {
    return (
      <TouchableOpacity
        className="mx-5 bg-[#151515] py-7 border border-stone-600 rounded-2xl"
        onPress={() => setIsExpanded(true)}
      >
        {/* <LinearGradient
          // colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-5 rounded-xl"
        > */}
        <View className="flex-row justify-between items-center">
          <Image source={auracheck} className="mx-auto mb-3" />
        </View>
        <Text className="text-white text-xl font-extrabold mt-2 text-center">
          Aura Analyzer
        </Text>
        <Text className="text-white mx-auto text-sm mt-1 w-2/3 opacity-80 text-center">
          Check your or your friend’s aura score by typing or taking a photo.
        </Text>
        {/* </LinearGradient> */}
      </TouchableOpacity>
    );
  }

  return (
    <View className="rounded-xl mx-5">
      <View className="flex-row space-x-3 items-center mb-3">
        <TouchableOpacity
          onPress={() => setIsExpanded(false)}
          className="p-2 rounded-full bg-stone-800"
        >
          <Ionicons name="arrow-back" size={15} color="white" />
        </TouchableOpacity>
        {/* <Text className="text-xl font-bold">Check aura score</Text> */}
      </View>
      <View className="mb-3 p-5 rounded-xl bg-[#151515] border border-stone-600">
        <TextInput
          className="rounded-lg mb-2.5  h-[80px] text-base w-full text-white"
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tell us what happened..."
          placeholderTextColor="#666"
          multiline
        />
        {image && (
          <View className="mb-2.5 relative">
            <Image
              source={{ uri: image }}
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
              onPress={() => setImage(null)}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={handleImageUpload} className="rounded-lg">
          <Ionicons name="image-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSend}
        disabled={!image && inputText.trim() === ""}
        className="py-3 bg-indigo-700 rounded-full"
      >
        <View className="flex-row items-center justify-center space-x-2">
          <Text className="text-white font-bold text-2xl text-center">
            Get aura score
          </Text>
          {loading && <ActivityIndicator size="small" color="white" />}
        </View>
      </TouchableOpacity>

      <AuraResultModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        result={auraResult}
      />
    </View>
  );
};

export default CheckAura;
