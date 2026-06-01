import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function WalletServiceHub({
  navigation,
}) {

  const comingSoon = (feature) => {
    Alert.alert(
      'Coming Soon',
      `${feature} will be available in a future update.`
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>
        Wallet Services
      </Text>

      <View style={styles.grid}>

        {/* Withdrawals */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(
              'WithdrawalHistoryScreen'
            )
          }
        >
          <Text style={styles.icon}>
            💸
          </Text>

          <Text style={styles.title}>
            Withdrawals
          </Text>

          <Text style={styles.subtitle}>
            Track payout requests
          </Text>
        </TouchableOpacity>

        {/* Earnings */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(
              'EarningsScreen'
            )
          }
        >
          <Text style={styles.icon}>
            📈
          </Text>

          <Text style={styles.title}>
            Earnings
          </Text>

          <Text style={styles.subtitle}>
            View reward history
          </Text>
        </TouchableOpacity>

        {/* Rewards */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            comingSoon('Rewards Center')
          }
        >
          <Text style={styles.icon}>
            🎁
          </Text>

          <Text style={styles.title}>
            Rewards
          </Text>

          <Text style={styles.subtitle}>
            Bonuses & incentives
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Soon
            </Text>
          </View>
        </TouchableOpacity>

        {/* Analytics */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            comingSoon('Analytics')
          }
        >
          <Text style={styles.icon}>
            📊
          </Text>

          <Text style={styles.title}>
            Analytics
          </Text>

          <Text style={styles.subtitle}>
            Performance insights
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Soon
            </Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#0f172a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,

    minHeight: 125,
  },

  icon: {
    fontSize: 28,
    marginBottom: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#64748b',
    lineHeight: 16,
  },

  badge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    color: '#92400e',
    fontSize: 10,
    fontWeight: '700',
  },

});