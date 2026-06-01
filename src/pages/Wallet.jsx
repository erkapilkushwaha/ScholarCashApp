import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { supabase } from '../config/supabaseClient'; 
import { navigationHub } from '../config/navigationHub';
import UltimateBalanceCard from '../components/wallet_elements/UltimateBalanceCard';
import LedgerHistoryList from '../components/wallet_elements/LedgerHistoryList';
import WithdrawalAmount from '../components/wallet_elements/WithdrawalAmount';
import TransactionLoading from '../components/wallet_elements/TransactionLoading';
import TransactionSuccess from '../components/wallet_elements/TransactionSuccess';

export default function Wallet({ navigation }) { // navigation prop add kiya
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const [transactionStatus, setTransactionStatus] = useState('verified'); 
  const [verifiedName, setVerifiedName] = useState('User'); 
  const [verifiedUpi, setVerifiedUpi] = useState('user@upi'); 
  const [currentWithdrawAmount, setCurrentWithdrawAmount] = useState('');

  const [walletSubSection, setWalletSubSection] = useState('default');
  navigationHub.setWalletTabPointer = setWalletSubSection;

  useEffect(() => {
    async function fetchWalletLiveEngine() {
      try {
        setLoading(true);
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        const activeId = (authError || !user) ? "ee712d5e-eb59-4a60-a8fe-1d3d5bb38776" : user.id;
        setUserId(activeId);
        await loadProfileMetrics(activeId);
      } catch (err) {
        console.log("Wallet Engine Error: ", err.message);
      } finally {
        setLoading(false);
      }
    }

    async function loadProfileMetrics(activeId) {
      const { data: profileArray, error: profileErr } = await supabase
        .from('profiles')
        .select('wallet_balance, total_earnings, total_withdrawal, pending_balance, today_earnings, full_name')
        .eq('id', activeId);

      if (profileErr) {
        console.log("Supabase Error:", profileErr);
        throw profileErr;
      }
      
      if (profileArray && profileArray.length > 0) {
        const data = profileArray[0];
        console.log("Fetched Profile Data:", data);
        setProfileData(data); 
        setVerifiedName(data.full_name || 'User');
      }
    }

    fetchWalletLiveEngine();

    const walletChannel = supabase
      .channel('restore-wallet-channel')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'profiles' }, 
        (payload) => {
          console.log("Real-time update:", payload.new);
          if (payload.new && payload.new.id === userId) {
            setProfileData(payload.new);
            setVerifiedName(payload.new.full_name || 'User');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(walletChannel);
    };
  }, [userId]);

  const resetTransactionFlow = () => {
    setTransactionStatus('verified');
    setCurrentWithdrawAmount('');
  };

  if (loading) {
    return (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={styles.loadingText}>Restoring Wallet Matrix...</Text>
      </View>
    );
  }

  console.log("Rendering Wallet, current name:", verifiedName);

  if (transactionStatus === 'loading') {
    return <TransactionLoading onAnimationComplete={() => setTransactionStatus('success')} />;
  }

  if (transactionStatus === 'success') {
    return (
      <TransactionSuccess 
        navigation={navigation} // navigation prop pass kiya
        amount={currentWithdrawAmount} 
        verifiedName={verifiedName} 
        userId={userId}
        onGoBack={resetTransactionFlow}
      />
    );
  }

  return (
    <View style={styles.screenWrapper}>
      <ScrollView style={styles.mainScrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerPad}>
          <Text style={styles.pageTitle}>My Wealth Wallet</Text>
          <Text style={styles.pageSubtitle}>Manage your survey rewards and payouts instantly</Text>
        </View>

        <View style={styles.bodyLayout}>
          <UltimateBalanceCard 
            balance={parseFloat(profileData?.wallet_balance ?? 0)}
            pending={parseFloat(profileData?.pending_balance ?? 0)}
            earned={parseFloat(profileData?.total_earnings ?? 0)}
            withdrawal={parseFloat(profileData?.total_withdrawal ?? 0)}
          />

          {transactionStatus === 'verified' && userId && verifiedName !== 'User' && (
            <WithdrawalAmount 
              userId={userId}
              userName={verifiedName} 
              verifiedUpi={verifiedUpi}
              setGlobalStatus={setTransactionStatus} 
              setGlobalAmount={setCurrentWithdrawAmount} 
            />
          )}

          <LedgerHistoryList />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, backgroundColor: '#f8fafc' },
  mainScrollContainer: { flex: 1 },
  centerLoader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  loadingText: { fontSize: 12, fontWeight: '700', color: '#64748b', marginTop: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  headerPad: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 4 },
  pageTitle: { fontSize: 22, fontWeight: '800', color: '#1f2937' },
  pageSubtitle: { fontSize: 11.5, color: '#64748b', marginTop: 2, fontWeight: '500' },
  bodyLayout: { paddingHorizontal: 20, marginTop: 6 },
});
