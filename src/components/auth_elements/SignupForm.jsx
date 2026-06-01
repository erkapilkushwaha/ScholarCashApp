import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthInput from './AuthInput'; // 🎯 Same folder se direct import

export default function SignupForm({
  fullName, setFullName,
  email, setEmail,
  mobile, setMobile,
  password, setPassword,
  confirmPassword, setConfirmPassword
}) {
  
  // 🔐 Password match check karne ka validation logic
  const isPasswordMatching = password === confirmPassword;

  return (
    <View style={styles.formContainer}>
      {/* 👤 Username Input */}
      <AuthInput 
        label="Enter Your Username" 
        placeholder="e.g., Kapil Kushwaha" 
        value={fullName}
        onChangeText={setFullName}
      />

      {/* 📧 Email Input */}
      <AuthInput 
        label="Enter Your Email" 
        placeholder="example@gmail.com" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* 📱 Phone Number Input */}
      <AuthInput 
        label="Enter Your Phone Number" 
        placeholder="10-digit mobile number" 
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
        maxLength={10}
      />

      {/* 🔒 Create Password Input */}
      <AuthInput 
        label="Create Password" 
        placeholder="••••••••" 
        value={password}
        onChangeText={setPassword}
        isPassword={true}
      />

      {/* 🔄 Confirm Password Input */}
      <AuthInput 
        label="Confirm Password" 
        placeholder="••••••••" 
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword={true}
      />

      {/* 🛑 Dynamic Error Feedback Text */}
      {confirmPassword.length > 0 && !isPasswordMatching && (
        <Text style={styles.errorTextFeedback}>⚠️ Passwords do not match.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  errorTextFeedback: {
    color: '#ef4444', // 🔴 Warning Red Color
    fontSize: 12,
    fontWeight: '600',
    marginTop: -8,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
});
