import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

const Layout = () => {
  const { isSignedIn } = useAuth();
  const [initialRouteName, setInitialRouteName] = useState("start");

  useEffect(() => {
    if (isSignedIn) {
      setInitialRouteName("welcome");
    }
  }, [isSignedIn]);

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="start" options={{ headerShown: false }} />
      <Stack.Screen name="results-screen" options={{ headerShown: false }} />
      <Stack.Screen
        name="unlock-results-screen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="glow-results-screen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="push-results-screen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="facial-analysis-screen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
