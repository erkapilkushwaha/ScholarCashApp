import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ActivityCard from './ActivityCard';

function getDateLabel(dateString) {
  const date = new Date(dateString);

  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const dateOnly =
    date.toDateString();

  if (
    dateOnly ===
    today.toDateString()
  ) {
    return 'TODAY';
  }

  if (
    dateOnly ===
    yesterday.toDateString()
  ) {
    return 'YESTERDAY';
  }

  return date.toLocaleDateString(
    'en-IN',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  ).toUpperCase();
}

export default function ActivityTimeline({
  activities = [],
}) {
  const groupedActivities =
    activities.reduce(
      (acc, item) => {
        const label =
          getDateLabel(
            item.created_at
          );

        if (!acc[label]) {
          acc[label] = [];
        }

        acc[label].push(item);

        return acc;
      },
      {}
    );

  return (
    <View style={styles.container}>
      {Object.keys(
        groupedActivities
      ).map(dateGroup => (
        <View
          key={dateGroup}
          style={styles.section}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            {dateGroup}
          </Text>

          {groupedActivities[
            dateGroup
          ].map(item => (
            <ActivityCard
              key={`${item.type}-${item.id}`}
              type={item.type}
              title={item.title}
              subtitle={
                item.subtitle
              }
              amount={
                item.amount
              }
              status={
                item.status
              }
              createdAt={
                item.created_at
              }
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },

    section: {
      marginBottom: 18,
    },

    sectionTitle: {
      fontSize: 12,
      fontWeight: '800',
      color: '#64748b',
      letterSpacing: 1,

      marginBottom: 12,

      textTransform:
        'uppercase',
    },
  });