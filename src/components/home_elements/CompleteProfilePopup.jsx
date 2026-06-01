import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

export default function CompleteProfilePopup({ visible, onClose, onNavigate }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* ⬜ Small Square Curved Floating Card */}
        <View style={styles.floatingCard}>
          
          {/* ❌ Top Right Corner Cross Action */}
          <TouchableOpacity 
            activeOpacity={0.6} 
            onPress={onClose} 
            style={styles.closeCrossAnchor}
          >
            <Text style={styles.crossTextIcon}>✕</Text>
          </TouchableOpacity>

          {/* 🎁 Hero Brand Graphic Node */}
          <Text style={styles.bonusEmojiIcon}>🚀🔥</Text>

          {/* 📜 Dynamic Content Locked */}
          <Text style={styles.cardHeaderTitle}>Unlock High-Paying Surveys! 🔓💸</Text>
          
          <Text style={styles.cardMainBodyText}>
            Your profile is missing important match criteria. Complete it now to unlock higher-paying premium surveys and instantly boost your daily earnings!
          </Text>

          {/* 🔵 High-Contrast Primary Call-to-Action Button */}
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={onNavigate}
            style={styles.primaryActionButton}
          >
            <Text style={styles.actionButtonText}>Complete Profile Now 🚀</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // Deep semi-transparent blur wrapper
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  floatingCard: {
    width: '100%',
    maxWidth: 320, 
    backgroundColor: '#ffffff',
    borderRadius: 24, // Clean curved standard corners
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 22,
    alignItems: 'center',
    position: 'relative',
    // Premium structural shadow matrix
    elevation: 10,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  closeCrossAnchor: {
    position: 'absolute',
    top: 14,
    right: 16,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  crossTextIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8', // Subtle grey look for clean skip operation
  },
  bonusEmojiIcon: {
    fontSize: 38,
    marginBottom: 12,
  },
  cardHeaderTitle: {
    fontSize: 17.5,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: 0.1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  cardMainBodyText: {
    fontSize: 12.5,
    color: '#475569',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18.5,
    fontWeight: '500',
    marginBottom: 22,
  },
  primaryActionButton: {
    width: '100%',
    height: 46,
    backgroundColor: '#1a73e8', // High converting brand blue
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionButtonText: {
    fontSize: 13.5,
    color: '#ffffff',
    fontWeight: '850',
    letterSpacing: 0.1,
  },
});
