import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function TransactionLoading({ onAnimationComplete }) {
  useEffect(() => {
    // 10 second ka fix timer
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Main Loader Animation */}
      <LottieView
        source={require('../../../assets/loading.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Processing Request...</Text>
      <Text style={styles.subtitle}>Securing your funds and verifying details</Text>

      {/* Dynamic Dot Animation */}
      <View style={styles.dotsContainer}>
        <LottieView
          source={require('../../../assets/DotAnimation.json')}
          autoPlay
          loop={true}
          style={styles.dotAnimation}
        />
      </View>

      <Text style={styles.footerInstruction}>
        Please do not close or exit the app while we process your transaction.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', padding: 20 },
  animation: { width: 200, height: 200 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 8 },
  dotsContainer: { marginVertical: 20, height: 50, width: 100 },
  dotAnimation: { width: 100, height: 50 }, // Dots animation size
  footerInstruction: { fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 'auto', marginBottom: 20 }
});
