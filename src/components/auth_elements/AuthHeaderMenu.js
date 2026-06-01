import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
// Sahi file path se Language Dropdown component ko import kiya hai
import LanguageDropdown from '../settings_elements/LanguageDropdown'; 

export default function AuthHeaderMenu({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  // Modal ko close karke sahi screen par navigate karne ke liye helper function
  const handleNavigation = (screenName) => {
    setMenuVisible(false); 
    navigation.navigate(screenName); 
  };

  return (
    <View style={styles.container}>
      {/* Three Dot Trigger Button */}
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.tripleDot}>
        <Entypo name="dots-three-vertical" size={20} color="#333333" />
      </TouchableOpacity>

      {/* Floating Popup Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* Modal ke bahr touch karne par menu band ho jaye */}
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.menuPopup}>
              
              {/* Option 1: Help & Support (Navigates to SupportScreen.js) */}
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => handleNavigation('SupportScreen')}
              >
                <Text style={styles.menuText}>Help & Support 💬</Text>
              </TouchableOpacity>

              {/* Option 2: Contact Us (Navigates to ContactUsScreen.js) */}
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => handleNavigation('ContactUsScreen')}
              >
                <Text style={styles.menuText}>Contact Us 📞</Text>
              </TouchableOpacity>

              {/* Halka sa visual divider line */}
              <View style={styles.divider} />

              {/* Option 3: Language Selection Section */}
              <View style={styles.languageSection}>
                <Text style={styles.languageLabel}>Language 🌐</Text>
                {/* Aapka banaya hua Language Dropdown component yahan render hoga */}
                <LanguageDropdown />
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  tripleDot: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.02)', // Screen par halka sa transparent layer
  },
  menuPopup: {
    position: 'absolute',
    top: 50, // Top bar se space
    right: 15, // Screen ke right side se chipka rahega
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 6,
    width: 180,
    // Soft Shadow design guidelines ke mutabik popup ko lifting effect dene ke liye
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 4,
  },
  languageSection: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  languageLabel: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    marginBottom: 6,
  },
});
