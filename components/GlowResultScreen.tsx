import { images } from "@/constants";
import { styles } from "@/constants/onboarding";
import { useRecommendationsStore } from "@/store/glowRecommendationsStore";
import { useGlowResultStore } from "@/store/glowResultStore";
import { useImageStore } from "@/store/imageStore";
import { getUserId } from "@/lib/auth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  ImageBackground,
  Platform,
  ScrollView as RNScrollView,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScanResultsStore } from "@/store/scanResultsStore";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const GlowResultScreen = () => {
  const [activeTab, setActiveTab] = useState("Ratings");
  const insets = useSafeAreaInsets();
  const storeImages = useImageStore(
    (state: { images: string[] }) => state.images
  );
  const [unlockBtnAnimatedValue] = useState(new Animated.Value(0));
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  // const userId = getUserId();

  const { scanResults } = useScanResultsStore();
  const { glowScore, recommendations } = scanResults || {};
  const { scores, percentile, facialCharacteristics, skinAnalysis } =
    glowScore || {};

  if (!glowScore && !recommendations) {
    return (
      <View style={localStyles.container}>
        <Text>No glow result available</Text>
      </View>
    );
  }

  const onShare = async () => {
    if (!glowScore) {
      Alert.alert("No data available to share");
      return;
    }

    const message = `
✨ Check out my personalized Glow Profile! ✨

🌟 *Check Out My Ratings* 🌟
-------------------------
💖 *Potential*: ${scores?.potential?.toFixed(1) ?? "N/A"}
✨ *Overall*: ${scores?.overall?.toFixed(1) ?? "N/A"}
🧴 *Skin Health*: ${scores?.skinHealth?.toFixed(1) ?? "N/A"}
⭐️ *Glow Factor*: ${scores?.glowFactor?.toFixed(1) ?? "N/A"}
🎨 *Feature Harmony*: ${scores?.featureHarmony?.toFixed(1) ?? "N/A"}
💋 *Authenticity*: ${scores?.authenticity?.toFixed(1) ?? "N/A"}
-------------------------

I'm glowing! 🌟 #GlowProfile 💗
`;

    try {
      const result = await Share.share({
        message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared successfully
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const ScoreCard = ({
    title,
    score,
    potential,
  }: {
    title: string;
    score: number;
    potential?: boolean;
  }) =>
    potential ? (
      // apply golden gradient as a border, keep card size the same
      <LinearGradient
        colors={["#d0980c", "#fde14a", "#f8efa3", "#fde14a", "#d0980c"]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={localStyles.gradientBorderWrapper}
      >
        <View style={localStyles.innerCard}>
          {/* Regular card inside the gradient border */}
          <View style={localStyles.row}>
            <Text style={localStyles.scoreTitle}>{title}</Text>
            <Text style={localStyles.scoreValue}>{score.toFixed(1)}</Text>
          </View>
          <View style={localStyles.progressBar}>
            <LinearGradient
              colors={["#d0980c", "#eace39", "#f0d91d", "#eace39", "#d0980c"]}
              locations={[0, 0.25, 0.5, 0.75, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                localStyles.progressFill,
                { width: `${(score / 10) * 100}%` },
              ]}
            />
          </View>
        </View>
      </LinearGradient>
    ) : (
      // Regular card without gradient
      <View style={localStyles.scoreCard}>
        <View style={localStyles.row}>
          <Text style={localStyles.scoreTitle}>{title}</Text>
          <Text style={localStyles.scoreValue}>{score.toFixed(1)}</Text>
        </View>
        <View style={localStyles.progressBar}>
          <LinearGradient
            colors={["#da70d6", "#7b68ee", "#87cefa"]} // Original gradient for progress fill
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              localStyles.progressFill,
              { width: `${(score / 10) * 100}%` },
            ]}
          />
        </View>
      </View>
    );

  const CharacteristicItem = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => (
    <View style={localStyles.characteristicItem} className="shadow-md">
      <Text style={localStyles.characteristicTitle}>{title}:</Text>
      <Text style={localStyles.characteristicValue}>{value}</Text>
    </View>
  );

  const CharacteristicCard = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => (
    <View style={localStyles.characteristicCard}>
      <Text style={localStyles.characteristicTitle}>{title}</Text>
      <Text style={localStyles.characteristicValue}>{value}</Text>
    </View>
  );

  const AccordionItem = ({
    title,
    children,
    index,
    isOpen,
    onToggle,
  }: {
    title: string;
    children: any;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    return (
      <View style={localStyles.accordionItem}>
        <TouchableOpacity
          style={localStyles.accordionHeader}
          onPress={onToggle}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                localStyles.accordionStepTitle,
                { color: "black", textAlign: "center", marginRight: 10 },
              ]}
            >
              {index + 1}
            </Text>
            <Text style={localStyles.accordionTitle}>{title}</Text>
          </View>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
        {isOpen && <View style={localStyles.accordionContent}>{children}</View>}
      </View>
    );
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Ratings":
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <ScoreCard
                title="Potential"
                score={scores?.potential ?? 0}
                potential
              />
              <ScoreCard title="Overall" score={scores?.overall ?? 0} />
            </View>
            <View style={localStyles.scoreRow}>
              <ScoreCard title="Skin Health" score={scores?.skinHealth ?? 0} />
              <ScoreCard title="Glow Factor" score={scores?.glowFactor ?? 0} />
            </View>
            <View style={localStyles.scoreRow}>
              <ScoreCard
                title={`Feature${"\n"}Harmony`}
                score={scores?.featureHarmony ?? 0}
              />
              <ScoreCard
                title="Authenticity"
                score={scores?.authenticity ?? 0}
              />
            </View>
          </View>
        );
      case "Facial Analysis":
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title="Eye Shape 👁️"
                value={facialCharacteristics?.eyeShape ?? "N/A"}
              />
              <CharacteristicCard
                title="Face Shape 👩"
                value={facialCharacteristics?.faceShape ?? "N/A"}
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title="Jawline 🧏‍♀️"
                value={facialCharacteristics?.jawline ?? "N/A"}
              />
              <CharacteristicCard
                title="Lip Shape 💋"
                value={facialCharacteristics?.lipShape ?? "N/A"}
              />
            </View>
          </View>
        );
      case "Skin Analysis":
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title="Skin Type 👩"
                value={skinAnalysis?.skinType ?? "N/A"}
              />
              <CharacteristicCard
                title="Hydration Level 💧"
                value={skinAnalysis?.hydrationLevel ?? "N/A"}
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title={`Skin\nTexture 🧴`}
                value={skinAnalysis?.skinTexture ?? "N/A"}
              />
              <CharacteristicCard
                title="Skin Tone 🌼"
                value={
                  Array.isArray(skinAnalysis?.skinToneAndColor)
                    ? skinAnalysis.skinToneAndColor.join(", ")
                    : (skinAnalysis?.skinToneAndColor ?? "N/A")
                }
              />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard
                title={`Skin\nVitality ☀️`}
                value={
                  Array.isArray(skinAnalysis?.skinVitalityIndicators)
                    ? skinAnalysis.skinVitalityIndicators.join(", ")
                    : (skinAnalysis?.skinVitalityIndicators ?? "N/A")
                }
              />
            </View>
          </View>
        );
      case "Glow-Up Tips":
        return (
          <ScrollView style={localStyles.scoresContainer}>
            <View style={localStyles.summarySectionCard}>
              <Image
                source={images.summaryImg}
                style={localStyles.summaryImage}
              />
              <Text style={localStyles.summaryTitle}>Summary</Text>
              <Text>{recommendations?.result[0]?.userFeaturesSummary}</Text>
            </View>
            {recommendations?.result[0]?.steps.map(
              (tip: any, index: number) => (
                <AccordionItem
                  key={tip.id}
                  title={tip.name}
                  index={index}
                  isOpen={openAccordion === index}
                  onToggle={() => toggleAccordion(index)}
                >
                  <Text style={localStyles.boldText}>Explanation</Text>
                  <Text style={localStyles.tipDetails}>{tip.details}</Text>
                  <Text style={localStyles.tipImportance}>
                    <Text style={localStyles.boldText}>Importance: </Text>
                    {tip.importance}
                  </Text>
                  <Text style={localStyles.tipRelatedFeature}>
                    <Text style={localStyles.boldText}>Related Feature: </Text>
                    {tip.relatedFeature}
                  </Text>
                  <Text style={localStyles.tipExplanation}>
                    {tip.explanation}
                  </Text>
                </AccordionItem>
              )
            )}
          </ScrollView>
        );
      case "Product Recommendations":
        return (
          <ScrollView style={localStyles.scoresContainer}>
            <View style={localStyles.summarySectionCard}>
              <Image
                source={images.summaryImg}
                style={localStyles.summaryImage}
              />
              <Text style={localStyles.summaryTitle}>Summary</Text>
              <Text>{recommendations?.result[1]?.userSkinSummary}</Text>
            </View>
            {recommendations?.result[1]?.steps.map(
              (rec: any, index: number) => (
                <AccordionItem
                  key={rec.id}
                  title={rec.name}
                  index={index}
                  isOpen={openAccordion === index}
                  onToggle={() => toggleAccordion(index)}
                >
                  <View style={localStyles.productSection}>
                    <Text style={localStyles.productTitle}>High-End:</Text>
                    <Text>
                      {rec.highEnd.product} - {rec.highEnd.price}
                    </Text>
                    <Text style={localStyles.howToUse}>
                      How to use: {rec.highEnd.howToUse}
                    </Text>
                  </View>
                  <View style={localStyles.productSection}>
                    <Text style={localStyles.productTitle}>Affordable:</Text>
                    <Text>
                      {rec.affordable.product} - {rec.affordable.price}
                    </Text>
                    <Text style={localStyles.howToUse}>
                      How to use: {rec.affordable.howToUse}
                    </Text>
                  </View>
                  <Text style={localStyles.recImportance}>
                    <Text style={localStyles.boldText}>Importance: </Text>
                    {rec.importance}
                  </Text>
                  <Text style={localStyles.recTechnique}>
                    <Text style={localStyles.boldText}>Technique: </Text>
                    {rec.technique}
                  </Text>
                  <Text style={localStyles.recTargetedConcern}>
                    Targeted Concern: {rec.targetedConcern}
                  </Text>
                  <Text style={localStyles.recExplanation}>
                    {rec.explanation}
                  </Text>
                </AccordionItem>
              )
            )}
          </ScrollView>
        );
      case "Makeup Tips":
        return (
          <ScrollView style={localStyles.scoresContainer}>
            <View style={localStyles.summarySectionCard}>
              <Image
                source={images.summaryImg}
                style={localStyles.summaryImage}
              />
              <Text style={localStyles.summaryTitle}>Summary</Text>
              <Text>{recommendations?.result[2]?.userMakeupSummary}</Text>
            </View>
            {recommendations?.result[2]?.steps.map(
              (tip: any, index: number) => (
                <AccordionItem
                  key={tip.id}
                  title={tip.name}
                  index={index}
                  isOpen={openAccordion === index}
                  onToggle={() => toggleAccordion(index)}
                >
                  <Text style={localStyles.makeupTipTechnique}>
                    <Text style={localStyles.boldText}>Technique: </Text>
                    {tip.technique}
                  </Text>
                  <Text style={localStyles.makeupTipImportance}>
                    <Text style={localStyles.boldText}>Importance: </Text>
                    {tip.importance}
                  </Text>
                  <Text style={localStyles.makeupTipSuitableFor}>
                    <Text style={localStyles.boldText}>Suitable For: </Text>
                    {tip.suitableFor}
                  </Text>
                  <Text style={localStyles.makeupTipExplanation}>
                    {tip.explanation}
                  </Text>
                  {tip &&
                    tip.products &&
                    tip.products.map((product: any, index: number) => (
                      <View
                        key={index}
                        style={localStyles.makeupProductSection}
                      >
                        <Text style={localStyles.makeupProductCategory}>
                          {product.category}
                        </Text>
                        <View style={localStyles.makeupProductDetails}>
                          <Text style={localStyles.makeupProductTitle}>
                            High-End:
                          </Text>
                          <Text>
                            {product.highEnd.name} - {product.highEnd.price}
                          </Text>
                          <Text style={localStyles.applicationTip}>
                            Application Tip: {product.highEnd.applicationTip}
                          </Text>
                        </View>
                        <View style={localStyles.makeupProductDetails}>
                          <Text style={localStyles.makeupProductTitle}>
                            Affordable:
                          </Text>
                          <Text>
                            {product.affordable.name} -{" "}
                            {product.affordable.price}
                          </Text>
                          <Text style={localStyles.applicationTip}>
                            Application Tip: {product.affordable.applicationTip}
                          </Text>
                        </View>
                      </View>
                    ))}
                  {(!tip || !tip.products) && (
                    <Text style={localStyles.errorText}>
                      Could not load any tips. Please try again later
                    </Text>
                  )}
                </AccordionItem>
              )
            )}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  // Animate the gradient
  useEffect(() => {
    const animateGradient = () => {
      Animated.loop(
        Animated.timing(unlockBtnAnimatedValue, {
          toValue: 1, // Animate from 0 to 1
          duration: 4000, // Adjust duration as needed for speed
          easing: Easing.linear, // Linear easing for smooth looping
          useNativeDriver: false, // Must be false for gradient color animation
        })
      ).start();
    };

    animateGradient();
  }, [unlockBtnAnimatedValue]);

  // Interpolate the animated value to animate the x-coordinate of the gradient
  const animatedStartX = unlockBtnAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Moving from x=0 to x=1 for start
  });

  const animatedEndX = unlockBtnAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], // Moving from x=1 to x=0 for end
  });

  return (
    <ImageBackground
      source={images.screenBgLarger}
      style={localStyles.background}
      resizeMode="cover"
    >
      <View style={localStyles.overlay} />

      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />

        <ScrollView
          style={localStyles.container}
          contentContainerStyle={{
            ...localStyles.contentContainer,
            paddingHorizontal: 10,
          }}
        >
          <View style={localStyles.header}>
            <TouchableOpacity
              style={[
                localStyles.backButton,
                localStyles.tabBase,
                localStyles.activeTab,
                {
                  backgroundColor: "#F4EFFF",
                  borderWidth: 2,
                  borderColor: "#7c4cff",
                },
              ]}
              // onPress={() => router.replace("/(auth)/push-results-screen")}
              onPress={() => router.replace("/(home)")}
            >
              <Text className="text-[#7c4cff] font-bold">Home</Text>
            </TouchableOpacity>
            <Text style={localStyles.centeredTitle}>Glow Profile</Text>
            <TouchableOpacity style={localStyles.shareButton} onPress={onShare}>
              <Ionicons name="share-social-outline" size={24} color="#7c4cff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Here's your personalized glow profile based on your facial analysis.
          </Text>

          <RNScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={localStyles.tabScrollView}
          >
            <View style={localStyles.tabContainer}>
              {[
                "Ratings",
                "Facial Analysis",
                "Skin Analysis",
                "Glow-Up Tips",
                "Product Recommendations",
                "Makeup Tips",
              ].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <View key={tab} style={localStyles.tabWrapper}>
                    <TouchableOpacity
                      style={[
                        localStyles.tabBase, // Common tab styling
                        isActive
                          ? localStyles.activeTab
                          : localStyles.inactiveTab, // Conditionally apply styles
                      ]}
                      onPress={() => setActiveTab(tab)}
                    >
                      <Text
                        style={[
                          isActive
                            ? localStyles.activeTabText
                            : localStyles.inactiveTabText,
                        ]}
                      >
                        {tab}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </RNScrollView>

          {!activeTab.includes("Glow-Up Tips") &&
            !activeTab.includes("Product Recommendations") &&
            !activeTab.includes("Makeup Tips") && (
              <View style={localStyles.profileContainer}>
                <Image
                  source={{
                    uri:
                      storeImages[0] ||
                      "https://example.com/default-profile-image.jpg",
                  }}
                  style={localStyles.profileImage}
                />
                <Text
                  style={localStyles.percentileText}
                  className="text-center shadow-lg"
                >
                  You are in the{" "}
                  <Text style={localStyles.percentileHighlight}>
                    {`${percentile}th percentile`}
                  </Text>{" "}
                  of all users.
                </Text>
              </View>
            )}

          {renderTabContent()}
          <View style={localStyles.buttonSpacer} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Makes the overlay cover the entire background
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Adjust opacity here (lighter background)
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 0,
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 10,
  },
  centeredTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  shareButton: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 0,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  tabWrapper: {
    marginRight: 10,
  },
  tabBase: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "black",
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  inactiveTabText: {
    color: "black",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 50,
    marginBottom: 10,
  },
  percentileText: {
    width: "80%",
    fontSize: 16,
    color: "#000",
    letterSpacing: -0.4,
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 26,
  },
  percentileHighlight: {
    fontWeight: "600",
    // color: '#8835f4',
    color: "black",
    letterSpacing: -0.4,
  },
  scoresContainer: {
    // marginBottom: 20,
  },
  gradientBorderWrapper: {
    borderRadius: 10,
    padding: 2,
    width: "48%",
    marginBottom: 10,
  },
  gradientBorder: {
    borderRadius: 10,
    padding: 0,
  },
  innerCard: {
    backgroundColor: "rgba(255,255,255, 1)",
    borderRadius: 10,
    padding: 15,
    borderWidth: 0,
  },
  scoreCard: {
    backgroundColor: "rgba(255,255,255, 1)",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    marginBottom: 10,
    borderWidth: 1,
    // borderColor: '#000',
    borderColor: "#E7E7E7",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  scoreTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  scoreValue: {
    fontSize: 21,
    fontWeight: "bold",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  unlockButton: {
    backgroundColor: "linear-gradient(to right, #da70d6, #7b68ee, #87cefa)",
    borderRadius: 50,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  gradientBackground: {
    borderRadius: 50,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    width: "90%",
  },
  whiteButton: {
    backgroundColor: "black",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  unlockButtonText: {
    // color: '#6200EE', // Keep the text in a bold color to stand out
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  characteristicItem: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  characteristicTitle: {
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 10,
  },
  characteristicValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  tabScrollView: {
    flexGrow: 0,
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  characteristicCard: {
    backgroundColor: "rgba(255,255,255, 1)",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    marginBottom: 10,
    minHeight: 100,
    justifyContent: "space-between",
    borderWidth: 1,
    // borderColor: '#000',
    borderColor: "#E7E7E7",
  },
  buttonSpacer: {
    height: 80,
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  tipCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tipDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  tipImportance: {
    fontSize: 14,
    fontStyle: "italic",
  },
  recCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  recTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productSection: {
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recImportance: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  recTechnique: {
    fontSize: 14,
    marginTop: 5,
  },
  makeupTipCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  makeupTipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  makeupTipTechnique: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipImportance: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 10,
  },
  makeupProductSection: {
    marginBottom: 10,
  },
  makeupProductCategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  makeupProductDetails: {
    marginLeft: 10,
    marginBottom: 5,
  },
  makeupProductTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  summarySectionCard: {
    backgroundColor: "rgba(255,255,255, 1)",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dbdbdb",
    position: "relative",
    marginTop: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  summaryImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    position: "absolute",
    top: 18,
    left: 25,
  },
  tipRelatedFeature: {
    fontSize: 14,
    marginTop: 5,
  },
  tipExplanation: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },
  recTargetedConcern: {
    fontSize: 14,
    marginTop: 5,
  },
  recExplanation: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },
  makeupTipSuitableFor: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipExplanation: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: "italic",
  },
  accordionItem: {
    backgroundColor: "transparent",
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden",
    padding: 10,
    // elevation: 2,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    alignItems: "center",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: "#fff",
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowRadius: 3.84,
    elevation: 5,
    // backgroundColor: "rgba(255,255,255, 0.9)",
    width: "100%",
  },
  accordionStepTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    paddingLeft: 2,
  },
  accordionDivider: {
    height: 1,
    backgroundColor: "#dbdbdb",
    marginTop: 2,
    marginBottom: 12,
    width: 60,
    paddingLeft: 2,
  },
  accordionTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    letterSpacing: -0.4,
    marginBottom: 4,
    paddingRight: 20,
    paddingLeft: 2,
  },
  accordionContent: {
    padding: 15,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderTopWidth: 0,
    width: "96%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "rgba(255,255,255, 0.9)",
  },
  howToUse: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  applicationTip: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 3,
  },
  errorText: {
    color: "#666",
    fontStyle: "italic",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default GlowResultScreen;
