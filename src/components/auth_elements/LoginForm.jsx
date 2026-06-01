import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthInput from './AuthInput'; // 🎯 Same folder mein hai toh direct import

export default function LoginForm({ email, setEmail, password, setPassword, onForgotPassword }) {
  return (
    <View style={styles.formContainer}>
      {/* 📧 Username / Email Input */}
      <AuthInput 
        label="Enter Your Username / Email" 
        placeholder="example@gmail.com" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* 🔒 Password Input */}
      <AuthInput 
        label="Enter Your Password" 
        placeholder="••••••••" 
        value={password}
        onChangeText={setPassword}
        isPassword={true}
      />

      {/* 🔗 Forgot Password Link */}
      <TouchableOpacity 
        activeOpacity={0.6} 
        style={styles.forgotPasswordWrapper}
        onPress={onForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  forgotPasswordWrapper: {
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 20,
    padding: 4,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: '#1a73e8',
    fontWeight: '700',
  },
});
