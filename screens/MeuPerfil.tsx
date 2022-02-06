import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import { useFavorites } from '../contexts/favorites';
import { useEffect } from 'react';


export default function MeuPerfil({navigation}) {



  const random=[1,2,3,4,5,6];

  const {favoriteLeagues,favoriteTeams,getFavoriteLeagueList,getFavoriteTeamList, clearFavorites}=useFavorites();


  useEffect(()=>{
    getFavoriteLeagueList();
    getFavoriteTeamList();
  },[])


  const handleSelectedFavLeague=(league)=>{
    navigation.navigate('LigaDetalhes',{league});
  }

  const handleSelectedFavTeam=(team)=>{
    navigation.navigate('LigaDetalhes',{teamData:team});
  }

  const handleClear=async()=>{
    clearFavorites();
    getFavoriteLeagueList();
    getFavoriteTeamList();
  }

  const CustomButton=({text,...rest})=>{
    return(
<TouchableOpacity style={{backgroundColor:Colors.dark.primary, borderRadius:5,  alignItems:'center', justifyContent:'center', padding:10, margin:5}} {...rest} >
            <Text style={{color:Colors.dark.background}}>{text}</Text>
          </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <View  style={styles.wrappers}>
          <Text>Ligas</Text>
          <FlatList style={{width:'100%'}} keyboardShouldPersistTaps={'handled'} numColumns={3} horizontal={false} style={{flex:1}} 
      contentContainerStyle={styles.leaguesList} data={favoriteLeagues} renderItem={
        ({item})=><CustomButton 
        onPress={()=>handleSelectedFavLeague(item)} 
        text={item.name}/>
        } />
          
      </View>

      <View  style={styles.wrappers}>
          <Text>Equipas</Text>
          <FlatList style={{width:'100%'}} keyboardShouldPersistTaps={'handled'} numColumns={3} horizontal={false} style={{flex:1}} 
      contentContainerStyle={styles.leaguesList} data={favoriteTeams} renderItem={
        ({item})=>
        <CustomButton 
        onPress={handleSelectedFavTeam(item)} 
        text='Serie A'/>
        } />
          
      </View>

      <CustomButton onPress={handleClear} text='Apagar Favoritos' />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrappers: {
    marginVertical: 30,
    height:hp('20%') ,
    width: '80%',
  },
  leaguesList:{
  
    width: '100%',
    alignItems:'flex-start',
    justifyContent:'space-between',
  },
});
