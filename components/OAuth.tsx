import { useOAuth } from "@clerk/clerk-expo";
import { Image, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import { useQuestionStore } from "@/store/onboardingStore";
import * as Haptics from "expo-haptics";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { setShowQuestions } = useQuestionStore();

  const handleGoogleSignIn = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // const result = await googleOAuth(startOAuthFlow);

    // console.log("google auth result: ", result);

    // if (result.code === "success") {
    //   // Alert.alert("Success", "Session exists. Redirecting to home screen.");
    //   // router.replace("/(root)/(tabs)/home");
    //   setShowQuestions(true);
    // }

    // Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center gap-x-3"></View>

      <CustomButton
        title="Log In with Google"
        className="w-full shadow-xs bg-white"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
