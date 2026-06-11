import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabaseClient';

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

// Notification type → icon + color
const TYPE_CONFIG = {
  reward:     { icon: 'cash-outline',           color: '#16a34a', bg: '#f0fdf4' },
  survey:     { icon: 'document-text-outline',  color: '#1a73e8', bg: '#eff6ff' },
  withdrawal: { icon: 'wallet-outline',         color: '#f59e0b', bg: '#fffbeb' },
  system:     { icon: 'information-circle-outline', color: '#64748b', bg: '#f8fafc' },
  referral:   { icon: 'people-outline',         color: '#8b5cf6', bg: '#f5f3ff' },
  offerwall:  { icon: 'flash-outline',          color: '#ec4899', bg: '#fdf2f8' },
};

const getTypeConfig = (type) =>
  TYPE_CONFIG[type] || TYPE_CONFIG['system'];

// Time ago formatter
const timeAgo = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

// ─────────────────────────────────────────
// SUB COMPONENTS
// ─────────────────────────────────────────

function NotificationHeader({ unreadCount, onBack, onMarkAll }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color="#0f172a" />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{unreadCount} new</Text>
          </View>
        )}
      </View>

      {unreadCount > 0 ? (
        <TouchableOpacity onPress={onMarkAll} style={styles.markAllBtn}>
          <Text style={styles.markAllText}>Mark All Read</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 80 }} />
      )}
    </View>
  );
}

function NotificationCard({ item, onPress }) {
  const config = getTypeConfig(item.type);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.card,
        !item.is_read && styles.cardUnread,
      ]}
      onPress={() => onPress(item)}
    >
      {/* Icon */}
      <View style={[styles.iconWrap, { backgroundColor: config.bg }]}>
        <Ionicons name={config.icon} size={20} color={config.color} />
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardTime}>{timeAgo(item.created_at)}</Text>
        </View>

        <Text style={styles.cardMessage} numberOfLines={2}>
          {item.message}
        </Text>
      </View>

      {/* Unread dot */}
      {!item.is_read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="notifications-off-outline" size={44} color="#94a3b8" />
      </View>
      <Text style={styles.emptyTitle}>No Notifications Yet</Text>
      <Text style={styles.emptySubtitle}>
        We'll notify you about rewards, surveys, and important updates here.
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) { setLoading(false); return; }

      const uid = authData.user.id;
      setUserId(uid);

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false });

      setNotifications(data || []);
    } catch (err) {
      console.log('Notifications load error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mark single notification as read
  const markAsRead = async (item) => {
    if (item.is_read) return;

    // Optimistic UI update
    setNotifications(prev =>
      prev.map(n => n.id === item.id ? { ...n, is_read: true } : n)
    );

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', item.id);
  };

  // Mark all as read
  const markAllAsRead = async () => {
    if (!userId) return;

    // Optimistic UI update
    setNotifications(prev =>
      prev.map(n => ({ ...n, is_read: true }))
    );

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <NotificationHeader
        unreadCount={unreadCount}
        onBack={() => navigation.goBack()}
        onMarkAll={markAllAsRead}
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => String(item.id)}

        renderItem={({ item }) => (
          <NotificationCard
            item={item}
            onPress={markAsRead}
          />
        )}

        ListEmptyComponent={<EmptyState />}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.listContent}

        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />

    </SafeAreaView>
  );
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  headerBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  headerBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },

  markAllBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#eff6ff',
    borderRadius: 10,
  },

  markAllText: {
    color: '#1a73e8',
    fontSize: 12,
    fontWeight: '700',
  },

  // List
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },

  separator: {
    height: 8,
  },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  cardUnread: {
    backgroundColor: '#fafcff',
    borderColor: '#bfdbfe',
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },

  cardContent: {
    flex: 1,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    flex: 1,
    paddingRight: 8,
  },

  cardTime: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    flexShrink: 0,
  },

  cardMessage: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 19,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1a73e8',
    marginLeft: 8,
    marginTop: 4,
    flexShrink: 0,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },

  emptyIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
  },

  emptySubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});
