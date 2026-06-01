import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileFooter = ({
  currentStep,
  isFormValid,
  isSaved,
  onPreviousPress,
  onSavePress,
  onSaveAndNextPress,
  onSkipPress,
  onGoToHomePress,
}) => {
  // 👁️ Check if it is the last step of the profile onboarding
  const isFinalStep = currentStep === 4;

  return (
    <View style={styles.footerContainer}>
      {/* 🔒 Trust Badge before actions */}
      <Text style={styles.trustText}>🔒 Your data is fully encrypted and safe with ScholarCash.</Text>

      {/* 🔘 Main Action Buttons Row */}
      <View style={styles.buttonRow}>
        {/* Previous Button: Step 1 par visible nahi hogi */}
        {currentStep > 1 ? (
          <TouchableOpacity style={styles.secondaryButton} onPress={onPreviousPress}>
            <Text style={styles.secondaryButtonText}>Previous</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1 }} /> // Layout balance rakhne ke liye empty view
        )}

        {/* 🔀 Conditional Matrix: Render View Profile if Final Step, else show Step Actions */}
        {isFinalStep ? (
          <TouchableOpacity
            style={[styles.finalProfileButton, !isFormValid && styles.disabledButton]}
            disabled={!isFormValid}
            onPress={onSaveAndNextPress} // 🏁 Trigger final destination alert context
          >
            <Text style={styles.mainButtonText}>View Profile 👁️</Text>
          </TouchableOpacity>
        ) : (
          <>
            {/* Save / Edit Dynamic Button */}
            <TouchableOpacity
              style={[styles.mainButton, !isFormValid && styles.disabledButton]}
              disabled={!isFormValid}
              onPress={onSavePress}
            >
              <Text style={styles.mainButtonText}>{isSaved ? 'Edit' : 'Save'}</Text>
            </TouchableOpacity>

            {/* Save & Next Button */}
            <TouchableOpacity
              style={[styles.mainButton, !isFormValid && styles.disabledButton]}
              disabled={!isFormValid}
              onPress={onSaveAndNextPress}
            >
              <Text style={styles.mainButtonText}>Save & Next</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* 🗺️ Bottom Text Navigation Matrix */}
      <View style={styles.textLinksContainer}>
        <TouchableOpacity onPress={onSkipPress} style={styles.linkPadding}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onGoToHomePress} style={styles.linkPadding}>
          <Text style={styles.homeText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  trustText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  mainButton: {
    flex: 1,
    backgroundColor: '#2196F3', // 🔵 Active Blue
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  finalProfileButton: {
    flex: 2, // 🗚 Takes full remaining space for better prominence
    backgroundColor: '#4CAF50', // 🟢 Highlighting success green for completion phase
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#BDBDBD', // 🪙 Disabled Grey
    elevation: 0,
  },
  mainButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 15,
    fontWeight: '600',
  },
  textLinksContainer: {
    alignItems: 'center',
    gap: 12,
  },
  linkPadding: {
    padding: 5,
  },
  skipText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
  },
  homeText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline', // 🔗 Clickable underline element
  },
});

export default ProfileFooter;
