import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function EarningsLoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#1a73e8"
      />

      <Text style={styles.text}>
        Loading earnings data...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingVertical: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },

});