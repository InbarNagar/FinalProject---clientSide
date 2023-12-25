import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {BussinesCanGiveTreatment} from './obj/FunctionAPICode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {All_treatment_in_appointment} from './obj/FunctionAPICode';
import Button from './obj/Button';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notificationss from './obj/Notificationss';
import { Alert } from 'react-native';
import Header from './obj/Header';
import { color } from 'react-native-reanimated';
import { UserContext } from '../comps/UserDietails';




const Menu_treatment_forAppointment = () => {

  
  const [treatments, setTreatments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [professionalID, setIdNumber] = useState('');
  const [appointmentID, setAppointment_num] = useState('');
  const [BusinessData, setBusinessData] = useState([]);  //מערך על כל סוגי הטיפולים האפשריים לעסק הספציפי
  const [selectedRows, setSelectedRows] = useState([]);
  const [select_treatment_for_appointment, setSelect_treatment_for_appointment] = useState([]) // מערך עם כל סוגי הטיפולים האפשריים לתור הספציפי לפי מה שבחר בעל העסק
  const { userDetails, setUserDetails } = useContext(UserContext);
  const navigation = useNavigation();

  const handelLocalstorage = async () => {
    try {
      const professionalID = await AsyncStorage.getItem('idNumber_professional');
      const appointmentID = await AsyncStorage.getItem('appointmentId');
      setIdNumber(professionalID || '');
      setAppointment_num(appointmentID || '');
    } catch (error) {
      console.log('Failed to load from AsyncStorage', error);
    }
  }

  const printAsyncStorageKeys = async () => {
    const keys = await AsyncStorage.getAllKeys();
    console.log("AsyncStorage keys: ", keys);
  }

  useEffect(() => {
    setSelect_treatment_for_appointment([]);
    setBusinessData([]);
    printAsyncStorageKeys();
    handelLocalstorage();
    const fetchBusinessData = async () => {
      try {
        const BussinesNumber = userDetails.Business_Number;
        const data = await BussinesCanGiveTreatment(BussinesNumber);
        const BusinessData = data.data.map((item) => {
          return {
            Type_treatment_Number: item['Type_treatment_Number'],
            Name_Type_treatment: item['Name_Type_treatment'],
            Price: item['Price'],
            Treatment_duration: item['Treatment_duration']
          };
        });
        setBusinessData(BusinessData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBusinessData();
  },[]);

  const handleAddTreatments = () => {
    select_treatment_for_appointment.forEach(item => {
      const data = {
        Number_appointment: appointmentID,
        Type_treatment_Number: item,
      };
      console.log(data)
      console.log("4444")
      // const axios = All_treatment_in_appointment(data)
      All_treatment_in_appointment(data).then(result => {
        console.log(result.data)
        console.log(result.status)
      if(result.status==200){
        // Notificationss("OK", "התור נוסף בהצלחה") 
        Alert.alert(
          'תור חדש נוסף בהצלחה',
          'התור נוסף בהצלחה',
          [
            {onPress: () => navigation.navigate('Calendar_professional') },
          ],
          { cancelable: false }
        );
      }
    }).catch(error => {
        console.log(error);
    });
    });
  };

  const handleRowPress = (Type_treatment_Number) => {
    if (select_treatment_for_appointment.includes(Type_treatment_Number)) {
      setSelect_treatment_for_appointment(select_treatment_for_appointment.filter((num) => num !== Type_treatment_Number));
    } else {
      setSelect_treatment_for_appointment([...select_treatment_for_appointment, Type_treatment_Number]);
    }
  };
  
  const UserRow = ({ Type_treatment_Number, Name_Type_treatment, Price, Treatment_duration }, index) => (
    <TouchableOpacity onPress={() => handleRowPress(Type_treatment_Number)}>
      <View style={[styles.userRow, select_treatment_for_appointment.includes(Type_treatment_Number) && styles.selectedUserRow, { flexDirection: 'row', padding: 10 }]}>
        <Text style={{ flex: 1, ...styles.userRowText, textAlign: 'center' }}>{Name_Type_treatment}</Text>
        <Text style={{ flex: 1, ...styles.userRowText, textAlign: 'center' }}>{Price}</Text>
        <Text style={{ flex: 1, ...styles.userRowText, textAlign: 'center' }}>{Treatment_duration}</Text>
      </View>
    </TouchableOpacity>
  );


return (
  <View style={styles.container}>
      <Text style={styles.title}>בחרי את סוגי הטיפולים האפשריים לתור זה:</Text>
      <FlatList
          data={BusinessData}
          keyExtractor={(item) => item.Type_treatment_Number}
          renderItem={({ item, index }) => (
              <UserRow
                  Type_treatment_Number={item.Type_treatment_Number}
                  Name_Type_treatment={item.Name_Type_treatment}
                  Price={item.Price}
                  Treatment_duration={item.Treatment_duration}
                  index={index}
              />
          )}
          ListHeaderComponent={() => (
              <View style={styles.listHeader}>
                  <Text style={styles.headerText}>סוג טיפול</Text>
                  <Text style={styles.headerText}>מחיר</Text>
                  <Text style={styles.headerText}>משך הטיפול</Text>
              </View>
          )}
      />
      <Button style={styles.button} onPress={handleAddTreatments} text="הוסף טיפולים" />
  </View>
);
          }


          const styles = StyleSheet.create({
            container: {
                flex: 1,
                paddingHorizontal: 20,
                paddingTop: 50,
                backgroundColor: '#f5f5f5'
            },
            title: {
                fontSize: 20,
                fontWeight: '600',
                color: '#333',
                marginBottom: 20,
            },
            userRow: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              padding: 15,
              marginBottom: 10,
              borderRadius: 5,
              borderWidth: 1, // add border
              borderColor: '#ccc', // border color
              opacity: 0.8, // change opacity
            },
            selectedUserRow: {
                backgroundColor: '#98FB98',
            },
            userRowText: {
                fontSize: 18,
                color: '#333',
            },
            listHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
            },
            headerText: {
                fontSize: 16,
                fontWeight: '600',
                color: '#333',
            },
            button: {
                backgroundColor: '#007bff',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 30,
            },
        });


export default Menu_treatment_forAppointment;






//***************************** עובד */
// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
// import {BussinesCanGiveTreatment} from './obj/FunctionAPICode';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {All_treatment_in_appointment} from './obj/FunctionAPICode';
// import Button from './obj/Button';
// import { useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Notificationss from './obj/Notificationss';
// import { Alert } from 'react-native';
// import Header from './obj/Header';
// import { color } from 'react-native-reanimated';
// import { UserContext } from '../comps/UserDietails';




// const Menu_treatment_forAppointment = () => {

  
//   const [treatments, setTreatments] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedTreatments, setSelectedTreatments] = useState([]);
//   const [professionalID, setIdNumber] = useState('');
//   const [appointmentID, setAppointment_num] = useState('');
//   const [BusinessData, setBusinessData] = useState([]);  //מערך על כל סוגי הטיפולים האפשריים לעסק הספציפי
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [select_treatment_for_appointment, setSelect_treatment_for_appointment] = useState([]) // מערך עם כל סוגי הטיפולים האפשריים לתור הספציפי לפי מה שבחר בעל העסק
//   const { userDetails, setUserDetails } = useContext(UserContext);
//   const navigation = useNavigation();

//   const handelLocalstorage = async () => {
//     try {
//       const professionalID = await AsyncStorage.getItem('idNumber_professional');
//       const appointmentID = await AsyncStorage.getItem('appointmentId');
//       setIdNumber(professionalID || '');
//       setAppointment_num(appointmentID || '');
//     } catch (error) {
//       console.log('Failed to load from AsyncStorage', error);
//     }
//   }

//   const printAsyncStorageKeys = async () => {
//     const keys = await AsyncStorage.getAllKeys();
//     console.log("AsyncStorage keys: ", keys);
//   }

//   useEffect(() => {
//     setSelect_treatment_for_appointment([]);
//     setBusinessData([]);
//     printAsyncStorageKeys();
//     handelLocalstorage();
//     const fetchBusinessData = async () => {
//       try {
//         const BussinesNumber = userDetails.Business_Number;
//         const data = await BussinesCanGiveTreatment(BussinesNumber);
//         const BusinessData = data.data.map((item) => {
//           return {
//             Type_treatment_Number: item['Type_treatment_Number'],
//             Name_Type_treatment: item['Name_Type_treatment'],
//             Price: item['Price'],
//             Treatment_duration: item['Treatment_duration']
//           };
//         });
//         setBusinessData(BusinessData);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBusinessData();
//   },[]);

//   const handleAddTreatments = () => {
//     select_treatment_for_appointment.forEach(item => {
//       const data = {
//         Number_appointment: appointmentID,
//         Type_treatment_Number: item,
//       };
//       console.log(data)
//       console.log("4444")
//       // const axios = All_treatment_in_appointment(data)
//       All_treatment_in_appointment(data).then(result => {
//         console.log(result.data)
//         console.log(result.status)
//       if(result.status==200){
//         // Notificationss("OK", "התור נוסף בהצלחה") 
//         Alert.alert(
//           'תור חדש נוסף בהצלחה',
//           'התור נוסף בהצלחה',
//           [
//             {onPress: () => navigation.navigate('Calendar_professional') },
//           ],
//           { cancelable: false }
//         );
//       }
//     }).catch(error => {
//         console.log(error);
//     });
//     });
//   };

//   const handleRowPress = (Type_treatment_Number) => {
//     if (select_treatment_for_appointment.includes(Type_treatment_Number)) {
//       setSelect_treatment_for_appointment(select_treatment_for_appointment.filter((num) => num !== Type_treatment_Number));
//     } else {
//       setSelect_treatment_for_appointment([...select_treatment_for_appointment, Type_treatment_Number]);
//     }
//   };
  
  
//   const UserRow = ({ Type_treatment_Number, Name_Type_treatment, Price, Treatment_duration }, index) => (
//     <TouchableOpacity onPress={() => handleRowPress(Type_treatment_Number)}>
//       <View style={[styles.userRow, select_treatment_for_appointment.includes(Type_treatment_Number) && styles.selectedUserRow, { flexDirection: 'row', padding: 10 }]}>
//         <Text style={{ flex: 1, ...styles.userRowText }}>{Name_Type_treatment}</Text>
//         <Text style={{ flex: 1, ...styles.userRowText }}>{Price}</Text>
//         <Text style={{ flex: 1, ...styles.userRowText }}>{Treatment_duration}</Text>
//       </View>
//     </TouchableOpacity>
//   );


//   return (
//     <View  >
//       <View >
//       <Header text="סוגי טיפולים" fontSize={50} height={200}/>
//         <Text style={styles.title}>{"\n"}בחרי את סוגי הטיפולים האפשריים לתור זה:</Text>
//         <FlatList
//           data={BusinessData}
//           keyExtractor={(item) => item.Type_treatment_Number}
//           renderItem={({ item, index }) => (
//             <UserRow
//               Type_treatment_Number={item.Type_treatment_Number}
//               Name_Type_treatment={item.Name_Type_treatment}
//               Price={item.Price}
//               Treatment_duration={item.Treatment_duration}
//               index={index}
//             />
//           )}
//           ListHeaderComponent={() => (
//             <View style={{ flexDirection: 'row' }}>
//               <Text style={{ flex: 1, fontWeight: 'bold'}}>סוג טיפול</Text>
//               <Text style={{ flex: 1, fontWeight: 'bold'}}>מחיר</Text>
//               <Text style={{ flex: 1, fontWeight: 'bold'}}>משך הטיפול</Text>
//             </View>
//           )}
//         />
//       </View>
      
      
//         <Button onPress={handleAddTreatments} text="הוסף טיפולים"  color="#98FB98" />
      
//     </View>
//   );

//           }


// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
//     padding: '20px 40px',
//     margin: 1,
//     maxWidth: 500,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.16,
//     shadowRadius: 6,
//     padding: 20,
//     margin: 20,
//     maxWidth: 500,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center'
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     color: '#fff',
//     fontWeight: 'bold',
//     padding: '10px 20px',
//     borderRadius: 5,
//     cursor: 'pointer',
//   },
// });



// export default Menu_treatment_forAppointment;





//************************************************************** */


          // style={styles.container}
          // style={styles.inputContainer}


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';
// import {BussinesCanGiveTreatment} from './obj/FunctionAPICode';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Table_all_treatments_of_bussines from './obj/Table_all_treatments_of_bussines';
// import {UserRow} from './obj/Table_all_treatments_of_bussines';





// const Menu_treatment_registration = () => {
//   const [treatments, setTreatments] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedTreatments, setSelectedTreatments] = useState([]);
//   const [professionalID, setIdNumber] = useState(''); // ללוקאלסטורג
//   const [appointmentID, setAppointment_num] = useState('');
//   const [BusinessData, setBusinessData] = useState([]);
//   const [selectedOption, setSelectedOption] = useState('');


  
//   const handelLocalstorage = async () => { //קבלת הנתונים הרצויים מהלוקאלסטורג
//     try {
//       const professionalID = await AsyncStorage.getItem('idNumber_professional');
//       const appointmentID = await AsyncStorage.getItem('appointmentId');
//       console.log(professionalID, appointmentID);
//       setIdNumber(professionalID || '');
//       setAppointment_num(appointmentID || '');
//     } catch (error) {
//       console.log('Failed to load from AsyncStorage', error);
//     }
//   }

//   const printAsyncStorageKeys = async () => { // פונקציה שכל מטרתה הוא לבדוק איזה מפתחות יש בלוקאלסטורג ואיך קוראים להם
//     const keys = await AsyncStorage.getAllKeys();
//     console.log("AsyncStorage keys: ", keys);
//   }
//   useEffect(() => {
//       printAsyncStorageKeys()
//       handelLocalstorage()
//   const fetchBusinessData = async () => {
//     try {
//       console.log("22");
//       console.log(appointmentID);
//       const Business_Numberr = "4";
//       const data = await BussinesCanGiveTreatment(Business_Numberr);
//       console.log(Business_Numberr);
//       console.log(data.data);
//       console.log(JSON.stringify(data))

//       console.log("333333");
//       console.log(data);
//       const BusinessData = data.data.map((item) => {
//         return {
//           Type_treatment_Number: item['Type_treatment_Number'],
//           Price: item['Price'],
//           Treatment_duration: item['Treatment_duration']
//         };
//       });
//       console.log("66666")
//       console.log(BusinessData)
//       setBusinessData(BusinessData)
//       console.log(BusinessData)
//       console.log("5555555")
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchBusinessData();
//   console.log("77777")
//   },[]); 

//   const UserRow = ({ Type_treatment_Number, Price, Treatment_duration }) => (
//     <TouchableOpacity>
//       <View style={{ flexDirection: 'row', padding: 10 }}>
//         <Text style={{ flex: 1 }}>{Type_treatment_Number}</Text>
//         <Text style={{ flex: 1 }}>{Price}</Text>
//         <Text style={{ flex: 1 }}>{Treatment_duration}</Text>
//       </View>
//     </TouchableOpacity>
//   );


  
  


// return(
// <FlatList
// data={BusinessData}
// renderItem={({ item }) => (
//   <UserRow
//     Type_treatment_Number={item.Type_treatment_Number}
//     Price={item.Price}
//     Treatment_duration={item.Treatment_duration}
//   />
// )}
// // keyExtractor={(item) => item.id.toString()}
// ListHeaderComponent={() => (
//   <View style={{ flexDirection: 'row', padding: 10 }}>
//     <Text style={{ flex: 1, fontWeight: 'bold' }}>סוג טיפול</Text>
//     <Text style={{ flex: 1, fontWeight: 'bold' }}>מחיר</Text>
//     <Text style={{ flex: 1, fontWeight: 'bold' }}>משך הטיפול</Text>
//   </View>
// )}
// />
// )
// }


    

    // <View>
    //   {BusinessData.map((item, index) => (
    //     <UserRow
    //       key={index}
    //       Type_treatment_Number={item.Type_treatment_Number}
    //       Price={item.Price}
    //       Treatment_duration={item.Treatment_duration}
    //       // isChecked={item.isChecked}
    //       // onToggle={() => console.log(`Toggle item at index ${index}`)}
    //     />
    //   ))}
    // </View>

    //   const renderOptionItems = () => {
//     return BusinessData.map(option => (
//         <TouchableOpacity
//             key={option}
//             style={[styles.optionItem, selectedOption === option ? styles.selectedOption : null]}
//             onPress={() => setSelectedOption(option)}
//         >
//             <Text style={[styles.optionText, selectedOption === option ? styles.selectedOptionText : null]}>
//                 {option}
//             </Text>
//         </TouchableOpacity>
//     ));
// };
    // <View>
    //             <View>
    //                 <Text>בחר קטגוריה</Text>
    //                 <View >{renderOptionItems()}</View>
    //                 <TouchableOpacity  >
    //                     <Text >בחר</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    
            
            //  );
            // };
            
// useEffect(() => {
  //   // printAsyncStorageKeys()
  //   // handelLocalstorage()
  //   console.log("11");
  //   const fetchBusinessData = async () => {
  //     console.log("22");
  //     // console.log(BussinesCanGiveTreatment(""));
  //     // const data = await BussinesCanGiveTreatment(appointmentID);
  //     const data = await BussinesCanGiveTreatment(4);
  //     console.log("33");
  //     console.log(data + "4444");
  //     const formattedData = data.map((item) => {
  //       return {
  //         Type_treatment_Number: item['שם הטיפול'],
  //         Price: item['מחיר'],
  //         Treatment_duration: item['משך זמן']
  //       };
  //     });
  //     setBusinessData(formattedData);
  //   };
  //   fetchBusinessData();
  // },["4"]); 
  // // [appointmentNum]);


    // <TableContainer component={Paper}>
      // <Table>
      //   <TableHead>
      //     <TableRow>
      //       <TableCell></TableCell>
      //       <TableCell>סוג טיפול</TableCell>
      //       <TableCell>מחיר</TableCell>
      //       <TableCell>משך טיפול</TableCell>
      //     </TableRow>
      //   </TableHead>
      //   <TableBody>
      //     {businessData.map((row) => (
      //       <TableRow key={row.id} onClick={() => handleRowClick(row.id)}>
      //         <TableCell>
      //           <Checkbox />
      //         </TableCell>
      //         <TableCell>{row.treatmentType}</TableCell>
      //         <TableCell>{row.price}</TableCell>
      //         <TableCell>{row.duration}</TableCell>
      //       </TableRow>
      //     ))}
      //   </TableBody>
      // </Table>
    // </TableContainer>

    // <View style={styles.container}>
    //    <Text style={styles.heading}>Treatment Form</Text>
    //    <ScrollView>
    //      <View style={styles.tableRow}>
    //        <Text style={styles.tableHeader}>Treatment Name</Text>
    //        <Text style={styles.tableHeader}>Price</Text>
    //        <Text style={styles.tableHeader}>Duration</Text>
    //        <Text style={styles.tableHeader}>Select</Text>
    //      </View>
    //      {businessData.map((row) => (
    //       <View style={styles.tableRow} key={row.id} onClick={() => handleRowClick(row.id)}>
    //         <Text style={styles.tableCell}>{row.treatmentType}</Text>
    //         <Text style={styles.tableCell}>{row.price}</Text>
    //         <Text style={styles.tableCell}>{row.duration}</Text>
    //         {/* <CheckBox
    //           value={formData.some(form => form.treatment === treatment.id)}
    //           onValueChange={value =>
    //             value
    //               ? setFormData([
    //                   ...formData,
    //                   {
    //                     treatment: treatment.id,
    //                     category: '',
    //                     price: treatment.price,
    //                     duration: treatment.duration,
    //                   },
    //                 ])
    //               : setFormData(formData.filter(form => form.treatment !== treatment.id))
    //           }
    //         /> */}
    //       </View>
    //     ))}
    //   </ScrollView>
    //   <View style={styles.footer}>
    //     {/* <Button title="Submit" onPress={handleSubmit} /> */}
    //   </View>
    // </View>



 


    

  // useEffect(() => {
  //   // Fetch treatments and categories from the database
  //   Promise.all([
  //     fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Type_Treatment/AllCategory'),
  //     fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Category/AllCategory')
  //   ])
  //     .then(([treatmentsResponse, categoriesResponse]) => Promise.all([treatmentsResponse.json(), categoriesResponse.json()]))
  //     .then(([treatmentsData, categoriesData]) => {
  //       setTreatments(treatmentsData);
  //       setCategories(categoriesData);
  //     })
  //     .catch(error => console.error(error));
  // }, []);

//   const handleSelectTreatment = (treatment) => {
//     const isTreatmentSelected = selectedTreatments.some((selectedTreatment) => selectedTreatment.treatment_id === treatment.treatment_id);
//     if (isTreatmentSelected) {
//       setSelectedTreatments(selectedTreatments.filter((selectedTreatment) => selectedTreatment.treatment_id !== treatment.treatment_id));
//     } else {
//       setSelectedTreatments([...selectedTreatments, treatment]);
//     }
//   };

//   const handleSubmit = () => {
//     // Send selected treatments to the server
//     selectedTreatments.forEach((treatment) => {
//       fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Appointment_can_give_treatment/NewAppointment_can_give_treatment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8', 'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           category_id: treatment.category_id,
//           treatment_id: treatment.treatment_id,
//           price: treatment.price,
//           duration: treatment.duration,
//         }),
//       })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
//     });
//   };

//   return (
    
//       console.table(treatments),
    
//     <View style={styles.container}>
//       <Text style={styles.heading}>Treatment Form</Text>
//       <ScrollView>
//         <View style={styles.tableRow}>
//           <Text style={styles.tableHeader}>Treatment Name</Text>
//           <Text style={styles.tableHeader}>Price</Text>
//           <Text style={styles.tableHeader}>Duration</Text>
//           <Text style={styles.tableHeader}>Select</Text>
//         </View>
//         {treatments.map(treatment => (
//           <View style={styles.tableRow} key={treatment.id}>
//             <Text style={styles.tableCell}>{treatment.treatment_name}</Text>
//             <Text style={styles.tableCell}>{treatment.price}</Text>
//             <Text style={styles.tableCell}>{treatment.duration}</Text>
//             <CheckBox
//               value={formData.some(form => form.treatment === treatment.id)}
//               onValueChange={value =>
//                 value
//                   ? setFormData([
//                       ...formData,
//                       {
//                         treatment: treatment.id,
//                         category: '',
//                         price: treatment.price,
//                         duration: treatment.duration,
//                       },
//                     ])
//                   : setFormData(formData.filter(form => form.treatment !== treatment.id))
//               }
//             />
//           </View>
//         ))}
//       </ScrollView>
//       <View style={styles.footer}>
//         <Button title="Submit" onPress={handleSubmit} />
//       </View>
//     </View>
//   );
// }


































// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

// const Menu_treatment_registration = () => {
//   const [treatments, setTreatments] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState([{ treatment: '', category: '', price: '', duration: '' }]);

//   useEffect(() => {
//     // Fetch treatments from the database
//     fetch('https://localhost:53758/api/Type_Treatment/AllCategory')
//       .then(response => response.json())
//       .then(data => setTreatments(data))
//       .catch(error => console.error(error));
//     // Fetch categories from the database
//     fetch('https://localhost:53758/api/Category/AllCategory')
//       .then(response => response.json())
//       .then(data => setCategories(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleAddForm = () => {
//     setFormData([...formData, { treatment: '', category: '', price: '', duration: '' }]);
//   };

//   const handleFormChange = (index, field, value) => {
//     const newFormData = [...formData];
//     newFormData[index][field] = value;
//     setFormData(newFormData);
//   };

//   const handleSubmit = () => {
//     // Send form data to the server
//     formData.forEach(form => {
//       const { category, treatment, price, duration } = form;
//       fetch('https://localhost:53758/api/treatments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8', 'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           category_id: category,
//           treatment_id: treatment,
//           price: price,
//           duration: duration,
//         }),
//       })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
//     });
//   };

//   return (
//     <ScrollView >
//       <Text >Treatment Form</Text>
//       {formData.map((form, index) => (
//         <View key={index}>
//           <Text >סוג טיפול {index + 1}</Text>
//           <View >
//             <Text>Treatment:</Text>
//             <TextInput

//               value={form.treatment}
//               onChangeText={value => handleFormChange(index, 'treatment', value)}
//               placeholder="הזן סוג טיפול "
//             />
//             <Button title="Choose" onPress={() => console.log('Choose treatment')} />
//           </View>
//           <View >
//             <Text>Category:</Text>
//             <TextInput

//               value={form.category}
//               onChangeText={value => handleFormChange(index, 'category', value)}
//               placeholder="Select a category"
//             />
//             <Button title="Choose" onPress={() => console.log('Choose category')} />
//           </View>
//         </View>
//       )
//       )
//       }</ScrollView>)
// }

// export default Menu_treatment_registration;


