import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from "../../constants/onboarding";

export const BeautyGoalsScreen = ({
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
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal]
    );
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />

      <Text style={styles.title}>{onboardingQuestionsList[4].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[4].subtitle}
      </Text>

      <View
        style={{
          ...styles.contentContainer,
          marginTop: 40,
          justifyContent: 'flex-start',
        }}
      >
        {onboardingQuestionsList[4].options?.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleGoal(goal)}
            style={[
              styles.optionCard,
              selectedGoals.includes(goal) ? styles.optionCardSelected : {},
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Use different icons based on the goal */}
              {goal === 'Find the best products for me' ? (
                <Ionicons
                  name='search-outline'
                  size={24}
                  color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
                />
              ) : goal === 'Get personalized glow up tips' ? (
                <Ionicons
                  name='bulb-outline'
                  size={24}
                  color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
                />
              ) : goal === 'Find personalized beauty products' ? (
                <Ionicons
                  name='gift-outline'
                  size={24}
                  color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
                />
              ) : goal === 'Improve skin quality' ? (
                <Ionicons
                  name='leaf-outline'
                  size={24}
                  color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
                />
              ) : (
                <Ionicons
                  name='ellipsis-horizontal-outline'
                  size={24}
                  color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
                />
              )}
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={[
                    styles.optionTitle,
                    selectedGoals.includes(goal)
                      ? styles.optionTitleSelected
                      : {},
                  ]}
                >
                  {goal}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedGoals.length === 0 && localStyles.buttonDisabled,
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

const localStyles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitleCaption: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footerContainer: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "#00796B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#CCC",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};
