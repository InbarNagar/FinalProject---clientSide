import { React, useState, useEffect, useContext } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import { Button } from "react-native-elements";
import {
  AppointmentToClient,
  Post_SendPushNotification,
  AllApointemtDetailes,
  AllBusinessReviews,
} from "../obj/FunctionAPICode";
import { UserContext } from "../UserDietails";
import BusinessProfilePOPUP from "./BusinessProfilePOPUP";

const NewSearchResultsCard = (props) => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const ClientData = userDetails;
  const [apo, setapo] = useState();
  const { r } = props;

  const [token, settoken] = useState(); // ענבר
  const [modalVisible, setModalVisible] = useState(false);
  const [businessProfilePOPUP, SetBusinessProfilePOPUP] = useState(false);
  const [businessRankArr, SetBusinessRankArr] = useState();

  function handleBusinessProfilePOPUP() {
    console.log("open pop-up window");
    setModalVisible(!modalVisible);
    console.log("modalVisible - ", modalVisible);
    SetBusinessProfilePOPUP(!businessProfilePOPUP);
    console.log("businessProfilePOPUP - ", businessProfilePOPUP);
    console.log("business number: " + JSON.stringify(r.id));
  }
  useEffect(() => {
    AllBusinessReviews(r.id).then(
      (result) => {
        console.log("yes", result.data);
        SetBusinessRankArr(result.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
    AllApointemtDetailes().then((res) => {
      console.log("&&&&&&&&&&&&&&&&&&&&&&", res.data);
      setapo(res.data);
    });
  }, []);
  useEffect(() => {
    if (token) {
      const body = {
        to: token,
        title: "BeautyMe",
        body: `${userDetails.First_Name} הזמינה תור חדש `,
        badge: "0",
        ttl: "1", // מספר שניות לשליחה
        data: {
          to: token,
        },
      };
      Post_SendPushNotification(body).then(() => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", token);
      });
    }
  }, [token]);
  const navigation = useNavigation();
  function btnBookApiontment(Appointment_status, Number_appointment) {
    //לקבוע תור
    const pickedApointment = {
      Appointment_status: Appointment_status,
      ID_Client: ClientIDnumber,
      Number_appointment: Number_appointment,
    };
    console.log("**", pickedApointment);
    console.log("*****" + Appointment_status + Number_appointment);
    AppointmentToClient(pickedApointment).then(
      (result) => {
        console.log("yes", result.data);

        apo.forEach((apointment) => {
          if (
            pickedApointment.Number_appointment == apointment.Number_appointment
          ) {
            settoken(apointment.token);
            console.log(apointment.token);
            return;
          }
        });
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
  let prevNumber = null;
  let today = "2023-06-02T00:00:00";
  return (
    <>
      <View style={styles.container} key={r.id}>
        <Text style={styles.titleText}>
          פרטי עסק: {r.businessName}, {r.city}
        </Text>

        <Text style={styles.titleText}>שעות פנויות: </Text>
        {r.diary.map((d) => {
          if (d.date === today) {
            return d.time.map((t, a) => (
              <Text style={styles.text} key={a}>
                {t}
              </Text>
            ));
          }
          return null;
        })}

        <Text style={styles.titleText}>טיפול:</Text>
        {r.typeTritment.map((t, i) => (
          <Text style={styles.text} key={i}>
            מחיר: {t.price} סוג טיפול: {t.type} זמן: {t.duration}
          </Text>
        ))}
        <ScrollView style={{ maxHeight: 400 }}>
          {r.apointemnt.map((a, i) => {
            if (a.date === today && a.number !== prevNumber) {
              prevNumber = a.number;
              return (
                <Text style={styles.text} key={i}>
                  מספר: {a.number} תאריך: {a.date} שעה: {a.time} סטטוס:{" "}
                  {a.status}
                </Text>
              );
            }
            return null;
          })}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="צפה בפרופיל העסק"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            onPress={handleBusinessProfilePOPUP}
          />
          <Button
            title="הזמן תור"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            onPress={() => {
              btnBookApiontment();
            }}
          />
        </View>

        {businessProfilePOPUP && (
          <BusinessProfilePOPUP
            businessRankArr={businessRankArr}
            isVisible={modalVisible}
            onClose={handleBusinessProfilePOPUP}
            Business_Number={r.id}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    padding: 10,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
    direction: "rtl", // Support for RTL (Right to Left) languages
  },
  text: {
    fontSize: 16,
    textAlign: "right", // Align text to the right
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: "rgb(92, 71, 205)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 10,
    alignSelf: "center", // Center the buttons horizontally
  },
  buttonTitle: {
    fontWeight: "bold",
    color: "white",
  },
  divider: {
    marginVertical: 10,
    alignSelf: "stretch", // Make the divider stretch the entire width
  },
});

export default NewSearchResultsCard;
