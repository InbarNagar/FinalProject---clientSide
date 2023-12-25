import { Alert,View, Text, StyleSheet } from "react-native";
import moment from "moment";
import Button from "./Button";
import {CancelAppointmentByClient, ConfirmAppointment} from '../obj/FunctionAPICode'
import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
const AppointmentCard_forProfessional_Calendar = (props) => {
  const { Number_appointment,backgroundColor, Treatment_Type, Client_Name, Start_time, End_time, status, Date, Client_Last_Name,ID_Client,Is_client_house1} = props;
  const navigation = useNavigation();

    function cancelAppointment(Number_appointment){
    console.log("appoinment: "+ Number_appointment);
    CancelAppointmentByClient(Number_appointment).then(
    (result) => {
      console.log(`appointment ${Number_appointment} canceled!! `);
      Alert.alert(`${Number_appointment} is cancelled!`)
    },
    (error) => {
      console.log("error", error);
      // Handle error, including finding a way to display to the user that deletion failed.
    }
  );
}

function ApproveAppointment(Number_appointment){
  console.log("appoinment: "+ Number_appointment);
  ConfirmAppointment(Number_appointment).then(
    (result) => {
      Alert.alert(`${Number_appointment} is confirmed!`)
      console.log(`appointment ${Number_appointment} confirmed!!! `);
    },
    (error) => {
      console.log("error", error);
      // Handle error, including finding a way to display to the user that deletion failed.
    }
  );
}


  const styles = StyleSheet.create({
    card: {
      borderWidth: 2,
      borderRadius: 20,
      borderColor: "rgb(92, 71, 205)",
      padding: 10,
      marginVertical: 5,
      backgroundColor:"white",
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: "center",
    },
    text: {

      fontSize: 20,
    }
  });



  const massage = () => {
    if (status == "Appointment_ended") {
      return <Text style={styles.title}>{Treatment_Type} התור הסתיים </Text>
    }
    if (status == "confirmed"){
      return (<>
      <Text style={styles.title}>:שם לקוחה  {Client_Name} {Client_Last_Name} </Text>
      <Button color="rgb(92, 71, 205)" width={300} fontSize={20} borderRadius={20} colortext="#f0f8ff" text="ביטול תור" onPress={() => cancelAppointment(Number_appointment)} />
            </>)
            }
    if (status == "Not available") // if status =
      return <Text style={styles.title}>תור לא זמין</Text>

    if(status=="Awaiting_approval"){
    return(
    <>
    <Text style={styles.title}>{Treatment_Type} {Client_Name} {Client_Last_Name} :שם לקוחה </Text>
    <Button color="white" width={300} fontSize={20} borderRadius={20} colortext="rgb(92, 71, 205)" text="אשר תור" onPress={() => ApproveAppointment(Number_appointment)}></Button>
    <Button color="white" width={300} fontSize={20} borderRadius={20} colortext="rgb(92, 71, 205)"  text="ביטול תור" onPress={() => cancelAppointment(Number_appointment)} />
    </>
    );
  }
    else { // if status =
      return <Text style={styles.title}>תור עדיין פנוי</Text>
    }
  }

function floatToTime(floatNumber) {
    let hours = Math.floor(floatNumber);
    let minutes = Math.floor((floatNumber - hours) * 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
}

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{moment(Date).format('DD/MM/YYYY')}</Text>
     
      {/* <Text style={styles.title}>{Treatment_Type} - {Client_Name}</Text> */}
      <Text style={styles.title}>{floatToTime(Start_time)}{moment(Start_time).format('LT')}-{moment(End_time).format('LT')}</Text>
      <Text  style={styles.title}>{Is_client_house1} </Text>
      {massage()}
    </View>
  );
};


export default AppointmentCard_forProfessional_Calendar;