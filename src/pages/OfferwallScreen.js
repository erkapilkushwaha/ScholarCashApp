import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabaseClient';
import UniversalDetailsSheet from '../components/common/UniversalDetailsSheet';

// ─────────────────────────────────────────
// MODULAR SUB-COMPONENTS
// ─────────────────────────────────────────

// 1. Header with back button + title
function OfferwallHeader({ onBack }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color="#0f172a" />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>Offerwalls</Text>
        <Text style={styles.headerSub}>Complete tasks & earn rewards</Text>
      </View>
    </View>
  );
}

// 2. Hero stats card at top
function OfferwallHeroCard({ total }) {
  return (
    <View style={styles.heroCard}>
      <View style={styles.heroLeft}>
        <Text style={styles.heroEmoji}>⚡</Text>
        <View>
          <Text style={styles.heroTitle}>
            {total} Offerwalls Available
          </Text>
          <Text style={styles.heroSub}>
            Install apps, complete tasks & earn big
          </Text>
        </View>
      </View>
    </View>
  );
}

// 3. Filter chips
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'highest_reward', label: '💰 Highest Reward' },
  { key: 'most_tasks', label: '📋 Most Tasks' },
];

function OfferwallFilterChips({ selected, onSelect }) {
  return (
    <View style={styles.chipsRow}>
      {FILTERS.map(f => (
        <TouchableOpacity
          key={f.key}
          onPress={() => onSelect(f.key)}
          style={[
            styles.chip,
            selected === f.key && styles.chipActive,
          ]}
        >
          <Text
            style={[
              styles.chipText,
              selected === f.key && styles.chipTextActive,
            ]}
          >
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// 4. Search bar
function OfferwallSearchBar({ value, onChangeText }) {
  return (
    <View style={styles.searchWrap}>
      <Ionicons name="search" size={16} color="#94a3b8" />
      <View style={styles.searchInput}>
        <Text
          style={[
            styles.searchPlaceholder,
            value ? { color: '#0f172a' } : {},
          ]}
          onPress={() => {}}
        />
      </View>
      {/* Using TextInput properly */}
      <TextInputWrapper value={value} onChangeText={onChangeText} />
    </View>
  );
}

import { TextInput } from 'react-native';

function TextInputWrapper({ value, onChangeText }) {
  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      placeholder="Search offerwalls..."
      placeholderTextColor="#94a3b8"
    />
  );
}

// 5. Results info bar
function OfferwallResultsInfo({ count }) {
  return (
    <Text style={styles.resultsText}>
      Showing {count} offerwall{count !== 1 ? 's' : ''}
    </Text>
  );
}

// 6. Single offerwall card
function OfferwallCard({ item, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress?.(item)}
    >
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="flash" size={22} color="#1a73e8" />
        </View>

        <View style={styles.rewardWrap}>
          <Text style={styles.rewardLabel}>Up To</Text>
          <Text style={styles.rewardValue}>
            ₹{item.max_reward || item.user_reward || 0}
          </Text>
        </View>
      </View>

      {/* Provider Name */}
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.name}
      </Text>

      {/* Description */}
      {!!item.description && (
        <Text style={styles.cardDesc} numberOfLines={2}>
          {item.description}
        </Text>
      )}

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
          <Text style={styles.statText}>Live</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="trending-up" size={14} color="#1a73e8" />
          <Text style={styles.statText}>
            ₹{item.min_reward || 0} - ₹{item.max_reward || 0}
          </Text>
        </View>

        {!!item.total_tasks && (
          <View style={styles.statItem}>
            <Ionicons name="list" size={14} color="#f59e0b" />
            <Text style={styles.statText}>
              {item.total_tasks} Tasks
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.footerLabel}>Max Reward</Text>
          <Text style={styles.footerReward}>
            ₹{item.max_reward || item.user_reward || 0}
          </Text>
        </View>

        <View style={styles.startButton}>
          <Text style={styles.startText}>Start Task</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

// 7. Empty state
function OfferwallEmptyState() {
  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyEmoji}>📭</Text>
      <Text style={styles.emptyTitle}>No Offerwalls Available</Text>
      <Text style={styles.emptySubtitle}>
        New offerwalls will appear here automatically.
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────

export default function OfferwallScreen({
  navigation,
  openWebView,
}) {
  const [offerwalls, setOfferwalls] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    loadOfferwalls();
  }, []);

  const loadOfferwalls = async () => {
    setLoading(true);

    const { data } = await supabase
      .from('offerwall_providers')
      .select('*')
      .eq('status', 'active')
      .order('sort_order', { ascending: true });

    setOfferwalls(data || []);
    setLoading(false);
  };

  // Filter + Search logic
  const filteredOfferwalls = useMemo(() => {
    let data = [...offerwalls];

    if (search.trim()) {
      data = data.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (filter) {
      case 'highest_reward':
        data.sort((a, b) =>
          (b.max_reward || b.user_reward || 0) -
          (a.max_reward || a.user_reward || 0)
        );
        break;

      case 'most_tasks':
        data.sort((a, b) =>
          (b.total_tasks || 0) - (a.total_tasks || 0)
        );
        break;
    }

    return data;
  }, [offerwalls, search, filter]);

  const openOfferwall = (item) => {
    setSelectedItem(item);
    setDetailsVisible(true);
  };

  // Full tracking logic — same pattern as Home.js & SurveyScreen.js
  const handleContinue = async () => {
    setDetailsVisible(false);

    if (!selectedItem) return;

    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) return;

      const userId = authData.user.id;

      // Insert into offerwall_history
      const { data: offerRecord, error: offerError } =
        await supabase
          .from('offerwall_history')
          .insert([{
            user_id: userId,
            provider_code: selectedItem.provider_code,
            task_name: selectedItem.name,
            reward: selectedItem.user_amount || 0,
            provider_amount: selectedItem.provider_amount || 0,
            user_amount: selectedItem.user_amount || 0,
            platform_commission: selectedItem.platform_commission || 0,
            status: 'started',
            started_at: new Date().toISOString(),
            reward_credited: false,
          }])
          .select()
          .single();

      if (offerError) {
        console.log('Offerwall history insert error:', offerError.message);
      }

      // Insert into wallet_transactions
      if (offerRecord) {
        const { error: txError } = await supabase
          .from('wallet_transactions')
          .insert([{
            user_id: userId,
            transaction_type: 'offerwall_started',
            amount: selectedItem.user_amount || 0,
            status: 'started',
            reference_id: offerRecord.id,
            provider_name: selectedItem.provider_code,
            description: `Offerwall Started - ${selectedItem.name}`,
            is_credit: false,
          }]);

        if (txError) {
          console.log('Wallet transaction insert error:', txError.message);
        }
      }
    } catch (err) {
      console.log('Offerwall tracking error:', err.message);
    }

    // Open WebView regardless of tracking result
    openWebView(
      selectedItem?.offer_url,
      selectedItem?.name
    );
  };

  // Loading UI
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={filteredOfferwalls}
        keyExtractor={(item) => String(item.id)}

        ListHeaderComponent={
          <>
            <OfferwallHeader
              onBack={() => navigation.goBack()}
            />

            <OfferwallHeroCard
              total={offerwalls.length}
            />

            {/* Search */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={16} color="#94a3b8" style={styles.searchIcon} />
              <TextInput
                style={styles.textInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Search offerwalls..."
                placeholderTextColor="#94a3b8"
              />
            </View>

            <OfferwallFilterChips
              selected={filter}
              onSelect={setFilter}
            />

            <OfferwallResultsInfo
              count={filteredOfferwalls.length}
            />
          </>
        }

        renderItem={({ item }) => (
          <OfferwallCard
            item={item}
            onPress={openOfferwall}
          />
        )}

        ListEmptyComponent={<OfferwallEmptyState />}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
        }}
      />

      <UniversalDetailsSheet
        visible={detailsVisible}
        data={selectedItem}
        type="offerwall"
        showContinueButton
        onClose={() => setDetailsVisible(false)}
        onContinue={handleContinue}
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
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },

  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },

  headerSub: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },

  // Hero Card
  heroCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },

  heroLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  heroEmoji: {
    fontSize: 32,
  },

  heroTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },

  heroSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '600',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 14,
  },

  searchIcon: {
    marginRight: 8,
  },

  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },

  // Filter Chips
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  chipActive: {
    backgroundColor: '#1a73e8',
    borderColor: '#1a73e8',
  },

  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },

  chipTextActive: {
    color: '#fff',
  },

  // Results info
  resultsText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 14,
  },

  // Offerwall Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rewardWrap: {
    alignItems: 'flex-end',
  },

  rewardLabel: {
    fontSize: 11,
    color: '#64748b',
  },

  rewardValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#16a34a',
  },

  cardTitle: {
    marginTop: 14,
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },

  cardDesc: {
    marginTop: 8,
    color: '#64748b',
    fontSize: 13,
    lineHeight: 19,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  statText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },

  footerLabel: {
    fontSize: 11,
    color: '#64748b',
  },

  footerReward: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },

  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1a73e8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },

  startText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },

  // Empty state
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 20,
  },

  emptyEmoji: {
    fontSize: 32,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },

  emptySubtitle: {
    marginTop: 6,
    textAlign: 'center',
    color: '#64748b',
    fontSize: 12,
    lineHeight: 18,
  },
});
