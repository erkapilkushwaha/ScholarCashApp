import React, { useState, useEffect } from 'react'; // 🌟 State aur Effect add kiya live fetch ke liye
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { supabase } from '../../config/supabaseClient'; // 🔗 Direct Link to Supabase Client

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2; // 2 Columns responsive width math calculation

export default function OfferwallWidget({ onProviderPress }) { // <--- 🌟 databaseProviders prop hata diya!
  const [expanded, setExpanded] = useState(false);
  const [providersList, setProvidersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚡ Supabase 'providers' table se automatic live data fetch engine
  useEffect(() => {
    async function fetchProvidersFromDb() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('providers')
          .select('*');

        if (error) throw error;
        if (data) setProvidersList(data);
      } catch (err) {
        console.error("Providers Fetch Error: ", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProvidersFromDb();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color="#1a73e8" />
      </View>
    );
  }

  // 🛡️ Fallback Data: Agar database khali ho ya connectivity issue ho, toh ye premium grid chamkega
  const finalProviders = providersList.length > 0 ? providersList : [
    { id: 'cpx_research', name: 'CPX Research', tagline: 'High paying survey engine', avg_payout: '₹60-₹200', badge: '🔥 Hot', badge_color: '#de350b' },
    { id: 'bitlabs', name: 'BitLabs Surveys', tagline: 'Unlimited global premium feed', avg_payout: '₹40-150', badge: '🟢 Live', badge_color: '#00875a' },
    { id: 'pollfish', name: 'Pollfish Node', tagline: 'Quick targeted mobile match', avg_payout: '₹20-₹80', badge: '⚡ Fast', badge_color: '#1a73e8' },
    { id: 'monlix', name: 'Monlix Multiwall', tagline: 'Offers, tasks and quick cash', avg_payout: 'Net payout 85%', badge: '💎 New', badge_color: '#7f56d9' }
  ];

  // Limit check: Pehle 4 items default dikhayenge, expanded hone par saare dikhayenge
  const visibleProviders = expanded ? finalProviders : finalProviders.slice(0, 4);
  const showMoreButton = finalProviders.length > 4;

  return (
    <View style={styles.mainContainer}>
      {/* 📊 Responsive Flex-Wrap Grid Container */}
      <View style={styles.gridWrapper}>
        {visibleProviders.map((item) => {
          // Dynamic Badges Setup based on backend metadata or default fallback
          const badgeText = item.badge || '🟢 Live';
          const badgeBg = item.badge_color || '#00875a';

          return (
            <TouchableOpacity 
              key={item.id}
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={() => onProviderPress && onProviderPress(item.id, item.name)}
            >
              {/* 🚀 NEW PLACEMENT: Payout box ko content ke sabse upar rakh diya absolute chalne ke liye */}
              <View style={styles.payoutContainer}>
                <Text style={styles.payoutLabel}>Avg. Pay</Text>
                <Text style={styles.payoutValue}>{item.avg_payout || '₹40-₹150'}</Text>
              </View>

              {/* Badge Row */}
              <View style={styles.badgeRow}>
                <View style={[styles.badgeBox, { backgroundColor: badgeBg }]}>
                  {/* 🌟 FIXED VISIBILITY: Explicit font color applied directly inside code to ensure text stays white on solid colored boxes */}
                  <Text style={[styles.badgeText, { color: '#ffffff' }]}>{badgeText}</Text>
                </View>
              </View>

              {/* Title & Metadata Info */}
              <Text style={styles.providerName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.taglineText} numberOfLines={1}>
                {item.tagline || 'Earn rewards instantly'}
              </Text>

            </TouchableOpacity>
          );
        })}
      </View>

      {/* 🔼 Expand / Collapse Toggle Controller */}
      {showMoreButton && (
        <TouchableOpacity 
          style={styles.expandButton} 
          activeOpacity={0.7}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.expandButtonText}>
            {expanded ? "🔼 Show Less" : `🔽 See More (+${finalProviders.length - 4} Networks)`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginTop: 4,
  },
  center: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Matrix column mapping architecture
    justifyContent: 'flex-start',
    gap: 8, // ✂️ Gap 12 se kam karke 8 kiya tight grid spacing ke liye
    width: '100%',
  },
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 6,   // ✂️ Vertical padding 10 se kam karke 6 ki (Height compress karne ke liye)
    paddingHorizontal: 8, // ✂️ Horizontal padding 10 se kam karke 8 ki
    borderWidth: 1,
    borderColor: '#edf2f7',
    justifyContent: 'space-between',
    position: 'relative', // 🌟 Yeh line corner floating position ko activate rakhegi
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 4, 
  },
  badgeBox: {
    paddingVertical: 2,   // Safe visible height breathing space
    paddingHorizontal: 6,  // Solid text wrapping box
    borderRadius: 5,
  },
  badgeText: {
    fontSize: 8.5, // Perfect micro scaled fit
    fontWeight: '800', // Heavy weight for sharp contrast
    textTransform: 'uppercase',
  },
  providerName: {
    fontSize: 12.5, 
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 2, // ✂️ Margin 4 se kam karke 2 kiya space ke liye
  },
  taglineText: {
    fontSize: 9.5, 
    color: '#6b7280',
    marginTop: 1,
    marginBottom: 0, 
  },
  payoutContainer: {
    position: 'absolute',
    top: 6, // ✂️ Snug top alignment inside condensed card 
    right: 6, // ✂️ Adjusted from 8 to 6
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 5,  
    paddingVertical: 2,    
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    zIndex: 10, 
  },
  payoutLabel: {
    fontSize: 7, 
    color: '#9ca3af',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  payoutValue: {
    fontSize: 9, 
    fontWeight: '700',
    color: '#1a73e8',
    marginTop: 0,
  },
  expandButton: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    paddingVertical: 6, // ✂️ Compact padding button for low profile height
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6, // ✂️ Margin 8 se kam karke 6 kiya
  },
  expandButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4b5563',
  },
});
