import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AllFeedsList({ transactions = [] }) {
  
  if (transactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📑 No transaction history available yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {transactions.map((log) => {
        // 🚥 Symmetrical Identification: Check if it's an Earning (credit) or Withdrawal (debit)
        const isCredit = log.type === 'credit';
        
        // Dynamic Status Setup mapping definitions
        const status = log.status?.toLowerCase() || 'success';
        let badgeBg = '#e6f4ea';
        let badgeTextClr = '#137333';

        if (!isCredit) {
          if (status === 'pending') {
            badgeBg = '#fef3c7';
            badgeTextClr = '#d97706';
          } else if (status === 'failed') {
            badgeBg = '#fee2e2';
            badgeTextClr = '#dc2626';
          } else {
            badgeBg = '#d1fae5';
            badgeTextClr = '#059669';
          }
        }

        // 📅 Clean Date Engine format parse
        const formattedDate = log.created_at 
          ? new Date(log.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          : 'Recent';

        return (
          <View key={log.id} style={styles.masterCardTile}>
            
            {/* Left Frame Meta Info Group */}
            <View style={styles.metaLeft}>
              <View style={styles.titleWrapper}>
                <Text style={styles.iconStyle}>{isCredit ? '➕' : '💸'}</Text>
                <Text style={styles.actionMainText} numberOfLines={1}>
                  {isCredit ? log.activity : 'UPI Payout Withdrawal'}
                </Text>
              </View>
              {!isCredit && <Text style={styles.subAccountMeta}>To: {log.activity}</Text>}
              <Text style={[styles.timestampLabel, !isCredit && { paddingLeft: 22 }]}>
                {formattedDate} • {isCredit ? 'Wallet Earned' : 'Disbursement'}
              </Text>
            </View>

            {/* Right Frame Monetary State Badge Group */}
            <View style={styles.metricsRight}>
              <Text style={[styles.amountText, { color: isCredit ? '#10b981' : '#111827' }]}>
                {isCredit ? '+' : '-'}₹{parseFloat(log.amount).toFixed(2)}
              </Text>
              
              <View style={[styles.statusBadgeCapsule, { backgroundColor: badgeBg }]}>
                <Text style={[styles.badgeLabelText, { color: badgeTextClr }]}>
                  {isCredit ? 'Credited' : status}
                </Text>
              </View>
            </View>

          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingBottom: 30,
    gap: 10,
  },
  masterCardTile: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  metaLeft: {
    flex: 1,
    paddingRight: 12,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconStyle: {
    fontSize: 13,
  },
  actionMainText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
  },
  subAccountMeta: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 1.5,
    paddingLeft: 22,
    fontWeight: '600',
  },
  timestampLabel: {
    fontSize: 9.5,
    color: '#94a3b8',
    marginTop: 4,
    fontWeight: '500',
    paddingLeft: 18,
  },
  metricsRight: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '800',
  },
  statusBadgeCapsule: {
    paddingVertical: 1.5,
    paddingHorizontal: 6,
    borderRadius: 5,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLabelText: {
    fontSize: 7.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
});
