import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function WithdrawalEmptyState({
  onBackPress,
}) {

  return (
    <View style={styles.container}>

      <Text style={styles.icon}>
        💸
      </Text>

      <Text style={styles.title}>
        No Withdrawals Yet
      </Text>

      <Text style={styles.subtitle}>
        Your withdrawal requests and payout history will appear here.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onBackPress}
      >
        <Text style={styles.buttonText}>
          Back To Wallet
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  icon: {
    fontSize: 70,
  },

  title: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },

  button: {
    marginTop: 24,
    backgroundColor: '#1a73e8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },

});