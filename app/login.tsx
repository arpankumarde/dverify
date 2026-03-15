import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [otpFocused, setOtpFocused] = useState(false);
  const [error, setError] = useState('');

  const canLogin = phone.trim().length === 10 && otp.trim().length === 4;

  const handleLogin = () => {
    if (canLogin) {
      if (phone === '9999999999' && otp === '1234') {
        router.replace('/hotels');
      } else if (phone === '8888888888' && otp === '5678') {
        router.replace('/manager-dashboard');
      } else {
        setError('Invalid Phone Number or OTP');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgPrimary} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Back ── */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.heading} />
          </TouchableOpacity>

          {/* ── Header ── */}
          <View style={styles.headerBlock}>
            <View style={styles.logoWrap}>
              <Ionicons name="finger-print" size={26} color="#fff" />
            </View>
            <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
            <Text style={styles.heading}>Sign in to{'\n'}your account</Text>
            <Text style={styles.subheading}>
              Enter your mobile number and the OTP sent to you.
            </Text>
          </View>

          {/* ── Form card ── */}
          <View style={styles.card}>
            {/* Phone */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>MOBILE NUMBER</Text>
              <View style={[styles.inputRow, phoneFocused && styles.inputRowFocused]}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={phoneFocused ? Colors.accent : '#9CA3AF'}
                  style={styles.inputIcon}
                />
                <Text style={styles.prefix}>+91 </Text>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="XXXXX XXXXX"
                  placeholderTextColor="#C4C9D4"
                  value={phone}
                  onChangeText={(t) => {
                    setError('');
                    setPhone(t.replace(/\D/g, '').slice(0, 10));
                  }}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* OTP */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>OTP DIGITS</Text>
              <View style={[styles.inputRow, otpFocused && styles.inputRowFocused]}>
                <Ionicons
                  name="key-outline"
                  size={18}
                  color={otpFocused ? Colors.accent : '#9CA3AF'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter 4-digit OTP"
                  placeholderTextColor="#C4C9D4"
                  value={otp}
                  onChangeText={(t) => {
                    setError('');
                    setOtp(t.replace(/\D/g, '').slice(0, 4));
                  }}
                  onFocus={() => setOtpFocused(true)}
                  onBlur={() => setOtpFocused(false)}
                  keyboardType="number-pad"
                  secureTextEntry
                />
              </View>
            </View>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* ── Login CTA ── */}
          <TouchableOpacity
            style={[styles.loginBtn, !canLogin && styles.loginBtnDisabled]}
            activeOpacity={canLogin ? 0.85 : 1}
            onPress={handleLogin}
          >
            <Text style={styles.loginBtnText}>Login Account</Text>
            <Ionicons name="log-in-outline" size={20} color="#fff" />
          </TouchableOpacity>

          {/* ── Hint ── */}
          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>Demo Credentials:</Text>
            <Text style={styles.hintText}>Owner: 9999999999 / 1234</Text>
            <Text style={styles.hintText}>Manager: 8888888888 / 5678</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backBtn: {
    marginTop: 8,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBlock: {
    marginTop: 28,
    marginBottom: 32,
  },
  logoWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  welcomeLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2.5,
    color: Colors.accent,
    marginBottom: 10,
  },
  heading: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.heading,
    lineHeight: 44,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.body,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    gap: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    height: 54,
  },
  inputRowFocused: {
    borderColor: Colors.accent,
    backgroundColor: '#FDFBFF',
  },
  inputIcon: {
    marginRight: 10,
  },
  prefix: {
    fontSize: 15,
    color: Colors.heading,
    fontWeight: '600',
    marginRight: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.heading,
    fontWeight: '500',
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 58,
    borderRadius: 99,
    backgroundColor: Colors.accent,
    marginBottom: 20,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  loginBtnDisabled: {
    backgroundColor: '#C4B5FD',
    shadowOpacity: 0,
    elevation: 0,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerLabel: {
    fontSize: 14,
    color: Colors.body,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.accent,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    marginTop: -8,
    marginLeft: 4,
  },
  hintBox: {
    marginTop: 10,
    padding: 16,
    backgroundColor: '#F3F4FB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  hintTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.heading,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hintText: {
    fontSize: 13,
    color: Colors.body,
    fontWeight: '600',
    marginBottom: 4,
  },
});
