import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function OfferwallFeedsList({ transactions = [] }) {
  
  // 🔍 Filter Logic: Credit transactions jo survey ke alawa bache huye tasks hain
  const offerwallLogs = transactions.filter(tx => 
    tx.type === 'credit' && 
    !tx.activity.toLowerCase().includes('survey') && 
    !tx.activity.toLowerCase().includes('research')
  );

  if (offerwallLogs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🎯 No Offerwall tasks completed yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {offerwallLogs.map((log) => {
        const formattedDate = log.created_at 
          ? new Date(log.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          : 'Recent';

        return (
          <View key={log.id} style={styles.offerwallCardTile}>
            
            {/* Left Side Info */}
            <View style={styles.metaLeft}>
              <View style={styles.titleRow}>
                <Text style={styles.iconTag}>⚡</Text>
                <Text style={styles.actionTitleText} numberOfLines={1}>{log.activity}</Text>
              </View>
              <Text style={styles.timestampLabel}>{formattedDate} • Task Completed</Text>
            </View>

            {/* Right Side Reward */}
            <View style={styles.metricsRight}>
              <Text style={styles.amountCreditText}>+₹{parseFloat(log.amount).toFixed(2)}</Text>
              <View style={styles.wallBadge}>
                <Text style={styles.wallText}>Offerwall</Text>
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
  offerwallCardTile: {
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconTag: {
    fontSize: 14,
  },
  actionTitleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
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
  amountCreditText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669', // Bright emerald green token
  },
  wallBadge: {
    backgroundColor: '#eff6ff', // Soft light blue for wall tags distinction
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  wallText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#1d4ed8',
    textTransform: 'uppercase',
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
