import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { supabase } from '../config/supabaseClient';

// 🚀 Reusable Elements Imported
import LoginForm from '../components/auth_elements/LoginForm';
import SignupForm from '../components/auth_elements/SignupForm';
import SocialGoogleBtn from '../components/auth_elements/SocialGoogleBtn';

// 🆕 Naye Auth Elements Import Kiye
import LegalAcceptanceCheckbox from '../components/auth_elements/LegalAcceptanceCheckbox';
import AuthHeaderMenu from '../components/auth_elements/AuthHeaderMenu';

export default function AuthScreen({ navigation }) {
  // 🔄 Mode Toggle State: true = Signup, false = Login
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🆕 Checkbox Acceptance State
  const [isAccepted, setIsAccepted] = useState(false);

  // 📝 Input Fields State Models
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 🔐 Form Validation Matrix
  const isPasswordMatching = password === confirmPassword;
  
  // 🆕 Validation Logic Update
  const isFormInvalidForSignup = isSignUp && (!password || !confirmPassword || !isPasswordMatching || !isAccepted);

  // ⚡ Submission Execution Layer
  const handleAuthAction = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('⚠️ Form Error', 'Please enter your email and password.');
      return;
    }

    if (isSignUp) {
      if (!fullName.trim() || !mobile.trim()) {
        Alert.alert('⚠️ Form Error', 'Username and Phone Number are required.');
        return;
      }
      if (mobile.trim().length !== 10) {
        Alert.alert('⚠️ Validation Warning', 'Phone number must be exactly 10 digits.');
        return;
      }
      if (!isAccepted) {
        Alert.alert('⚠️ Legal Acceptance', 'Please accept the Terms and Privacy Policy to proceed.');
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password: password,
          options: {
            data: { full_name: fullName.trim(), phone_number: mobile.trim() }
          }
        });
        if (error) throw error;
        if (data) {
          navigation.navigate('OtpVerification', { fullName, email, mobile, password });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password: password,
        });
        if (error) throw error;
        if (data?.user) {
          Alert.alert('🎉 Success', 'Welcome back to ScholarCash!');
          navigation.replace('Home');
        }
      }
    } catch (err) {
      Alert.alert('❌ Error', err.message || 'Authentication failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.masterCanvas}>
      
      {/* 🆕 Fixed Top Action Row: Isse Three-Dot upar isolated rahega aur touch block nahi hoga */}
      <View style={styles.topHeaderActionRow}>
        <View style={styles.logoSlotLeft}>
          <Image source={require('../../assets/app_logo.png')} style={styles.miniAppLogoRow} resizeMode="contain" />
        </View>
        <AuthHeaderMenu navigation={navigation} />
      </View>

      <ScrollView style={styles.containerCanvas} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 📋 Dynamic Header Area */}
        <View style={styles.dynamicHeaderBlock}>
          <Text style={styles.headerTitleText}>{isSignUp ? 'Create Account' : 'Login'}</Text>
          <Text style={styles.headerSubtext}>{isSignUp ? 'Create your profile to start earning' : 'Welcome back!'}</Text>
        </View>

        {/* 🔄 Mode Selection Tab Segment Bar */}
        <View style={styles.tabToggleContainer}>
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={() => setIsSignUp(false)} 
            style={[styles.tabButtonElement, !isSignUp && styles.activeTabHighlight]}
          >
            <Text style={[styles.tabButtonLabel, !isSignUp && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={() => setIsSignUp(true)} 
            style={[styles.tabButtonElement, isSignUp && styles.activeTabHighlight]}
          >
            <Text style={[styles.tabButtonLabel, isSignUp && styles.activeTabText]}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* 📥 Content Core Box */}
        <View style={styles.formCardBox}>
          
          {/* Conditionally Calling Custom Sub-Forms */}
          {isSignUp ? (
            <SignupForm 
              fullName={fullName} setFullName={setFullName}
              email={email} setEmail={setEmail}
              mobile={mobile} setMobile={setMobile}
              password={password} setPassword={setPassword}
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
            />
          ) : (
            <LoginForm 
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              onForgotPassword={() => navigation.navigate('ForgotPassword')}
            />
          )}

          {/* 🆕 Legal Acceptance Checkbox (Sirf Signup mode mein button se thik pehle dikhega) */}
          {isSignUp && (
            <LegalAcceptanceCheckbox 
              isAccepted={isAccepted} 
              setIsAccepted={setIsAccepted} 
              navigation={navigation} 
            />
          )}

          {/* 🔵 Core Action Button */}
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={handleAuthAction}
            disabled={loading || isFormInvalidForSignup}
            style={[styles.primaryActionButton, (loading || isFormInvalidForSignup) && styles.disabledButton]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.actionBtnText}>{isSignUp ? 'Signup' : 'Login'}</Text>
            )}
          </TouchableOpacity>

          {/* 🔗 Footer Switcher Dynamic Row */}
          <View style={styles.footerToggleRow}>
            <Text style={styles.footerLabelHint}>{isSignUp ? 'Already have an account? ' : "Don’t have an account? "}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.footerActionLinkText}>{isSignUp ? 'Login' : 'Signup'}</Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 Symmetric Boundary Divider */}
          <View style={styles.dividerComponentLineRow}>
            <View style={styles.horizontalPipe} />
            <Text style={styles.dividerMiddleText}>Or</Text>
            <View style={styles.horizontalPipe} />
          </View>

          {/* 📲 Google Custom Capsule Button */}
          <SocialGoogleBtn onPress={() => Alert.alert('Google Action Triggered')} loading={loading} isSignUp={isSignUp} />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  masterCanvas: { flex: 1, backgroundColor: '#ffffff' },
  containerCanvas: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 40 },
  
  // 🆕 Naya Structural Layout Row Styles
  topHeaderActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 45, // Device notch space allocation
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  logoSlotLeft: { justifyContent: 'center', alignItems: 'center' },
  miniAppLogoRow: { width: 45, height: 45 },

  dynamicHeaderBlock: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  headerTitleText: { fontSize: 24, fontWeight: '900', color: '#1e293b' },
  headerSubtext: { fontSize: 14, color: '#475569', marginTop: 4, fontWeight: '600' },
  tabToggleContainer: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 14, padding: 4, marginBottom: 24, height: 46 },
  tabButtonElement: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  activeTabHighlight: { backgroundColor: '#ffffff', elevation: 1 },
  tabButtonLabel: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  activeTabText: { color: '#1e293b', fontWeight: '800' },
  formCardBox: { width: '100%' },
  primaryActionButton: { width: '100%', height: 48, backgroundColor: '#1a73e8', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  disabledButton: { backgroundColor: '#cbd5e1' },
  actionBtnText: { fontSize: 15, color: '#ffffff', fontWeight: '800' },
  footerToggleRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 22 },
  footerLabelHint: { fontSize: 13, color: '#1e293b', fontWeight: '600' },
  footerActionLinkText: { fontSize: 13, color: '#1a73e8', fontWeight: '800' },
  dividerComponentLineRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 22 },
  horizontalPipe: { flex: 1, height: 1, backgroundColor: '#cbd5e1' },
  dividerMiddleText: { fontSize: 12, fontWeight: '600', color: '#64748b', marginHorizontal: 12 },
});
