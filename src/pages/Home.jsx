import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { supabase } from '../config/supabaseClient';

import HomeHeader from '../components/home_v2/HomeHeader';
import WalletHeroCard from '../components/home_v2/WalletHeroCard';
import QuickActionsGrid from '../components/home_v2/QuickActionsGrid';
import FeaturedSurveyCard from '../components/home_v2/FeaturedSurveyCard';
import TopSurveysSection from '../components/home_v2/TopSurveysSection';
import OfferwallSection from '../components/home_v2/OfferwallSection';
import ProgressAchievementCard from '../components/home_v2/ProgressAchievementCard';
import ReferralBanner from '../components/home_v2/ReferralBanner';
import UniversalDetailsSheet from '../components/common/UniversalDetailsSheet';
import { ScrollView } from 'react-native';

export default function Home({
  navigation,
  onNavigateToWallet,
  openWebView,
}) {
  const [profile, setProfile] = useState(null);
  const [offerwalls, setOfferwalls] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('');

  const loadHomeData = async () => {
    try {
      setLoading(true);

      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) { setLoading(false); return; }

      const userId = authData.user.id;

      const { data: profileData } = await supabase
        .from('profiles').select('*').eq('id', userId).maybeSingle();

      const { data: offerData } = await supabase
        .from('offerwall_providers').select('*')
        .eq('status', 'active').order('sort_order', { ascending: true });

      const { data: surveyData } = await supabase
        .from('live_surveys').select('*').eq('status', 'active');

      setProfile(profileData || null);
      setOfferwalls(offerData || []);
      setSurveys(surveyData || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadHomeData(); }, []);

  const openDetailsSheet = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setDetailsVisible(true);
  };

  const handleContinue = async () => {
    setDetailsVisible(false);
    if (!selectedItem) return;

    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) return;
      const userId = authData.user.id;

      if (selectedType === 'survey') {
        const { data: surveyRecord, error: surveyError } = await supabase
          .from('survey_history')
          .insert([{
            user_id: userId,
            survey_id: selectedItem.id,
            provider_name: selectedItem.provider_name,
            survey_name: selectedItem.survey_name,
            amount_inr: selectedItem.user_reward_inr || 0,
            amount_usd: selectedItem.reward_usd || 0,
            provider_amount_inr: selectedItem.provider_reward_inr || 0,
            user_amount_inr: selectedItem.user_reward_inr || 0,
            platform_commission_inr: selectedItem.platform_commission_inr || 0,
            status: 'started',
            started_at: new Date().toISOString(),
            reward_credited: false,
          }])
          .select().single();

        if (!surveyError && surveyRecord) {
          await supabase.from('wallet_transactions').insert([{
            user_id: userId,
            transaction_type: 'survey_started',
            amount: selectedItem.user_reward_inr || 0,
            status: 'started',
            reference_id: surveyRecord.id,
            survey_id: selectedItem.id,
            provider_name: selectedItem.provider_name,
            description: `Survey Started - ${selectedItem.survey_name}`,
            is_credit: false,
          }]);
        }
      }

      if (selectedType === 'offerwall') {
        const { data: offerRecord, error: offerError } = await supabase
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
          .select().single();

        if (!offerError && offerRecord) {
          await supabase.from('wallet_transactions').insert([{
            user_id: userId,
            transaction_type: 'offerwall_started',
            amount: selectedItem.user_amount || 0,
            status: 'started',
            reference_id: offerRecord.id,
            provider_name: selectedItem.provider_code,
            description: `Offerwall Started - ${selectedItem.name}`,
            is_credit: false,
          }]);
        }
      }
    } catch (err) {
      console.log('Tracking error:', err.message);
    }

    openWebView(
      selectedType === 'survey' ? selectedItem.survey_url : selectedItem.offer_url,
      selectedType === 'survey' ? selectedItem.survey_name : selectedItem.name
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <HomeHeader
          userName={profile?.full_name}
          onNotificationPress={() => navigation.navigate('notificationscreen')}
          navigation={navigation}
        />

        <WalletHeroCard
          balance={profile?.wallet_balance}
          pending={profile?.pending_balance}
          todayEarnings={profile?.today_earnings}
          totalEarned={profile?.total_earnings}
          onWithdrawPress={onNavigateToWallet}
        />

        <QuickActionsGrid />

        <FeaturedSurveyCard
          survey={surveys?.[0]}
          onStartSurvey={(s) => openDetailsSheet(s, 'survey')}
        />

        {/* ✅ Offerwalls — View All goes to OfferwallScreen */}
        <OfferwallSection
          providers={offerwalls}
          onProviderPress={(item) => openDetailsSheet(item, 'offerwall')}
          onViewAll={() => navigation.navigate('offerwallscreen')}
        />

        {/* ✅ Top 3 Surveys — View All goes to SurveyScreen */}
        <TopSurveysSection
          surveys={surveys}
          onSurveyPress={(item) => openDetailsSheet(item, 'survey')}
          onViewAll={() => navigation.navigate('surveyscreen')}
        />

        <ProgressAchievementCard
          todayEarnings={profile?.today_earnings}
          todaySurveys={profile?.today_surveys_count}
        />

        <ReferralBanner />

      </ScrollView>

      <UniversalDetailsSheet
        visible={detailsVisible}
        data={selectedItem}
        type={selectedType}
        showContinueButton={true}
        onClose={() => setDetailsVisible(false)}
        onContinue={handleContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
