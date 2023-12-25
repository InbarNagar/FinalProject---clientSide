import { useEffect, useState } from "react";
import Data from "./ClientScreen/Data.json";
import {
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GetAllAppointmentForProWithClient } from "./obj/FunctionAPICode";
export default function NewBusinessDiary_Ofir() {
  
const hoursArray = ["10-20"];
//הועבר 
const occupiedHoursArray = ["15-16", "11-12"];
const firstHour = occupiedHoursArray.map(time => parseInt(time.split("-")[0]));
//[15,11]
const endHour = occupiedHoursArray.map(time => parseInt(time.split("-")[1]));
//[16,12]
const HoursAndGap = [];
const [pressedHour, setPressedHour] = useState(null);

const hours = Array.from( //מערך שמטרתו לייצר את כמות השעות לפי המרווח שמתקבל
    { length: Math.ceil((20 - 10) / 1) },
    (v, i) => 10 + i * 1
  );
  const handlePressedHour = (hour) => {
    if (hour === pressedHour) {
      setPressedHour(null); // If the hour is already selected, clear the selection
    } else {
      setPressedHour(hour); // Otherwise, select the hour
    }
  }
function getOccupiedHoursWithGap(firstHour, endHour) {
  let occupiedHoursWithGap = [];

  for (let i = 0; i < firstHour.length; i++) {
    let obj = {
      startHour: firstHour[i],
      gap: endHour[i] - firstHour[i]
    };

    occupiedHoursWithGap.push(obj);
  }

  console.log("hours ("+hours.length+") : "+hours);
  HoursAndGap.push(...occupiedHoursWithGap); // Add the occupiedHoursWithGap to the HoursAndGap array

  return occupiedHoursWithGap;
}
const newArr=[];
function RenderingSchedule(hours, occupiedHoursWithGap, duration) {
    let booked = occupiedHoursWithGap.map(o => o.startHour);
  console.log("booked: "+booked);
let arr=[];
let str = `${hours[0]}`
for (let i = 1; i < hours.length; i++) {
    if(booked.includes(hours[i])){
        console.log("new hour to push: "+hours[i]);
        str+=`-${hours[i]}`;
        console.log("str= "+str);
        arr.push(str);
        str=`${hours[i]+occupiedHoursWithGap.find(o=>o.startHour===hours[i]).gap}`
    console.log("new str after push: "+ str);
    }
}
str+=`-${hours[hours.length-1]+1}`;
arr.push(str);
console.log("arr: "+ arr);
    return hours.map((item) => {
      if (booked.includes(item)) {
        return (
          <View key={item} style={styles.itemContainer1}>
            <Text style={styles.text}>{`${item}:00 - ${
              item + occupiedHoursWithGap.find(o => o.startHour === item).gap
            }:00`}</Text>
          </View>
        );
      } else {
        return (
          <TouchableOpacity
            key={item}
            style={[
              styles.touchable,
              { backgroundColor: item === pressedHour ? "green" : "white" },
            ]}
            onPress={() => handlePressedHour(item)}
          >
            <View style={styles.innerContainer}>
              <Text style={styles.text}>{`${item}:00 - ${
                item + duration
              }:00`}</Text>
              {item === pressedHour && (
                <Button title="הזמן תור" onPress={() => btnBookApiontment(item)} />
              )}
            </View>
          </TouchableOpacity>
        );
      }
    });
  }

const occupiedHoursWithGap = getOccupiedHoursWithGap(firstHour, endHour);
console.log("occupiedHoursWithGap: ", occupiedHoursWithGap);
console.log("HoursAndGap: ", HoursAndGap);

return(<>
        <View>
      {RenderingSchedule(hours, occupiedHoursWithGap, 1)}
    </View>
</>);
}

//   // מביא את התורים שלי לבעל העסק כולל פרטי לקוח לצפייה בפרופיל

//   useEffect(() => {
//     GetAllAppointmentForProWithClient(4).then(
//       (result) => {
//         console.log("1111 - ", result);
//         GetArr(result)
//       },
//       (error) => {
//         console.log("error", error);
//       }
//     );
//     // const data = Data; // לשים קריאה לשרת למשוך את המידע
    
//   }, []);
//   function GetArr(data){
//     let arr = [];
//     let obj = {
//       Number_appointment: data[0].Number_appointment,
//       Date: data[0].Date,
//       Appointment_status: data[0].Appointment_status,
//       Start_Hour: data[0].Start_Hour,
//       End_Hour: data[0].End_Hour,
//       Client: {
//         ID_Client: data[0].ID_Client,
//         First_name: data[0].First_name,
//         Last_name: data[0].Last_name,
//         ClientPhone: data[0].phone,
//         AddressStreet: data[0].AddressStreet,
//         AddressCity: data[0].AddressCity,
//         AddressHouseNumber: data[0].AddressHouseNumber,
//         Facebook_link: data[0].Facebook_link,
//         Instagram_link: data[0].Instagram_link,
//         ProfilPic: data[0].ProfilPic,
//         token: data[0].token,
//       },
//     };
//     arr.push(obj);
//     for (let i = 1; i < data.length; i++) {
//       //רץ על המערך הכללי
//       if (data[i].Number_appointment !== data[i - 1].Number_appointment) {
//         //בודק אם המספר תור שווה לקודם הקיים במערך
//         obj = {
//           Number_appointment: data[i].Number_appointment,
//           Date: data[i].Date,
//           Appointment_status: data[i].Appointment_status,
//           Start_Hour: data[i].Start_Hour,
//           End_Hour: data[i].End_Hour,
//           Client: {
//             ID_Client: data[i].ID_Client,
//             First_name: data[i].First_name,
//             Last_name: data[i].Last_name,
//             ClientPhone: data[i].phone,
//             AddressStreet: data[i].AddressStreet,
//             AddressCity: data[i].AddressCity,
//             AddressHouseNumber: data[i].AddressHouseNumber,
//             Facebook_link: data[i].Facebook_link,
//             Instagram_link: data[i].Instagram_link,
//             ProfilPic: data[i].ProfilPic,
//             token: data[i].token,
//           },
//         };
//         arr.push(obj);
//       }
//     }
//     console.log(
//       `Business ${data[0].Business_Number} has ${arr.length} appointments on ${data[0].Date}:` +
//         JSON.stringify(arr)
//     );
//   }

//   return (<>
  
//   </>);
// }




const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10, // optional, to round the edges
  },
  itemContainer1: {
    backgroundColor: "#ffcccc",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  touchable: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 10, // Adjust the margin as needed
  },
});
