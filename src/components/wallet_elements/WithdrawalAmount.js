import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';

export default function WithdrawalAmount({ userId, userName, verifiedUpi, setGlobalStatus, setGlobalAmount }) {
  const [amount, setAmount] = useState('');
  const [customUpi, setCustomUpi] = useState(verifiedUpi || '');
  const [loading, setLoading] = useState(false);

  const handleWithdrawRequest = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!customUpi || !customUpi.includes('@')) {
      Alert.alert('Error', 'Please enter a valid UPI ID');
      return;
    }

    setLoading(true);
    setGlobalAmount(amount); 
    setGlobalStatus('loading');

    try {
      const supabaseUrl = 'https://kkpjtyakcccndlbwwxnc.supabase.co/rest/v1/withdrawals';
      const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcGp0eWFrY2NjbmRsYnd3eG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTc2NDUsImV4cCI6MjA5NDg5MzY0NX0.wHcVml0GgTNc7iVOHn8cxUAqVNHinR8eTClHJc03nCs';

      const payload = {
        user_id: userId,
        amount: parseFloat(amount),
        status: 'pending',
        upi_id: customUpi,
        name: userName || "User" // 🔑 Uses the prop or defaults to "User"
      };

      const response = await fetch(supabaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setAmount('');
      } else {
        const errorData = await response.json();
        setGlobalStatus('verified'); 
        Alert.alert('Database Error', errorData.message || 'Failed to record request.');
      }
    } catch (err) {
      setGlobalStatus('verified');
      Alert.alert('Network Error', 'Server se communication toot gaya hai.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Manual Withdrawal Panel</Text>
      
      <Text style={styles.inputLabel}>Target UPI ID</Text>
      <TextInput
        style={styles.input}
        value={customUpi}
        onChangeText={setCustomUpi}
        placeholder="Enter your UPI ID"
        autoCapitalize="none"
        editable={!loading}
      />

      <Text style={styles.inputLabel}>Withdrawal Amount (₹)</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter Amount"
        keyboardType="numeric"
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleWithdrawRequest} 
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit Withdrawal Request</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#111827' },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#64748b', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15, backgroundColor: '#fff', fontSize: 14 },
  button: { backgroundColor: '#0284c7', padding: 12, borderRadius: 5, alignItems: 'center', marginTop: 5 },
  disabledButton: { backgroundColor: '#bae6fd' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
