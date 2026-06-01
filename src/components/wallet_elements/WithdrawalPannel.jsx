import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

export default function WithdrawalAmount({
  userId,
  userName,
  verifiedUpi,
  availableBalance = 0,
  setGlobalStatus,
  setGlobalAmount,
}) {
  const [amount, setAmount] = useState('');
  const [customUpi, setCustomUpi] = useState(verifiedUpi || '');
  const [loading, setLoading] = useState(false);

  const MIN_WITHDRAWAL = 50;

  const handleWithdrawRequest = async () => {
    const withdrawAmount = parseFloat(amount);

    if (!amount || isNaN(withdrawAmount)) {
      Alert.alert(
        'Invalid Amount',
        'Please enter a valid withdrawal amount.'
      );
      return;
    }

    if (withdrawAmount < MIN_WITHDRAWAL) {
      Alert.alert(
        'Minimum Withdrawal',
        `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL}.`
      );
      return;
    }

    if (withdrawAmount > availableBalance) {
      Alert.alert(
        'Insufficient Balance',
        'You do not have enough wallet balance.'
      );
      return;
    }

    if (!customUpi || !customUpi.includes('@')) {
      Alert.alert(
        'Invalid UPI',
        'Please enter a valid UPI ID.'
      );
      return;
    }

    setLoading(true);

    try {
      const supabaseUrl =
        'https://kkpjtyakcccndlbwwxnc.supabase.co/rest/v1/withdrawals';

      const supabaseAnonKey =
        'YOUR_SUPABASE_ANON_KEY';

      const payload = {
        user_id: userId,
        amount: withdrawAmount,
        status: 'pending',
        upi_id: customUpi.trim(),
        name: userName || 'User',
      };

      const response = await fetch(supabaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();

        Alert.alert(
          'Request Failed',
          errorData?.message ||
            'Unable to submit withdrawal request.'
        );

        return;
      }

      setGlobalAmount(String(withdrawAmount));
      setGlobalStatus('loading');

      setAmount('');
    } catch (error) {
      Alert.alert(
        'Network Error',
        'Unable to communicate with server.'
      );
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [50, 100, 200];

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Withdraw Funds
        </Text>

        <Text style={styles.subtitle}>
          Transfer your earnings directly to your UPI account
        </Text>
      </View>

      {/* Balance Info */}

      <View style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>
            Available Balance
          </Text>

          <Text style={styles.balanceValue}>
            ₹{parseFloat(availableBalance).toFixed(2)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>
            Minimum Withdrawal
          </Text>

          <Text style={styles.balanceValue}>
            ₹50
          </Text>
        </View>
      </View>

      {/* UPI */}

      <Text style={styles.inputLabel}>
        UPI ID
      </Text>

      <TextInput
        style={styles.input}
        value={customUpi}
        onChangeText={setCustomUpi}
        placeholder="example@paytm"
        autoCapitalize="none"
        editable={!loading}
      />

      {/* Amount */}

      <Text style={styles.inputLabel}>
        Withdrawal Amount
      </Text>

      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
        editable={!loading}
      />

      {/* Quick Chips */}

      <View style={styles.quickRow}>
        {quickAmounts.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.chip}
            onPress={() =>
              setAmount(String(item))
            }
          >
            <Text style={styles.chipText}>
              ₹{item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Button */}

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.disabledButton,
        ]}
        onPress={handleWithdrawRequest}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Request Withdrawal
          </Text>
        )}
      </TouchableOpacity>

      {/* Footer */}

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          ⚡ Processing Time: 1–24 Hours
        </Text>

        <Text style={styles.infoText}>
          🔒 Secure Manual Verification
        </Text>

        <Text style={styles.infoText}>
          📲 Payment will be sent to the UPI ID entered above
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748b',
  },

  balanceCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },

  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 10,
  },

  balanceLabel: {
    color: '#64748b',
    fontSize: 13,
  },

  balanceValue: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
  },

  inputLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#dbeafe',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 14,
  },

  quickRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  chip: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },

  chipText: {
    color: '#0284c7',
    fontWeight: '700',
  },

  button: {
    backgroundColor: '#0284c7',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },

  infoContainer: {
    marginTop: 16,
  },

  infoText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
});