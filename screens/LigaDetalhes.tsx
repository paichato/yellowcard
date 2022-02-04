import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import http from '../api/http';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function LigaDetalhes({navigation,route}) {

    const {league}=route.params;

    const [season,setSeason]=useState(2020);
    const [leagueData,setLeagueData]=useState([]);
    const [tableData,setTableData]=useState([]);

    useEffect(()=>{
        getLeagueDetails();
    },[])

    const getLeagueDetails=()=>{
        http.get(`/standings?season=${season}&league=${league.id}`).then((res)=>{
            console.log(res.data.response[0].league.standings);
            setLeagueData(res.data.response[0].league);
            setTableData(res.data.response[0].league.standings);
            
        }).catch((error)=>{
            console.log(error);
            
        })
    }

    const TeamCard=({data,index})=>{

        console.log(data[0]);
        
        return(
            
            <TouchableOpacity style={{flexDirection:'row', width:'100%', backgroundColor:'red', alignItems:'center'}}>
            <View>
                <Image source={{uri:data?.team?.logo}} style={{width:50,height:50, borderRadius:10, overflow:'hidden'}} />
                <View style={{backgroundColor:'white', borderRadius:5, alignItems:'center', width:'50%'}}>
                    <Text style={{color:'black'}}>{data?.rank}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', width:'70%',}}>
                <Text style={{color:'white',marginHorizontal:5}}>{data?.points}</Text>
                <Text style={{color:'white',marginHorizontal:5}}>{data?.goalsDiff}</Text>
                <Text style={{color:'white',marginHorizontal:5}}>{data?.all?.played}</Text>
                <Text style={{color:'white',marginHorizontal:5}}>{data?.all?.win}</Text>
                <Text style={{color:'white',marginHorizontal:5}}>{data?.all?.draw}</Text>
                <Text style={{color:'white',marginHorizontal:5}}>{data?.all?.lose}</Text>
            </View>
        </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}} >
            <TouchableOpacity onPress={()=>navigation.goBack()}>
             <Ionicons name="arrow-back" size={24} color={Colors.dark.primary} />   
            </TouchableOpacity>
        
        <Text style={{color:Colors.dark.tint}}>{league?.name}</Text>
        <TouchableOpacity>
          <MaterialIcons name="favorite-outline" size={24} color={Colors.dark.primary} /> 
          <MaterialIcons name="favorite" size={24} color={Colors.dark.primary} />     
            </TouchableOpacity>
        
        </View>

        <Image source={{uri:`${league.logo}`}} style={{width:150, height:150, borderRadius:10, overflow:'hidden', resizeMode:'contain'}} />
        <View style={{width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'space-between', borderBottomColor:Colors.dark.primary, borderBottomWidth:0.2, paddingBottom:20}}>
            <TouchableOpacity style={{backgroundColor:Colors.dark.primary, alignItems:'center', justifyContent:'center', flexDirection:'row', padding:5}}>
                <Text >Escolher temporada</Text>
                <MaterialIcons name="arrow-drop-down" size={24} color='black' />
                </TouchableOpacity>
                <Text style={{color:Colors.dark.tint}}>{leagueData?.season}</Text>
                <Ionicons name="filter" size={24} color={Colors.dark.primary} />
        </View>

        <View style={{height:hp('40%'),width:wp('100%')}}>
        <FlatList contentContainerStyle={{width: '100%',alignItems:'center', justifyContent:'space-between',}} 
        horizontal={false} style={{flex:1}}  data={tableData[0]} renderItem={({item,i})=><TeamCard data={item} index={i} />}/>
        </View>
       
               
           
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal:10,
    },
})