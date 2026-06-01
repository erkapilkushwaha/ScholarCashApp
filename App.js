import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Image, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native'; 
import * as SplashScreen from 'expo-splash-screen'; 
import { supabase } from './src/config/supabaseClient';

// 🌐 App Language Localization Configuration Engine
import './src/localization/i18n'; 

// 📄 Existing Stacks & Pages Imports
import Home from './src/pages/Home'; 
import Wallet from './src/pages/Wallet'; 
import History from './src/pages/History'; 
import AuthScreen from './src/pages/AuthScreen';
import OtpVerification from './src/pages/OtpVerification';
import ForgotPasswordScreen from './src/pages/ForgotPasswordScreen'; 

// 🆕 Newly Added Pages from File Tree
import SidebarMenu from './src/pages/SidebarMenu';
import SettingsScreen from './src/pages/SettingsScreen';
import ChangePasswordScreen from './src/pages/ChangePasswordScreen';
import DeleteAccountScreen from './src/pages/DeleteAccountScreen';
import PrivacyPolicyScreen from './src/pages/PrivacyPolicyScreen';
import TermsConditionsScreen from './src/pages/TermsConditionsScreen';
import AboutUsScreen from './src/pages/AboutUsScreen';
import SupportScreen from './src/pages/SupportScreen';
import ContactUsScreen from './src/pages/ContactUsScreen';
import ViewProfileScreen from './src/pages/ViewProfileScreen';
import CompleteProfileScreen from './src/pages/CompleteProfileScreen'; 

