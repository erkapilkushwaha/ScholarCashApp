import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabaseClient';
import PasswordInputs from '../components/settings_elements/change_password/PasswordInputs';

const ChangePasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [userEmail, setUserEmail] = useState(''); 

  // 🛡️ Fetch active user email on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  // ⚙️ Core Password Update Execution Engine
  const executePasswordUpdate = async (newPassword) => {
    try {
      setLoading(true);
      
      // 1. Update user password securely inside the active authenticated session
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // 2. Success Alert and Dynamic Logout Redirect Matrix
      Alert.alert(
        "Password Changed",
        "Your password has been updated successfully. Please login again with your new password.",
        [
          {
            text: "OK",
            onPress: async () => {
              await supabase.auth.signOut(); 
              navigation.reset({
                index: 0,
                routes: [{ name: 'AuthScreen' }], 
              });
            }
          }
        ]
      );

    } catch (err) {
      setError('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ➡️ Handle Step Verification & Confirmation Popup
  const handleNextStep = async (data) => {
    try {
      setLoading(true);
      setError('');
      setCurrentPasswordError('');

      // 1. Re-authenticate current user status via signInWithPassword check
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: data.currentPassword,
      });

      if (signInError) {
        setCurrentPasswordError('Incorrect current password');
        return;
      }

      // 2. 💬 Render Clean Native Confirmation Popup before applying data state
      Alert.alert(
        "Confirm Action",
        "Are you sure you want to change your password?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Yes, Change",
            onPress: () => executePasswordUpdate(data.newPassword) // Execute background update on confirm
          }
        ]
      );

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#008080" barStyle="light-content" />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Render Single-Screen Main Password Forms Component directly */}
        <PasswordInputs 
          onNext={handleNextStep} 
          currentPasswordError={currentPasswordError} 
        />

        {error ? <Text style={styles.generalError}>⚠️ {error}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  headerBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 4,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  generalError: {
    color: '#db4437',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '600',
  }
});

export default ChangePasswordScreen;
