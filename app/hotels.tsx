import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';
import HotelCard, { Hotel } from '../components/hotels/HotelCard';
import AddManagerModal, { ManagerData } from '../components/hotels/AddManagerModal';

// Demo seed data (will be replaced by real API data in production)
const SEED_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'The Grand Palace',
    address: 'MG Road, Near Raj Bhawan',
    district: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    postOffice: 'Jaipur GPO',
    managersCount: 0,
  },
];

export default function HotelsScreen() {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>(SEED_HOTELS);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showAddManager, setShowAddManager] = useState(false);

  const handleAddManager = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowAddManager(true);
  };

  const handleManagerAdded = (hotelId: string, manager: ManagerData) => {
    setHotels((prev) =>
      prev.map((h) =>
        h.id === hotelId
          ? { ...h, managersCount: (h.managersCount ?? 0) + 1 }
          : h
      )
    );
    setShowAddManager(false);
    console.log('Manager added:', manager);
  };

  const renderHeader = () => (
    <View>
      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{hotels.length}</Text>
          <Text style={styles.statLabel}>Properties</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: Colors.mint }]}>
          <Text style={[styles.statNumber, { color: Colors.mintIcon }]}>
            {hotels.reduce((acc, h) => acc + (h.managersCount ?? 0), 0)}
          </Text>
          <Text style={[styles.statLabel, { color: Colors.mintIcon }]}>Managers</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: Colors.sky }]}>
          <Text style={[styles.statNumber, { color: Colors.skyIcon }]}>Pro</Text>
          <Text style={[styles.statLabel, { color: Colors.skyIcon }]}>Plan</Text>
        </View>
      </View>

      {/* Section heading */}
      <Text style={styles.sectionTitle}>Your Properties</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgPrimary} />

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Welcome Back 👋</Text>
          <Text style={styles.pageTitle}>Hotel Dashboard</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="finger-print" size={22} color="#fff" />
        </View>
      </View>

      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HotelCard
            hotel={item}
            onAddManager={handleAddManager}
            onPress={() => router.push({ pathname: '/hotel-detail', params: { hotelId: item.id, hotelName: item.name, address: item.address, district: item.district, state: item.state, pincode: item.pincode, postOffice: item.postOffice, managersCount: String(item.managersCount ?? 0) } })}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="business-outline" size={36} color={Colors.body} />
            </View>
            <Text style={styles.emptyTitle}>No properties yet</Text>
            <Text style={styles.emptySubtitle}>Your registered hotels will appear here.</Text>
          </View>
        }
      />

      {/* ── Add Hotel FAB ── */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push('/register')}
      >
        <Ionicons name="add" size={26} color="#fff" />
        <Text style={styles.fabText}>Add Hotel</Text>
      </TouchableOpacity>

      {/* ── Add Manager Modal ── */}
      <AddManagerModal
        visible={showAddManager}
        hotel={selectedHotel}
        onClose={() => setShowAddManager(false)}
        onAdd={handleManagerAdded}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.body,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.heading,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 110, // allow FAB space
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#EDE9FE',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.accent,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.accent,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.heading,
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.heading,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.body,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    left: 24,
    height: 56,
    borderRadius: 99,
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});
