import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WithdrawalFeedsList({ transactions = [] }) {
  
  // 🛑 FIX: Yahan se hardcoded filter mita diya, kyunki data History.jsx se already filter hoke aa raha hai
  if (transactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📑 No records found for this section.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {transactions.map((log) => {
        
        // 🎰 Detect row behavior (Credit matrix or Debit matrix)
        const isCreditRow = log.type === 'credit';
        
        // 🚥 Dynamic Status System: Success, Pending, Failed badges
        const status = log.status?.toLowerCase() || 'pending';
        let badgeColor = '#fef3c7'; // Yellow (Pending) default
        let textColor = '#d97706';  
        
        if (status === 'success') {
          badgeColor = isCreditRow ? '#d1fae5' : '#e6f4ea'; // Soft Green
          textColor = isCreditRow ? '#059669' : '#137333';
        } else if (status === 'failed') {
          badgeColor = '#fee2e2'; // Soft Red
          textColor = '#dc2626';
        }

        // 📅 Clean readable Date Parser text mapping
        const formattedDate = log.created_at 
          ? new Date(log.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          : 'Recent';

        // 📝 Dynamic Header Title assignment base checks
        const rowTitle = isCreditRow ? 'Wallet Money Credit' : 'UPI Payout Transfer';

        return (
          <View key={log.id} style={styles.payoutCardTile}>
            
            {/* Left Side Metadata Layout Group */}
            <View style={styles.metaLeft}>
              {/* Dynamic status green/red light row mapping */}
              <Text style={[styles.actionTitleText, { color: isCreditRow ? '#10b981' : '#1f2937' }]}>
                {rowTitle}
              </Text>
              <Text style={styles.accountSubText}>Target: {log.activity || 'Account Saved'}</Text>
              <Text style={styles.timestampLabel}>{formattedDate}</Text>
            </View>

            {/* Right Side Financial Status Node Stack */}
            <View style={styles.metricsRight}>
              {/* Dynamic sign change and color mapping block setup */}
              <Text style={[styles.amountText, { color: isCreditRow ? '#10b981' : '#111827' }]}>
                {isCreditRow ? '+' : '-'}₹{parseFloat(log.amount || 0).toFixed(2)}
              </Text>
              
              {/* Dynamic Badges Container Capsules Injection */}
              <View style={[styles.statusCapsuleBadge, { backgroundColor: badgeColor }]}>
                <Text style={[styles.badgeLabelText, { color: textColor }]}>
                  {status}
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
  payoutCardTile: {
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
  actionTitleText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  accountSubText: {
    fontSize: 10.5,
    color: '#4b5563',
    marginTop: 2,
    fontWeight: '600',
  },
  timestampLabel: {
    fontSize: 9.5,
    color: '#94a3b8',
    marginTop: 4,
    fontWeight: '500',
  },
  metricsRight: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '800',
  },
  statusCapsuleBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLabelText: {
    fontSize: 8.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
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
