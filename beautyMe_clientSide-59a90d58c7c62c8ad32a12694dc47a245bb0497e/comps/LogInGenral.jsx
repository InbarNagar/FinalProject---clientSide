
import React, { useState ,useEffect, useContext} from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaVie, TextInput,Text,Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Button from '../obj/Button';
 import Professional_registration from './Professional_registration';
// import { AsyncStorage } from 'react-native';
import ClientProfile from './ClientScreen/ClientProfile';
import { UserContext } from './UserDietails';
import Header from './obj/Header';
import PushNofitictaion from './PushNofitictaion';
import { SaveTokenforID,SaveTokenforIDPro,LogInUser } from './obj/FunctionAPICode';
import Button from './obj/Button';
import Alert from './Alert';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import Client_registration from './Client_registration';

export default function LogInGenral(props) {
  const [ID_number, setID_number] = useState('');
  const [password, setPassword] = useState('');
  const { navigation, route } = props
   const { userDetails, setUserDetails } = useContext(UserContext);
   const [islogin,setlogin]= useState();
   const [alert, setAlert] = useState();
   const [hidePassword, setHidePassword] = useState(true)

   const onPressEye = () => {
    setHidePassword(!hidePassword);
  };
 
  const eyeIcon = hidePassword ? 'visibility' : 'visibility-off';
   useEffect( () => {

   if(islogin&&userDetails) {PushNofitictaion().then((token) => {
        let data = { "pushtoken": token };
        console.log('***',token)
     
            let temp = Object.assign({}, userDetails, { Token: token });
            setUserDetails(temp)
            if (userDetails.userType == "Cli"){

            SaveTokenforID(userDetails.ID_number,token).then(()=>{

            })
            }
            else
            {
            SaveTokenforIDPro(userDetails.ID_number,token).then(()=>{

            })
            }
           
    
    }).catch((error) => {
        
        console.log("error in function post_pushToken " + error);
      
    });
  }
}, [islogin])


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
  // const handleidNumber_client = (text) => {
  //   setidNumber_client(text);
  // };

  // const handleidNumber_professional = (text) => {
  //   setidNumber_professional(text);
  // };

  useEffect(()=>{
if(userDetails){
  console.log('########',userDetails.userType)
  if (userDetails.userType == 'Cli') {
    // navigation.navigate('Search3')
    navigation.navigate('NewSearch3')
  }
  else {
    navigation.navigate('Calendar_professional')
  }
}
  },[userDetails])

  const handleLogin =  async () => {
      const data = {
        id_number: ID_number,
        password: password,
      } 
      LogInUser(data).then((result) => {
        console.log('yes', result.data);
         setUserDetails(result.data)
         setlogin(true);
       
      }, (error) => {
        setAlert(<Alert
        text='שם משתמש וסיסמא אינם תקינים'
        type='worng'
        time={1000}
        bottom={100}
    />)
        console.log('error', error)
      })
    
  }
  const Registration = () => {
   
    props.navigation.navigate(Client_registration)
   }
  const Registration2 = () => {
   
     props.navigation.navigate(Professional_registration)
    }

 
  return (
    <>
        <KeyboardAvoidingView  style={{ flex: 1 }}       behavior={Platform.OS === "ios" ? "padding" : "height"}
>
        <ScrollView>
    {alert && alert}
    <View style={styles.container}>

   {/* <Header text="BeautyMe" fontSize={60} height={200} color="#E6E6FA"/> */}
   <Image style={styles.image} source={require('../assets/be.jpeg')}/>
    <Text style={styles.tit}>see the beauty around you</Text>

    <View style={styles.content}>
    

      <Text style={styles.title}>תעודת זהות</Text>
      <View style={styles.inp}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      <View style={{flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 5, borderColor: '#999', alignItems: 'center'}}>
        <TextInput
          style={{flex: 1, padding: 10, fontSize: 18, textAlign: 'right'}}
          placeholder="תעודת זהות"
          value={ID_number}
          onChangeText={setID_number} 
          autoCapitalize="none"
          keyboardType="email-address"
          autoCompleteType="email"
          
        />

</View>
    </View>
      </View>
     
      <Text>{'\n'}</Text>
      <Text style={styles.title}>סיסמא</Text>
      <View style={styles.inp}>
       
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 5, borderColor: '#999', alignItems: 'center'}}>
        <TextInput 
          secureTextEntry={hidePassword} 
          value={password}
          onChangeText={setPassword}
          style={{flex: 1, padding: 10, fontSize: 18, textAlign: 'right'}} 
          placeholder="סיסמא"
        />
        <TouchableOpacity onPress={onPressEye}>
          <Icon name={eyeIcon} size={24} color={'#666'} />  
        </TouchableOpacity>
      </View>
    </View>

      </View>


      <Button color="rgb(92, 71, 205)" width={300} fontSize={20} borderRadius={20} text="התחברות" onPress={handleLogin} colortext="white" />

      <Button color='transparent' text="שכחתי סיסמה" onPress={() => { navigation.navigate("ForgotPassword") }} />
      <Button color='transparent' text="עדיין לא נרשמתם? לחצו כאן" onPress={Registration} />
      <Button color='transparent' text="הרשמת עסקים" onPress={Registration2} />
