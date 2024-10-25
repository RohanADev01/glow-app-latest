import glowTitle from "@/assets/images/glow-title.png";
import { images } from "@/constants";
import { useQuestionStore } from "@/store/onboardingStore";
import { getUserId } from "@/lib/auth";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ImageStyle,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { styles } from "../constants/onboarding";
import { AgeScreen } from "./OnboardingScreens/ageScreen";
import { AuthScreen } from "./OnboardingScreens/authScreen";
import { BeautyGoalsScreen } from "./OnboardingScreens/beautyGoalsScreen";
import { BenefitsScreen } from "./OnboardingScreens/benefitsScreen";
// import { LeaveRatingScreen } from "./OnboardingScreens/leaveRatingScreen";
import { MakeUpPreferencesScreen } from "./OnboardingScreens/makeupPreferencesScreen";
import { ProductPreferencesScreen } from "./OnboardingScreens/productPreferencesScreen";
// import { ReferralScreen } from "./OnboardingScreens/referralScreen";
import { SkinConcernsScreen } from "./OnboardingScreens/skinConcernsScreen";
import { TrustedScreen } from "./OnboardingScreens/trustedScreen";

export const onboardingQuestionsScreens = [
  TrustedScreen,
  // ReferralScreen,
  AgeScreen,
  BeautyGoalsScreen,
  SkinConcernsScreen,
  ProductPreferencesScreen,
  MakeUpPreferencesScreen,
  // LeaveRatingScreen,
  BenefitsScreen,
];

const OnboardingQuestions = () => {
  // const userId = await getUserId();
  const { showQuestions, setShowQuestions } = useQuestionStore();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Last slide check
  const isLastSlide = activeIndex === onboardingQuestionsScreens.length - 1;

  if (isLoading) {
    return (
      <View style={localStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#8400FF" />
      </View>
    );
  }

  const handleQuestionsComplete = useCallback(() => {
    setShowQuestions(true);
  }, []);

  const indexChanged = (index: number) => {
    console.log(index);
  };

  const handleOnboardingComplete = useCallback(() => {
    router.replace("/(auth)/sign-up"); // Redirect to sign-up after onboarding
  }, []);

  if (isLoading) {
    return (
      <View style={localStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#8400FF" />
      </View>
    );
  }

  const goToNextSlide = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleOnIndexChanged = (index: number) => {
    setActiveIndex(index);
  };

  const handleAuthComplete = () => {
    setShowQuestions(true);
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={images.screenBg}
      style={styles.container}
    >
      <SafeAreaView className="flex h-full">
        <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

        <View className="flex items-center mb-10">
          <Image source={glowTitle} style={styles.logo as ImageStyle} />
        </View>

        <Swiper
          ref={swiperRef}
          showsPagination={false}
          loop={false}
          // onIndexChanged={(index) => handleOnIndexChanged(index)}
          scrollEnabled={false}
        >
          {onboardingQuestionsScreens.map((ScreenComponent, index) => (
            <ScreenComponent
              key={index}
              navigation={navigation}
              onNext={goToNextSlide}
              onAuthComplete={handleAuthComplete}
            />
          ))}
        </Swiper>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default OnboardingQuestions;
