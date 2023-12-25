import { View, ScrollView, StyleSheet, Text } from "react-native";
import Button from "../obj/Button";
import { useState,useRef  } from "react";
import { UserContext } from '../UserDietails';
import React, { useContext } from "react";
import {  AllAppointmentForClientt } from "../obj/FunctionAPICode";
import Menu_Client from "../obj/Menu_Client";
import AppointmentCard_forClient from "./AppointmentCard_forClient";
import Header from "../obj/Header";

import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);


// const all = [
//   {
//     "Number_appointment": 1128,
//     "Date": "2023-05-22",
//     "Is_client_house": "NO",
//     "Business_Number": 4,
//     "Appointment_status": "Appointment_ended",
//     "ID_Client": 123456789,
//     "Start_Hour": 10,
//     "End_Hour": 10,
//     "Type_Treatment_Number": null,
//     "Review_Number": 5,
//     "Cleanliness": 3,
//     "Professionalism": 3,
//     "On_time": 3,
//     "Overall_rating": 3,
//     "Comment": "היה מקצועי מאוד ואחזור אליה!",
//     "Client_ID_number": 123456789,
//     "Business_Name": "עולם היופי",
//     "AddressStreet": "פנחס לבון",
//     "AddressCity": "נתניה",
//     "Professional_ID_number": 123455555,
//     "About": "עולם היופי של נתניה",
//     "phone": "0528710098",
//     "Facebook_link": "https://www.facebook.com/ofir.bidani/",
//     "Instagram_link": "https://www.instagram.com/ofir_bidani1/",
//     "AddressHouseNumber": 16,
//     "LetCordinate": 32.2838812,
//     "LongCordinate": 34.8540928
//   },
//   {
//     "Number_appointment": 1135,
//     "Date": "2023-05-24",
//     "Is_client_house": "YES",
//     "Business_Number": 4,
//     "Appointment_status": "Appointment_ended",
//     "ID_Client": 123456789,
//     "Start_Hour": 17.033333,
//     "End_Hour": 17.033333,
//     "Type_Treatment_Number": null,
//     "Review_Number": null,
//     "Cleanliness": null,
//     "Professionalism": null,
//     "On_time": null,
//     "Overall_rating": null,
//     "Comment": null,
//     "Client_ID_number": 123456789,
//     "Business_Name": "עולם היופי",
//     "AddressStreet": "פנחס לבון",
//     "AddressCity": "נתניה",
//     "Professional_ID_number": 123455555,
//     "About": "עולם היופי של נתניה",
//     "phone": "0528710098",
//     "Facebook_link": "https://www.facebook.com/ofir.bidani/",
//     "Instagram_link": "https://www.instagram.com/ofir_bidani1/",
//     "AddressHouseNumber": 16,
//     "LetCordinate": 32.2838812,
//     "LongCordinate": 34.8540928
//   },
//   {
//     "Number_appointment": 1136,
//     "Date": "2023-05-30",
//     "Is_client_house": "YES",
//     "Business_Number": 4,
//     "Appointment_status": "Appointment_ended",
//     "ID_Client": 123456789,
//     "Start_Hour": 10.5,
//     "End_Hour": 10.5,
//     "Type_Treatment_Number": null,
//     "Review_Number": null,
//     "Cleanliness": null,
//     "Professionalism": null,
//     "On_time": null,
//     "Overall_rating": null,
//     "Comment": null,
//     "Comment": "כיף חיים",
//     "Client_ID_number": 123456789,
//     "Business_Name": "עולם היופי",
//     "AddressStreet": "פנחס לבון",
//     "AddressCity": "נתניה",
//     "Professional_ID_number": 123455555,
//     "About": "עולם היופי של נתניה",
//     "phone": "0528710098",
//     "Facebook_link": "https://www.facebook.com/ofir.bidani/",
//     "Instagram_link": "https://www.instagram.com/ofir_bidani1/",
//     "AddressHouseNumber": 16,
//     "LetCordinate": 32.2838812,
//     "LongCordinate": 34.8540928
//   },
//   {
//     "Number_appointment": 1137,
//     "Date": "2023-06-08",
//     "Is_client_house": "YES",
//     "Business_Number": 1049,
//     "Appointment_status": "Awaiting_approval",
//     "ID_Client": 123456789,
//     "Start_Hour": 16,
//     "End_Hour": 16,
//     "Type_Treatment_Number": null,
//     "Review_Number": 10,
//     "Cleanliness": 7,
//     "Professionalism": 7,
//     "On_time": 5,
//     "Overall_rating": 5,
//     "Comment": "מעולה",
//     "Client_ID_number": 123456789,
//     "Business_Name": "By Neta",
//     "AddressStreet": "פרישמן",
//     "AddressCity": "תל אביב",
//     "Professional_ID_number": 308547631,
//     "About": null,
//     "phone": null,
//     "Facebook_link": null,
//     "Instagram_link": null,
//     "AddressHouseNumber": 39,
//     "LetCordinate": 32.0798131,
//     "LongCordinate": 34.773688
//   },
//   {
//     "Number_appointment": 1130,
//     "Date": "2023-05-22",
//     "Is_client_house": "NO",
//     "Business_Number": 4,
//     "Appointment_status": "Confirmed",
//     "ID_Client": 123456789,
//     "Start_Hour": 13,
//     "End_Hour": 13,
//     "Type_Treatment_Number": null,
//     "Review_Number": 11,
//     "Cleanliness": null,
//     "Professionalism": 7,
//     "On_time": 7,
//     "Overall_rating": 7,
//     "Comment": "כן נחמד מאוד",
//     "Client_ID_number": 123456789,
//     "Business_Name": "עולם היופי",
//     "AddressStreet": "פנחס לבון",
//     "AddressCity": "נתניה",
//     "Professional_ID_number": 123455555,
//     "About": "עולם היופי של נתניה",
//     "phone": "0528710098",
//     "Facebook_link": "https://www.facebook.com/ofir.bidani/",
//     "Instagram_link": "https://www.instagram.com/ofir_bidani1/",
//     "AddressHouseNumber": 16,
//     "LetCordinate": 32.2838812,
//     "LongCordinate": 34.8540928
//   }
// ]



