import { router } from "expo-router";
import React, { useEffect } from "react";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import LoadingSpinner from "@/components/LoadingSpinner";
import { images } from "@/constants";
import { CustomerInfo } from "@revenuecat/purchases-typescript-internal"; // Add this import

const PushResultsScreen = () => {
  const { customerInfo } = useRevenueCat();

  useEffect(() => {
    if (customerInfo) {
      const isSubscribed =
        (customerInfo as CustomerInfo).activeSubscriptions?.length > 0; 
      const nextScreen = isSubscribed
        ? "/glow-results-screen"
        : "/unlock-results-screen";
      router.replace(nextScreen);

      // console.log(customerInfo);
    }
  }, [customerInfo]);

  // useEffect(() => {
  //   router.replace("/unlock-results-screen");
  // }, []);

  return <LoadingSpinner bgImg={images.homeBgLarger} />;
};

export default PushResultsScreen;
