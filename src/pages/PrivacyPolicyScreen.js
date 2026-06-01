import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//  Is sahi line ko lagaiye
import { supabase } from '../config/supabaseClient';


const PrivacyPolicyScreen = ({ navigation }) => {
  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      setLoading(true);
      // priority_order ke hisab se data fetch karein taaki section 1, 2, 3 sequence me aayein
      const { data, error } = await supabase
        .from('privacy_policies')
        .select('section_title, section_content')
        .order('priority_order', { ascending: true });

      if (error) throw error;
      setPolicyData(data || []);
    } catch (error) {
      console.error('Error fetching privacy policy:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 📝 Har ek section card ko render karne ka logic (A4 Document Feel)
  const renderPolicySection = ({ item }) => (
    <View style={styles.documentCard}>
      <Text style={styles.sectionHeading}>{item.section_title}</Text>
      <View style={styles.divider} />
      <Text style={styles.sectionBody}>{item.section_content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#008080" barStyle="light-content" />

      {/* 🔝 Professional Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#008080" />
        </View>
      ) : (
        <FlatList
          data={policyData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPolicySection}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={true} // Professional reader me scrollbar dikhna chahiye
          ListHeaderComponent={
            <View style={styles.docHeader}>
              <Text style={styles.docMainTitle}>SCHOLARCASH PRIVACY POLICY</Text>
              <Text style={styles.docSubTitle}>Last Updated: May 2026</Text>
              <Text style={styles.docNotice}>
                Please read this privacy policy carefully to understand how we handle, protect, and respect your personal data.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8', // Subtle off-white background taaki white document alag se highlight ho
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  docHeader: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  docMainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  docSubTitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
    fontStyle: 'italic',
  },
  docNotice: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18,
    backgroundColor: '#e6f2f2',
    padding: 10,
    borderRadius: 6,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 4, // Formal A4 sheet look ke liye minimal radius
    padding: 20,
    marginBottom: 16,
    // Soft shadow jo paper lift effect deti hai
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eef0f2',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#008080', // Theme color for active tracking
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#e6f2f2',
    marginVertical: 10,
  },
  sectionBody: {
    fontSize: 13,
    color: '#333',
    lineHeight: 22, // High line-height professional reading ke liye behad zaroori hai
    textAlign: 'justify', // A4 legal look
  },
});

export default PrivacyPolicyScreen;
