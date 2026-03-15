import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../constants/colors';

// Import Components
import HotelDetailsTab from '../components/owner/HotelDetailsTab';
import ManagersTab from '../components/owner/ManagersTab';
import LogsTab from '../components/owner/LogsTab';
import SubscriptionTab from '../components/owner/SubscriptionTab';

const TABS = [
  { key: 'details', label: 'Details', icon: 'business' },
  { key: 'managers', label: 'Managers', icon: 'people' },
  { key: 'logs', label: 'Logs', icon: 'list' },
  { key: 'subscription', label: 'Plan', icon: 'star' },
];

export default function HotelDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const managersCount = parseInt(params.managersCount as string ?? '0', 10);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgPrimary} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.heading} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSub}>Hotel</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>{params.hotelName as string}</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="finger-print" size={20} color="#fff" />
        </View>
      </View>

      {/* ── Tab Content ── */}
      <View style={{ flex: 1 }}>
        {activeTab === 'details' && <HotelDetailsTab params={params} />}
        {activeTab === 'managers' && <ManagersTab managersCount={managersCount} />}
        {activeTab === 'logs' && <LogsTab />}
        {activeTab === 'subscription' && <SubscriptionTab />}
      </View>

      {/* ── Bottom Tab Bar ── */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <View style={[styles.tabIconWrap, isActive && styles.tabIconWrapActive]}>
                <Ionicons
                  name={isActive ? (tab.icon as any) : `${tab.icon}-outline` as any}
                  size={20}
                  color={isActive ? Colors.accent : '#9CA3AF'}
                />
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: Colors.body,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.heading,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0EAFF',
    paddingBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabIconWrap: {
    width: 44,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapActive: {},
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabLabelActive: {
    color: Colors.accent,
    fontWeight: '800',
  },
});
