import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function QuickActionsGrid({
  onReferralPress,
  onDailyTasksPress,
  onBonusZonePress,
  onAchievementsPress,
}) {
  const actions = [
    {
      id: 'referral',
      title: 'Referral',
      icon: 'people-outline',
      onPress: onReferralPress,
    },
    {
      id: 'tasks',
      title: 'Daily Tasks',
      icon: 'checkmark-done-circle-outline',
      onPress: onDailyTasksPress,
    },
    {
      id: 'bonus',
      title: 'Bonus Zone',
      icon: 'gift-outline',
      onPress: onBonusZonePress,
    },
    {
      id: 'achievements',
      title: 'Achievements',
      icon: 'trophy-outline',
      onPress: onAchievementsPress,
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.85}
          style={styles.card}
          onPress={item.onPress}
        >
          <View style={styles.iconWrap}>
            <Ionicons
              name={item.icon}
              size={24}
              color="#1a73e8"
            />
          </View>

          <Text
            style={styles.title}
            numberOfLines={2}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    marginTop: 18,
  },

  card: {
    width: '23%',

    backgroundColor: '#ffffff',

    borderRadius: 18,

    paddingVertical: 14,

    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#0f172a',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  iconWrap: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: '#eff6ff',

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginTop: 8,

    textAlign: 'center',

    fontSize: 11,
    fontWeight: '700',

    color: '#1e293b',
  },
});