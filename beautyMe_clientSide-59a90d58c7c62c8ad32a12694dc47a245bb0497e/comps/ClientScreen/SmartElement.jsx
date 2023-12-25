import React, { useContext, useEffect,useState } from 'react';
import { StyleSheet, View, Text,TouchableOpacity, Image, Linking, ScrollView} from 'react-native';
import { UserContext } from '../UserDietails';
import Header from '../obj/Header';
import { useNavigation} from "@react-navigation/core";
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { openURL, canOpenURL } from "expo-linking";
import Menu_Client from '../obj/Menu_Client';
import {NewSearchPost, Treatment_type_GET, Post_SendPushNotification, RateBussines} from "../obj/FunctionAPICode";
import AvailableAppointmentToBook_New from './AvailableAppointmentToBook_New';
import Carousel from 'react-native-snap-carousel';
import AvailableAppointmentForTreatment from './AvailableAppointmentForTreatment';


    



const ClientHome = ({navigation}) => {
    const [result, SetResult] = useState([]);
    const [treatmentNumber, SetTreatmentNumber] = useState("");
    const [categories, setCategories] = useState([]);
    const [Type_treatment, setType_treatment] = useState([]);
    const [rateBus, setRateBus] = useState([])
    const [useEffectFinished, setUseEffectFinished] = useState(false); // משתנה בוליאני לסימון שה useEffect סיים
    const [isLoading, setIsLoading] = useState(true);
    const [newData, setNewData] = useState([]);



    // const [rateBus, setRateBus] = useState(() => {
    //   RateBussines().then(
    //     (result) => {
    //       //   console.log("categories: ", result);
    //         if (result) {
    //           setRateBus(result);
    //           console.log(result, "raterate")
    //           console.log(rateBus)
    //           GetData(result.data);
             
    //         }
    //       },
    //       (error) => {
    //         console.log("error", error);
    //       }
    //     );
    // })




    const { userDetails, setUserDetails } = useContext(UserContext);
// const navigation=useNavigation();
useEffect(()=>{


    RateBussines().then(
        async (result) => {
          if (result) {
            setRateBus(result);
            console.log(result, "raterate");
      
            const newDataArr = [];
      
            for (const row of result) {
              const obj = {
                Business_Number: row.Business_Number,
              };
      
              try {
                const newSearchResult = await NewSearchPost(obj);
                if (newSearchResult.data) {
                  const newData = { ...row, ...newSearchResult.data };
                  newDataArr.push(newData);
                }
              } catch (error) {
                console.log("error", error);
              }
            }
      
            GetData(newDataArr);
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
      

    // RateBussines().then(
    //     (result) => {
    //       if (result) {
    //         setRateBus(result);
    //         console.log(result, "raterate");
      
    //         for (const row of result) {
    //           const obj = {
    //             Business_Number: row.Business_Number,
    //           };
              
      
    //           NewSearchPost(obj).then(
    //             (result) => {
    //               if (result.data) {
    //                 // שמירת התוצאה במשתנה או בטבלה חדשה
    //                 const newData = { ...row, ...result.data };
    //                 // השתמש במשתנה newData כדי לשלוח או לשמור את התוצאה במקום המתאים
    //               }
    //             },
    //             (error) => {
    //               console.log("error", error);
    //             }
    //           );
    //         }
    //       }
    //     },
    //     (error) => {
    //       console.log("error", error);
    //     }
    //   );
    //   GetData(newData);

      
      

//   RateBussines().then(
//     (result) => {
//       //   console.log("categories: ", result);
//         if (result) {
//           setRateBus(result);
//           console.log(result, "raterate")
//         //   setIsLoading(false);
         
//         }
//       },
//       (error) => {
//         console.log("error", error);
//       }
//     );
   
//     const obj = {
        
//         TreatmentNumber: 4,
    
//       };
//       NewSearchPost(obj).then(
//         (result) => {
//         //   console.log("yes", result.data, "556565655656565");
//           if (result.data) {
//             GetData(result.data);
//           }
//         },
//         (error) => {
//           console.log("error", error);
//         }
//       );

      
       // סימון שה useEffect סיים
    // setUseEffectFinished(true);
},[])

useEffect(() => {
  // התווסף האובייקט החדש למערך rateBus
  // נפעיל את הפונקציה להפעלת רנדור מחדש של הקרוסלה
  renderCarousel();
}, [rateBus]);

const renderCarousel = () => {
  return (
    <Carousel
      data={rateBus}
      renderItem={({ item }) => (
        <AvailableAppointmentToBook_New result={item} />
      )}
      sliderWidth={400}
      itemWidth={180}
      activeSlideOffset={20}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      loop={true}
      enableSnap={true}
    />
  );
};

// useEffect(() => {
//   if (useEffectFinished) {
//     console.log("הדף נטען");
//   }
// }, [useEffectFinished]);
function GetData(data) {
    let res = [];
    let obj = {
      id: data[0].Business_Number,
      businessName: data[0].Name,
      streetAddress: data[0].AddressStreet,
      houseNumber: data[0].AddressHouseNumber,
      city: data[0].AddressCity,
      about: data[0].about,
      phone: data[0].phone,
      facebook: data[0].Facebook_link,
      instagram: data[0].Instagram_link,
      LongCordinate: data[0].LongCordinate,
      LetCordinate: data[0].LetCordinate,
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
          number: data[0].Number_appointment,
          status: data[0].Appointment_status,
          date: data[0].Date,
          time: [data[0].Start_Hour + "-" + data[0].End_Hour],
        },
      ],
    };
    let typeTritment = [data[0].Type_treatment_Number];
    for (let i = 1; i < data.length; i++) {
      if (data[i].Business_Number == data[i - 1].Business_Number) {
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
          data[i].Number_appointment !=
          obj.apointemnt[obj.apointemnt.length - 1].number
        ) {
          //אם המספר תור שונה מקודמו
          obj.apointemnt.push({
            number: data[i].Number_appointment,
            status: data[i].Appointment_status,
            date: data[i].Date,
            time: data[i].Start_Hour + "-" + data[i].End_Hour,
          });
        }
      } else {
        res.push(obj);
        typeTritment = [data[i].Type_treatment_Number];
        obj = {
          id: data[i].Business_Number,
          businessName: data[i].Name,
          streetAddress: data[i].AddressStreet,
          houseNumber: data[i].AddressHouseNumber,
          city: data[i].AddressCity,
          about: data[i].about,
          phone: data[i].phone,
          facebook: data[i].Facebook_link,
          instagram: data[i].Instagram_link,
          LongCordinate: data[i].LongCordinate,
          LetCordinate: data[i].LetCordinate,
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
              number: data[i].Number_appointment,
              status: data[i].Appointment_status,
              date: data[i].Date,
              time: [data[i].Start_Hour + "-" + data[i].End_Hour],
            },
          ],
        };
      }
    }
    res.push(obj);
    res.sort((a, b) => a.Business_Rank.localeCompare(b.Business_Rank));
    SetResult(res);
    return res;
  }
  

  
  const handleCardClick = (treatment) => {
    console.log(treatment, "234234")
    navigation.navigate('AvailableAppointmentForTreatmentAndCity',{treatmentName: treatment})
};

  

    return (
        <View style={styles.container}>


        <Text>העסקים המובילים:    אלמנט חכם</Text>

        <ScrollView >
          {rateBus.map((r) => (
          <Text>{r.Business_Number}</Text>
             
           
          ))}
        </ScrollView>




        

            <Menu_Client />
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // backgroundColor: '#f8f8ff',
    //     opacity: 0.9,
    //     // borderColor: '#800080',
    //     // borderWidth: 2,
    //     // borderRadius: 10,
    //     width: '90%',
    //     height: '40%',
        
    // },
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6fa',
        paddingTop:20,
        marginTop:0,
    },
    button: {
        alignItems: 'center',
        backgroundColor: "rgb(92, 71, 205)",
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    img: {
        borderRadius: 150,
        marginBottom: 20,
        width: 250,
        height: 250,
    },
    view1:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6fa',
        
    },
    greeting: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
      },
    tit:{
    "fontSize": 40,
    "fontWeight": "500",
    "letterSpacing": 0.15,
    "lineHeight": 50,
    textShadowColor: 'rgb(92, 71, 205)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    opacity:0.7
    },
    iconContainer: {
        flexDirection: "row",
        // justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        // width: "50%",
        marginTop: 10,
        marginBottom: 10,
      },
});

export default ClientHome; 







