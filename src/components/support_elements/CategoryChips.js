import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../config/supabaseClient';


const CategoryChips = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Supabase se sirf category column fetch kar rahe hain
      const { data, error } = await supabase
        .from('faqs')
        .select('category');

      if (error) throw error;

      if (data) {
        // Duplicate categories ko hatane ke liye Set ka use kiya hai
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#008080" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* Default 'All FAQs' Pill */}
        <TouchableOpacity
          style={[
            styles.chip,
            styles.defaultChip,
            (!selectedCategory || selectedCategory === 'All') && styles.activeChip
          ]}
          onPress={() => onSelectCategory('All')}
        >
          <Text style={[
            styles.chipText,
            (!selectedCategory || selectedCategory === 'All') && styles.activeChipText
          ]}>
            All FAQs
          </Text>
        </TouchableOpacity>

        {/* Dynamic Database Categories */}
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.chip, isSelected && styles.activeChip]}
              onPress={() => onSelectCategory(category)}
            >
              <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                {category}
              </Text>
              {isSelected && (
                <TouchableOpacity onPress={() => onSelectCategory('All')} style={styles.crossButton}>
                  <Text style={styles.crossText}> ❌</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        })}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 50,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  loaderContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  defaultChip: {
    borderColor: '#008080',
  },
  activeChip: {
    backgroundColor: '#008080',
    borderColor: '#008080',
  },
  chipText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  activeChipText: {
    color: '#fff',
  },
  crossButton: {
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossText: {
    fontSize: 10,
    color: '#fff',
  },
});

export default CategoryChips;
