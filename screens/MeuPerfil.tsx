import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';


export default function MeuPerfil() {


  const random=[1,2,3,4,5,6]

  const CustomButton=({text})=>{
    return(
<TouchableOpacity style={{backgroundColor:Colors.dark.primary, borderRadius:5,  alignItems:'center', justifyContent:'center', padding:10, margin:5}} >
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
      contentContainerStyle={styles.leaguesList} data={random} renderItem={({item})=><CustomButton text='Serie A'/>} />
          
      </View>

      <View  style={styles.wrappers}>
          <Text>Equipas</Text>
          <FlatList style={{width:'100%'}} keyboardShouldPersistTaps={'handled'} numColumns={3} horizontal={false} style={{flex:1}} 
      contentContainerStyle={styles.leaguesList} data={random} renderItem={({item})=><CustomButton text='Serie A'/>} />
          
      </View>

      <CustomButton text='Apagar Favoritos' />
      
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
