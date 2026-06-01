import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { supabase } from '../config/supabaseClient';

import EarningsLoadingState from '../components/earnings_elems/EarningsLoadingState';
import EarningsEmptyState from '../components/earnings_elems/EarningsEmptyState';
import EarningsSummaryCard from '../components/earnings_elems/EarningsSummaryCard';
import EarningsBreakdownCard from '../components/earnings_elems/EarningsBreakdownCard';
import EarningsActivityList from '../components/earnings_elems/EarningsActivityList';

export default function EarningsScreen({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadEarnings();
  }, []);

  async function loadEarnings() {
    try {

      setLoading(true);

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from('earnings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false
        });

      if (error) {
        console.log(error);
      }

      setEarnings(data || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // ===== Summary Calculations =====

  const totalEarned =
    earnings.reduce(
      (sum, item) =>
        sum + Number(item.amount),
      0
    );

  const tasksCompleted =
    earnings.length;

  const averageReward =
    tasksCompleted > 0
      ? totalEarned / tasksCompleted
      : 0;

  // ===== Breakdown Calculations =====

  const surveyTotal =
    earnings
      .filter(
        item =>
          item.reward_type === 'survey'
      )
      .reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

  const referralTotal =
    earnings
      .filter(
        item =>
          item.reward_type === 'referral'
      )
      .reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

  const bonusTotal =
    earnings
      .filter(
        item =>
          item.reward_type === 'bonus'
      )
      .reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

  // ===== Loading State =====

  if (loading) {
    return (
      <EarningsLoadingState />
    );
  }

  // ===== Empty State =====

  if (earnings.length === 0) {
    return (
      <EarningsEmptyState
        onExplorePress={() =>
          navigation.navigate(
            'Home'
          )
        }
      />
    );
  }

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <EarningsSummaryCard
          totalEarned={totalEarned}
          tasksCompleted={tasksCompleted}
          averageReward={averageReward}
        />

        <EarningsBreakdownCard
          surveyTotal={surveyTotal}
          referralTotal={referralTotal}
          bonusTotal={bonusTotal}
        />

        <EarningsActivityList
          earnings={earnings}
        />

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },

});