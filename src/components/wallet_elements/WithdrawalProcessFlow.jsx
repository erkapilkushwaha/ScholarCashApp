import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function WithdrawalProcessFlow() {

  const flowSteps = [
    {
      icon: '📝',
      title: 'Request Submitted',
      description:
        'Enter your UPI ID and withdrawal amount to start the payout process.',
    },
    {
      icon: '🔍',
      title: 'Verification',
      description:
        'We review the request details to ensure secure fund transfer.',
    },
    {
      icon: '⚙️',
      title: 'Processing',
      description:
        'Your payout is prepared and queued for transfer.',
    },
    {
      icon: '💸',
      title: 'Money Sent',
      description:
        'Funds are transferred to your selected UPI account.',
    },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}

      <Text style={styles.title}>
        How Your Withdrawal Works
      </Text>

      <Text style={styles.subtitle}>
        Simple, secure and transparent payout process
      </Text>

      {/* Flow Timeline */}

      {flowSteps.map((step, index) => (
        <View key={index}>

          <View style={styles.stepCard}>

            <View style={styles.iconContainer}>
              <Text style={styles.icon}>
                {step.icon}
              </Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.stepTitle}>
                {step.title}
              </Text>

              <Text style={styles.stepDescription}>
                {step.description}
              </Text>
            </View>

          </View>

          {index !== flowSteps.length - 1 && (
            <View style={styles.connector}>
              <Text style={styles.connectorArrow}>
                ↓
              </Text>
            </View>
          )}

        </View>
      ))}

      {/* Processing Banner */}

      <View style={styles.processingBanner}>

        <Text style={styles.bannerIcon}>
          ⏱
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>
            Typical Processing Time
          </Text>

          <Text style={styles.bannerText}>
            Most withdrawals are completed within 1–24 hours.
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
    marginBottom: 20,
  },

  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  icon: {
    fontSize: 24,
  },

  content: {
    flex: 1,
  },

  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },

  stepDescription: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    lineHeight: 18,
  },

  connector: {
    alignItems: 'center',
    paddingVertical: 8,
  },

  connectorArrow: {
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: '700',
  },

  processingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 14,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  bannerIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e40af',
  },

  bannerText: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
    lineHeight: 17,
  },

});