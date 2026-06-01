import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { supabase } from '../config/supabaseClient';

// 🚀 Clean & Modular Imports
import EmailStep from '../components/auth_elements/forgot_password_elements/EmailStep';
import OtpStep from '../components/auth_elements/forgot_password_elements/OtpStep';
import PasswordStep from '../components/auth_elements/forgot_password_elements/PasswordStep';

export default function ForgotPasswordScreen({ navigation }) {
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 📝 Shared Form States
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 🔄 Step-by-Step Back Navigation Matrix
  const handleGoBack = () => {
    if (stage > 1) {
      setStage(stage - 1);
    } else {
      // 🎯 Fix: Direct router pointer change instead of undefined navigation block
      navigation.replace('auth_screen'); 
    }
  };

  // 📧 STAGE 1: Email Existence Check + Send OTP Logic
  const handleSendOtp = async () => {
    const formattedEmail = email.trim().toLowerCase();
    if (!formattedEmail) {
      Alert.alert('⚠️ Form Error', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      // 🔍 Step A: Database verification to check if the user profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', formattedEmail)
        .maybeSingle();

      if (profileError) throw profileError;

      // 🛑 Checkpoint: Agar account nahi hai toh aage nahi badhne denge
      if (!profileData) {
        Alert.alert(
          '❌ Account Not Found', 
          'This email is not registered with us. Please check the email or create a new account.'
        );
        return;
      }

      // 📩 Step B: If account exists, send the recovery OTP token
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(formattedEmail);
      if (resetError) throw resetError;

      Alert.alert('📩 OTP Sent', 'Verification code has been sent to your email.');
      setStage(2); 
    } catch (err) {
      Alert.alert('❌ Error', err.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  // 🔑 STAGE 2: Verify OTP Logic
  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.trim().length !== 6) {
      Alert.alert('⚠️ Form Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otp.trim(),
        type: 'recovery',
      });
      if (error) throw error;

      setStage(3); 
    } catch (err) {
      Alert.alert('❌ Error', err.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  // 🔒 STAGE 3: Heavy Validation Password Updates
  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('⚠️ Form Error', 'Please fill in both password fields.');
      return;
    }

    // 🛑 Professional Rules Check
    if (password !== confirmPassword) {
      Alert.alert('⚠️ Validation Warning', 'Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('⚠️ Validation Warning', 'Password must be at least 8 characters long for higher security.');
      return;
    }

    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    if (!hasNumber || !hasLetter) {
      Alert.alert('⚠️ Validation Warning', 'Password must contain a mix of both letters and numbers.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;

      // 🔐 Session Wipeout: Log out immediately to destroy temporary tokens
      await supabase.auth.signOut();

      Alert.alert('🎉 Success', 'Password updated successfully! Please login with your new credentials.', [
        {
          text: 'OK',
          onPress: () => navigation.replace('auth_screen'), // 🎯 Redirects cleanly to Login Form
        }
      ]);
    } catch (err) {
      Alert.alert('❌ Error', err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.containerCanvas} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      
      {/* 📋 Dynamic Info Header Block */}
      <View style={styles.dynamicHeaderBlock}>
        <Text style={styles.headerTitleText}>
          {stage === 1 && 'Forgot Password'}
          {stage === 2 && 'Enter OTP'}
          {stage === 3 && 'New Password'}
        </Text>
        <Text style={styles.headerSubtext}>
          {stage === 1 && 'Enter your email to receive a recovery code'}
          {stage === 2 && `We sent a verification code to ${email}`}
          {stage === 3 && 'Create a strong new password for your account'}
        </Text>
      </View>

      {/* 📥 Render Step Components with Repaired Router Handlers */}
      <View style={styles.formCardBox}>
        {stage === 1 && (
          <EmailStep 
            email={email} 
            setEmail={setEmail} 
            onSendOtp={handleSendOtp} 
            onBackToLogin={() => navigation.replace('auth_screen')} // 🎯 Custom stack handler fixed
            loading={loading} 
          />
        )}

        {stage === 2 && (
          <OtpStep 
            otp={otp} 
            setOtp={setOtp} 
            onVerifyOtp={handleVerifyOtp} 
            onPrevStep={handleGoBack}
            onBackToLogin={() => navigation.replace('auth_screen')} // 🎯 Custom stack handler fixed
            loading={loading} 
          />
        )}

        {stage === 3 && (
          <PasswordStep 
            password={password} 
            setPassword={setPassword} 
            confirmPassword={confirmPassword} 
            setConfirmPassword={setConfirmPassword} 
            onUpdatePassword={handleUpdatePassword} 
            onPrevStep={handleGoBack}
            onBackToLogin={() => navigation.replace('auth_screen')} // 🎯 Custom stack handler fixed
            loading={loading} 
          />
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerCanvas: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40 },
  dynamicHeaderBlock: { alignItems: 'center', marginBottom: 35 },
  headerTitleText: { fontSize: 26, fontWeight: '900', color: '#1e293b', letterSpacing: 0.2 },
  headerSubtext: { fontSize: 14, color: '#475569', marginTop: 6, fontWeight: '600', textAlign: 'center', lineHeight: 20 },
  formCardBox: { width: '100%' },
});
