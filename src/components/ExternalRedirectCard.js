import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ExternalRedirectCard({
  onCancel,
  onContinue,
  visible = false,
  message =
    "You are being redirected to a partner platform. Content, offers, and services are managed by the external provider. Please proceed when you are ready to continue.",
}) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Pressable style={styles.overlay} onPress={onCancel}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <Ionicons name="open-outline" size={30} color="#1a73e8" />
        </View>

        {/* Title */}
        <Text style={styles.title}>External Redirect</Text>

        {/* Message */}
        <Text style={styles.message}>{message}</Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={onContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 20,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },

    elevation: 12,
  },

  iconWrapper: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },

  message: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18,
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 10,
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  continueBtn: {
    flex: 1,
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  cancelText: {
    color: '#334155',
    fontWeight: '700',
  },

  continueText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});