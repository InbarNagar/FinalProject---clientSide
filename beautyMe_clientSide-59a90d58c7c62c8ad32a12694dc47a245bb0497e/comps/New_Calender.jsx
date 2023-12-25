import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { GetAllAppointmentForProWithClient } from './obj/FunctionAPICode';
import { UserContext } from '../comps/UserDietails';
import { CancelAppointmentByClient } from './obj/FunctionAPICode';
import { Post_SendPushNotification } from './obj/FunctionAPICode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from './CTools/Loading';

const New_Calendar = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const BussinesNumber = userDetails.Business_Number;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [arr, setArr] = useState([]);
  const [showDetails, setShowDetails] = useState(true);
  const [alert, setAlert] = useState();
  const [tokenClient, setToken] = useState();
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [showLoading, setshowLoading] = useState(true)

  useEffect(() => {
    if (tokenClient) {
      const body = {
        "to": tokenClient,
        "title": "BeautyMe",
        "body": `לצערנו התור שקבעת התבטל`,
        "badge": "0",
        "ttl": "1",
        "data": {
          "to": tokenClient
        }
      }
      Post_SendPushNotification(body).then
        (() => {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%% טקקקקקקקק", tokenClient)
        }
        )
    }

  }, [tokenClient]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshowLoading(false);
    }, 3000); // הפונקציה תקרא אחרי 5 שניות

    return () => clearTimeout(timer); // ניקוי הטיימר כאשר הקומפוננטה מתנתקת
  }, []);

  useEffect(() => {
    GetAllAppointmentForProWithClient(BussinesNumber)
      .then((data) => {
        let arr1 = [];
        let obj = {
          Number_appointment: data[0].Number_appointment,
          Date: data[0].Date,
          Appointment_status: data[0].Appointment_status,
          Start_Hour: data[0].Start_Hour,
          End_Hour: data[0].End_Hour,
          Name_type: data[0].Name,
          Client: {
            ID_Client: data[0].ID_Client,
            First_name: data[0].First_name,
            Last_name: data[0].Last_name,
            ClientPhone: data[0].phone,
            AddressStreet: data[0].AddressStreet,
            AddressCity: data[0].AddressCity,
            AddressHouseNumber: data[0].AddressHouseNumber,
            Facebook_link: data[0].Facebook_link,
            Instagram_link: data[0].Instagram_link,
            ProfilPic: data[0].ProfilPic,
            token: data[0].token,
          },
        };
        arr1.push(obj);
        for (let i = 1; i < data.length; i++) {
          if (data[i].Number_appointment !== data[i - 1].Number_appointment) {
            obj = {
              Number_appointment: data[i].Number_appointment,
              Date: data[i].Date,
              Appointment_status: data[i].Appointment_status,
              Start_Hour: data[i].Start_Hour,
              End_Hour: data[i].End_Hour,
              Name_type: data[i].Name,
              Client: {
                ID_Client: data[i].ID_Client,
                First_name: data[i].First_name,
                Last_name: data[i].Last_name,
                ClientPhone: data[i].phone,
                AddressStreet: data[i].AddressStreet,
                AddressCity: data[i].AddressCity,
                AddressHouseNumber: data[i].AddressHouseNumber,
                Facebook_link: data[i].Facebook_link,
                Instagram_link: data[i].Instagram_link,
                ProfilPic: data[i].ProfilPic,
                token: data[i].token,
              },
            };
            arr1.push(obj);
          }
        }
        setArr(arr1);
        console.log(arr1, "222222222222222222222222222222222");
        console.log(
          `Business ${data[0].Business_Number} has ${arr1.length} appointments on ${data[0].Date}:` +
          JSON.stringify(arr)
        );
      })
      .catch((error) => {
        console.log("error!!!!!!!!!!!!!!!!!!!!!!!!!!!", error);
      })
    // .finally(()=>{
    //   setInterval(() => {
    //       showLoading&&setshowLoading(false)
    //      },5000);

    // });
  }, []);

  useEffect(() => {
    // יצירת מערך התאריכים המסומנים עם הנקודות
    const markedDates = arr.reduce((markedDatesObj, appointment) => {
      const appointmentDate = moment(appointment.Date).format("YYYY-MM-DD");
      const markedDate = {
        marked: true,
        dotColor: "rgb(92, 71, 205)",
        activeOpacity: 0.7,
        customStyles: {
          container: {
            backgroundColor: "purple",
          },

        },
      };
      // אם התאריך כבר קיים במערך, מוסיף את התוויות החדשות לתאריך הקיים
      if (markedDatesObj[appointmentDate]) {
        markedDatesObj[appointmentDate] = {
          ...markedDatesObj[appointmentDate],
          ...markedDate,
        };
      }
      // אחרת, הוסף את התווית לתאריך החדש
      else {
        markedDatesObj[appointmentDate] = markedDate;
      }
      return markedDatesObj;
    }, {});

    // עדכון המשתנה markedDates באמצעות הפונקציה setMarkedDates
    setMarkedDates(markedDates);
  }, [arr]);

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const selectedAppointments = arr.filter(
      (appointment) =>
        moment(appointment.Date).format() === moment(selectedDate).format()
    );

    let sortedResult = selectedAppointments.sort((a, b) => {
      let dateA = new Date(a.Date + ' ' + a.Start_Hour);
      let dateB = new Date(b.Date + ' ' + b.Start_Hour);
      return dateA - dateB;
    });
    sortedResult = sortedResult.reverse();



    setSelectedDate(selectedDate);
    setSelectedAppointments(sortedResult);
    setSelectedDay(selectedDate); // עדכון התאריך הנבחר

    const updatedMarkedDates = { ...markedDates }; // יצירת מערך חדש כדי לא לשנות את המערך המקורי

    if (selectedDay) {
      updatedMarkedDates[selectedDay] = {
        ...updatedMarkedDates[selectedDay],
        selected: false,
        customStyles: {
          container: {},
          text: {},
        },
      };
    }

    updatedMarkedDates[selectedDate] = {
      ...updatedMarkedDates[selectedDate],
      selected: true,
      customStyles: {
        container: {
          backgroundColor: "purple",
        },
        text: {
          color: "white",
        },
      },
    };

    setMarkedDates(updatedMarkedDates); // עדכון מערך ה־`markedDates`
    setShowDetails(true);
  };



  const cancel = (Number_appointment) => {
    CancelAppointmentByClient(Number_appointment).then((result) => {
      if (result.data) {
        console.log(result.data, "**********************");
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
  };

  const send = (token, Name_type, Date, Start_Hour, End_Hour) => {
    const body = {
      "to": token,
      "title": "BeautyMe",
      "body": `תזכורת לטיפול ${Name_type} שנקבע לתאריך ${moment(Date).format('L')} בין השעות ${moment(Start_Hour, "HH:mm").format("HH:mm")} 
      ${moment(End_Hour, "HH:mm").format("HH:mm")}`,
      "badge": "0",
      "ttl": "1",
      "data": {
        "to": token
      }
    }
    Post_SendPushNotification(body).then
      (() => {
        console.log("נשלחה התראה", token)
        Alert.alert(
          "התראה",
          "נשלחה הודעת תזכורת ללקוח",
          [
            { text: "אישור", onPress: () => console.log("אישור Pressed") }
          ]
        )
      }
      )
  };

  function floatToTime(floatNumber) {
    let hours = Math.floor(floatNumber);
    let minutes = Math.floor((floatNumber - hours) * 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
  }


  let today = new Date();
  let currentHour = today.getHours(); // השעה של עכשיו
  let currentMinute = today.getMinutes(); // הדקות של עכשיו
  let currentTime = `${currentHour}:${currentMinute}`;

  let oneHourFromNow = new Date(today.setHours(today.getHours() + 1));
  let timeOneHourFromNow = `${oneHourFromNow.getHours()}:${oneHourFromNow.getMinutes()}`;

  LocaleConfig.locales["he"] = {
    monthNames: [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר",
    ],
    monthNamesShort: [
      "ינו",
      "פבר",
      "מרץ",
      "אפר",
      "מאי",
      "יוני",
      "יולי",
      "אוג",
      "ספט",
      "אוק",
      "נוב",
      "דצמ",
    ],
    dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
    dayNamesShort: ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
  };

  LocaleConfig.defaultLocale = "he";

  return (
    <ScrollView>
      <View>
        <Calendar
          style={styles.calendarContainer}
          markedDates={markedDates}
          onDayPress={handleDayPress}
        />
        {alert && alert}
        {selectedAppointments.map((appointment) => (
          <View
            style={styles.card}
            key={appointment.Number_appointment}
            onPress={() => setShowDetails(!showDetails)}
          >
            {showDetails && (

              <View style={{ flexDirection: 'row', flex: 2 }}>

                <View style={{ flex: 1 }}>
                  <View>
                    <Text style={styles.title}>פרטי התור:</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Icon name="leaf" size={20} color="rgb(92, 71, 205)" style={styles.icon} />
                    <Text style={styles.text}>{appointment.Name_type}</Text>
                  </View>

                  <View style={styles.iconContainer}>
                    <Icon name="clock-o" size={20} color="rgb(92, 71, 205)" style={styles.icon} />
                    <Text style={styles.text}>
                      {moment(appointment.Start_Hour, "HH:mm").format("HH:mm")} -{" "}
                      {moment(appointment.End_Hour, "HH:mm").format("HH:mm")}
                    </Text>

                  </View>


                  {appointment.Is_client_house === "YES" || "YES       " ? (
                    <View style={styles.iconContainer}>
                      <Icon name="home" size={20} color="rgb(92, 71, 205)" />
                      <Text style={styles.text}>  טיפול בבית הלקוח </Text>

                    </View>

                  ) : (
                    <>
                      <Icon name="briefcase" size={20} color="rgb(92, 71, 205)" style={styles.icon} />
                      טיפול בבית העסק
                    </>
                  )}

                  {(floatToTime(appointment.Start_Hour) > currentTime && today.setHours(0, 0, 0, 0) <= new Date(appointment.Date).setHours(0, 0, 0, 0)) &&
                    (floatToTime(appointment.Start_Hour) >= timeOneHourFromNow && today.setHours(0, 0, 0, 0) <= new Date(appointment.Date).setHours(0, 0, 0, 0)) &&
                    <View>
                      <TouchableOpacity onPress={() => {
                        setToken(appointment.Client.token);
                        cancel(appointment.Number_appointment);
                      }}>
                        <View style={styles.iconContainer}>
                          <Icon name="times-circle" size={20} color="#900" style={styles.icon} />
                          <Text style={styles.text}>ביטול תור</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => {
                        send(appointment.Client.token, appointment.Name_type, appointment.Date, appointment.Start_Hour, appointment.End_Hour);
                      }}>
                        <View style={styles.iconContainer}>
                          <MaterialCommunityIcons
                            name="bell" size={20} color="#FFA500" style={styles.icon} />
                          <Text style={styles.text}>שלח תזכורת</Text>
                        </View>
                      </TouchableOpacity>
                    </View>}

                </View>

                <View style={{ flex: 1 }}>
                  <View>
                    <Text style={styles.title}>פרטי הלקוח:</Text>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: -5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <Image style={styles.img}
                        // onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} 
                        source={{ uri: `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${appointment.Client.ID_Client}.jpg` }} />
                      <Text style={styles.text}>
                        {appointment.Client.First_name} {appointment.Client.Last_name}
                      </Text>
                    </View>
                    {appointment.Is_client_house === "YES" || "YES       " ? (
                      <View style={[styles.iconContainer1, { marginTop: -20 }]}>
                        <Icon name="map-marker" size={20} color="rgb(92, 71, 205)" style={styles.icon} />
                        <Text style={styles.text}>
                          {`${appointment.Client.AddressCity}, ${appointment.Client.AddressStreet} ${appointment.Client.AddressHouseNumber}`}
                        </Text>
                      </View>
                    ) : null}
                  </View>


                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`tel:${appointment.Client.ClientPhone}`)
                      }
                    >
                      <Icon
                        name="phone"
                        size={20}
                        color="rgb(92, 71, 205)"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    {appointment.Client.Instagram_link ? (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(`https://www.instagram.com/${appointment.Client.Instagram_link}`)}
                      >
                        <Icon
                          name="instagram"
                          size={20}
                          color="rgb(92, 71, 205)"
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    ) : null}

                    {appointment.Client.Facebook_link ? (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(appointment.Client.Facebook_link)}
                      >
                        <Icon
                          name="facebook"
                          size={20}
                          color="rgb(92, 71, 205)"
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity onPress={() => {
                      const scheme = Platform.select({ ios: 'waze://', android: 'https://waze.com/ul' });
                      const address = `${appointment.Client.AddressCity},${appointment.Client.AddressHouseNumber} ${appointment.Client.AddressStreet} `
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

            )}
          </View>
        ))}
      </View>
      {showLoading && <TouchableOpacity onPress={() => setshowLoading(!showLoading)}><Loading text='מביא את נתוני בעל העסק' /></TouchableOpacity>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "rgb(92, 71, 205)",
    padding: 20,
    backgroundColor: "white",
    padding: 10,
      marginVertical: 5,
      margin:10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
    fontSize: 20,
    paddingTop: 5
  },
  text: {
    fontSize: 15,
    textAlign: "left",
    paddingBottom: 10
  },
  iconContainer: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,

  },
  linkText: {
    color: "rgb(92, 71, 205)",
    textDecorationLine: "underline",
  },
  columnContainer: {
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },
  selectedText: {
    color: "rgb(92, 71, 205)",
    fontWeight: "bold",
  },
  defaultText: {
    color: "black",
  },
  dateText: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  dateTextWithEvents: {
    fontSize: 18,
    textAlign: "center",
    color: "rgb(92, 71, 205)",
    fontWeight: "bold",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgb(92, 71, 205)",
    alignSelf: "center",
    marginTop: 2,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    borderRadius: 15,
    width: 50,
    height: 50,
  },
  iconContainer1: {
    flexDirection: "row",

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    borderRadius: 15,
    marginBottom: 20,
    width: 30,
    height: 30,
    marginRight: 7,

  },
  text: {
    fontSize: 15,
    textAlign: 'left',
    paddingBottom: 10,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default New_Calendar;