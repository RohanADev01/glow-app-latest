import { images } from '@/constants';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../constants/onboarding';

const Start = () => {
  return (
    <ImageBackground
      resizeMode='cover'
      source={images.screenBg} // Background image with cover mode
      style={styles.container} // Reusing container style
    >
      <SafeAreaView className='flex h-full'>
        <StatusBar barStyle='dark-content' backgroundColor='#6a51ae' />

        {/* Header section */}
        {/* <View style={styles.headerContainer}>
        <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
      </View> */}
        <View className='flex items-center mb-10'>
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        {/* Title section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            We’ve helped thousands of people glow up.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          {/* Before/After Image section */}
          <View style={{ ...styles.snapPlaceholder, backgroundColor: 'white' }}>
            <Image
              source={images.startGlowUpImg}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        {/* Footer with button */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(auth)/sign-in')}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Start;
