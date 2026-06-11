import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '../../config/supabaseClient';



/* =====================================
   MAIN COMPONENT
===================================== */

export default function WithdrawalDetailsCard({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchLatestWithdrawal() {
      try {
        setLoading(true);

        const { data: record, error } = await supabase
          .from('withdrawals')
          .select(`
            id,
            name,
            upi_id,
            amount,
            created_at
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (!error && record?.length > 0) {
          setData(record[0]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchLatestWithdrawal();
    }
  }, [userId]);

  const handleCopy = async () => {
    const requestId = data.id
      .replace(/-/g, '')
      .slice(0, 8)
      .toUpperCase();

    await Clipboard.setStringAsync(requestId);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (loading) {
    return (
      <View style={styles.loaderBox}>
        <ActivityIndicator
          size="small"
          color="#0284C7"
        />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>
          No withdrawal receipt found.
        </Text>
      </View>
    );
  }

  const requestId = data.id
    .replace(/-/g, '')
    .slice(0, 8)
    .toUpperCase();

  const formattedAmount =
    Number(data.amount).toLocaleString('en-IN');

  const formattedDate =
    new Date(data.created_at).toLocaleString();

  return (
    <View style={styles.receiptCard}>

      {/* =========================
          BLUE HEADER
      ========================== */}

      <LinearGradient
        colors={[
          '#1D4ED8',
          '#2563EB',
          '#38BDF8'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.blueHeader}
      >

        <View style={styles.headerContent}>

          <View style={styles.iconCircle}>

            <Ionicons
              name="document-text"
              size={48}
              color="#2563EB"
            />

            <View style={styles.smallSuccess}>
              <Ionicons
                name="checkmark"
                size={14}
                color="#FFF"
              />
            </View>

          </View>

          <View style={styles.headerRight}>
<Text style={styles.headerTitle}>
  Withdrawal Request Submitted
</Text>
<View style={styles.amountRow}>
  <Text style={styles.headerAmount}>
    ₹{formattedAmount}
  </Text>

  <View style={styles.receivedBadge}>
    <View style={styles.greenDot} />
    <Text style={styles.receivedText}>
      Request Received
    </Text>
  </View>
</View>

<Text style={styles.watermark}>
  ₹
</Text>
</View> 
</View>
</LinearGradient>

      {/* =========================
          DETAILS SECTION
      ========================== */}

      <View style={styles.detailsContainer}>
        
        {/* Request ID */}

        <View style={styles.infoRow}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: '#EFF6FF' }
              ]}
            >
              <Ionicons
                name="hash"
                size={22}
                color="#3B82F6"
              />
            </View>

            <Text style={styles.label}>
              Request ID
            </Text>
          </View>

          <View style={styles.rightSection}>
            <Text style={styles.value}>
              {requestId}
            </Text>

            <TouchableOpacity
              onPress={handleCopy}
            >
              <Ionicons
                name={
                  copied
                    ? 'checkmark-circle'
                    : 'copy-outline'
                }
                size={18}
                color={
                  copied
                    ? '#10B981'
                    : '#64748B'
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.separator} />

        {/* Name */}

        <View style={styles.infoRow}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: '#F3E8FF' }
              ]}
            >
              <Ionicons
                name="person-outline"
                size={22}
                color="#8B5CF6"
              />
            </View>

            <Text style={styles.label}>
              Name
            </Text>
          </View>

          <Text style={styles.value}>
            {data.name}
          </Text>
        </View>

        <View style={styles.separator} />

        {/* UPI */}

        <View style={styles.infoRow}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: '#DCFCE7' }
              ]}
            >
              <Ionicons
                name="paper-plane-outline"
                size={22}
                color="#16A34A"
              />
            </View>

            <Text style={styles.label}>
              UPI ID
            </Text>
          </View>

          <Text style={styles.value}>
            {data.upi_id}
          </Text>
        </View>

        <View style={styles.separator} />

        {/* Amount */}

        <View style={styles.infoRow}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: '#FEF3C7' }
              ]}
            >
              <Ionicons
                name="cash-outline"
                size={22}
                color="#F59E0B"
              />
            </View>

            <Text style={styles.label}>
              Amount
            </Text>
          </View>

          <Text style={styles.amountText}>
            ₹{formattedAmount}
          </Text>
        </View>

        <View style={styles.separator} />

        {/* Date */}

        <View style={styles.infoRow}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: '#FFEDD5' }
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={22}
                color="#EA580C"
              />
            </View>

            <Text style={styles.label}>
              Date & Time
            </Text>
          </View>

          <Text style={styles.value}>
            {formattedDate}
          </Text>
        </View>

      </View>

      {/* Processing Box */}

      <View style={styles.processingBox}>

        <View style={styles.processingIconBox}>
          <Ionicons
            name="time-outline"
            size={26}
            color="#F59E0B"
          />
        </View>

        <View style={styles.processingTextArea}>

          <Text style={styles.processingTitle}>
            Expected Processing Time: 1-24 hr
          </Text>

        </View>

      </View>

    </View>
  );
}
const styles = StyleSheet.create({

  loaderBox: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  emptyBox: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  emptyText: {
    color: '#64748B',
    fontSize: 13,
  },

  receiptCard: {
    width: '100%',
    marginTop: 0,
    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    overflow: 'hidden',

    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,

    marginBottom: 14,
  },

  blueHeader: {
  paddingHorizontal: 12,
  paddingVertical: 10,
  minHeight: 105,
  justifyContent: 'center',

  position: 'relative',
},

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#FFFFFF',
    shadowOpacity: 0.2,
    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 2,

    position: 'relative',
  },

  smallSuccess: {
    position: 'absolute',

    bottom: 2,
    right: 2,

    width: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: '#22C55E',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  headerRight: {
    flex: 1,
    marginLeft: 10,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  amountRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 2,
},

headerAmount: {
  color: '#FFFFFF',
  fontSize: 24,
  fontWeight: '900',
},

receivedBadge: {
  flexDirection: 'row',
  alignItems: 'center',

  backgroundColor: '#6EE7B7',

  paddingHorizontal: 8,
  paddingVertical: 4,

  borderRadius: 999,

  marginLeft: 8,
},

  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,

    backgroundColor: '#FFFFFF',
    marginRight: 5,
  },

  receivedText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 9,
  },

  watermark: {
    position: 'absolute',

    right: 8,
    bottom: -10,

    fontSize: 70,
    fontWeight: '900',

    color: 'rgba(255,255,255,0.03)',
  },

  detailsContainer: {
    paddingHorizontal: 12,
    paddingTop: 0,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 8,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  value: {
    maxWidth: '55%',

    textAlign: 'right',

    fontSize: 12,
    fontWeight: '600',

    color: '#0F172A',
  },

  amountText: {
    fontSize: 14,
    fontWeight: '800',

    color: '#0284C7',
  },

  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  processingBox: {
    marginHorizontal: 12,
    marginTop: 6,
    marginBottom: 12,

    backgroundColor: '#FFF7ED',

    borderRadius: 12,

    paddingHorizontal: 10,
    paddingVertical: 5,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#FED7AA',
  },

  processingIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,

    backgroundColor: '#FEF3C7',

    justifyContent: 'center',
    alignItems: 'center',
  },

  processingTextArea: {
    flex: 1,
    marginLeft: 8,
  },

  processingTitle: {
    fontSize: 12,
    fontWeight: '800',

    color: '#C2410C',
  },

  processingHours: {
    fontSize: 11,
    fontWeight: '700',

    color: '#0F172A',
  },

  processingDescription: {
    fontSize: 10,
    lineHeight: 12,

    color: '#64748B',
  },

});