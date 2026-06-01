import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function UPIVerification({ onVerificationSuccess }) {
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');

  const verifyUPI = async () => {
    if (!upiId) {
      setError('Please enter a UPI ID');
      return;
    }

    setLoading(true);
    setError('');
    setCustomerName('');

    try {
      // 📡 Direct Production Architecture Endpoint Hit
      const response = await fetch('https://kkpjtyakcccndlbwwxnc.supabase.co/functions/v1/swift-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcGp0eWFrY2NjbmRsYnd3eG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTc2NDUsImV4cCI6MjA5NDg5MzY0NX0.wHcVml0GgTNc7iVOHn8cxUAqVNHinR8eTClHJc03nCs',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcGp0eWFrY2NjbmRsYnd3eG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTc2NDUsImV4cCI6MjA5NDg5MzY0NX0.wHcVml0GgTNc7iVOHn8cxUAqVNHinR8eTClHJc03nCs'
        },
        body: JSON.stringify({ vpa: upiId.trim() }),
      });

      // 🔍 Log 1: Server se kya status code aaya (e.g. 200, 401, 500)
      console.log("📡 Server Response Status Code:", response.status);

      const data = await response.json();

      // 🔍 Log 2: Server se kya asali json data aaya
      console.log("📦 Server Raw Payload Data:", data);

      if (response.ok && data && data.status === 'SUCCESS' && data.data && data.data.name) {
        const realName = data.data.name;
        setCustomerName(realName);
        onVerificationSuccess(realName, upiId.trim());
      } else {
        setError(data.message || 'Verification failed on server.');
      }
    } catch (err) {
      setError(`Network Error: ${err.message}`);
      console.error("Actual Fetch Crash Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>UPI ID Verification</Text>
      <TextInput
        style={styles.input}
        value={upiId}
        onChangeText={setUpiId}
        placeholder="Enter Sandbox VPA (success@gocash)"
        autoCapitalize="none"
        editable={!loading}
      />
      
      <TouchableOpacity style={styles.button} onPress={verifyUPI} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify UPI</Text>}
      </TouchableOpacity>

      {customerName ? <Text style={styles.successText}>🟢 Account Holder: {customerName}</Text> : null}
      {error ? <Text style={styles.errorText}>🔴 {error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#6200ee', padding: 12, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  successText: { color: 'green', marginTop: 10, fontWeight: '600' },
  errorText: { color: 'red', marginTop: 10 }
});

