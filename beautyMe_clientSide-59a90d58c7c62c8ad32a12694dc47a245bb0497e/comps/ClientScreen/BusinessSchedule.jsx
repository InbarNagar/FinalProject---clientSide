import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Modal,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  AllApointemtDetailes,
  NewAppointmentToClient,
  Post_SendPushNotification,
} from "../obj/FunctionAPICode";
import { UserContext } from "../UserDietails";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from 'moment';
const BusinessSchedule = (props) => {
  const [token, settoken] = useState(null);
  const { userDetails } = useContext(UserContext);
  const { duration,hours ,Is_client_house,typeTreatmentNumber, businessNumber, isVisible, date, onClose } = props;
  const [pressedHour, setPressedHour] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(`props ${businessNumber} : hours: ${hours} ${date}  treatment number: ${typeTreatmentNumber} Is_client_house ${Is_client_house}`);
    if (token) {
      const body = {
        to: token,
        title: "BeautyMe",
        body: `אשר תור חדש`,
        badge: "0",
        ttl: "1",
        data: {
          to: token,
        },
      };
      Post_SendPushNotification(body).then(() => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", token);
      });
    }
  }, [token]);

  const btnBookAppointment = (item) => {
    const [start, end] = item.split('-').map(Number);
    console.log(`book Appointment: start- ${start} end- ${end} ${date} ${Type_Treatment_Number} `);
    const pickedAppointment = {
      Date: date,
      ID_Client: userDetails.ID_number,
      Start_Hour: start,
      End_Hour: end,
      Business_Number: businessNumber,
      Is_client_house: "YES",
      Type_Treatment_Number: Type_Treatment_Number
    };
    NewAppointmentToClient(pickedAppointment).then(
      (result) => {
        if (result.data) {
          AllApointemtDetailes().then((res) => {
            const appointment = res.data.find(ap => Number(result.data) === ap.Number_appointment);
            if (appointment) settoken(appointment.token);
          });
          // alert(`${result.data}`);
        }
        navigation.navigate('Search3');
        Alert.alert(`${result.data} מחכה לאישור מבעל העסק `);
        // חוזר לעמוד הבא
        onClose();
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const renderItem = ({ item }) => {
    // Split the hours and convert them to numbers
    const [start, end] = item.split('-').map(Number);

    // Calculate the number of slots
    const slotsCount = (end - start) / duration;

    // Create an array of slots
    const slots = Array.from({ length: slotsCount }, (_, i) => {
      const slotStart = start + i * duration;
      const slotEnd = slotStart + duration;
      // return `${slotStart}-${slotEnd}`;
      return `${slotStart.toString().slice(0, 5)}-${slotEnd.toString().slice(0, 5)}`;
    });

    // Render each slot
    return slots.map((slot) => {
      const formattedSlot = slot.split('-').map(hour => `${hour}:00`).join(' - ');
      const isSlotPressed = slot === pressedHour;

      return (
        <TouchableOpacity
          key={slot}
          style={[
            styles.touchable,
            { backgroundColor: isSlotPressed ? "rgb(0, 255, 0)" : "white",  borderRadius: 10, },
          ]}
          onPress={() => setPressedHour(prev => prev === slot ? null : slot)}
        >
          <View style={styles.innerContainer}>
            <View style={styles.slotInfoContainer}>
              <Text style={styles.slotText}>{formattedSlot}</Text>
              {isSlotPressed && (
                <TouchableOpacity style={styles.slotIconContainer} onPress={() => btnBookAppointment(slot)}>
                  <MaterialCommunityIcons name="calendar-plus" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <FlatList
          data={hours}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>סגור</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(125, 100, 235, 0.8)",
    borderRadius: 10,
    width: "80%", // רוחב המודל ביחס לחלון
    aspectRatio: 1, // נותן את הצורה הריבועית
    padding: 20,
    top:300, // ממרכז את המודל אנכית
    left: -10, // ממרכז את המודל אופקית
    transform: [{ translateX: -50 }, { translateY: -50 }], // מסדר את המודל למרכז המסך
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slotInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slotText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4c288c",
    marginRight: 10,
  },
  slotIconContainer: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#4c288c",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BusinessSchedule;
