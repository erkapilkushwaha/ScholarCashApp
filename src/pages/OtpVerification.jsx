import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../config/supabaseClient'; // Path dhyan se check kar lena bhai

export default function OtpVerification({ route, navigation }) {
  // 📥 Signup page se aaye hue params (Email aur Password)
  const { email, password } = route?.params || {};
  
  const [otpToken, setOtpToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // ⏱️ Resend OTP Timer Engine
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // 🔐 OTP Verification Handler
  const handleVerifyOtp = async () => {
    if (!otpToken || otpToken.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      // 🔄 Supabase se OTP verify karne ki request
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otpToken,
        type: 'signup',
      });

      if (error) throw error;

      // ✅ Verification Success! 
      Alert.alert('Success', 'Account verified successfully!', [
        {
          text: 'OK',
          onPress: () => {
            if (navigation?.replace) {
              navigation.replace('Home');
            }
          }
        }
      ]);

    } catch (err) {
      Alert.alert('Verification Failed', err.message || 'Invalid OTP, please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Resend OTP Handler
  const handleResendOtp = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      if (error) throw error;
      
      setTimer(60);
      Alert.alert('Success', 'A new OTP has been sent to your email.');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>We have sent a 6-digit OTP code to {email || 'your email'}</Text>

      {/* 🔢 OTP Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter 6-Digit OTP"
        placeholderTextColor="#94a3b8"
        keyboardType="number-pad"
        maxLength={6}
        value={otpToken}
        onChangeText={setOtpToken}
      />

      {/* 🚀 Verification Button */}
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Verify & Proceed</Text>
        )}
      </TouchableOpacity>

      {/* ⏱️ Timer & Resend Section */}
      <View style={styles.resendContainer}>
        {timer > 0 ? (
          <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1e293b',
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  timerText: {
    color: '#64748b',
    fontSize: 14,
  },
  resendText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  }
});
