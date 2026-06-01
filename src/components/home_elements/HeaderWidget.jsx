import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { supabase } from '../../config/supabaseClient';

// 🌐 Centralized Global Postman ko import kiya
import { navigationHub } from '../../config/navigationHub';

export default function HeaderWidget() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeaderDataFromDb() {
      try {
        setLoading(true);

        // 1. 🔑 Current authenticated user ka session nikalte hain
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;

        // 🎯 Fix: Agar user logged in nahi hai (session missing), toh aage mat badho aur yahin se return ho jao
        if (!user) {
          setLoading(false);
          return;
        }

        // 2. 🔍 Valid User ID milne par hi profiles table se data fetch karenge
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, wallet_balance')
          .eq('id', user.id) 
          .single();

        if (error) throw error;
        if (data) setProfile(data);
        
      } catch (err) {
        console.error("Header Data Fetch Error: ", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHeaderDataFromDb();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerLoader}>
        <ActivityIndicator size="small" color="#1a73e8" />
      </View>
    );
  }

  // 🛡️ Safe fallback operator agar profile load na hui ho
  const fullName = profile?.full_name || "Scholar Student";
  const walletBalance = parseFloat(profile?.wallet_balance || 0.00);

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.headerMainContainer}>
        
        <View style={styles.userSection}>
          <Text style={styles.greetingText}>Welcome Back,</Text>
          <Text style={styles.userNameText} numberOfLines={1}>{fullName}</Text>
        </View>

        {/* 🚀 Click hote hi Central Hub direct Wallet page par land karwayega */}
        <TouchableOpacity 
          style={styles.walletCardButton}
          activeOpacity={0.7}
          onPress={() => navigationHub.redirect('wallet')}
        >
          <Text style={styles.walletIcon}>🪙</Text>
          <View style={styles.walletDetails}>
            <Text style={styles.walletBalanceAmount}>Balance: ₹{walletBalance.toFixed(2)}</Text>
            <Text style={styles.withdrawalSubText}>Withdraw</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 8 : 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
  },
  headerMainContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  centerLoader: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  userSection: {
    flex: 1,
    marginRight: 10,
  },
  greetingText: {
    fontSize: 11.5,
    color: '#6b7280',
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#1f2937',
    marginTop: 1,
  },
  walletCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  walletIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  walletDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  walletBalanceAmount: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  withdrawalSubText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#e8f0fe',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    marginTop: 0,
  },
});
