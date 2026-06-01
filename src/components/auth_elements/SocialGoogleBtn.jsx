import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function SocialGoogleBtn({ onPress, loading = false, isSignUp = false }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
      style={[styles.googleButtonCapsule, loading && styles.disabledMode]}
    >
      <View style={styles.innerContentWrapper}>
        {/* 🖼️ Premium Larger Logo */}
        <Image 
          source={require('../../../assets/google_logo.png')} 
          style={styles.googleIconImage}
          resizeMode="contain"
        />
        
        {/* 📝 Balanced Text */}
        <Text style={styles.ctaLabelText}>
          {loading 
            ? 'Connecting Safely...' 
            : isSignUp 
              ? 'Sign up with Google' 
              : 'Sign in with Google'
          }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButtonCapsule: {
    width: '82%',               // 📐 Chaudai kam ki taaki button compact capsule lage
    height: 46,                 // Elegant height
    backgroundColor: '#ffffff', 
    borderRadius: 23,           // Perfect rounded curve
    borderWidth: 1,
    borderColor: '#e2e8f0',     
    marginTop: 18,
    alignSelf: 'center',        // Screen ke beech mein lane ke liye
    justifyContent: 'center',   // Items ko vertically center karne ke liye
    elevation: 2,               
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  disabledMode: {
    backgroundColor: '#f8fafc',
    opacity: 0.7,
  },
  innerContentWrapper: {
    flexDirection: 'row',       // Logo aur text ko ek line mein laane ke liye
    alignItems: 'center',       
    justifyContent: 'center',  // Dono ko sath mein center rakhne ke liye
    gap: 12,                    // 🧭 Logo aur text ke beech ka perfect faasla
  },
  googleIconImage: {
    width: 25,                  // Logo ko thoda dominant aur bada kiya
    height: 25,
    marginTop: 1.5,             // 🎯 Height se halka sa niche align karne ke liye
  },
  ctaLabelText: {
    fontSize: 14,
    fontWeight: '600',          
    color: '#1f2937',           
    letterSpacing: 0.1,
  },
});
