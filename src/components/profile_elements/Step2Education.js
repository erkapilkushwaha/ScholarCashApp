import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Step2Education = ({ initialData, onValidationChange, onDataChange }) => {
  // 🎓 Form Local States
  const [educationLevel, setEducationLevel] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');

  // 🔽 Dropdown Open/Close States
  const [showEduMenu, setShowEduMenu] = useState(false);
  const [showIncomeMenu, setShowIncomeMenu] = useState(false);

  // ⚠️ Error States
  const [errors, setErrors] = useState({});

  // 📋 Pre-defined Dropdown Lists
  const educationOptions = [
    'School (10th/12th)',
    'Undergrad (B.A/B.Sc/B.Tech/B.Com)',
    'Postgrad (M.A/M.Sc/M.Tech/MBA)',
    'Diploma / ITI / Other'
  ];

  const incomeOptions = [
    'Under ₹1 Lakh',
    '₹1 Lakh - ₹3 Lakhs',
    '₹3 Lakhs - ₹5 Lakhs',
    'Above ₹5 Lakhs'
  ];

  // 🔄 Sync initialData when component mounts or parent data store updates
  useEffect(() => {
    if (initialData) {
      setEducationLevel(initialData.education_level || '');
      setAnnualIncome(initialData.annual_income || '');
    }
  }, [initialData?.education_level, initialData?.annual_income]);

  // 🛡️ Real-time Validation Engine (Controls footer action flags)
  useEffect(() => {
    const newErrors = {};

    if (!educationLevel) {
      newErrors.education = 'Education level selection is required';
    }
    if (!annualIncome) {
      newErrors.income = 'Annual family income selection is required';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
  }, [educationLevel, annualIncome]);

  // 📤 Direct Trigger Dispatcher for Dropdown Selections
  const handleEduSelect = (option) => {
    setEducationLevel(option);
    setShowEduMenu(false);
    onDataChange({
      education_level: option,
      annual_income: annualIncome,
    });
  };

  const handleIncomeSelect = (option) => {
    setAnnualIncome(option);
    setShowIncomeMenu(false);
    onDataChange({
      education_level: educationLevel,
      annual_income: option,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.sectionTitle}>Academic & Financial Details</Text>
      <Text style={styles.sectionSubtitle}>Please select your current education level and family income range.</Text>

      {/* 🎓 Education Level Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Education Level</Text>
        <TouchableOpacity 
          style={[styles.dropdownWrapper, showEduMenu && styles.activeBorder]} 
          onPress={() => {
            setShowEduMenu(!showEduMenu);
            setShowIncomeMenu(false);
          }}
        >
          <Ionicons name="school-outline" size={20} color="#666" style={styles.inputIcon} />
          <Text style={styles.dropdownValue}>{educationLevel || 'Select Education Level'}</Text>
          <Ionicons name={showEduMenu ? "chevron-up" : "chevron-down"} size={18} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
        
        {showEduMenu && (
          <View style={styles.customMenu}>
            {educationOptions.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.menuItem, educationLevel === option && styles.selectedItem]} 
                onPress={() => handleEduSelect(option)}
              >
                <Text style={[styles.itemText, educationLevel === option && styles.selectedItemText]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.education && <Text style={styles.errorText}>{errors.education}</Text>}
      </View>

      {/* 💰 Annual Income Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Annual Family Income</Text>
        <TouchableOpacity 
          style={[styles.dropdownWrapper, showIncomeMenu && styles.activeBorder]} 
          onPress={() => {
            setShowIncomeMenu(!showIncomeMenu);
            setShowEduMenu(false);
          }}
        >
          <Ionicons name="wallet-outline" size={20} color="#666" style={styles.inputIcon} />
          <Text style={styles.dropdownValue}>{annualIncome || 'Select Income Range'}</Text>
          <Ionicons name={showIncomeMenu ? "chevron-up" : "chevron-down"} size={18} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
        
        {showIncomeMenu && (
          <View style={styles.customMenu}>
            {incomeOptions.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.menuItem, annualIncome === option && styles.selectedItem]} 
                onPress={() => handleIncomeSelect(option)}
              >
                <Text style={[styles.itemText, annualIncome === option && styles.selectedItemText]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.income && <Text style={styles.errorText}>{errors.income}</Text>}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  sectionSubtitle: { fontSize: 13, color: '#666', marginBottom: 25 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 8 },
  dropdownWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, height: 48, backgroundColor: '#FAFAFA' },
  activeBorder: { borderColor: '#2196F3' },
  inputIcon: { paddingHorizontal: 12 },
  dropdownValue: { flex: 1, fontSize: 14, color: '#333' },
  arrowIcon: { marginRight: 12 },
  customMenu: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, backgroundColor: '#fff', marginTop: 5, overflow: 'hidden', elevation: 2 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
  selectedItem: { backgroundColor: '#E6F4FE' },
  itemText: { fontSize: 14, color: '#444' },
  selectedItemText: { color: '#2196F3', fontWeight: '500' },
  errorText: { color: '#D32F2F', fontSize: 11, marginTop: 4, marginLeft: 2 }
});

export default Step2Education;
