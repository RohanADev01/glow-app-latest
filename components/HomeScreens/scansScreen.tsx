import { images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../constants/onboarding";
import LoadingSpinner from "../LoadingSpinner";
import { getUserId } from "@/lib/auth";
import { fetchAPI } from "@/lib/fetch";
import ScanResultModal from "../ScanResultModal";
import { format } from "date-fns"; // Add this import
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type Scan = {
  id: number;
  glowScore: {
    scores: {
      overall: number;
      potential: number;
      glowFactor: number;
      skinHealth: number;
      authenticity: number;
      featureHarmony: number;
    };
    percentile: number;
    keyStrengths: string[];
    skinAnalysis: {
      skinType: string;
      skinTexture: string;
      skinConcerns: string[];
      hydrationLevel: string;
      skinToneAndColor: string[];
      skinVitalityIndicators: string[];
    };
    facialCharacteristics: {
      jawline: string;
      eyeShape: string;
      lipShape: string;
      faceShape: string;
    };
    enhancementSuggestions: string[];
  };
  recommendations: {
    result: Array<{
      id: number;
      steps: Array<{
        id: number;
        name: string;
        details: string;
        importance: string;
        explanation: string;
        relatedFeature: string;
      }>;
      title: string;
      userFeaturesSummary: string;
    }>;
  };
  imageUrl: string; // Assuming the image is stored as a URL or path
  createdAt: string;
};

const ScansScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scans, setScans] = useState<Scan[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  useEffect(() => {
    const fetchUserScans = async () => {
      const userId = await getUserId();

      // if (!userId) return;
      if (userId) {
        console.log(userId);
        try {
          setIsLoading(true);
          const response = await fetchAPI(
            `https://wandering-sun-9736.kiettran255.workers.dev/api/get-scan-results/${userId}`
          );
          console.log(response.data);
          const scanResults = response.data.map(
            (item: { scan_results: Scan }) => item.scan_results
          );
          console.log(scanResults);
          console.log("scan results type shit");
          setScans(scanResults);
        } catch (error) {
          console.error("Error fetching user scans:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserScans();
  }, []);

  if (isLoading) {
    return <LoadingSpinner bgImg={images.homeBgLarger}></LoadingSpinner>;
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={images.homeBgLarger}
      style={styles.container}
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

        <View style={localStyles.logoContainer}>
          <Image source={images.glowTitle} style={styles.logo as ImageStyle} />
        </View>

        {/* Title */}
        <View style={styles.headerContainer}>
          <Text
            style={{
              ...styles.title,
              fontSize: 30,
              fontWeight: "600",
              letterSpacing: -0.8,
              marginTop: 10, // Reduce top margin
            }}
          >
            My Scans
          </Text>
          <Text
            style={{
              ...styles.title,
              fontSize: 20,
              fontWeight: "400",
              marginTop: 16,
              letterSpacing: -0.8,
            }}
          >
            View your scan history
          </Text>
        </View>

        {/* Main Content */}
        <View style={{ ...styles.contentContainer, marginTop: 20, flex: 4.5 }}>
          <ScrollView
            style={localStyles.scrollView}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 30,
              width: "100%",
              marginBottom: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            {scans.map((scan, index) => (
              <TouchableOpacity
                key={index}
                style={localStyles.scanCard}
                className="shadow-sm"
                onPress={() => {
                  setSelectedScan(scan);
                  setModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: scan.imageUrl }}
                  style={localStyles.scanImage}
                />

                <View style={localStyles.scanDetails}>
                  <Text style={localStyles.scanTitle}>Glow Up Scan</Text>
                  {/* <Text style={localStyles.scanDate}>
                    {formatDate(scan.createdAt)}
                  </Text> */}

                  <View style={localStyles.scoreContainer}>
                    <Text style={localStyles.scoreText}>Overall</Text>
                    <Text style={localStyles.scoreValue}>
                      {scan.glowScore?.scores?.overall}
                    </Text>
                    <Text style={localStyles.scoreText}>Potential</Text>
                    <Text style={localStyles.scoreValue}>
                      {scan.glowScore.scores?.potential}
                    </Text>
                    <Text style={localStyles.scoreText}>+4</Text>
                  </View>

                  <View style={localStyles.progressBar}>
                    <LinearGradient
                      colors={["#9B84FF", "#9B84FF"]}
                      style={[
                        localStyles.progressFill,
                        {
                          width: `${scan.glowScore.scores?.overall * 10}%`,
                        },
                      ]}
                    />
                    <LinearGradient
                      colors={["#C7E9FF", "#C7E9FF"]}
                      style={[
                        localStyles.progressFill,
                        {
                          width: `${scan.glowScore.scores?.potential * 10 - scan.glowScore.scores?.overall * 10}%`,
                          position: "absolute",
                          left: `${scan.glowScore.scores?.overall * 10}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ ...styles.footerContainer, flex: 0.7 }}></View>
      </SafeAreaView>
      <ScanResultModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        scanData={selectedScan}
      />
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginVertical: 20,
  },
  scanCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    width: "100%",
  },
  scanImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: "contain",
  },
  scanDetails: {
    flex: 1,
    marginLeft: 10,
  },
  scanTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  scanDate: {
    fontSize: 12,
    color: "#6c757d",
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 12,
    color: "#6c757d",
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
    position: "relative",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
  },
});

export default ScansScreen;
