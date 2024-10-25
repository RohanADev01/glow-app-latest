import { images } from '@/constants';
import React from 'react';
import {
  Image,
  ImageStyle,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const TrustedScreen = ({
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

      <Text style={styles.title}>{onboardingQuestionsList[0].title}</Text>

      <View style={styles.contentContainer}>
        {/* <View style={{ ...styles.imagePlaceholder, marginVertical: 40 }} /> */}
        <Image
          source={images.modelDifferenceImg}
          style={
            {
              ...styles.imagePlaceholder,
              width: 320,
              height: 320,
              backgroundColor: 'transparent',
            } as ImageStyle
          }
        />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>
            {onboardingQuestionsList[0].continueButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
