import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//  Is sahi line ko lagaiye
import { supabase } from '../config/supabaseClient';


// 📁 Support Elements Components Import
import SearchBar from '../components/support_elements/SearchBar';
import CategoryChips from '../components/support_elements/CategoryChips';
import ActionStrip from '../components/support_elements/ActionStrip';
import FaqAccordion from '../components/support_elements/FaqAccordion';
import QueryResponsesList from '../components/support_elements/QueryResponsesList';
import TicketFormModal from '../components/support_elements/TicketFormModal';

const SupportScreen = ({ navigation }) => {
  // ⚙️ Core States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showResponses, setShowResponses] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTicketsCount, setActiveTicketsCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Lists ko reload karne ke liye

  // 🔄 Active ya Pending Tickets ka count fetch karne ka logic
  useEffect(() => {
    fetchActiveTicketsCount();
  }, [refreshTrigger]);

  const fetchActiveTicketsCount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { count, error } = await supabase
        .from('support_tickets')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'Pending'); // Sirf pending queries ka count dikhayenge

      if (!error) {
        setActiveTicketsCount(count || 0);
      }
    } catch (err) {
      console.error('Count fetch error:', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="#008080" barStyle="light-content" />

      {/* 🔝 Custom Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerAction}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Help & Support Center</Text>
        
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="headset-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 📊 Dynamic Category Chips */}
      <CategoryChips 
        selectedCategory={selectedCategory} 
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setShowResponses(false); // Category badalne par wapas FAQs par switch karein
        }} 
      />

      {/* 🎫 Horizontal Action Strip Row */}
      <ActionStrip 
        onOpenTicketForm={() => setModalVisible(true)}
        onToggleResponses={() => setShowResponses(!showResponses)}
        showResponses={showResponses}
        activeTicketsCount={activeTicketsCount}
      />

      {/* 🔍 Search Module Component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 🔄 Conditional Body Content Section */}
      <View style={styles.bodyContent}>
        {showResponses ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>🎫 Query Responses ({activeTicketsCount} Active)</Text>
            <QueryResponsesList refreshTrigger={refreshTrigger} />
          </View>
        ) : (
          <FaqAccordion selectedCategory={selectedCategory} searchQuery={searchQuery} />
        )}
      </View>

      {/* 📝 Reusable Raised Ticket Form Popup Modal */}
      <TicketFormModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onTicketSubmitted={() => setRefreshTrigger(prev => prev + 1)} // Live count aur list update karein
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  headerAction: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  bodyContent: {
    flex: 1,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default SupportScreen;
