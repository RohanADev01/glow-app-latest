import { Ionicons } from "@expo/vector-icons"; // For adding icons if needed
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from "../../constants/onboarding";

export const SkinConcernsScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />

      <Text style={styles.title}>{onboardingQuestionsList[5].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[5].subtitle}
      </Text>

      <View
        style={{
          ...styles.contentContainer,
          marginTop: 40,
          justifyContent: 'flex-start',
        }}
      >
        {onboardingQuestionsList[5].options?.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleGoal(goal)}
            style={[
              styles.optionCard,
              selectedGoals.includes(goal) && styles.optionCardSelected,
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name={
                  goal === 'Acne'
                    ? 'medical-outline'
                    : goal === 'Wrinkles'
                      ? 'water-outline'
                      : goal === 'Dark Spots'
                        ? 'contrast-outline'
                        : goal === 'Oiliness'
                          ? 'water-outline'
                          : 'help-circle-outline'
                }
                size={24}
                color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
              />
              <View
                style={{
                  marginLeft: 12,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Text
                  style={[
                    styles.optionTitle,
                    selectedGoals.includes(goal) && styles.optionTitleSelected,
                  ]}
                >
                  {goal}
                </Text>
                {/* <Text
                  style={[
                    styles.optionDescription,
                    selectedGoal === goal ? styles.optionTitleSelected : {},
                  ]}
                > */}
                {/* Add appropriate descriptions for each skin concern */}
                {/* </Text> */}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedGoals.length === 0 && styles.buttonDisabled,
          ]}
          onPress={onNext}
          disabled={selectedGoals.length === 0}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
