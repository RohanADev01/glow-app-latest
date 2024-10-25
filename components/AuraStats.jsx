import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePointsStore } from "@/store/pointsStore";
import { getUserId } from "@/lib/auth";
import * as Progress from "react-native-progress";

const AuraStats = () => {
  const { totalPoints, setTotalPoints } = usePointsStore();
  const userId = getUserId();
  const [level, setLevel] = useState(1);
  const [tier, setTier] = useState("Novice");
  const [nextLevel, setNextLevel] = useState(2);
  const [nextTier, setNextTier] = useState("Novice");
  const [progress, setProgress] = useState(0);

  const levels = [
    { level: 50, points: 1000000, tier: "Transcendent" },
    { level: 45, points: 750000, tier: "Legendary" },
    { level: 40, points: 500000, tier: "Mythical" },
    { level: 35, points: 350000, tier: "Grandmaster" },
    { level: 30, points: 250000, tier: "Master" },
    { level: 25, points: 175000, tier: "Expert" },
    { level: 20, points: 120000, tier: "Veteran" },
    { level: 15, points: 80000, tier: "Adept" },
    { level: 10, points: 50000, tier: "Skilled" },
    { level: 9, points: 30000, tier: "Proficient" },
    { level: 8, points: 20000, tier: "Intermediate" },
    { level: 7, points: 12000, tier: "Capable" },
    { level: 6, points: 8000, tier: "Competent" },
    { level: 5, points: 5000, tier: "Novice" },
    { level: 4, points: 3000, tier: "Beginner" },
    { level: 3, points: 2000, tier: "Apprentice" },
    { level: 2, points: 1500, tier: "Initiate" },
    { level: 1, points: 1000, tier: "Newcomer" },
    { level: 0, points: 0, tier: "Unranked" },
  ];

  useEffect(() => {
    if (user && user.id) {
      const fetchTotalPoints = async () => {
        try {
          const response = await fetch(`/(api)/get-aura-points/${user.id}`);
          const data = await response.json();
          setTotalPoints(data.totalPoints);
        } catch (error) {
          console.error("Failed to fetch total points:", error);
        }
      };

      fetchTotalPoints();
    }
  }, [setTotalPoints, user]);

  useEffect(() => {
    const currentLevelInfo = calculateLevelAndTier(totalPoints);
    const nextLevelInfo = getNextLevelInfo(currentLevelInfo.level);

    setLevel(currentLevelInfo.level);
    setTier(currentLevelInfo.tier);
    setNextLevel(nextLevelInfo.level);
    setNextTier(nextLevelInfo.tier);

    const currentLevelMinPoints = getLevelMinPoints(currentLevelInfo.level);
    const nextLevelMinPoints = getLevelMinPoints(nextLevelInfo.level);
    const progressValue =
      (totalPoints - currentLevelMinPoints) /
      (nextLevelMinPoints - currentLevelMinPoints);
    setProgress(progressValue);
    console.log("progress value is: ", progressValue);
  }, [totalPoints]);

  const getLevelMinPoints = (level) => {
    const levelInfo = levels.find((l) => l.level === level);
    return levelInfo ? levelInfo.points : 0;
  };

  const calculateLevelAndTier = (points) => {
    for (const levelInfo of levels) {
      if (points >= levelInfo.points) {
        return { level: levelInfo.level, tier: levelInfo.tier || "Novice" };
      }
    }
    return { level: 1, tier: "Novice" };
  };

  const getNextLevelInfo = (currentLevel) => {
    const currentIndex = levels.findIndex((l) => l.level === currentLevel);
    if (currentIndex > 0) {
      return levels[currentIndex - 1];
    }
    return levels[0]; // Return max level if already at max
  };

  return (
    <View className="mb-10">
      <View className=" overflow-hidden mx-5">
        <View className="mt-4 bg-[#242424] border-black rounded-2xl">
          <View className="border-b-2 border-black p-3">
            <View className="flex-row items-center">
              <Ionicons name="flame" size={24} color="#FF6B6B" />
              <Text className="text-2xl font-bold ml-2 text-white">
                {totalPoints}
              </Text>
            </View>
            <Text className="text-white text-sm">Aura Points</Text>
          </View>

          <View className="p-3">
            <View className="flex-row items-center">
              <Ionicons name="trophy" size={24} color="#4ECDC4" />
              <Text className="text-2xl font-bold ml-2 text-white">{tier}</Text>
            </View>
            <Text className="text-white text-sm">Tier</Text>
          </View>
        </View>

        {/* level progress bar */}
        {/* <View className="flex-row justify-between mt-2">
          <Text className="text-gray-600">{tier}</Text>
        </View> */}
        <View className="flex-row justify-between mb-2 mt-3">
          <Text className="text-white  font-bold">Level {level}</Text>
          <Text className="text-white  font-bold">Level {nextLevel}</Text>
        </View>

        <Progress.Bar
          progress={progress}
          width={null}
          height={10}
          color="#6F01E3"
          unfilledColor="#242424"
          borderWidth={0}
        />
      </View>
    </View>
  );
};

export default AuraStats;
