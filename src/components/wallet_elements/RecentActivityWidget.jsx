import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { supabase } from '../../config/supabaseClient';

export default function RecentActivityWidget({ userId }) {

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivities();
  }, [userId]);

  async function loadRecentActivities() {
    try {

      const { data: earnings } = await supabase
        .from('earnings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: withdrawals } = await supabase
        .from('withdrawals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      const earningItems =
        (earnings || []).map(item => ({
          id: item.id,
          title: item.title,
          amount: item.amount,
          type: 'credit',
          created_at: item.created_at,
        }));

      const withdrawalItems =
        (withdrawals || []).map(item => ({
          id: item.id,
          title: 'Withdrawal Request',
          amount: item.amount,
          type: 'debit',
          created_at: item.created_at,
        }));

      const merged = [
        ...earningItems,
        ...withdrawalItems,
      ];

      merged.sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      );

      setActivities(
        merged.slice(0, 5)
      );

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <ActivityIndicator
        size="small"
        color="#1a73e8"
      />
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Recent Activity
      </Text>

      {activities.length === 0 ? (
        <Text style={styles.emptyText}>
          No activity found
        </Text>
      ) : (
        activities.map(item => (
          <View
            key={item.id}
            style={styles.row}
          >

            <View style={styles.left}>

              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.date}>
                {new Date(
                  item.created_at
                ).toLocaleDateString()}
              </Text>

            </View>

            <Text
              style={[
                styles.amount,
                item.type === 'credit'
                  ? styles.credit
                  : styles.debit,
              ]}
            >
              {item.type === 'credit'
                ? `+₹${item.amount}`
                : `-₹${item.amount}`}
            </Text>

          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  heading: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  left: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },

  date: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },

  amount: {
    fontSize: 14,
    fontWeight: '800',
  },

  credit: {
    color: '#10b981',
  },

  debit: {
    color: '#ef4444',
  },

  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    paddingVertical: 10,
  },

});