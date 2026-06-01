import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { State, City } from 'country-state-city';

const Step4Address = ({ initialData, onValidationChange, onDataChange }) => {
  // 🌍 Address Local States
  const [country] = useState('India 🇮🇳'); 
  const [pincode, setPincode] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [areaType, setAreaType] = useState(''); 
  const [houseDetails, setHouseDetails] = useState(''); 
  const [locality, setLocality] = useState(''); 

  // 🔄 Dynamic Datasets from Library
  const [allStates] = useState(() => State.getStatesOfCountry('IN')); 
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState('');

  // 🔍 State & City Keyword Search Filters
  const [stateSearchText, setStateSearchText] = useState('');
  const [citySearchText, setCitySearchText] = useState('');

  // 🔽 Dropdown Menu Visibility Controls
  const [showStateMenu, setShowStateMenu] = useState(false);
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [showAreaMenu, setShowAreaMenu] = useState(false);

  // ⏳ Dynamic Validation & Async Status Trackers
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const areaOptions = ['Urban 🌆', 'Rural 🏡', 'Semi-Urban 🏘️'];

  // 🔄 Load and sync master data profile values
  useEffect(() => {
    if (initialData) {
      setPincode(initialData.pincode || '');
      setStateName(initialData.state || '');
      setCity(initialData.city || '');
      setAreaType(initialData.area_type || '');
      setHouseDetails(initialData.house_details || '');
      setLocality(initialData.locality || '');

      if (initialData.state) {
        const foundState = allStates.find(s => s.name.toLowerCase() === initialData.state.toLowerCase());
        if (foundState) {
          setSelectedStateCode(foundState.isoCode);
          setFilteredCities(City.getCitiesOfState('IN', foundState.isoCode));
        }
      }
    }
  }, [initialData]);

  // 🔢 Watcher: Automatically execute lookups when pincode reaches 6 digits
  useEffect(() => {
    if (pincode.length === 6) {
      fetchPincodeData(pincode);
    }
  }, [pincode]);

  const fetchPincodeData = async (pin) => {
    setIsLoading(true);
    setErrors((prev) => ({ ...prev, pincode: null }));
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();

      if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const info = data[0].PostOffice[0];
        const fetchedState = info.State;
        const fetchedCity = info.District;
        
        setStateName(fetchedState);
        setCity(fetchedCity);

        const matchedState = allStates.find(s => s.name.toLowerCase() === fetchedState.toLowerCase());
        if (matchedState) {
          setSelectedStateCode(matchedState.isoCode);
          setFilteredCities(City.getCitiesOfState('IN', matchedState.isoCode));
        }

        let calculatedArea = 'Rural 🏡';
        if (info.Region.toLowerCase().includes('urban') || info.Name.toLowerCase().includes('city')) {
          calculatedArea = 'Urban 🌆';
        }
        setAreaType(calculatedArea);

        onDataChange({
          country, pincode: pin, state: fetchedState, city: fetchedCity, area_type: calculatedArea, house_details: houseDetails, locality,
        });
      } else {
        setErrors((prev) => ({ ...prev, pincode: 'Pincode details not found. Manual entry unlocked.' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, pincode: 'Network timeout. Manual lookup available below.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const dispatchDataUpdate = (updatedFields = {}) => {
    onDataChange({
      country,
      pincode: updatedFields.hasOwnProperty('pincode') ? updatedFields.pincode : pincode,
      state: updatedFields.hasOwnProperty('state') ? updatedFields.state : stateName,
      city: updatedFields.hasOwnProperty('city') ? updatedFields.city : city,
      area_type: updatedFields.hasOwnProperty('area_type') ? updatedFields.area_type : areaType,
      house_details: updatedFields.hasOwnProperty('house_details') ? updatedFields.house_details : houseDetails,
      locality: updatedFields.hasOwnProperty('locality') ? updatedFields.locality : locality,
    });
  };

  // 🛡️ Client-Side Real-time Validation Gatekeeper
  useEffect(() => {
    const newErrors = {};
    if (!pincode || pincode.length !== 6) newErrors.pincode = 'Valid 6-digit Pincode required';
    if (!stateName.trim()) newErrors.state = 'State selection is required';
    if (!city.trim()) newErrors.city = 'City selection is required';
    if (!areaType) newErrors.areaType = 'Area type is required';

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
  }, [pincode, stateName, city, areaType]);

  const handleStateSelect = (selectedState) => {
    setStateName(selectedState.name);
    setSelectedStateCode(selectedState.isoCode);
    setCity(''); 
    setStateSearchText('');
    setShowStateMenu(false);
    
    const loadCities = City.getCitiesOfState('IN', selectedState.isoCode);
    setFilteredCities(loadCities);

    onDataChange({
      country, pincode, state: selectedState.name, city: '', area_type: areaType, house_details: houseDetails, locality
    });
  };

  // 📊 Dynamic Search Engine Formula Matches
  const displayedStates = allStates.filter(st => 
    st.name.toLowerCase().includes(stateSearchText.toLowerCase())
  );

  const displayedCities = filteredCities.filter(ct => 
    ct.name.toLowerCase().includes(citySearchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>Residency & Demographics</Text>
      <Text style={styles.sectionSubtitle}>Enter pincode for auto-fill, or manage fields freely using manual dropdown filters.</Text>

      {/* Country Box */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Country</Text>
        <View style={[styles.inputWrapper, styles.disabledInput]}>
          <Ionicons name="globe-outline" size={20} color="#999" style={styles.inputIcon} />
          <Text style={[styles.input, styles.disabledText]}>{country}</Text>
          <Ionicons name="lock-closed" size={14} color="#999" style={{ marginRight: 12 }} />
        </View>
      </View>

      {/* Pincode Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pincode</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="location-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            value={pincode} 
            onChangeText={(val) => {
              setPincode(val);
              onDataChange({ country, pincode: val, state: stateName, city, area_type: areaType, house_details: houseDetails, locality });
            }} 
            onBlur={() => dispatchDataUpdate({ pincode })}
            keyboardType="numeric" 
            maxLength={6} 
            placeholder="e.g., 226201" 
          />
          {isLoading && <ActivityIndicator size="small" color="#008080" style={{ marginRight: 12 }} />}
        </View>
        {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
      </View>

      {/* State Filter Menu with Search Engine */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>State</Text>
        <TouchableOpacity style={styles.inputWrapper} onPress={() => { setShowStateMenu(!showStateMenu); setShowCityMenu(false); setShowAreaMenu(false); }}>
          <Ionicons name="map-outline" size={20} color="#666" style={styles.inputIcon} />
          <Text style={[styles.input, { paddingTop: 12 }]}>{stateName || 'Select State Manually'}</Text>
          <Ionicons name="chevron-down" size={18} color="#666" style={{ marginRight: 12 }} />
        </TouchableOpacity>
        
        {showStateMenu && (
          <View style={styles.customMenu}>
            <View style={styles.searchBoxContainer}>
              <Ionicons name="search-outline" size={16} color="#888" style={{ marginLeft: 10 }} />
              <TextInput 
                style={styles.searchTextInput}
                placeholder="Type to search state..."
                value={stateSearchText}
                onChangeText={setStateSearchText}
                clearButtonMode="while-editing"
              />
            </View>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }} keyboardShouldPersistTaps="handled">
              {displayedStates.length > 0 ? (
                displayedStates.map((st) => (
                  <TouchableOpacity key={st.isoCode} style={styles.menuItem} onPress={() => handleStateSelect(st)}>
                    <Text style={styles.itemText}>{st.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noResultText}>No matching state found</Text>
              )}
            </ScrollView>
          </View>
        )}
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
      </View>

      {/* City Filter Menu with Search Engine */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>City / District</Text>
        <TouchableOpacity 
          style={styles.inputWrapper} 
          onPress={() => {
            setShowCityMenu(!showCityMenu); setShowStateMenu(false); setShowAreaMenu(false);
          }}
        >
          <Ionicons name="business-outline" size={20} color="#666" style={styles.inputIcon} />
          <Text style={[styles.input, { paddingTop: 12 }]}>
            {city || (selectedStateCode ? 'Select City Manually' : 'Select City (or choose state first)')}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#666" style={{ marginRight: 12 }} />
        </TouchableOpacity>
        
        {showCityMenu && (
          <View style={styles.customMenu}>
            <View style={styles.searchBoxContainer}>
              <Ionicons name="search-outline" size={16} color="#888" style={{ marginLeft: 10 }} />
              <TextInput 
                style={styles.searchTextInput}
                placeholder={selectedStateCode ? "Type to search city..." : "Type city name directly..."}
                value={citySearchText}
                onChangeText={citySearchText => {
                  setCitySearchText(citySearchText);
                  // Dynamic backup fallback for empty code mapping states
                  if(!selectedStateCode) {
                     setCity(citySearchText);
                  }
                }}
              />
            </View>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }} keyboardShouldPersistTaps="handled">
              {selectedStateCode ? (
                displayedCities.length > 0 ? (
                  displayedCities.map((ct, idx) => (
                    <TouchableOpacity 
                      key={`${ct.name}-${idx}`} 
                      style={styles.menuItem} 
                      onPress={() => {
                        setCity(ct.name);
                        setCitySearchText('');
                        setShowCityMenu(false);
                        onDataChange({ country, pincode, state: stateName, city: ct.name, area_type: areaType, house_details: houseDetails, locality });
                      }}
                    >
                      <Text style={styles.itemText}>{ct.name}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noResultText}>No matching city found</Text>
                )
              ) : (
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setShowCityMenu(false);
                    dispatchDataUpdate({ city });
                  }}
                >
                  <Text style={[styles.itemText, { fontWeight: '600', color: '#008080' }]}>
                    Use: "{city || 'Type above to enter'}"
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        )}
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
      </View>

      {/* Area Profile Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Area Type</Text>
        <TouchableOpacity style={styles.inputWrapper} onPress={() => { setShowAreaMenu(!showAreaMenu); setShowStateMenu(false); setShowCityMenu(false); }}>
          <Ionicons name="leaf-outline" size={20} color="#666" style={styles.inputIcon} />
          <Text style={[styles.input, { paddingTop: 12 }]}>{areaType || 'Select Area Type profile'}</Text>
          <Ionicons name="chevron-down" size={18} color="#666" style={{ marginRight: 12 }} />
        </TouchableOpacity>
        {showAreaMenu && (
          <View style={styles.customMenu}>
            {areaOptions.map((opt) => (
              <TouchableOpacity 
                key={opt} 
                style={styles.menuItem} 
                onPress={() => { 
                  setAreaType(opt); 
                  setShowAreaMenu(false); 
                  onDataChange({ country, pincode, state: stateName, city, area_type: opt, house_details: houseDetails, locality });
                }}
              >
                <Text style={styles.itemText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {errors.areaType && <Text style={styles.errorText}>{errors.areaType}</Text>}
      </View>

      {/* House Details */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>House / Flat No. (Optional)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="home-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            value={houseDetails} 
            onChangeText={(val) => {
              setHouseDetails(val);
              onDataChange({ country, pincode, state: stateName, city, area_type: areaType, house_details: val, locality });
            }} 
            placeholder="e.g., Flat 4B" 
          />
        </View>
      </View>

      {/* Locality Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Street / Locality (Optional)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="navigate-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            value={locality} 
            onChangeText={(val) => {
              setLocality(val);
              onDataChange({ country, pincode, state: stateName, city, area_type: areaType, house_details: houseDetails, locality: val });
            }} 
            placeholder="e.g., Sector 62" 
          />
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  sectionSubtitle: { fontSize: 13, color: '#666', marginBottom: 20 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 6 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, height: 45, backgroundColor: '#FAFAFA' },
  disabledInput: { backgroundColor: '#EEEEEE', borderColor: '#DDD' },
  disabledText: { color: '#999', paddingTop: 12 },
  inputIcon: { paddingHorizontal: 12 },
  input: { flex: 1, fontSize: 14, color: '#333', height: '100%' },
  customMenu: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, backgroundColor: '#fff', marginTop: 5, overflow: 'hidden', elevation: 3 },
  searchBoxContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E0E0E0', backgroundColor: '#F9F9F9', height: 40 },
  searchTextInput: { flex: 1, fontSize: 13, paddingHorizontal: 10, height: '100%', color: '#333' },
  menuItem: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
  itemText: { fontSize: 14, color: '#333' },
  noResultText: { padding: 15, fontSize: 13, color: '#999', textAlign: 'center' },
  errorText: { color: '#D32F2F', fontSize: 11, marginTop: 4, marginLeft: 2 }
});

export default Step4Address;
