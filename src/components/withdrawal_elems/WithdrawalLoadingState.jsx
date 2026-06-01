import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function WithdrawalLoadingState() {
  return (
    <View style={styles.container}>

      <ActivityIndicator
        size="large"
        color="#1a73e8"
      />

      <Text style={styles.text}>
        Loading withdrawal history...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },

});