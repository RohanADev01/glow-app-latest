import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const MakeUpPreferencesScreen = ({
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
    <View style={{ ...styles.container, paddingHorizontal: 0 }}>
      <StatusBar barStyle='light-content' />

      <Text style={styles.title}>{onboardingQuestionsList[7].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[7].subtitle}
      </Text>

      <ScrollView
        style={{ height: '48%', marginTop: 40, paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            ...styles.contentContainer,
            justifyContent: 'flex-start',
          }}
        >
          {onboardingQuestionsList[7].options?.map((goal, index) => (
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
                {goal === 'Vegan' ? (
                  <Ionicons
                    name='leaf-outline'
                    size={24}
                    color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
                  />
                ) : goal === 'Organic' ? (
                  <Ionicons
                    name='flower-outline'
                    size={24}
                    color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
                  />
                ) : goal === 'Fragrance-free' ? (
                  <Ionicons
                    name='water-outline'
                    size={24}
                    color={selectedGoals.includes(goal) ? '#8A2BE2' : 'black'}
                  />
                ) : (
                  <Ionicons
                    name='paw-outline'
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
                  <Text
                    style={[
                      styles.optionDescription,
                      selectedGoals.includes(goal)
                        ? styles.optionTitleSelected
                        : {},
                    ]}
                  >
                    {goal === 'Vegan'
                      ? 'I prefer makeup products without animal-derived ingredients.'
                      : goal === 'Organic'
                        ? 'I prefer makeup products made with organic ingredients.'
                        : goal === 'Fragrance-free'
                          ? 'I prefer makeup products without added fragrances.'
                          : 'I prefer makeup products not tested on animals.'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={{ ...styles.footerContainer, paddingHorizontal: 24 }}>
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
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
};
