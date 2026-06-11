import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { supabase } from '../config/supabaseClient';

import HistoryHeader from '../components/history_elements/HistoryHeader';
import SummaryCard from '../components/history_elements/SummaryCard';
import FilterChips from '../components/history_elements/FilterChips';
import SearchBar from '../components/history_elements/SearchBar';
import ActivityTimeline from '../components/history_elements/ActivityTimeline';
import EmptyState from '../components/history_elements/EmptyState';

export default function History() {
  const [loading, setLoading] =
    useState(true);

  const [profile, setProfile] =
    useState(null);

  const [activities, setActivities] =
    useState([]);

  const [activeFilter, setActiveFilter] =
    useState('all');

  const [searchQuery, setSearchQuery] =
    useState('');

  useEffect(() => {
    loadHistoryEngine();
  }, []);

  async function loadHistoryEngine() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const userId = user.id;

      const [
        profileRes,
        surveyRes,
        earningsRes,
        withdrawalsRes,
        offerwallRes,
      ] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single(),

        supabase
          .from('survey_history')
          .select('*')
          .eq('user_id', userId),

        supabase
          .from('earnings')
          .select('*')
          .eq('user_id', userId),

        supabase
          .from('withdrawals')
          .select('*')
          .eq('user_id', userId),
          
          supabase
  .from('offerwall_history')
  .select('*')
  .eq('user_id', userId),
      ]);

      setProfile(profileRes.data);

      const surveys =
        (surveyRes.data || []).map(
          item => ({
            id: item.id,
            type: 'survey',
            title:
              item.survey_name ||
              'Survey Activity',
            subtitle:
              item.provider_name,
            amount:
              item.amount_inr,
            status:
              item.status,
            created_at:
              item.created_at,
          })
        );

      const earnings =
        (earningsRes.data || []).map(
          item => ({
            id: item.id,
            type: 'earning',
            title:
              item.title ||
              'Reward Credited',
            subtitle:
              item.reward_type,
            amount:
              item.amount,
            status:
              item.status ||
              'completed',
            created_at:
              item.created_at,
          })
        );

      const withdrawals =
        (
          withdrawalsRes.data || []
        ).map(item => ({
          id: item.id,
          type: 'withdrawal',
          title:
            'Withdrawal Request',
          subtitle:
            item.upi_id ||
            'UPI Transfer',
          amount:
            item.amount,
          status:
            item.status,
          created_at:
            item.created_at,
        }));
        const offerwalls =
  (offerwallRes.data || []).map(
    item => ({
      id: item.id,
      type: 'offerwall',

      title:
        item.task_name ||
        'Offerwall Task',

      subtitle:
        item.provider_code,

      amount:
        item.reward,

      status:
        item.status,

      created_at:
        item.created_at,
    })
  );

      const merged = [
  ...surveys,
  ...offerwalls,
  ...earnings,
  ...withdrawals,
];

      merged.sort(
        (a, b) =>
          new Date(
            b.created_at
          ) -
          new Date(
            a.created_at
          )
      );

      setActivities(merged);
    } catch (err) {
      console.log(
        'History Error:',
        err
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredActivities =
    useMemo(() => {
      let result =
        [...activities];

      if (
        activeFilter ===
        'surveys'
      ) {
        result =
          result.filter(
            item =>
              item.type ===
              'survey'
          );
      }

      if (
        activeFilter ===
        'earnings'
      ) {
        result =
          result.filter(
            item =>
              item.type ===
              'earning'
          );
      }

      if (
        activeFilter ===
        'withdrawals'
      ) {
        result =
          result.filter(
            item =>
              item.type ===
              'withdrawal'
          );
      }
      if (
  activeFilter ===
  'offerwalls'
) {
  result =
    result.filter(
      item =>
        item.type ===
        'offerwall'
    );
}

      if (
        searchQuery.trim()
      ) {
        const query =
          searchQuery.toLowerCase();

        result =
          result.filter(
            item =>
              item.title
                ?.toLowerCase()
                .includes(
                  query
                ) ||
              item.subtitle
                ?.toLowerCase()
                .includes(
                  query
                ) ||
              item.status
                ?.toLowerCase()
                .includes(
                  query
                )
          );
      }

      return result;
    }, [
      activities,
      activeFilter,
      searchQuery,
    ]);

  if (loading) {
    return (
      <View
        style={
          styles.loaderContainer
        }
      >
        <ActivityIndicator
          size="large"
          color="#2563eb"
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <HistoryHeader
          totalActivities={
            filteredActivities.length
          }
        />

        <SummaryCard
          walletBalance={
            profile?.wallet_balance
          }
          todayEarnings={
            profile?.today_earnings
          }
          totalEarnings={
            profile?.total_earnings
          }
          totalWithdrawals={
            profile?.total_withdrawal
          }
          todaySurveys={
            profile?.today_surveys_count
          }
        />

        <FilterChips
          activeFilter={
            activeFilter
          }
          onFilterChange={
            setActiveFilter
          }
        />

        <SearchBar
          value={searchQuery}
          onChangeText={
            setSearchQuery
          }
        />

        {filteredActivities.length ===
        0 ? (
          <EmptyState />
        ) : (
          <ActivityTimeline
            activities={
              filteredActivities
            }
          />
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:
      '#f8fafc',
  },

  loaderContainer: {
    flex: 1,
    justifyContent:
      'center',
    alignItems:
      'center',
    backgroundColor:
      '#f8fafc',
  },
});