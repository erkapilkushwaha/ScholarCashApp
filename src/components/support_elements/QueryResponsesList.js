import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabaseClient';


// 🎴 Individual Ticket Card Component
const TicketCard = ({ item }) => {
  const [queryExpanded, setQueryExpanded] = useState(false);
  const [replyExpanded, setReplyExpanded] = useState(false);

  // 📝 Text ko 5 lines tak restrict karne ka logic
  const renderExpandableText = (text, isExpanded, setExpanded) => {
    const lines = text.split('\n');
    const isLongText = text.length > 150 || lines.length > 5;

    if (!isLongText) return <Text style={styles.bodyText}>{text}</Text>;

    return (
      <View>
        <Text style={styles.bodyText} numberOfLines={isExpanded ? undefined : 5}>
          {text}
        </Text>
        <TouchableOpacity onPress={() => setExpanded(!isExpanded)} style={styles.readMoreBtn}>
          <Text style={styles.readMoreText}>{isExpanded ? 'Read Less 🔼' : 'Read More 🔽'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const isResolved = item.status === 'Resolved';

  return (
    <View style={styles.card}>
      {/* 🔝 Top Header Info */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setQueryExpanded(!queryExpanded)}>
            <Ionicons 
              name={queryExpanded ? "chevron-down-circle" : "chevron-forward-circle"} 
              size={20} 
              color="#008080" 
              style={{ marginRight: 6 }}
            />
          </TouchableOpacity>
          <Text style={styles.issueType}>{item.issue_type}</Text>
        </View>
        <View style={[styles.statusBadge, isResolved ? styles.badgeResolved : styles.badgePending]}>
          <Text style={[styles.statusText, isResolved ? styles.textResolved : styles.textPending]}>
            {item.status} {isResolved ? '🟢' : '🟡'}
          </Text>
        </View>
      </View>

      {/* 📝 User Query Container */}
      <View style={styles.queryContainer}>
        {renderExpandableText(item.description, queryExpanded, setQueryExpanded)}
      </View>

      {/* 💬 Support Team Reply Container */}
      {isResolved && item.admin_reply && (
        <View style={styles.replyContainer}>
          <View style={styles.replyHeader}>
            <TouchableOpacity onPress={() => setReplyExpanded(!replyExpanded)}>
              <Ionicons 
                name={replyExpanded ? "chevron-down" : "chevron-forward"} 
                size={18} 
                color="#555" 
                style={{ marginRight: 4 }}
              />
            </TouchableOpacity>
            <Text style={styles.replyTitle}>💬 Support Team Reply:</Text>
          </View>
          {renderExpandableText(item.admin_reply, replyExpanded, setReplyExpanded)}
        </View>
      )}

      {/* 📅 Bottom Info Strip */}
      <View style={styles.timeStrip}>
        <Ionicons name="calendar-outline" size={14} color="#888" style={{ marginRight: 4 }} />
        <Text style={styles.timeText}>
          {new Date(item.created_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </Text>
      </View>
    </View>
  );
};

// 📋 Main List Component
const QueryResponsesList = ({ refreshTrigger }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserTickets();
  }, [refreshTrigger]);

  const fetchUserTickets = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Latest response wale tickets ko sabse upar dikhane ke liye status aur date se order kiya hai
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('status', { ascending: false }) // 'Resolved' upar aayega
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#008080" style={{ marginVertical: 20 }} />;

  if (tickets.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No query responses found. 🎫</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tickets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TicketCard item={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: { padding: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eef2f2',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  issueType: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgePending: { backgroundColor: '#fff9e6' },
  badgeResolved: { backgroundColor: '#e6f7ed' },
  statusText: { fontSize: 12, fontWeight: '600' },
  textPending: { color: '#b38600' },
  textResolved: { color: '#008037' },
  queryContainer: { marginBottom: 10 },
  bodyText: { fontSize: 14, color: '#444', lineHeight: 20 },
  readMoreBtn: { marginTop: 4, alignSelf: 'flex-start' },
  readMoreText: { fontSize: 12, color: '#008080', fontWeight: '600' },
  replyContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#008080',
  },
  replyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  replyTitle: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  timeStrip: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  timeText: { fontSize: 11, color: '#888' },
  emptyContainer: { alignItems: 'center', padding: 30 },
  emptyText: { color: '#666', fontSize: 14 },
});

export default QueryResponsesList;
