import { images } from "@/constants";
import { ProfileScreenNavigationProp } from "@/constants/home/types";
import { useAuth } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../../constants/onboarding";
import * as Linking from "expo-linking";

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const openPrivacyPolicy = () => {
    Linking.openURL(
      "https://getdoryai.notion.site/Privacy-Policy-104f1bbab427809dbef3dc9de97ee495?pvs=4"
    );
  };

  const openTermsOfUse = () => {
    Linking.openURL(
      "https://getdoryai.notion.site/Terms-of-Use-b1810bbb67e547a39813b0e396446853?pvs=4"
    );
  };

  const openContactUs = () => {
    Linking.openURL("https://tally.so/r/w4vOYA");
  };

  const openSuggestFeature = () => {
    Linking.openURL("https://tally.so/r/w4vOYA");
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={images.homeBgLarger}
      style={styles.container}
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

        {/* Logo and Header */}
        <View style={localStyles.logoContainer}>
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        {/* Title */}
        <View style={{ ...styles.headerContainer, flex: 0.2 }}>
          <Text
            style={{
              ...styles.title,
              fontSize: 30,
              fontWeight: "600",
              letterSpacing: -0.8,
            }}
          >
            My Profile
          </Text>
        </View>

        {/* Main Content */}
        <View style={{ ...localStyles.contentContainer, flex: 3 }}>
          <ScrollView
            style={localStyles.scrollView}
            contentContainerStyle={{
              paddingBottom: 30,
              marginBottom: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* <TouchableOpacity
              style={{
                ...localStyles.sectionTop,
                borderBottomWidth: 1,
                borderRadius: 12,
              }}
            >
              <Text style={localStyles.sectionText}>Face Scans</Text>
            </TouchableOpacity> */}

            {/* Personal Section */}
            <Text style={localStyles.sectionHeader}>PERSONAL</Text>
            <TouchableOpacity
              style={{ ...localStyles.sectionTop, borderBottomWidth: 0 }}
              onPress={() => navigation.navigate("Scan")}
            >
              <Text style={localStyles.sectionText}>My Glow Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.sectionBottom}
              onPress={() => {
                router.push("/(auth)/facial-analysis-screen"); 
              }}
            >
              <Text style={localStyles.sectionText}>Start a new scan</Text> 
            </TouchableOpacity>

            {/* Help & Support Section */}
            <Text style={localStyles.sectionHeader}>HELP & SUPPORT</Text>
            {/* <TouchableOpacity style={localStyles.sectionTop}>
              <Text style={localStyles.sectionText}>
                Frequently Asked Questions
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{ ...localStyles.sectionTop, borderBottomWidth: 0 }}
              onPress={openSuggestFeature}
            >
              <Text style={localStyles.sectionText}>Suggest a Feature</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.sectionBottom}
              onPress={openContactUs}
            >
              <Text style={localStyles.sectionText}>Contact us</Text>
            </TouchableOpacity>

            {/* Legal Section */}
            <Text style={localStyles.sectionHeader}>LEGAL</Text>
            <TouchableOpacity
              style={{ ...localStyles.sectionTop, borderBottomWidth: 0 }}
              onPress={openPrivacyPolicy}
            >
              <Text style={localStyles.sectionText}>Privacy policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.sectionBottom}
              onPress={openTermsOfUse}
            >
              <Text style={localStyles.sectionText}>Terms of Use</Text>
            </TouchableOpacity>

            {/* Log Out & Delete Account Section */}
            {/* <View style={localStyles.buttonContainer}>
              <TouchableOpacity
                style={localStyles.logoutButton}
                onPress={() => {
                  signOut();
                }}
              >
                <Text style={localStyles.logoutText}>Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...localStyles.logoutButton, backgroundColor: "red" }}
                onPress={() => {
                  signOut();
                }}
              >
                <Text style={localStyles.deleteAccountText}>
                  Delete Account
                </Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </View>
        <View style={{ ...styles.footerContainer, flex: 0.3 }}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginVertical: 20,
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  sectionTop: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 0,
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  sectionMiddle: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 0,
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  sectionBottom: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  sectionText: {
    fontSize: 16,
    color: "#000",
  },
  sectionHeader: {
    fontSize: 14,
    color: "#6c757d",
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  deleteAccountText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
});

export default ProfileScreen;
