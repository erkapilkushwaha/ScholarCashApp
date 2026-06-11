import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ProgressAchievementCard({
  todayEarnings = 0,
  todaySurveys = 0,
  dailyTarget = 200,
}) {

  const progress =
    Math.min(
      (todayEarnings / dailyTarget) * 100,
      100
    );

  const remaining =
    Math.max(
      dailyTarget - todayEarnings,
      0
    );

  return (
    <View style={styles.card}>

      {/* Header */}

      <View style={styles.headerRow}>

        <View>
          <Text style={styles.heading}>
            Today's Progress
          </Text>

          <Text style={styles.subHeading}>
            Keep earning to unlock rewards
          </Text>
        </View>

        <Ionicons
          name="trophy"
          size={26}
          color="#f59e0b"
        />

      </View>

      {/* Earnings */}

      <Text style={styles.amount}>
        ₹{todayEarnings}
      </Text>

      <Text style={styles.targetLabel}>
        Goal ₹{dailyTarget}
      </Text>

      {/* Progress Bar */}

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.progressText}>
        {Math.round(progress)}% Completed
      </Text>

      {/* Bottom Grid */}

      <View style={styles.statsRow}>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {todaySurveys}
          </Text>

          <Text style={styles.statLabel}>
            Surveys Today
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            ₹{remaining}
          </Text>

          <Text style={styles.statLabel}>
            Remaining
          </Text>
        </View>

      </View>

      {/* Achievement */}

      <View style={styles.achievementCard}>

        <View style={styles.achievementIcon}>
          <Ionicons
            name="ribbon"
            size={18}
            color="#1a73e8"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.achievementTitle}>
            Next Achievement
          </Text>

          <Text style={styles.achievementText}>
            Earn ₹500 Total Rewards
          </Text>
        </View>

        <Text style={styles.badge}>
          60%
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,

    backgroundColor: '#ffffff',

    borderRadius: 24,

    padding: 18,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },

  subHeading: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },

  amount: {
    marginTop: 18,

    fontSize: 30,
    fontWeight: '900',

    color: '#0f172a',
  },

  targetLabel: {
    marginTop: 4,

    color: '#64748b',
    fontSize: 12,

    fontWeight: '700',
  },

  progressTrack: {
    height: 10,

    backgroundColor: '#e2e8f0',

    borderRadius: 999,

    marginTop: 16,

    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',

    backgroundColor: '#1a73e8',

    borderRadius: 999,
  },

  progressText: {
    marginTop: 8,

    color: '#1a73e8',

    fontSize: 12,

    fontWeight: '800',
  },

  statsRow: {
    flexDirection: 'row',

    marginTop: 18,

    backgroundColor: '#f8fafc',

    borderRadius: 18,

    paddingVertical: 14,
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a',
  },

  statLabel: {
    marginTop: 3,

    fontSize: 11,

    color: '#64748b',

    fontWeight: '700',
  },

  divider: {
    width: 1,
    backgroundColor: '#e2e8f0',
  },

  achievementCard: {
    marginTop: 18,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#eff6ff',

    borderRadius: 18,

    padding: 14,
  },

  achievementIcon: {
    width: 40,
    height: 40,

    borderRadius: 12,

    backgroundColor: '#ffffff',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  achievementTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },

  achievementText: {
    marginTop: 2,

    fontSize: 13,
    fontWeight: '800',

    color: '#0f172a',
  },

  badge: {
    color: '#1a73e8',
    fontSize: 13,
    fontWeight: '900',
  },
});