import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// ========================================================
// SCHOLARCASH - SLEEK & COMPACT HERO BANNER MODULE
// ========================================================

export default function HeroBannerWidget({ hotSurveyAvailable, onBannerPress }) {
  // Static flash details for high engagement
  const bannerData = {
    title: "⚡ HOT SURVEY ACTIVE",
    desc: "Earn ₹120.00 instantly • 10 Mins remaining",
    actionText: "Claim Now 🚀"
  };

  if (!hotSurveyAvailable) return null; // Automatic toggle logic if no hot campaign exists

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        style={styles.bannerContainer}
        activeOpacity={0.9}
        onPress={() => onBannerPress('hot_campaign_01', 120.00)}
      >
        {/* Left Indicator Tag line */}
        <View style={styles.leftContent}>
          <Text style={styles.bannerTitle}>{bannerData.title}</Text>
          <Text style={styles.bannerDesc} numberOfLines={1}>{bannerData.desc}</Text>
        </View>

        {/* Right Action Compact Badge */}
        <View style={styles.actionBadge}>
          <Text style={styles.actionText}>{bannerData.actionText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 12, // Minimal margins to look slim
    marginBottom: 4,
  },
  bannerContainer: {
    width: '100%',
    backgroundColor: '#de350b', // Punchy Premium Red/Orange Alert Theme
    borderRadius: 12,
    paddingVertical: 10, // Slim padding layout
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftContent: {
    flex: 1,
    paddingRight: 8,
  },
  bannerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.8,
  },
  bannerDesc: {
    fontSize: 12,
    color: '#ffebe6',
    fontWeight: '500',
    marginTop: 1,
  },
  actionBadge: {
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#de350b',
    fontSize: 11,
    fontWeight: '700',
  },
});
