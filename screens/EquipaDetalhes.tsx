import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import http from '../api/http';
import Header from '../components/Header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import { useFavorites } from '../contexts/favorites';

interface TeamProps{

}

export default function EquipaDetalhes({route,navigation}) {

    const {teamData}=route.params;

    const [liked,setLiked]=useState(false);
    const [errorMessage,setErrorMessage]=useState();
    const [teamResponse,setTeamResponse]=useState([]);
    const [fetching,setFetching]=useState(false);
    const {favoriteTeams,handleNewFavoriteTeam}=useFavorites();

    const toggleLike=()=>{
        setLiked(!liked);
    }

    useEffect(()=>{
        getTeamDetails();
    },[])

    const getTeamDetails=async()=>{

        setFetching(true);
        setErrorMessage(undefined);
        
        http.get(`/teams?id=${teamData?.team?.id}`).then((res)=>{
            console.log(res.data.response);
            if(res.data.response){
                setTeamResponse(res.data.response[0]);
            
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

    const Card=({title,h1})=>{
        return(
<View style={styles.cardStyle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.h1}>{h1}</Text>
      </View>
        )
    }

  return (
    <View style={styles.container}>
      <Header liked={favoriteTeams?.some(item=> item ===teamData)} league={teamData?.team?.name} toggleLike={()=>handleNewFavoriteTeam(teamData)} navigation={navigation}/>
      <Image source={{uri:`${teamData?.team?.logo}`}} style={styles.bigLogo} />
      

<View style={{height:'5%'}} ></View>
<ScrollView style={{flex:1}} horizontal contentContainerStyle={{alignItems:'center', justifyContent:'space-around'}}>
<Card title='Ano de funda????o' h1={fetching ? '-' : teamResponse?.team?.founded} />
<Card title='Pa??s' h1={fetching ? '-' : teamResponse?.team?.country} />
</ScrollView>

<View style={styles.seasonButton}>
    <Text style={{backgroundColor:Colors.dark.primary, fontWeight:'bold'}}>Est??dio</Text>
</View>

{
    fetching ? 
        <ActivityIndicator size='large' color={Colors.dark.primary}/>  
    : errorMessage ? 
    <View>
        <Text>{errorMessage}</Text>
        <TouchableOpacity onPress={getTeamDetails} style={{backgroundColor:Colors.dark.primary,height:hp('50%'), alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:Colors.dark.background}}>Tentar novamente</Text>
        </TouchableOpacity>
    </View> 
    : 
    <View style={{height:hp('50%'), width:'100%', flexDirection:'row'}}>
        <View style={{height:'100%', width:'50%', alignItems:'center', justifyContent:'space-around'}}>
            <View>
                <Text style={styles.title}>Nome do est??dio</Text>
                <Text style={styles.h2}>{teamResponse?.venue?.name}</Text>
            </View>
        <Image style={styles.venueImage} source={{uri:'https://media.api-sports.io/football/venues/556.png'}} />
    </View>
    <View style={styles.venueDetailsWrapper}>
        <View style={{width:'100%'}} >
        <Text style={styles.title}>Endere??o</Text>
        <Text style={styles.h2}>{teamResponse?.venue?.address}</Text>
        </View>

        <View style={{width:'100%'}}>
        <Text style={styles.title}>Cidade</Text>
        <Text style={styles.h2}>{teamResponse?.venue?.city}</Text>
        </View>

        <View style={{width:'100%'}}>
        <Text style={styles.title}>Capacidade</Text>
        <Text style={styles.h2}>{teamResponse?.venue?.capacity}</Text>
        </View>
    
    </View>
  
</View>
  }

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal:10,
      paddingTop:hp('4%'),
    },
    bigLogo:{
        width:150, height:150, borderRadius:10, overflow:'hidden', resizeMode:'contain'
    },
    title:{
        color:'gray',
        fontSize:16,
    },
    h1:{
        color:Colors.dark.tint,
        fontSize:48,
        fontWeight:'bold',
    },
    h2:{
        color:Colors.dark.tint,
        fontSize:24,
        fontWeight:'bold',
    },
    seasonButton:{
        backgroundColor:Colors.dark.primary, alignItems:'center', justifyContent:'center', flexDirection:'row', padding:5,width:100,
        alignSelf:'flex-start',
        marginTop:hp('2%')
    },

    cardStyle:{
        alignItems:'center',  backgroundColor:Colors.dark.light_gray, padding:20, borderRadius:10, marginHorizontal:10,
    },
    venueDetailsWrapper:{
        height:'100%', width:'50%', alignItems:'center', justifyContent:'space-around', borderTopColor:Colors.dark.primary, borderTopWidth:1
    },
    venueImage:{
        width:'80%',height:'50%',borderRadius:18
    },

})
