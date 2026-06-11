import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { supabase } from '../../config/supabaseClient';

export default function RecentActivityWidget({ userId, navigation }) {

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivities();
  }, [userId]);

  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 60000);

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

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

      const earningItems = (earnings || []).map(item => ({
        id: `e-${item.id}`,
        title: item.title,
        amount: item.amount,
        type: 'credit',
        status: 'Completed',
        created_at: item.created_at,
      }));

      const withdrawalItems = (withdrawals || []).map(item => ({
        id: `w-${item.id}`,
        title: 'Withdrawal Request',
        amount: item.amount,
        type: 'debit',
        status: item.status || 'Pending',
        created_at: item.created_at,
      }));

      const merged = [...earningItems, ...withdrawalItems];

      merged.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setActivities(merged.slice(0, 5));

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Recent Activity</Text>

        <TouchableOpacity
          onPress={() => navigation?.navigate('History')}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activities.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No transactions yet</Text>
          <Text style={styles.emptySub}>
            Your earnings and withdrawals will appear here
          </Text>
        </View>
      ) : (
        activities.map(item => (
          <View key={item.id} style={styles.card}>

            {/* Icon */}
            <View style={[
              styles.iconBox,
              item.type === 'credit'
                ? styles.creditBg
                : styles.debitBg
            ]}>
              <Text style={styles.icon}>
                {item.type === 'credit' ? '↓' : '↑'}
              </Text>
            </View>

            {/* Middle */}
            <View style={styles.middle}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.time}>
                  {timeAgo(item.created_at)}
                </Text>

                <View style={[
                  styles.badge,
                  item.status === 'Completed'
                    ? styles.badgeSuccess
                    : styles.badgePending
                ]}>
                  <Text style={styles.badgeText}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* Amount */}
            <Text style={[
              styles.amount,
              item.type === 'credit'
                ? styles.credit
                : styles.debit
            ]}>
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
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },

  loader: {
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },

  heading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },

  viewAll: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563eb',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  creditBg: {
    backgroundColor: '#ecfdf5',
  },

  debitBg: {
    backgroundColor: '#fef2f2',
  },

  icon: {
    fontSize: 16,
    fontWeight: '900',
  },

  middle: {
    flex: 1,
  },

  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  time: {
    fontSize: 11,
    color: '#94a3b8',
    marginRight: 8,
  },

  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  badgeSuccess: {
    backgroundColor: '#dcfce7',
  },

  badgePending: {
    backgroundColor: '#fef3c7',
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
  },

  amount: {
    fontSize: 13,
    fontWeight: '900',
  },

  credit: {
    color: '#10b981',
  },

  debit: {
    color: '#ef4444',
  },

  emptyBox: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
  },

  emptySub: {
    fontSize: 11,
    color: '#cbd5e1',
    marginTop: 4,
    textAlign: 'center',
  },
});