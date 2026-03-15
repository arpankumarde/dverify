import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';

const LogsTab = () => {
  const logs = [
    { id: 1, guest: 'Rahul Sharma', type: 'Aadhaar', time: 'Today, 2:45 PM', status: 'verified' },
    { id: 2, guest: 'Priya Patel', type: 'PAN', time: 'Today, 11:30 AM', status: 'verified' },
    { id: 3, guest: 'Amit Kumar', type: 'Licence', time: 'Yesterday, 6:00 PM', status: 'failed' },
    { id: 4, guest: 'Sunita Devi', type: 'Aadhaar', time: 'Yesterday, 10:15 AM', status: 'verified' },
    { id: 5, guest: 'Ravi Shankar', type: 'Aadhaar', time: 'Mar 13, 3:20 PM', status: 'verified' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
      {/* Stats */}
      <View style={tabStyles.statRow}>
        <View style={[tabStyles.statCard, { backgroundColor: '#EDE9FE' }]}>
          <Text style={[tabStyles.statNum, { color: Colors.accent }]}>{logs.length}</Text>
          <Text style={[tabStyles.statLabel, { color: Colors.accent }]}>Total</Text>
        </View>
        <View style={[tabStyles.statCard, { backgroundColor: '#D1FAE5' }]}>
          <Text style={[tabStyles.statNum, { color: '#059669' }]}>{logs.filter(l => l.status === 'verified').length}</Text>
          <Text style={[tabStyles.statLabel, { color: '#059669' }]}>Verified</Text>
        </View>
        <View style={[tabStyles.statCard, { backgroundColor: '#FEE2E2' }]}>
          <Text style={[tabStyles.statNum, { color: '#DC2626' }]}>{logs.filter(l => l.status === 'failed').length}</Text>
          <Text style={[tabStyles.statLabel, { color: '#DC2626' }]}>Failed</Text>
        </View>
      </View>

      {logs.map((log) => (
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
      ))}
    </ScrollView>
  );
};

export default LogsTab;
