import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { supabase } from '../../config/supabaseClient'; // 🔗 Direct Link to Supabase

export default function StatsWidget() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const MIN_WITHDRAWAL = 200; // 🎯 Payout target threshold

  // ⚡ Supabase profiles table se live data fetch karne ka dynamic logic
  useEffect(() => {
    async function fetchStatsFromDb() {
      try {
        setLoading(true);

        // 1. 🔑 Sabse pehle current logged-in user nikalte hain
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;

        // 🎯 Fix: Agar user logged in nahi hai (session missing), toh aage mat badho aur yahin se return ho jao
        if (!user) {
          setLoading(false);
          return;
        }

        // 2. 🔍 User ID ke base par profiles table se data fetch karte hain
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id) // 🎯 Database row se unique ID match karega!
          .single();

        if (error) throw error;
        if (data) setProfile(data);
        
      } catch (err) {
        console.error("Stats Fetch Error: ", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStatsFromDb();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color="#1a73e8" />
      </View>
    );
  }

  // Database se aaye huyen fields ki mapping
  const completedSurveys = profile?.today_surveys_count || 0;
  const pendingSurveys = profile?.pending_surveys_count || 0;
  const balance = parseFloat(profile?.wallet_balance || 0);
  
  // Mathematical logic
  const progressPercent = Math.min((balance / MIN_WITHDRAWAL) * 100, 100);
  const remainingAmount = Math.max(MIN_WITHDRAWAL - balance, 0);

  // Dynamic Motivation Text Engine
  let motivationText = "";
  if (balance === 0) {
    motivationText = `🚀 Start your first survey to lock ₹${MIN_WITHDRAWAL} payout!`;
  } else if (progressPercent < 40) {
    motivationText = `⚡ Good start! Earn just ₹${remainingAmount.toFixed(2)} more for next payout`;
  } else if (progressPercent < 85) {
    motivationText = `🔥 You are crushing it! Only ₹${remainingAmount.toFixed(2)} away from instant transfer`;
  } else if (progressPercent < 100) {
    motivationText = `⭐ Super close! Just ₹${remainingAmount.toFixed(2)} more to unlock payout button`;
  } else {
    motivationText = "🎉 Congratulations! You have unlocked Instant UPI Withdrawal!";
  }

  return (
    <View style={styles.container}>
      
      {/* 🔝 Top Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Withdrawal Milestone</Text>
        
        <View style={styles.pillsContainer}>
          {/* Completed Pill */}
          <View style={[styles.pill, styles.completedPill]}>
            <View style={[styles.dot, { backgroundColor: '#00875a' }]} />
            <Text style={styles.pillText}>{completedSurveys} Done</Text>
          </View>
          
          {/* Pending Pill */}
          <View style={[styles.pill, styles.pendingPill]}>
            <View style={[styles.dot, { backgroundColor: '#ffab00' }]} />
            <Text style={styles.pillText}>{pendingSurveys} Review</Text>
          </View>
        </View>
      </View>

      {/* 📊 Sleek Progress Bar */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
      </View>

      {/* 💵 Bottom Meta Row */}
      <View style={styles.metaRow}>
        <Text style={styles.balanceText}>
          Progress: <Text style={styles.actualBal}>₹{balance.toFixed(2)}</Text>
          <Text style={styles.targetText}> / ₹{MIN_WITHDRAWAL}</Text>
        </Text>
        <Text style={styles.percentageText}>{progressPercent.toFixed(0)}% Completed</Text>
      </View>

      {/* 🎯 Motivation Banner */}
      <View style={[styles.tipBox, { backgroundColor: balance >= MIN_WITHDRAWAL ? '#e6f4ea' : '#f8fafc' }]}>
        <Text style={[styles.tipText, { color: balance >= MIN_WITHDRAWAL ? '#137333' : '#4b5563' }]}>
          {motivationText}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    marginHorizontal: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  center: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#374151',
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 20,
    borderWidth: 1,
  },
  completedPill: {
    backgroundColor: '#e6f4ea',
    borderColor: '#bbf7d0',
  },
  pendingPill: {
    backgroundColor: '#fef3c7',
    borderColor: '#fde68a',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 4,
  },
  pillText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#374151',
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1a73e8',
    borderRadius: 3,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  balanceText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9ca3af',
  },
  actualBal: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
  },
  targetText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9ca3af',
  },
  percentageText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1a73e8',
  },
  tipBox: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontSize: 10.5,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
});
