import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';

interface ManagersTabProps {
  managers: any[];
}

const ManagersTab = ({ managers }: ManagersTabProps) => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
      {/* Stats */}
      <View style={tabStyles.statRow}>
        <View style={[tabStyles.statCard, { backgroundColor: '#EDE9FE' }]}>
          <Text style={[tabStyles.statNum, { color: Colors.accent }]}>{managers.length}</Text>
          <Text style={[tabStyles.statLabel, { color: Colors.accent }]}>Total</Text>
        </View>
        <View style={[tabStyles.statCard, { backgroundColor: '#D1FAE5' }]}>
          <Text style={[tabStyles.statNum, { color: '#059669' }]}>{managers.filter(m => m.hotelId).length}</Text>
          <Text style={[tabStyles.statLabel, { color: '#059669' }]}>Active</Text>
        </View>
        <View style={[tabStyles.statCard, { backgroundColor: '#FEF3C7' }]}>
          <Text style={[tabStyles.statNum, { color: '#D97706' }]}>{managers.filter(m => !m.hotelId).length}</Text>
          <Text style={[tabStyles.statLabel, { color: '#D97706' }]}>Inactive</Text>
        </View>
      </View>

      {managers.length === 0 ? (
        <View style={tabStyles.emptyWrap}>
          <View style={tabStyles.emptyIcon}>
            <Ionicons name="people-outline" size={32} color={Colors.body} />
          </View>
          <Text style={tabStyles.emptyTitle}>No Managers Yet</Text>
          <Text style={tabStyles.emptyBody}>Add managers from the dashboard to assign them to this hotel.</Text>
        </View>
      ) : (
        managers.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={tabStyles.managerCard}
            activeOpacity={0.7}
            onPress={() => setSelected(m)}
          >
            <View style={tabStyles.managerAvatar}>
              <Text style={tabStyles.managerAvatarText}>{(m.name || 'M')[0].toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={tabStyles.managerName}>{m.name}</Text>
              <Text style={tabStyles.managerMeta}>{m.phone} · Since {new Date(m.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</Text>
            </View>
            <View style={tabStyles.activePill}>
              <Text style={tabStyles.activePillText}>{m.hotelId ? 'Active' : 'Inactive'}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      {/* Manager Detail Modal */}
      <Modal visible={!!selected} transparent animationType="fade">
        <View style={{
          flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center', padding: 24,
        }}>
          <View style={{
            backgroundColor: '#fff', borderRadius: 32, padding: 28,
            elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2, shadowRadius: 15,
          }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: Colors.heading }}>Manager Info</Text>
              <TouchableOpacity
                style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => setSelected(null)}
              >
                <Ionicons name="close" size={20} color={Colors.body} />
              </TouchableOpacity>
            </View>

            {selected && (
              <>
                {/* Avatar + Name */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                  <View style={{
                    width: 72, height: 72, borderRadius: 24, backgroundColor: '#EDE9FE',
                    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
                  }}>
                    <Text style={{ fontSize: 28, fontWeight: '900', color: Colors.accent }}>
                      {(selected.name || 'M')[0].toUpperCase()}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 20, fontWeight: '900', color: Colors.heading, marginBottom: 4 }}>
                    {selected.name}
                  </Text>
                  <View style={{
                    flexDirection: 'row', alignItems: 'center', gap: 6,
                    backgroundColor: selected.hotelId ? '#ECFDF5' : '#FEF3C7',
                    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99,
                  }}>
                    <View style={{
                      width: 7, height: 7, borderRadius: 4,
                      backgroundColor: selected.hotelId ? '#059669' : '#D97706',
                    }} />
                    <Text style={{
                      fontSize: 11, fontWeight: '800',
                      color: selected.hotelId ? '#059669' : '#D97706',
                    }}>
                      {selected.hotelId ? 'ACTIVE' : 'INACTIVE'}
                    </Text>
                  </View>
                </View>

                {/* Info Rows */}
                <View style={tabStyles.infoRow}>
                  <View style={tabStyles.infoIconWrap}>
                    <Ionicons name="call-outline" size={18} color={Colors.accent} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={tabStyles.infoLabel}>Phone</Text>
                    <Text style={tabStyles.infoValue}>{selected.phone}</Text>
                  </View>
                </View>

                <View style={tabStyles.infoRow}>
                  <View style={tabStyles.infoIconWrap}>
                    <Ionicons name="calendar-outline" size={18} color={Colors.accent} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={tabStyles.infoLabel}>Added On</Text>
                    <Text style={tabStyles.infoValue}>
                      {new Date(selected.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </Text>
                  </View>
                </View>

                {selected.phoneVerified !== undefined && (
                  <View style={tabStyles.infoRow}>
                    <View style={tabStyles.infoIconWrap}>
                      <Ionicons name="shield-checkmark-outline" size={18} color={Colors.accent} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={tabStyles.infoLabel}>Phone Verified</Text>
                      <Text style={tabStyles.infoValue}>{selected.phoneVerified ? 'Yes' : 'No'}</Text>
                    </View>
                  </View>
                )}

                {/* Quick Actions */}
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 14 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                      height: 48, borderRadius: 14, backgroundColor: '#E0F2FE',
                    }}
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL(`tel:${selected.phone}`)}
                  >
                    <Ionicons name="call" size={18} color="#0EA5E9" />
                    <Text style={{ fontSize: 14, fontWeight: '800', color: '#0EA5E9' }}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                      height: 48, borderRadius: 14, backgroundColor: '#DCFCE7',
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                      const num = selected.phone.replace(/[^0-9]/g, '');
                      Linking.openURL(`https://wa.me/${num}`);
                    }}
                  >
                    <Ionicons name="logo-whatsapp" size={18} color="#22C55E" />
                    <Text style={{ fontSize: 14, fontWeight: '800', color: '#22C55E' }}>WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ManagersTab;
