import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const FaceAura = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await checkFaceAura(image);
      setAnalysis(result);
    } catch (error) {
      console.error("Error analyzing face:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold mb-4">Face Aura Analysis</Text>
      <TouchableOpacity onPress={handleImageUpload} className="mb-4">
        <Text className="text-blue-500">Upload Image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Analyze Face" onPress={handleAnalyze} disabled={!image} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {analysis && (
        <View className="mt-4">
          <Text>
            Overall Impression: {analysis.overallImpression.score} -{" "}
            {analysis.overallImpression.explanation}
          </Text>
          <Text>
            Potential: {analysis.potential.score} -{" "}
            {analysis.potential.explanation}
          </Text>
          <Text>
            Masculinity: {analysis.masculinity.score} -{" "}
            {analysis.masculinity.explanation}
          </Text>
          <Text>
            Skin Quality: {analysis.skinQuality.score} -{" "}
            {analysis.skinQuality.explanation}
          </Text>
          <Text>
            Hairstyle: {analysis.hairstyle.score} -{" "}
            {analysis.hairstyle.explanation}
          </Text>
          <Text>
            Jawline: {analysis.jawline.score} - {analysis.jawline.explanation}
          </Text>
          <Text>
            Cheekbones: {analysis.cheekbones.score} -{" "}
            {analysis.cheekbones.explanation}
          </Text>
          <Text>Summary: {analysis.summary}</Text>
        </View>
      )}
    </View>
  );
};

export default FaceAura;
