import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import { useRouter } from "expo-router";
import Purchases, {
  CustomerInfo,
  PurchasesError,
  PurchasesOfferings,
} from "react-native-purchases";

const API_KEYS = {
  ios: "appl_ygiCuafSyHvNHJDrjhAUwNyccsM",
  android: "your_android_api_key",
};

export function useRevenueCat() {
  const [priceString, setPriceString] = useState<string>("");
  const [revenueCatOfferings, setRevenueCatOfferings] =
    useState<PurchasesOfferings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
    async function initializePurchases() {
      try {
        await Purchases.configure({
          apiKey: API_KEYS[Platform.OS as keyof typeof API_KEYS],
        });
        console.log("RevenueCat configured successfully");

        const info = await Purchases.getCustomerInfo();
        setCustomerInfo(info);
        // console.log("Customer info:", JSON.stringify(info, null, 2));

        const isSubscribed = info.entitlements.active["glowProWeekly"];
        if (isSubscribed) {
          console.log("User is already subscribed. Navigating to home.");
          // router.push("/(home)");
          return;
        }

        const offerings = await Purchases.getOfferings();
        // console.log(
        //   "RevenueCat offerings:",
        //   JSON.stringify(offerings, null, 2)
        // );

        if (offerings?.current?.availablePackages?.length ?? 0 > 0) {
          const weeklyPackage = offerings.current?.availablePackages?.find(
            (pkg) => pkg.packageType === "WEEKLY"
          );

          if (weeklyPackage) {
            const weeklyPriceString = weeklyPackage.product.priceString;
            setPriceString(weeklyPriceString);
            // console.log("Weekly price string:", weeklyPriceString);
          }

          setRevenueCatOfferings(offerings);
          console.log("Successfully set RevenueCat offerings.");
        } else {
          console.log("No offerings available");
        }
      } catch (error) {
        console.error("Error initializing purchases:", error);
      }
    }

    initializePurchases();
  }, [router]);

  async function handleWeeklyPurchase({
    setIsPaymentLoading,
  }: {
    setIsPaymentLoading?: any;
  }) {
    console.log("handleWeeklyPurchase started");
    setIsPaymentLoading(true);
    try {
      if (!revenueCatOfferings?.current?.weekly) {
        console.log("No weekly offering available");
        setError("No weekly offering available");
        setIsPaymentLoading(false);
        return;
      }

      console.log("Attempting purchase...");
      const purchaseResult = await Purchases.purchasePackage(
        revenueCatOfferings.current.weekly
      );
      // console.log("Purchase result:", JSON.stringify(purchaseResult, null, 2));

      const updatedCustomerInfo = await Purchases.getCustomerInfo();
      setCustomerInfo(updatedCustomerInfo);
      // console.log(
      //   "Updated customer info:",
      //   JSON.stringify(updatedCustomerInfo, null, 2)
      // );

      if (updatedCustomerInfo.entitlements.active["glowProWeekly"]) {
        console.log("Weekly entitlement is now active");
        router.replace("/glow-results-screen");
      } else {
        console.log("Weekly entitlement is not active after purchase");
        setError("Purchase was not successful. Please try again.");
      }

      setIsPaymentLoading(false);
    } catch (error) {
      setIsPaymentLoading(false);
      if ((error as PurchasesError).userCancelled) {
        console.log("Purchase cancelled by user");
      } else {
        setError(
          `An error occurred during purchase: ${(error as Error).message}`
        );
      }
    }
    console.log("handleWeeklyPurchase completed");
    setIsPaymentLoading(false);
  }

  async function handleRestorePurchases() {
    setIsRestoring(true);
    try {
      const restoredInfo = await Purchases.restorePurchases();
      setCustomerInfo(restoredInfo);
      if (restoredInfo.activeSubscriptions.length > 0) {
        console.log("Purchases restored successfully");
        Alert.alert(
          "Success",
          "Your purchases have been restored successfully."
        );
        router.replace("/glow-results-screen");
      } else {
        console.log("No active subscriptions found");
        Alert.alert(
          "No Subscriptions",
          "No active subscriptions were found to restore."
        );
      }
    } catch (error) {
      console.error("Error restoring purchases:", error);
      setError("Failed to restore purchases. Please try again.");
      Alert.alert("Error", "Failed to restore purchases. Please try again.");
    } finally {
      setIsRestoring(false);
    }
  }

  return {
    priceString,
    revenueCatOfferings,
    error,
    handleWeeklyPurchase,
    customerInfo,
    handleRestorePurchases,
    isRestoring,
  };
}
