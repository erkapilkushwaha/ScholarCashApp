import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function EarningsSummaryCard({
  totalEarned = 0,
  tasksCompleted = 0,
  averageReward = 0,
}) {

  return (
    <View style={styles.card}>

      {/* Main Total */}

      <Text style={styles.label}>
        Total Earned
      </Text>

      <Text style={styles.amount}>
        ₹{Number(totalEarned).toFixed(2)}
      </Text>

      {/* Divider */}

      <View style={styles.divider} />

      {/* Stats Row */}

      <View style={styles.statsRow}>

        <View style={styles.statBlock}>
          <Text style={styles.statValue}>
            {tasksCompleted}
          </Text>

          <Text style={styles.statLabel}>
            Tasks
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.statBlock}>
          <Text style={styles.statValue}>
            ₹{Number(averageReward).toFixed(2)}
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
    backgroundColor: '#1a73e8',
    borderRadius: 22,
    padding: 20,

    shadowColor: '#1a73e8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  label: {
    color: '#dbeafe',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  amount: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 18,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statBlock: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },

  statLabel: {
    color: '#dbeafe',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },

  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

});