
// import React, { useState ,useEffect, useContext} from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ForgotPassword from './ForgotPassword';
// import Professional_registration from '../Professional_registration';
// import { LogInF } from '../obj/FunctionAPICode';
// import Input from '../obj/Input';
// import Client_registration from '../Client_registration';
// import Button from '../obj/Button';
// import Maps_test from '../Maps_test';
// import Search3 from '../Search3';
// import Search from '../Map';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import NewAppointment from '../NewAppointment';
// // import { AsyncStorage } from 'react-native';
// import {LogInPro} from '../obj/FunctionAPICode';
// import { LogInProo } from '../obj/FunctionAPICode';
// import { UserContext } from '../../comps/UserDietails'
// import Header from '../obj/Header';
// import PushNofitictaion from '../PushNofitictaion';
// import { SaveTokenforID,SaveTokenforIDPro } from '../obj/FunctionAPICode';


// export default function LogIn(props) {
//   const [ID_number, setID_number] = useState('');
//   const [password, setPassword] = useState('');
//   const { navigation, route } = props
//   const [idNumber_client, setidNumber_client] = useState('');
//   const [idNumber_professional, setidNumber_professional] = useState('');

//    const { userDetails, setUserDetails } = useContext(UserContext);
//    const [islogin,setlogin]= useState();

//    useEffect( () => {
//     // setLoading(true)
//    if(islogin) {PushNofitictaion().then((token) => {
//         let data = { "pushtoken": token };//console.log("data",data);
//         console.log('***',token)
     
//             let temp = Object.assign({}, userDetails, { Token: token });
//             setUserDetails(temp)
//             if (userType == "Cli"){

//             SaveTokenforID(userDetails.ID_number,token).then(()=>{

//             })
//             }
//             else
//             {
//             SaveTokenforIDPro(userDetails.ID_number,token).then(()=>{

//             })
//             }
           
    
//     }).catch((error) => {
        
//         console.log("error in function post_pushToken " + error);
      
//     });
//   }
// }, [islogin])


//   let userType = route.params.userType
//   console.log({ userType })


  
//   const handleidNumber = (text) => {
//     if (userType == "Cli"){
//       setidNumber_client(text);
//     }
//     else{
//       setidNumber_professional(text);
//     }
//   };
//   // const handleidNumber_client = (text) => {
//   //   setidNumber_client(text);
//   // };

//   // const handleidNumber_professional = (text) => {
//   //   setidNumber_professional(text);
//   // };

//   useEffect(()=>{
// if(userDetails){
//   console.log('########',userDetails)
//   if (userType == 'Cli') {
//     navigation.navigate('Search3')
//   }
//   else {
//     //navigation.navigate('NewAppointment')

//     navigation.navigate('Calendar_professional')
//   }
// }
//   },[userDetails])
//   const handleLogin =  async () => {
//     if (userType == 'Cli') {
//      await AsyncStorage.setItem('idNumber_client', idNumber_client);
//       console.log('cli')

//       const dataa = {
//         ID_number: ID_number,
//         password: password,
//       } 
//       LogInF(dataa).then((result) => {
//         console.log('yes', result.data);
//          setUserDetails(result.data)
//          setlogin(true);
  
//       }, (error) => {
//         console.log('error', error)
//       })
//     }
//     else {
//       console.log(ID_number)
//       console.log("qqq")
//      await AsyncStorage.setItem('idNumber_professional', ID_number); // הכנסה ללוקאל סטורג
//       console.log('professional')
//      const storedIdNumber = await AsyncStorage.getItem('idNumber_professional'); //לקיחת הנתונין מהלוקאל סטורג והדפסה שלו כדי לראותת שזה הצליח
//     console.log('Stored idNumber_professional:', storedIdNumber);
//       const data = {
//         ID_number: ID_number,
//         password: password,
//       } 
//       console.log("rrr")
//       console.log(ID_number)
//       console.log(password)
//       console.log(data)
//       console.log("www")


