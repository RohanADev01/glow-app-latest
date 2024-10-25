import { useRevenueCat } from "@/hooks/useRevenueCat";
import { checkOrCreateUserId, getUserId } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native"; // {{ edit_1 }}

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const { error, customerInfo } = useRevenueCat();

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
      setLoading(false);
    };

    checkOrCreateUserId().catch((error) => {
      console.error("Error in checkOrCreateUserId:", error);
    });

    fetchUserId();
  }, []);

  useEffect(() => {
    if (mounted && !loading) {
      if (userId) {
        console.log(userId);
        if (customerInfo) {
          console.log(
            "purchases from index: ",
            JSON.stringify(customerInfo, null, 2)
          );

          if (customerInfo.activeSubscriptions.length > 0) {
            router.replace("/(home)");
          } else {
            router.replace("/(auth)/welcome");
            // router.replace("/(home)");
            // router.replace("/(auth)/unlock-results-screen");
          }
        }
        if (error) {
          console.error("RevenueCat Error:", error);
          router.replace("/(auth)/welcome");
          // router.replace("/(home)");
          // router.replace("/(auth)/unlock-results-screen");
        }
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [customerInfo, error, userId, mounted, loading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Page;
