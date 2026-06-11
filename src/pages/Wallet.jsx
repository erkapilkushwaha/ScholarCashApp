import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { supabase } from '../config/supabaseClient';

// Components
import PremiumBalanceCard from '../components/wallet_elements/PremiumBalanceCard';
import QuickActions from '../components/wallet_elements/QuickActions';
import WalletStatsOverview from '../components/wallet_elements/WalletStatsOverview';
import WalletServiceHub from '../components/wallet_elements/WalletServiceHub';
import WithdrawalPannel from '../components/wallet_elements/WithdrawalPannel';
import RecentActivityWidget from '../components/wallet_elements/RecentActivityWidget';
import WithdrawalProcessFlow from '../components/wallet_elements/WithdrawalProcessFlow';
import TrustSecuritySection from '../components/wallet_elements/TrustSecuritySection';
import TransactionLoading from '../components/wallet_elements/TransactionLoading';
import TransactionSuccess from '../components/wallet_elements/TransactionSuccess';

export default function Wallet({
  navigation,
  setHideBottomNav,
  openWithdrawPanel
}) {

  // ---------------- STATES ----------------
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [transactionStatus, setTransactionStatus] = useState('verified');
  const [withdrawnAmount, setWithdrawnAmount] = useState('0');

  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const scrollViewRef = useRef(null);
  const [panelY, setPanelY] = useState(0);

  // ---------------- OPEN PANEL FUNCTION ----------------
  const openWithdrawPanelFn = () => {
    setIsPanelVisible(true);

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (scrollViewRef.current && panelY !== 0) {
          scrollViewRef.current.scrollTo({
            y: panelY,
            animated: true,
          });
        }
      }, 250);
    });
  };

  // ---------------- HOME TRIGGER (IMPORTANT FIX) ----------------
  useEffect(() => {
    if (openWithdrawPanel) {
      openWithdrawPanelFn();
    }
  }, [openWithdrawPanel]);

  // ---------------- WALLET DATA FETCH ----------------
  useEffect(() => {
    async function fetchWalletLiveEngine() {
      try {
        setLoading(true);

        const { data: { user }, error } = await supabase.auth.getUser();

        const activeId =
          error || !user
            ? 'ee712d5e-eb59-4a60-a8fe-1d3d5bb38776'
            : user.id;

        const { data } = await supabase
          .from('profiles')
          .select('id, wallet_balance, total_earnings, total_withdrawal, pending_balance, full_name')
          .eq('id', activeId)
          .single();

        setProfileData(data || null);

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    fetchWalletLiveEngine();
  }, []);
  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  // ---------------- TRANSACTION LOADING ----------------
  if (transactionStatus === 'loading') {
    return (
      <TransactionLoading
        onAnimationComplete={() => setTransactionStatus('success')}
      />
    );
  }

  // ---------------- SUCCESS ----------------
  if (transactionStatus === 'success') {
    return (
      <TransactionSuccess
        amount={withdrawnAmount}
        verifiedName={profileData?.full_name}
        userId={profileData?.id}
        onGoBack={() => {
          setTransactionStatus('verified');
          setIsPanelVisible(false);
        }}
        navigation={navigation}
      />
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.mainScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bodyLayout}>

          <PremiumBalanceCard
            balance={Number(profileData?.wallet_balance || 0)}
            pending={Number(profileData?.pending_balance || 0)}
            earned={Number(profileData?.total_earnings || 0)}
            withdrawn={Number(profileData?.total_withdrawal || 0)}
          />

          <QuickActions
            onWithdraw={openWithdrawPanelFn}
            onHistory={() => navigation.navigate('History')}
          />

          {isPanelVisible && (
            <View
              onLayout={(e) => setPanelY(e.nativeEvent.layout.y)}
            >
              <WithdrawalPannel
                userId={profileData?.id}
                userName={profileData?.full_name}
                availableBalance={Number(profileData?.wallet_balance || 0)}
                setGlobalStatus={setTransactionStatus}
                setGlobalAmount={setWithdrawnAmount}
              />
            </View>
          )}

          <WalletStatsOverview />
          <WalletServiceHub />

          <RecentActivityWidget
            userId={profileData?.id}
            navigation={navigation}
          />

          <WithdrawalProcessFlow />
          <TrustSecuritySection />

        </View>
      </ScrollView>
    </View>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  mainScrollContainer: {
    flex: 1
  },
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyLayout: {
    padding: 20
  }
});