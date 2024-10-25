import { images } from "@/constants";
import { styles } from "@/constants/onboarding";
import { useImageStore } from "@/store/imageStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Platform,
  ScrollView as RNScrollView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import * as Linking from "expo-linking";

// revenue cat hook

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const GlowResultScreen = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Ratings");
  const insets = useSafeAreaInsets();
  const [unlockBtnAnimatedValue] = useState(new Animated.Value(0));
  const storeImages = useImageStore(
    (state: { images: string[] }) => state.images
  );
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const {
    handleWeeklyPurchase,
    priceString,
    handleRestorePurchases,
    isRestoring,
  } = useRevenueCat();

  const percentile = 70; // Dummy percentile value

  const navigation = useNavigation();

  const router = useRouter();

  const openPrivacyPolicy = () => {
    Linking.openURL(
      "https://getdoryai.notion.site/Privacy-Policy-104f1bbab427809dbef3dc9de97ee495?pvs=4"
    );
  };

  const openTermsOfUse = () => {
    Linking.openURL(
      "https://getdoryai.notion.site/Terms-of-Use-b1810bbb67e547a39813b0e396446853?pvs=4"
    );
  };

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

  const animatedStartX = unlockBtnAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedEndX = unlockBtnAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const ScoreCard = ({
    title,
    score = 0,
    potential,
  }: {
    title: string;
    score?: number;
    potential?: boolean;
  }) => {
    // const randomScore = Math.random() * (10 - 8.5) + 8.5;

    return potential ? (
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
            {/* <Text style={localStyles.scoreValue}>
              {score ? score.toFixed(1) : randomScore.toFixed(1)}
            </Text> */}
            <Image
              source={images.unlockBlur}
              style={{
                width: 60,
                height: 40,
                resizeMode: "stretch",
                margin: 0,
              }}
            />
          </View>
          <View style={localStyles.progressBar}>
            <LinearGradient
              colors={["#d0980c", "#eace39", "#f0d91d", "#eace39", "#d0980c"]}
              locations={[0, 0.25, 0.5, 0.75, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                localStyles.progressFill,
                {
                  width: `${(score / 10) * 100}%`,
                },
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
          {/* <Text style={localStyles.scoreValue}>
            {score ? score.toFixed(1) : randomScore.toFixed(1)}
          </Text> */}
          {/* <Image source={} */}
          <Image
            source={images.unlockBlur}
            style={{
              width: 60,
              height: 40,
              resizeMode: "stretch",
              margin: 0,
            }}
          />
        </View>
        <View style={localStyles.progressBar}>
          <LinearGradient
            colors={["#da70d6", "#7b68ee", "#87cefa"]} // Original gradient for progress fill
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              localStyles.progressFill,
              {
                width: `${(score / 10) * 100}%`,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  const CharacteristicCard = ({
    title,
    value,
  }: {
    title: string;
    value?: any;
  }) => (
    <View style={localStyles.characteristicCard}>
      <Text style={localStyles.characteristicTitle}>{title}</Text>
      {value ? (
        <Text style={localStyles.characteristicValue}>{value}</Text>
      ) : (
        <Image
          source={images.unlockBlur}
          style={{
            width: 60,
            height: 40,
            resizeMode: "stretch",
            margin: 0,
          }}
        />
      )}
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
              {index + 1} 🔒 Unlock with Glow Pro
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
              <ScoreCard title="Potential" potential />
              <ScoreCard title="Overall" />
            </View>
            <View style={localStyles.scoreRow}>
              <ScoreCard title="Skin Health" />
              <ScoreCard title="Glow Factor" />
            </View>
            <View style={localStyles.scoreRow}>
              <ScoreCard title={`Feature${"\n"}Harmony`} />
              <ScoreCard title="Authenticity" />
            </View>
          </View>
        );
      case "Facial Analysis":
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard title="Eye Shape 👁️" />
              <CharacteristicCard title="Face Shape 👩" />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard title="Jawline 🧏‍♀️" />
              <CharacteristicCard title="Lip Shape 💋" />
            </View>
          </View>
        );
      case "Skin Analysis":
        return (
          <View style={localStyles.scoresContainer}>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard title="Skin Type 👩" />
              <CharacteristicCard title="Hydration Level 💧" />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard title={`Skin\nTexture 🧴`} />
              <CharacteristicCard title="Skin Tone 🌼" />
            </View>
            <View style={localStyles.scoreRow}>
              <CharacteristicCard title={`Skin\nVitality ☀️`} />
            </View>
          </View>
        );
      case "Glow-Up Tips":
        // Implement Product Recommendations when available
        return (
          <ScrollView style={localStyles.scoresContainer}>
            <View style={localStyles.summarySectionCard}>
              <Image
                source={images.summaryImg}
                style={localStyles.summaryImage}
              />
              <Text style={localStyles.summaryTitle}>Your Summary</Text>
              <Image
                source={images.unlockBlur}
                style={{
                  width: 60,
                  height: 40,
                  resizeMode: "stretch",
                  margin: 0,
                }}
              />
            </View>
            {[
              {
                id: 1,
                details: "🔒",
                importance: "🔒",
                relatedFeature: "🔒",
                explanation: "🔒",
              },
              {
                id: 2,
                details: "🔒",
                importance: "🔒",
                relatedFeature: "🔒",
                explanation: "🔒",
              },
              {
                id: 3,
                details: "🔒",
                importance: "🔒",
                relatedFeature: "🔒",
                explanation: "🔒",
              },
              {
                id: 4,
                details: "🔒",
                importance: "🔒",
                relatedFeature: "🔒",
                explanation: "🔒",
              },
              {
                id: 5,
                details: "🔒",
                importance: "🔒",
                relatedFeature: "🔒",
                explanation: "🔒",
              },
              {
                id: 6,
                details: "🔒",
                importance: "🔒",
                relatedFeature: "🔒",
                explanation: "🔒",
              },
            ].map((tip: any, index: number) => (
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
            ))}
          </ScrollView>
        );
      case "Skincare Recommendations":
        return (
          <ScrollView style={localStyles.scoresContainer}>
            <View style={localStyles.summarySectionCard}>
              <Image
                source={images.summaryImg}
                style={localStyles.summaryImage}
              />
              <Text style={localStyles.summaryTitle}>Your Summary</Text>
              <Image
                source={images.unlockBlur}
                style={{
                  width: 60,
                  height: 40,
                  resizeMode: "stretch",
                  margin: 0,
                }}
              />
            </View>
            {[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }].map(
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
                    <Text>🔒</Text>
                    <Text style={localStyles.howToUse}>How to use: 🔒</Text>
                  </View>
                  <View style={localStyles.productSection}>
                    <Text style={localStyles.productTitle}>Affordable:</Text>
                    <Text>🔒</Text>
                    <Text style={localStyles.howToUse}>How to use: 🔒</Text>
                  </View>
                  <Text style={localStyles.recImportance}>
                    <Text style={localStyles.boldText}>Importance: </Text>
                    🔒
                  </Text>
                  <Text style={localStyles.recTechnique}>
                    <Text style={localStyles.boldText}>Technique: </Text>
                    🔒
                  </Text>
                  <Text style={localStyles.recTargetedConcern}>
                    Targeted Concern: 🔒
                  </Text>
                  <Text style={localStyles.recExplanation}>🔒</Text>
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
              <Text style={localStyles.summaryTitle}>Your Summary</Text>
              <Image
                source={images.unlockBlur}
                style={{
                  width: 60,
                  height: 40,
                  resizeMode: "stretch",
                  margin: 0,
                }}
              />
            </View>
            {[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }].map(
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
                    🔒
                  </Text>
                  <Text style={localStyles.makeupTipImportance}>
                    <Text style={localStyles.boldText}>Importance: </Text>
                    🔒
                  </Text>
                  <Text style={localStyles.makeupTipSuitableFor}>
                    <Text style={localStyles.boldText}>Suitable For: </Text>
                    🔒
                  </Text>
                  <Image
                    source={images.unlockBlur}
                    style={{
                      width: 60,
                      height: 40,
                      resizeMode: "stretch",
                      margin: 0,
                    }}
                  />
                  {[{ id: 1 }].map((product: any, index: number) => (
                    <View key={index} style={localStyles.makeupProductSection}>
                      <View style={localStyles.makeupProductDetails}>
                        <Text style={localStyles.makeupProductTitle}>
                          High-End:
                        </Text>
                        <Text>🔒</Text>
                        <Text style={localStyles.applicationTip}>
                          Application Tip: 🔒
                        </Text>
                      </View>
                      <View style={localStyles.makeupProductDetails}>
                        <Text style={localStyles.makeupProductTitle}>
                          Affordable:
                        </Text>
                        <Text>🔒</Text>
                        <Text style={localStyles.applicationTip}>
                          Application Tip: 🔒
                        </Text>
                      </View>
                    </View>
                  ))}
                </AccordionItem>
              )
            )}
          </ScrollView>
        );
      default:
        return null;
    }
  };

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
          contentContainerStyle={localStyles.contentContainer}
        >
          <View style={localStyles.header}>
            <Text style={localStyles.centeredTitle}>Glow Profile</Text>
          </View>
          <Text style={styles.subtitle}>
            Here's your personalized glow profile based on your facial analysis.
          </Text>

          {/* Tabs */}
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
                "Skincare Recommendations",
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

          {/* Placeholder Profile Image */}
          {!activeTab.includes("Glow-Up Tips") &&
            !activeTab.includes("Skincare Recommendations") &&
            !activeTab.includes("Makeup Tips") && (
              <View style={localStyles.profileContainer}>
                <Image
                  source={
                    storeImages[0] ? { uri: storeImages[0] } : images.model
                  }
                  style={localStyles.profileImage}
                />
                {/* <Text style={localStyles.percentileText}>
              You are in the{' '}
              <Text style={localStyles.percentileHighlight}>
                {`${percentile}th percentile`}
              </Text>{' '}
              of all users.
            </Text> */}
                <Text style={localStyles.percentileText}>
                  You are in the{""}
                  {/* Replacing the percentile text with a gradient */}
                  {/* <LinearGradient
                colors={[
                  'rgba(150,150,150,0.4)', // Darker gray in the center for more depth
                  'rgba(150,150,150,0.2)', // Medium gray toward the outer area
                  'rgba(200,200,200,0.2)', // Lighter gray towards the very edge
                  'rgba(255,255,255,0.6)', // Almost transparent at the edges for blur effect
                ]}
                start={{ x: 0.5, y: 0.5 }} // Start from the center
                end={{ x: 1, y: 1 }} // End at the outer corners for a smooth radial effect
                style={localStyles.gradientText}
              >
                <View style={{ width: 30, height: 20 }} />
              </LinearGradient> */}
                  <Text className="font-bold mx-0 px-0">
                    {" 🔒th percentile "}
                  </Text>
                  of all users.
                </Text>
              </View>
            )}

          {/* Render content based on active tab */}
          {renderTabContent()}

          <View style={localStyles.buttonSpacer} />
        </ScrollView>

        <TouchableOpacity
          style={[
            localStyles.buttonContainer,
            { paddingBottom: insets.bottom },
          ]}
          onPress={() => handleWeeklyPurchase({ setIsPaymentLoading })}
          disabled={isPaymentLoading || isRestoring}
        >
          <View>
            <Text className="font-medium">
              Glow Pro renews at {priceString}/week
            </Text>
          </View>
          <AnimatedLinearGradient
            colors={["#da70d6", "#7b68ee", "#87cefa"]}
            start={{ x: animatedStartX, y: 0 }}
            end={{ x: animatedEndX, y: 0 }}
            style={localStyles.gradientBackground}
          >
            <View style={localStyles.whiteButton}>
              {isPaymentLoading ? (
                <ActivityIndicator className="p-0 m-0" />
              ) : (
                <Text style={localStyles.unlockButtonText}>
                  Unlock Results 🙌
                </Text>
              )}
            </View>
          </AnimatedLinearGradient>
          <TouchableOpacity
            onPress={handleRestorePurchases}
            disabled={isRestoring}
            style={localStyles.restorePurchasesButton}
          >
            {isRestoring ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={localStyles.restorePurchasesText}>
                Restore Purchases
              </Text>
            )}
          </TouchableOpacity>
          <View className="pt-3 flex-row justify-between space-x-3">
            <Text className="underline" onPress={openTermsOfUse}>
              Terms of Use
            </Text>
            <Text className="underline" onPress={openPrivacyPolicy}>
              Privacy Policy
            </Text>
          </View>
        </TouchableOpacity>
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
    color: "#ADADAD",
    letterSpacing: -0.4,
    backgroundColor: "#ADADAD",
  },
  scoresContainer: {
    // marginBottom: 20,
  },
  gradientText: {
    borderRadius: 25, // Creates the elliptical shape
    marginRight: 2, // Adds space on either side
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
    marginBottom: 10,
  },
  characteristicValue: {
    fontSize: 14,
    fontWeight: "semibold",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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

    borderRadius: 10,

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
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
  restorePurchasesButton: {
    marginTop: 10,
    padding: 10,
  },
  restorePurchasesText: {
    color: "#000",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default GlowResultScreen;
