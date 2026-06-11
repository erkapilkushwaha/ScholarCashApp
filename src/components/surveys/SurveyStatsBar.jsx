// src/components/surveys/SurveyStatsBar.jsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function SurveyStatsBar({
  surveys = [],
}) {

  const totalSurveys = surveys.length;

  const highRewardCount =
    surveys.filter(
      item => Number(item.reward_inr) >= 50
    ).length;

  const avgMinutes =
    surveys.length > 0
      ? Math.round(
          surveys.reduce(
            (sum, item) =>
              sum +
              Number(
                item.estimated_minutes || 0
              ),
            0
          ) / surveys.length
        )
      : 0;

  return (
    <View style={styles.container}>

      <View style={styles.statCard}>
        <Text style={styles.value}>
          {totalSurveys}
        </Text>

        <Text style={styles.label}>
          Surveys
        </Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.value}>
          {highRewardCount}
        </Text>

        <Text style={styles.label}>
          High Reward
        </Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.value}>
          {avgMinutes}m
        </Text>

        <Text style={styles.label}>
          Avg Time
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 14,
  },

  statCard: {
    flex: 1,

    backgroundColor: '#ffffff',

    borderRadius: 16,

    paddingVertical: 14,

    marginHorizontal: 4,

    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  value: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a73e8',
  },

  label: {
    marginTop: 4,

    fontSize: 11,
    fontWeight: '600',

    color: '#64748b',
  },

});