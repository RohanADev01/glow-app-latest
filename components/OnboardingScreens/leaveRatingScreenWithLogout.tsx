// import { useAuth } from '@clerk/clerk-expo';
// import { router } from 'expo-router';
// import React, { useEffect } from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { onboardingQuestionsList, styles } from '../../constants/onboarding';

// export const LeaveRatingScreen = ({
//   navigation,
//   onNext,
//   onAuthComplete,
// }: {
//   navigation: any;
//   onNext: () => void;
//   onAuthComplete: any;
// }) => {
//   const { signOut, isSignedIn } = useAuth();

//   useEffect(() => {
//     if (!isSignedIn) {
//       router.replace('/(auth)/start');
//     }
//   }, [isSignedIn]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{onboardingQuestionsList[8].title}</Text>
//       <Text style={styles.subtitleCaption}>
//         {onboardingQuestionsList[8].subtitle}
//       </Text>

//       <View style={styles.contentContainer}>
//         <View style={{ ...styles.imagePlaceholder, marginVertical: 40 }} />
//       </View>

//       <View style={styles.footerContainer}>
//         {/* <TouchableOpacity style={styles.button} onPress={onNext}> */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             signOut();
//           }}
//         >
//           <Text style={styles.buttonText}>
//             {onboardingQuestionsList[8].continueButton}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
