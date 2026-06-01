import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabaseClient';

const SidebarHeader = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar_url: '',
  });
  const [completionPercent, setCompletionPercent] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setDataLoading(true);
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        setDataLoading(false);
        return;
      }

      const user = session.user;

      // 🛰️ Live Database Query: Fetching exact columns from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, is_profile_complete')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile({
          name: data.full_name || 'Scholar User', // 📝 Mapping full_name correctly
          email: user.email || '',
          avatar_url: data.avatar_url || '', // 📸 Live avatar url stream
        });
        setCompletionPercent(data.is_profile_complete ? 100 : 45); 
      } else {
        setProfile({
          name: 'Scholar User',
          email: user.email || '',
          avatar_url: '',
        });
        setCompletionPercent(20);
      }
    } catch (error) {
      console.log('Error fetching sidebar profile data:', error.message);
    } finally {
      setDataLoading(false);
    }
  };

  return (
    <View style={styles.headerContainer}>
      {dataLoading ? (
        <View style={styles.loaderBox}>
          <ActivityIndicator size="small" color="#008080" />
        </View>
      ) : (
        <>
          {/* 📸 Dynamic Profile Avatar Section */}
          <View style={styles.avatarContainer}>
            {profile.avatar_url ? (
              <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
            ) : (
              <View style={styles.initialsAvatar}>
                <Text style={styles.avatarText}>
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
            )}
          </View>

          {/* 📝 Live User Identity */}
          <Text style={styles.userName} numberOfLines={1}>{profile.name}</Text>
          <Text style={styles.userEmail} numberOfLines={1}>{profile.email}</Text>

          {/* 📈 Profile Completion Progress Bar */}
          <View style={styles.progressWrapper}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressLabel}>Profile Completion</Text>
              <Text style={styles.progressValue}>{completionPercent}%</Text>
            </View>
            <View style={styles.trackBar}>
              <View style={[styles.progressBar, { width: `${completionPercent}%` }]} />
            </View>
          </View>

          {/* 🔗 Sleek Left-Aligned Compact Buttons */}
          <View style={styles.actionButtonRow}>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.viewBtn]} 
              onPress={() => navigation.navigate('ViewProfileScreen')}
            >
              <Ionicons name="eye-outline" size={13} color="#008080" />
              <Text style={styles.viewBtnText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionBtn, styles.editBtn]} 
              onPress={() => navigation.navigate('CompleteProfile')}
            >
              <Ionicons name="create-outline" size={13} color="#fff" />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#eef0f2',
    alignItems: 'center',
    width: '100%',
  },
  loaderBox: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  initialsAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 1,
  },
  userEmail: {
    fontSize: 11,
    color: '#666',
    marginBottom: 12,
  },
  progressWrapper: {
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 10,
    color: '#777',
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 10,
    color: '#008080',
    fontWeight: '700',
  },
  trackBar: {
    height: 5,
    backgroundColor: '#eef0f2',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#008080',
    borderRadius: 3,
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // ⬅️ Perfectly aligned to the left edge with menus
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    height: 26, 
    paddingHorizontal: 8, // 🎚️ Wraps closely around the text size
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#008080',
    marginRight: 8,
  },
  viewBtnText: {
    color: '#008080',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 3,
  },
  editBtn: {
    backgroundColor: '#008080',
    marginLeft: 4,
  },
  editBtnText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 3,
  },
});

export default SidebarHeader;