//מסך ראשי בעל עסק
export default function My_Appintments() {
  
  
  const buttonRef2 = useRef();
  const buttonRef3 = useRef();
  const buttonRef4 = useRef();
  
  const handlePressIn = (buttonRef) => {
    buttonRef.current.animate({
      0: { scale: 1 },
      1: { scale: 0.9 },
    });
  };

  const handlePressOut = (buttonRef) => {
    buttonRef.current.animate({
      0: { scale: 0.9 },
      1: { scale: 1 },
    });
  };

  const { userDetails, setUserDetails } = useContext(UserContext);
  const IDNumber = userDetails.ID_number;
  const [allAppointment, setallAppointment] = useState([])
  const [allAppointmentAvilable, setallAppointmentAvilable] = useState([])
  const [allAppointmentEnd, setallAppointmentEnd] = useState([])
  const [FutureAppointment, setFutureAppointment] = useState([])
  const [Client, setclient] = useState([])
  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showText4, setShowText4] = useState(false);

  let today = new Date();
  let currentHour = today.getHours(); 
  let currentMinute = today.getMinutes(); 
  let currentTime = `${currentHour}:${currentMinute}`;
console.log(userDetails)

  function floatToTime(floatNumber) {
    let hours = Math.floor(floatNumber);
    let minutes = Math.floor((floatNumber - hours) * 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
  }
  
  const handleSubmit = () => {
    AllAppointmentForClientt(userDetails.ID_number).then((result) => {
      if (result) {
    let sortedResult = result.sort((a, b) => {
      let dateA = new Date(a.Date + ' ' + a.Start_Hour);
      let dateB = new Date(b.Date + ' ' + b.Start_Hour);
      return dateA - dateB;
    });
    sortedResult = sortedResult.reverse(); // הופך את הסדר של המערך
    setallAppointment(sortedResult);
    console.log(sortedResult, "1111");
      }
        
     }, (error) => {
      console.log('error', error)
    })
    setShowText2(!showText2);
  }

  const handleSubmit4 = () => {

    AllAppointmentForClientt(userDetails.ID_number).then((result) => {
        let filterresult=""
      if(result)
      {
          let sortedResult = result.sort((a, b) => {
            let dateA = new Date(a.Date + ' ' + a.Start_Hour);
            let dateB = new Date(b.Date + ' ' + b.Start_Hour);
            return dateA - dateB;
          });
          sortedResult = sortedResult.reverse();
     filterresult =  sortedResult.filter(apo=>((floatToTime(apo.Start_Hour) <= currentTime &&floatToTime(apo.End_Hour) <= currentTime) && today.setHours(0, 0, 0, 0) >=  new Date(apo.Date).setHours(0, 0, 0, 0)))
 
    setallAppointmentEnd(filterresult)
}
    }, (error) => {
      console.log('error', error)
    })

    setShowText4(!showText4);
  }

  const handleSubmit3 = () => {

    AllAppointmentForClientt(userDetails.ID_number).then((result) => {
        let filterresult3=""
      if(result){
     filterresult3= result.filter(apo=> (today.setHours(0, 0, 0, 0) == new Date(apo.Date).setHours(0, 0, 0, 0)))

     setFutureAppointment(filterresult3)//תורים של היום הנוכחי

     
}

    }, (error) => {
      console.log('error', error)
    })

    setShowText3(!showText3);
  }



  return (
    <>
      <ScrollView style={{ backgroundColor:"#e6e6fa"}}>
        <View style={styles.view}>
        <ScrollView horizontal={true}>
  <View style={styles.container}>
    <AnimatedButton
      ref={buttonRef2}
      onPressIn={() => {
        handlePressIn(buttonRef2);
        handleSubmit();
      }}
      onPressOut={() => handlePressOut(buttonRef2)}
      style={{ backgroundColor: showText2 ? 'rgb(92, 71, 205)' : 'white', padding: 15, borderRadius: 70, marginHorizontal: 10 }}
    >
      <Text style={{ color: showText2 ? 'white' : 'black' }}>כל התורים</Text>
    </AnimatedButton>

    <AnimatedButton
      ref={buttonRef3}
      onPressIn={() => {
        handlePressIn(buttonRef3);
        handleSubmit3();
      }}
      onPressOut={() => handlePressOut(buttonRef3)}
      style={{ backgroundColor: showText3 ? 'rgb(92, 71, 205)' : 'white', padding: 15, borderRadius: 70, marginHorizontal: 10 }}
    >
      <Text style={{ color: showText3 ? 'white' : 'black' }}>תורים להיום</Text>
    </AnimatedButton>

    <AnimatedButton
      ref={buttonRef4}
      onPressIn={() => {
        handlePressIn(buttonRef4);
        handleSubmit4();
      }}
      onPressOut={() => handlePressOut(buttonRef4)}
      style={{ backgroundColor: showText4 ? 'rgb(92, 71, 205)' : 'white', padding: 15, borderRadius: 70, marginHorizontal: 10 }}
    >
      <Text style={{ color: showText4 ? 'white' : 'black' }}> היסטורית תורים</Text>
    </AnimatedButton>
  </View>
</ScrollView>
<Header 
  fontSize={23} 
  height={50} 
  color={"rgb(92, 71, 205)"}  
  text={`שלום ${userDetails.First_name}, ${showText3 ? 'אלו התורים שהזמנת להיום' : ''}`}
/>
           
          {showText2 && <View style={styles.view1}>
            {allAppointment && allAppointment.length > 0 &&
              allAppointment.map((appointment) => {
              console.log("key: "+appointment.Number_appointment);
              return (
                <AppointmentCard_forClient
                  key={appointment.Number_appointment}
                  Review_Number={appointment.Review_Number}
                  backgroundColor={"white"}
                  Date1={appointment.Date}
                  Start_time={appointment.Start_Hour}
                  End_time={appointment.End_Hour}
                  AddressStreet={appointment.AddressStreet}
                  AddressHouseNumber={appointment.AddressHouseNumber}
                  AddressCity={appointment.AddressCity}
                  BusinessName={appointment.Name}
                  Business_Number={appointment.Business_Number}
                  ClientIDnumber={appointment.ID_Client}
                  Type_Treatment_Number={appointment.Type_Treatment_Number}
                  phone={appointment.phone}
                  Is_client_house={appointment.Is_client_house1}
                  Treatment_Type={appointment.Treatment_Name}
                  token={appointment.token}
                  Number_appointment={appointment.Number_appointment}
                  idb={appointment.Professional_ID_number}
                  Instagram_link={appointment.Instagram_link}
                  Facebook_link={appointment.Facebook_link}
                />
              );
            })}

          </View>}

          {showText4 && <View style={styles.view1}>
            {allAppointmentEnd && allAppointmentEnd.length > 0 &&
              allAppointmentEnd.map((appointment)=> {
                  return (
                    <AppointmentCard_forClient
                    key={appointment.Number_appointment}
                    Review_Number={appointment.Review_Number}
                    backgroundColor={"white"}
                    Date1={appointment.Date}
                    Start_time={appointment.Start_Hour}
                    End_time={appointment.End_Hour}
                    AddressStreet={appointment.AddressStreet}
                    AddressHouseNumber={appointment.AddressHouseNumber}
                    AddressCity={appointment.AddressCity}
                    BusinessName={appointment.Name}
                    Business_Number={appointment.Business_Number}
                    ClientIDnumber={appointment.ID_Client}
                    Type_Treatment_Number={appointment.Type_Treatment_Number}
                    phone={appointment.phone}
                    Is_client_house={appointment.Is_client_house1}
                    Treatment_Type={appointment.Treatment_Name}
                    token={appointment.token}
                    Number_appointment={appointment.Number_appointment}
                    idb={appointment.Professional_ID_number}
                    />
                  )
              })}
          </View>}


          {showText3 && <View style={styles.view1}>
            {FutureAppointment && FutureAppointment.length > 0 &&
              FutureAppointment.map((appointment)=> {
                return (
                  <AppointmentCard_forClient
                  key={appointment.Number_appointment}
                  Review_Number={appointment.Review_Number}
                  backgroundColor={"white"}
                  Date1={appointment.Date}
                  Start_time={appointment.Start_Hour}
                  End_time={appointment.End_Hour}
                  AddressStreet={appointment.AddressStreet}
                  AddressHouseNumber={appointment.AddressHouseNumber}
                  AddressCity={appointment.AddressCity}
                  BusinessName={appointment.Name}
                  Business_Number={appointment.Business_Number}
                  ClientIDnumber={appointment.ID_Client}
                  Type_Treatment_Number={appointment.Type_Treatment_Number}
                  phone={appointment.phone}
                  Is_client_house={appointment.Is_client_house1}
                  Treatment_Type={appointment.Treatment_Name}
                  token={appointment.token}
                  Number_appointment={appointment.Number_appointment}
                  idb={appointment.Professional_ID_number}    
                  />
                )
              })}
          </View>}    
        
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>

      <Menu_Client/>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },

  view1: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    margin:10
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"#e6e6fa"
  },
  wel: {
    textAlign: "center",
    fontSize: 30,
    color: '#9acd32',
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color:"rgb(92, 71, 205)"
  }

});




//  {/* allAppointment.map(x => {
               
//                 console.log(x.Date)
//                 return (
//                   <AppointmentCard_forProfessional_Calendar
//                     key={x.Number_appointment}
//                     Number_appointment={x.Number_appointment}
//                     backgroundColor={"rgb(92, 71, 205)"}
//                     // Treatment_Type= 
//                     status={x.Appointment_status}
//                     Date={x.Date}
//                     Start_time={x.Start_Hour}
//                     End_time={x.End_Hour}
//                     Client_Name={x.First_name}
//                     Client_Last_Name={x.Last_name}
//                   />
//                 )}) */}