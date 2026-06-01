import React, { useState, useEffect } from 'react'; // 🌟 State aur Effect hooks add kiye
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '../../config/supabaseClient'; // 🔗 Aapka Supabase connection link kiya

export default function SurveyCardWidget({ onSurveyPress }) {
  const [liveSurveys, setLiveSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚡ Supabase Table Se Direct Data Khinchne Ka Engine
  useEffect(() => {
    async function fetchSurveysFromDb() {
      try {
        setLoading(true);
        
        // 'live_surveys' table se saara active data uthana
        const { data, error } = await supabase
          .from('live_surveys')
          .select('*');

        if (error) throw error;
        
        if (data) {
          setLiveSurveys(data);
        }
      } catch (err) {
        console.error("Survey Fetch Error: ", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSurveysFromDb();
  }, []);

  // Loader state jab tak data fetch ho raha ho
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color="#1a73e8" />
      </View>
    );
  }

  // Fallback agar database bilkul khali ho ya network down ho
  const surveysList = liveSurveys.length > 0 ? liveSurveys : [
    { id: 'srv_1', minutes: 8, reward: 35.00, rating: 4.8, match: 'Excellent Match' },
    { id: 'srv_2', minutes: 15, reward: 75.50, rating: 4.2, match: 'High Paying' },
    { id: 'srv_3', minutes: 5, reward: 20.00, rating: 4.0, match: 'Quick Cash' }
  ];

  return (
    <View style={styles.listWrapper}>
      {surveysList.map((survey) => (
        <TouchableOpacity
          key={survey.id}
          style={styles.cardContainer}
          activeOpacity={0.85}
          onPress={() => onSurveyPress && onSurveyPress(survey.id, survey.reward)}
        >
          {/* Left Side: Time & Match Badge info */}
          <View style={styles.leftGrid}>
            <Text style={styles.timeText}>⏱️ {survey.minutes} Mins</Text>
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>✨ {survey.match || 'Verified'}</Text>
            </View>
          </View>

          {/* Center Side: Trust Rating Tracker */}
          <View style={styles.centerGrid}>
            <Text style={styles.ratingText}>⭐ {parseFloat(survey.rating).toFixed(1)}</Text>
            <Text style={styles.subLabel}>User Rating</Text>
          </View>

          {/* Right Side: High-Converting Green Reward Grid */}
          <View style={styles.rightGrid}>
            <Text style={styles.rewardValue}>+₹{parseFloat(survey.reward).toFixed(2)}</Text>
            <View style={styles.startBtn}>
              <Text style={styles.startBtnText}>Start</Text>
            </View>
          </View>

        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    width: '100%',
    marginTop: 6,
  },
  center: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  leftGrid: {
    flex: 1.2,
    alignItems: 'flex-start',
  },
  timeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
  },
  matchBadge: {
    backgroundColor: '#e0f2fe',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 6,
  },
  matchText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0369a1',
  },
  centerGrid: {
    flex: 0.8,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#f1f5f9',
    paddingHorizontal: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4b5563',
  },
  subLabel: {
    fontSize: 9,
    color: '#9ca3af',
    marginTop: 2,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  rightGrid: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rewardValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#00875a',
  },
  startBtn: {
    backgroundColor: '#1a73e8',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  startBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
});