// 🧭 Components & Helpers Imports
import BottomNavWidget from './src/components/BottomNavWidget'; 
import CompleteProfilePopup from './src/components/home_elements/CompleteProfilePopup';
import { navigationHub } from './src/config/navigationHub';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.80; 

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('auth_screen');
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [currentOtpParams, setCurrentOtpParams] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current; 

  const activeTabRef = useRef(activeTab);
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  navigationHub.setActivePagePointer = (targetTab) => {
    if (targetTab) {
      setActiveTab(targetTab.toLowerCase());
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setActiveTab('home');
        checkUserProfileStatus(session.user.id);
      } else {
        setSession(null);
        setActiveTab('auth_screen');
      }
      setAuthLoading(false);
      SplashScreen.hideAsync().catch(() => {});
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession) {
        setSession(currentSession);
        if (event === 'PASSWORD_RECOVERY' || event === 'USER_UPDATED') {
          setActiveTab('forgot_password');
        } else {
          const currentTab = activeTabRef.current;
          if (currentTab === 'changepasswordscreen' || currentTab === 'changepasswording') {
            console.log("Password state change detected inside setting engine. Redirection bypassed successfully.");
          } else {
            setActiveTab('home');
            checkUserProfileStatus(currentSession.user.id);
          }
        }
      } else {
        setSession(null);
        setActiveTab('auth_screen');
      }
      setAuthLoading(false);
      SplashScreen.hideAsync().catch(() => {});
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserProfileStatus = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_profile_complete')
        .eq('id', userId)
        .single();

      if (!error && data && data.is_profile_complete === false && activeTabRef.current !== 'auth_screen') {
        setShowProfilePopup(true);
      }
    } catch (err) {
      console.log("Profile Status Check Error: ", err.message);
    }
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
    Animated.timing(slideAnim, {
      toValue: width - SIDEBAR_WIDTH, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: width, 
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsSidebarOpen(false));
  };

  const handleNavigation = (targetPage, params = null) => {
    closeSidebar(); 
    const target = targetPage.toLowerCase();

    if (target === 'otpverification') {
      setCurrentOtpParams(params);
      setActiveTab('otp_verification');
    } else if (target === 'goback') {
      setActiveTab(session ? 'home' : 'auth_screen');
    } else {
      setActiveTab(target);
    }
  };

  if (authLoading) {
    return (
      <View style={styles.customSplashCanvas}>
        <Image 
          source={require('./assets/main-scholar-splash.png')} 
          style={styles.customSplashImage}
          resizeMode="contain"
        />
        <View style={styles.inlineLoaderWrapper}>
          <ActivityIndicator size="small" color="#1a73e8" />
        </View>
      </View>
    );
  }

  const navigationProp = {
    navigate: (page) => handleNavigation(page),
    replace: (page) => handleNavigation(page), 
    goBack: () => handleNavigation('goback'),
    reset: ({ routes }) => handleNavigation(routes[0].name)
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.mainContent}>
        {/* 🆕 Lowercase routing tags check integration for un-authenticated session rendering */}
        {!session ? (
          activeTab === 'otp_verification' ? (
            <OtpVerification route={{ params: currentOtpParams }} navigation={navigationProp} />
          ) : activeTab === 'forgot_password' ? (
            <ForgotPasswordScreen navigation={navigationProp} />
          ) : activeTab === 'privacypolicyscreen' ? (
            <PrivacyPolicyScreen navigation={navigationProp} />
          ) : activeTab === 'termsconditionsscreen' ? (
            <TermsConditionsScreen navigation={navigationProp} />
          ) : activeTab === 'aboutusscreen' ? (
            <AboutUsScreen navigation={navigationProp} />
          ) : activeTab === 'supportscreen' ? (
            <SupportScreen navigation={navigationProp} />
          ) : activeTab === 'contactusscreen' ? (
            <ContactUsScreen navigation={navigationProp} />
          ) : (
            <AuthScreen navigation={navigationProp} />
          )
        ) : (
          /* Authenticated Pages Routing Matrix */
          activeTab === 'home' ? (
            <Home onNavigateToWallet={() => setActiveTab('wallet')} />
          ) : activeTab === 'wallet' ? (
            <Wallet navigation={navigationProp} />
          ) : activeTab === 'history' ? (
            <History /> 
          ) : activeTab === 'settingsscreen' ? (
            <SettingsScreen navigation={navigationProp} />
          ) : activeTab === 'changepasswording' || activeTab === 'changepasswordscreen' ? (
            <ChangePasswordScreen navigation={navigationProp} />
          ) : activeTab === 'deleteaccountscreen' ? (
            <DeleteAccountScreen navigation={navigationProp} />
          ) : activeTab === 'privacypolicyscreen' ? (
            <PrivacyPolicyScreen navigation={navigationProp} />
          ) : activeTab === 'termsconditionsscreen' ? (
            <TermsConditionsScreen navigation={navigationProp} />
          ) : activeTab === 'aboutusscreen' ? (
            <AboutUsScreen navigation={navigationProp} />
          ) : activeTab === 'supportscreen' ? (
            <SupportScreen navigation={navigationProp} />
          ) : activeTab === 'contactusscreen' ? (
            <ContactUsScreen navigation={navigationProp} />
          ) : activeTab === 'viewprofilescreen' ? (
            <ViewProfileScreen navigation={navigationProp} />
          ) : activeTab === 'completeprofile' ? (
            <CompleteProfileScreen navigation={navigationProp} />
          ) : (
            <Home />
          )
        )}
      </View>

      {session && ['home', 'wallet', 'history'].includes(activeTab) && (
        <View style={styles.navWrapper}>
          <BottomNavWidget 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              if (tab === 'profile') {
                openSidebar(); 
              } else {
                setActiveTab(tab);
              }
            }} 
          />
        </View>
      )}

      {isSidebarOpen && (
        <View style={styles.sidebarOverlay}>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={styles.backdropTouchArea} />
          </TouchableWithoutFeedback>

          <Animated.View style={[styles.sidebarAnimatedBox, { transform: [{ translateX: slideAnim }] }]}>
            <SidebarMenu navigation={navigationProp} />
          </Animated.View>
        </View>
      )}

      <CompleteProfilePopup 
        visible={showProfilePopup && session && ['home', 'wallet', 'history'].includes(activeTab)}
        onClose={() => setShowProfilePopup(false)} 
        onNavigate={() => {
          setShowProfilePopup(false);
          setActiveTab('completeprofile');
        }}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  mainContent: { flex: 1, marginBottom: 0 },
  navWrapper: { width: '100%', backgroundColor: '#cbd5e1', zIndex: 99, elevation: 25 },
  customSplashCanvas: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  customSplashImage: { width: '85%', height: '85%' },
  inlineLoaderWrapper: { position: 'absolute', bottom: 60 },
  sidebarOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 9999, flexDirection: 'row' },
  backdropTouchArea: { flex: 1 },
  sidebarAnimatedBox: { width: SIDEBAR_WIDTH, height: '100%', backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: -2, height: 0 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 16 }
});
