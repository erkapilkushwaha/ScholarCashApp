import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { supabase } from '../config/supabaseClient'; 

// 🌐 Global Centralized Routing Hub Import Kiya
import { navigationHub } from '../config/navigationHub';

// 🚀 Saare 7 child components
import HistoryHeader from '../components/history_elements/HistoryHeader';
import HistoryFilterPills from '../components/history_elements/HistoryFilterPills';
import HistorySearchBar from '../components/history_elements/HistorySearchBar';
import AllFeedsList from '../components/history_elements/AllFeedsList';
import WithdrawalFeedsList from '../components/history_elements/WithdrawalFeedsList';
import SurveyFeedsList from '../components/history_elements/SurveyFeedsList';
import OfferwallFeedsList from '../components/history_elements/OfferwallFeedsList';

export default function History() {
  const [dbTransactions, setDbTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🎯 FIX 1: Default state ko 'all' se badalkar 'global_all' kiya taaki landing par hamesha All Activities select rahe
  const [activeTab, setActiveTab] = useState('global_all');
  const [searchQuery, setSearchQuery] = useState('');

  // 🔌 FILTER RECEIVER REGISTRATION
  navigationHub.setHistoryTabPointer = setActiveTab;

  useEffect(() => {
    async function getTransactionLogs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setDbTransactions(data);

      } catch (err) {
        console.log("History Backend Engine Fetch Error: ", err.message);
      } finally {
        setLoading(false);
      }
    }

    getTransactionLogs();

    const historyChannel = supabase
      .channel('history-live-sync')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'transactions' }, 
        () => {
          getTransactionLogs(); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(historyChannel);
    };
  }, []);

  const filteredData = dbTransactions.filter((tx) => {
    const activityName = tx.activity?.toLowerCase() || '';
    const txStatus = tx.status?.toLowerCase() || '';
    const matchKeyword = searchQuery.toLowerCase();

    return activityName.includes(matchKeyword) || txStatus.includes(matchKeyword);
  });

  if (loading) {
    return (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={styles.loadingText}>Loading Activity Feed...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenWrapper}>
      
      {/* 👤 1. Header */}
      <HistoryHeader totalCount={filteredData.length} />

      {/* 💊 2. Filter Pills */}
      <HistoryFilterPills activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 🔍 3. Search Bar */}
      <HistorySearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* 📜 4. Dynamic Feed Component Lists */}
      <ScrollView style={styles.scrollCanvas} showsVerticalScrollIndicator={false}>
        <View style={styles.listBodyPad}>
          
          {/* 📑 Case 1: Default State (Poori mixed activities screen par map hongi) */}
          {activeTab === 'global_all' && (
            <AllFeedsList transactions={filteredData} />
          )}

          {/* 🏦 Case 2: Dropdown Option - All Transactions (Sirf len-den mix data) */}
          {activeTab === 'all' && (
            <WithdrawalFeedsList transactions={filteredData.filter(tx => tx.type === 'credit' || tx.type === 'debit')} />
          )}
          
          {/* 📈 Case 3: Dropdown Option - Credits (+₹ Wallet Money Logs) */}
          {activeTab === 'credits' && (
            <WithdrawalFeedsList transactions={filteredData.filter(tx => tx.type === 'credit')} />
          )}
          
          {/* 💸 Case 4: Dropdown Option - Withdrawals (-₹ Settlement Logs) */}
          {activeTab === 'withdrawals' && (
            <WithdrawalFeedsList transactions={filteredData.filter(tx => tx.type === 'debit')} />
          )}
          
          {/* 📝 Case 5: Pure Surveys submission tracking logs */}
          {activeTab === 'surveys' && (
            <SurveyFeedsList transactions={filteredData} />
          )}
          
          {/* 🎯 Case 6: Pure Offerwalls milestones logs */}
          {activeTab === 'offerwalls' && (
            <OfferwallFeedsList transactions={filteredData} />
          )}

        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  scrollCanvas: {
    flex: 1,
    backgroundColor: '#f8fafc', 
  },
  listBodyPad: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
