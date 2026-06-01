import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { supabase } from '../config/supabaseClient'; 

// 🧱 Components Import
import ProfileHeader from '../components/profile_elements/ProfileHeader';
import ProfileFooter from '../components/profile_elements/ProfileFooter';
import Step1PersonalInfo from '../components/profile_elements/Step1PersonalInfo';
import Step2Education from '../components/profile_elements/Step2Education';
import Step3WorkFamily from '../components/profile_elements/Step3WorkFamily';
import Step4Address from '../components/profile_elements/Step4Address';

const CompleteProfileScreen = ({ navigation }) => {
  // 📊 Flow Control States
  const [currentStep, setCurrentStep] = useState(1);
  const [screenLoading, setScreenLoading] = useState(true); 
  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // 🗃️ Centralized Form Data Store
  const [profileData, setProfileData] = useState({
    full_name: '', mobile: '', email: '', dob: '', gender: '', upi_id: '',
    education_level: '', annual_income: '',
    employment_status: '', family_members: '',
    country: 'India 🇮🇳', pincode: '', state: '', city: '', area_type: '', house_details: '', locality: ''
  });

  // 🔒 Validation States per Step
  const [isStepValid, setIsStepValid] = useState(false);
  const [savedSteps, setSavedSteps] = useState({ 1: false, 2: false, 3: false, 4: false });

  // 🛡️ Pre-load Profile Logic
  useEffect(() => {
    const loadExistingProfileLogs = async () => {
      try {
        setScreenLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfileData({
            full_name: data.full_name || '',
            mobile: data.mobile || '',
            email: data.email || user.email || '', 
            dob: data.dob || '',
            gender: data.gender || '',
            upi_id: data.upi_id || '',
            education_level: data.education_level || '',
            annual_income: data.annual_income || '',
            employment_status: data.employment_status || '',
            family_members: data.family_members || '',
            country: data.country || 'India 🇮🇳',
            pincode: data.pincode || '',
            state: data.state || '',
            city: data.city || '',
            area_type: data.area_type || '',
            house_details: data.house_details || '',
            locality: data.locality || '',
            avatar_url: data.avatar_url || null
          });
        }
      } catch (err) {
        console.log("Error binding initial profiles schema dataset:", err.message);
      } finally {
        setScreenLoading(false);
      }
    };

    loadExistingProfileLogs();
  }, []);

  // 🔄 Data Sync from Child Steps
  const handleDataChange = (stepData) => {
    setProfileData((prev) => ({ ...prev, ...stepData }));
  };

  // 💾 Supabase Save Database Engine
  const handleSaveData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User session not found");

      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setSavedSteps((prev) => ({ ...prev, [currentStep]: true }));
      Alert.alert("Success 🟢", "Data saved successfully to your profile log.");
      return true; // Returns true if save operation succeeds
    } catch (error) {
      Alert.alert("Error 🛑", error.message || "Failed to update profile logs.");
      return false;
    }
  };

  // ⏭️ Navigation Flow Triggers (With Auto-Save Engine)
  const handleNext = async () => {
    // ⏳ Automatically commit current step data before moving forward
    const saveSuccess = await handleSaveData();
    if (!saveSuccess) return; // Halt navigation if network database save fails

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // 🏁 Final Step Onboarding Verification Action
      Alert.alert(
        "🎉 Profile Verified!",
        "Your ScholarCash profile has been verified and completed successfully.",
        [{ text: "OK", onPress: () => navigation.navigate('ViewProfileScreen', { profileData }) }]
      );
    }
  };

  // 🔙 Backward Step Controller
  const handlePrevious = () => {
    if (currentStep === 1) {
      navigation.navigate('HomeScreen'); // 🏠 Smooth exit to dashboard on Step 1
    } else {
      setCurrentStep((prev) => prev - 1); // 📉 Fixed typo from +1 to -1
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigation.navigate('HomeScreen');
    }
  };

  // 🗺️ Step Content Dispatcher Matrix
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo initialData={profileData} onValidationChange={setIsStepValid} onDataChange={handleDataChange} />;
      case 2:
        return <Step2Education initialData={profileData} onValidationChange={setIsStepValid} onDataChange={handleDataChange} />;
      case 3:
        return <Step3WorkFamily initialData={profileData} onValidationChange={setIsStepValid} onDataChange={handleDataChange} />;
      case 4:
        return <Step4Address initialData={profileData} onValidationChange={setIsStepValid} onDataChange={handleDataChange} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = { 1: "Personal Details", 2: "Education & Income", 3: "Work & Family", 4: "Address Logs" };
    return titles[currentStep];
  };

  if (screenLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.masterContainer}>
      {/* 🔝 Unified Header */}
      <ProfileHeader 
        title={getStepTitle()} 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        progressPercentage={progressPercentage} 
        onBackPress={handlePrevious} 
      />

      {/* 📝 Scrollable Input Form Content Display */}
      <View style={styles.formContent}>
        {renderStepComponent()}
      </View>

      {/* 🔘 Dynamic Controlled Footer */}
      <ProfileFooter 
        currentStep={currentStep}
        isFormValid={isStepValid}
        isSaved={savedSteps[currentStep]}
        onPreviousPress={handlePrevious}
        onSavePress={handleSaveData}
        onSaveAndNextPress={handleNext}
        onSkipPress={handleSkip}
        onGoToHomePress={() => navigation.navigate('HomeScreen')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: { flex: 1, backgroundColor: '#ffffff' },
  formContent: { flex: 1 }
});

export default CompleteProfileScreen;
