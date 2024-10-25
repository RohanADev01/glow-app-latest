import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getUserId } from "@/lib/auth";
import { usePointsStore } from "@/store/pointsStore";

const AuraLevelTier = () => {
  const userId = getUserId();
  const { totalPoints } = usePointsStore();
  const [level, setLevel] = useState(1);
  const [tier, setTier] = useState("Novice");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateLevelAndTier = (points) => {
      let calculatedLevel = 1;
      let calculatedTier = "Novice";

      if (points >= 650000) {
        calculatedLevel = 100;
        calculatedTier = "Transcendent";
      } else if (points >= 490000) {
        calculatedLevel = 99;
      } else if (points >= 430000) {
        calculatedLevel = 98;
      } else if (points >= 370000) {
        calculatedLevel = 97;
      } else if (points >= 310000) {
        calculatedLevel = 96;
      } else if (points >= 250000) {
        calculatedLevel = 95;
        calculatedTier = "Guru";
      } else if (points >= 200000) {
        calculatedLevel = 94;
      } else if (points >= 150000) {
        calculatedLevel = 93;
      } else if (points >= 100000) {
        calculatedLevel = 92;
      } else if (points >= 50000) {
        calculatedLevel = 91;
        calculatedTier = "Adept";
      } else {
        calculatedLevel = Math.floor(points / 1000) + 1;
      }

      return { level: calculatedLevel, tier: calculatedTier };
    };

    const fetchAuraData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/(api)/get-aura-points/${user.id}`);
        const data = await response.json();
        const points = data.totalPoints || 0;

        const { level: calculatedLevel, tier: calculatedTier } =
          calculateLevelAndTier(points);
        setLevel(calculatedLevel);
        setTier(calculatedTier);
      } catch (error) {
        console.error("Failed to fetch aura points:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuraData();
  }, [user]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text>Loading aura data...</Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-white rounded-lg shadow-md">
      <Text className="text-xl font-bold">Aura Level: {level}</Text>
      <Text className="text-lg">Aura Tier: {tier}</Text>
      <Text className="text-gray-600">Total Points: {totalPoints}</Text>
    </View>
  );
};

export default AuraLevelTier;