// //       const res = LogInProo(data).then((result) => {
// //       // LogInPro(ID_number, password).then((result) => {
// //         console.log('yes', result)        
// //         //  setUserDetails( {
// //         //       "ID_number": "123455555 ",
// //         //       "First_name": "nira",
// //         //       "Last_name": "cohen",
// //         //       "birth_date": "1965-10-12T00:00:00",
// //         //       "gender": "F",
// //         //       "phone": "521212121",
// //         //       "Email": "nira@gmail.com",
// //         //       "AddressStreet": "ehud",
// //         //       "AddressHouseNumber": "5         ",
// //         //       "AddressCity": "haifa",
// //         //       "password": "12333",
// //         //       "Business_Number": 4,
// //         //       "userType": null
// //         //   })
// //           setlogin(true);
       
// //       //   console.log('i am here')
// //       // }, (error) => {
// //       //   console.log('error', error)
// //       // })
// //     //   console.log("yyy" + res);
// //     //   console.log("mmm" + res.Business_Number);

// //     //   await AsyncStorage.setItem('Business_Number', res.Business_Number); // הכנסה ללוקאל סטורג
// //     //   const storedIdbus = await AsyncStorage.getItem('Business_Number'); //לקיחת הנתונין מהלוקאל סטורג והדפסה שלו כדי לראותת שזה הצליח
// //     // console.log('Stored idbus:', storedIdbus);
//     }
    
  
  

//   const Registration = () => {
//     console.log(userType)
//     if (userType === 'Cli') {
//       navigation.navigate(Client_registration)
//     }
//     else {
//       navigation.navigate(Professional_registration)
//     }

//   };

//   return (
//     <View style={styles.container}>

//       <Header text="Log In" fontSize={100} height={200}/>

//       <Text style={styles.title}>תעודת זהות</Text>
//       <View style={styles.inp}>
//         <TextInput
//           style={styles.input}
//           placeholder="תעודת זהות"
//           value={ID_number}
//           onChangeText={setID_number} //????????????????????????????????????????????
//           autoCapitalize="none"
//           keyboardType="email-address"
//           autoCompleteType="email"
//           onblur={handleidNumber}

//         />
//       </View>
//       {/* <Input
//         styleContainer={styles.inp}
//         style={styles.input}
//         placeholder="תעודת זהות"
//         value={ID_number}
//         onChangeText={setID_number}
//         autoCapitalize="none"
//         keyboardType="email-address"
//         autoCompleteType="email"
//         onBlur={handleidNumber}
//       /> */}
//       <Text>{'\n'}</Text>
//       <Text style={styles.title}>סיסמא</Text>
//       <View style={styles.inp}>
//         {/* <Text style={styles.label}>סיסמה </Text> */}
//         <TextInput
//           style={styles.input}
//           placeholder="סיסמא"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={true}
//           autoCompleteType="password"
//         />

//       </View>

//       {/* <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate(ForgotPassword) }}>
//         <View >
//           <Text style={styles.buttonText}>שכחתי סיסמא</Text>
//         </View>
//       </TouchableOpacity> */}

//       <Button color='#9acd32' width={300} fontSize={30} borderRadius={30} text="התחברות" onPress={handleLogin} />

//    
      
//       <Button color='transparent' text="עדיין לא נרשמתם? לחצו כאן" onPress={Registration} /> 


//       {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>התחברות</Text>
//       </TouchableOpacity> */}




//       {/* <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate(GenralReg) }}>
//         <Text style={styles.buttonText}>עדיין לא נרשמתם? לחצו כאן</Text>
//       </TouchableOpacity> */}


//       {/* <TouchableOpacity style={styles.button} onPress={Registration}>
//         <Text style={styles.buttonText}>עדיין לא נרשמתם? לחצו כאן</Text>
//       </TouchableOpacity> */}

//     </View>



//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     padding: 5,
//     alignItems: 'center',
//     // justifyContent: 'center',
//     backgroundColor: '#f8f8ff'

