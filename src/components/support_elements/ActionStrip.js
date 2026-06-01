import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActionStrip = ({ onOpenTicketForm, onToggleResponses, showResponses, activeTicketsCount }) => {
  const supportNumber = '9569079118';

  // 💬 Open WhatsApp Logic
  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=91${supportNumber}&text=Hello ScholarCash Support Team, mujhe ek help chahiye.`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed on your device.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  // 📞 Open Phone Dialer Logic
  const openDialer = () => {
    const url = `tel:${supportNumber}`;
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* 1. Need More Help Chip */}
        <TouchableOpacity style={[styles.chip, styles.helpChip]} onPress={onOpenTicketForm}>
          <Ionicons name="add-circle-outline" size={18} color="#fff" style={styles.icon} />
          <Text style={[styles.chipText, styles.whiteText]}>Need More Help</Text>
        </TouchableOpacity>

        {/* 2. Query Responses Chip */}
        <TouchableOpacity 
          style={[styles.chip, styles.responseChip, showResponses && styles.activeResponseChip]} 
          onPress={onToggleResponses}
        >
          <Ionicons 
            name="chatbubbles-outline" 
            size={18} 
            color={showResponses ? '#fff' : '#008080'} 
            style={styles.icon} 
          />
          <Text style={[styles.chipText, showResponses ? styles.whiteText : styles.tealText]}>
            Responses {activeTicketsCount > 0 ? `(${activeTicketsCount})` : ''}
          </Text>
        </TouchableOpacity>

        {/* 3. WhatsApp Chip */}
        <TouchableOpacity style={[styles.chip, styles.whatsappChip]} onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={18} color="#25D366" style={styles.icon} />
          <Text style={styles.chipText}>WhatsApp</Text>
        </TouchableOpacity>

        {/* 4. Call Support Chip */}
        <TouchableOpacity style={[styles.chip, styles.callChip]} onPress={openDialer}>
          <Ionicons name="call-outline" size={18} color="#007AFF" style={styles.icon} />
          <Text style={styles.chipText}>Call Us</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    height: 50,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  helpChip: {
    backgroundColor: '#008080',
    borderColor: '#008080',
  },
  responseChip: {
    borderColor: '#008080',
    backgroundColor: '#e6f2f2',
  },
  activeResponseChip: {
    backgroundColor: '#008080',
  },
  whatsappChip: {
    borderColor: '#25D366',
  },
  callChip: {
    borderColor: '#007AFF',
  },
  icon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  tealText: {
    color: '#008080',
  },
});

export default ActionStrip;
