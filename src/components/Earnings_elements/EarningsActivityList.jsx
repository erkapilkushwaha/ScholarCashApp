import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function EarningsActivityList({
  earnings = [],
}) {

  const getIcon = (type) => {
    switch (type) {
      case 'survey':
        return '📋';

      case 'referral':
        return '👥';

      case 'bonus':
        return '🎁';

      default:
        return '💰';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString(
      'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.activityCard}>

      <View style={styles.leftSection}>

        <View style={styles.iconBox}>
          <Text style={styles.icon}>
            {getIcon(item.reward_type)}
          </Text>
        </View>

        <View style={styles.infoBox}>

          <Text style={styles.title}>
            {item.description ||
              'Reward Credited'}
          </Text>

          <Text style={styles.date}>
            {formatDate(item.created_at)}
          </Text>

        </View>

      </View>

      <Text style={styles.amount}>
        +₹{Number(item.amount).toFixed(2)}
      </Text>

    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>
        Recent Earnings
      </Text>

      <FlatList
        data={earnings}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
        scrollEnabled={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },

  activityCard: {
    backgroundColor: '#ffffff',

    borderRadius: 16,

    padding: 14,

    marginBottom: 10,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    borderWidth: 1,

    borderColor: '#e2e8f0',

    shadowColor: '#0f172a',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.04,

    shadowRadius: 4,

    elevation: 2,
  },

  leftSection: {
    flexDirection: 'row',
    flex: 1,
  },

  iconBox: {
    width: 42,

    height: 42,

    borderRadius: 12,

    backgroundColor: '#f8fafc',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  icon: {
    fontSize: 20,
  },

  infoBox: {
    flex: 1,
  },

  title: {
    fontSize: 13,

    fontWeight: '700',

    color: '#0f172a',
  },

  date: {
    fontSize: 11,

    color: '#64748b',

    marginTop: 3,
  },

  amount: {
    fontSize: 15,

    fontWeight: '800',

    color: '#16a34a',
  },

});