//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     // marginBottom: 1,
//     alignItems: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#9acd32',
//     width: "100%",
//     marginRight: 8,
//     borderRadius: 20,
//     height: 50,

//   },
//   inp: {
//     flexDirection: 'row',
//     padding: 2,
//     justifyContent: 'space-between',
//     width: "100%",
//   },
//   label: {
//     position: 'absolute',
//     top: 10,
//     right: 90,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 5,
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   button: {
//     borderRadius: 4,
//     marginTop: 10,
//     alignItems: 'center',
//     width: "30%",
//     backgroundColor: '#9acd32',
//     color: '#fff',
//   },
//   buttonText: {
//     paddingBottom: 20,
//     color: '#f0f8ff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     alignItems: 'center'
//   },
// });



// // // const handleLogin =  async () => {
// //   //   if (userType == 'Cli') {
// //   //     await AsyncStorage.setItem('idNumber_client', idNumber_client);
// //   //     console.log('cli')
// //   //     
// //   //     LogInF(ID_number, password).then((result) => {
// //   //       console.log('yes', result);
// //   //       // navigation.navigate('Search')

// //   //     }, (error) => {
// //   //       console.log('error', error)
// //   //     })
// //   //   }
// //   //   else {
// //   //     console.log(ID_number)
// //   //     await AsyncStorage.setItem('idNumber_professional', ID_number);
// //   //     console.log('professional')
// //   //     const storedIdNumber = await AsyncStorage.getItem('idNumber_professional');
// //   //   console.log('Stored idNumber_professional:', storedIdNumber);
// //   //     const data = {
// //   //       ID_number: ID_number,
// //   //       password: password,
// //   //     } 
// //   //     console.log(ID_number)
// //   //     console.log(password)
// //   //     console.log(data)
// //   //     LogInProo(data).then((result) => {
// //   //     // LogInPro(ID_number, password).then((result) => {
// //   //       console.log('yes', result)
// //   //      navigation.navigate('NewAppointment')
// //   //       console.log('i am here')
// //   //     }, (error) => {
// //   //       console.log('error', error)
// //   //     })
// //   //   }
// //   // }
// //       //option 1 - less
// //       // const userData = { ID_number: ID_number, password: password }
// //       // let url = 'http://proj.ruppin.ac.il/cgroup93/prod/api/Professional/GetProfessional'
// //       // const response = fetch(url, {
// //       //   method: 'POST',
// //       //   headers: ({
// //       //     "Content-type": "application/json",
// //       //     'Accept': "application/json"
// //       //   }),
// //       //   body: JSON.stringify(userData),
// //       // })
// //       //   .then((response) => {
// //       //     if (response.status === 200)
// //       //       return response.json()
// //       //     else return null
// //       //   })
// //       //   .then((json) => {
// //       //     if (json === null)
// //       //       alert('login faild')
// //       //     else
// //       //       alert('login ok')
// //       //     navigation.navigate('Search', { user: json })
// //       //   }).catch((error) => {
// //       //     Alert.alert('Login Failed');
// //       //     console.log(error);
// //       //   }
// //       //   );

// //       //option 2 - fav
// //       // console.log('professional')
// //       // LogInPro(ID_number, password).then((result) => {
// //       //   console.log('yes', result)
// //       //   navigation.navigate('Search3')
// //       //   console.log('i am here')
// //       // }, (error) => {
// //       //   console.log('error', error)
// //       // })
    

// //     // const response = await  fetch('http://localhost:53758/api/Client/OneClient', {
// //     //   method: 'POST',
// //     //   headers:({
// //     //     "Content-type": "application/json",
// //     //     'Accept': "application/json"
// //     //   }),
// //     //   body: JSON.stringify({ "ID_number":ID_number,"password": password }),
// //     // })

// //     // const data = await response.json();

// //     // if (data.success) {
// //     //   Alert.alert('Login successful');
// //     //   // navigate to the next screen
// //     //   props.navigation.navigate('Search')
// //     // } 

// //     // else {
// //     //   Alert.alert('Login failed', data.message);
// //     // }

// }