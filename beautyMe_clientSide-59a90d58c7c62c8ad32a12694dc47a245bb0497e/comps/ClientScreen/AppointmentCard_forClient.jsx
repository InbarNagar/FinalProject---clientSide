import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import moment from "moment";
import Button from "../obj/Button";
import { CancelAppointmentByClient } from "../obj/FunctionAPICode";
import Review_Business from "../Review_Business";
import { useNavigation } from '@react-navigation/native';
import { useState,  useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";
import { Post_SendPushNotification } from "../obj/FunctionAPICode";
import { Alert } from "react-native";
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppointmentCard_forClient = (props) => {
  const { Type_Treatment_Number,idb, token, Review_Number, Business_Number, ClientIDnumber, Number_appointment, AddressCity, AddressHouseNumber,
     AddressStreet, backgroundColor, Treatment_Type, Start_time, End_time, Date1, BusinessName, Appointment_status, phone, Is_client_house, Instagram_link,Facebook_link } = props;
  const navigation = useNavigation();
  const [bookModalVisible, SetBookModalVisible] = useState(false);
  const [POPUP, SetPOPUP] = useState(false);
  const [tokenPro, setToken] = useState();
 const [Message,setmes]=useState();

  useEffect(() => {
    if (tokenPro) {
      const body = {
        "to": tokenPro,
        "title": "BeautyMe",
        "body": Message,
        "badge": "0",
        "ttl": "1",
        "data": {
          "to": tokenPro
        }
      }
      Post_SendPushNotification(body).then
        (() => {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%% טקקקקקקקק", tokenPro)
        }
        )
    }

  }, [tokenPro]);
  function cancelAppointment(Number_appointment) {
    CancelAppointmentByClient(Number_appointment).then((result) => {
      if (result.data) {
        console.log(result.data, "***************************************************************************");
        Alert.alert(
          "התראה",
          "התור בוטל בהצלחה",
          [
            { text: "אישור", onPress: () => console.log("אישור Pressed") }
          ]
        )
      }
    })
      .catch((error) => {
        console.log("error", error);
      });
  }

  const styles = StyleSheet.create({
    card: {
      alignItems: 'left',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#d3d3d3',
      padding: 10,
      marginVertical: 5,
      backgroundColor: backgroundColor,
      flexDirection: 'row',
      flex: 1,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: '#000',
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: "left",
      paddingBottom: 10,
    }, 
    title1: {
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop:-10,
      fontSize: 15,
    },
    text: {

      fontSize: 20,
    },
    icon: {
      marginRight: 10,
    },
    iconContainer: {
      flexDirection: "row",
    },
    img: {
      borderRadius: 15,
      width: 100,
      height:100,
    },


  });


  const massage = () => {
    let givenDate = new Date(Date1);
    let today = new Date();
    givenDate.setHours(0, 0, 0, 0)

    let currentHour = today.getHours(); // השעה של עכשיו
    let currentMinute = today.getMinutes(); // הדקות של עכשיו


    let currentTime = `${currentHour}:${currentMinute}`;
    let oneHourFromNow = new Date(today.setHours(today.getHours() + 1));
    let timeOneHourFromNow = `${oneHourFromNow.getHours()}:${oneHourFromNow.getMinutes()}`;
    console.log(currentTime,floatToTime(Start_time), timeOneHourFromNow)
    console.log(givenDate, today, "aappppp")

    if (((floatToTime(Start_time) <= currentTime &&floatToTime(End_time) <= currentTime) && today.setHours(0, 0, 0, 0) >= givenDate) && Review_Number == null) {
      return (
        <>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Review_Business', {
                Number_appointment,
                ClientIDnumber,
                BusinessName,
                Business_Number
              })
            }
          >
            <View style={styles.iconContainer}>
              <Icon name="star" size={20} color="#ffd700" style={styles.icon} />
              <Text style={styles.title}>דרג עסק</Text>
            </View>
          </TouchableOpacity>

        </>)
    }
    if ((floatToTime(Start_time) <= currentTime &&floatToTime(End_time) <= currentTime && today.setHours(0, 0, 0, 0) >= givenDate)||( today.setHours(0, 0, 0, 0) >= givenDate) 
    && Review_Number != null) {
    
      return (
        <>
          <Text style={styles.title}>העסק דורג!</Text>
        </>)
    }
    if((floatToTime(Start_time) >currentTime && today.setHours(0, 0, 0, 0) <= new Date(Date1).setHours(0, 0, 0, 0))&&
   (floatToTime(Start_time) >=timeOneHourFromNow &&today.setHours(0, 0, 0, 0) <= new Date(Date1).setHours(0, 0, 0, 0)))
     {
      return (<>
      
        <TouchableOpacity onPress={() => {
                    setToken(token);
                    setmes(`שלום,
                    רצינו ליידע אותך שתור מספר ${Number_appointment}, שהיה אמור להתקיים בתאריך ${moment(Date1).format('DD/MM/YYYY')},לטיפול${Treatment_Type}, בין השעות ${floatToTime(Start_time)} ל-${floatToTime(End_time)}, בוטל.
                    תודה,
                   Beauty Me`)
                    cancelAppointment(Number_appointment);
                  }}>
                    <View style={styles.iconContainer}>
                      <Icon name="times-circle" size={20} color="#900" style={styles.icon} />
                      <Text style={styles.title}>ביטול תור</Text>
                    </View>
                  </TouchableOpacity>
      </>
      )
    }
  }
  function floatToTime(floatNumber) {
    let hours = Math.floor(floatNumber);
    let minutes = Math.floor((floatNumber - hours) * 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
  }
  return (
    <ScrollView>
    <View style={styles.card}>

      <View style={{ flex: 1 }}>
      

        <View style={styles.iconContainer}>
          <Icon name="calendar" size={20} color="rgb(92, 71, 205)" style={styles.icon} />
          <Text style={styles.title}>{moment(Date1).format('DD/MM/YYYY')}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="clock-o" size={20} color="rgb(92, 71, 205)" style={styles.icon} />
          <Text style={styles.title}>{floatToTime(Start_time)}-{floatToTime(End_time)}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="leaf" size={20} color="rgb(92, 71, 205)" style={styles.icon} />
          <Text style={styles.title}>{Treatment_Type}</Text>
        </View>
        <View>

          {Is_client_house === "YES" || "YES       " ? (
            <View style={styles.iconContainer}>
              <Icon name="home" size={20} color="rgb(92, 71, 205)" />
              <Text style={styles.title}>  טיפול בבית הלקוח </Text>

            </View>

          ) : (
            <>
              <Icon name="briefcase" size={20} color="rgb(92, 71, 205)" style={styles.icon} />
              <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:-5,margin:10}}>
           <Icon name="map-marker" size={20} color="rgb(92, 71, 205)" style={{marginTop:-22}} /> 
           <Text style={[styles.title1, {margin: 4}]}>
           {`${AddressCity}, ${AddressStreet} ${AddressHouseNumber}`}
            </Text>
          </View> 
              טיפול בבית העסק
            </>
          )}
        </View>
        {massage()}
        
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', }}>
          <Image style={styles.img}
            // onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} 
            source={{ uri: `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${idb}.jpg` }} />

          <Text style={styles.title}> {BusinessName}</Text>
        </View>

          <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:-5,margin:38}}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`tel:${phone}`)
                      }
                    >
                      <Icon
                        name="phone"
                        size={20}
                        color="rgb(92, 71, 205)"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    
                      <TouchableOpacity
                        onPress={() => Linking.openURL(`https://www.instagram.com/${Instagram_link}`)}
                      >
                        <Icon
                          name="instagram"
                          size={20}
                          color="rgb(92, 71, 205)"
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                   

                
                      <TouchableOpacity
                        onPress={() => Linking.openURL(Facebook_link)}
                      >
                        <Icon
                          name="facebook"
                          size={20}
                          color="rgb(92, 71, 205)"
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => {
                      const scheme = Platform.select({ ios: 'waze://', android: 'https://waze.com/ul' });
                      const address = `${AddressCity},${AddressHouseNumber} ${AddressStreet} `
                      const url = `${scheme}?q=${encodeURIComponent(address)}&navigate=yes`;

                      Linking.canOpenURL(url).then((supported) => {
                        if (supported) {
                          return Linking.openURL(url);
                        } else {
                          console.log(`Can't handle url: ${url}`);
                        }
                      }).catch((err) => console.error('An error occurred', err));
                    }}>
                      <MaterialCommunityIcons name="waze" size={20} color="rgb(92, 71, 205)" />
                    </TouchableOpacity>
                  </View>
      </View>
    </View>
    </ScrollView>
  );
};


export default AppointmentCard_forClient;