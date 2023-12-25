// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, TouchableOpacity, Switch, TextInput, StyleSheet, Keyboard } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Menu_treatment_registration from './Menu_treatment_registration';
// import Button from './obj/Button';
// import {NewAppointmentPost} from './obj/FunctionAPICode';
// // import { Header } from 'react-native-elements';
// import Header from './obj/Header';
// // import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../comps/UserDietails';
// import Menu_professional from "./obj/Menu_professional";


import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Switch, TextInput, StyleSheet, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import Menu_treatment_registration from './Menu_treatment_registration';
import Button from './obj/Button';
import {NewAppointmentPost} from './obj/FunctionAPICode';
// import { Header } from 'react-native-elements';
import Header from './obj/Header';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../comps/UserDietails';
import Menu_professional from "./obj/Menu_professional";


const Stack = createNativeStackNavigator();


const NewAppointment = () => {

    const {userDetails, setUserDetails} = useContext(UserContext);
    const BussinesNumberuseContext = userDetails.Business_Number;
    const professional_id = userDetails.ID_number;

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [canGoToClient, setCanGoToClient] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [businessNumber, setBusinessNumber] = useState('');
  const [Appointment_status, setAppointment_status] = useState('In process');
  const [idNumber, setIdNumber] = useState(''); // ללוקאלסטורג

  const navigation = useNavigation();



   
    const handelLocalstorage = async () => { //קבלת הנתונים הרצויים מהלוקאלסטורג
      try {
        const id = await AsyncStorage.getItem('idNumber_professional');
        console.log('idNumber loaded successfully', id);
        setIdNumber(id || '');
      } catch (error) {
        console.log('Failed to load idNumber from AsyncStorage', error);
      }
    }

    const printAsyncStorageKeys = async () => { // פונקציה שכל מטרתה הוא לבדוק איזה מפתחות יש בלוקאלסטורג ואיך קוראים להם
      const keys = await AsyncStorage.getAllKeys();
      console.log("AsyncStorage keys: ", keys);
    }

    useEffect(() => {
      printAsyncStorageKeys()
      handelLocalstorage()
      console.log(userDetails + "999999")
      console.log(BussinesNumberuseContext + " 999999")

    }, []);
     

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentTime);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentTime);
  };

  const getYesNoFromSwitchValue = (value) => {
    return value ? 'YES' : 'NO';
  };

  const handleSubmit = async () => {
    const data = {
      Date: date,
      Start_time: startTime.toLocaleTimeString(),
      End_time: endTime.toLocaleTimeString(),
      Is_client_house: getYesNoFromSwitchValue(canGoToClient),
    //   Is_client_house: canGoToClient,
      Business_Number: BussinesNumberuseContext,
      Appointment_status: Appointment_status
    };

    // ככה מנסה עם לשמור בלוקאל סטורג... צריל לבדוק שזה עובד!
    try {
    const result = await NewAppointmentPost(data);
    console.log(data);
    // console.log(NewAppointmentPost(data));
    console.log("999");
    console.log(result);
    console.log('yes', result.data.appointmentId);
    await AsyncStorage.setItem('appointmentId', result.data.appointmentId.toString());
    navigation.navigate('Menu_treatment_forAppointment');
    } 
    catch (error) {
      console.log('error', error);
    }

    console.log(1);
};
            
            
         

  return (
    <>
    <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
    <View style={styles.container}>

    <Header text="הוספת תור חדש" fontSize={50} height={200}/>

    {/* <TextInput
     style={styles.input}
     onChangeText={setBusinessNumber}
     value={businessNumber}
     placeholder="Business Number"
     keyboardType="numeric"
   /> */}

<Text>{'\n'}</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>{date.toLocaleDateString()} תאריך:</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
  
      <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
        <Text style={styles.label}> {startTime.toLocaleTimeString()}שעת התחלה:</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}
  
      <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.label} >  {endTime.toLocaleTimeString()}שעת סיום:</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={handleEndTimeChange}
        />
      )}
  
  <View style={styles.row}>
     
      <Switch value={canGoToClient} onValueChange={setCanGoToClient} />
       <Text style={styles.label}>יכול להגיע לבית הלקוח:</Text>
    </View>

    <Text>{'\n'}</Text>
    
    <Button onPress={handleSubmit} text="הוספת התור" color="#98FB98" fontSize={30} />
      {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Appointment</Text>
      </TouchableOpacity> */}
    </View>
    </TouchableOpacity>
    <Menu_professional/>
    </>

  );
  };

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 3,
      width: '100%',
      marginTop: 10,
      marginBottom: 20,
      fontSize: 18,
    },
    button: {
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
  });

export default NewAppointment ;

//         fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Appointment/NewAppointment', {
//       method: 'POST',
//       headers: new Headers({
//         "Content-type": "application/json; charset=UTF-8", 
//         'Accept': "application/json; charset=UTF-8",
//     }),
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//       console.log('Success:', result);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     })
//     .then(<NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Menu_treatment_registration" component={Menu_treatment_registration} />
//         </Stack.Navigator>
//       </NavigationContainer>);
       

//   };
    



//ככה עובד לי בלי להכניס ללוקאל סטורג
    // NewAppointmentPost(data).then((result) => {
    //     // console.log('yes', result)
    //     console.log('yes', result.appointmentId);
    //   }, (error) => {
    //     console.log('error', error)
    //   })
    //   .then(<NavigationContainer>
    //             <Stack.Navigator>
    //                <Stack.Screen name="Menu_treatment_registration" component={Menu_treatment_registration} />
    //             </Stack.Navigator>
    //            </NavigationContainer>);
    //            console.log(1);
