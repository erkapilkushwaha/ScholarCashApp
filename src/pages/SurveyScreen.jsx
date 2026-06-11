import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { supabase }
from '../config/supabaseClient';

import SurveyHeroCard
from '../components/surveys/SurveyHeroCard';

import SurveySearchHeader
from '../components/surveys/SurveySearchHeader';

import SurveyFilterChips
from '../components/surveys/SurveyFilterChips';

import SurveyStatsBar
from '../components/surveys/SurveyStatsBar';

import SurveyCard
from '../components/home_v2/SurveyCard';

import SurveyResultsInfo
from '../components/surveys/SurveyResultsInfo';

import SurveyEmptyState
from '../components/surveys/SurveyEmptyState';

import SurveyFilterModal
from '../components/surveys/SurveyFilterModal';

import UniversalDetailsSheet
from '../components/common/UniversalDetailsSheet';

export default function SurveyScreen({
  navigation,
  openWebView,
}) {

  const [surveys, setSurveys] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [filter, setFilter] =
    useState('all');

  const [loading, setLoading] =
    useState(true);

  const [showFilters, setShowFilters] =
    useState(false);

  const [selectedSurvey, setSelectedSurvey] =
    useState(null);

  const [detailsVisible, setDetailsVisible] =
    useState(false);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    setLoading(true);

    const { data } = await supabase
      .from('live_surveys')
      .select('*')
      .eq('status', 'active');

    setSurveys(data || []);
    setLoading(false);
  };

  // ✅ FIXED: using user_reward_inr consistently
  const filteredSurveys = useMemo(() => {
    let data = [...surveys];

    if (search.trim()) {
      data = data.filter(item =>
        item.survey_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    switch (filter) {
      case 'highest_reward':
        data.sort((a, b) =>
          (b.user_reward_inr || b.reward_inr || 0) -
          (a.user_reward_inr || a.reward_inr || 0)
        );
        break;

      case 'shortest':
        data.sort((a, b) =>
          (a.estimated_minutes || 0) -
          (b.estimated_minutes || 0)
        );
        break;

      case 'highest_match':
        data.sort((a, b) =>
          (b.match_percentage || 0) -
          (a.match_percentage || 0)
        );
        break;
    }

    return data;
  }, [surveys, search, filter]);

  const openSurvey = (survey) => {
    setSelectedSurvey(survey);
    setDetailsVisible(true);
  };

  // ✅ FIXED: Full tracking logic added (same as Home.js)
  const handleContinue = async () => {
    setDetailsVisible(false);

    if (!selectedSurvey) return;

    try {
      const { data: authData } =
        await supabase.auth.getUser();

      if (!authData?.user) return;

      const userId = authData.user.id;

      // Insert into survey_history
      const { data: surveyRecord, error: surveyError } =
        await supabase
          .from('survey_history')
          .insert([{
            user_id: userId,
            survey_id: selectedSurvey.id,
            provider_name: selectedSurvey.provider_name,
            survey_name: selectedSurvey.survey_name,
            amount_inr: selectedSurvey.user_reward_inr || 0,
            amount_usd: selectedSurvey.reward_usd || 0,
            provider_amount_inr: selectedSurvey.provider_reward_inr || 0,
            user_amount_inr: selectedSurvey.user_reward_inr || 0,
            platform_commission_inr: selectedSurvey.platform_commission_inr || 0,
            status: 'started',
            started_at: new Date().toISOString(),
            reward_credited: false,
          }])
          .select()
          .single();

      if (surveyError) {
        console.log('Survey history insert error:', surveyError.message);
      }

      // Insert into wallet_transactions
      if (surveyRecord) {
        const { error: txError } = await supabase
          .from('wallet_transactions')
          .insert([{
            user_id: userId,
            transaction_type: 'survey_started',
            amount: selectedSurvey.user_reward_inr || 0,
            status: 'started',
            reference_id: surveyRecord.id,
            survey_id: selectedSurvey.id,
            provider_name: selectedSurvey.provider_name,
            description: `Survey Started - ${selectedSurvey.survey_name}`,
            is_credit: false,
          }]);

        if (txError) {
          console.log('Wallet transaction insert error:', txError.message);
        }
      }
    } catch (err) {
      console.log('Tracking error:', err.message);
    }

    // ✅ Open WebView regardless of tracking result
    openWebView(
      selectedSurvey?.survey_url,
      selectedSurvey?.survey_name
    );
  };

  // ✅ FIXED: Loading UI shown
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#1a73e8"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => String(item.id)}

        ListHeaderComponent={
          <>
            <SurveySearchHeader
              value={search}
              onChangeText={setSearch}
              onBack={() => navigation.goBack()}
              onFilterPress={() => setShowFilters(true)}
            />

            <SurveyHeroCard
              totalSurveys={surveys.length}
            />

            <SurveyStatsBar
              surveys={surveys}
            />

            <SurveyFilterChips
              selected={filter}
              onSelect={setFilter}
            />

            <SurveyResultsInfo
              count={filteredSurveys.length}
            />
          </>
        }

        renderItem={({ item }) => (
          <SurveyCard
            survey={item}
            onPress={openSurvey}
          />
        )}

        ListEmptyComponent={<SurveyEmptyState />}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
        }}
      />

      <SurveyFilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        selected={filter}
        onApply={(value) => {
          setFilter(value);
          setShowFilters(false);
        }}
      />

      <UniversalDetailsSheet
        visible={detailsVisible}
        data={selectedSurvey}
        type="survey"
        showContinueButton
        onClose={() => setDetailsVisible(false)}
        onContinue={handleContinue}
      />

    </SafeAreaView>
  );
}

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
});
