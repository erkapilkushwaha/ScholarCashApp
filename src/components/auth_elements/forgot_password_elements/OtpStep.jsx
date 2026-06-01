import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthInput from '../AuthInput'; 

// 🔄 Destructured onPrevStep and onBackToLogin for conditional row routing
export default function OtpStep({ otp, setOtp, onVerifyOtp, onPrevStep, onBackToLogin, loading }) {
  return (
    <View style={styles.stepContainer}>
      {/* 🔑 OTP Input Field */}
      <AuthInput 
        label="Enter 6-Digit OTP" 
        placeholder="e.g., 123456" 
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />

      {/* 🔀 Action Row Layer: Combined Previous and Next Core Elements */}
      <View style={styles.actionRowContainer}>
        {/* ⬅️ Left Side: Back Arrow Link */}
        <TouchableOpacity 
          activeOpacity={0.6} 
          onPress={onPrevStep}
          style={styles.backStepButton}
        >
          <Text style={styles.backStepText}>← Back</Text>
        </TouchableOpacity>

        {/* ➡️ Right Side: Medium Width Main Action Trigger */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={onVerifyOtp}
          disabled={loading}
          style={[styles.rowActionButton, loading && styles.disabledButton]}
        >
          <Text style={styles.actionBtnText}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔗 Center Underlined Direct Entry Bridge */}
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
  // 🎨 Row matrix layout control
  actionRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  backStepButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  backStepText: {
    fontSize: 15,
    color: '#475569',
    fontWeight: '700',
  },
  rowActionButton: {
    width: '65%', // 🎯 Custom tight alignment to make room for the left link
    height: 48,
    backgroundColor: '#1a73e8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  backToLoginWrapper: {
    alignSelf: 'center',
    marginTop: 25,
    padding: 5,
  },
  backToLoginText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
