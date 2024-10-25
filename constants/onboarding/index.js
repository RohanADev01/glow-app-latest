import { StyleSheet } from "react-native";

export const onboardingQuestionsList = [
  {
    id: 0,
    title: "Get started on your glow-up journey today with Glow",
    subtitle: "",
    continueButton: "Continue", // You can specify button text here.
  },
  {
    id: 1,
    title: "Do you have a referral code?",
    subtitle: "Enter your code here, or skip",
    inputs: [
      { label: "Referral Code", placeholder: "Enter your code here, or skip" },
    ],
    continueButton: "Continue",
  },
  {
    id: 2,
    title: "Create your account",
    subtitle: "Get started on your glow-up journey today with Glow",
    showGoogleButton: true, // Add a flag to show the Google sign-in button.
  },
  {
    id: 3,
    title: "Enter your age",
    subtitle:
      "We'll use this information to personalize your recommendations and help you get the best results",
    inputs: [{ label: "Age", placeholder: "Enter your age" }],
    continueButton: "Continue",
  },
  {
    id: 4,
    title: "Beauty Goals",
    subtitle: "Select all that apply",
    options: [
      "Find the best products for me",
      "Get personalized glow up tips",
      "Find personalized beauty products",
      "Improve skin quality",
      "Other",
    ],
    continueButton: "Continue",
  },
  {
    id: 5,
    title: "Skin Concerns",
    subtitle: "Select all that apply",
    options: ["Acne", "Wrinkles", "Dark Spots", "Oiliness", "Other"],
    continueButton: "Continue",
  },
  {
    id: 6,
    title: "Product Preferences",
    subtitle: "Select all that apply",
    options: [
      "Natural ingredients",
      "Non-comedogenic",
      "Sulfate-free",
      "Eco-friendly packaging",
    ],
    continueButton: "Continue",
  },
  {
    id: 7,
    title: "Makeup Preferences",
    subtitle: "Select all that apply",
    options: ["Vegan", "Organic", "Fragrance-free", "Cruelty-free"],
    continueButton: "Continue",
  },
  {
    id: 8,
    title: "Leave a rating",
    subtitle:
      "Support us so that we could build the best glow up experience for you.",
    continueButton: "Continue", // You can specify button text here.
  },
  {
    id: 9,
    title: "Ready to start your glow up journey?",
    options: [
      "Discover your unique facial features",
      "Receive tailored glow-up tips",
      "Experience custom-crafted skincare routines",
      "Explore personalized product recommendations",
      "Access daily insights from AI beauty experts",
    ],
    optionsEmojis: ["🔬", "✨", "🧴", "🛍️", "🤖"],
    continueButton: "Start my glow up journey",
  },
  {
    id: 10,
    title: "Facial Analysis",
    subtitle:
      "See where you stand with our advanced AI and get a personalised beauty routine",
    continueButton: "Upload or take a selfie",
  },
];

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 0.5,
    paddingHorizontal: 40,
    overflow: "auto",
  },
  logo: {
    // width: 150,
    height: 35,
    resizeMode: "contain",
    marginVertical: 5,
  },
  progressBar: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  activeDot: {
    flex: 1,
    height: 4,
    backgroundColor: "black", // Active color
    borderRadius: 2,
    marginHorizontal: 2,
  },
  inactiveDot: {
    flex: 1,
    height: 4,
    backgroundColor: "#E6D8E1", // Inactive color
    borderRadius: 2,
    marginHorizontal: 2,
  },
  contentContainer: {
    flex: 4, // Content section (title, input fields, placeholders) gets 40% of the screen
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitleCaption: {
    fontSize: 13,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  imagePlaceholder: {
    width: 260,
    height: 260,
    backgroundColor: "#F2F2F2", // Placeholder color
    borderRadius: 20,
  },
  snapPlaceholder: {
    backgroundColor: "#F2F2F2", // Placeholder color
    borderRadius: 20,
    marginVertical: 40,
    width: 300,
    height: 360,
  },
  input: {
    borderRadius: 50,
    padding: 10,
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#666",
    backgroundColor: "#fff",
  },
  footerContainer: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white", // Button color
    paddingVertical: 18,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioButton: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
    padding: 15,
    marginVertical: 5,
    width: "100%",
    textAlign: "center",
  },
  radioButtonSelected: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
    marginVertical: 5,
    width: "100%",
    textAlign: "center",
  },
  radioActiveDot: {
    width: 16,
    height: 16,
    backgroundColor: "black", // Active color
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    marginHorizontal: 2,
  },
  radioInactiveDot: {
    width: 16,
    height: 16,
    backgroundColor: "white", // Inactive color
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    marginHorizontal: 2,
  },
  radioButtonText: {
    color: "black",
  },
  benefitContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  benefitEmoji: {
    fontSize: 32,
    marginRight: 8,
    width: 40,
    textAlign: "center",
  },
  benefitText: {
    fontSize: 14,
    color: "black",
    fontWeight: "500",
    flex: 1,
    textAlign: "left",
    letterSpacing: "-0.4%",
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#8A2BE2",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    paddingHorizontal: 20,
    width: "100%",
    paddingRight: 50,
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  optionCardSelected: {
    backgroundColor: "#E5D4FA", // Change the background if selected
    borderColor: "#8A2BE2",
    borderWidth: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: 600,
  },
  optionTitleSelected: {
    color: "#8A2BE2",
  },
  optionDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  buttonDisabled: {
    backgroundColor: "#CCC",
  },
});
