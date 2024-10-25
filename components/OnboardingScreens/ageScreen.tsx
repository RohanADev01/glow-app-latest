import React, { useState } from "react";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { onboardingQuestionsList, styles } from "../../constants/onboarding";

export const AgeScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  const [selectedYear, setSelectedYear] = useState("2000");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>{onboardingQuestionsList[3].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[3].subtitle}
      </Text>

      <View style={styles.contentContainer}>
        <TextInput
          value={selectedYear}
          onChangeText={setSelectedYear}
          style={{
            ...styles.input,
            width: "60%",
            height: 50,
            borderColor: "#836E89",
            backgroundColor: "white",
            borderWidth: 1,
            borderRadius: 20,
            textAlign: "center",
            fontSize: 18,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          keyboardType="numeric"
          maxLength={4}
          placeholder="Enter birth year"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
