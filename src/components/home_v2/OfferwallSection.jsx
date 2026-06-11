import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function OfferwallSection({
  providers = [],
  onProviderPress,
  onViewAll,
}) {
  return (
    <View style={styles.container}>

      {/* Header */}

      <View style={styles.headerRow}>

        <View>
          <Text style={styles.heading}>
            Offerwalls
          </Text>

          <Text style={styles.subHeading}>
            Complete tasks & earn rewards
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onViewAll}
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>

      </View>

      {/* Horizontal Feed */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {providers.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            style={styles.card}
            onPress={() =>
              onProviderPress?.(item)
            }
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name="flash"
                size={22}
                color="#1a73e8"
              />
            </View>

            <Text
              numberOfLines={1}
              style={styles.providerName}
            >
              {item.name}
            </Text>

            <Text style={styles.rewardText}>
              Up To ₹{item.max_reward}
            </Text>

            <View style={styles.footerRow}>
              <Ionicons
                name="checkmark-circle"
                size={13}
                color="#22c55e"
              />

              <Text style={styles.liveText}>
                Live
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingLeft: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingRight: 20,
    marginBottom: 14,
  },

  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  subHeading: {
    marginTop: 2,

    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },

  viewAll: {
    color: '#1a73e8',
    fontWeight: '800',
    fontSize: 13,
  },

  card: {
    width: 150,

    backgroundColor: '#ffffff',

    borderRadius: 22,

    padding: 16,

    marginRight: 12,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#0f172a',
    shadowOpacity: 0.04,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  iconWrap: {
    width: 44,
    height: 44,

    borderRadius: 14,

    backgroundColor: '#eff6ff',

    justifyContent: 'center',
    alignItems: 'center',
  },

  providerName: {
    marginTop: 14,

    fontSize: 14,
    fontWeight: '800',

    color: '#0f172a',
  },

  rewardText: {
    marginTop: 6,

    color: '#16a34a',

    fontSize: 13,
    fontWeight: '700',
  },

  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 12,
  },

  liveText: {
    marginLeft: 4,

    color: '#22c55e',

    fontSize: 11,
    fontWeight: '700',
  },
});