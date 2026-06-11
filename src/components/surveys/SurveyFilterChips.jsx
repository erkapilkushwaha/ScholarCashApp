import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const FILTERS = [
  'All',
  'Highest Reward',
  'Quick Surveys',
  'Best Match',
  'Highest Rating',
  'Newest',
];

export default function SurveyFilterChips({
  activeFilter = 'All',
  onFilterChange,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map(filter => {
        const active =
          activeFilter === filter;

        return (
          <TouchableOpacity
            key={filter}
            activeOpacity={0.85}
            style={[
              styles.chip,
              active && styles.activeChip,
            ]}
            onPress={() =>
              onFilterChange?.(filter)
            }
          >
            <Text
              style={[
                styles.chipText,
                active &&
                  styles.activeChipText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  chip: {
    height: 38,

    paddingHorizontal: 16,

    borderRadius: 999,

    backgroundColor: '#f8fafc',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,

    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  activeChip: {
    backgroundColor: '#1a73e8',
    borderColor: '#1a73e8',
  },

  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },

  activeChipText: {
    color: '#ffffff',
  },
});