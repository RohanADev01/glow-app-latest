import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import { getUserId } from "@/lib/auth";
import AuraTaskModal from "./AuraTaskModal"; // Import the new component
import { useAuraTasksStore } from "@/store/auraTasksStore";

const mockDailyTasks = [
  {
    id: `1`,
    title: `Morning Meditation`,
    description: `Start your day with a 10-minute meditation session.`,
    points: 20,
    category: `Mindfulness`,
  },
  {
    id: `2`,
    title: `Gratitude Journaling`,
    description: `Write down three things you're grateful for today.`,
    points: 15,
    category: `Mental Health`,
  },
  {
    id: `3`,
    title: `Random Act of Kindness`,
    description: `Do something nice for someone without expecting anything in return.`,
    points: 25,
    category: `Social`,
  },
  {
    id: `4`,
    title: `Digital Detox Hour`,
    description: `Spend one hour completely free from screens and digital devices.`,
    points: 30,
    category: `Wellness`,
  },
  {
    id: `5`,
    title: `Learn Something New`,
    description: `Spend 15 minutes learning about a topic you're curious about.`,
    points: 20,
    category: `Personal Growth`,
  },
];

const TaskCard = ({ task, onPress }) => (
  <TouchableOpacity
    className="bg-[#242424] rounded-2xl p-5 mr-4 w-52 h-48"
    onPress={onPress}
  >
    <View className="mb-3">
      <View className="bg-[#131313] rounded-full px-3 py-1 self-start">
        <Text
          className="text-indigo-600 font-semibold text-xs"
          numberOfLines={1}
        >
          {task.category}
        </Text>
      </View>
    </View>
    <Text className="text-white text-lg font-bold mb-2" numberOfLines={1}>
      {task.title}
    </Text>
    <Text className="text-white text-sm mb-2" numberOfLines={2}>
      {task.description}
    </Text>
    <Text className="text-indigo-500 font-bold text-lg">
      +{task.points} aura pts
    </Text>
  </TouchableOpacity>
);

const DailyAuraTasks = () => {
  const userId = getUserId(); // Get user object
  // Extract userId from user object
  const { tasks, setTasks } = useAuraTasksStore(); // Use the store
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     if (!userId) return; // Ensure userId is available
  //     try {
  //       const response = await fetch(`/(api)/get-tasks/${userId}`);
  //       const data = await response.json();
  //       const incompleteTasks = data.data.filter((task) => !task.is_completed); // Filter out completed tasks
  //       console.log("incomplete tasks:   ", incompleteTasks);
  //       setTasks(incompleteTasks.slice(0, 5)); // Get only the first 5 incomplete tasks
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, [userId]);

  const handleCompleteTask = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && !completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      setTotalPoints(totalPoints + task.points);

      // Fetch updated tasks
      try {
        const response = await fetch(`/(api)/get-tasks/${userId}`);
        const data = await response.json();
        const newTasks = data.data.filter((task) => !task.is_completed);

        // Randomly select a new incomplete task
        if (newTasks.length > 0) {
          const randomTask =
            newTasks[Math.floor(Math.random() * newTasks.length)];
          setTasks((prevTasks) => [...prevTasks, randomTask]);
        }
      } catch (error) {
        console.error("Error fetching new tasks:", error);
      }
    }
    setSelectedTask(null);
  };

  const progress = tasks.length > 0 ? completedTasks.length / tasks.length : 0;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center mt-10">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  const handleShuffleTasks = () => {
    // console.log(JSON.stringify(tasks, null, 2));
    const incompleteTasks = tasks.filter((task) => task.is_completed === false);
    // console.log(JSON.stringify(incompleteTasks, null, 2));
    // console.log(incompleteTasks);
    const randomTasks = incompleteTasks.sort(() => Math.random() - 0.5);

    console.log(JSON.stringify(randomTasks, null, 3));
    setTasks(randomTasks);
  };

  return (
    <View className="mt-7 pb-48">
      <View className="flex-row justify-between items-center mb-4 px-5">
        <Text className="text-xl font-bold text-white">Daily Aura Tasks</Text>
        <TouchableOpacity
          onPress={handleShuffleTasks}
          className="border border-indigo-500 rounded-full px-3 py-2 flex flex-row items-center font-bold"
        >
          <Ionicons
            name="shuffle"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-semibold">Shuffle Tasks</Text>
        </TouchableOpacity>
      </View>

      {/* <View className="rounded-xl  mb-5 shadow-sm">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="s font-semibold">Today's Progress</Text>
          <Text className="text-blue-500 font-bold">{totalPoints} pts</Text>
        </View>
        <Progress.Bar
          progress={progress}
          width={null}
          height={10}
          color="#3B82F6"
          unfilledColor="#E5E7EB"
          borderWidth={0}
        />
        <Text className="text-gray-600 mt-2">
          {completedTasks.length} of {tasks.length} tasks completed
        </Text>
      </View> */}
      <View style={{ position: "relative" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5"
          // contentContainerStyle={{ paddingRight: 20, paddingLeft: 20 }}
        >
          {tasks &&
            tasks
              .slice(0, 5)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={() => setSelectedTask(task)}
                />
              ))}
        </ScrollView>
      </View>
      {/* </ScrollView> */}
      {selectedTask && (
        <AuraTaskModal
          task={selectedTask}
          visible={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          // onMarkAsDone={() => handleCompleteTask(selectedTask.id)}
        />
      )}
      {/* <TouchableOpacity
        onPress={handleShuffleTasks}
        className="bg-blue-500 rounded p-3 mt-4"
      >
        <Text className="text-white text-center">Shuffle Tasks</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default DailyAuraTasks;
