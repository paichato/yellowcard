import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import http from '../api/http';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fakedata from '../lib/fakedata';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';
// import '../lib/fakedata.tsx'


export default function LigaDetalhes({navigation,route}) {

    const {league}=route.params;

    const [season,setSeason]=useState(2020);
    const [leagueData,setLeagueData]=useState(fakedata.response[0].league);
    const [tableData,setTableData]=useState(fakedata.response[0].league.standings);
    const [liked,setLiked]=useState(false);
    const [isOpen,setIsOpen]=useState(false);
    const [orderAsc, setOrderAsc]=useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [fetching,setFetching]=useState(false);
    const seasonData=[{id:'2008'},{id:'2009'},{id:'2010'},{id:'2011'},{id:'2012'},{id:'2013'},{id:'2014'},{id:'2015'},{id:'2016'},{id:'2017'},{id:'2018'},{id:'2019'},{id:'2020'},{id:'2021'},{id:'2022'}]
    useEffect(()=>{
        // getLeagueDetails();
    },[])

    const getLeagueDetails=async()=>{
        setFetching(true);
        http.get(`/standings?season=${season}&league=${league.id}`).then((res)=>{
            console.log(res.data.response[0].league.standings);
            if(res.data.response){
                setLeagueData(res.data.response[0].league);
            setTableData(res.data.response[0].league.standings);
            }else{
                setErrorMessage(JSON.stringify('Error ao carregar dados:',res.data.errors));
            }
            

            setFetching(false);
            
        }).catch((error)=>{
            console.log(error);
            setErrorMessage('Erro ao carregar dados:',error?.response?.data?.message);
            setFetching(false);
        })
    }

    const handleSelectSeason=(id)=>{
        console.log(id);
        
        setSeason(id);
        toggleOpen();
        getLeagueDetails();
    }

    const handleSelectTeam=(data)=>{


        navigation.navigate('EquipaDetalhes',{teamData:data})
    }

    const toggleLike=()=>{
        setLiked(!liked);
    }

    const toggleOpen=()=>{
        setIsOpen(!isOpen);
    }

    const toggleOrder=()=>{
        setOrderAsc(!orderAsc);
    }

    const TeamCard=({data,index})=>{

        // console.log(data[0]);
        
        return(
            
            <TouchableOpacity onPress={()=>handleSelectTeam(data)} style={[styles.teamCardContainer,data.rank <4 ? {backgroundColor:'green'} : data.rank>15 && {backgroundColor:'rgba(150,0,0,0.5)'}]}>
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

    // const Header=()=>{
    //     return(
    //         <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-around'}} >
    //         <TouchableOpacity onPress={()=>navigation.goBack()}>
    //          <Ionicons name="arrow-back" size={24} color={Colors.dark.primary} />   
    //         </TouchableOpacity>
        
    //     <Text style={{color:Colors.dark.tint}}>{league?.name}</Text>
    //     <TouchableOpacity onPress={toggleLike}>
    //       {!liked ?<MaterialIcons name="favorite-outline" size={24} color={Colors.dark.primary} /> 
    //       :
    //       <MaterialIcons name="favorite" size={24} color={Colors.dark.primary} />  }   
    //         </TouchableOpacity>
        
    //     </View>
    //     )
    // }

    const ConfigBar=()=>{
        return(
            <View style={styles.configBar}>
            <TouchableOpacity onPress={toggleOpen} style={styles.seasonButton}>
                
                <Text >Escolher temporada</Text>
                <MaterialIcons name="arrow-drop-down" size={24} color='black' />
                </TouchableOpacity>
                <Text style={{color:Colors.dark.tint}}>{season}</Text>
                <TouchableOpacity style={{width:50, flexDirection:'row'}} onPress={toggleOrder}>
                <MaterialCommunityIcons name="order-numeric-ascending" size={24} color={Colors.dark.primary} />
                    {
                        orderAsc ? <FontAwesome5 name="long-arrow-alt-down" size={24} color={Colors.dark.primary} />
                        :
                        <FontAwesome5 name="long-arrow-alt-up" size={24} color={Colors.dark.primary} />
                    }
                </TouchableOpacity>
                
                
        </View>
        )
    }

    const TableHeader=()=>{
        return(
            <View style={{flexDirection:'row', width:'70%',justifyContent:'space-around', marginLeft:'15%'}}>
                <Text style={styles.textPointsBold}>P</Text>
                
                <Text style={styles.textPointsBold}>J</Text>
                <Text style={styles.textPointsBold}>V</Text>
                <Text style={styles.textPointsBold}>D</Text>
                <Text style={styles.textPointsBold}>E</Text>
                <Text style={styles.textPointsBold}>SG</Text>
            </View>
        )
    }

  return (
    <View style={styles.container}>
        <Header liked={liked} league={league?.name} toggleLike={toggleLike} navigation={navigation}/>

        <Image source={{uri:`${league.logo}`}} style={styles.bigLogo} />

        <ConfigBar/>
        
        {fetching ? <ActivityIndicator size='large' color={Colors.dark.primary} /> : <><TableHeader/>

        <View style={{height:hp('40%'),width:wp('100%')}}>
        <FlatList inverted={orderAsc} contentContainerStyle={{width: '100%',alignItems:'center', justifyContent:'space-between',}} 
        horizontal={false} style={{flex:1}}  data={tableData[0]} renderItem={({item,i})=><TeamCard data={item} index={i} />}/>
        </View></>}
       
               
           
      <Text></Text>
      {isOpen && <View style={{height:300,width:170, backgroundColor:'#35310e', position:'absolute', top:hp('40%'), left:wp('2.8%'), elevation:3, zIndex:10}}>
        <ScrollView style={{flex:1}}>
            {seasonData.map((item)=>{
                return(
                    <TouchableOpacity onPress={()=>handleSelectSeason(item.id)} style={{alignItems:'center', justifyContent:'space-around',padding:5, borderBottomWidth:0.4, borderBottomColor:Colors.dark.primary}}>
                        <Text style={{fontWeight:'bold', color:Colors.dark.primary}}>{item.id}</Text>
                    </TouchableOpacity>
                    
                )
            })}
        </ScrollView>
                </View>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal:10,
      paddingTop:hp('2%'),
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
        backgroundColor:Colors.dark.primary, alignItems:'center', justifyContent:'center', flexDirection:'row', padding:5,width:170
    },
    configBar:{
        width:'100%', flexDirection:'row', alignItems:'center',justifyContent:'space-between', borderBottomColor:Colors.dark.primary, borderBottomWidth:0.2, paddingBottom:20
    }
})