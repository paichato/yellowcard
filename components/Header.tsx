import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function Header({navigation,liked, league,toggleLike}) {
  return (
    <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}} >
            <TouchableOpacity onPress={()=>navigation.goBack()}>
             <Ionicons name="arrow-back" size={24} color={Colors.dark.primary} />   
            </TouchableOpacity>
        
        <Text style={{color:Colors.dark.tint}}>{league}</Text>
        <TouchableOpacity onPress={toggleLike}>
          {liked ?<MaterialIcons name="favorite-outline" size={24} color={Colors.dark.primary} /> 
          :
          <MaterialIcons name="favorite" size={24} color={Colors.dark.primary} />  }   
            </TouchableOpacity>
        
        </View>
  );
}
