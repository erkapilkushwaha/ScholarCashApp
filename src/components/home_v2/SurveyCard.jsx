import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SurveyCard({
  survey,
  onPress,
}) {

  const reward =
    survey.user_reward_inr ||
    survey.reward_inr ||
    0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress?.(survey)}
    >

      {/* Header */}

      <View style={styles.header}>

        <View style={styles.providerChip}>
          <Text style={styles.providerText}>
            {survey.provider_name || 'Survey'}
          </Text>
        </View>

        <View style={styles.rewardWrap}>
          <Text style={styles.rewardLabel}>
            Earn
          </Text>

          <Text style={styles.rewardValue}>
            ₹{reward}
          </Text>
        </View>

      </View>

      {/* Survey Title */}

      <Text
        numberOfLines={2}
        style={styles.title}
      >
        {survey.survey_name}
      </Text>

      {/* Description */}

      {!!survey.survey_description && (
        <Text
          numberOfLines={2}
          style={styles.description}
        >
          {survey.survey_description}
        </Text>
      )}

      {/* Match Badge */}

      <View style={styles.matchBadge}>
        <Ionicons
          name="flash"
          size={12}
          color="#16a34a"
        />

        <Text style={styles.matchText}>
          {survey.match_percentage || 90}% Match
        </Text>
      </View>

      {/* Stats */}

      <View style={styles.statsRow}>

        <View style={styles.statItem}>
          <Ionicons
            name="time-outline"
            size={15}
            color="#64748b"
          />

          <Text style={styles.statText}>
            {survey.estimated_minutes || 5} Min
          </Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons
            name="star"
            size={15}
            color="#f59e0b"
          />

          <Text style={styles.statText}>
            {survey.rating || '4.5'}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons
            name="people-outline"
            size={15}
            color="#1a73e8"
          />

          <Text style={styles.statText}>
            {survey.total_completes || '500+'}
          </Text>
        </View>

      </View>

      {/* Footer */}

      <View style={styles.footer}>

        <View>
          <Text style={styles.footerLabel}>
            Estimated Reward
          </Text>

          <Text style={styles.footerReward}>
            ₹{reward}
          </Text>
        </View>

        <View style={styles.startButton}>

          <Text style={styles.startText}>
            Start Survey
          </Text>

          <Ionicons
            name="arrow-forward"
            size={16}
            color="#ffffff"
          />

        </View>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#ffffff',

    borderRadius: 24,

    padding: 18,

    marginBottom: 14,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  providerChip: {
    backgroundColor: '#eff6ff',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,
  },

  providerText: {
    color: '#1a73e8',
    fontSize: 11,
    fontWeight: '800',
  },

  rewardWrap: {
    alignItems: 'flex-end',
  },

  rewardLabel: {
    fontSize: 11,
    color: '#64748b',
  },

  rewardValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#16a34a',
  },

  title: {
    marginTop: 14,

    fontSize: 17,
    fontWeight: '800',

    color: '#0f172a',

    lineHeight: 24,
  },

  description: {
    marginTop: 8,

    color: '#64748b',

    fontSize: 13,

    lineHeight: 19,
  },

  matchBadge: {
    marginTop: 12,

    alignSelf: 'flex-start',

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#ecfdf5',

    borderRadius: 999,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  matchText: {
  marginLeft: 4,
  color: '#15803d',
  fontSize: 12,
  fontWeight: '700',
},

});