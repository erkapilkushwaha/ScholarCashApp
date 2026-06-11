import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function SurveyResultsInfo({
  total = 0,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        Showing {total} Surveys
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  text: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '700',
  },
});