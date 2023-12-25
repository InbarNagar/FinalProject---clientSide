import { React, useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import {
  NewSearchPost,
  Treatment_type_GET,
  Post_SendPushNotification,
  RateBussines,
} from "../obj/FunctionAPICode";
import { ScrollView } from "react-native-gesture-handler";
import AvailableAppointmentToBook from "./AvailableAppointmentToBook";
import { UserContext } from "../UserDietails";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import Maps_Inbar from "../Maps_Inbar";
import { log } from "react-native-reanimated";
import Menu_Client from "../obj/Menu_Client";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native";
import Header from "../obj/Header";
import { useNavigation } from "@react-navigation/core";
import Loading from "../CTools/Loading";

export default function NewSearch3({ navigation }) {
  const [NameTreatment, setNameTreatment] = useState("");
  const [treatmentNumber, SetTreatmentNumber] = useState("");
  const [ShowFilter, SethowFilter] = useState(false);
  const [filter_catgories, set_filter_catgories] = useState([]);
  const [token, settoken] = useState(); // ענבר
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [result, SetResult] = useState([]);
  const [gender, setGender] = useState(null);
  const [AddressCity, setAddressCity] = useState(null);
  const [Is_client_house, setIs_client_house] = useState(null);
  // const [categories, setCategories] = useState(["קטגוריה"]);
  const [showLoading, setshowLoading] = useState(true);

  const [treatments, setTreatments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [openT, setOpenT] = useState(false);
  const [rank, SetRank] = useState([]);
  const [open, setOpen] = useState(false); // משתנה הבודק אם הרשימה הנגללת פתוחה או סגורה

  // const navigation = useNavigation();
  const ClientData = userDetails;
  useEffect(() => {
    if (token) {
      const body = {
        to: token,
        title: "BeautyMe",
        // "body": `${userDetails.First_name} הזמינה תור חדש `,
        body: ` הזמינה תור חדש `,
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

  useEffect(() => {
    setshowLoading(true);
    Treatment_type_GET()
      .then(
        (result) => {
          console.log("categories: ", result);
          if (result) {
            setCategories(result);
            SetTreatmentNumber(result[0].Type_treatment_Number);
          }
        },
        (error) => {
          console.log("error", error);
        }
      )
      .catch((error) => {
        console.log("error!!!!!!!!!!!!!!!!!!!!!!!!!!!", error);
      });
    RateBussines()
      .then(
        (result) => {
          console.log("ranks arr: ", result);
          if (result) {
            SetRank(result);
          }
        },
        (error) => {
          console.log("error", error);
        }
      )
      .catch((error) => {
        console.log("error!!!!!!!!!!!!!!!!!!!!!!!!!!!", error);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowLoading(false);
    }, 3000); // הפונקציה תקרא אחרי 5 שניות

    return () => clearTimeout(timer); // ניקוי הטיימר כאשר הקומפוננטה מתנתקת
  }, []);

  function GetData(data) {
    let res = [];
    let obj = {
      id: data[0].Business_Number1,
      businessName: data[0].Name,
      streetAddress: data[0].AddressStreet,
      houseNumber: data[0].AddressHouseNumber,
      city: data[0].AddressCity,
      about: data[0].About,
      phone: data[0].phone,
      facebook: data[0].Facebook_link,
      instagram: data[0].Instagram_link,
      LongCordinate: data[0].LongCordinate,
      LetCordinate: data[0].LetCordinate,
      Is_client_house: data[0].Is_client_house1,
      diary: [
        {
          date: data[0].Date1,
          time: [data[0].Start_time + "-" + data[0].End_time],
        },
      ],
      typeTritment: [
        {
          duration: data[0].duration,
          type: data[0].Type_treatment_Number,
          price: data[0].Price,
        },
      ],
      apointemnt: [
        {
          number: data[0].Number_appointment, ///////////////////
          status: data[0].Appointment_status, /////////////////////////////
          date: data[0].Date,
          time: [data[0].Start_Hour + "-" + data[0].End_Hour],
        },
      ],
    };
    let typeTritment = [data[0].Type_treatment_Number];
    for (let i = 1; i < data.length; i++) {
      if (data[i].Business_Number1 == data[i - 1].Business_Number1) {
        //בודק האם העסק שווה לקודם
        if (data[i].Date1 == obj.diary[obj.diary.length - 1].date) {
          // בודק האם יש עוד טווח שעות שונה באותו תאריך
          if (
            !obj.diary[obj.diary.length - 1].time.includes(
              data[i].Start_time + "-" + data[i].End_time
            )
          ) {
            obj.diary[obj.diary.length - 1].time.push(
              data[i].Start_time + "-" + data[i].End_time
            );
          }
        } else {
          // פותח מיקום חדש במערך לתאריך חדש
          obj.diary.push({
            date: data[i].Date1,
            time: [data[i].Start_time + "-" + data[i].End_time],
          });
        }
        if (
          data[i].Type_treatment_Number !=
            obj.typeTritment[obj.typeTritment.length - 1].type &&
          !typeTritment.includes(data[i].Type_treatment_Number)
        ) {
          //אם הסוג טיפול שונה מקודמו
          typeTritment.push(data[i].Type_treatment_Number);
          obj.typeTritment.push({
            duration: data[i].duration,
            type: data[i].Type_treatment_Number,
            price: data[i].Price,
          });
        }
        if (
          data[i].Number_appointment != //////////////////////////////////////////////////////
          obj.apointemnt[obj.apointemnt.length - 1].number //////////////////////////////////////////////
        ) {
          //אם המספר תור שונה מקודמו
          obj.apointemnt[0].time.push(
            // number: data[i].Number_appointment,
            // status: data[i].Appointment_status,
            // date: data[i].Date,
            JSON.stringify(data[i].Start_Hour) +
              "-" +
              JSON.stringify(data[i].End_Hour)
          );
        }
      } else {
        res.push(obj);
        typeTritment = [data[i].Type_treatment_Number];
        obj = {
          id: data[i].Business_Number1,
          businessName: data[i].Name,
          streetAddress: data[i].AddressStreet,
          houseNumber: data[i].AddressHouseNumber,
          city: data[i].AddressCity,
          about: data[i].About,
          phone: data[i].phone,
          facebook: data[i].Facebook_link,
          instagram: data[i].Instagram_link,
          LongCordinate: data[i].LongCordinate,
          LetCordinate: data[i].LetCordinate,
          Is_client_house: data[i].Is_client_house1,
          diary: [
            {
              date: data[i].Date1,
              time: [data[i].Start_time + "-" + data[i].End_time],
            },
          ],
          typeTritment: [
            {
              duration: data[i].duration,
              type: data[i].Type_treatment_Number,
              price: data[i].Price,
            },
          ],
          apointemnt: [
            {
              number: data[i].Number_appointment, ////////////////////////////////////////
              status: data[i].Appointment_status, /////////////////////////////////////////
              date: data[i].Date,
              time: [data[i].Start_Hour + "-" + data[i].End_Hour],
            },
          ],
        };
      }
    }
    console.log(obj);
    res.push(obj);
    console.log("res = " + JSON.stringify(res));

    let final = [];
    console.log("rank: "+JSON.stringify(rank));
var a = rank.find((x) => x.Business_Number === res[0].id);
var b;
console.log("0 " + JSON.stringify(a));
for (let i = 1; i < res.length; i++) {
b = rank.find((x) => x.Business_Number == res[i].id);
console.log(i + " " + JSON.stringify(b));

if (a.Business_Rank < b.Business_Rank) {
  console.log("if");
  console.log("a: " + a.Business_Rank + " - b: " + b.Business_Rank);
  let push = res.find((x) => x.id == a.Business_Number);
  a = b;
  final.push(push);
} else {
  console.log("else");
  console.log(
    "a: " + a.Business_Rank,
    a.Business_Number + " - b: " + b.Business_Rank,
    b.Business_Number
  );
  let push = res.find((x) => x.id == b.Business_Number);
  final.push(push);
}
}
if (a) {
let push = res.find((x) => x.id == a.Business_Number);
final.push(push);
} else {
let push = res.find((x) => x.id == b.Business_Number);
final.push(push);
}
console.log("final: " + JSON.stringify(final));
    SetResult(res);
    console.log("INBAR HERE", result);
    return res;
  }
  function btnSearch() {
    let num = 0;

    // categories.map((z) => {
    //   //שומר את מספר ההטיפול בשביל הקריאה לשמירת תור עתידי
    //   if (z.Name == NameTreatment) {
    //     num = z.Type_treatment_Number1;
    //     console.log(
    //       "treatment number: " + num,
    //       "treatment name: " + NameTreatment
    //     );
    //   }
    // });
    console.log(
      "AddressCity: " +
        AddressCity +
        "treatment Number: " +
        treatmentNumber +
        "Is_client_house: " +
        Is_client_house
    );
    const obj = {
      AddressCity:userDetails.AddressCity,
      TreatmentNumber: treatmentNumber,
      // sort: "דירוג גבוהה תחילה",
      // Is_client_house: Is_client_house,
    };
    //   // SetResponse([{"Appointment_status": null, "Business_Number": 1, "Date": "2023-04-09T00:00:00", "End_time": "12:30:00", "Is_client_house": "YES       ", "Number_appointment": 4, "Start_time": "12:00:00"}, {"Appointment_status": null, "Business_Number": 2, "Date": "2023-04-10T00:00:00", "End_time": "13:30:00", "Is_client_house": "YES       ", "Number_appointment": 6, "Start_time": "13:00:00"}])
    NewSearchPost(obj).then(
      (result) => {
        console.log("yes", result.data);
        if (result.data) {
          GetData(result.data);
          console.log("amount of results: " + JSON.stringify(result.data));
          //מפעיל את הכפתור תצוגת מפה
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
    // }
  }
  const RtlText = ({ text }) => (
    <Text style={{ textAlign: "left" }}>{text}</Text>
  );

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Header
              text="חיפוש תורים פנויים"
              fontSize={40}
              color={"rgb(92, 71, 205)"}
            />
            <Text style={styles.title}>בחר את הטיפול הרצוי: </Text>
            <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
              <DropDownPicker
                open={open}
                value={treatmentNumber}
                items={categories.map((category, i) => ({
                  label: <RtlText text={category.Name} />,
                  value: category.Type_treatment_Number,
                  key: i + "category",
                }))}
                setOpen={setOpen}
                setValue={SetTreatmentNumber}
                style={{}}
                itemStyle={{
                  alignItems: "flex-start",
                  textAlign: "left",
                }}
                labelStyle={{
                  textAlign: "left",
                }}
                activeItemStyle={{ alignItems: "flex-start" }}
                zIndex={9999}
              />
<View style={{ height: 65 }} />
              <View style={styles.buttonContainer}>
                <View style={styles.containerBut}>
                  <TouchableOpacity style={styles.but} onPress={btnSearch}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.thachtext}>חפש</Text>
                      <Icon name="search" size={25} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>

                {result.length > 0 && (
                  <View style={styles.containerBut}>
                    <TouchableOpacity
                      style={styles.but}
                      onPress={() => {
                        navigation.navigate("Maps_Inbar", {
                          result: result,
                        });
                      }}
                    >
                      <View style={styles.buttonContent}>
                        <Text style={styles.thachtext}>הצג במפה</Text>
                        <Icon name="place" size={20} color="white" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  // <Maps_Inbar result={result}/>
                )}
              </View>
            </View>
          </View>
          <ScrollView>
            {result.map((r) => (
              <AvailableAppointmentToBook
                key={r.id}
                result={r}
                treatmentNumber={treatmentNumber}
              />
            ))}
          </ScrollView>
        </View>
         <View style={{ height: 70 }} />
      </ScrollView>
      {/* {result&&result.length>0<Maps_Inbar result={result}/>} */}
      <Menu_Client />
      {showLoading && (
        <TouchableOpacity onPress={() => setshowLoading(!showLoading)}>
          <Loading text="מביא נתונים.." />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 10,
    flexDirection: "row-reverse",
  },
  radioButtonContainer: {
    flexDirection: "row-reverse", // Reverses the direction
    alignItems: "center",
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
    textAlign: "right",
  },
  filterContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: "#EEE",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    padding: 10,
    justifyContent: "center",
    textAlign: "left",
    fontSize: 15,
    fontWeight: "bold",
    color: "rgb(92, 71, 205)",
  },
  container: {
    // flex:1,
    backgroundColor: "#e6e6fa",
    // textAlign: "right",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "right",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: "rgb(92, 71, 205)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    width: "45%",
  },
  buttonTitle: {
    fontWeight: "bold",
    color: "white",
  },
  but: {
    alignItems: "center",
    textAlign: "center",
    borderRadius: 25,
    height: 45,
    // marginBottom: 20,
    backgroundColor: "rgb(92, 71, 205)",
    padding: 10,
    margin: 45, // שולט על הגודל של הכפתור
    marginTop: 5,
  },
  thachtext: {
    textAlign: "center",
    color: "#fffaf0",
    fontSize: 20,
    fontWeight: "bold",
    //borderRadius: 10,
    height: 20,
    // marginBottom: 20,
    // backgroundColor: '#fffaf0',
    // padding: 15,
    // margin: 10,
    // marginTop: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerBut: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
    width: "50%",
  },
  labelStyle: {
    textAlign: "left", // מגדיר את הטקסט להיות מימין לשמאל
  },
  containerStyle: {
    height: 40,
    width: 150,
    marginRight: 10,
  },
  itemStyle: {
    textAlign: "center",
    justifyContent: "flex-end", // מגדיר את הפריטים להיות ממורכזים לשמאל
  },
  picker: {
    alignItems: "center",
  },
  dropDownContainerStyle: {
    alignSelf: "flex-start", // מגדיר את התפריט הנפתח להיות מימין לשמאל
  },
});

// import { React, useState, useEffect, useContext } from "react";
// import { Text, View, StyleSheet, Button, TextInput } from "react-native";
// import {
//   NewSearchPost,
//   Treatment_type_GET,
//   Post_SendPushNotification,
// } from "../obj/FunctionAPICode";
// import { ScrollView } from "react-native-gesture-handler";
// import AvailableAppointmentToBook from "./AvailableAppointmentToBook";
// import { UserContext } from "../UserDietails";
// import { MaterialIcons as Icon } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
// import { RadioButton } from "react-native-paper";
// import Maps_Inbar from "../Maps_Inbar";
// import { log } from "react-native-reanimated";
// import Menu_Client from "../obj/Menu_Client";

// export default function NewSearch3() {
//   const [NameTreatment, setNameTreatment] = useState("");
//   const [treatmentNumber, SetTreatmentNumber] = useState("");
//   const [ShowFilter, SethowFilter] = useState(false);
//   const [filter_catgories, set_filter_catgories] = useState([]);
//   const [token, settoken] = useState(); // ענבר
//   const { userDetails, setUserDetails } = useContext(UserContext);
//   const [result, SetResult] = useState([]);
//   const [gender, setGender] = useState(null);
//   const [AddressCity, setAddressCity] = useState(null);
//   const [Is_client_house, setIs_client_house] = useState(null);
//   const [categories, setCategories] = useState(["קטגוריה"]);

//   const ClientData = userDetails;
//   useEffect(() => {
//     if (token) {
//       const body = {
//         to: token,
//         title: "BeautyMe",
//         // "body": `${userDetails.First_name} הזמינה תור חדש `,
//         body: ` הזמינה תור חדש `,
//         badge: "0",
//         ttl: "1", // מספר שניות לשליחה
//         data: {
//           to: token,
//         },
//       };
//       Post_SendPushNotification(body).then(() => {
//         console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", token);
//       });
//     }
//   }, [token]);

//   //   useEffect(()=>{
//   //     console.log("nameTreatment changed...");
//   // for (let i = 0; i < categories.length; i++) {
//   //   if(NameTreatment===categories[i].Name){
//   //     console.log(NameTreatment+" is number: "+categories[i].Type_treatment_Number);
//   //     SetTreatmentNumber(categories[i].Type_treatment_Number)
//   //     break;
//   //   }
//   // }
//   //   },[NameTreatment])
//   useEffect(() => {
//     Treatment_type_GET().then(
//       (result) => {
//         console.log("categories: ", result);
//         if (result) {
//           setCategories(result);
//           SetTreatmentNumber(result[0].Type_treatment_Number);
//         }
//       },
//       (error) => {
//         console.log("error", error);
//       }
//     );
//     // const data = GetData(Data); נלקח מהמידע בDATA
//     // console.log(JSON.stringify(data));
//     // SetResult(data);
//   }, []);

//   function GetData(data) {
//     let res = [];
//     let obj = {
//       id: data[0].Business_Number,
//       businessName: data[0].Name,
//       streetAddress: data[0].AddressStreet,
//       houseNumber: data[0].AddressHouseNumber,
//       city: data[0].AddressCity,
//       about: data[0].about,
//       phone: data[0].phone,
//       facebook: data[0].Facebook_link,
//       instagram: data[0].Instagram_link,
//       LongCordinate: data[0].LongCordinate,
//       LetCordinate: data[0].LetCordinate,
//       Is_client_house: data[0].Is_client_house1,
//       diary: [
//         {
//           date: data[0].Date1,
//           time: [data[0].Start_time + "-" + data[0].End_time],
//         },
//         // {
//         //     date:'2023-06-03',
//         //     time:['10-14','17-21']
//         // }
//       ],
//       typeTritment: [
//         {
//           duration: data[0].duration,
//           type: data[0].Type_treatment_Number,
//           price: data[0].Price,
//         },
//         // {
//         //     duration:'2',
//         //     type:'hair'
//         // }
//       ],
//       apointemnt: [
//         {
//           number: data[0].Number_appointment,
//           status: data[0].Appointment_status,
//           date: data[0].Date,
//           time: [data[0].Start_Hour + "-" + data[0].End_Hour],
//         },
//       ],
//     };
//     let typeTritment = [data[0].Type_treatment_Number];
//     for (let i = 1; i < data.length; i++) {
//       if (data[i].Business_Number == data[i - 1].Business_Number) {
//         //בודק האם העסק שווה לקודם
//         if (data[i].Date1 == obj.diary[obj.diary.length - 1].date) {
//           // בודק האם יש עוד טווח שעות שונה באותו תאריך
//           if (
//             !obj.diary[obj.diary.length - 1].time.includes(
//               data[i].Start_time + "-" + data[i].End_time
//             )
//           ) {
//             obj.diary[obj.diary.length - 1].time.push(
//               data[i].Start_time + "-" + data[i].End_time
//             );
//           }
//         } else {
//           // פותח מיקום חדש במערך לתאריך חדש
//           obj.diary.push({
//             date: data[i].Date1,
//             time: [data[i].Start_time + "-" + data[i].End_time],
//           });
//         }
//         if (
//           data[i].Type_treatment_Number !=
//             obj.typeTritment[obj.typeTritment.length - 1].type &&
//           !typeTritment.includes(data[i].Type_treatment_Number)
//         ) {
//           //אם הסוג טיפול שונה מקודמו
//           typeTritment.push(data[i].Type_treatment_Number);
//           obj.typeTritment.push({
//             duration: data[i].duration,
//             type: data[i].Type_treatment_Number,
//             price: data[i].Price,
//           });
//         }
//         if (
//           data[i].Number_appointment !=
//           obj.apointemnt[obj.apointemnt.length - 1].number
//         ) {
//           //אם המספר תור שונה מקודמו
//           obj.apointemnt.push({
//             number: data[i].Number_appointment,
//             status: data[i].Appointment_status,
//             date: data[i].Date,
//             time: data[i].Start_Hour + "-" + data[i].End_Hour,
//           });
//         }
//       } else {
//         res.push(obj);
//         typeTritment = [data[i].Type_treatment_Number];
//         obj = {
//           id: data[i].Business_Number,
//           businessName: data[i].Name,
//           streetAddress: data[i].AddressStreet,
//           houseNumber: data[i].AddressHouseNumber,
//           city: data[i].AddressCity,
//           about: data[i].about,
//           phone: data[i].phone,
//           facebook: data[i].Facebook_link,
//           instagram: data[i].Instagram_link,
//           LongCordinate: data[i].LongCordinate,
//           LetCordinate: data[i].LetCordinate,
//           diary: [
//             {
//               date: data[i].Date1,
//               time: [data[i].Start_time + "-" + data[i].End_time],
//             },
//           ],
//           typeTritment: [
//             {
//               duration: data[i].duration,
//               type: data[i].Type_treatment_Number,
//               price: data[i].Price,
//             },
//           ],
//           apointemnt: [
//             {
//               number: data[i].Number_appointment,
//               status: data[i].Appointment_status,
//               date: data[i].Date,
//               time: [data[i].Start_Hour + "-" + data[i].End_Hour],
//             },
//           ],
//         };
//       }
//     }
//     console.log(obj);
//     res.push(obj);
//     SetResult(res);
//     return res;
//   }
//   function btnSearch() {
//     let num = 0;

//     categories.map((z) => {
//       //שומר את מספר ההטיפול בשביל הקריאה לשמירת תור עתידי
//       if (z.Name == NameTreatment) {
//         num = z.Type_treatment_Number1;
//         console.log(
//           "treatment number: " + num,
//           "treatment name: " + NameTreatment
//         );
//       }
//     });
//     console.log(
//       "AddressCity: " +
//         AddressCity +
//         "treatment Number: " +
//         treatmentNumber +
//         "Is_client_house: " +
//         Is_client_house
//     );
//     const obj = {
//       AddressCity: AddressCity,
//       TreatmentNumber: treatmentNumber,
//       // sort: "דירוג גבוהה תחילה",
//       gender: gender,
//       Is_client_house: Is_client_house,
//     };
//     //   // SetResponse([{"Appointment_status": null, "Business_Number": 1, "Date": "2023-04-09T00:00:00", "End_time": "12:30:00", "Is_client_house": "YES       ", "Number_appointment": 4, "Start_time": "12:00:00"}, {"Appointment_status": null, "Business_Number": 2, "Date": "2023-04-10T00:00:00", "End_time": "13:30:00", "Is_client_house": "YES       ", "Number_appointment": 6, "Start_time": "13:00:00"}])
//     NewSearchPost(obj).then(
//       (result) => {
//         console.log("yes", result.data);
//         if (result.data) {
//           GetData(result.data);
//           console.log("amount of results: " + JSON.stringify(result.data));
//           //מפעיל את הכפתור תצוגת מפה
//         }
//       },
//       (error) => {
//         console.log("error", error);
//       }
//     );
//     // }
//   }
//   const FilterTreatment = (text) => {
//     console.log(filter_catgories && filter_catgories.length > 0);

//     const filterSearch = categories.filter((value) =>
//       value.Name.includes(text)
//     );
//     set_filter_catgories(filterSearch);
//     console.log(filterSearch);
//     console.log(text);
//   };
//   return (
//     <>
//       {/* {result&&result.length>0&&<Maps_Inbar result={result}/>} */}
//       <View>
//         <View>
//           {/* <Text style={styles.title}>שלום {ClientData.First_name} </Text> */}
//           <Text style={styles.title}>שלום </Text>
//           <View style={{ flexDirection: "column" }}>
//             <TextInput
//               style={{
//                 height: 40,
//                 borderColor: "gray",
//                 borderWidth: 1,
//                 marginBottom: 10,
//                 placeholderTextColor: "#E6E6FA",
//               }}
//               onChangeText={(text) => FilterTreatment(text)}
//               placeholder="הקלדי טיפול יופי"
//             >
//               {" "}
//             </TextInput>

//             <View style={styles.buttonContainer}>
//               <Button
//                 title="חפש"
//                 onPress={btnSearch}
//                 buttonStyle={{
//                   backgroundColor: "rgb(92, 71, 205)",
//                   borderWidth: 2,
//                   borderColor: "white",
//                   borderRadius: 30,
//                 }}
//                 icon={<Icon name="search" size={24} color="white" />}
//               />
//               {result.length > 0 && (
//                 <Button
//                   style={{ Color: "rgb(92, 71, 205)" }}
//                   title="תצוגת מפה"
//                   buttonStyle={{
//                     backgroundColor: "rgb(92, 71, 205)",
//                     borderWidth: 2,
//                     borderColor: "white",
//                     borderRadius: 30,
//                   }}
//                   // containerStyle={{
//                   //   width: 200,
//                   //   marginHorizontal: 50,
//                   //   marginVertical: 10,
//                   // }}
//                   // titleStyle={{ fontWeight: "bold" }}
//                   onPress={() => {
//                     props.navigation.navigate("SearchOnMap", {
//                       results: result,
//                     });
//                   }}
//                   icon={<Icon name="place" size={24} color="white" />}
//                 />
//               )}
//               <Button
//                 title="סינון"
//                 buttonStyle={{
//                   backgroundColor: "rgb(92, 71, 205)",
//                   borderWidth: 2,
//                   borderColor: "white",
//                   borderRadius: 30,
//                 }}
//                 icon={<Icon name="filter-list" size={24} color="white" />}
//                 onPress={() => SethowFilter(!ShowFilter)}
//               />
//             </View>
//           </View>

//           <Picker
//             selectedValue={treatmentNumber}
//             onValueChange={(value) => SetTreatmentNumber(value)}
//             style={styles.picker}
//           >
//             {categories &&
//               categories.map((category, i) => (
//                 <Picker.Item
//                   label={category.Name}
//                   value={category.Type_treatment_Number}
//                   key={i + "catgore"}
//                 />
//               ))}
//           </Picker>
//           {/* <Picker
//           selectedValue={NameTreatment}
//           onValueChange={(value) => setNameTreatment(value)}
//           style={styles.picker}
//         >
//           {filter_catgories && filter_catgories.length > 0 ? (
//             filter_catgories.map((category, i) => (
//               <Picker.Item
//                 label={category.Name}
//                 value={category.Name}
//                 key={i}
//               />
//             ))
//           ) : (
//             <Picker.Item label={"אין תוצאות"} key={0} />
//           )}
//         </Picker> */}

//           {ShowFilter && (
//             <View style={styles.filterContainer}>
//               <View>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="עיר"
//                   value={AddressCity}
//                   onChangeText={(value) => setAddressCity(value)}
//                 />
//               </View>
//               <View>
//                 <Text style={styles.sectionTitle}>מין מטפל:</Text>
//                 <View style={styles.radioButtonContainer}>
//                   <RadioButton
//                     value="M"
//                     status={gender === "M" ? "checked" : "unchecked"}
//                     onPress={() => setGender("M")}
//                   />
//                   <Text style={styles.radioButtonLabel}>זכר</Text>
//                 </View>
//                 <View style={styles.radioButtonContainer}>
//                   <RadioButton
//                     value="F"
//                     status={gender === "F" ? "checked" : "unchecked"}
//                     onPress={() => setGender("F")}
//                   />
//                   <Text style={styles.radioButtonLabel}>נקבה</Text>
//                 </View>
//               </View>

//               <View>
//                 <Text style={styles.sectionTitle}>טיפול ביתי:</Text>
//                 <View style={styles.radioButtonContainer}>
//                   <RadioButton
//                     value="YES"
//                     status={Is_client_house === "YES" ? "checked" : "unchecked"}
//                     onPress={() => setIs_client_house("YES")}
//                   />
//                   <Text style={styles.radioButtonLabel}>כן</Text>
//                 </View>
//                 <View style={styles.radioButtonContainer}>
//                   <RadioButton
//                     value="NO"
//                     status={Is_client_house === "NO" ? "checked" : "unchecked"}
//                     onPress={() => setIs_client_house("NO")}
//                   />
//                   <Text style={styles.radioButtonLabel}>לא</Text>
//                 </View>
//               </View>
//             </View>
//           )}
//         </View>
//         <ScrollView>
//           {result.map((r) => (
//             <AvailableAppointmentToBook
//               key={r.id}
//               result={r}
//               treatmentNumber={treatmentNumber}
//             />
//           ))}
//         </ScrollView>
//       </View>
//       <Menu_Client/>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   radioButtonLabel: {
//     fontSize: 16,
//     marginLeft: 10,
//     flexDirection: "row-reverse",
//   },
//   radioButtonContainer: {
//     flexDirection: "row-reverse", // Reverses the direction
//     alignItems: "center",
//     marginVertical: 5,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//     marginVertical: 10,
//     textAlign: "right",
//   },
//   filterContainer: {
//     width: "100%",
//     padding: 10,
//     borderRadius: 10,
//     borderColor: "#000",
//     borderWidth: 1,
//     marginVertical: 10,
//     backgroundColor: "#EEE",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//   },
//   title: {
//     padding: 10,
//     justifyContent: "center",
//     textAlign: "center",
//     fontSize: 25,
//     color: "#000", // Change color to black for better visibility
//     fontWeight: "bold",
//     color: "rgb(92, 71, 205)",
//   },
//   container: {
//     backgroundColor: "#F5FCFF",
//     padding: 20,
//     borderRadius: 10,
//     borderColor: "#000",
//     borderWidth: 1,
//     margin: 10,
//     maxHeight: "80%", // Add a maxHeight property
//     overflow: "scroll", // If content exceeds the maxHeight, allow scrolling
//   },
//   titleText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "right",
//     marginVertical: 10,
//   },
//   text: {
//     fontSize: 16,
//     textAlign: "right",
//     marginVertical: 5,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   buttonStyle: {
//     backgroundColor: "rgb(92, 71, 205)",
//     borderWidth: 2,
//     borderColor: "white",
//     borderRadius: 30,
//     width: "45%",
//   },
//   buttonTitle: {
//     fontWeight: "bold",
//     color: "white",
//   },
// });
