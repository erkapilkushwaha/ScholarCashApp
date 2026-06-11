import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function SummaryCard({
  walletBalance = 0,
  todayEarnings = 0,
  totalEarnings = 0,
  totalWithdrawals = 0,
  todaySurveys = 0,
}) {
  return (
    <View style={styles.wrapper}>

      {/* Main Balance Section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>
          Wallet Balance
        </Text>

        <Text style={styles.balanceAmount}>
          ₹{Number(walletBalance).toFixed(2)}
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.grid}>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            ₹{Number(todayEarnings).toFixed(0)}
          </Text>

          <Text style={styles.statLabel}>
            Today Earnings
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {todaySurveys}
          </Text>

          <Text style={styles.statLabel}>
            Today's Surveys
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            ₹{Number(totalEarnings).toFixed(0)}
          </Text>

          <Text style={styles.statLabel}>
            Total Earnings
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            ₹{Number(totalWithdrawals).toFixed(0)}
          </Text>

          <Text style={styles.statLabel}>
            Withdrawals
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 24,
    backgroundColor: '#0f172a',
    padding: 20,
  },

  balanceSection: {
    marginBottom: 18,
  },

  balanceLabel: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: '600',
  },

  balanceAmount: {
    marginTop: 4,
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#cbd5e1',
    fontWeight: '600',
  },
});