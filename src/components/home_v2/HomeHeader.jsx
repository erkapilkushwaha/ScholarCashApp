import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabaseClient';

export default function HomeHeader({
  userName = 'Member',
  onNotificationPress,
  navigation,
}) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  // ─── Fetch unread notification count ───
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) return;

      const { count } = await supabase
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', authData.user.id)
        .eq('is_read', false);

      setUnreadCount(count || 0);
    } catch (err) {
      console.log('Notification count error:', err.message);
    }
  };

  // ─── Dropdown open/close animation ───
  const openMenu = () => {
    setMenuOpen(true);
    Animated.spring(dropdownAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 65,
      friction: 10,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(dropdownAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  };

  const toggleMenu = () => {
    menuOpen ? closeMenu() : openMenu();
  };

  const handleMenuNavigate = (target) => {
    closeMenu();
    navigation?.navigate(target);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Dropdown animation values
  const dropdownScale = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1],
  });

  const dropdownOpacity = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const MENU_ITEMS = [
    {
      key: 'surveyscreen',
      icon: 'document-text-outline',
      label: 'All Surveys',
      sub: 'Browse & complete surveys',
      color: '#1a73e8',
      bg: '#eff6ff',
    },
    {
      key: 'offerwallscreen',
      icon: 'flash-outline',
      label: 'All Offerwalls',
      sub: 'Tasks, installs & more',
      color: '#16a34a',
      bg: '#f0fdf4',
    },
  ];

  return (
    <View style={styles.wrapper}>

      {/* ─── Main Header Row ─── */}
      <View style={styles.container}>

        {/* Left Side */}
        <View style={styles.leftSection}>
          <Text style={styles.greeting}>
            {getGreeting()} 👋
          </Text>
          <Text style={styles.userName} numberOfLines={1}>
            {userName}
          </Text>
        </View>

        {/* Right Side */}
        <View style={styles.rightSection}>

          {/* Notification Bell */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconButton}
            onPress={onNotificationPress}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#0f172a"
            />
            {/* ✅ Unread Badge */}
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Three Lines Menu */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.iconButton,
              menuOpen && styles.iconButtonActive,
            ]}
            onPress={toggleMenu}
          >
            <Ionicons
              name={menuOpen ? 'close-outline' : 'menu-outline'}
              size={24}
              color={menuOpen ? '#1a73e8' : '#0f172a'}
            />
          </TouchableOpacity>

        </View>
      </View>

      {/* ─── Dropdown Menu ─── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          {/* Dropdown Card */}
          <Animated.View
            style={[
              styles.dropdown,
              {
                opacity: dropdownOpacity,
                transform: [{ scale: dropdownScale }],
              },
            ]}
          >
            <Text style={styles.dropdownHeading}>
              Quick Navigation
            </Text>

            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.85}
                style={[
                  styles.menuItem,
                  index < MENU_ITEMS.length - 1 && styles.menuItemBorder,
                ]}
                onPress={() => handleMenuNavigate(item.key)}
              >
                <View style={[styles.menuIconWrap, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>

                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSub}>{item.sub}</Text>
                </View>

                <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
              </TouchableOpacity>
            ))}

          </Animated.View>
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
    backgroundColor: '#ffffff',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },

  leftSection: {
    flex: 1,
    paddingRight: 10,
  },

  greeting: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },

  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  iconButtonActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },

  // ─── Badge ───
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#fff',
  },

  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },

  // ─── Backdrop ───
  backdrop: {
    position: 'absolute',
    top: 64,
    left: -1000,
    right: -1000,
    bottom: -10000,
    zIndex: 998,
  },

  // ─── Dropdown ───
  dropdown: {
    position: 'absolute',
    top: 64,
    right: 16,
    width: 260,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    zIndex: 999,
    shadowColor: '#0f172a',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  dropdownHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
    gap: 12,
  },

  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuTextWrap: {
    flex: 1,
  },

  menuLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },

  menuSub: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
  },
});
