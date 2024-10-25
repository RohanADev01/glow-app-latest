import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUserId } from "@/lib/auth"; // Import useUser
import { usePointsStore } from "@/store/pointsStore"; // Import the points store
import { useAuraTasksStore } from "@/store/auraTasksStore"; // Import the aura tasks store
import { useRouter } from "expo-router"; // Import useRouter

const AuraTaskModal = ({ task, visible, onClose, onMarkAsDone }) => {
  const userId = getUserId(); // Get user object
  // Extract userId from user object
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const { tasks, setTasks } = useAuraTasksStore();
  const { totalPoints, setTotalPoints } = usePointsStore(); // Get setTotalPoints from the store
  const router = useRouter(); // Get router instance

  const handleConfirm = async () => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }
    setLoading(true);
    try {
      // Update aura points
      const newTotalPoints = totalPoints + task.points;
      await fetch(`/(api)/update-aura-points/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalPoints: newTotalPoints }), // Update points
      });

      // Update tasks
      const newTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, is_completed: true } : t
      );

      console.log("new tasks: ", JSON.stringify(newTasks, null, 2));

      console.log("*****************");

      console.log("og tasks: ", JSON.stringify(tasks, null, 2));

      await fetch(`/(api)/update-tasks/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks: newTasks }), // Update the tasks array
      });

      // Fetch updated total points
      const pointsResponse = await fetch(`/(api)/get-aura-points/${userId}`);
      const pointsData = await pointsResponse.json();
      setTotalPoints(pointsData.totalPoints); // Update the total points in the store

      // Fetch updated tasks
      const response = await fetch(`/(api)/get-tasks/${userId}`);
      const data = await response.json();
      const updatedTasks = data.data;
      const completedTasks = updatedTasks.filter(
        (task) => !task.is_completed // Filter tasks where is_completed is false
      );
      setTasks(completedTasks);

      setSuccessMessage("Task and points updated successfully!"); // Set success message
    } catch (error) {
      console.error("Error updating tasks or points:", error);
    } finally {
      setLoading(false);
      onClose(); // Close the modal after processing
    }
  };

  const handleShowTaskDetails = () => {
    // Create a new function
    const taskDetails = {
      title: task.title,
      tips: task.tips,
      description: task.description,
      category: task.category,
    };
    const taskDetailsString = JSON.stringify(taskDetails);
    router.replace(
      `/chat/taskChat?taskDetails=${encodeURIComponent(taskDetailsString)}`
    );
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="bg-[#2A2A2A] p-6 rounded-t-3xl">
            <Text className="text-white text-2xl font-bold mb-2">
              {task.title}
            </Text>
            <Text className="text-indigo-500 font-bold mb-4 text-xl">
              +{task.points} Aura Points
            </Text>
            <Text className="text-white text-lg mb-4">{task.description}</Text>
            <Text className="text-white text-xl font-bold mb-2">
              Tips & Tricks:
            </Text>
            <Text className="text-white text-base mb-6">{task.tips}</Text>
            <View className="mb-4">
              <View>
                <Text className="text-white text-lg font-bold">
                  Difficulty:
                </Text>
                <Text className="text-white text-base">{task.difficulty}</Text>
              </View>
              <View className="pt-3">
                <Text className="text-white text-lg font-bold">Category:</Text>
                <Text className="text-white text-base">{task.category}</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between mb-2 mt-5">
              <Text className="text-white text-lg font-bold">
                Mark as done:
              </Text>
              <TouchableOpacity
                onPress={handleConfirm} // Call handleConfirm on press
                className={`bg-indigo-500 py-2 px-4 rounded-full ${loading ? "opacity-50" : ""}`}
                disabled={loading} // Disable button while loading
              >
                {loading ? ( // Show loading indicator
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold">Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
            {successMessage && ( // Show success message
              <Text className="text-green-600 text-center mt-4">
                {successMessage}
              </Text>
            )}
            <TouchableOpacity
              className="bg-indigo-500 py-3 px-6 rounded-full flex-row items-center justify-center my-5"
              onPress={handleShowTaskDetails} // Use the new function
            >
              <Ionicons name="chatbubbles-outline" size={24} color="white" />
              <Text className="text-white font-bold ml-2">Show me how</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-indigo-500 py-3 px-6 rounded-full"
              onPress={onClose}
            >
              <Text className="text-indigo-500 text-center font-bold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AuraTaskModal;
