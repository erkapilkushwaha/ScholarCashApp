import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WalletStatsOverview({
  totalEarned = 0,
  completedTasks = 0,
  bonusEarned = 0,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Stats Overview
      </Text>

      <Text style={styles.subHeading}>
        Summary of earnings and activities
      </Text>

      <View style={styles.card}>

        {/* Total Earned */}

        <View style={styles.item}>
          <Text style={styles.icon}>💰</Text>

          <Text style={styles.label}>
            Total Earned
          </Text>

          <Text style={styles.value}>
            ₹{parseFloat(totalEarned).toFixed(2)}
          </Text>
        </View>

        {/* Tasks */}

        <View style={styles.divider} />

        <View style={styles.item}>
          <Text style={styles.icon}>📋</Text>

          <Text style={styles.label}>
            Tasks Completed
          </Text>

          <Text style={styles.value}>
            {completedTasks}
          </Text>
        </View>

        {/* Bonus */}

        <View style={styles.divider} />

        <View style={styles.item}>
          <Text style={styles.icon}>🎁</Text>

          <Text style={styles.label}>
            Bonus Earned
          </Text>

          <Text style={styles.value}>
            ₹{parseFloat(bonusEarned).toFixed(2)}
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 18,
  },

  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  subHeading: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,

    elevation: 2,
  },

  item: {
    flex: 1,
    alignItems: 'center',
  },

  icon: {
    fontSize: 24,
  },

  label: {
    marginTop: 6,
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '600',
  },

  value: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },

  divider: {
    width: 1,
    backgroundColor: '#e2e8f0',
  },

});