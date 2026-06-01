import React from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 StyleSheet
} from 'react-native';

export default function QuickActionButtons({
 onWithdraw,
 onHistory
}) {

 return (

   <View style={styles.row}>

     <TouchableOpacity
       style={styles.withdrawBtn}
       onPress={onWithdraw}
     >
       <Text style={styles.icon}>
         💸
       </Text>

       <Text style={styles.btnText}>
         Withdraw
       </Text>
     </TouchableOpacity>

     <TouchableOpacity
       style={styles.historyBtn}
       onPress={onHistory}
     >
       <Text style={styles.icon}>
         📜
       </Text>

       <Text style={styles.btnText}>
         History
       </Text>
     </TouchableOpacity>

   </View>

 );
}


const styles = StyleSheet.create({

 row:{
   flexDirection:'row',
   marginTop:16,
   gap:12,
 },

 withdrawBtn:{
   flex:1,

   height:60,

   borderRadius:16,

   backgroundColor:'#14b8a6',

   justifyContent:'center',
   alignItems:'center',

   flexDirection:'row',
 },

 historyBtn:{
   flex:1,

   height:60,

   borderRadius:16,

   backgroundColor:'#111827',

   justifyContent:'center',
   alignItems:'center',

   flexDirection:'row',

   borderWidth:1,
   borderColor:'rgba(255,255,255,0.08)',
 },

 icon:{
   fontSize:18,
 },

 btnText:{
   color:'#fff',
   fontWeight:'700',
   marginLeft:8,
   fontSize:15,
 }

});