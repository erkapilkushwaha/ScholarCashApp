import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HistoryHeader() {
  return (
    <View style={styles.headerBox}>
      {/* 🏷️ Main Title Node */}
      <Text style={styles.mainTitle}>Activity Ledger</Text>
      
      {/* 📜 Symmetrical Subtitle Description */}
      <Text style={styles.subTitle}>Track your complete financial timeline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
    backgroundColor: '#ffffff',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1f2937',
    letterSpacing: 0.1,
  },
  subTitle: {
    fontSize: 11.5,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
  },
});
