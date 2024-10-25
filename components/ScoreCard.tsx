import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// ScoreCard component with updated progress bar and blurred unlock image
const ScoreCard = ({
  title,
  score,
  locked,
}: {
  title: string;
  score: number;
  locked?: boolean; // Add a flag to indicate if the card is locked
}) => (
  <View style={styles.cardContainer}>
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.score}>{locked ? 'Locked' : score.toFixed(1)}</Text>
    </View>

    {locked ? (
      // If locked, show the unlock-blur image
      <Image
        source={require('@/assets/images/unlock-blur.png')}
        style={styles.unlockImage}
      />
    ) : (
      // Otherwise, show the progress bar
      <View style={styles.progressBar}>
        <Image
          source={require('@/assets/images/progress-bar.png')}
          style={[
            styles.progressFill,
            { width: `${(score / 10) * 100}%` }, // Adjust width dynamically
          ]}
        />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  unlockImage: {
    width: '100%',
    height: 50, // Adjust the height according to the unlock-blur image
    resizeMode: 'cover',
    marginTop: 10,
  },
});

export default ScoreCard;
