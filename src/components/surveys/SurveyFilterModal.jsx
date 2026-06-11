import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const FILTERS = [
  'Highest Reward',
  'Lowest Reward',
  'Shortest Time',
  'Highest Rating',
  'Recommended',
];

export default function SurveyFilterModal({
  visible,
  selected,
  onSelect,
  onClose,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>

        <View style={styles.sheet}>

          <Text style={styles.title}>
            Sort Surveys
          </Text>

          {FILTERS.map(item => {

            const active =
              selected === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  active &&
                    styles.activeOption,
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    active &&
                      styles.activeText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              Close
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 20,
  },

  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  activeOption: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  optionText: {
    color: '#334155',
    fontWeight: '700',
  },

  activeText: {
    color: '#1a73e8',
  },

  closeBtn: {
    marginTop: 20,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    color: '#fff',
    fontWeight: '800',
  },
});