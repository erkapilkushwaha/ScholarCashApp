import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import SurveyCard from './SurveyCard';

export default function TopSurveysSection({
  surveys = [],
  onSurveyPress,
  onViewAll,
}) {

  const topSurveys = surveys.slice(0, 3);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.headerRow}>

        <View>
          <Text style={styles.heading}>
            Top Surveys
          </Text>

          <Text style={styles.subHeading}>
            {surveys.length} surveys available
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onViewAll}
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>

      </View>

      {/* Empty State */}
      {topSurveys.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>
            📭
          </Text>

          <Text style={styles.emptyTitle}>
            No Surveys Available
          </Text>

          <Text style={styles.emptySubtitle}>
            New surveys will appear here automatically.
          </Text>
        </View>
      ) : (
        topSurveys.map(item => (
          <SurveyCard
            key={item.id}
            survey={item}
            onPress={onSurveyPress}
          />
        ))
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 14,
  },

  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  subHeading: {
    marginTop: 2,

    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },

  viewAll: {
    color: '#1a73e8',
    fontWeight: '800',
    fontSize: 13,
  },

  emptyCard: {
    backgroundColor: '#ffffff',

    borderRadius: 20,

    paddingVertical: 28,
    paddingHorizontal: 20,

    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  emptyEmoji: {
    fontSize: 32,
  },

  emptyTitle: {
    marginTop: 12,

    fontSize: 15,
    fontWeight: '800',

    color: '#0f172a',
  },

  emptySubtitle: {
    marginTop: 6,

    textAlign: 'center',

    color: '#64748b',

    fontSize: 12,

    lineHeight: 18,
  },
});