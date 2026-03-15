import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface FormData {
  hotelName: string;
  address: string;
  pincode: string;
  postOffice: string;
  district: string;
  state: string;
}

interface Props {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}

const Field = ({
  icon,
  label,
  placeholder,
  value,
  onChange,
  keyboardType = 'default',
  multiline = false,
  editable = true,
}: {
  icon: string;
  label: string;
  placeholder: string;
  value: string;
  onChange?: (v: string) => void;
  keyboardType?: any;
  multiline?: boolean;
  editable?: boolean;
}) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 11, fontWeight: '800', color: Colors.body, letterSpacing: 1.5, marginBottom: 8, textTransform: 'uppercase' }}>
      {label}
    </Text>
    <View
      style={{
        minHeight: 52,
        flexDirection: 'row',
        alignItems: multiline ? 'flex-start' : 'center',
        paddingHorizontal: 16,
        paddingVertical: multiline ? 14 : 0,
        borderRadius: 14,
        backgroundColor: '#F4F0FF', // Lilac background
        borderWidth: 1.5,
        borderColor: '#DDD6FE',    // Lilac border
      }}
    >
      <Ionicons name={icon as any} size={19} color={Colors.mintIcon} style={{ marginTop: multiline ? 2 : 0 }} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        editable={editable}
        selectionColor={Colors.mintIcon}
        style={{
          flex: 1,
          marginLeft: 12,
          fontSize: 15,
          color: Colors.heading, // Always heading color
          textAlignVertical: multiline ? 'top' : 'center',
          paddingVertical: multiline ? 8 : 0,
          opacity: editable ? 1 : 0.8, // Subtle hint that it's disabled but same colors
        }}
      />
    </View>
  </View>
);

const HotelDetailsForm: React.FC<Props> = ({ data, onChange }) => {
  const [loading, setLoading] = React.useState(false);
  const [postOffices, setPostOffices] = React.useState<any[]>([]);
  const [showPOList, setShowPOList] = React.useState(false);

  const fetchPincodeDetails = async (pin: string) => {
    if (pin.length !== 6) return;
    
    setLoading(true);
    try {
      const baseUrl = process.env.EXPO_PUBLIC_PINCODE_API_KEY?.replace(/"/g, '').trim() || "https://api.postalpincode.in/pincode";
      const response = await fetch(`${baseUrl}/${pin}`);
      const result = await response.json();

      if (result[0].Status === "Success") {
        const offices = result[0].PostOffice;
        setPostOffices(offices);
        
        if (offices.length === 1) {
          onChange('postOffice', offices[0].Name);
          onChange('district', offices[0].District);
          onChange('state', offices[0].State);
          setShowPOList(false);
        } else {
          setShowPOList(true);
        }
      } else {
        setPostOffices([]);
        alert("Invalid Pincode");
        setShowPOList(false);
      }
    } catch (error) {
      console.error("Error fetching pincode:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeChange = (val: string) => {
    onChange('pincode', val);
    if (val.length === 6) {
      fetchPincodeDetails(val);
    } else {
      setPostOffices([]);
      setShowPOList(false);
      // Clear auto-filled fields if pincode is deleted/changed
      onChange('postOffice', '');
      onChange('district', '');
      onChange('state', '');
    }
  };

  const selectPostOffice = (po: any) => {
    onChange('postOffice', po.Name);
    onChange('district', po.District);
    onChange('state', po.State);
    setShowPOList(false);
  };

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
      {/* Section Banner */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 14,
          borderRadius: 16,
          backgroundColor: Colors.mint,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: Colors.mintIcon + '25',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Ionicons name="business" size={18} color={Colors.mintIcon} />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '900', color: Colors.heading }}>Hotel Details</Text>
          <Text style={{ fontSize: 12, color: Colors.body }}>Tell us about your property</Text>
        </View>
      </View>

      <Field 
        icon="business-outline" 
        label="Hotel / Property Name" 
        placeholder="e.g. The Grand Palace"
        value={data.hotelName} 
        onChange={(v) => onChange('hotelName', v)} 
      />

      <Field 
        icon="location-outline" 
        label="Full Address / Landmark" 
        placeholder="Street, Area, Locality"
        value={data.address} 
        onChange={(v) => onChange('address', v)} 
        multiline 
      />

      <Field 
        icon="pin-outline" 
        label="Pincode" 
        placeholder="6-digit Pincode"
        value={data.pincode} 
        onChange={handlePincodeChange} 
        keyboardType="number-pad" 
      />

      {loading && (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: Colors.mintIcon }}>Fetching post office details...</Text>
        </View>
      )}

      {/* Post Office Dropdown List (Enabled only when list available) */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 11, fontWeight: '800', color: Colors.body, letterSpacing: 1.5, marginBottom: 8, textTransform: 'uppercase' }}>
          Post Office
        </Text>
        <TouchableOpacity
          disabled={postOffices.length <= 1}
          onPress={() => setShowPOList(!showPOList)}
          style={{
            minHeight: 52,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            borderRadius: 14,
            backgroundColor: postOffices.length > 1 ? '#F4F0FF' : '#F3F4F6',
            borderWidth: 1.5,
            borderColor: postOffices.length > 1 ? '#DDD6FE' : '#E5E7EB',
          }}
        >
          <Ionicons name="mail-outline" size={19} color={postOffices.length > 1 ? Colors.mintIcon : '#9CA3AF'} />
          <Text 
            style={{ 
              flex: 1, 
              marginLeft: 12, 
              fontSize: 15, 
              color: data.postOffice ? Colors.heading : '#9CA3AF' 
            }}
          >
            {data.postOffice || (postOffices.length > 1 ? "Select Post Office" : "Auto-filled after Pincode")}
          </Text>
          {postOffices.length > 1 && (
            <Ionicons name={showPOList ? "chevron-up" : "chevron-down"} size={18} color={Colors.mintIcon} />
          )}
        </TouchableOpacity>

        {showPOList && postOffices.length > 1 && (
          <View 
            style={{ 
              marginTop: 8, 
              backgroundColor: '#FFFFFF', 
              borderRadius: 14, 
              padding: 8, 
              borderWidth: 1.5, 
              borderColor: '#DDD6FE',
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            {postOffices.map((po, idx) => (
              <TouchableOpacity 
                key={idx} 
                onPress={() => selectPostOffice(po)}
                style={{ 
                  paddingVertical: 12, 
                  paddingHorizontal: 8,
                  borderBottomWidth: idx === postOffices.length - 1 ? 0 : 1, 
                  borderBottomColor: '#F4F0FF' 
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.heading }}>{po.Name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Field 
            icon="map-outline" 
            label="District" 
            placeholder="District"
            value={data.district} 
            editable={false} 
          />
        </View>
        <View style={{ flex: 1 }}>
          <Field 
            icon="location-outline" 
            label="State" 
            placeholder="State"
            value={data.state} 
            editable={false} 
          />
        </View>
      </View>

    </View>
  );
};

export default HotelDetailsForm;
