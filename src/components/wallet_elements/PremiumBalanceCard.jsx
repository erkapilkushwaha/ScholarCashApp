import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PremiumBalanceCard({
  balance,
  pending,
  earned,
  withdrawn,
}) {
  const finalBalance = parseFloat(balance ?? 0);
  const finalPending = parseFloat(pending ?? 0);
  const finalEarned = parseFloat(earned ?? 0);
  const finalWithdrawn = parseFloat(withdrawn ?? 0);

  // Logic: 50 ke multiple mein available balance calculate karna
  const minWithdrawal = 50;
  const availableBalance = Math.floor(finalBalance / minWithdrawal) * minWithdrawal;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
          <Text style={styles.balanceAmount}>₹{finalBalance.toFixed(2)}</Text>

          <Text style={styles.availableText}>Available Balance</Text>
          <Text style={styles.availableAmount}>₹{availableBalance.toFixed(2)}</Text>
        </View>

        <View style={styles.walletIconBox}>
          <Text style={styles.walletEmoji}>💰</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={styles.statValue}>₹{finalPending.toFixed(0)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Earned</Text>
          <Text style={styles.statValue}>₹{finalEarned.toFixed(0)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Withdrawn</Text>
          <Text style={styles.statValue}>₹{finalWithdrawn.toFixed(0)}</Text>
        </View>
      </View>
    </View>
  );
}

// ... styles wahi rahengi jo aapne pehle bheji thi

const styles = StyleSheet.create({

  card: {
    width: '100%',
    borderRadius: 24,
    padding: 22,

    backgroundColor: '#0f172a',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',

    shadowColor: '#06b6d4',
    shadowOpacity: 0.25,
    shadowRadius: 15,

    elevation: 8,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  balanceLabel: {
    color: '#cbd5e1',
    fontSize: 14,
  },

  balanceAmount: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '800',
    marginTop: 6,
  },

  availableText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 12,
  },

  availableAmount: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },

  walletIconBox: {
    width: 90,
    height: 90,

    borderRadius: 45,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  walletEmoji: {
    fontSize: 42,
  },

  statsContainer: {
    marginTop: 24,

    flexDirection: 'row',

    backgroundColor: 'rgba(255,255,255,0.05)',

    borderRadius: 16,

    paddingVertical: 14,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statLabel: {
    color: '#94a3b8',
    fontSize: 11,
  },

  statValue: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
});