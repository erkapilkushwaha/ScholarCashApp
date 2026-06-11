import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const FILTERS = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: 'surveys',
    label: 'Surveys',
  },
  {
    key: 'earnings',
    label: 'Earnings',
  },
  {
    key: 'withdrawals',
    label: 'Withdrawals',
  },
  {
  key: 'offerwalls',
  label: 'Offerwalls'
}
];

export default function FilterChips({
  activeFilter,
  onFilterChange,
}) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTERS.map(filter => {
          const isActive =
            activeFilter === filter.key;

          return (
            <TouchableOpacity
              key={filter.key}
              activeOpacity={0.85}
              style={[
                styles.chip,
                isActive && styles.activeChip,
              ]}
              onPress={() =>
                onFilterChange(filter.key)
              }
            >
              <Text
                style={[
                  styles.chipText,
                  isActive &&
                    styles.activeChipText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  chip: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  activeChip: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },

  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },

  activeChipText: {
    color: '#ffffff',
  },
});