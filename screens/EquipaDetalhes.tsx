import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import http from '../api/http';
import Header from '../components/Header';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function EquipaDetalhes({route,navigation}) {

    const {teamData}=route.params;

    const [liked,setLiked]=useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [teamResponse,setTeamResponse]=useState([]);
    const [fetching,setFetching]=useState(false);

    const toggleLike=()=>{
        setLiked(!liked);
    }

    const getTeamDetails=async()=>{
        setFetching(true);
        http.get(`/teams?id=${teamData?.team?.id}&league=${league.id}`).then((res)=>{
            console.log(res.data.response[0].league.standings);
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

  return (
    <View style={styles.container}>
      <Header liked={liked} league={teamData?.team?.name} toggleLike={toggleLike} navigation={navigation}/>
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
})
