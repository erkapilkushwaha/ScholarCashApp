import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function FeaturedSurveyCard({
  survey,
  onStartSurvey,
}) {
  if (!survey) return null;

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            🔥 Featured Survey
          </Text>
        </View>

        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>
            {survey.match || 90}% Match
          </Text>
        </View>
      </View>

      {/* Survey Title */}
      <Text
        style={styles.surveyTitle}
        numberOfLines={2}
      >
        {survey.survey_name || 'High Paying Survey'}
      </Text>

      {/* Meta */}
      <View style={styles.metaRow}>
        
        <View style={styles.metaItem}>
          <Ionicons
            name="cash-outline"
            size={16}
            color="#16a34a"
          />

          <Text style={styles.metaText}>
            ₹{survey.reward}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons
            name="time-outline"
            size={16}
            color="#64748b"
          />

          <Text style={styles.metaText}>
            {survey.minutes} Min
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons
            name="star"
            size={16}
            color="#f59e0b"
          />

          <Text style={styles.metaText}>
            {survey.rating}
          </Text>
        </View>

      </View>

      {/* CTA */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.startButton}
        onPress={() => onStartSurvey?.(survey)}
      >
        <Text style={styles.startButtonText}>
          Start Survey
        </Text>

        <Ionicons
          name="arrow-forward"
          size={18}
          color="#ffffff"
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,

    backgroundColor: '#ffffff',

    borderRadius: 24,

    padding: 18,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 3,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  badge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    color: '#1a73e8',
    fontWeight: '800',
    fontSize: 11,
  },

  matchBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  matchText: {
    color: '#15803d',
    fontWeight: '700',
    fontSize: 11,
  },

  surveyTitle: {
    marginTop: 14,

    fontSize: 18,
    fontWeight: '800',

    color: '#0f172a',

    lineHeight: 24,
  },

  metaRow: {
    flexDirection: 'row',
    marginTop: 18,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },

  metaText: {
    marginLeft: 5,

    fontSize: 13,
    fontWeight: '700',

    color: '#334155',
  },

  startButton: {
    marginTop: 20,

    height: 50,

    borderRadius: 14,

    backgroundColor: '#1a73e8',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  startButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    marginRight: 6,
  },
});