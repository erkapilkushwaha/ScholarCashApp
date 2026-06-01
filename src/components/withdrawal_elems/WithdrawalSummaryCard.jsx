import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function WithdrawalSummaryCard({
  totalWithdrawn = 0,
  pendingCount = 0,
  successCount = 0,
  rejectedCount = 0,
}) {

  return (
    <View style={styles.card}>

      <Text style={styles.label}>
        Total Withdrawn
      </Text>

      <Text style={styles.amount}>
        ₹{Number(totalWithdrawn).toFixed(2)}
      </Text>

      <View style={styles.divider} />

      <View style={styles.statsRow}>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {pendingCount}
          </Text>
          <Text style={styles.statLabel}>
            Pending
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {successCount}
          </Text>
          <Text style={styles.statLabel}>
            Success
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {rejectedCount}
          </Text>
          <Text style={styles.statLabel}>
            Rejected
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

  statBox: {
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

  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

});