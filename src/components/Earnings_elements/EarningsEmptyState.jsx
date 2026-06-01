import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function EarningsEmptyState({
  onExplorePress,
}) {
  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/no_earnings.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        No Earnings Yet
      </Text>

      <Text style={styles.subtitle}>
        Complete surveys and tasks to start earning rewards.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onExplorePress}
      >
        <Text style={styles.buttonText}>
          Explore Surveys
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  image: {
    width: 220,
    height: 220,
  },

  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 260,
  },

  button: {
    marginTop: 22,
    backgroundColor: '#1a73e8',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },

});