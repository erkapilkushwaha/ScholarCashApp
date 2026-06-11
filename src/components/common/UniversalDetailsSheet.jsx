import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function UniversalDetailsSheet({
  visible,
  onClose,
  onContinue,
  data,
  type = 'survey',
  showContinueButton = true,
}) {
  if (!data) return null;

  const title =
    type === 'offerwall'
      ? data.name
      : data.survey_name || data.title || 'Details';

  const provider =
    type === 'offerwall'
      ? data.provider_code
      : data.provider_name;

  // ✅ FIXED: correct column names per table schema
  const reward =
    type === 'offerwall'
      ? `₹${data.min_reward || 0} - ₹${data.max_reward || 0}`
      : `₹${data.user_reward_inr || data.reward_inr || 0}`;

  const minutes =
    type === 'survey'
      ? data.estimated_minutes
      : data.estimated_tasks;

  const match =
    type === 'survey'
      ? data.match_percentage
      : null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>

          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>
              {!!provider && (
                <Text style={styles.provider}>{provider}</Text>
              )}
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
          >

            <View style={styles.heroCard}>
              <Text style={styles.heroType}>
                {type === 'offerwall' ? '⚡ Offerwall' : '📝 Survey'}
              </Text>
              <Text style={styles.heroTitle}>{title}</Text>
              {!!provider && (
                <Text style={styles.heroProvider}>{provider}</Text>
              )}
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>{reward}</Text>
                <Text style={styles.statLabel}>Reward</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {minutes || '-'}
                </Text>
                <Text style={styles.statLabel}>
                  {type === 'survey' ? 'Minutes' : 'Tasks'}
                </Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {data.rating || '-'}
                </Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {match != null ? `${match}%` : '-'}
                </Text>
                <Text style={styles.statLabel}>Match</Text>
              </View>

            </View>

            {/* Status */}
            {!!data.status && (
              <View style={styles.statusBox}>
                <Text style={styles.statusLabel}>Status</Text>
                <Text style={styles.statusValue}>{data.status}</Text>
              </View>
            )}

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.sectionText}>
                {data.survey_description || data.description || 'No description available.'}
              </Text>
            </View>

            {/* Survey Extra */}
            {type === 'survey' && (
              <>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Requirements</Text>
                  <Text style={styles.sectionText}>
                    {'• Honest responses\n• Stable internet\n• Complete survey without interruption'}
                  </Text>
                </View>

                <View style={styles.noticeCard}>
                  <Text style={styles.noticeTitle}>✓ External Partner Notice</Text>
                  <Text style={styles.noticeText}>
                    {`You are about to continue to a trusted partner platform.\n\nSurvey qualification, completion and reward approval are handled by the partner.\n\nYour activity will be tracked automatically.`}
                  </Text>
                </View>
              </>
            )}

            {/* Offerwall Extra */}
            {type === 'offerwall' && (
              <View style={styles.warningBox}>
                <Text style={styles.warningTitle}>External Offerwall Partner</Text>
                <Text style={styles.warningText}>
                  Tasks, installs and rewards are managed by the offerwall provider.
                </Text>
              </View>
            )}

          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            {showContinueButton && (
              <Text style={styles.redirectText}>
                You will be redirected securely
              </Text>
            )}

            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>
                  {showContinueButton ? 'Cancel' : 'Close'}
                </Text>
              </TouchableOpacity>

              {showContinueButton && (
                <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
                  <Text style={styles.continueText}>Continue →</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    height: height * 0.82,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
  },
  handle: {
    width: 55,
    height: 5,
    backgroundColor: '#d1d5db',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  provider: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 14,
  },
  close: {
    fontSize: 26,
    color: '#475569',
    paddingLeft: 12,
  },
  heroCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },
  heroType: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1a73e8',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 10,
  },
  heroProvider: {
    marginTop: 6,
    color: '#64748b',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a73e8',
  },
  statLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#64748b',
  },
  statusBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  statusLabel: {
    color: '#64748b',
    fontSize: 12,
  },
  statusValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a73e8',
    marginTop: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  sectionText: {
    color: '#475569',
    lineHeight: 22,
  },
  noticeCard: {
    backgroundColor: '#ecfdf5',
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#15803d',
  },
  noticeText: {
    marginTop: 8,
    color: '#166534',
    lineHeight: 22,
  },
  warningBox: {
    marginTop: 20,
    backgroundColor: '#fff7ed',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#c2410c',
  },
  warningText: {
    marginTop: 6,
    color: '#7c2d12',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  redirectText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  footerButtons: {
    flexDirection: 'row',
  },
  cancelBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  continueBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  cancelText: {
    fontWeight: '700',
    color: '#334155',
  },
  continueText: {
    color: '#fff',
    fontWeight: '800',
  },
});
