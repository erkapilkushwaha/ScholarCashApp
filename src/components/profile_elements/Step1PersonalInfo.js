import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import * as base64js from 'base64-js';

import { supabase } from '../../config/supabaseClient'; // 🟢 Corrected relative path location lock

const Step1PersonalInfo = ({ initialData, onValidationChange, onDataChange }) => {
  // 👤 Form Local States
  const [fullName, setFullName] = useState('');
  const [mobile, setmobile] = useState(''); 
  const [email, setEmail] = useState('user@scholarcash.com'); 
  const [upiId, setUpiId] = useState(''); 
  const [gender, setGender] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // 🔄 UI Loading States
  const [isUploading, setIsUploading] = useState(false); 

  // 📅 Custom DOB States
  const [birthDate, setBirthDate] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');

  // 🔽 Dropdown Open/Close States
  const [showGenderMenu, setShowGenderMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showMonthMenu, setShowMonthMenu] = useState(false);
  const [showYearMenu, setShowYearMenu] = useState(false);

  // ⚠️ Error States
  const [errors, setErrors] = useState({});

  // 🔄 Sync initialData ONLY when component mounts or initialData updates
  useEffect(() => {
    if (initialData) {
      setFullName(initialData.full_name || '');
      setmobile(initialData.mobile || ''); 
      setEmail(initialData.email || 'user@scholarcash.com');
      setUpiId(initialData.upi_id || '');
      setGender(initialData.gender || '');
      setImageUri(initialData.avatar_url || null);

      if (initialData.dob) {
        const parts = initialData.dob.split('-'); 
        if (parts.length === 3) {
          setBirthYear(parts[0]);
          setBirthMonth(parts[1]);
          setBirthDate(parts[2]);
        }
      }
    }
  }, [initialData?.full_name, initialData?.mobile, initialData?.dob, initialData?.gender, initialData?.upi_id, initialData?.avatar_url]);

  // 🗓️ DOB Dropdown Arrays Setup
  const START_YEAR = 1980;
  const END_YEAR = 2026;
  const yearsList = [];
  for (let i = END_YEAR; i >= START_YEAR; i--) {
    yearsList.push(i.toString());
  }
  const datesList = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const monthsList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  // 📤 Centralized function to dispatch data back to Parent safely
  const dispatchDataUpdate = (updatedFields = {}) => {
    const nextFullName = updatedFields.hasOwnProperty('full_name') ? updatedFields.full_name : fullName;
    const nextMobile = updatedFields.hasOwnProperty('mobile') ? updatedFields.mobile : mobile; 
    const nextGender = updatedFields.hasOwnProperty('gender') ? updatedFields.gender : gender;
    const nextUpiId = updatedFields.hasOwnProperty('upi_id') ? updatedFields.upi_id : upiId;
    const nextImageUri = updatedFields.hasOwnProperty('avatar_url') ? updatedFields.avatar_url : imageUri;
    
    const y = updatedFields.hasOwnProperty('birthYear') ? updatedFields.birthYear : birthYear;
    const m = updatedFields.hasOwnProperty('birthMonth') ? updatedFields.birthMonth : birthMonth;
    const d = updatedFields.hasOwnProperty('birthDate') ? updatedFields.birthDate : birthDate;
    const nextDob = y && m && d ? `${y}-${m}-${d}` : '';

    onDataChange({
      full_name: nextFullName,
      mobile: nextMobile, 
      email: email,
      dob: nextDob,
      gender: nextGender,
      upi_id: nextUpiId,
      avatar_url: nextImageUri
    });
  };

  // 🛡️ Real-time local state side-effect validation framework 
  useEffect(() => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!birthDate || !birthMonth || !birthYear) newErrors.dob = 'Complete Date of Birth is required';
    if (!gender) newErrors.gender = 'Gender selection is required';

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
  }, [fullName, mobile, birthDate, birthMonth, birthYear, gender]);

  // 📸 Safe Base64 Upload Engine Pipeline
  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "ScholarCash needs access to your gallery.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true, // ⚡ Directly request base64 string to bypass fetch/blob local crashes
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      setIsUploading(true);
      const selectedAsset = result.assets[0];

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User session token not verified");

        const fileExtension = selectedAsset.uri.split('.').pop() || 'jpg';
        // 🗓️ Distinct filename with timestamp ensures old files remain in bucket while URL replaces in table
        const filePath = `${user.id}/avatar_${Date.now()}.${fileExtension}`;
        
        // ⚙️ Safe decode base64 buffer directly for storage payload transmission
        const contentType = `image/${fileExtension}`;
        const finalBuffer = base64js.toByteArray(selectedAsset.base64);


        // ⬆️ Push directly to bucket storage logs
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, finalBuffer.buffer, {
            contentType: contentType,
            upsert: true
          });

        if (uploadError) throw uploadError;

        // 🔗 Extract absolute public access URL link
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        setImageUri(publicUrl);
        dispatchDataUpdate({ avatar_url: publicUrl });
        Alert.alert("Success 📸", "Profile photo synced to cloud bucket logs.");
      } catch (uploadError) {
        Alert.alert("Storage Error 🛑", uploadError.message || "Failed to commit media assets.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return 'SC';
    const parts = name.trim().split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase() : `${parts[0][0]}`.toUpperCase();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      
      {/* Profile Photo Container Frame */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatarFrame} onPress={pickImageFromGallery} disabled={isUploading}>
          {isUploading ? (
            <ActivityIndicator size="small" color="#2196F3" />
          ) : imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatarImage} />
          ) : (
            <View style={styles.initialsCircle}>
              <Text style={styles.initialsText}>{getInitials(fullName)}</Text>
            </View>
          )}
          <View style={styles.cameraIconBadge}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.avatarLabel}>{isUploading ? 'Uploading...' : 'Profile Photo'}</Text>
      </View>

      {/* Full Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            value={fullName} 
            onChangeText={(val) => {
              setFullName(val);
              dispatchDataUpdate({ full_name: val }); 
            }} 
            placeholder="Enter your full name" 
          />
        </View>
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
      </View>

      {/* Email Address */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <View style={[styles.inputWrapper, styles.disabledInput]}>
          <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput style={[styles.input, { color: '#999' }]} value={email} editable={false} />
          <Ionicons name="lock-closed" size={16} color="#999" style={{ marginRight: 10 }} />
        </View>
      </View>

      {/* Mobile Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            value={mobile} 
            onChangeText={(val) => {
              setmobile(val);
              dispatchDataUpdate({ mobile: val }); 
            }} 
            keyboardType="numeric" 
            maxLength={10} 
            placeholder="Enter 10-digit number" 
          />
        </View>
        {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
      </View>

      {/* Date of Birth Custom Dropdowns */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.dobRow}>
          <TouchableOpacity style={styles.dobDropdown} onPress={() => { setShowDateMenu(!showDateMenu); setShowMonthMenu(false); setShowYearMenu(false); }}>
            <Text style={styles.dropdownText}>{birthDate || 'Date'}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.dobDropdown} onPress={() => { setShowMonthMenu(!showMonthMenu); setShowDateMenu(false); setShowYearMenu(false); }}>
            <Text style={styles.dropdownText}>{birthMonth || 'Month'}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.dobDropdown} onPress={() => { setShowYearMenu(!showYearMenu); setShowDateMenu(false); setShowMonthMenu(false); }}>
            <Text style={styles.dropdownText}>{birthYear || 'Year'}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {showDateMenu && (
          <View style={styles.listDropdownContainer}>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 150 }}>
              {datesList.map((d) => (
                <TouchableOpacity key={d} style={styles.menuItem} onPress={() => { setBirthDate(d); setShowDateMenu(false); dispatchDataUpdate({ birthDate: d }); }}>
                  <Text style={styles.itemText}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {showMonthMenu && (
          <View style={styles.listDropdownContainer}>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 150 }}>
              {monthsList.map((m) => (
                <TouchableOpacity key={m} style={styles.menuItem} onPress={() => { setBirthMonth(m); setShowMonthMenu(false); dispatchDataUpdate({ birthMonth: m }); }}>
                  <Text style={styles.itemText}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {showYearMenu && (
          <View style={styles.listDropdownContainer}>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 150 }}>
              {yearsList.map((y) => (
                <TouchableOpacity key={y} style={styles.menuItem} onPress={() => { setBirthYear(y); setShowYearMenu(false); dispatchDataUpdate({ birthYear: y }); }}>
                  <Text style={styles.itemText}>{y}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
      </View>

      {/* Gender Custom Dropdown */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity style={styles.inputWrapper} onPress={() => { setShowGenderMenu(!showGenderMenu); setShowDateMenu(false); setShowMonthMenu(false); setShowYearMenu(false); }}>
          <Ionicons name="male-female-outline" size={20} color="#666" style={styles.inputIcon} />
          <Text style={[styles.input, { paddingTop: 12 }]}>{gender || 'Select Gender'}</Text>
          <Ionicons name="chevron-down" size={18} color="#666" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        {showGenderMenu && (
          <View style={styles.customMenu}>
            {genderOptions.map((opt) => (
              <TouchableOpacity key={opt} style={styles.menuItem} onPress={() => { setGender(opt); setShowGenderMenu(false); dispatchDataUpdate({ gender: opt }); }}>
                <Text style={styles.itemText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      </View>

      {/* UPI ID */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>UPI ID (Optional)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="card-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            value={upiId} 
            onChangeText={(val) => {
              setUpiId(val);
              dispatchDataUpdate({ upi_id: val }); 
            }}
            placeholder="e.g., username@upi" 
            autoCapitalize="none" 
          />
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },
  avatarContainer: { alignItems: 'center', marginVertical: 20 },
  avatarFrame: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  initialsCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center' },
  initialsText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  cameraIconBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#2196F3', padding: 5, borderRadius: 12, borderWidth: 1.5, borderColor: '#fff' },
  avatarLabel: { marginTop: 6, fontSize: 13, color: '#666', fontWeight: '500' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, height: 45, backgroundColor: '#FAFAFA' },
  disabledInput: { backgroundColor: '#EEEEEE', borderColor: '#DDD' },
  inputIcon: { paddingHorizontal: 12 },
  input: { flex: 1, fontSize: 14, color: '#333', height: '100%' },
  dobRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  dobDropdown: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, height: 45, paddingHorizontal: 12, backgroundColor: '#FAFAFA' },
  dropdownText: { fontSize: 14, color: '#333' },
  listDropdownContainer: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, backgroundColor: '#fff', marginTop: 5, padding: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  customMenu: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, backgroundColor: '#fff', marginTop: 5, padding: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  menuItem: { paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
  itemText: { fontSize: 14, color: '#333' },
  errorText: { color: '#D32F2F', fontSize: 11, marginTop: 3, marginLeft: 2 }
});

export default Step1PersonalInfo;
