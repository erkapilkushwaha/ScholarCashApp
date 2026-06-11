import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SurveySearchHeader({
  totalCount = 0,
  searchQuery = '',
  onSearchChange,
  onBack,
  onFilterPress,
}) {
  return (
    <View style={styles.wrapper}>

      {/* Top Bar */}
      <View style={styles.topRow}>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={onBack}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#0f172a"
          />
        </TouchableOpacity>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            All Surveys
          </Text>

          <Text style={styles.subtitle}>
            {totalCount} surveys available
          </Text>
        </View>

      </View>

      {/* Search */}
      <View style={styles.searchRow}>

        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={18}
            color="#94a3b8"
          />

          <TextInput
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search surveys..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={onFilterPress}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color="#1a73e8"
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 14,

    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBtn: {
    width: 42,
    height: 42,

    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#f8fafc',
  },

  titleWrap: {
    marginLeft: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    marginTop: 2,

    fontSize: 12,
    fontWeight: '600',

    color: '#64748b',
  },

  searchRow: {
    flexDirection: 'row',
    marginTop: 16,
  },

  searchBox: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#f8fafc',

    borderRadius: 16,

    paddingHorizontal: 14,

    height: 52,

    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  input: {
    flex: 1,
    marginLeft: 8,

    fontSize: 14,
    color: '#0f172a',
  },

  filterBtn: {
    width: 52,
    height: 52,

    marginLeft: 10,

    borderRadius: 16,

    backgroundColor: '#eff6ff',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
});