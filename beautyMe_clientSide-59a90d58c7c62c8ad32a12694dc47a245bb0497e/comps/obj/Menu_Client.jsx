import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Calendar_professional from '../Calendar_professional'; 
import NewAppointment from '../NewAppointment';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Menu_Client = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.menu}>
    
    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ClientProfile')}>
        <Ionicons name="person-outline" size={24} color="white"  />
        <Text style={styles.menuText}>איזור אישי</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NewSearch3')}>
      <Ionicons name="search" size={24} color="white" />
        <Text style={styles.menuText}>חיפוש</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ClientHome')}>
      <Ionicons name="home" size={24} color="white" />
        <Text style={styles.menuText}>מסך הבית</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('My_Appintments')}>
        <Ionicons name="calendar-outline" size={24} color="white" />
        <Text style={styles.menuText}>התורים שלי</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#f2f2f2',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    backgroundColor:"rgb(92, 71, 205)",
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 12,
    paddingTop: 5,
    color:"white"
  },
});

export default Menu_Client











