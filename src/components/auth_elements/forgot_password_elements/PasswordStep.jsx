import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthInput from '../AuthInput'; 

// 🔄 Destructured onPrevStep and onBackToLogin for step-3 routing matrix
export default function PasswordStep({ 
  password, 
  setPassword, 
  confirmPassword, 
  setConfirmPassword, 
  onUpdatePassword, 
  onPrevStep, 
  onBackToLogin, 
  loading 
}) {
  return (
    <View style={styles.stepContainer}>
      {/* 🔒 New Password Input */}
      <AuthInput 
        label="Enter New Password" 
        placeholder="••••••••" 
        value={password}
        onChangeText={setPassword}
        isPassword={true}
      />

      {/* 🔄 Confirm New Password Input */}
      <AuthInput 
        label="Confirm New Password" 
        placeholder="••••••••" 
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword={true}
      />

      {/* 🔀 Action Row Layer: Combined Previous and Next Core Elements */}
      <View style={styles.actionRowContainer}>
        {/* ⬅️ Left Side: Back Arrow Link (Goes back to OTP Step) */}
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
          onPress={onUpdatePassword}
          disabled={loading}
          style={[styles.rowActionButton, loading && styles.disabledButton]}
        >
          <Text style={styles.actionBtnText}>
            {loading ? 'Updating...' : 'Submit Password'}
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
    width: '65%', // 🎯 Perfectly matches the OtpStep row width layout
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
