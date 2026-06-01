import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

const OtpVerification = ({ onVerify, onResend, emailAddress, apiError }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);

  // ⏱️ Countdown timer for Resend OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // 🔢 Handle individual text input change
  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next box if text is entered
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // ⌫ Handle backspace key press to go back
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // 🚀 Trigger resend code logic
  const handleResendClick = async () => {
    if (timer > 0 || isResending) return;
    setIsResending(true);
    await onResend();
    setTimer(30);
    setIsResending(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
  };

  // 📤 Check if OTP is fully filled and submit
  const handleSubmit = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 6) {
      onVerify(fullOtp);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent a 6-digit secure code to your registered email:{"\n"}
        <Text style={styles.emailHighlight}>{emailAddress || 'your email'}</Text>
      </Text>

      {/* 📥 6 individual boxes for OTP */}
      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>

      {apiError ? <Text style={styles.errorText}>⚠️ {apiError}</Text> : null}

      {/* ⏱️ Timer & Resend Controls */}
      <View style={styles.timerContainer}>
        {timer > 0 ? (
          <Text style={styles.timerText}>Resend code in <Text style={{ fontWeight: '700' }}>{timer}s</Text></Text>
        ) : (
          <TouchableOpacity onPress={handleResendClick} disabled={isResending}>
            {isResending ? (
              <ActivityIndicator size="small" color="#008080" />
            ) : (
              <Text style={styles.resendText}>Resend OTP</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: otp.join('').length === 6 ? '#008080' : '#cccccc' }]} 
        onPress={handleSubmit}
        disabled={otp.join('').length !== 6}
      >
        <Text style={styles.btnText}>Verify & Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eef0f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  emailHighlight: {
    color: '#008080',
    fontWeight: '600',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 24,
    paddingHorizontal: 5,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fafafa',
    width: 42,
    height: 48,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  errorText: {
    fontSize: 12,
    color: '#db4437',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerText: {
    fontSize: 13,
    color: '#777',
  },
  resendText: {
    fontSize: 13,
    color: '#008080',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  btn: {
    width: '100%',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default OtpVerification;
