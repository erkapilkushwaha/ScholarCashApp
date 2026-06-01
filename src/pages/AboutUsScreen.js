import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//  Is sahi line ko lagaiye
import { supabase } from '../config/supabaseClient';


const AboutUsScreen = ({ navigation }) => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  const fetchAboutUsData = async () => {
    try {
      setLoading(true);
      // priority_order ke mutabik data fetch karein taaki humara mission aur info sahi sequence me dikhe
      const { data, error } = await supabase
        .from('about_us')
        .select('section_title, section_content')
        .order('priority_order', { ascending: true });

      if (error) throw error;
      setAboutData(data || []);
    } catch (error) {
      console.error('Error fetching About Us data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 📝 About Us Card Layout (A4 Sheet Document Feel)
  const renderAboutSection = ({ item }) => (
    <View style={styles.documentCard}>
      <Text style={styles.sectionHeading}>{item.section_title}</Text>
      <View style={styles.divider} />
      <Text style={styles.sectionBody}>{item.section_content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#008080" barStyle="light-content" />

      {/* 🔝 Professional Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#008080" />
        </View>
      ) : (
        <FlatList
          data={aboutData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderAboutSection}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={true}
          ListHeaderComponent={
            <View style={styles.docHeader}>
              <Text style={styles.docMainTitle}>ABOUT SCHOLARCASH</Text>
              <Text style={styles.docSubTitle}>Empowering Students & Youth</Text>
              <Text style={styles.docNotice}>
                Welcome to ScholarCash. Discover our journey, our clear mission, and how we are building a rewarding ecosystem for everyone.
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
    backgroundColor: '#f5f7f8', // Off-white clean background
  },
  headerBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#008080', // App primary theme color
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
    fontSize: 14,
    color: '#008080',
    marginTop: 6,
    fontWeight: '600',
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
    borderRadius: 4, // Clean official document look
    padding: 20,
    marginBottom: 16,
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
    color: '#008080',
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
    lineHeight: 22, // Better text spacing for formal reading
    textAlign: 'justify', // Executive layout alignment
  },
});

export default AboutUsScreen;
