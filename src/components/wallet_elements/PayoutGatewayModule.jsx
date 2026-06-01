import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function PayoutGatewayModule({ currentBalance = 196.00, onWithdrawTrigger }) {
  const [upiId, setUpiId] = useState('');
  const isEligible = currentBalance >= 200;

  const handlePayoutSubmit = () => {
    if (!upiId.trim() || !upiId.includes('@')) {
      Alert.alert('Invalid UPI ID', 'Please input a proper verified UPI VPA handle.');
      return;
    }
    
    // Trigger real pipeline parent routing logic
    if (onWithdrawTrigger) {
      onWithdrawTrigger(upiId);
    }
  };

  return (
    <View style={styles.moduleContainer}>
      <Text style={styles.sectionHeading}>Instant Payout Gateway</Text>
      
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Transfer via UPI ID</Text>
        <TextInput 
          style={styles.textInputField}
          placeholder="example@ybl, paytm, oksbi"
          placeholderTextColor="#94a3b8"
          value={upiId}
          onChangeText={setUpiId}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Dynamic Security Verification Payout Button */}
      <TouchableOpacity
        style={[styles.payoutButton, isEligible ? styles.activeBtn : styles.disabledBtn]}
        activeOpacity={0.8}
        disabled={!isEligible}
        onPress={handlePayoutSubmit}
      >
        <Text style={styles.buttonText}>
          {isEligible ? '🚀 Instant Transfer to Bank' : '🔒 Locked (Minimum ₹200 Req.)'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.secureFooterText}>🛡️ Processed via Secure Prepaid Disbursement Node</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  moduleContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#edf2f7',
    elevation: 1,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 4,
  },
  textInputField: {
    width: '100%',
    height: 42,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '600',
  },
  payoutButton: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  activeBtn: {
    backgroundColor: '#1a73e8',
  },
  disabledBtn: {
    backgroundColor: '#cbd5e1',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  secureFooterText: {
    fontSize: 8.5,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
});
