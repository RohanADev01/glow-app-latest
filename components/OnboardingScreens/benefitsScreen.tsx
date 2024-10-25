import { router } from 'expo-router';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const BenefitsScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />

      <Text style={styles.title}>{onboardingQuestionsList[9].title}</Text>

      <View
        style={{
          ...styles.contentContainer,
          marginHorizontal: 20,
          marginTop: 40,
          justifyContent: 'flex-start',
        }}
      >
        {onboardingQuestionsList[9].options?.map((benefit, index) => (
          <View key={index} style={styles.benefitContainer}>
            <Text style={styles.benefitEmoji}>
              {onboardingQuestionsList[9].optionsEmojis?.[index]}
            </Text>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push('/(auth)/facial-analysis-screen');
          }}
        >
          <Text style={styles.buttonText}>
            {onboardingQuestionsList[9].continueButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
