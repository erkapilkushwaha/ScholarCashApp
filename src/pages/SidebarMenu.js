import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabaseClient'; // ✨ Updated path to reach config from pages
import SidebarHeader from '../components/sidebar_elements/SidebarHeader'; // ✨ Updated path to components folder

const SidebarMenu = ({ navigation }) => {

  // 🚪 Secure Logout Logic with Confirmation Popup
  const handleLogoutClick = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out of ScholarCash?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
            try {
              await supabase.auth.signOut();
              navigation.reset({
                index: 0,
                routes: [{ name: 'AuthScreen' }], 
              });
            } catch (error) {
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          } 
        }
      ]
    );
  };

  // 📑 Reusable Menu Item Component
  const renderMenuItem = (icon, title, targetPage, isLogout = false) => {
    return (
      <TouchableOpacity 
        style={[styles.menuRow, isLogout && styles.logoutRow]} 
        onPress={isLogout ? handleLogoutClick : () => navigation.navigate(targetPage)}
        activeOpacity={0.7}
      >
        <View style={styles.itemLeft}>
          <Ionicons 
            name={icon} 
            size={22} 
            color={isLogout ? "#db4437" : "#008080"} 
            style={styles.itemIcon} 
          />
          <Text style={[styles.itemText, isLogout && styles.logoutText]}>{title}</Text>
        </View>
        {!isLogout && <Ionicons name="chevron-forward" size={16} color="#bbb" />}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent} // 📜 Fixed: Added bottom spacing container for safe scrolling
      bounces={false}
    >
      {/* 🔝 Custom profile header component loaded from component folder */}
      <SidebarHeader navigation={navigation} />

      {/* 📜 Vertical Menu List Item Container */}
      <View style={styles.menuListContainer}>
        {renderMenuItem("home-outline", "Home", "Home")}
        <View style={styles.divider} />

        {renderMenuItem("wallet-outline", "Wallet", "Wallet")}
        <View style={styles.divider} />

        {renderMenuItem("time-outline", "History", "History")}
        <View style={styles.divider} />

        {renderMenuItem("settings-outline", "Settings", "SettingsScreen")}
        <View style={styles.divider} />

        {renderMenuItem("shield-checkmark-outline", "Privacy & Policy", "PrivacyPolicyScreen")}
        <View style={styles.divider} />

        {renderMenuItem("document-text-outline", "Terms & Conditions", "TermsConditionsScreen")}
        <View style={styles.divider} />

        {renderMenuItem("information-circle-outline", "About Us", "AboutUsScreen")}
        <View style={styles.divider} />

        {renderMenuItem("help-circle-outline", "Help & Support", "SupportScreen")}
        <View style={styles.divider} />

        {renderMenuItem("call-outline", "Contact Us", "ContactUsScreen")}
        <View style={styles.divider} />

        {/* 🚪 Separate Logout Entry at the end */}
        {renderMenuItem("log-out-outline", "Logout", null, true)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 90, // 🛋️ Fixed: Extra padding at bottom ensures logout item scrolls completely above the nav bar
  },
  menuListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%', // 📐 Fixed: Prevent content from clamping or pressing to the right
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderRadius: 4,
  },
  logoutRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f5f7f8',
    paddingTop: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // 📐 Fixed: Allows text to occupy full left space without compressing
  },
  itemIcon: {
    width: 32,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  logoutText: {
    color: '#db4437',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#f5f7f8',
  },
});

export default SidebarMenu;
