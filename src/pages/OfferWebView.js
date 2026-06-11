import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

export default function OfferWebView({
  url,
  title,
  onBack
}) {

  const [loading, setLoading] =
    useState(true);

return (
<View style={styles.container}>

{/* TOP BAR */}  
  <View style={styles.header}>  
    <TouchableOpacity
  onPress={onBack}
>
  <Ionicons
    name="arrow-back"
    size={24}
    color="#000"
  />
</TouchableOpacity>

    <Text numberOfLines={1} style={styles.title}>  
      {title || 'Survey'}  
    </Text>  

    <View style={{ width: 24 }} />  
  </View>  

  {/* LOADER */}  
  {loading && (  
    <ActivityIndicator  
      size="large"  
      color="#1a73e8"  
      style={styles.loader}  
    />  
  )}  

  {/* WEBVIEW */}  
  <WebView  
    source={{ uri: url }}  
    onLoadEnd={() => setLoading(false)}  
    startInLoadingState={true}  
  />  
</View>

);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},

header: {
height: 55,
paddingHorizontal: 15,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
borderBottomWidth: 1,
borderColor: '#eee',
},

title: {
flex: 1,
textAlign: 'center',
fontSize: 14,
fontWeight: '700',
},

loader: {
position: 'absolute',
top: '50%',
left: 0,
right: 0,
},
});