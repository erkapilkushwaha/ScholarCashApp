import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthInput from '../AuthInput'; 

// 🔄 Added onBackToLogin prop for premium layout alignment
export default function EmailStep({ email, setEmail, onSendOtp, onBackToLogin, loading }) {
  return (
    <View style={styles.stepContainer}>
      {/* 📥 Email Input Field */}
      <AuthInput 
        label="Enter Your Registered Email" 
        placeholder="example@gmail.com" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* 🔵 Action Button */}
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={onSendOtp}
        disabled={loading}
        style={[styles.primaryActionButton, loading && styles.disabledButton]}
      >
        <Text style={styles.actionBtnText}>
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </Text>
      </TouchableOpacity>

      {/* 🔗 Professional Underlined Back to Login Link */}
      <TouchableOpacity 
        activeOpacity={0.6} 
        onPress={onBackToLogin}
        style={styles.backToLoginWrapper}
      >
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    width: '100%',
  },
  primaryActionButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#1a73e8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    elevation: 2,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#93c5fd',
    elevation: 0,
  },
  actionBtnText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '800',
  },
  // 🎨 Custom Styles for Underlined Navigation Links
  backToLoginWrapper: {
    alignSelf: 'center',
    marginTop: 25,
    padding: 5,
  },
  backToLoginText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '700',
    textDecorationLine: 'underline', // 🎯 Dynamic underline highlight
  },
});
