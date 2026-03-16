import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';
import { getManagerVerifications } from '../../services/api';

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();
  const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  if (isToday) return `Today, ${time}`;
  if (isYesterday) return `Yesterday, ${time}`;
  return `${d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}, ${time}`;
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    FAMILY: 'Family', COUPLE: 'Couple', PROFESSIONAL: 'Professional', STUDENT: 'Student',
  };
  return map[type] || type;
}

function idTypeLabel(type: string) {
  const map: Record<string, string> = {
    AADHAAR: 'Aadhaar', PAN: 'PAN', DRIVING_LICENSE: 'Licence',
    PASSPORT: 'Passport', VOTER_ID: 'Voter ID',
  };
  return map[type] || type;
}

const HistoryTab = () => {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getManagerVerifications();
        setVerifications(res.verifications || []);
      } catch {
        // empty
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const history = verifications.map((v) => {
    const label = typeLabel(v.type);
    const persons = v.persons || [];
    const allVerified = persons.length > 0 && persons.every((p: any) => p.verified !== false);
    const memberCount = v.type === 'COUPLE' ? '2 guests' : `${(v.adults || 1) + (v.children || 0)} member(s)`;
    const firstName = persons[0]?.name || 'Guest';
    const displayName = v.type === 'COUPLE' && persons.length === 2
      ? `${persons[0]?.name || 'Guest 1'} & ${persons[1]?.name || 'Guest 2'}`
      : v.type === 'FAMILY'
        ? `${firstName} Family`
        : firstName;

    return {
      id: v.id,
      name: displayName,
      type: label,
      members: memberCount,
      time: formatTime(v.createdAt),
      status: allVerified ? 'verified' : 'failed',
      guests: persons.map((p: any) => ({
        name: p.name || 'Guest',
        idNumber: p.idNumber,
        idType: idTypeLabel(p.idType),
        verified: p.verified,
      })),
    };
  });

  const verified = history.filter(h => h.status === 'verified').length;
  const failed = history.filter(h => h.status === 'failed').length;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
      <View style={tabStyles.statRow}>
        <View style={[tabStyles.statCard, { backgroundColor: '#EDE9FE' }]}>
          <Text style={[tabStyles.statNum, { color: Colors.accent }]}>{history.length}</Text>
          <Text style={[tabStyles.statLabel, { color: Colors.accent }]}>Total</Text>
        </View>
        <View style={[tabStyles.statCard, { backgroundColor: '#D1FAE5' }]}>
          <Text style={[tabStyles.statNum, { color: '#059669' }]}>{verified}</Text>
          <Text style={[tabStyles.statLabel, { color: '#059669' }]}>Verified</Text>
        </View>
        <View style={[tabStyles.statCard, { backgroundColor: '#FEE2E2' }]}>
          <Text style={[tabStyles.statNum, { color: '#DC2626' }]}>{failed}</Text>
          <Text style={[tabStyles.statLabel, { color: '#DC2626' }]}>Failed</Text>
        </View>
      </View>

      {history.length === 0 ? (
        <View style={tabStyles.emptyWrap}>
          <View style={tabStyles.emptyIcon}>
            <Ionicons name="time-outline" size={32} color={Colors.body} />
          </View>
          <Text style={tabStyles.emptyTitle}>No History Yet</Text>
          <Text style={tabStyles.emptyBody}>Completed verifications will appear here.</Text>
        </View>
      ) : (
        history.map((h) => (
          <TouchableOpacity
            key={h.id}
            style={tabStyles.historyCard}
            activeOpacity={0.7}
            onPress={() => h.status === 'verified' && setSelectedUser(h)}
          >
            <View style={[tabStyles.historyTypeWrap, { backgroundColor: h.type === 'Family' ? '#EDE9FE' : h.type === 'Couple' ? '#FCE7F3' : '#E0F2FE' }]}>
              <Ionicons
                name={h.type === 'Family' ? 'people' : h.type === 'Couple' ? 'heart' : 'person'}
                size={20}
                color={h.type === 'Family' ? Colors.accent : h.type === 'Couple' ? '#DB2777' : '#0EA5E9'}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={tabStyles.historyName}>{h.name}</Text>
                <View style={[tabStyles.historyTypeBadge, { backgroundColor: h.type === 'Family' ? '#EDE9FE' : h.type === 'Couple' ? '#FCE7F3' : '#E0F2FE' }]}>
                  <Text style={[tabStyles.historyTypeBadgeText, { color: h.type === 'Family' ? Colors.accent : h.type === 'Couple' ? '#DB2777' : '#0EA5E9' }]}>{h.type}</Text>
                </View>
              </View>
              <Text style={tabStyles.historyMeta}>{h.members} · {h.time}</Text>
            </View>
            <View style={[tabStyles.historyStatus, { backgroundColor: h.status === 'verified' ? '#D1FAE5' : '#FEE2E2' }]}>
              <Ionicons name={h.status === 'verified' ? 'checkmark' : 'close'} size={13} color={h.status === 'verified' ? '#059669' : '#DC2626'} />
            </View>
          </TouchableOpacity>
        ))
      )}

      {/* Details Modal */}
      <Modal visible={!!selectedUser} transparent animationType="fade">
        <View style={tabStyles.modalOverlay}>
          <View style={tabStyles.modalContent}>
            <View style={tabStyles.modalHeader}>
              <Text style={tabStyles.modalTitle}>Verified Details</Text>
              <TouchableOpacity style={tabStyles.closeBtn} onPress={() => setSelectedUser(null)}>
                <Ionicons name="close" size={20} color={Colors.body} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ width: '100%', maxHeight: 400 }} showsVerticalScrollIndicator={false}>
              {selectedUser?.guests.map((guest: any, idx: number) => (
                <View key={idx} style={{ marginBottom: 10 }}>
                  {selectedUser.type === 'Couple' && (
                    <Text style={tabStyles.guestLabel}>Guest {idx + 1}</Text>
                  )}
                  <View style={tabStyles.detailCard}>
                    <View style={tabStyles.detailRow}>
                      <View style={[tabStyles.detailIconWrap, { backgroundColor: '#EDE9FE' }]}>
                        <Ionicons name="person" size={18} color={Colors.accent} />
                      </View>
                      <View>
                        <Text style={tabStyles.detailLabel}>Name</Text>
                        <Text style={tabStyles.detailValue}>{guest.name}</Text>
                      </View>
                    </View>
                    <View style={[tabStyles.detailRow, { borderBottomWidth: 0 }]}>
                      <View style={[tabStyles.detailIconWrap, { backgroundColor: '#F3F4F6' }]}>
                        <Ionicons name="card" size={18} color={Colors.heading} />
                      </View>
                      <View>
                        <Text style={tabStyles.detailLabel}>ID ({guest.idType})</Text>
                        <Text style={tabStyles.detailValue}>{guest.idNumber}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[tabStyles.submitBtn, { marginTop: 20 }]}
              onPress={() => setSelectedUser(null)}
            >
              <Text style={tabStyles.submitBtnText}>Close Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HistoryTab;
