import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function SearchBar({
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search surveys, earnings, withdrawals..."
        placeholderTextColor="#94a3b8"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 18,
  },

  input: {
    height: 52,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,

    elevation: 2,
  },
});