import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Back arrow icon ke liye

const ProfileHeader = ({ title, currentStep, totalSteps, progressPercentage, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* 🔝 Sub-Header Row */}
      <View style={styles.row}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.titleText}>{title}</Text>
        
        <Text style={styles.stepText}>Step {currentStep} of {totalSteps}</Text>
      </View>

      {/* 📊 Progress Bar Container */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 50,
  },
  backButton: {
    padding: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginLeft: 15,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    width: '100%',
    marginTop: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50', // 🟢 Judi hui patli green line
  },
});

export default ProfileHeader;
