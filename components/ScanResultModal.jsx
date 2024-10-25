import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Share,
  Alert,
  Animated,
  Easing,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const ScanResultModal = ({ isVisible, onClose, scanData }) => {
  const [activeTab, setActiveTab] = useState("Ratings");
  const [unlockBtnAnimatedValue] = useState(new Animated.Value(0));
  const [openAccordion, setOpenAccordion] = useState(null);

  const { glowScore, recommendations, imageUrl } = scanData || {};
  const { scores, percentile, facialCharacteristics, skinAnalysis } =
    glowScore || {};

  useEffect(() => {
    setActiveTab("Ratings");
  }, [scanData]);

  useEffect(() => {
    const animateGradient = () => {
      Animated.loop(
        Animated.timing(unlockBtnAnimatedValue, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };

    animateGradient();
  }, [unlockBtnAnimatedValue]);

  const onShare = async () => {
    if (!glowScore || !scores) {
      Alert.alert("No data available to share");
      return;
    }

    const message = `
✨ Check out my personalized Glow Profile! ✨

🌟 *Ratings* 🌟
-------------------------
💖 *Potential*: ${scores.potential?.toFixed(1) ?? "N/A"}
✨ *Overall*: ${scores.overall?.toFixed(1) ?? "N/A"}
🧴 *Skin Health*: ${scores.skinHealth?.toFixed(1) ?? "N/A"}
⭐️ *Glow Factor*: ${scores.glowFactor?.toFixed(1) ?? "N/A"}
🎨 *Feature Harmony*: ${scores.featureHarmony?.toFixed(1) ?? "N/A"}
💋 *Authenticity*: ${scores.authenticity?.toFixed(1) ?? "N/A"}
-------------------------

I'm glowing! 🌟 #GlowProfile 💗
`;

    try {
      const result = await Share.share({ message });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const ScoreCard = ({ title, score, potential }) => (
    <View style={[styles.scoreCard, potential && styles.potentialScoreCard]}>
      <View style={styles.scoreCardContent}>
        <Text style={styles.scoreTitle}>{title}</Text>
        <Text style={styles.scoreValue}>{score?.toFixed(1) ?? "N/A"}</Text>
      </View>
      <View style={styles.progressBar}>
        <LinearGradient
          colors={potential ? ["#d0980c", "#fde14a"] : ["#da70d6", "#87cefa"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progressFill,
            { width: `${((score ?? 0) / 10) * 100}%` },
          ]}
        />
      </View>
    </View>
  );

  const CharacteristicCard = ({ title, value }) => (
    <View style={styles.characteristicCard}>
      <Text style={styles.characteristicTitle}>{title}</Text>
      <Text style={styles.characteristicValue}>{value}</Text>
    </View>
  );

  const AccordionItem = ({ title, children, index, isOpen, onToggle }) => (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle}>
        <View style={styles.accordionHeaderContent}>
          <Text style={styles.accordionStepTitle}>{index + 1}</Text>
          <Text
            style={styles.accordionTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>
        <View style={styles.accordionIconContainer}>
          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={24}
            color="#000"
          />
        </View>
      </TouchableOpacity>
      {isOpen && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const renderTabContent = () => {
    if (!scanData || !glowScore) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No data available. Please try again.
          </Text>
        </View>
      );
    }

    switch (activeTab) {
      case "Ratings":
        return (
          <View style={styles.scoresContainer}>
            {scores &&
              Object.entries(scores).map(([key, value]) => (
                <ScoreCard
                  key={key}
                  title={key
                    .split(/(?=[A-Z])/)
                    .join("\n")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                  score={value ?? 0}
                  potential={key === "potential"}
                />
              ))}
          </View>
        );
      case "Facial Analysis":
        return (
          <View style={styles.characteristicsContainer}>
            {facialCharacteristics &&
              Object.entries(facialCharacteristics).map(([key, value]) => (
                <CharacteristicCard
                  key={key}
                  title={`${key.charAt(0).toUpperCase() + key.slice(1)} ${getEmojiForCharacteristic(key)}`}
                  value={value ?? "N/A"}
                />
              ))}
          </View>
        );
      case "Skin Analysis":
        return (
          <View style={styles.characteristicsContainer}>
            {skinAnalysis &&
              Object.entries(skinAnalysis).map(([key, value]) => (
                <CharacteristicCard
                  key={key}
                  title={`${key.charAt(0).toUpperCase() + key.slice(1)} ${getEmojiForSkinAnalysis(key)}`}
                  value={
                    Array.isArray(value) ? value.join(", ") : (value ?? "N/A")
                  }
                />
              ))}
          </View>
        );
      case "Glow-Up Tips":
        return (
          <ScrollView
            style={{ ...styles.tipsContainer, paddingHorizontal: 10 }}
          >
            <View style={styles.summarySectionCard}>
              <Image source={images.summaryImg} style={styles.summaryImage} />
              <Text style={styles.summaryTitle}>Summary</Text>
              <Text style={styles.summaryText}>
                {recommendations?.result[0]?.userFeaturesSummary ??
                  "No summary available"}
              </Text>
            </View>
            {recommendations?.result[0]?.steps?.map((tip, index) => (
              <AccordionItem
                key={tip.id ?? index}
                title={tip.name ?? `Tip ${index + 1}`}
                index={index}
                isOpen={openAccordion === index}
                onToggle={() => toggleAccordion(index)}
              >
                <Text style={styles.tipDetails}>
                  {tip.details ?? "No details available"}
                </Text>
                <Text style={styles.tipImportance}>
                  <Text style={styles.boldText}>Importance: </Text>
                  {tip.importance ?? "N/A"}
                </Text>
                <Text style={styles.tipRelatedFeature}>
                  <Text style={styles.boldText}>Related Feature: </Text>
                  {tip.relatedFeature ?? "N/A"}
                </Text>
                <Text style={styles.tipExplanation}>
                  {tip.explanation ?? "No explanation available"}
                </Text>
              </AccordionItem>
            ))}
          </ScrollView>
        );
      case "Product Recommendations":
        return (
          <ScrollView
            style={{
              ...styles.recommendationsContainer,
              paddingHorizontal: 10,
            }}
          >
            <View style={styles.summarySectionCard}>
              <Image source={images.summaryImg} style={styles.summaryImage} />
              <Text style={styles.summaryTitle}>Summary</Text>
              <Text style={styles.summaryText}>
                {recommendations?.result[1]?.userSkinSummary ??
                  "No summary available"}
              </Text>
            </View>
            {recommendations?.result[1]?.steps?.map((rec, index) => (
              <AccordionItem
                key={rec.id ?? index}
                title={rec.name ?? `Recommendation ${index + 1}`}
                index={index}
                isOpen={openAccordion === index}
                onToggle={() => toggleAccordion(index)}
              >
                {rec.highEnd && (
                  <View style={styles.productSection}>
                    <Text style={styles.productTitle}>High-End:</Text>
                    <Text style={styles.productText}>
                      {rec.highEnd.product ?? "N/A"} -{" "}
                      {rec.highEnd.price ?? "N/A"}
                    </Text>
                    <Text style={styles.howToUse}>
                      How to use: {rec.highEnd.howToUse ?? "N/A"}
                    </Text>
                  </View>
                )}
                {rec.affordable && (
                  <View style={styles.productSection}>
                    <Text style={styles.productTitle}>Affordable:</Text>
                    <Text style={styles.productText}>
                      {rec.affordable.product ?? "N/A"} -{" "}
                      {rec.affordable.price ?? "N/A"}
                    </Text>
                    <Text style={styles.howToUse}>
                      How to use: {rec.affordable.howToUse ?? "N/A"}
                    </Text>
                  </View>
                )}
                <Text style={styles.recImportance}>
                  <Text style={styles.boldText}>Importance: </Text>
                  {rec.importance ?? "N/A"}
                </Text>
                <Text style={styles.recTechnique}>
                  <Text style={styles.boldText}>Technique: </Text>
                  {rec.technique ?? "N/A"}
                </Text>
                <Text style={styles.recTargetedConcern}>
                  Targeted Concern: {rec.targetedConcern ?? "N/A"}
                </Text>
                <Text style={styles.recExplanation}>
                  {rec.explanation ?? "No explanation available"}
                </Text>
              </AccordionItem>
            ))}
          </ScrollView>
        );
      case "Makeup Tips":
        return (
          <ScrollView
            style={{ ...styles.makeupTipsContainer, paddingHorizontal: 10 }}
          >
            <View style={styles.summarySectionCard}>
              <Image source={images.summaryImg} style={styles.summaryImage} />
              <Text style={styles.summaryTitle}>Summary</Text>
              <Text style={styles.summaryText}>
                {recommendations?.result[2]?.userMakeupSummary ??
                  "No summary available"}
              </Text>
            </View>
            {recommendations?.result[2]?.steps?.map((tip, index) => (
              <AccordionItem
                key={tip.id ?? index}
                title={tip.name ?? `Tip ${index + 1}`}
                index={index}
                isOpen={openAccordion === index}
                onToggle={() => toggleAccordion(index)}
              >
                <Text style={styles.makeupTipTechnique}>
                  <Text style={styles.boldText}>Technique: </Text>
                  {tip.technique ?? "N/A"}
                </Text>
                <Text style={styles.makeupTipImportance}>
                  <Text style={styles.boldText}>Importance: </Text>
                  {tip.importance ?? "N/A"}
                </Text>
                <Text style={styles.makeupTipSuitableFor}>
                  <Text style={styles.boldText}>Suitable For: </Text>
                  {tip.suitableFor ?? "N/A"}
                </Text>
                <Text style={styles.makeupTipExplanation}>
                  {tip.explanation ?? "No explanation available"}
                </Text>
                {tip.products?.map((product, productIndex) => (
                  <View key={productIndex} style={styles.makeupProductSection}>
                    <Text style={styles.makeupProductCategory}>
                      {product.category ?? `Product ${productIndex + 1}`}
                    </Text>
                    {product.highEnd && (
                      <View style={styles.makeupProductDetails}>
                        <Text style={styles.makeupProductTitle}>High-End:</Text>
                        <Text style={styles.makeupProductText}>
                          {product.highEnd.name ?? "N/A"} -{" "}
                          {product.highEnd.price ?? "N/A"}
                        </Text>
                        <Text style={styles.applicationTip}>
                          Application Tip:{" "}
                          {product.highEnd.applicationTip ?? "N/A"}
                        </Text>
                      </View>
                    )}
                    {product.affordable && (
                      <View style={styles.makeupProductDetails}>
                        <Text style={styles.makeupProductTitle}>
                          Affordable:
                        </Text>
                        <Text style={styles.makeupProductText}>
                          {product.affordable.name ?? "N/A"} -{" "}
                          {product.affordable.price ?? "N/A"}
                        </Text>
                        <Text style={styles.applicationTip}>
                          Application Tip:{" "}
                          {product.affordable.applicationTip ?? "N/A"}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </AccordionItem>
            ))}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      className="h-full"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Glow Profile</Text>
            <TouchableOpacity style={styles.shareButton} onPress={onShare}>
              <Ionicons name="share-social-outline" size={24} color="#7c4cff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Here's your personalized glow profile based on your facial analysis.
          </Text>

          <View style={styles.tabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabScrollViewContent}
            >
              <View style={styles.tabContainer}>
                {[
                  "Ratings",
                  "Facial Analysis",
                  "Skin Analysis",
                  "Glow-Up Tips",
                  "Product Recommendations",
                  "Makeup Tips",
                ].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.tab,
                      activeTab === tab ? styles.activeTab : styles.inactiveTab,
                    ]}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === tab
                          ? styles.activeTabText
                          : styles.inactiveTabText,
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {!activeTab.includes("Glow-Up Tips") &&
          !activeTab.includes("Product Recommendations") &&
          !activeTab.includes("Makeup Tips") &&
          imageUrl &&
          imageUrl ? (
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: scanData.imageUrl }}
                style={styles.profileImage}
              />
              {percentile && (
                <Text style={styles.percentileText}>
                  You are in the{" "}
                  <Text style={styles.percentileHighlight}>
                    {`${percentile}th percentile`}
                  </Text>{" "}
                  of all users.
                </Text>
              )}
            </View>
          ) : null}

          <ScrollView style={styles.content}>{renderTabContent()}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: SCREEN_WIDTH * 0.95,
    // maxHeight: SCREEN_HEIGHT * 0.95,
    height: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  closeButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shareButton: {
    padding: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  tabScrollViewContent: {
    paddingBottom: 5,
    height: 50,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#7c4cff",
  },
  inactiveTab: {
    backgroundColor: "#f0f0f0",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "black",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  percentileText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  percentileHighlight: {
    fontWeight: "bold",
    color: "#7c4cff",
  },
  content: {
    // flex: 1,
    marginTop: 0,
  },
  scoresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  scoreCard: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  potentialScoreCard: {
    borderWidth: 2,
    borderColor: "#fde14a",
  },
  scoreCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  scoreTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7c4cff",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 5,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  characteristicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  characteristicCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  characteristicTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  characteristicValue: {
    fontSize: 16,
  },
  tipsContainer: {
    flex: 1,
  },
  recommendationsContainer: {
    flex: 1,
  },
  makeupTipsContainer: {
    flex: 1,
  },
  summarySectionCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: "#333",
  },
  accordionItem: {
    marginBottom: 15,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accordionHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  accordionStepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    minWidth: 20,
  },
  accordionTitle: {
    fontSize: 16,
    flex: 1,
  },
  accordionIconContainer: {
    width: 24,
    alignItems: "center",
  },
  accordionContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipDetails: {
    fontSize: 14,
    marginBottom: 10,
  },
  tipImportance: {
    fontSize: 14,
    marginBottom: 5,
  },
  tipRelatedFeature: {
    fontSize: 14,
    marginBottom: 5,
  },
  tipExplanation: {
    fontSize: 14,
    fontStyle: "italic",
  },
  productSection: {
    marginBottom: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productText: {
    fontSize: 14,
    marginBottom: 5,
  },
  howToUse: {
    fontSize: 14,
    fontStyle: "italic",
  },
  recImportance: {
    fontSize: 14,
    marginBottom: 5,
  },
  recTechnique: {
    fontSize: 14,
    marginBottom: 5,
  },
  recTargetedConcern: {
    fontSize: 14,
    marginBottom: 5,
  },
  recExplanation: {
    fontSize: 14,
    fontStyle: "italic",
  },
  makeupTipTechnique: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipImportance: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipSuitableFor: {
    fontSize: 14,
    marginBottom: 5,
  },
  makeupTipExplanation: {
    fontSize: 14,
    marginBottom: 15,
    fontStyle: "italic",
  },
  makeupProductSection: {
    marginBottom: 15,
  },
  makeupProductCategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  makeupProductDetails: {
    marginBottom: 10,
  },
  makeupProductTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  makeupProductText: {
    fontSize: 14,
    marginBottom: 5,
  },
  applicationTip: {
    fontSize: 14,
    fontStyle: "italic",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});

// Helper functions
const getEmojiForCharacteristic = (key) => {
  const emojiMap = {
    eyeShape: "👁️",
    faceShape: "👩",
    jawline: "🧏‍♀️",
    lipShape: "💋",
  };
  return emojiMap[key] || "";
};

const getEmojiForSkinAnalysis = (key) => {
  const emojiMap = {
    skinType: "👩",
    hydrationLevel: "💧",
    skinTexture: "🧴",
    skinToneAndColor: "🌼",
    skinVitalityIndicators: "☀️",
  };
  return emojiMap[key] || "";
};

export default ScanResultModal;
