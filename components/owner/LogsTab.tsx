import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';

interface LogsTabProps {
  verifications: any[];
}

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

function idTypeLabel(type: string) {
  const map: Record<string, string> = {
    AADHAAR: 'Aadhaar', PAN: 'PAN', DRIVING_LICENSE: 'Licence',
    PASSPORT: 'Passport', VOTER_ID: 'Voter ID',
  };
  return map[type] || type;
}

const LogsTab = ({ verifications }: LogsTabProps) => {
  const logs = verifications.map((v) => {
    const firstPerson = v.persons?.[0];
    return {
      id: v.id,
      guest: firstPerson?.name || 'Guest',
      type: firstPerson ? idTypeLabel(firstPerson.idType) : v.type,
      time: formatTime(v.createdAt),
      status: firstPerson?.verified !== false ? 'verified' : 'failed',
    };
  });

  const verified = logs.filter(l => l.status === 'verified').length;
  const failed = logs.filter(l => l.status === 'failed').length;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
      {/* Stats */}
      <View style={tabStyles.statRow}>
        <View style={[tabStyles.statCard, { backgroundColor: '#EDE9FE' }]}>
          <Text style={[tabStyles.statNum, { color: Colors.accent }]}>{logs.length}</Text>
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

      {logs.length === 0 ? (
        <View style={tabStyles.emptyWrap}>
          <View style={tabStyles.emptyIcon}>
            <Ionicons name="list-outline" size={32} color={Colors.body} />
          </View>
          <Text style={tabStyles.emptyTitle}>No Verifications Yet</Text>
          <Text style={tabStyles.emptyBody}>Guest verifications will appear here.</Text>
        </View>
      ) : (
        logs.map((log) => (
          <View key={log.id} style={tabStyles.logCard}>
            <View style={[tabStyles.logDot, { backgroundColor: log.status === 'verified' ? '#059669' : '#DC2626' }]} />
            <View style={{ flex: 1 }}>
              <Text style={tabStyles.logGuest}>{log.guest}</Text>
              <Text style={tabStyles.logMeta}>{log.type} · {log.time}</Text>
            </View>
            <View style={[tabStyles.logBadge, { backgroundColor: log.status === 'verified' ? '#D1FAE5' : '#FEE2E2' }]}>
              <Text style={[tabStyles.logBadgeText, { color: log.status === 'verified' ? '#059669' : '#DC2626' }]}>
                {log.status === 'verified' ? 'Verified' : 'Failed'}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default LogsTab;
