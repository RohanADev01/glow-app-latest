import { images } from '@/constants';
import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { onboardingQuestionsList, styles } from '../../constants/onboarding';

export const LeaveRatingScreen = ({
  navigation,
  onNext,
  onAuthComplete,
}: {
  navigation: any;
  onNext: () => void;
  onAuthComplete: any;
}) => {
  const { signOut, isSignedIn } = useAuth();

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     router.replace("/(auth)/start");
  //   }
  // }, [isSignedIn]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />

      <Text style={styles.title}>{onboardingQuestionsList[8].title}</Text>
      <Text style={styles.subtitleCaption}>
        {onboardingQuestionsList[8].subtitle}
      </Text>

      <View
        style={{
          ...styles.contentContainer,
          justifyContent: 'flex-start',
          marginTop: 32,
        }}
      >
        {/* <View style={{ ...styles.imagePlaceholder, marginVertical: 40 }} /> */}
        <View
          className='flex flex-col w-full flex-start items-start justify-start'
          style={{ paddingHorizontal: 10 }}
        >
          <Image
            source={images.ratingStars}
            resizeMode='contain'
            className='w-full border-gray-200 h-20 rounded-lg'
            style={{ borderWidth: 1 }}
          />
        </View>
      </View>

      <View style={styles.footerContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={onNext}> */}
        <TouchableOpacity
          style={styles.button}
          // onPress={() => {
          //   signOut();
          // }}
          onPress={onNext}
        >
          <Text style={styles.buttonText}>
            {onboardingQuestionsList[8].continueButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
