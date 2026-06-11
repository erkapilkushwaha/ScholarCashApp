import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Ionicons
} from '@expo/vector-icons';

export default function BottomNavWidget({
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    {
      key: 'home',
      label: 'Home',
      icon: 'home-outline',
      activeIcon: 'home',
    },
    {
      key: 'wallet',
      label: 'Wallet',
      icon: 'wallet-outline',
      activeIcon: 'wallet',
    },
    {
      key: 'history',
      label: 'History',
      icon: 'receipt-outline',
      activeIcon: 'receipt',
    },
    {
      key: 'menu',
      label: 'Menu',
      icon: 'menu-outline',
      activeIcon: 'menu',
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive =
            activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.75}
              style={styles.tabButton}
              onPress={() =>
                setActiveTab(tab.key)
              }
            >
              {/* Active Indicator */}
              <View
                style={[
                  styles.indicator,
                  isActive &&
                    styles.activeIndicator,
                ]}
              />

              <Ionicons
                name={
                  isActive
                    ? tab.activeIcon
                    : tab.icon
                }
                size={22}
                color={
                  isActive
                    ? '#2563EB'
                    : '#94A3B8'
                }
              />

              <Text
                style={[
                  styles.label,
                  isActive &&
                    styles.activeLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,

    elevation: 18,
  },

  container: {
    flexDirection: 'row',
    height: 72,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  indicator: {
    width: 22,
    height: 4,
    borderRadius: 20,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },

  activeIndicator: {
    backgroundColor: '#2563EB',
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
    color: '#94A3B8',
  },

  activeLabel: {
    color: '#2563EB',
    fontWeight: '800',
  },
});