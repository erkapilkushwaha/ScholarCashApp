import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default function HistorySearchBar({ searchQuery, onSearchChange }) {
  return (
    <View style={styles.searchWrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search target transactions, providers..."
          placeholderTextColor="#94a3b8"
          style={styles.textInputStyle}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textInputStyle: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
  },
});
