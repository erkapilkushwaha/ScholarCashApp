import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, LayoutAnimation, Platform, UIManager, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabaseClient';


// Android par animation smooth chalne ke liye configuration
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// 🔽 Individual Accordion Item Component
const AccordionItem = ({ item, isOpen, onPress }) => {
  return (
    <View style={styles.itemContainer}>
      {/* ❓ Question Row */}
      <TouchableOpacity style={styles.questionRow} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.questionText}>{item.question}</Text>
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={18} 
          color={isOpen ? "#008080" : "#666"} 
        />
      </TouchableOpacity>

      {/* 💡 Answer Box (Sirf tab dikhega jab item open hoga) */}
      {isOpen && (
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
};

// 📋 Main Accordion List Component
const FaqAccordion = ({ selectedCategory, searchQuery }) => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // Konsa sawal khula hai uski ID track karne ke liye

  useEffect(() => {
    fetchFaqs();
  }, []);

  // 🔄 Filter Logic: Jab bhi category ya search query badlegi
  useEffect(() => {
    let result = faqs;

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(faq => faq.category === selectedCategory);
    }

    // 2. Search Text Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }

    setFilteredFaqs(result);
  }, [selectedCategory, searchQuery, faqs]);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      // Priority order ke hisab se FAQs fetch karna
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('priority_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
      setFilteredFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (id) => {
    // Smooth transition toggle animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedId === id) {
      setExpandedId(null); // Dobara click karne par band ho jaye
    } else {
      setExpandedId(id); // Naya sawal khole
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#008080" style={{ marginTop: 20 }} />;
  }

  if (filteredFaqs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No matching FAQs found. 🔍</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredFaqs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <AccordionItem
          item={item}
          isOpen={expandedId === item.id}
          onPress={() => handlePress(item.id)}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eef2f2',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    paddingRight: 10,
    lineHeight: 20,
  },
  answerRow: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
    backgroundColor: '#fafcfc',
    borderTopWidth: 1,
    borderTopColor: '#f4f8f8',
  },
  answerText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    color: '#777',
    fontSize: 14,
  },
});

export default FaqAccordion;
