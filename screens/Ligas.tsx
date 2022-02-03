import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import http from '../api/http';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';

interface LeagueProps{
  id:String;
  logo:String;
  name:String;
  type:String;
}

export default function Ligas({ navigation }: RootTabScreenProps<'Ligas'>) {

  const fakeData=[{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7}];
  const [inputFocus,setInputFocus]=useState(false);
  const [fetching,setFetching]=useState(true);
  const [leagueData,setLeagueData]=useState([]);
  const [filteredLeagueData,setFilteredLeagueData]=useState([]);
  const [search,setSearch]=useState('');

  useEffect(()=>{
    getLeagues();
    // console.log(process.env.API_SPORTS);
    
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      // setKeyboardStatus("Keyboard Shown");
handleFocus();
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      // setKeyboardStatus("Keyboard Hidden");
      handleUnfocus();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  },[])

  useEffect(() => {

    filterLeagues()
    // console.log(filteredLeagueData)
}, [search,leagueData])

  const getLeagues=async()=>{
    
    http.get('/leagues/').then((res)=>{
      console.log(res.data.response[0].league);
      setLeagueData(res.data.response);
      setFetching(false);
      
    }).catch(error=>{
      console.log(error);
      setFetching(false);
    })
  }

  const handleFocus=()=>{
    setInputFocus(true);
  }

  const handleUnfocus=()=>{
    setInputFocus(false);
  }
  const handleSelection=(data)=>{
console.log(data.league);

  }

  const filterLeagues=()=> {
    const data = leagueData.filter(data => {
        let name = data.league.name;
        // console.log(name);
        
        let searched = search.trim();
        return (!search || name.toLowerCase().includes(searched.toLowerCase()))
    })
    setFilteredLeagueData(data)
}

  const LeagueItem=({data})=>{
    return(
<TouchableOpacity onPress={()=>handleSelection(data)} style={styles.leagueContainer}>
      <Image style={{height:'80%', width:'80%', overflow:'hidden', borderRadius:34, resizeMode:'contain'}} source={{uri:`${data?.league?.logo}`}} />
      <View style={{width:'100%', height:'20%', backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
      <Text style={{color:'black', fontSize:hp('1.2%'), textAlign:'center', fontWeight:'bold'}}>{data?.league?.name}</Text>
      </View>
      
</TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
     {!inputFocus && <Text style={styles.title}>Escolhe a tua Liga</Text>}
      <TextInput value={search} onChangeText={(txt) => setSearch(txt)} returnKeyType="search" onBlur={handleUnfocus} 
      onFocus={handleFocus} placeholder='pesquisar' placeholderTextColor={Colors.dark.tabIconDefault} style={styles.searchInput} />
    
      
      {fetching ? <ActivityIndicator color={Colors.dark.tint} size='large'/> :<View style={{height:hp('40%'),width:wp('100%')}}>
      <FlatList keyboardShouldPersistTaps={'handled'} numColumns={2} horizontal={false} style={{flex:1}} 
      contentContainerStyle={styles.leaguesList} data={filteredLeagueData} keyExtractor={item=>String(item?.league?.id)} renderItem={({item})=><LeagueItem data={item}/>} />

      </View>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginHorizontal:20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  searchInput:{
    width: '80%',
    height:50,
    borderColor:Colors.dark.primary,
    borderWidth:2,
    borderRadius:10,
    paddingLeft:10,
    color:Colors.dark.tint,
  },
  leagueContainer:{
    width:wp('35%'),
    height: wp('35%'),
    backgroundColor:Colors.dark.primary,
    borderRadius:34,
    borderColor:Colors.dark.tint,
    borderWidth:5,
    marginBottom:20,
    marginHorizontal:20,
    alignItems:'center',
    justifyContent:'space-between',
    overflow: 'hidden',
    
  },
  leaguesList:{
    // flexDirection:'row',
    // flexWrap:'wrap',
    width: '100%',
    alignItems:'center',
    justifyContent:'space-between',
  },
});
