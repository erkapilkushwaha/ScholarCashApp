import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function HistoryHeader({
  totalActivities = 0,
}) {
  return (
    <View style={styles.container}>

      <View style={styles.topRow}>
        <View style={styles.textBlock}>

          <Text style={styles.title}>
            Activity History
          </Text>

          <Text style={styles.subtitle}>
            Track surveys, earnings and withdrawals
          </Text>

        </View>

        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>
            {totalActivities}
          </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textBlock: {
    flex: 1,
    paddingRight: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    lineHeight: 18,
  },

  counterBadge: {
    minWidth: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2563eb',
  },
});