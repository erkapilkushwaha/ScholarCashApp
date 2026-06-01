import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from 'react-native';

export default function HistoryFilterPills({ activeTab, onTabChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [parentLayout, setParentLayout] = useState({ x: 0, y: 0, width: 150, height: 34 });

  // 🎰 Financial split pill activation control
  const isFinancialActive = ['all', 'withdrawals', 'credits'].includes(activeTab);

  // Dynamic Text Setup inside Split Pill
  let displayLabel = 'All Transactions';
  if (activeTab === 'withdrawals') displayLabel = 'Withdrawals ❌';
  if (activeTab === 'credits') displayLabel = 'Credits ❌';

  // Master container ki location measure karne ke liye handler
  const handleContainerLayout = (event) => {
    event.target.measure((x, y, width, height, pageX, pageY) => {
      setParentLayout({ x: pageX, y: pageY, width, height });
    });
  };

  const handleLeftPillClick = () => {
    onTabChange('all');
    setDropdownOpen(false);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollWrapper}
      >
        {/* 📑 1. Master Global Timeline Pill */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => { onTabChange('global_all'); setDropdownOpen(false); }}
          style={[
            styles.standardPill, 
            (activeTab === 'global_all' || !activeTab) && styles.activePill
          ]}
        >
          <Text style={[styles.pillText, (activeTab === 'global_all' || !activeTab) && styles.activePillText]}>
            📑 All Activities
          </Text>
        </TouchableOpacity>

        {/* 🏦 2. Fully Decoupled Split Action Financial Dropdown Pill */}
        <View 
          onLayout={handleContainerLayout}
          style={[styles.splitPillContainer, isFinancialActive && styles.activeSplitContainer]}
        >
          {/* Left Action Side */}
          <TouchableOpacity 
            activeOpacity={0.65} 
            onPress={handleLeftPillClick}
            style={styles.leftPillSlice}
          >
            <Text style={[styles.pillText, isFinancialActive && styles.activePillText]}>
              {displayLabel}
            </Text>
          </TouchableOpacity>

          {/* Symmetrical Split Divider Line */}
          <View style={[styles.splitDivider, isFinancialActive && styles.activeSplitDivider]} />

          {/* Right Action Side */}
          <TouchableOpacity 
            activeOpacity={0.65} 
            onPress={() => setDropdownOpen(!dropdownOpen)}
            style={styles.rightArrowSlice}
          >
            <Text style={[styles.arrowText, isFinancialActive && styles.activeArrowText]}>
              {dropdownOpen ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 📝 3. Surveys History Status Ledger */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => { onTabChange('surveys'); setDropdownOpen(false); }}
          style={[styles.standardPill, activeTab === 'surveys' && styles.activePill]}
        >
          <Text style={[styles.pillText, activeTab === 'surveys' && styles.activePillText]}>
            📝 Surveys History
          </Text>
        </TouchableOpacity>

        {/* 🎯 4. Offerwalls Tracking Ledger */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => { onTabChange('offerwalls'); setDropdownOpen(false); }}
          style={[styles.standardPill, activeTab === 'offerwalls' && styles.activePill]}
        >
          <Text style={[styles.pillText, activeTab === 'offerwalls' && styles.activePillText]}>
            🎯 Offerwalls
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 🔮 Outside Click Modal Layout Structure */}
      {dropdownOpen && (
        <Modal transparent animationType="none" visible={dropdownOpen} onRequestClose={() => setDropdownOpen(false)}>
          <TouchableWithoutFeedback onPress={() => setDropdownOpen(false)}>
            <View style={styles.modalBackdrop}>
              
              {/* 🔥 FIXED CO-ORDINATES: Ab pill ke just 2px neeche chipak kar khulega bina kisi gap ke */}
              <View 
                style={[
                  styles.floatingDropdownCard, 
                  { 
                    top: parentLayout.y + parentLayout.height + 2, 
                    left: parentLayout.x, 
                    width: parentLayout.width // Pill ki exact choudaai ke barabar automatic thin aur perfect rahega
                  }
                ]}
              >
                <TouchableOpacity style={styles.menuRow} onPress={() => { onTabChange('all'); setDropdownOpen(false); }}>
                  <Text style={[styles.menuRowText, activeTab === 'all' && styles.activeTextLink]}>All Transactions</Text>
                </TouchableOpacity>
                
                <View style={styles.menuItemDivider} />

                <TouchableOpacity style={styles.menuRow} onPress={() => { onTabChange('withdrawals'); setDropdownOpen(false); }}>
                  <Text style={[styles.menuRowText, activeTab === 'withdrawals' && styles.activeTextLink]}>Withdrawals</Text>
                </TouchableOpacity>
                
                <View style={styles.menuItemDivider} />

                <TouchableOpacity style={styles.menuRow} onPress={() => { onTabChange('credits'); setDropdownOpen(false); }}>
                  <Text style={[styles.menuRowText, activeTab === 'credits' && styles.activeTextLink]}>Credits</Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { backgroundColor: '#ffffff', zIndex: 100 },
  scrollWrapper: { paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
  standardPill: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  splitPillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: 34,
    marginRight: 8,
    overflow: 'hidden',
  },
  activeSplitContainer: {
    backgroundColor: '#1a73e8',
    borderColor: '#1a73e8',
  },
  leftPillSlice: {
    paddingLeft: 14,
    paddingRight: 8,
    height: '100%',
    justifyContent: 'center',
  },
  rightArrowSlice: {
    paddingLeft: 8,
    paddingRight: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splitDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#cbd5e1',
  },
  activeSplitDivider: {
    backgroundColor: '#64b5f6',
  },
  pillText: { fontSize: 12, fontWeight: '600', color: '#475569' },
  activePillText: { color: '#ffffff', fontWeight: '700' },
  activePill: { backgroundColor: '#1a73e8', borderColor: '#1a73e8' },
  arrowText: { fontSize: 8, color: '#64748b' },
  activeArrowText: { color: '#ffffff' },
  modalBackdrop: { flex: 1, backgroundColor: 'transparent' },
  floatingDropdownCard: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 3, 
    paddingHorizontal: 3,
    elevation: 6,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  menuRow: { 
    paddingVertical: 9, 
    paddingHorizontal: 12, 
    borderRadius: 8 
  },
  menuRowText: { fontSize: 12, color: '#334155', fontWeight: '500' },
  activeTextLink: { color: '#1a73e8', fontWeight: '700' },
  menuItemDivider: {
    height: 1,
    backgroundColor: '#f1f5f9', 
    marginHorizontal: 8,
  },
});
