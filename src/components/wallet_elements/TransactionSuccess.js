import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av'; 
import WithdrawalDetailsCard from './WithdrawalDetailsCard';

export default function TransactionSuccess({ amount, verifiedName, userId, onGoBack, navigation }) {
  
  useEffect(() => {
    let soundObject;

    async function playSuccessSound() {
      try {
        soundObject = new Audio.Sound();
        // Sahi path: root folder ke assets folder mein mp3 file
        await soundObject.loadAsync(require('../../../assets/success.mp3'));
        await soundObject.playAsync();
      } catch (error) {
        console.log("Audio play error:", error);
      }
    }
    
    playSuccessSound();

    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Lottie Success Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../../assets/SuccessAnimation.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />
      </View>

      <Text style={styles.title}>Request Submitted!</Text>
      <Text style={styles.subtitleGreen}>We’ve received your withdrawal request</Text>

      <WithdrawalDetailsCard userId={userId} verifiedName={verifiedName} amount={amount} />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Your payment will be credited to your UPI ID within a few hours.</Text>
        <Text style={styles.orangeText}>You will receive a notification once the payment is sent.</Text>
      </View>

      <View style={styles.supportContainer}>
        <Text style={styles.needHelp}>Need Help? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')}>
          <Text style={styles.supportLink}>Support </Text>
        </TouchableOpacity>
        <Text style={styles.needHelp}>| </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ContactUsScreen')}>
          <Text style={styles.supportLink}>Contact us</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={onGoBack}>
        <Text style={styles.buttonText}>Go to Wallet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  contentContainer: { padding: 24, alignItems: 'center' },
  animationContainer: { width: 150, height: 150, marginTop: 20, justifyContent: 'center', alignItems: 'center' },
  animation: { width: 150, height: 150 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginTop: 15 },
  subtitleGreen: { fontSize: 14, color: '#10B981', marginBottom: 20, fontWeight: '600' },
  infoBox: { width: '100%', marginTop: 10, marginBottom: 20 },
  infoText: { fontSize: 13, color: '#374151', marginBottom: 5 },
  orangeText: { fontSize: 12, color: '#f59e0b', marginTop: 5, fontWeight: '600' },
  supportContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  needHelp: { color: '#6B7280' },
  supportLink: { color: '#0284c7', fontWeight: '700' },
  button: { width: '100%', backgroundColor: '#0284c7', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
