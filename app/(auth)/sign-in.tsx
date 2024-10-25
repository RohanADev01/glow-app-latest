import OAuth from "@/components/OAuth";
import { images } from "@/constants";
import { styles } from "@/constants/onboarding";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignIn = () => {
  // const { isSignedIn } = useAuth();

  // useEffect(() => {
  //   if (isSignedIn) {
  //     router.replace("/(auth)/welcome");
  //   }
  // }, [isSignedIn]);

  return (
    <ImageBackground
      source={images.signinBackground} // Use the existing background image
      style={localStyles.background}
    >
      <SafeAreaView>
        <View style={[localStyles.contentContainer, { paddingHorizontal: 24 }]}>
          <Text style={localStyles.title}>
            Start your glow up journey today
          </Text>
          <Text style={localStyles.subtitle}>
            Get started on your glow up journey today with Glow.
          </Text>

          {/* <TouchableOpacity onPress={() => console.log("auth triggered!!")}>
          <View style={localStyles.oauthButton}>
            <OAuth />
          </View>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "black" }]}
            onPress={() => {
              router.push("/(auth)/welcome");
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: "white", textAlign: "center" },
              ]}
            >
              Get Started 🙌
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end", // Align content to the bottom
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    alignItems: "center", // Center content horizontally
    paddingBottom: 60, // Add padding at the bottom of the screen
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000", // Black text color
    marginBottom: 10,
    width: "60%",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#555", // Lighter text color for subtitle
    marginBottom: 40,
    width: "70%",
    marginTop: 20,
  },
  oauthButton: {
    backgroundColor: "#fff", // White background
    paddingVertical: 6,
    borderRadius: 50, // Rounded corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 10,
  },
  oauthText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#000", // Black text color
  },
});

export default SignIn;
