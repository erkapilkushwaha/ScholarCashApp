import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../config/supabaseClient';

export default function WithdrawalDetailsCard({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatest() {
      setLoading(true);
      const { data: record, error } = await supabase
        .from('withdrawals')
        .select('id, name, upi_id, amount, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);

      if (record && record.length > 0) setData(record[0]);
      setLoading(false);
    }
    fetchLatest();
  }, [userId]);

  if (loading) return <ActivityIndicator color="#0284c7" />;
  if (!data) return <Text style={styles.errorText}>No record found.</Text>;

  return (
    <View style={styles.card}>
      <View style={styles.row}><Text style={styles.label}>Request ID</Text><Text style={styles.value}>{data.id.slice(0, 8).toUpperCase()}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Name</Text><Text style={styles.value}>{data.name}</Text></View>
      <View style={styles.row}><Text style={styles.label}>UPI ID</Text><Text style={styles.value}>{data.upi_id}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Amount</Text><Text style={styles.amount}>₹{data.amount}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Date & Time</Text><Text style={styles.value}>{new Date(data.created_at).toLocaleString()}</Text></View>
      
      <View style={styles.footer}>
        <Text style={styles.warning}>⚠️ Expected Processing Time: 1-24 hours</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', width: '100%', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { color: '#6B7280', fontSize: 14 },
  value: { color: '#111827', fontWeight: '600' },
  amount: { color: '#0284c7', fontWeight: 'bold' },
  footer: { marginTop: 15, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  warning: { fontSize: 12, color: '#D97706', textAlign: 'center' },
  errorText: { textAlign: 'center', margin: 20, color: 'red' }
});
