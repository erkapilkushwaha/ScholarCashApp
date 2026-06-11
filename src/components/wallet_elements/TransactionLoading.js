import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function TransactionLoading({ onAnimationComplete }) {

  const loadingMessages = [
    'Verifying account details...',
    'Preparing secure transfer...',
    'Processing payout...',
    'Finalizing transaction...',
    'Almost done...'
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const messageTimer = setInterval(() => {
      setMessageIndex(prev => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + 5;
      });
    }, 500);

    const successTimer = setTimeout(() => {
      setProgress(100);
      onAnimationComplete();
    }, 10000);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
      clearTimeout(successTimer);
    };
  }, []);

  return (
    <View style={styles.container}>

      {/* Main Animation */}
      <LottieView
        source={require('../../../assets/loading.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      {/* Title */}
      <Text style={styles.title}>
        Processing Withdrawal
      </Text>

      {/* Dynamic Subtitle */}
      <Text style={styles.subtitle}>
        {loadingMessages[messageIndex]}
      </Text>

      {/* Dots Animation */}
      <View style={styles.dotsContainer}>
        <LottieView
          source={require('../../../assets/DotAnimation.json')}
          autoPlay
          loop
          style={styles.dotAnimation}
        />
      </View>

      {/* Progress */}
      <Text style={styles.progressText}>
        {progress}%
      </Text>

      {/* Footer */}
      <Text style={styles.footerText}>
        Securely processing your request
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 90,
    paddingHorizontal: 24,
  },

  animation: {
    width: 220,
    height: 220,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 10,
    textAlign: 'center',
  },

  dotsContainer: {
    width: 120,
    height: 50,
    marginTop: 10,
  },

  dotAnimation: {
    width: 120,
    height: 50,
  },

  progressText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0284c7',
    marginTop: 5,
  },

  footerText: {
    marginTop: 'auto',
    marginBottom: 40,
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});