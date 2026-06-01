import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function AuthInput({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType = 'default', 
  isPassword = false,
  maxLength
}) {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.inputContainer}>
      {/* 🏷️ Field Label */}
      <Text style={styles.inputLabel}>{label}</Text>
      
      {/* 📥 Input Wrapper Box */}
      <View style={styles.fieldWrapper}>
        <TextInput
          style={styles.textInputBody}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureText}
          maxLength={maxLength}
          autoCapitalize="none"
        />

        {/* 👁️ Password Toggle Button */}
        {isPassword && (
          <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeIconButton}
          >
            <Text style={styles.eyeIconText}>
              {secureText ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 🔒 Password Strength Helper Instruction Line */}
      {isPassword && (
        <Text style={styles.passwordGuideline}>
          Password must be at least 8 characters with letters & numbers.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
  },
  fieldWrapper: {
    width: '100%',
    height: 48,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  textInputBody: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  eyeIconButton: {
    padding: 6,
  },
  eyeIconText: {
    fontSize: 16,
  },
  passwordGuideline: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 5,
    fontWeight: '500',
    paddingHorizontal: 2,
  },
});
