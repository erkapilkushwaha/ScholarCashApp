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
  <ScrollView
    scrollEnabled={false}
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    <StatusBar
      barStyle="dark-content"
      backgroundColor="#FFF"
    />

    <View style={styles.animationContainer}>
      <LottieView
        source={require('../../../assets/SuccessAnimation.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>

    <WithdrawalDetailsCard
      userId={userId}
      verifiedName={verifiedName}
      amount={amount}
    />

    <View style={styles.infoBox}>
      <Text style={styles.infoText}>
        Your payment will be credited to your UPI ID within a few hours.
      </Text>

      <Text style={styles.orangeText}>
        You will receive a notification once the payment is sent.
      </Text>
    </View>

    <View style={styles.bottomRow}>

      <TouchableOpacity
        style={styles.supportButton}
        onPress={() =>
          navigation.navigate('SupportScreen')
        }
      >
        <Text style={styles.supportLink}>
          Need Help?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.walletButton}
        onPress={onGoBack}
      >
        <Text style={styles.buttonText}>
          Go to Wallet
        </Text>
      </TouchableOpacity>

    </View>

  </ScrollView>
);
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  contentContainer: {
    paddingHorizontal: 14,
    paddingTop: 2,
    paddingBottom: 12,
    alignItems: 'center',
  },

  animationContainer: {
    width: 100,
    height: 100,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },

  animation: {
    width: 100,
    height: 100,
  },

  infoBox: {
    width: '100%',

    backgroundColor: '#EFF6FF',

    borderWidth: 1,
    borderColor: '#BFDBFE',

    borderRadius: 12,

    paddingVertical: 8,
    paddingHorizontal: 10,

    marginTop: 6,
    marginBottom: 10,
  },

  infoText: {
    fontSize: 11,
    lineHeight: 15,

    color: '#1E293B',

    textAlign: 'center',
  },

  orangeText: {
    fontSize: 10,
    fontWeight: '700',

    color: '#D97706',

    textAlign: 'center',

    marginTop: 2,
  },

  bottomRow: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  supportButton: {
    width: '32%',
    height: 46,

    backgroundColor: '#FFFFFF',

    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#E2E8F0',

    elevation: 1,
  },

  supportLink: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '700',
  },

  walletButton: {
    width: '64%',
    height: 46,

    backgroundColor: '#0284C7',

    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#0284C7',
    shadowOpacity: 0.18,
    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 14,
    fontWeight: '800',
  },
});