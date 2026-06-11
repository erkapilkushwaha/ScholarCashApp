import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function EmptyState({
  title = 'No Activity Found',
  subtitle = 'Your surveys, earnings and withdrawals will appear here.',
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.emoji}>
        📭
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emoji: {
    fontSize: 54,
    marginBottom: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    color: '#64748b',
    maxWidth: 260,
  },
});