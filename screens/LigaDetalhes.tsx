import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import http from '../api/http';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fakedata from '../lib/fakedata';
// import '../lib/fakedata.tsx'


export default function LigaDetalhes({navigation,route}) {

    const {league}=route.params;

    const [season,setSeason]=useState(2020);
    const [leagueData,setLeagueData]=useState(fakedata.response[0].league);
    const [tableData,setTableData]=useState(fakedata.response[0].league.standings);
    const [liked,setLiked]=useState(false);

    useEffect(()=>{
        // getLeagueDetails();
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

    const toggleLike=()=>{
        setLiked(!liked);
    }

    const TeamCard=({data,index})=>{

        // console.log(data[0]);
        
        return(
            
            <TouchableOpacity style={styles.teamCardContainer}>
            <View>
                <Image source={{uri:data?.team?.logo}} style={{width:50,height:50, borderRadius:10, overflow:'hidden'}} />
                <View style={{backgroundColor:'white', borderRadius:5, alignItems:'center', width:'50%', position:'absolute',top:-10, left:-10}}>
                    <Text style={{color:'black'}}>{data?.rank}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', width:'70%',justifyContent:'space-around'}}>
                <Text style={styles.textPoints}>{data?.points}</Text>
                
                <Text style={styles.textPoints}>{data?.all?.played}</Text>
                <Text style={styles.textPoints}>{data?.all?.win}</Text>
                <Text style={styles.textPoints}>{data?.all?.draw}</Text>
                <Text style={styles.textPoints}>{data?.all?.lose}</Text>
                <Text style={styles.textPoints}>{data?.goalsDiff}</Text>
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
        <TouchableOpacity onPress={toggleLike}>
          {!liked ?<MaterialIcons name="favorite-outline" size={24} color={Colors.dark.primary} /> 
          :
          <MaterialIcons name="favorite" size={24} color={Colors.dark.primary} />  }   
            </TouchableOpacity>
        
        </View>

        <Image source={{uri:`${league.logo}`}} style={styles.bigLogo} />
        <View style={styles.configBar}>
            <TouchableOpacity style={styles.seasonButton}>
                <Text >Escolher temporada</Text>
                <MaterialIcons name="arrow-drop-down" size={24} color='black' />
                </TouchableOpacity>
                <Text style={{color:Colors.dark.tint}}>{leagueData?.season}</Text>
                <Ionicons name="filter" size={24} color={Colors.dark.primary} />
        </View>
        <View style={{flexDirection:'row', width:'70%',justifyContent:'space-around', marginLeft:'15%'}}>
                <Text style={styles.textPointsBold}>P</Text>
                
                <Text style={styles.textPointsBold}>J</Text>
                <Text style={styles.textPointsBold}>V</Text>
                <Text style={styles.textPointsBold}>D</Text>
                <Text style={styles.textPointsBold}>E</Text>
                <Text style={styles.textPointsBold}>SG</Text>
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
      paddingTop:10,
    },
    textPoints:{
        color:'white',
        marginHorizontal:5
    },
    textPointsBold:{
        color:'white',
        marginHorizontal:5,
        fontWeight:'bold',
    },
    teamCardContainer:{
        flexDirection:'row',
         width:'100%',
          backgroundColor:'#385e1333',
           alignItems:'center',
            marginBottom:10,
             padding:10
    },
    bigLogo:{
        width:150, height:150, borderRadius:10, overflow:'hidden', resizeMode:'contain'
    },
    seasonButton:{
        backgroundColor:Colors.dark.primary, alignItems:'center', justifyContent:'center', flexDirection:'row', padding:5
    },
    configBar:{
        width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'space-between', borderBottomColor:Colors.dark.primary, borderBottomWidth:0.2, paddingBottom:20
    }
})