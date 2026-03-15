import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';

const HISTORY = [
  { id: 1, name: 'Sharma Family', type: 'Family', members: '4 members', time: 'Today, 3:10 PM', status: 'verified' },
  { id: 2, name: 'Ananya & Rohan', type: 'Couple', members: '2 guests', time: 'Today, 12:45 PM', status: 'verified' },
  { id: 3, name: 'Mehta Family', type: 'Family', members: '3 members', time: 'Yesterday, 7:00 PM', status: 'verified' },
  { id: 4, name: 'Priya & Arjun', type: 'Couple', members: '2 guests', time: 'Yesterday, 11:20 AM', status: 'failed' },
  { id: 5, name: 'Kumar Family', type: 'Family', members: '6 members', time: 'Mar 14, 2:00 PM', status: 'verified' },
];

const HistoryTab = () => (
  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
    <View style={tabStyles.statRow}>
      <View style={[tabStyles.statCard, { backgroundColor: '#EDE9FE' }]}>
        <Text style={[tabStyles.statNum, { color: Colors.accent }]}>{HISTORY.length}</Text>
        <Text style={[tabStyles.statLabel, { color: Colors.accent }]}>Total</Text>
      </View>
      <View style={[tabStyles.statCard, { backgroundColor: '#D1FAE5' }]}>
        <Text style={[tabStyles.statNum, { color: '#059669' }]}>{HISTORY.filter(h => h.status === 'verified').length}</Text>
        <Text style={[tabStyles.statLabel, { color: '#059669' }]}>Verified</Text>
      </View>
      <View style={[tabStyles.statCard, { backgroundColor: '#FEE2E2' }]}>
        <Text style={[tabStyles.statNum, { color: '#DC2626' }]}>{HISTORY.filter(h => h.status === 'failed').length}</Text>
        <Text style={[tabStyles.statLabel, { color: '#DC2626' }]}>Failed</Text>
      </View>
    </View>

    {HISTORY.map((h) => (
      <View key={h.id} style={tabStyles.historyCard}>
        <View style={[tabStyles.historyTypeWrap, { backgroundColor: h.type === 'Family' ? '#EDE9FE' : '#FCE7F3' }]}>
          <Ionicons name={h.type === 'Family' ? 'people' : 'heart'} size={20} color={h.type === 'Family' ? Colors.accent : '#DB2777'} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={tabStyles.historyName}>{h.name}</Text>
            <View style={[tabStyles.historyTypeBadge, { backgroundColor: h.type === 'Family' ? '#EDE9FE' : '#FCE7F3' }]}>
              <Text style={[tabStyles.historyTypeBadgeText, { color: h.type === 'Family' ? Colors.accent : '#DB2777' }]}>{h.type}</Text>
            </View>
          </View>
          <Text style={tabStyles.historyMeta}>{h.members} · {h.time}</Text>
        </View>
        <View style={[tabStyles.historyStatus, { backgroundColor: h.status === 'verified' ? '#D1FAE5' : '#FEE2E2' }]}>
          <Ionicons name={h.status === 'verified' ? 'checkmark' : 'close'} size={13} color={h.status === 'verified' ? '#059669' : '#DC2626'} />
        </View>
      </View>
    ))}
  </ScrollView>
);

export default HistoryTab;
