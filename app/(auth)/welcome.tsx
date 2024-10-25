import OnboardingQuestions from "@/components/OnboardingQuestions";
import { getUserId } from "@/lib/auth";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";

const Home = () => {
  // const userId = getUserId();
  // const { showQuestions, setShowQuestions } = useQuestionStore();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authCompleted, setAuthCompleted] = useState(false); // To track if authentication is finished
  const navigation = useNavigation();

  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getId() {
      const id = await getUserId();
      if (id) {
        console.log("user id from welcome screen: ", id);
        setUserId(id);
      }
    }

    getId();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8400FF" />
      </View>
    );
  }

  return <OnboardingQuestions />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default Home;
