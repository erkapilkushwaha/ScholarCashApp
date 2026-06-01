import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function EarningsBreakdownCard({
  surveyTotal = 0,
  referralTotal = 0,
  bonusTotal = 0,
}) {

  const breakdownData = [
    {
      icon: '📋',
      title: 'Survey Earnings',
      amount: surveyTotal,
      color: '#2563eb',
    },
    {
      icon: '👥',
      title: 'Referral Earnings',
      amount: referralTotal,
      color: '#16a34a',
    },
    {
      icon: '🎁',
      title: 'Bonus Earnings',
      amount: bonusTotal,
      color: '#d97706',
    },
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>
        Earnings Breakdown
      </Text>

      {breakdownData.map((item, index) => (
        <View
          key={index}
          style={styles.row}
        >

          <View style={styles.leftArea}>
            <Text style={styles.icon}>
              {item.icon}
            </Text>

            <Text style={styles.title}>
              {item.title}
            </Text>
          </View>

          <Text
            style={[
              styles.amount,
              { color: item.color }
            ]}
          >
            ₹{Number(item.amount).toFixed(2)}
          </Text>

        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginTop: 16,

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

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  leftArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 20,
    marginRight: 10,
  },

  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },

  amount: {
    fontSize: 14,
    fontWeight: '800',
  },

});