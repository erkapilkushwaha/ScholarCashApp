import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabaseClient';
import DeleteAccountNotice from '../components/settings_elements/DeleteAccountNotice';

const DeleteAccountScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // 🔌 State containers for asynchronous user data allocation
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  // 🛡️ Safe initialization effect hook block for fetching user data in Supabase v2
  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserEmail(user.email || '');
          setUserId(user.id || '');
        }
      } catch (err) {
        console.log("Error extracting active user context:", err.message);
      }
    };
    fetchActiveUser();
  }, []);

  // 🔒 Open Password Re-Authentication Modal
  const handleProceedToVerify = () => {
    setErrorMessage('');
    setPassword('');
    setIsModalVisible(true);
  };

  // ⚙️ Final Account Deletion Logic
  const handleDeleteConfirm = async () => {
    if (!password) {
      setErrorMessage('Please enter your password to proceed.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      // 1. Re-authenticate user with password before deleting (v2 standard configuration)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: password,
      });

      if (signInError) {
        setErrorMessage('Incorrect password. Authentication failed.');
        setLoading(false);
        return;
      }

      // 2. Clear user data from profiles/earnings table (Data Wipe)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        setErrorMessage(`Database Error: ${profileError.message}`);
        setLoading(false);
        return;
      }

      // 3. Delete user from Supabase Auth via safe backend RPC trigger mapping
      const { error: deleteAuthError } = await supabase.rpc('delete_user_account');

      if (deleteAuthError) {
        setErrorMessage(`Auth Error: ${deleteAuthError.message}`);
        setLoading(false);
        return;
      }

      // 4. Close Modal and Sign Out session
      setIsModalVisible(false);
      await supabase.auth.signOut();

      // 5. Final Alert and Reset Navigation to AuthScreen
      Alert.alert(
        "Account Deleted",
        "Your ScholarCash account and all associated data have been permanently removed.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'AuthScreen' }], 
              });
            }
          }
        ]
      );

    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
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
        <Text style={styles.headerTitle}>Delete Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Render Warning Notice Component */}
        <DeleteAccountNotice onProceed={handleProceedToVerify} />
      </View>

      {/* 🔐 Password Re-Authentication Modal (Popup) */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          if (!loading) setIsModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Security Check</Text>
            <Text style={styles.modalSubtitle}>
              Please enter your current password to confirm that you own this account.
            </Text>

            <TextInput
              style={styles.passwordInput}
              secureTextEntry
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              placeholderTextColor="#999"
            />

            {errorMessage ? <Text style={styles.modalError}>{errorMessage}</Text> : null}

            {/* Action Layout Buttons */}
            <View style={styles.modalActionRow}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]} 
                onPress={() => setIsModalVisible(false)}
                disabled={loading}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalBtn, styles.confirmBtn]} 
                onPress={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.confirmBtnText}>Delete Permanently</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    marginBottom: 16,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fafafa',
    padding: 10,
    borderRadius: 4,
    fontSize: 14,
    color: '#1a1a1a',
  },
  modalError: {
    fontSize: 11,
    color: '#db4437',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: '#f5f7f8',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelBtnText: {
    color: '#555',
    fontWeight: '700',
    fontSize: 14,
  },
  confirmBtn: {
    backgroundColor: '#db4437',
    marginLeft: 8,
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default DeleteAccountScreen;
