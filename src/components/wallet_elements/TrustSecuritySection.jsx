import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function TrustSecuritySection() {

  const badges = [
    {
      icon: '🔒',
      title: 'Secure Payments',
      desc:
        'All payout requests are processed through verified payment channels.',
    },
    {
      icon: '🛡',
      title: 'Fraud Protection',
      desc:
        'Manual verification helps prevent unauthorized withdrawal attempts.',
    },
    {
      icon: '⚡',
      title: 'Fast Processing',
      desc:
        'Most verified withdrawals are completed within 1–24 hours.',
    },
    {
      icon: '✅',
      title: 'Verified Payouts',
      desc:
        'Every request is reviewed before funds are transferred.',
    },
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Trust & Security
      </Text>

      <Text style={styles.subtitle}>
        Your earnings and withdrawals are protected by multiple security layers
      </Text>

      <View style={styles.grid}>

        {badges.map((item, index) => (
          <View
            key={index}
            style={styles.card}
          >
            <Text style={styles.icon}>
              {item.icon}
            </Text>

            <Text style={styles.cardTitle}>
              {item.title}
            </Text>

            <Text style={styles.cardDescription}>
              {item.desc}
            </Text>
          </View>
        ))}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 16,
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
    padding: 14,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#0f172a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,

    minHeight: 145,
  },

  icon: {
    fontSize: 26,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 5,
  },

  cardDescription: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 17,
  },

});