import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import tabStyles from './shared/tabStyles';
import IdTypeSelector, { ID_TYPES } from './shared/IdTypeSelector';

type VerifyStep = 'choose' | 'family' | 'couple' | 'pro' | 'student' | 'done';

const VerificationTab = () => {
  const [step, setStep] = useState<VerifyStep>('choose');
  // Family state
  const [primaryId, setPrimaryId] = useState('');
  const [primaryIdType, setPrimaryIdType] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  // Couple state
  const [id1, setId1] = useState('');
  const [id1Type, setId1Type] = useState('');
  const [id2, setId2] = useState('');
  const [id2Type, setId2Type] = useState('');

  // Professional state
  const [workId, setWorkId] = useState('');
  const [workIdType, setWorkIdType] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [occupation, setOccupation] = useState('');

  // Student state
  const [studentId, setStudentId] = useState('');
  const [studentIdType, setStudentIdType] = useState('');
  const [institution, setInstitution] = useState('');
  const [rollNo, setRollNo] = useState('');

  const [idFocus1, setIdFocus1] = useState(false);
  const [idFocus2, setIdFocus2] = useState(false);
  const [primaryIdFocused, setPrimaryIdFocused] = useState(false);
  const [proIdFocused, setProIdFocused] = useState(false);
  const [workplaceFocused, setWorkplaceFocused] = useState(false);
  const [occupationFocused, setOccupationFocused] = useState(false);
  const [studentIdFocused, setStudentIdFocused] = useState(false);
  const [institutionFocused, setInstitutionFocused] = useState(false);
  const [rollNoFocused, setRollNoFocused] = useState(false);
  const [purposeFocused, setPurposeFocused] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [currentType, setCurrentType] = useState<'family' | 'couple' | 'pro' | 'student'>('family');

  const reset = () => {
    setStep('choose');
    setPrimaryId(''); setPrimaryIdType(''); setAdults(1); setChildren(0);
    setId1(''); setId1Type(''); setId2(''); setId2Type('');
    setWorkId(''); setWorkIdType(''); setWorkplace(''); setOccupation('');
    setStudentId(''); setStudentIdType(''); setInstitution(''); setRollNo('');
    setPurpose('');
  };

  const handleSubmit = () => {
    if (step === 'family') {
      if (!primaryIdType) { Alert.alert('Validation', 'Please select an ID type.'); return; }
      if (primaryId.length < 4) { Alert.alert('Validation', 'Please enter a valid ID Number.'); return; }
    }
    if (step === 'couple') {
      if (!id1Type || !id2Type) { Alert.alert('Validation', 'Please select ID types for both guests.'); return; }
      if (id1.length < 4 || id2.length < 4) { Alert.alert('Validation', 'Please enter both valid ID Numbers.'); return; }
    }
    if (step === 'pro') {
      if (!workIdType) { Alert.alert('Validation', 'Please select an ID type.'); return; }
      if (workId.length < 4) { Alert.alert('Validation', 'Please enter a valid ID Number.'); return; }
      if (!workplace.trim()) { Alert.alert('Validation', 'Please enter workplace name.'); return; }
    }
    if (step === 'student') {
      if (!studentIdType) { Alert.alert('Validation', 'Please select an ID type.'); return; }
      if (studentId.length < 4) { Alert.alert('Validation', 'Please enter a valid ID Number.'); return; }
      if (!institution.trim()) { Alert.alert('Validation', 'Please enter institution name.'); return; }
    }
    setStep('done');
  };

  const Counter = ({ value, onChange, min = 0 }: { value: number; onChange: (v: number) => void; min?: number }) => (
    <View style={tabStyles.counter}>
      <TouchableOpacity style={tabStyles.counterBtn} onPress={() => onChange(Math.max(min, value - 1))} activeOpacity={0.7}>
        <Ionicons name="remove" size={18} color={Colors.accent} />
      </TouchableOpacity>
      <Text style={tabStyles.counterVal}>{value}</Text>
      <TouchableOpacity style={tabStyles.counterBtn} onPress={() => onChange(value + 1)} activeOpacity={0.7}>
        <Ionicons name="add" size={18} color={Colors.accent} />
      </TouchableOpacity>
    </View>
  );

  if (step === 'done') {
    return (
      <View style={tabStyles.doneWrap}>
        <View style={tabStyles.doneIcon}>
          <Ionicons name="checkmark-circle" size={60} color="#10B981" />
        </View>
        <Text style={tabStyles.doneTitle}>Verification Successful</Text>
        <Text style={tabStyles.doneBody}>
          {currentType === 'family' && `Family checked in — ${adults} adult${adults > 1 ? 's' : ''}, ${children} child${children !== 1 ? 'ren' : ''}.`}
          {currentType === 'couple' && 'Couple successfully verified and checked in.'}
          {currentType === 'pro' && `Professional verified — ${occupation} at ${workplace}.`}
          {currentType === 'student' && `Student verified — ${institution}.`}
        </Text>
        <TouchableOpacity style={tabStyles.newVerifyBtn} onPress={reset} activeOpacity={0.85}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={tabStyles.newVerifyBtnText}>New Verification</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (step === 'choose') {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Text style={tabStyles.verifyTitle}>Guest Verification</Text>
        <Text style={tabStyles.verifySubtitle}>Select the type of check-in to continue.</Text>

        <TouchableOpacity
          style={tabStyles.choiceCard}
          activeOpacity={0.85}
          onPress={() => { setCurrentType('family'); setStep('family'); }}
        >
          <View style={[tabStyles.choiceIconWrap, { backgroundColor: '#EDE9FE' }]}>
            <Ionicons name="people" size={28} color={Colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={tabStyles.choiceTitle}>Family</Text>
            <Text style={tabStyles.choiceDesc}>One ID for the primary member, plus adult & children count.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.accent} />
        </TouchableOpacity>

        <TouchableOpacity
          style={tabStyles.choiceCard}
          activeOpacity={0.85}
          onPress={() => { setCurrentType('couple'); setStep('couple'); }}
        >
          <View style={[tabStyles.choiceIconWrap, { backgroundColor: '#FCE7F3' }]}>
            <Ionicons name="heart" size={28} color="#DB2777" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={tabStyles.choiceTitle}>Couple</Text>
            <Text style={tabStyles.choiceDesc}>Both guests must present their IDs for verification.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#DB2777" />
        </TouchableOpacity>

        <TouchableOpacity
          style={tabStyles.choiceCard}
          activeOpacity={0.85}
          onPress={() => { setCurrentType('pro'); setStep('pro'); }}
        >
          <View style={[tabStyles.choiceIconWrap, { backgroundColor: '#E0F2FE' }]}>
            <Ionicons name="briefcase" size={28} color="#0EA5E9" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={tabStyles.choiceTitle}>Professional</Text>
            <Text style={tabStyles.choiceDesc}>Verification for working individuals and corporate guests.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#0EA5E9" />
        </TouchableOpacity>

        <TouchableOpacity
          style={tabStyles.choiceCard}
          activeOpacity={0.85}
          onPress={() => { setCurrentType('student'); setStep('student'); }}
        >
          <View style={[tabStyles.choiceIconWrap, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="school" size={28} color="#D97706" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={tabStyles.choiceTitle}>Student</Text>
            <Text style={tabStyles.choiceDesc}>ID verification for students from schools or colleges.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D97706" />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (step === 'family') {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <TouchableOpacity style={tabStyles.backRow} onPress={() => setStep('choose')}>
          <Ionicons name="arrow-back" size={18} color={Colors.accent} />
          <Text style={tabStyles.backRowText}>Family Check-in</Text>
        </TouchableOpacity>

        {/* ID Type Selector */}
        <IdTypeSelector selected={primaryIdType} onSelect={setPrimaryIdType} activeColor={Colors.accent} />

        {/* Primary ID Number */}
        <Text style={tabStyles.fieldLabel}>PRIMARY MEMBER ID NUMBER</Text>
        <View style={[tabStyles.inputRow, primaryIdFocused && { borderColor: Colors.accent }]}>
          <Ionicons
            name={primaryIdType ? (ID_TYPES.find(t => t.key === primaryIdType)?.icon as any ?? 'card-outline') : 'card-outline'}
            size={18}
            color={primaryIdFocused ? Colors.accent : '#9CA3AF'}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={tabStyles.input}
            placeholder={primaryIdType ? `Enter ${ID_TYPES.find(t => t.key === primaryIdType)?.label} number` : 'Select ID type first'}
            placeholderTextColor="#C4C9D4"
            value={primaryId}
            onChangeText={setPrimaryId}
            onFocus={() => setPrimaryIdFocused(true)}
            onBlur={() => setPrimaryIdFocused(false)}
            editable={!!primaryIdType}
            autoCapitalize="characters"
          />
        </View>

        {/* Member Counts */}
        <View style={tabStyles.countCard}>
          <Text style={tabStyles.countCardTitle}>Members Breakdown</Text>
          <View style={tabStyles.countRow}>
            <View style={{ flex: 1 }}>
              <Text style={tabStyles.countLabel}>Adults</Text>
              <Text style={tabStyles.countHint}>18 years and above</Text>
            </View>
            <Counter value={adults} onChange={setAdults} min={1} />
          </View>
          <View style={[tabStyles.countRow, { marginBottom: 0 }]}>
            <View style={{ flex: 1 }}>
              <Text style={tabStyles.countLabel}>Children</Text>
              <Text style={tabStyles.countHint}>Under 18 years</Text>
            </View>
            <Counter value={children} onChange={setChildren} />
          </View>
        </View>

        {/* Purpose of Visit */}
        <Text style={tabStyles.fieldLabel}>PURPOSE OF VISIT</Text>
        <View style={[tabStyles.inputRow, purposeFocused && { borderColor: Colors.accent }]}>
          <Ionicons name="document-text-outline" size={18} color={purposeFocused ? Colors.accent : '#9CA3AF'} style={{ marginRight: 10 }} />
          <TextInput
            style={tabStyles.input}
            placeholder="e.g. Tourism, Personal, Family Visit"
            placeholderTextColor="#C4C9D4"
            value={purpose}
            onChangeText={setPurpose}
            onFocus={() => setPurposeFocused(true)}
            onBlur={() => setPurposeFocused(false)}
          />
        </View>

        <View style={tabStyles.summaryChip}>
          <Ionicons name="people-outline" size={16} color={Colors.accent} />
          <Text style={tabStyles.summaryChipText}>
            Total {adults + children} member{adults + children > 1 ? 's' : ''} · {adults} adult{adults > 1 ? 's' : ''} + {children} child{children !== 1 ? 'ren' : ''}
          </Text>
        </View>

        <TouchableOpacity style={tabStyles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
          <Text style={tabStyles.submitBtnText}>Verify & Check In</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (step === 'pro') {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <TouchableOpacity style={tabStyles.backRow} onPress={() => setStep('choose')}>
          <Ionicons name="arrow-back" size={18} color="#0EA5E9" />
          <Text style={[tabStyles.backRowText, { color: '#0EA5E9' }]}>Professional Verification</Text>
        </TouchableOpacity>

        {/* ID Type Selector */}
        <IdTypeSelector selected={workIdType} onSelect={setWorkIdType} activeColor="#0EA5E9" />

        {/* ID Number */}
        <Text style={tabStyles.fieldLabel}>WORK ID NUMBER</Text>
        <View style={[tabStyles.inputRow, proIdFocused && { borderColor: '#0EA5E9' }]}>
          <Ionicons
            name={workIdType ? (ID_TYPES.find(t => t.key === workIdType)?.icon as any ?? 'briefcase-outline') : 'briefcase-outline'}
            size={18}
            color={proIdFocused ? '#0EA5E9' : '#9CA3AF'}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={tabStyles.input}
            placeholder={workIdType ? `Enter ${ID_TYPES.find(t => t.key === workIdType)?.label} number` : 'Select ID type first'}
            placeholderTextColor="#C4C9D4"
            value={workId}
            onChangeText={setWorkId}
            onFocus={() => setProIdFocused(true)}
            onBlur={() => setProIdFocused(false)}
            editable={!!workIdType}
            autoCapitalize="characters"
          />
        </View>
        {/* Workplace */}
        <Text style={tabStyles.fieldLabel}>WORKPLACE / COMPANY NAME</Text>
        <View style={[tabStyles.inputRow, workplaceFocused && { borderColor: '#0EA5E9' }]}>
          <Ionicons name="business-outline" size={18} color={workplaceFocused ? '#0EA5E9' : '#9CA3AF'} style={{ marginRight: 10 }} />
          <TextInput
            style={tabStyles.input}
            placeholder="e.g. Google, TCS, Hospital Name"
            placeholderTextColor="#C4C9D4"
            value={workplace}
            onChangeText={setWorkplace}
            onFocus={() => setWorkplaceFocused(true)}
            onBlur={() => setWorkplaceFocused(false)}
          />
        </View>

        {/* Occupation */}
        <Text style={tabStyles.fieldLabel}>OCCUPATION / DESIGNATION</Text>
        <View style={[tabStyles.inputRow, occupationFocused && { borderColor: '#0EA5E9' }]}>
          <Ionicons name="person-outline" size={18} color={occupationFocused ? '#0EA5E9' : '#9CA3AF'} style={{ marginRight: 10 }} />
          <TextInput
            style={tabStyles.input}
            placeholder="e.g. Manager, Doctor, Engineer"
            placeholderTextColor="#C4C9D4"
            value={occupation}
            onChangeText={setOccupation}
            onFocus={() => setOccupationFocused(true)}
            onBlur={() => setOccupationFocused(false)}
          />
        </View>

        {/* Purpose of Visit */}
        <Text style={tabStyles.fieldLabel}>PURPOSE OF VISIT</Text>
        <View style={[tabStyles.inputRow, purposeFocused && { borderColor: '#0EA5E9' }]}>
          <Ionicons name="document-text-outline" size={18} color={purposeFocused ? '#0EA5E9' : '#9CA3AF'} style={{ marginRight: 10 }} />
          <TextInput
            style={tabStyles.input}
            placeholder="e.g. Business, Meeting, Training"
            placeholderTextColor="#C4C9D4"
            value={purpose}
            onChangeText={setPurpose}
            onFocus={() => setPurposeFocused(true)}
            onBlur={() => setPurposeFocused(false)}
          />
        </View>

        <TouchableOpacity style={[tabStyles.submitBtn, { backgroundColor: '#0EA5E9' }]} onPress={handleSubmit} activeOpacity={0.85}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
          <Text style={tabStyles.submitBtnText}>Verify & Check In</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (step === 'student') {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <TouchableOpacity style={tabStyles.backRow} onPress={() => setStep('choose')}>
          <Ionicons name="arrow-back" size={18} color="#D97706" />
          <Text style={[tabStyles.backRowText, { color: '#D97706' }]}>Student Verification</Text>
        </TouchableOpacity>

        {/* ID Type Selector */}
        <IdTypeSelector selected={studentIdType} onSelect={setStudentIdType} activeColor="#D97706" />

        {/* ID Number */}
        <Text style={tabStyles.fieldLabel}>STUDENT ID NUMBER</Text>
        <View style={[tabStyles.inputRow, studentIdFocused && { borderColor: '#D97706' }]}>
          <Ionicons
            name={studentIdType ? (ID_TYPES.find(t => t.key === studentIdType)?.icon as any ?? 'school-outline') : 'school-outline'}
            size={18}
            color={studentIdFocused ? '#D97706' : '#9CA3AF'}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={tabStyles.input}
            placeholder={studentIdType ? `Enter ${ID_TYPES.find(t => t.key === studentIdType)?.label} number` : 'Select ID type first'}
            placeholderTextColor="#C4C9D4"
            value={studentId}
            onChangeText={setStudentId}
            onFocus={() => setStudentIdFocused(true)}
            onBlur={() => setStudentIdFocused(false)}
            editable={!!studentIdType}
            autoCapitalize="characters"
          />
        </View>

        {/* Institution */}
        <Text style={tabStyles.fieldLabel}>SCHOOL / COLLEGE / UNIVERSITY</Text>
        <View style={[tabStyles.inputRow, institutionFocused && { borderColor: '#D97706' }]}>
          <Ionicons name="school-outline" size={18} color={institutionFocused ? '#D97706' : '#9CA3AF'} style={{ marginRight: 10 }} />
          <TextInput
            style={tabStyles.input}
            placeholder="Name of your institution"
            placeholderTextColor="#C4C9D4"
            value={institution}
            onChangeText={setInstitution}
            onFocus={() => setInstitutionFocused(true)}
            onBlur={() => setInstitutionFocused(false)}
          />
        </View>

        {/* Roll No */}
        <Text style={tabStyles.fieldLabel}>ROLL NO / STUDENT ID (OPTIONAL)</Text>
        <View style={[tabStyles.inputRow, rollNoFocused && { borderColor: '#D97706' }]}>
          <Ionicons name="barcode-outline" size={18} color={rollNoFocused ? '#D97706' : '#9CA3AF'} style={{ marginRight: 10 }} />
          <TextInput
            style={tabStyles.input}
            placeholder="Your roll number"
            placeholderTextColor="#C4C9D4"
            value={rollNo}
            onChangeText={setRollNo}
            onFocus={() => setRollNoFocused(true)}
            onBlur={() => setRollNoFocused(false)}
          />
        </View>

        {/* Purpose of Visit */}
        <Text style={tabStyles.fieldLabel}>PURPOSE OF VISIT</Text>
        <View style={[tabStyles.inputRow, purposeFocused && { borderColor: '#D97706' }]}>
          <Ionicons name="document-text-outline" size={18} color={purposeFocused ? '#D97706' : '#9CA3AF'} style={{ marginRight: 10 }} />
          <TextInput
            style={tabStyles.input}
            placeholder="e.g. Internship, Competition, Exam"
            placeholderTextColor="#C4C9D4"
            value={purpose}
            onChangeText={setPurpose}
            onFocus={() => setPurposeFocused(true)}
            onBlur={() => setPurposeFocused(false)}
          />
        </View>

        <TouchableOpacity style={[tabStyles.submitBtn, { backgroundColor: '#D97706' }]} onPress={handleSubmit} activeOpacity={0.85}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
          <Text style={tabStyles.submitBtnText}>Verify & Check In</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Couple
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
      <TouchableOpacity style={tabStyles.backRow} onPress={() => setStep('choose')}>
        <Ionicons name="arrow-back" size={18} color="#DB2777" />
        <Text style={[tabStyles.backRowText, { color: '#DB2777' }]}>Couple Check-in</Text>
      </TouchableOpacity>

      {/* Guest 1 */}
      <IdTypeSelector selected={id1Type} onSelect={setId1Type} activeColor="#DB2777" />
      <Text style={tabStyles.fieldLabel}>GUEST 1 — ID NUMBER</Text>
      <View style={[tabStyles.inputRow, idFocus1 && { borderColor: '#DB2777' }]}>
        <Ionicons
          name={id1Type ? (ID_TYPES.find(t => t.key === id1Type)?.icon as any ?? 'person-outline') : 'person-outline'}
          size={18} color={idFocus1 ? '#DB2777' : '#9CA3AF'} style={{ marginRight: 10 }}
        />
        <TextInput
          style={tabStyles.input}
          placeholder={id1Type ? `Enter ${ID_TYPES.find(t => t.key === id1Type)?.label} number` : 'Select ID type first'}
          placeholderTextColor="#C4C9D4"
          value={id1}
          onChangeText={setId1}
          onFocus={() => setIdFocus1(true)}
          onBlur={() => setIdFocus1(false)}
          editable={!!id1Type}
          autoCapitalize="characters"
        />
      </View>

      {/* Guest 2 */}
      <IdTypeSelector selected={id2Type} onSelect={setId2Type} activeColor="#DB2777" />
      <Text style={tabStyles.fieldLabel}>GUEST 2 — ID NUMBER</Text>
      <View style={[tabStyles.inputRow, idFocus2 && { borderColor: '#DB2777' }]}>
        <Ionicons
          name={id2Type ? (ID_TYPES.find(t => t.key === id2Type)?.icon as any ?? 'person-outline') : 'person-outline'}
          size={18} color={idFocus2 ? '#DB2777' : '#9CA3AF'} style={{ marginRight: 10 }}
        />
        <TextInput
          style={tabStyles.input}
          placeholder={id2Type ? `Enter ${ID_TYPES.find(t => t.key === id2Type)?.label} number` : 'Select ID type first'}
          placeholderTextColor="#C4C9D4"
          value={id2}
          onChangeText={setId2}
          onFocus={() => setIdFocus2(true)}
          onBlur={() => setIdFocus2(false)}
          editable={!!id2Type}
          autoCapitalize="characters"
        />
      </View>

      {/* Purpose of Visit */}
      <Text style={tabStyles.fieldLabel}>PURPOSE OF VISIT</Text>
      <View style={[tabStyles.inputRow, purposeFocused && { borderColor: '#DB2777' }]}>
        <Ionicons name="document-text-outline" size={18} color={purposeFocused ? '#DB2777' : '#9CA3AF'} style={{ marginRight: 10 }} />
        <TextInput
          style={tabStyles.input}
          placeholder="e.g. Tourism, Personal, Wedding"
          placeholderTextColor="#C4C9D4"
          value={purpose}
          onChangeText={setPurpose}
          onFocus={() => setPurposeFocused(true)}
          onBlur={() => setPurposeFocused(false)}
        />
      </View>

      <View style={[tabStyles.summaryChip, { backgroundColor: '#FCE7F3', borderColor: '#FBCFE8' }]}>
        <Ionicons name="heart-outline" size={16} color="#DB2777" />
        <Text style={[tabStyles.summaryChipText, { color: '#DB2777' }]}>Both guests' IDs are required for couple check-in.</Text>
      </View>

      <TouchableOpacity style={[tabStyles.submitBtn, { backgroundColor: '#DB2777' }]} onPress={handleSubmit} activeOpacity={0.85}>
        <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
        <Text style={tabStyles.submitBtnText}>Verify & Check In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VerificationTab;
