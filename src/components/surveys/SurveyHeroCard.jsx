import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function SurveyHeroCard({
  totalSurveys = 0,
  avgReward = 0,
}) {
  return (
    <View style={styles.card}>

      <Text style={styles.badge}>
        💰 Earn Rewards Daily
      </Text>

      <Text style={styles.title}>
        Complete Surveys &
        {'\n'}
        Get Paid
      </Text>

      <Text style={styles.subtitle}>
        Answer simple surveys from trusted partners
        and earn real cash directly in your wallet.
      </Text>

      <View style={styles.statsRow}>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {totalSurveys}
          </Text>

          <Text style={styles.statLabel}>
            Available
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            ₹{avgReward}
          </Text>

          <Text style={styles.statLabel}>
            Avg Reward
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 12,

    borderRadius: 24,

    padding: 22,

    backgroundColor: '#1a73e8',

    shadowColor: '#1a73e8',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  badge: {
    alignSelf: 'flex-start',

    backgroundColor: 'rgba(255,255,255,0.18)',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,

    color: '#fff',

    fontSize: 11,
    fontWeight: '800',
  },

  title: {
    marginTop: 14,

    color: '#fff',

    fontSize: 24,
    fontWeight: '900',

    lineHeight: 32,
  },

  subtitle: {
    marginTop: 10,

    color: 'rgba(255,255,255,0.85)',

    fontSize: 13,

    lineHeight: 20,
  },

  statsRow: {
    flexDirection: 'row',

    marginTop: 20,
  },

  statCard: {
    flex: 1,

    backgroundColor: 'rgba(255,255,255,0.12)',

    borderRadius: 16,

    paddingVertical: 14,

    alignItems: 'center',

    marginRight: 10,
  },

  statValue: {
    color: '#fff',

    fontSize: 20,
    fontWeight: '900',
  },

  statLabel: {
    marginTop: 4,

    color: 'rgba(255,255,255,0.8)',

    fontSize: 12,
    fontWeight: '700',
  },
});