import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function WalletHeroCard({
  balance = 0,
  pending = 0,
  todayEarnings = 0,
  totalEarned = 0,
  onWithdrawPress,
}) {
  return (
    <View style={styles.card}>

      {/* Top Row */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>
            Available Balance
          </Text>

          <Text style={styles.balance}>
            ₹{Number(balance).toFixed(2)}
          </Text>
        </View>

        <View style={styles.walletIcon}>
          <Ionicons
            name="wallet"
            size={26}
            color="#ffffff"
          />
        </View>
      </View>

      {/* Stats Pills */}
      <View style={styles.statsRow}>

        <View style={styles.statPill}>
          <Text style={styles.statValue}>
            ₹{todayEarnings}
          </Text>

          <Text style={styles.statLabel}>
            Today
          </Text>
        </View>

        <View style={styles.statPill}>
          <Text style={styles.statValue}>
            ₹{pending}
          </Text>

          <Text style={styles.statLabel}>
            Pending
          </Text>
        </View>

        <View style={styles.statPill}>
          <Text style={styles.statValue}>
            ₹{totalEarned}
          </Text>

          <Text style={styles.statLabel}>
            Lifetime
          </Text>
        </View>

      </View>

      {/* Withdraw Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.withdrawBtn}
        onPress={onWithdrawPress}
      >
        <Ionicons
          name="arrow-down-circle"
          size={18}
          color="#ffffff"
        />

        <Text style={styles.withdrawText}>
          Withdraw Funds
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 10,

    borderRadius: 26,

    padding: 22,

    backgroundColor: '#1a73e8',

    shadowColor: '#1a73e8',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '600',
  },

  balance: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 4,
  },

  walletIcon: {
    width: 56,
    height: 56,

    borderRadius: 28,

    backgroundColor: 'rgba(255,255,255,0.18)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 22,
  },

  statPill: {
    flex: 1,

    backgroundColor: 'rgba(255,255,255,0.12)',

    borderRadius: 14,

    paddingVertical: 10,

    marginHorizontal: 4,

    alignItems: 'center',
  },

  statValue: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },

  statLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    marginTop: 2,
  },

  withdrawBtn: {
    marginTop: 22,

    backgroundColor: '#ffffff',

    borderRadius: 16,

    height: 52,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  withdrawText: {
    color: '#1a73e8',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
});