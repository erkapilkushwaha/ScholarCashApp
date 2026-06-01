import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SurveyFeedsList({ transactions = [] }) {
  
  // 🔍 Filter Logic: Sirf credit type aur survey transactions ko filter karega
  const surveyLogs = transactions.filter(tx => 
    tx.type === 'credit' && 
    (tx.activity.toLowerCase().includes('survey') || tx.activity.toLowerCase().includes('research'))
  );

  if (surveyLogs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📝 No survey earnings found yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {surveyLogs.map((log) => {
        const formattedDate = log.created_at 
          ? new Date(log.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          : 'Recent';

        return (
          <View key={log.id} style={styles.surveyCardTile}>
            
            {/* Left Column Meta Details */}
            <View style={styles.metaLeft}>
              <View style={styles.titleRow}>
                <Text style={styles.iconTag}>📋</Text>
                <Text style={styles.actionTitleText} numberOfLines={1}>{log.activity}</Text>
              </View>
              <Text style={styles.timestampLabel}>{formattedDate} • Verified Credit</Text>
            </View>

            {/* Right Column Money Token */}
            <View style={styles.metricsRight}>
              <Text style={styles.amountCreditText}>+₹{parseFloat(log.amount).toFixed(2)}</Text>
              <View style={styles.successBadge}>
                <Text style={styles.successText}>Credited</Text>
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
  surveyCardTile: {
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
    paddingLeft: 20, // Aligning perfectly below the text skip icon padding
  },
  metricsRight: {
    alignItems: 'flex-end',
  },
  amountCreditText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#10b981', // Solid Earning Green
  },
  successBadge: {
    backgroundColor: '#e6f4ea',
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  successText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#137333',
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
