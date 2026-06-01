import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 📥 Props matrix accept kar rahe hain jo main Wallet screen se live aayega
export default function UltimateBalanceCard({ balance, pending, earned, withdrawal }) {

// Safe parsing layers to prevent visual layout crashes 🪙
const finalBalance = parseFloat(balance ?? 0.00) || 0.00;
const pendingBalance = parseFloat(pending ?? 0.00) || 0.00;
const totalEarnings = parseFloat(earned ?? 0.00) || 0.00;
const totalWithdrawn = parseFloat(withdrawal ?? 0.00) || 0.00;

const milestoneProgress = Math.min((finalBalance / 200) * 100, 100);
const remainingForMilestone = Math.max(200 - finalBalance, 0);

return (
<View style={styles.cardContainer}>
{/* Label & Live Net Balance */}
<Text style={styles.cardLabel}>Available Balance</Text>
<Text style={styles.mainBalanceText}>₹{finalBalance.toFixed(2)}</Text>

{/* 🚥 Live Symmetrical 3-Column Split Metrics Ledger */}  
  <View style={styles.ledgerRow}>  
      
    {/* 1. Pending Balance Block */}  
    <View style={styles.ledgerBlock}>  
      <Text style={styles.ledgerLabel} numberOfLines={1}>Pending</Text>  
      <Text style={[styles.ledgerValue, { color: '#ffd085' }]}>₹{pendingBalance.toFixed(2)}</Text>  
    </View>  
      
    {/* 2. Total Earnings Block */}  
    <View style={[styles.ledgerBlock, styles.leftBorder]}>  
      <Text style={styles.ledgerLabel} numberOfLines={1}>Total Earned</Text>  
      <Text style={[styles.ledgerValue, { color: '#ffffff' }]}>₹{totalEarnings.toFixed(2)}</Text>  
    </View>  

    {/* 3. Total Withdrawn Block */}  
    <View style={[styles.ledgerBlock, styles.leftBorder]}>  
      <Text style={styles.ledgerLabel} numberOfLines={1}>Withdrawal</Text>  
      <Text style={[styles.ledgerValue, { color: '#a7f3d0' }]}>₹{totalWithdrawn.toFixed(2)}</Text>  
    </View>  

  </View>  

  {/* Smart Milestone Indicator Embedded inside Card */}  
  <View style={styles.milestoneBox}>  
    <View style={styles.milestoneHeader}>  
      <Text style={styles.milestoneTitle}>Minimum Payout Milestone</Text>  
      <Text style={styles.milestonePercent}>{milestoneProgress.toFixed(0)}%</Text>  
    </View>  
    <View style={styles.trackBar}>  
      <View style={[styles.progressBar, { width: `${milestoneProgress}%` }]} />  
    </View>  
    {remainingForMilestone > 0 ? (  
      <Text style={styles.milestoneSubText}>  
        ⭐ Lock <Text style={{ fontWeight: '800' }}>₹{remainingForMilestone.toFixed(2)}</Text> more to activate payout!  
      </Text>  
    ) : (  
      <Text style={[styles.milestoneSubText, { color: '#10b981' }]}>  
        🎉 Milestone Completed! Instant withdrawal unlocked.  
      </Text>  
    )}  
  </View>  
</View>

);
}

const styles = StyleSheet.create({
cardContainer: {
width: '100%',
backgroundColor: '#1a73e8',
borderRadius: 20,
padding: 14,
marginTop: 8,
elevation: 4,
shadowColor: '#1a73e8',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.15,
shadowRadius: 6,
},
cardLabel: {
fontSize: 11,
color: '#e8f0fe',
textTransform: 'uppercase',
letterSpacing: 0.5,
fontWeight: '600',
},
mainBalanceText: {
fontSize: 32,
fontWeight: '800',
color: '#ffffff',
marginTop: 2,
},
ledgerRow: {
flexDirection: 'row',
backgroundColor: 'rgba(255, 255, 255, 0.12)',
borderRadius: 12,
paddingVertical: 10,
marginTop: 14,
width: '100%',
},
ledgerBlock: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
paddingHorizontal: 2,
},
leftBorder: {
borderLeftWidth: 1,
borderColor: 'rgba(255, 255, 255, 0.2)',
},
ledgerLabel: {
fontSize: 9,
color: '#e8f0fe',
fontWeight: '600',
textTransform: 'uppercase',
letterSpacing: 0.2,
},
ledgerValue: {
fontSize: 12,
fontWeight: '800',
marginTop: 3,
},
milestoneBox: {
marginTop: 14,
backgroundColor: 'rgba(0, 0, 0, 0.12)',
borderRadius: 12,
padding: 10,
},
milestoneHeader: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
milestoneTitle: {
fontSize: 10,
color: '#ffffff',
fontWeight: '700',
},
milestonePercent: {
fontSize: 10,
color: '#ffffff',
fontWeight: '800',
},
trackBar: {
width: '100%',
height: 5,
backgroundColor: 'rgba(255, 255, 255, 0.2)',
borderRadius: 3,
marginTop: 6,
overflow: 'hidden',
},
progressBar: {
height: '100%',
backgroundColor: '#ffffff',
borderRadius: 3,
},
milestoneSubText: {
fontSize: 9.5,
color: '#e8f0fe',
marginTop: 6,
textAlign: 'center',
fontWeight: '500',
},
});