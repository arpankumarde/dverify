import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';

interface ManagersTabProps {
  managersCount: number;
}

const ManagersTab = ({ managersCount }: ManagersTabProps) => {
  const demoManagers = Array.from({ length: managersCount }, (_, i) => ({
    id: i + 1,
    name: `Manager ${i + 1}`,
    phone: `+91 98765 4321${i}`,
    since: 'Mar 2026',
  }));

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
      {/* Stats */}
      <View style={tabStyles.statRow}>
        <View style={[tabStyles.statCard, { backgroundColor: '#EDE9FE' }]}>
          <Text style={[tabStyles.statNum, { color: Colors.accent }]}>{managersCount}</Text>
          <Text style={[tabStyles.statLabel, { color: Colors.accent }]}>Total</Text>
        </View>
        <View style={[tabStyles.statCard, { backgroundColor: '#D1FAE5' }]}>
          <Text style={[tabStyles.statNum, { color: '#059669' }]}>{managersCount}</Text>
          <Text style={[tabStyles.statLabel, { color: '#059669' }]}>Active</Text>
        </View>
        <View style={[tabStyles.statCard, { backgroundColor: '#FEF3C7' }]}>
          <Text style={[tabStyles.statNum, { color: '#D97706' }]}>0</Text>
          <Text style={[tabStyles.statLabel, { color: '#D97706' }]}>Inactive</Text>
        </View>
      </View>

      {demoManagers.length === 0 ? (
        <View style={tabStyles.emptyWrap}>
          <View style={tabStyles.emptyIcon}>
            <Ionicons name="people-outline" size={32} color={Colors.body} />
          </View>
          <Text style={tabStyles.emptyTitle}>No Managers Yet</Text>
          <Text style={tabStyles.emptyBody}>Add managers from the dashboard to assign them to this hotel.</Text>
        </View>
      ) : (
        demoManagers.map((m) => (
          <View key={m.id} style={tabStyles.managerCard}>
            <View style={tabStyles.managerAvatar}>
              <Text style={tabStyles.managerAvatarText}>{m.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={tabStyles.managerName}>{m.name}</Text>
              <Text style={tabStyles.managerMeta}>{m.phone} · Since {m.since}</Text>
            </View>
            <View style={tabStyles.activePill}>
              <Text style={tabStyles.activePillText}>Active</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default ManagersTab;
