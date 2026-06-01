import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';

const ContactUsScreen = ({ navigation }) => {

  // ✉️ Trigger Email Client
  const handleEmail = () => {
    Linking.openURL('mailto:kapilkushwaha047@gmail.com?subject=ScholarCash Support Request');
  };

  // 📞 Trigger Phone Dialer
  const handlePhone = () => {
    Linking.openURL('tel:+919569079118');
  };

  // 💬 Trigger WhatsApp Chat
  const handleWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=+919569079118&text=Hello Support Team, I need help regarding ScholarCash.');
  };

  // 📸 Trigger Instagram Profile
  const handleInstagram = () => {
    Linking.openURL('https://www.instagram.com/er.kapilkushwaha?igsh=MWFtZzJ3dWNhcHQ4aA==');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#008080" barStyle="light-content" />

      {/* 🔝 Professional Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* 📑 Premium Document Card */}
        <View style={styles.documentCard}>
          <Text style={styles.docMainTitle}>GET IN TOUCH</Text>
          <Text style={styles.docSubTitle}>We are here to support you</Text>
          <View style={styles.divider} />
          
          {/* 📝 Simple Text Details Section */}
          <View style={styles.textDetailsContainer}>
            <Text style={styles.descriptionText}>
              If you face any issues with task tracking, rewards, or wallet payouts, feel free to connect with us. You can read our support details below or directly tap any social icon to reach out instantly.
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Support Helpline: </Text>
              <Text style={styles.infoValue}>+91 95690 79118</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Official Email: </Text>
              <Text style={styles.infoValue}>kapilkushwaha047@gmail.com</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* 🌐 Horizontal Social Media & Support Icons Row */}
          <Text style={styles.connectTitle}>Connect Instantly</Text>
          <View style={styles.socialHorizontalRow}>
            
            {/* Call Icon */}
            <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#e6f2f2' }]} onPress={handlePhone}>
              <Ionicons name="call" size={24} color="#008080" />
            </TouchableOpacity>

            {/* WhatsApp Icon */}
            <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#e8f8ef' }]} onPress={handleWhatsApp}>
              <FontAwesome name="whatsapp" size={26} color="#25d366" />
            </TouchableOpacity>

            {/* Email Icon */}
            <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#fce8e6' }]} onPress={handleEmail}>
              <Ionicons name="mail" size={24} color="#db4437" />
            </TouchableOpacity>

            {/* Instagram Icon */}
            <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#fdf0f5' }]} onPress={handleInstagram}>
              <AntDesign name="instagram" size={24} color="#e1306c" />
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8', // Off-white canvas standard
  },
  headerBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#008080', // App branding theme color
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 4,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eef0f2',
  },
  docMainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  docSubTitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e6f2f2',
    marginVertical: 20,
  },
  textDetailsContainer: {
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  infoValue: {
    fontSize: 13,
    color: '#008080',
    fontWeight: '600',
  },
  connectTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  socialHorizontalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default ContactUsScreen;
