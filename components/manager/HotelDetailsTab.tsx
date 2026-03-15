import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';

const HOTEL = {
  name: 'The Grand Palace',
  address: 'MG Road, Near Raj Bhawan',
  postOffice: 'Jaipur GPO',
  district: 'Jaipur',
  state: 'Rajasthan',
  pincode: '302001',
  coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop',
  owner: {
    name: 'Vikram Singh Shekhawat',
    designation: 'Managing Director & Owner',
    phone: '+91 98765 43210',
    email: 'vikram.singh@gpjaipur.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&auto=format&fit=crop',
  },
};

export { HOTEL };

const HotelDetailsTab = () => (
  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
    <View style={tabStyles.heroCardCompact}>
      <View style={tabStyles.heroIconWrapCompact}>
        <Ionicons name="business" size={28} color={Colors.accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={tabStyles.heroTitleCompact}>{HOTEL.name}</Text>
        <View style={tabStyles.statusBadgeSmallCompact}>
          <View style={tabStyles.statusDot} />
          <Text style={tabStyles.statusTextSmall}>ACTIVE · PRO PLAN</Text>
        </View>
      </View>
    </View>

    {/* Hotel Owner Section */}
    <Text style={tabStyles.sectionTitle}>Hotel Owner</Text>
    <View style={tabStyles.ownerCard}>
      <View style={tabStyles.ownerHeader}>
        <Image source={{ uri: HOTEL.owner.image }} style={tabStyles.ownerAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={tabStyles.ownerName}>{HOTEL.owner.name}</Text>
          <Text style={tabStyles.ownerDesignation}>{HOTEL.owner.designation}</Text>
        </View>
      </View>

      <View style={tabStyles.contactGrid}>
        <TouchableOpacity style={tabStyles.contactItem} activeOpacity={0.7}>
          <View style={[tabStyles.contactIconWrap, { backgroundColor: '#E0F2FE' }]}>
            <Ionicons name="call" size={18} color="#0EA5E9" />
          </View>
          <Text style={tabStyles.contactText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tabStyles.contactItem} activeOpacity={0.7}>
          <View style={[tabStyles.contactIconWrap, { backgroundColor: '#EDE9FE' }]}>
            <Ionicons name="mail" size={18} color={Colors.accent} />
          </View>
          <Text style={tabStyles.contactText}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tabStyles.contactItem} activeOpacity={0.7}>
          <View style={[tabStyles.contactIconWrap, { backgroundColor: '#DCFCE7' }]}>
            <Ionicons name="logo-whatsapp" size={18} color="#22C55E" />
          </View>
          <Text style={tabStyles.contactText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>

    <Text style={tabStyles.sectionTitle}>Location Details</Text>
    {[
      { icon: 'location-outline', label: 'Address', value: HOTEL.address },
      { icon: 'pin-outline', label: 'Post Office', value: HOTEL.postOffice },
      { icon: 'map-outline', label: 'District', value: HOTEL.district },
      { icon: 'earth-outline', label: 'State', value: HOTEL.state },
      { icon: 'barcode-outline', label: 'Pincode', value: HOTEL.pincode },
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

export default HotelDetailsTab;
