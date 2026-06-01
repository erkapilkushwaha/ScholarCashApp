import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DeleteAccountNotice = ({ onProceed }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.warningHeader}>
        <Ionicons name="warning" size={28} color="#db4437" />
        <Text style={styles.warningTitle}>Permanent Action</Text>
      </View>

      <Text style={styles.noticeText}>
        Are you sure you want to delete your ScholarCash account? This process cannot be undone. Please read the following points carefully:
      </Text>

      {/* 📋 Points Checklist */}
      <View style={styles.pointsBlock}>
        <Text style={styles.pointItem}>• Your profile details and linked data will be wiped out.</Text>
        <Text style={styles.pointItem}>• All your pending and approved earnings will be permanently lost.</Text>
        <Text style={styles.pointItem}>• Your referral links, active network, and streak data will be deleted.</Text>
      </View>

      {/* 🔘 Interactive Checkbox */}
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => setIsChecked(!isChecked)}
        activeOpacity={0.8}
      >
        <Ionicons 
          name={isChecked ? "checkbox" : "square-outline"} 
          size={22} 
          color={isChecked ? "#008080" : "#777"} 
        />
        <Text style={styles.checkboxLabel}>
          I understand that all my earnings and profile data will be permanently deleted.
        </Text>
      </TouchableOpacity>

      {/* Action Button */}
      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: isChecked ? '#db4437' : '#cccccc' }]} 
        onPress={onProceed}
        disabled={!isChecked}
      >
        <Text style={styles.btnText}>Proceed to Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eef0f2',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#db4437',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  noticeText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  pointsBlock: {
    backgroundColor: '#fdf0f5',
    padding: 12,
    borderRadius: 4,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#f9cbdc',
  },
  pointItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
    lineHeight: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    lineHeight: 18,
    flex: 1,
  },
  btn: {
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default DeleteAccountNotice;
