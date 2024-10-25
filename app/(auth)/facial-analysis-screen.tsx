import { images } from "@/constants";
import { onboardingQuestionsList, styles } from "@/constants/onboarding";
import { useImageStore } from "@/store/imageStore";
import { getUserId } from "@/lib/auth";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const FacialAnalysisScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getId() {
      const id = await getUserId();
      if (id) {
        console.log("user id from facial analysis screen screen: ", id);
        setUserId(id);
      }
    }

    getId();
  }, []);
  const navigation = useNavigation();
  // compress image
  const compressImage = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);

      if ("size" in fileInfo && fileInfo.size > 1000000) {
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [
            { resize: { width: 1000 } },
            { rotate: 180 },
            { flip: ImageManipulator.FlipType.Vertical },
          ],
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

  async function handleGetScore() {
    if (image) {
      // console.log(image);
      await handleImageUpload(image);
      router.replace("/(auth)/results-screen");
    }
  }

  // handle camera capture permissions and selfie capture
  const handleCameraCapture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      // setImage(compressedUri);
      // handleImageUpload(compressedUri);
      const base64 = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/jpeg;base64,${base64}`);
    }
  };

  // Handle gallery image upload
  const handleGalleryUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      // setImage(compressedUri);
      // handleImageUpload(compressedUri);
      const base64 = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/jpeg;base64,${base64}`);
    }
  };

  const handleImageUpload = async (imageUri: string) => {
    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    try {
      // store image URL in Zustand store
      useImageStore.getState().clearImages();
      useImageStore.getState().addImage(imageUri);
      // console.log(imageUri);

      console.log(imageUri);
    } catch (error: any) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image", error.message);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Upload Image",
      "Choose an option to upload your face photo so Glow can provide a facial analysis.",
      [
        { text: "Take a Selfie", onPress: handleCameraCapture },
        { text: "Choose Existing Image", onPress: handleGalleryUpload },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground
      source={images.screenBg}
      style={localStyles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

        <View className="flex items-center mb-10">
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        <View style={styles.container}>
          <View style={localStyles.header}>
            <TouchableOpacity
              style={[
                localStyles.backButton,
                localStyles.tabBase,
                localStyles.activeTab,
                {
                  backgroundColor: "#F4EFFF",
                  borderWidth: 2,
                  borderColor: "#7c4cff",
                },
              ]}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#7c4cff" />
            </TouchableOpacity>
            <Text style={[localStyles.centeredTitle]}>
              {onboardingQuestionsList[10].title}
            </Text>
          </View>
          <Text style={styles.subtitleCaption}>
            {onboardingQuestionsList[10].subtitle}
          </Text>

          <View style={styles.contentContainer}>
            <View style={styles.snapPlaceholder}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              ) : (
                <Image
                  source={require("../../assets/images/model.png")}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              )}
            </View>
          </View>

          <View style={styles.footerContainer}>
            {image && (
              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={() => {
                  setImage(null);
                  useImageStore.getState().clearImages();
                }}
              >
                <Text style={[styles.buttonText, { color: "#333" }]}>
                  Choose Another
                </Text>
              </TouchableOpacity>
            )}
            {image ? (
              <TouchableOpacity
                style={[styles.button, { marginBottom: 10 }]}
                onPress={handleGetScore}
              >
                <Text style={[styles.buttonText, { color: "#333" }]}>
                  Start Facial Analysis 🧐
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={showImagePickerOptions}
              >
                <Text style={styles.buttonText}>Upload or take a selfie</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 0,
  },
  centeredTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 4,
  },
  tabBase: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "black",
  },
});

export default FacialAnalysisScreen;
