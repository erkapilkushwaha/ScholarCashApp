import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ReferralBanner({
  referralCode = 'SCHOLAR50',
  reward = 50,
  totalReferrals = 0,
  onShare,
}) {
  return (
    <View style={styles.container}>

      <View style={styles.topRow}>

        <View style={styles.iconWrap}>
          <Ionicons
            name="people"
            size={24}
            color="#ffffff"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            Invite Friends & Earn
          </Text>

          <Text style={styles.subtitle}>
            Get ₹{reward} for every successful referral
          </Text>
        </View>

      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsLabel}>
          Successful Referrals
        </Text>

        <Text style={styles.statsValue}>
          {totalReferrals}
        </Text>
      </View>

      <View style={styles.codeRow}>

        <View style={styles.codeBox}>
          <Text style={styles.codeText}>
            {referralCode}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.shareBtn}
          onPress={onShare}
        >
          <Ionicons
            name="share-social"
            size={16}
            color="#ffffff"
          />

          <Text style={styles.shareText}>
            Share
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,

    backgroundColor: '#1a73e8',

    borderRadius: 24,

    padding: 20,

    shadowColor: '#1a73e8',
    shadowOpacity: 0.20,
    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconWrap: {
    width: 52,
    height: 52,

    borderRadius: 16,

    backgroundColor: 'rgba(255,255,255,0.18)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },

  subtitle: {
    marginTop: 3,

    color: 'rgba(255,255,255,0.85)',

    fontSize: 12,
    fontWeight: '600',
  },

  statsCard: {
    marginTop: 18,

    backgroundColor: 'rgba(255,255,255,0.12)',

    borderRadius: 16,

    padding: 14,
  },

  statsLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '600',
  },

  statsValue: {
    marginTop: 4,

    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },

  codeRow: {
    flexDirection: 'row',
    marginTop: 18,
  },

  codeBox: {
    flex: 1,

    backgroundColor: '#ffffff',

    borderRadius: 14,

    justifyContent: 'center',

    paddingHorizontal: 16,
  },

  codeText: {
    color: '#1a73e8',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },

  shareBtn: {
    marginLeft: 10,

    backgroundColor: '#0f5fd0',

    borderRadius: 14,

    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 6,
  },
});