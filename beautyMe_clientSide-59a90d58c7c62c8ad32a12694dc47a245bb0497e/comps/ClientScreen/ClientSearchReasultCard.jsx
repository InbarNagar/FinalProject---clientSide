import {React,useState,useEffect,useContext} from "react";
import {Text,View,Alert,StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import { Button } from "react-native-elements";
import {AppointmentToClient,Post_SendPushNotification, AllApointemtDetailes, AllBusinessReviews} from '../obj/FunctionAPICode';
import { UserContext } from "../UserDietails";
import BusinessProfilePOPUP from './BusinessProfilePOPUP'


const ClientSearchReasultCard = (props) => {


  const { userDetails, setUserDetails } = useContext(UserContext);
  const ClientData = userDetails;
  const [apo,setapo]=useState();
  const  {
    ClientIDnumber,
    Is_client_house,
    End_time,
    Start_time,
    Date,
    Number_appointment,
    Business_Number,
    AddressStreet,
    AddressHouseNumber,
    AddressCity,
    Appointment_status
  } = props;

  const [token, settoken] = useState();// ענבר
  const [modalVisible, setModalVisible] = useState(false);
  const [businessProfilePOPUP,SetBusinessProfilePOPUP]=useState(false);
  const [businessRankArr, SetBusinessRankArr] = useState();

  function handleBusinessProfilePOPUP(){
    console.log("open pop-up window"); setModalVisible(!modalVisible);
    console.log("modalVisible - ",modalVisible);
    SetBusinessProfilePOPUP(!businessProfilePOPUP);
    console.log("businessProfilePOPUP - " ,businessProfilePOPUP);
    console.log("business number: "+JSON.stringify(Business_Number));
  }
  useEffect(()=>{
    AllBusinessReviews(Business_Number).then(
      (result) => {
        console.log("yes", result.data);
        SetBusinessRankArr( result.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
    AllApointemtDetailes().then((res) => {
        
      console.log("&&&&&&&&&&&&&&&&&&&&&&", res.data)
      setapo(res.data)
      
    });
  },[]) 
  useEffect(() => {
    
    if (token) {
      const body = {
        "to": token,
        "title": "BeautyMe",
        "body": `${userDetails.First_Name} הזמינה תור חדש `,
        "badge": "0",
        "ttl": "1",// מספר שניות לשליחה
        "data": {
          "to": token
        }
      }
      Post_SendPushNotification(body).then
        (() => {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", token)
        }
        )
    }

  }, [token]);
  const navigation = useNavigation();
  function btnBookApiontment(Appointment_status,Number_appointment,) {
        
    //לקבוע תור
    const pickedApointment = {

      Appointment_status:Appointment_status,
      ID_Client:ClientIDnumber,
      Number_appointment:Number_appointment,
    };
    console.log("**", pickedApointment);
    console.log("*****"+ Appointment_status+ Number_appointment);
    AppointmentToClient(pickedApointment).then(
      (result) => {
        console.log("yes", result.data);

        apo.forEach((apointment) => {
          if (pickedApointment.Number_appointment == apointment.Number_appointment) {
            settoken(apointment.token)
            console.log(apointment.token)
            return
          }
        })
        //  settoken("ExponentPushToken[sCfqv9F-xkfthnmyMFXsDX]")
        if (result.data) {
          alert("result.data");
        }

        Alert.alert(`${Number_appointment} מחכה לאישור מבעל העסק }`);

      },
      (error) => {
        console.log("error", error);
      }
    );
    // btnSearch();
  }
  return (
    <View style={styles.container}>
    <Text style={styles.text}>מספר עסק: {Business_Number}</Text>
    <Text style={styles.text}>מספר תור: {Number_appointment} </Text>
    <Text style={styles.text}>תאריך: {moment(Date).format("DD-MM-YYYY")}</Text>
    <Text style={styles.text}>שעת התחלה: {Start_time}</Text>
    <Text style={styles.text}>שעת סיום: {End_time}</Text>
    <Text style={styles.text}>האם מגיע לבית הלקוח? {Is_client_house}</Text>
    <Text style={styles.text}>
      כתובת:
      {AddressStreet + " " + AddressHouseNumber + ", " + AddressCity}
    </Text>
    <Button
      title="צפה בפרופיל העסק"
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.buttonContainer}
      titleStyle={styles.buttonTitle}
      onPress={() => handleBusinessProfilePOPUP()}
    />
    <Button
      title="הזמן תור"
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.buttonContainer}
      titleStyle={styles.buttonTitle}
      onPress={() => btnBookApiontment(Appointment_status,Number_appointment)}
    />
    {businessProfilePOPUP && (
      <BusinessProfilePOPUP 
      businessRankArr={businessRankArr}
      isVisible={modalVisible}
      onClose={() => handleBusinessProfilePOPUP()}
      Business_Number = {JSON.stringify(Business_Number)}
    />
    )}
   
  </View>
);
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    margin: 10,
    direction: 'rtl', // Support for RTL (Right to Left) languages
  },
  text: {
    fontSize: 16,
    textAlign: 'right', // Align text to the right
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: "rgb(92, 71, 205)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
    alignSelf: 'center', // Center the buttons horizontally
    
  },
  buttonTitle: {
    fontWeight: "bold",
    color: 'white',
  },
  divider: {
    marginVertical: 10,
    alignSelf: 'stretch', // Make the divider stretch the entire width
  },
});

export default ClientSearchReasultCard;