import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

// 🚀 Symmetrical Architectural Imports - Directly pointing to home_elements subfolder
import HeaderWidget from '../components/home_elements/HeaderWidget';
import StatsWidget from '../components/home_elements/StatsWidget';
import HeroBannerWidget from '../components/home_elements/HeroBannerWidget';
import OfferwallWidget from '../components/home_elements/OfferwallWidget';
import SurveyCardWidget from '../components/home_elements/SurveyCardWidget';

// 🧭 App.js se direct routing function ko as a prop liya
export default function Home({ onNavigateToWallet }) {
  
  // Standby Empty Action Handler for UI Testing
  const handleFakePress = () => {};

  return (
    <View style={styles.screenWrapper}>
      
      {/* 📜 Main Scrollable Content Body */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* 1. Top Balance Header (Yeh ab direct wallet open karega click par) */}
        <HeaderWidget onWithdrawPress={onNavigateToWallet || handleFakePress} />
        
        {/* 2. Target Milestone Progress & Motivation Grid */}
        <StatsWidget />

        {/* 3. Sleek Alert Hero Banner */}
        <HeroBannerWidget 
          hotSurveyAvailable={true} 
          onBannerPress={handleFakePress}
        />
        
        {/* 4. Matrix Grid Premium Offerwalls */}
        <View style={styles.contentBody}>
          <Text style={styles.sectionTitle}>Premium Offerwalls</Text>
          <OfferwallWidget onProviderPress={handleFakePress} />
        </View>

        {/* 5. Direct Live Individual Surveys Hot Feed */}
        <View style={[styles.contentBody, { marginTop: 12, paddingBottom: 30 }]}>
          <Text style={styles.sectionTitle}>🔥 High Paying Surveys</Text>
          <SurveyCardWidget onSurveyPress={handleFakePress} />
        </View>

      </ScrollView>

    </View> // 👈 Yeh main closing View tag chhut gaya tha, ab laga diya hai
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentBody: {
    paddingHorizontal: 20,
    marginTop: 14,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4b5563',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});
