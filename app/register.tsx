import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';
import StepIndicator from '../components/registration/StepIndicator';
import PersonalDetailsForm from '../components/registration/PersonalDetailsForm';
import HotelDetailsForm from '../components/registration/HotelDetailsForm';
import PaymentStep from '../components/registration/PaymentStep';
import ConfirmPaymentModal from '../components/payment/ConfirmPaymentModal';

const STEPS = ['Personal', 'Hotel', 'Payment'];

const stepTitles = [
  { subtitle: 'Step 1 of 3', title: 'Personal Details' },
  { subtitle: 'Step 2 of 3', title: 'Hotel Details' },
  { subtitle: 'Step 3 of 3', title: 'Choose Your Plan' },
];

export default function Register() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [step, setStep] = useState(0);

  const [personal, setPersonal] = useState({
    fullName: '', email: '', mobile: '',
  });

  const [hotel, setHotel] = useState({
    hotelName: '', 
    address: '', 
    pincode: '', 
    postOffice: '', 
    district: '', 
    state: '',
  });

  const goNext = () => {
    if (step < STEPS.length - 1) {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      setStep((s) => s - 1);
    } else {
      router.back();
    }
  };

  const [showConfirm, setShowConfirm] = React.useState(false);

  const handlePayment = () => {
    setShowConfirm(true);
  };

  const confirmPayment = () => {
    setShowConfirm(false);
    // Navigate to hotel dashboard
    router.replace('/hotels');
  };

  // Derived validation for current step
  const isStep1Valid = !!(personal.fullName && personal.email && personal.mobile);
  const isStep2Valid = !!(
    hotel.hotelName && 
    hotel.address && 
    hotel.pincode && 
    hotel.postOffice && 
    hotel.district && 
    hotel.state
  );

  const canProceed = step === 0 ? isStep1Valid : step === 1 ? isStep2Valid : true;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgPrimary }}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgPrimary} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* ── Header ── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 }}>
          <TouchableOpacity
            onPress={goBack}
            style={{
              width: 42, height: 42, borderRadius: 14,
              backgroundColor: '#EDE9FE',
              alignItems: 'center', justifyContent: 'center', marginRight: 12
            }}
          >
            <Ionicons name="chevron-back" size={22} color={Colors.accent} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, fontWeight: '800', color: Colors.accent, letterSpacing: 2, textTransform: 'uppercase' }}>
              {stepTitles[step].subtitle}
            </Text>
            <Text style={{ fontSize: 22, fontWeight: '900', color: Colors.heading, lineHeight: 28 }}>
              {stepTitles[step].title}
            </Text>
          </View>
          <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="finger-print" size={18} color="#fff" />
          </View>
        </View>

        {/* ── Step Indicator ── */}
        <StepIndicator currentStep={step} steps={STEPS} />

        {/* ── Scrollable Step Content ── */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {step === 0 && (
            <PersonalDetailsForm
              data={personal}
              onChange={(k, v) => setPersonal((p) => ({ ...p, [k]: v }))}
            />
          )}
          {step === 1 && (
            <HotelDetailsForm
              data={hotel}
              onChange={(k, v) => setHotel((h) => ({ ...h, [k]: v }))}
            />
          )}
          {step === 2 && (
            <PaymentStep />
          )}
        </ScrollView>

        {/* ── Pinned Bottom Buttons ── */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 16, flexDirection: 'row', gap: 12, borderTopWidth: 1, borderTopColor: '#F0EAFF', backgroundColor: Colors.bgPrimary }}>
          {step > 0 && (
            <TouchableOpacity
              onPress={goBack}
              style={{
                flex: 1, height: 56, borderRadius: 99,
                borderWidth: 2, borderColor: Colors.accent,
                alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
              }}
            >
              <Ionicons name="arrow-back" size={17} color={Colors.accent} />
              <Text style={{ color: Colors.accent, fontWeight: '900', fontSize: 15, marginLeft: 6 }}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={step === 2 ? handlePayment : goNext}
            disabled={step < 2 && !canProceed}
            style={{
              flex: step > 0 ? 2 : 1,
              height: 56, borderRadius: 99,
              backgroundColor: canProceed || step === 2 ? Colors.accent : '#DDD6FE',
              alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
              elevation: canProceed ? 8 : 0,
              shadowColor: Colors.accent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
            activeOpacity={0.85}
          >
            {step === 2 ? (
              <>
                <Ionicons name="card-outline" size={18} color="#fff" />
                <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15, marginLeft: 8 }}>Pay ₹27,000</Text>
              </>
            ) : (
              <>
                <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15, marginRight: 8 }}>Continue</Text>
                <Ionicons name="arrow-forward" size={17} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

      {/* ── Payment Confirmation Modal ── */}
      <ConfirmPaymentModal
        visible={showConfirm}
        onConfirm={confirmPayment}
        onCancel={() => setShowConfirm(false)}
      />
    </SafeAreaView>
  );
}
