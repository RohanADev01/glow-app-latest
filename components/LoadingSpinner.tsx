import { images } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LoadingSpinner = ({ bgImg }: { bgImg?: any }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spinner animation
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };

    spin();

    // Dots animation
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot1Opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => animateDots());
    };

    animateDots();
  }, []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground
      source={bgImg || images.screenBg} // Replace with your image URL or local path
      style={styles.backgroundImage}
      resizeMode='cover'
    >
      <View style={styles.container}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]}>
          <LinearGradient
            colors={['#d4c1ff', '#b5d6ff', '#f3d3f5', '#d4c1ff']}
            style={styles.gradientBorder}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
          >
            <View style={styles.overlayCircle} />
          </LinearGradient>
        </Animated.View>
        {/* Animated "Loading..." text */}
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading</Text>
          <Animated.Text style={[styles.loadingText, { opacity: dot1Opacity }]}>
            .
          </Animated.Text>
          <Animated.Text style={[styles.loadingText, { opacity: dot2Opacity }]}>
            .
          </Animated.Text>
          <Animated.Text style={[styles.loadingText, { opacity: dot3Opacity }]}>
            .
          </Animated.Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBorder: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayCircle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
  loadingContainer: {
    flexDirection: 'row',
    marginTop: 18,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
});

export default LoadingSpinner;