</View>
    </View>
</ScrollView>
    </KeyboardAvoidingView>


    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 1,
    alignItems:'flex-start',
    color:"rgb(92, 71, 205)",
    textAlign:'right'
   

  },
  input: {
    borderWidth: 1,
    borderColor: '#9acd32',
    width: "100%",
    marginRight: 8,
    borderRadius: 20,
    height: 50,

  },
  inp: {
    flexDirection: 'row',
    padding: 2,
    justifyContent: 'space-between',
    width: "100%",
    textAlign:'right'
  },
  label: {
    position: 'absolute',
    top: 10,
    right: 90,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
    width: "30%",
    backgroundColor: "rgb(92, 71, 205)",
    color: '#fff',
  },
  buttonText: {
    paddingBottom: 20,
    color: '#f0f8ff',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1, // מסגרת עדינה
    // borderColor: 'grey', // צבע המסגרת
    // borderRadius: 10, // קימור המסגרת
    padding: 30, // רווח בתוך המסגרת
    marginTop: 50, // רווח מעל לתוכן
    
  },
  image:{
    width:200,
    height:200,
    padding:20,
    },
    tit:{
      "fontSize": 25,
      "fontWeight": "500",
      "letterSpacing": 0.15,
      "lineHeight": 24,
      textShadowColor: 'rgb(92, 71, 205)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
      opacity:0.7
    }



});



// const handleLogin =  async () => {
  //   if (userType == 'Cli') {
  //     await AsyncStorage.setItem('idNumber_client', idNumber_client);
  //     console.log('cli')
  //     
  //     LogInF(ID_number, password).then((result) => {
  //       console.log('yes', result);
  //       // navigation.navigate('Search')

  //     }, (error) => {
  //       console.log('error', error)
  //     })
  //   }
  //   else {
  //     console.log(ID_number)
  //     await AsyncStorage.setItem('idNumber_professional', ID_number);
  //     console.log('professional')
  //     const storedIdNumber = await AsyncStorage.getItem('idNumber_professional');
  //   console.log('Stored idNumber_professional:', storedIdNumber);
  //     const data = {
  //       ID_number: ID_number,
  //       password: password,
  //     } 
  //     console.log(ID_number)
  //     console.log(password)
  //     console.log(data)
  //     LogInProo(data).then((result) => {
  //     // LogInPro(ID_number, password).then((result) => {
  //       console.log('yes', result)
  //      navigation.navigate('NewAppointment')
  //       console.log('i am here')
  //     }, (error) => {
  //       console.log('error', error)
  //     })
  //   }
  // }
      //option 1 - less
      // const userData = { ID_number: ID_number, password: password }
      // let url = 'http://proj.ruppin.ac.il/cgroup93/prod/api/Professional/GetProfessional'
      // const response = fetch(url, {
      //   method: 'POST',
      //   headers: ({
      //     "Content-type": "application/json",
      //     'Accept': "application/json"
      //   }),
      //   body: JSON.stringify(userData),
      // })
      //   .then((response) => {
      //     if (response.status === 200)
      //       return response.json()
      //     else return null
      //   })
      //   .then((json) => {
      //     if (json === null)
      //       alert('login faild')
      //     else
      //       alert('login ok')
      //     navigation.navigate('Search', { user: json })
      //   }).catch((error) => {
      //     Alert.alert('Login Failed');
      //     console.log(error);
      //   }
      //   );

      //option 2 - fav
      // console.log('professional')
      // LogInPro(ID_number, password).then((result) => {
      //   console.log('yes', result)
      //   navigation.navigate('Search3')
      //   console.log('i am here')
      // }, (error) => {
      //   console.log('error', error)
      // })
    

    // const response = await  fetch('http://localhost:53758/api/Client/OneClient', {
    //   method: 'POST',
    //   headers:({
    //     "Content-type": "application/json",
    //     'Accept': "application/json"
    //   }),
    //   body: JSON.stringify({ "ID_number":ID_number,"password": password }),
    // })

    // const data = await response.json();

    // if (data.success) {
    //   Alert.alert('Login successful');
    //   // navigate to the next screen
    //   props.navigation.navigate('Search')
    // } 

    // else {
    //   Alert.alert('Login failed', data.message);
    // }

    