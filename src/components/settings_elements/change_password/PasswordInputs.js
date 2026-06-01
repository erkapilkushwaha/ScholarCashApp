import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordInputs = ({ onNext, currentPasswordError }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Real-time criteria states
  const [criteria, setCriteria] = useState({
    minLength: false,
    hasCapital: false,
    hasSmall: false,
    hasNumber: false,
    hasSymbol: false,
  });

  // Other dynamic error states
  const [matchError, setMatchError] = useState('');
  const [sameAsOldError, setSameAsOldError] = useState('');

  // Run validation every time new password changes
  useEffect(() => {
    setCriteria({
      minLength: newPassword.length >= 8,
      hasCapital: /[A-Z]/.test(newPassword),
      hasSmall: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>_]/.test(newPassword),
    });

    if (currentPassword && newPassword === currentPassword) {
      setSameAsOldError('New password must be different from current password');
    } else {
      setSameAsOldError('');
    }
  }, [newPassword, currentPassword]);

  // Check confirm password match in real-time
  useEffect(() => {
    if (confirmPassword && newPassword !== confirmPassword) {
      setMatchError('Passwords do not match');
    } else {
      setMatchError('');
    }
  }, [confirmPassword, newPassword]);

  const handleNextSubmit = () => {
    const allCriteriaMet = Object.values(criteria).every(val => val === true);
    
    if (!currentPassword) return;
    if (!allCriteriaMet || matchError || sameAsOldError) return;

    // Passing valid data to main screen container
    onNext({ currentPassword, newPassword });
  };

  const renderCriteriaItem = (label, isMet) => (
    <View style={styles.criteriaRow}>
      <Ionicons 
        name={isMet ? "checkmark-circle" : "close-circle"} 
        size={16} 
        color={isMet ? "#25d366" : "#db4437"} 
      />
      <Text style={[styles.criteriaText, { color: isMet ? "#25d366" : "#777" }]}>
        {label}
      </Text>
    </View>
  );

  return (
    <View style={styles.card}>
      {/* Current Password Field */}
      <Text style={styles.inputLabel}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      {currentPasswordError ? <Text style={styles.errorText}>{currentPasswordError}</Text> : null}

      {/* New Password Field */}
      <Text style={styles.inputLabel}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      {sameAsOldError ? <Text style={styles.errorText}>{sameAsOldError}</Text> : null}

      {/* Real-time Visual Criteria Checklist */}
      <View style={styles.criteriaBlock}>
        {renderCriteriaItem("Minimum 8 characters", criteria.minLength)}
        {renderCriteriaItem("At least one uppercase letter (A-Z)", criteria.hasCapital)}
        {renderCriteriaItem("At least one lowercase letter (a-z)", criteria.hasSmall)}
        {renderCriteriaItem("At least one number (0-9)", criteria.hasNumber)}
        {renderCriteriaItem("At least one special symbol (@, #, $, etc.)", criteria.hasSymbol)}
      </View>

      {/* Confirm New Password Field */}
      <Text style={styles.inputLabel}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Re-enter new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {matchError ? <Text style={styles.errorText}>{matchError}</Text> : null}

      {/* Next Step Action Button */}
      <TouchableOpacity style={styles.btn} onPress={handleNextSubmit}>
        <Text style={styles.btnText}>Next (Verify OTP)</Text>
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
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 4,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  errorText: {
    fontSize: 11,
    color: '#db4437',
    marginBottom: 12,
    fontWeight: '600',
  },
  criteriaBlock: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 4,
    marginVertical: 12,
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  criteriaText: {
    fontSize: 12,
    marginLeft: 6,
  },
  btn: {
    backgroundColor: '#008080',
    paddingY: 14,
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default PasswordInputs;
