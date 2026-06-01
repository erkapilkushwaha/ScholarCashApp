import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Loader/Dropdown ke liye picker package
import { supabase } from '../../config/supabaseClient';


const TicketFormModal = ({ visible, onClose, onTicketSubmitted }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔄 Fetch Unique Categories from FAQs table for Dropdown
  useEffect(() => {
    if (visible) {
      fetchCategories();
    }
  }, [visible]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const { data, error } = await supabase.from('faqs').select('category');
      if (error) throw error;

      if (data) {
        const uniqueCats = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCats);
        if (uniqueCats.length > 0) {
          setSelectedCategory(uniqueCats[0]); // Default first category select hogi
        }
      }
    } catch (error) {
      console.error('Error loading form categories:', error.message);
    } finally {
      setLoadingCategories(false);
    }
  };

  // 📥 Insert Ticket to Supabase
  const handleSubmitTicket = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please describe your problem before submitting.');
      return;
    }

    try {
      setSubmitting(true);

      // Current Logged-in User ki ID nikalna
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User session not found.');

      const { data, error } = await supabase
        .from('support_tickets')
        .insert([
          {
            user_id: user.id,
            issue_type: selectedCategory,
            description: description.trim(),
            status: 'Pending' // Default status setting
          }
        ])
        .select();

      if (error) throw error;

      Alert.alert('Success ✅', 'Your query has been registered. Support team will reply soon.');
      
      setDescription(''); // Form clear karein
      onClose(); // Modal band karein
      
      if (onTicketSubmitted) {
        onTicketSubmitted(); // Parent screen ko update notification bhejein
      }
    } catch (error) {
      Alert.alert('Submission Failed', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          
          {/* 🔝 Header Module */}
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>Need More Help? 📝</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* 📥 Category Picker Loader */}
          <Text style={styles.inputLabel}>Select Issue Category</Text>
          <View style={styles.pickerWrapper}>
            {loadingCategories ? (
              <ActivityIndicator size="small" color="#008080" style={{ padding: 10 }} />
            ) : (
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                {categories.map((cat, idx) => (
                  <Picker.Item key={idx} label={cat} value={cat} />
                ))}
              </Picker>
            )}
          </View>

          {/* 📝 Description Form Field */}
          <Text style={styles.inputLabel}>Describe Your Issue</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={5}
            placeholder="Apni pareshani yahan detail me likhein..."
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />

          {/* 🔘 Action Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, submitting && styles.disabledButton]} 
            onPress={handleSubmitTicket}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Query</Text>
            )}
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
    marginTop: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    height: 120,
    marginBottom: 25,
  },
  submitButton: {
    backgroundColor: '#008080',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#a0d2d2',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketFormModal;
