import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';

const SubscriptionTab = () => (
  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
    {/* Plan Card */}
    <View style={tabStyles.planCard}>
      <View style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: 65, backgroundColor: 'rgba(255,255,255,0.08)' }} />
      <View style={{ position: 'absolute', bottom: -20, left: -20, width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.06)' }} />

      <View style={tabStyles.planLabel}>
        <Text style={tabStyles.planLabelText}>✦ PRO PLAN</Text>
      </View>
      <Text style={tabStyles.planPrice}>₹27,000</Text>
      <Text style={tabStyles.planPriceSub}>per year · billed annually</Text>

      <View style={tabStyles.planBadge}>
        <Text style={tabStyles.planBadgeText}>Save ₹6,000 vs monthly billing</Text>
      </View>
    </View>

    {/* Validity Timer Section */}
    <Text style={tabStyles.sectionTitle}>Subscription Validity</Text>
    <View style={tabStyles.timerCard}>
      <View style={tabStyles.timerRow}>
        <View style={tabStyles.timerIconWrap}>
          <Ionicons name="time" size={24} color={Colors.accent} />
        </View>
        <View>
          <Text style={tabStyles.timerValue}>365 Days Left</Text>
          <Text style={tabStyles.timerSub}>Valid until Mar 15, 2027</Text>
        </View>
      </View>
      
      <View style={tabStyles.progressContainer}>
        <View style={tabStyles.progressTrack}>
          <View style={[tabStyles.progressBar, { width: '85%' }]} />
        </View>
        <Text style={tabStyles.progressLabel}>85% of plan period remaining</Text>
      </View>
    </View>

    <Text style={tabStyles.sectionTitle}>Plan Details</Text>
    {[
      { icon: 'calendar-outline', label: 'Plan Start', value: 'March 15, 2026' },
      { icon: 'alarm-outline', label: 'Renewal Date', value: 'March 15, 2027' },
      { icon: 'receipt-outline', label: 'Transaction ID', value: 'PAY_XT9284KFL' },
      { icon: 'card-outline', label: 'Payment Mode', value: 'Razorpay · UPI' },
      { icon: 'shield-checkmark-outline', label: 'Status', value: 'Active & Verified' },
    ].map((item, i) => (
      <View key={i} style={tabStyles.infoRow}>
        <View style={tabStyles.infoIconWrap}>
          <Ionicons name={item.icon as any} size={18} color={Colors.accent} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={tabStyles.infoLabel}>{item.label}</Text>
          <Text style={tabStyles.infoValue}>{item.value}</Text>
        </View>
      </View>
    ))}
  </ScrollView>
);

export default SubscriptionTab;
