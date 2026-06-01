import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function LegalAcceptanceCheckbox({ isAccepted, setIsAccepted, navigation }) {
  return (
    <View style={styles.container}>
      {/* 🔲 Standard Checkbox */}
      <Checkbox
        style={styles.checkbox}
        value={isAccepted}
        onValueChange={setIsAccepted}
        color={isAccepted ? '#4CAF50' : undefined}
      />

      {/* 📋 Interactive Text Flow */}
      <View style={styles.textWrapper}>
        <Text style={styles.normalText}>I agree to the </Text>
        
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>

        <Text style={styles.normalText}>, </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('TermsConditionsScreen')}>
          <Text style={styles.linkText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <Text style={styles.normalText}>, and </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AboutUsScreen')}>
          <Text style={styles.linkText}>About Us</Text>
        </TouchableOpacity>

        <Text style={styles.normalText}> of ScholarCash.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 4,
    marginVertical: 15,
    paddingRight: 20,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
    borderRadius: 4,
    height: 22,
    width: 22,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  normalText: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 20,
  },
  linkText: {
    fontSize: 13,
    color: '#1a73e8',
    fontWeight: '700',
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});
