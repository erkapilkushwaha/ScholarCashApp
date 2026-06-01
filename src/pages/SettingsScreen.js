import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/settings_elements/LanguageDropdown';

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation(); // i18n hook translation ke liye
  
  // 🔘 States for Toggles and Dropdown
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#008080" barStyle="light-content" />

      {/* 🔝 Simple Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* 📜 Single Clean Vertical List */}
      <View style={styles.listContainer}>
        
        {/* 1. Edit Profile */}
        <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('CompleteProfile')}>
          <View style={styles.itemLeft}>
            <Ionicons name="person-outline" size={22} color="#008080" style={styles.itemIcon} />
            <Text style={styles.itemText}>{t('edit_profile')}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>
        <View style={styles.divider} />

        {/* 2. Change Password */}
        <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <View style={styles.itemLeft}>
            <Ionicons name="key-outline" size={22} color="#008080" style={styles.itemIcon} />
            <Text style={styles.itemText}>{t('change_password')}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>
        <View style={styles.divider} />

        {/* 3. Push Notifications (Toggle) */}
        <View style={styles.itemRow}>
          <View style={styles.itemLeft}>
            <Ionicons name="notifications-outline" size={22} color="#008080" style={styles.itemIcon} />
            <Text style={styles.itemText}>{t('notifications')}</Text>
          </View>
          <Switch
            trackColor={{ false: "#ccc", true: "#008080" }}
            thumbColor={isNotificationsEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            value={isNotificationsEnabled}
          />
        </View>
        <View style={styles.divider} />

        {/* 4. Dark Mode (Toggle) */}
        <View style={styles.itemRow}>
          <View style={styles.itemLeft}>
            <Ionicons name="moon-outline" size={22} color="#008080" style={styles.itemIcon} />
            <Text style={styles.itemText}>{t('dark_mode')}</Text>
          </View>
          <Switch
            trackColor={{ false: "#ccc", true: "#008080" }}
            thumbColor={isDarkModeEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
            value={isDarkModeEnabled}
          />
        </View>
        <View style={styles.divider} />

        {/* 5. App Language (With inline dropdown placement) */}
        <View style={styles.langSectionWrapper}>
          <TouchableOpacity 
            style={styles.itemRow} 
            onPress={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="language-outline" size={22} color="#008080" style={styles.itemIcon} />
              <Text style={styles.itemText}>{t('language')}</Text>
            </View>
            <Ionicons 
              name={isLangDropdownOpen ? "chevron-up" : "chevron-down"} 
              size={18} 
              color="#777" 
            />
          </TouchableOpacity>
          
          {/* 🔽 Floating UI Dropdown loaded right beneath the menu */}
          <LanguageDropdown 
            isOpen={isLangDropdownOpen} 
            onClose={() => setIsLangDropdownOpen(false)} 
          />
        </View>
        <View style={styles.divider} />

        {/* 6. Delete Account */}
        <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('DeleteAccountScreen')}>
          <View style={styles.itemLeft}>
            <Ionicons name="trash-outline" size={22} color="#db4437" style={styles.itemIcon} />
            <Text style={[styles.itemText, { color: '#db4437' }]}>{t('delete_account')}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#db4437" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  headerBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 4,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eef0f2',
    paddingHorizontal: 16,
    paddingVertical: 4,
    elevation: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 30,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eef0f2',
  },
  langSectionWrapper: {
    width: '100%',
  }
});

export default SettingsScreen;
