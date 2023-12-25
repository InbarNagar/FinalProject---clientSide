import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { get_alerts } from '../Functions/Function'
import { UserContext } from './UserDetailsHook'
import PopUp from './PopUp';
import AlertList from '../Pages/AlertList';
import { useFocusEffect } from '@react-navigation/native';

export default function Information({ navigation,backgroundColor }) {
  const { userDetails } = useContext(UserContext);
  const [alerts, setAlert] = useState();
  const [show, setShow] = useState();
  const [alertNumber, setAlertNumber] = useState(0);

  const alertElement =
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { setShow(false) }}
        style={styles.exit}>
        <Text style={styles.exit}>X</Text>
      </TouchableOpacity>
      <AlertList
        list={alerts}
        navigation={navigation}
        setShow={() => { setShow(false) }}
      />
    </View>



  useFocusEffect(
    React.useCallback(() => {
      userDetails && get_alerts(userDetails.id).then((response) => {
        how_many_alerts(response);
        response && setAlert(response);
      })
    }, [show]))

  const how_many_alerts = (alerts) => {
    let temp = alerts.filter(x => x.active == true);
    setAlertNumber(temp.length);
  }

  return (<View style={styles.container(backgroundColor)}>
    <View style={styles.iconsRow}>
      {/* <Text style={styles.title}>Diabesy</Text> */}
      {/* <TouchableOpacity
        style={styles.Secoundicon}
      >

        <Ionicons name="ios-information-circle-outline" size={40} color="#1ea6d6" />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{ zIndex: 5,height:'45%' }}
        onPress={() => { setShow(true) }}
      >
        {alertNumber > 0 && <View style={styles.alertNumber}><Text
          style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}
        >{alertNumber}</Text></View>}
        <Ionicons name="ios-notifications-circle-outline" size={40} color="white" />
      </TouchableOpacity>
    </View>
    {show && <PopUp
      element={alertElement}
      isButton={false}
      show={true}
      alignItems='flex-end'
      justifyContent='flex-start'
      style='information'
      width={90}
      height={70}
     backgroundColor='#eaf5ffe6'
    />}
  </View>
  )
}
const styles = StyleSheet.create({
  container:(color)=>{
return{backgroundColor:color,zIndex:20}
  },
  iconsRow: {
    flexDirection: 'row',
    marginTop: '18%',
    position: 'absolute',
    zIndex: 5,
    alignSelf: 'flex-end',
    marginRight: '7%',

  }, Secoundicon: {
    marginRight: '5%',
    right: '10%'
  },
  exit: {
    position: 'absolute',
    alignSelf: 'flex-end',
    direction: 'rtl',
    fontSize: 20,
    fontWeight: 'bold',
    right: '2%',
    top: '-1%',
       shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.2,
  
  }, alertNumber: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 100,
    width: '50%',
    borderColor: 'white',
    backgroundColor: 'red',
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    position: 'absolute',
    right: '138%', 
    color: 'white',
    color: 'white',
    textShadowColor: '#1EA6D6',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    top:'-3%'
  }
})