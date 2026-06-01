import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();
  
  // 🛡️ Safe fallback configuration if i18n object is partially loaded
  const currentLang = i18n?.language || 'en';

  if (!isOpen) return null;

  const handleLanguageChange = (langCode) => {
    // 🔌 Checking if changeLanguage engine function exists before executing
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(langCode);
    } else {
      console.log("i18n changeLanguage mechanism is currently not registered.");
    }
    onClose(); // Floating engine template closes safely
  };

  return (
    <View style={styles.floatingContainer}>
      
      {/* 🇬🇧 English Option */}
      <TouchableOpacity 
        style={[styles.optionRow, currentLang === 'en' && styles.selectedOption]} 
        onPress={() => handleLanguageChange('en')}
      >
        <Text style={[styles.optionText, currentLang === 'en' && styles.selectedText]}>
          English
        </Text>
        {currentLang === 'en' && <Ionicons name="checkmark" size={18} color="#008080" />}
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* 🇮🇳 Hindi Option */}
      <TouchableOpacity 
        style={[styles.optionRow, currentLang === 'hi' && styles.selectedOption]} 
        onPress={() => handleLanguageChange('hi')}
      >
        <Text style={[styles.optionText, currentLang === 'hi' && styles.selectedText]}>
          Hindi
        </Text>
        {currentLang === 'hi' && <Ionicons name="checkmark" size={18} color="#008080" />}
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#e6f2f2',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: '#008080',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#eef0f2',
  }
});

export default LanguageDropdown;
