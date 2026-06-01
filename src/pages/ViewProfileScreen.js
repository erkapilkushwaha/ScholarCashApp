import React, { useState, useEffect } from 'react'; // ✨ useFocusEffect hata kar useEffect aur useState rakha h
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabaseClient'; // 🌐 Real Supabase Connection

const ViewProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fresh Profile Data from Supabase using Standard React useEffect Hook
  useEffect(() => {
    let isActive = true;

    const fetchLatestProfile = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User session not found");

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (isActive) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchLatestProfile();

    return () => {
      isActive = false; // Cleanup to avoid state updates on unmounted component
    };
  }, []); // Runs safely on component mount

  // 📝 Navigation Helper to Edit specific steps
  const handleEditSection = (stepNumber) => {
    navigation.navigate('CompleteProfileScreen', {
      targetStep: stepNumber,
      fromViewProfile: true
    });
  };

  // 🔤 Initials Generator Fallback
  const getInitials = (name) => {
    if (!name) return 'SC';
    const parts = name.trim().split(' ');
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase() : `${parts[0][0]}`.toUpperCase();
  };

  // 🧱 Helper Component to render Label-Value rows smoothly
  const DataRow = ({ label, value }) => (
    <View style={styles.dataRow}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, !value && styles.emptyValue]}>
        {value || '— (Not Provided)'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loaderText}>Loading your secure profile log...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.masterContainer}>
      {/* 🔝 Static Custom Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* 👤 Top Avatar Card Module */}
<View style={styles.avatarCard}>
  
  {profile?.avatar_url ? (
    // 📸 Live Profile Photo block
    <Image source={{ uri: profile.avatar_url }} style={styles.avatarImage} />
  ) : (
    // 🔤 Fallback Initials Circle
    <View style={styles.initialsCircle}>
      <Text style={styles.initialsText}>{getInitials(profile?.full_name)}</Text>
    </View>
  )}

  <Text style={styles.userName}>{profile?.full_name || 'ScholarCash User'}</Text>
  <Text style={styles.userEmail}>{profile?.email || 'user@scholarcash.com'}</Text>
</View>


        {/* 💳 Section 1: Personal Details */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="person-outline" size={20} color="#2196F3" />
              <Text style={styles.sectionTitle}>Personal Details</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEditSection(1)}>
              <Text style={styles.editButtonText}>Edit</Text>
              <Ionicons name="pencil" size={14} color="#2196F3" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardBody}>
            <DataRow label="Full Name" value={profile?.full_name} />
            <DataRow label="Email Address" value={profile?.email} />
            <DataRow label="Mobile Number" value={profile?.mobile} />
            <DataRow label="Date of Birth" value={profile?.dob} />
            <DataRow label="Gender" value={profile?.gender} />
            <DataRow label="UPI ID" value={profile?.upi_id} />
          </View>
        </View>

        {/* 🎓 Section 2: Academic & Income */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="school-outline" size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Academic & Income</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEditSection(2)}>
              <Text style={styles.editButtonText}>Edit</Text>
              <Ionicons name="pencil" size={14} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardBody}>
            <DataRow label="Education Level" value={profile?.education_level} />
            <DataRow label="Annual Family Income" value={profile?.annual_income} />
          </View>
        </View>

        {/* 💼 Section 3: Work & Family */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="briefcase-outline" size={20} color="#FF9800" />
              <Text style={styles.sectionTitle}>Work & Family</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEditSection(3)}>
              <Text style={styles.editButtonText}>Edit</Text>
              <Ionicons name="pencil" size={14} color="#FF9800" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardBody}>
            <DataRow label="Employment Status" value={profile?.employment_status} />
            <DataRow label="Family Members Count" value={profile?.family_members} />
          </View>
        </View>

        {/* 📍 Section 4: Address Logs */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="location-outline" size={20} color="#E91E63" />
              <Text style={styles.sectionTitle}>Address Logs</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEditSection(4)}>
              <Text style={styles.editButtonText}>Edit</Text>
              <Ionicons name="pencil" size={14} color="#E91E63" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardBody}>
            <DataRow label="Country" value={profile?.country} />
            <DataRow label="Pincode" value={profile?.pincode} />
            <DataRow label="State" value={profile?.state} />
            <DataRow label="City / District" value={profile?.city} />
            <DataRow label="Area Type" value={profile?.area_type} />
            <DataRow label="House Details" value={profile?.house_details} />
            <DataRow label="Locality / Street" value={profile?.locality} />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: { flex: 1, backgroundColor: '#F8F9FA' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loaderText: { marginTop: 10, fontSize: 14, color: '#666' },
  headerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, paddingHorizontal: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  scrollContainer: { flex: 1, paddingHorizontal: 15 },
  avatarImage: {
  width: 80,
  height: 80,
  borderRadius: 40,
  marginBottom: 10,
},

  initialsCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  initialsText: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 13, color: '#666', marginTop: 2 },
  sectionCard: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 15, overflow: 'hidden' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', backgroundColor: '#FAFAFA' },
  titleWithIcon: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  editButton: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  editButtonText: { fontSize: 13, fontWeight: '500', color: '#2196F3' },
  cardBody: { paddingHorizontal: 15, paddingVertical: 5 },
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
  rowLabel: { fontSize: 13, color: '#666', fontWeight: '500' },
  rowValue: { fontSize: 13, color: '#333', fontWeight: 'bold', textAlign: 'right', flex: 1, marginLeft: 20 },
  emptyValue: { color: '#999', fontWeight: 'normal' }
});

export default ViewProfileScreen;
