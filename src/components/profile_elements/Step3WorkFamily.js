import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Step3WorkFamily = ({ initialData, onValidationChange, onDataChange }) => {
  // 💼 Form Local States
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');

  // 🔽 Dropdown Open/Close States
  const [showEmpMenu, setShowEmpMenu] = useState(false);
  const [showFamilyMenu, setShowFamilyMenu] = useState(false);

  // ⚠️ Error States
  const [errors, setErrors] = useState({});

  // 📋 Extended Dropdown Options
  const employmentOptions = [
    'Student',
    'Freelancer / Gig Worker 💻',
    'Part-Time Job / Intern ⏳',
    'Full-Time Job 💼',
    'Self-Employed / Business 🌱',
    'Unemployed (Looking for Work) 🔍'
  ];

  const familyOptions = [
    '1 (Only Me) 👤',
    '2 - 3 Members 👨‍👦',
    '4 - 5 Members 👨‍👩‍👧',
    'More than 5 Members 👨‍👩‍👧‍👦'
  ];

  // 🔄 Sync initialData when component mounts or parent logs update
  useEffect(() => {
    if (initialData) {
      setEmploymentStatus(initialData.employment_status || '');
      setFamilyMembers(initialData.family_members || '');
    }
  }, [initialData?.employment_status, initialData?.family_members]);

  // 🛡️ Real-time Local State Validation Framework
  useEffect(() => {
    const newErrors = {};

    if (!employmentStatus) {
      newErrors.employment = 'Employment status selection is required';
    }
    if (!familyMembers) {
      newErrors.family = 'Family members count selection is required';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
  }, [employmentStatus, familyMembers]);

  // 📤 Direct Trigger Dispatchers for Dropdown Selections
  const handleEmpSelect = (option) => {
    setEmploymentStatus(option);
    setShowEmpMenu(false);
    onDataChange({
      employment_status: option,
      family_members: familyMembers,
    });
  };

  const handleFamilySelect = (option) => {
    setFamilyMembers(option);
    setShowFamilyMenu(false);
    onDataChange({
      employment_status: employmentStatus,
      family_members: option,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.sectionTitle}>Work & Family Details</Text>
      <Text style={styles.sectionSubtitle}>Help us understand your professional status and household size.</Text>

      {/* 💼 Employment Status Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Employment Status</Text>
        <TouchableOpacity 
          style={[styles.dropdownWrapper, showEmpMenu && styles.activeBorder]} 
          onPress={() => {
            setShowEmpMenu(!showEmpMenu);
            setShowFamilyMenu(false);
          }}
        >
          <Ionicons name="briefcase-outline" size={20} color="#666" style={styles.inputIcon} />
          <Text style={styles.dropdownValue}>{employmentStatus || 'Select Employment Status'}</Text>
          <Ionicons name={showEmpMenu ? "chevron-up" : "chevron-down"} size={18} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
        
        {showEmpMenu && (
          <View style={styles.customMenu}>
            {employmentOptions.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.menuItem, employmentStatus === option && styles.selectedItem]} 
                onPress={() => handleEmpSelect(option)}
              >
                <Text style={[styles.itemText, employmentStatus === option && styles.selectedItemText]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.employment && <Text style={styles.errorText}>{errors.employment}</Text>}
      </View>

      {/* 👨‍👩‍👧‍👦 Family Members Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Family Members Count</Text>
        <TouchableOpacity 
          style={[styles.dropdownWrapper, showFamilyMenu && styles.activeBorder]} 
          onPress={() => {
            setShowFamilyMenu(!showFamilyMenu);
            setShowEmpMenu(false);
          }}
        >
          <Ionicons name="people-outline" size={20} color="#666" style={styles.inputIcon} />
          <Text style={styles.dropdownValue}>{familyMembers || 'Select Family Members Count'}</Text>
          <Ionicons name={showFamilyMenu ? "chevron-up" : "chevron-down"} size={18} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
        
        {showFamilyMenu && (
          <View style={styles.customMenu}>
            {familyOptions.map((option) => (
              <TouchableOpacity 
                key={option} 
                style={[styles.menuItem, familyMembers === option && styles.selectedItem]} 
                onPress={() => handleFamilySelect(option)}
              >
                <Text style={[styles.itemText, familyMembers === option && styles.selectedItemText]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.family && <Text style={styles.errorText}>{errors.family}</Text>}
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

export default Step3WorkFamily;
