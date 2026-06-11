import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function SurveyEmptyState() {
  return (
    <View style={styles.container}>

      <Text style={styles.emoji}>
        📭
      </Text>

      <Text style={styles.title}>
        No Surveys Found
      </Text>

      <Text style={styles.subtitle}>
        Try changing filters or check back later for new surveys.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emoji: {
    fontSize: 52,
  },

  title: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: '#64748b',
    lineHeight: 22,
    fontSize: 13,
  },
});