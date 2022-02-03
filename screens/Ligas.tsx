import { FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';

export default function Ligas({ navigation }: RootTabScreenProps<'Ligas'>) {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolhe a tua Liga</Text>
      <TextInput placeholder='pesquisar' placeholderTextColor={Colors.dark.tabIconDefault} style={styles.searchInput} />
    
      <TouchableOpacity style={styles.leagueContainer}>

      </TouchableOpacity>

      {/* <FlatList  /> */}

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/Ligas.tsx" /> */}
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
  },
  leagueContainer:{
    width:wp('35%'),
    height: wp('35%'),
    backgroundColor:Colors.dark.primary,
    borderRadius:34,
    borderColor:Colors.dark.tint,
    borderWidth:5,
    
  }
});
