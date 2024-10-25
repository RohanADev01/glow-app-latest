import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch"; // Import the fetchAPI function
import { getUserId } from "@/lib/auth";
import { ActivityIndicator } from "react-native";
import { PointerType } from "react-native-gesture-handler";
import { usePointsStore } from "@/store/pointsStore";
import { useRouter } from "expo-router";

const AuraResultModal = ({ isVisible, onClose, result }) => {
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const userId = getUserId();
  const [loading, setLoading] = useState(false); // Add loading state
  const [scoreRecorded, setScoreRecorded] = useState(false); // Add state for score recorded
  const { totalPoints, setTotalPoints } = usePointsStore();
  const router = useRouter();

  const openBottomModal = (category) => {
    setSelectedCategory(category);
    setBottomModalVisible(true);
  };

  const closeBottomModal = () => {
    setBottomModalVisible(false);
    setSelectedCategory(null);
  };

  const AuraBreakdownItem = ({ category, description, points, positive }) => (
    <TouchableOpacity
      onPress={() =>
        openBottomModal({ category, description, points, positive })
      }
    >
      <View className="bg-[#242424] rounded-lg p-4 shadow-md h-32">
        <View className="flex-row justify-between items-center">
          <Text
            className={`text-2xl font-bold ${positive ? "text-green-600" : "text-red-600"}`}
          >
            {points >= 0 ? `+${points}` : points}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </View>
        <Text className="text-white mt-1 font-bold">{category}</Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-gray-300 mt-1"
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Safeguard: If result is null or undefined, show an error message
  if (!result) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <SafeAreaView className="flex-1 bg-black justify-center items-center">
          <Text className="text-white text-xl mb-4">
            Oops! Something went wrong.
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-blue-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  }

  const activityTotalPoints = result.aura_categories.reduce(
    (sum, category) => sum + category.points,
    0
  );

  const BottomModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={bottomModalVisible}
      onRequestClose={closeBottomModal}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeBottomModal}
        style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="flex-1 justify-center">
          <TouchableOpacity activeOpacity={1}>
            <View className="bg-[#242424] rounded-3xl p-6 mx-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-2xl font-bold text-white">
                  {selectedCategory?.category}
                </Text>
                <TouchableOpacity onPress={closeBottomModal}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <Text
                className={`text-3xl font-bold mb-4 ${selectedCategory?.positive ? "text-green-600" : "text-red-600"}`}
              >
                {selectedCategory?.points >= 0
                  ? `+${selectedCategory?.points}`
                  : selectedCategory?.points}{" "}
                aura
              </Text>
              <Text className="text-white text-lg mb-4">
                {selectedCategory?.description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const updateScore = async (userId) => {
    console.log(userId);
    console.log(activityTotalPoints);
    console.log(totalPoints);

    const newTotalPoints = totalPoints + activityTotalPoints;
    console.log(newTotalPoints);

    try {
      const response = await fetch(`/(api)/update-aura-level-tier/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalPoints: newTotalPoints }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to update aura level and tier:", error);
    }
  };

  const handleGiveAdvice = () => {
    // Create a new function
    //  const taskDetails = {
    //    title: task.title,
    //    tips: task.tips,
    //    description: task.description,
    //    category: task.category,
    //  };

    const details = result;
    console.log(details);
    const detailsString = JSON.stringify(details);
    router.replace(
      `/chat/auraChat?details=${encodeURIComponent(detailsString)}`
    );
    onClose();
  };

  const handleRecordScore = async () => {
    const userId = user.id; // Replace with actual user ID
    setLoading(true); // Set loading to true
    await updateScore(userId);

    // Fetch updated total points after score is recorded
    try {
      const response = await fetch(`/(api)/get-aura-points/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setTotalPoints(data.totalPoints); // Set the total points from the response
    } catch (error) {
      console.error("Failed to fetch total points:", error);
    }

    setScoreRecorded(true); // Set score recorded to true
    setLoading(false); // Set loading to false
    setScoreRecorded(false);
    onClose(); // Close the modal after recording the score
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      className="pb-12 mb-12"
    >
      <SafeAreaView
        className="flex-1 bg-black"
        edges={["top", "left", "right"]}
      >
        <ScrollView className="flex-1 px-5 pt-12">
          <View className="flex-row justify-between items-center mb-5 sticky top-0 bg-black py-3 z-10">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <Image
              source={images.auralogo}
              style={{ width: 50, height: 50 }}
              className="mb-4"
            />
            <Text className="text-white text-2xl font-bold text-center mb-2">
              {result.activity || "No Activity"}
            </Text>
            <Text className="text-white mb-5 text-center px-10">
              {result.comment || "No comment available."}
            </Text>
          </View>

          <View className="rounded-lg p-4 mb-5 items-center space-y-3">
            <Text className="text-white text-xl font-semibold">
              Overall aura points
            </Text>

            <Text
              className={`text-5xl font-bold ${activityTotalPoints < 0 ? "text-red-600" : "text-green-600"}`}
            >
              {activityTotalPoints >= 0
                ? `+${activityTotalPoints}`
                : activityTotalPoints}
            </Text>
          </View>

          {/* <TouchableOpacity
            className="w-full pb-5"
            onPress={() => handleGiveAdvice()}
          >
            <LinearGradient
              colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-full py-3 px-6 shadow-lg flex-row items-center justify-center w-full"
            >
              <Text className="text-white font-bold mr-2">Give me advice</Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </LinearGradient>
          </TouchableOpacity> */}

          <Text className="text-white font-bold text-lg mb-3">
            Aura Breakdown
          </Text>

          <View className="flex-row flex-wrap ">
            {(result.aura_categories || []).map((category, index) => (
              <View key={index} className="w-1/2 p-1 ">
                <View className="relative overflow-hidden">
                  <AuraBreakdownItem
                    category={category.category}
                    description={category.description}
                    points={category.points}
                    positive={category.positive}
                  />
                </View>
              </View>
            ))}
          </View>

          <View className="mb-24 mt-5 flex-1">
            <TouchableOpacity
              className="bg-indigo-500 py-3 px-6 rounded-full flex-row items-center justify-center my-5"
              onPress={handleGiveAdvice} // Use the new function
            >
              <Ionicons name="chatbubbles-outline" size={24} color="white" />
              <Text className="text-white font-bold ml-2">Give me advice</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRecordScore} disabled={loading}>
              <LinearGradient
                colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-full py-3 px-6 shadow-lg flex-row items-center justify-center"
              >
                <Text className="text-white font-bold mr-2">
                  {loading
                    ? "Recording..."
                    : scoreRecorded
                      ? "Score Recorded"
                      : "Record Score"}
                </Text>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="arrow-forward" size={16} color="white" />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Safeguard: Show a message if aura_categories is empty */}
          {(!result.aura_categories || result.aura_categories.length === 0) && (
            <Text className="text-gray-700 text-center">
              No aura breakdown available.
            </Text>
          )}
        </ScrollView>
        <SafeAreaView edges={["bottom"]}>
          <BottomModal />
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  );
};

export default AuraResultModal;
