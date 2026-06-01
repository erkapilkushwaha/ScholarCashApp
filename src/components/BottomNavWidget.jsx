import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// ========================================================
// SCHOLARCASH - CLEAN HARDENED ACTIVE-POP NAVIGATION (ROUTED)
// ========================================================

// 🚀 App.js se activeTab aur setActiveTab ko props ke roop me liya
export default function BottomNavWidget({ activeTab, setActiveTab }) {

  const handleTabPress = (tabName) => {
    setActiveTab(tabName); // ➔ Ab ye direct App.js ki screen state ko change karega
    if (tabName !== 'home') {
      console.log(`${tabName.toUpperCase()} tab template active.`);
    }
  };

  return (
    <View style={styles.bottomTabBarContainer}>
      
      {/* 🔴 Top Middle Line Dots Indicator Bar */}
      <View style={styles.dotsIndicatorWrapper}>
        <View style={[styles.dotIndicator, activeTab === 'home' ? styles.activeDot : styles.idleDot]} />
        <View style={[styles.dotIndicator, activeTab === 'wallet' ? styles.activeDot : styles.idleDot]} />
        <View style={[styles.dotIndicator, activeTab === 'history' ? styles.activeDot : styles.idleDot]} />
        <View style={[styles.dotIndicator, activeTab === 'profile' ? styles.activeDot : styles.idleDot]} />
      </View>

      {/* 🚥 Main Uniform Buttons Row */}
      <View style={styles.tabsInnerRow}>
        
        {/* 🏠 Home Item Tab */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'home' ? styles.activeTabContainer : styles.idleTabContainer]} 
          activeOpacity={0.7}
          onPress={() => handleTabPress('home')}
        >
          <Text style={[styles.tabIcon, activeTab === 'home' ? styles.activeTabStyle : styles.idleTabStyle]}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === 'home' ? styles.activeLabelStyle : styles.idleLabelStyle]}>Home</Text>
        </TouchableOpacity>

        {/* 💳 Wallet Item Tab */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'wallet' ? styles.activeTabContainer : styles.idleTabContainer]} 
          activeOpacity={0.7}
          onPress={() => handleTabPress('wallet')}
        >
          <Text style={[styles.tabIcon, activeTab === 'wallet' ? styles.activeTabStyle : styles.idleTabStyle]}>💳</Text>
          <Text style={[styles.tabLabel, activeTab === 'wallet' ? styles.activeLabelStyle : styles.idleLabelStyle]}>Wallet</Text>
        </TouchableOpacity>

        {/* 📜 History Item Tab */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'history' ? styles.activeTabContainer : styles.idleTabContainer]} 
          activeOpacity={0.7}
          onPress={() => handleTabPress('history')}
        >
          <Text style={[styles.tabIcon, activeTab === 'history' ? styles.activeTabStyle : styles.idleTabStyle]}>📜</Text>
          <Text style={[styles.tabLabel, activeTab === 'history' ? styles.activeLabelStyle : styles.idleLabelStyle]}>History</Text>
        </TouchableOpacity>

        {/* 👤 Profile Item Tab */}
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'profile' ? styles.activeTabContainer : styles.idleTabContainer]} 
          activeOpacity={0.7}
          onPress={() => handleTabPress('profile')}
        >
          <Text style={[styles.tabIcon, activeTab === 'profile' ? styles.activeTabStyle : styles.idleTabStyle]}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'profile' ? styles.activeLabelStyle : styles.idleLabelStyle]}>Profile</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTabBarContainer: {
    width: '100%',
    height: 84, 
    backgroundColor: '#cbd5e1', 
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 14, 
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  dotsIndicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28, 
    marginTop: 6,
    marginBottom: 4,
    width: '100%',
  },
  dotIndicator: {
    height: 4,
    borderRadius: 2,
  },
  idleDot: {
    width: 6,
    backgroundColor: 'rgba(51, 65, 85, 0.25)', 
  },
  activeDot: {
    width: 16, 
    backgroundColor: '#1a73e8', 
  },
  tabsInnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 2,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    height: 48, 
    width: '22%',
  },
  activeTabContainer: {
    backgroundColor: '#ffffff', 
    borderWidth: 1.5,
    borderColor: '#1a73e8', 
    transform: [{ translateY: -4 }], 
    elevation: 5,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  idleTabContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 1,
  },
  activeTabStyle: {
    transform: [{ scale: 1.05 }],
  },
  activeLabelStyle: {
    color: '#1a73e8',
    fontWeight: '800',
  },
  idleTabStyle: {
    opacity: 0.8,
  },
  idleLabelStyle: {
    color: '#334155',
    fontWeight: '700',
  },
});
