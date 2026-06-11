import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TransactionStatusScreen() {
  return (
    <View style={styles.container}>

      {/* STEP CARD (Centered Compact Box) */}
      <View style={styles.stepCard}>

        {/* Lines */}
        <View style={styles.lineRow}>
          <View style={[styles.line, { backgroundColor: "#22c55e" }]} />
          <View style={[styles.line, { backgroundColor: "#22c55e" }]} />
          <View style={[styles.lineDashed]} />
        </View>

        {/* Steps */}
        <View style={styles.stepsRow}>

          <View style={styles.step}>
            <View style={[styles.circle, styles.active]}>
              <Feather name="check" size={18} color="#fff" />
            </View>
            <Text style={styles.stepText}>Submitted</Text>
          </View>

          <View style={styles.step}>
            <View style={[styles.circle, styles.active]}>
              <MaterialCommunityIcons name="shield-check" size={18} color="#fff" />
            </View>
            <Text style={styles.stepText}>Verify</Text>
          </View>

          <View style={styles.step}>
            <View style={[styles.circle, styles.processing]}>
              <Feather name="refresh-cw" size={18} color="#fff" />
            </View>
            <Text style={styles.stepText}>Processing</Text>
          </View>

          <View style={styles.step}>
            <View style={[styles.circle, styles.inactive]}>
              <Feather name="send" size={18} color="#94a3b8" />
            </View>
            <Text style={[styles.stepText, { color: "#94a3b8" }]}>Sent</Text>
          </View>

        </View>
      </View>

      {/* FOOTER CHIPS */}
      <View style={styles.footer}>
        
        <View style={styles.chip}>
          <Feather name="lock" size={12} color="#22c55e" />
          <Text style={styles.chipText}>Safe</Text>
        </View>

        <View style={styles.chip}>
          <Feather name="shield" size={12} color="#22c55e" />
          <Text style={styles.chipText}>Secure</Text>
        </View>

        <View style={styles.chip}>
          <Feather name="clock" size={12} color="#22c55e" />
          <Text style={styles.chipText}>5–30 min</Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },

  backBtn: {
    padding: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },

  /* STEP CARD */
  stepCard: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 18,
  },

  stepsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  lineRow: {
    position: "absolute",
    top: 18,
    left: 20,
    right: 20,
    flexDirection: "row",
    height: 2,
  },

  line: {
    flex: 1,
    height: 2,
  },

  lineDashed: {
    flex: 1,
    borderTopWidth: 2,
    borderStyle: "dashed",
    borderColor: "#22c55e",
  },

  step: {
    alignItems: "center",
    flex: 1,
  },

  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  active: {
    backgroundColor: "#22c55e",
  },

  processing: {
    backgroundColor: "#22c55e",
  },

  inactive: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },

  stepText: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
  },

  /* FOOTER CHIPS */
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 25,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
  },

  chipText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#0f172a",
  },
});