import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';

const HISTORY = [
  { id: 1, name: 'Sharma Family', type: 'Family', members: '4 members', time: 'Today, 3:10 PM', status: 'verified', guests: [{ name: 'Amit Sharma', dob: '12-05-1985', phone: '+91 99887 76655', idNumber: 'AD-8877-9900', idType: 'Aadhar' }] },
  { id: 2, name: 'Ananya & Rohan', type: 'Couple', members: '2 guests', time: 'Today, 12:45 PM', status: 'verified', guests: [
    { name: 'Ananya Iyer', dob: '20-01-1996', phone: '+91 88776 65544', idNumber: 'PN-0099-XX88', idType: 'PAN Card' },
    { name: 'Rohan Gupta', dob: '15-03-1994', phone: '+91 76543 21098', idNumber: 'AD-1122-3344', idType: 'Aadhar' }
  ]},
  { id: 3, name: 'Mehta Family', type: 'Family', members: '3 members', time: 'Yesterday, 7:00 PM', status: 'verified', guests: [{ name: 'Sanjay Mehta', dob: '15-09-1978', phone: '+91 77665 54433', idNumber: 'AD-4455-6677', idType: 'Aadhar' }] },
  { id: 4, name: 'Priya & Arjun', type: 'Couple', members: '2 guests', time: 'Yesterday, 11:20 AM', status: 'failed', guests: [] },
  { id: 5, name: 'Kumar Family', type: 'Family', members: '6 members', time: 'Mar 14, 2:00 PM', status: 'verified', guests: [{ name: 'Raj Kumar', dob: '02-12-1982', phone: '+91 66554 43322', idNumber: 'AD-5566-7788', idType: 'Aadhar' }] },
];

const HistoryTab = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
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
        <TouchableOpacity 
          key={h.id} 
          style={tabStyles.historyCard} 
          activeOpacity={0.7}
          onPress={() => h.status === 'verified' && setSelectedUser(h)}
        >
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
        </TouchableOpacity>
      ))}

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
                        <Text style={tabStyles.detailLabel}>Full Name</Text>
                        <Text style={tabStyles.detailValue}>{guest.name}</Text>
                      </View>
                    </View>
                    <View style={tabStyles.detailRow}>
                      <View style={[tabStyles.detailIconWrap, { backgroundColor: '#E0F2FE' }]}>
                        <Ionicons name="calendar" size={18} color="#0EA5E9" />
                      </View>
                      <View>
                        <Text style={tabStyles.detailLabel}>Date of Birth</Text>
                        <Text style={tabStyles.detailValue}>{guest.dob}</Text>
                      </View>
                    </View>
                    <View style={tabStyles.detailRow}>
                      <View style={[tabStyles.detailIconWrap, { backgroundColor: '#D1FAE5' }]}>
                        <Ionicons name="call" size={18} color="#10B981" />
                      </View>
                      <View>
                        <Text style={tabStyles.detailLabel}>Phone Number</Text>
                        <Text style={tabStyles.detailValue}>{guest.phone}</Text>
                      </View>
                    </View>
                    <View style={[tabStyles.detailRow, { borderBottomWidth: 0 }]}>
                      <View style={[tabStyles.detailIconWrap, { backgroundColor: '#F3F4F6' }]}>
                        <Ionicons name="card" size={18} color={Colors.heading} />
                      </View>
                      <View>
                        <Text style={tabStyles.detailLabel}>Verified ID Number ({guest.idType})</Text>
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
