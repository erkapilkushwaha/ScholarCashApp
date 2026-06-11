import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import SurveyCard from '../home_v2/SurveyCard';

export default function SurveyList({
  surveys = [],
  onSurveyPress,
  refreshing = false,
  onRefresh,
}) {

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>

      <Text style={styles.emptyEmoji}>
        📭
      </Text>

      <Text style={styles.emptyTitle}>
        No Surveys Found
      </Text>

      <Text style={styles.emptySubtitle}>
        Try changing filters or check again later.
      </Text>

    </View>
  );

  return (
      renderItem={({ item }) => (
        <SurveyCard
          survey={item}
          onPress={onSurveyPress}
        />
      )}

      ListEmptyComponent={renderEmpty}

      contentContainerStyle={[
        styles.listContainer,
        surveys.length === 0 && {
          flex: 1,
        },
      ]}

      showsVerticalScrollIndicator={false}

      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 120,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 30,
    paddingTop: 80,
  },

  emptyEmoji: {
    fontSize: 50,
  },

  emptyTitle: {
    marginTop: 16,

    fontSize: 18,
    fontWeight: '800',

    color: '#0f172a',
  },

  emptySubtitle: {
    marginTop: 8,

    fontSize: 13,
    textAlign: 'center',

    color: '#64748b',
    lineHeight: 20,
  },
});