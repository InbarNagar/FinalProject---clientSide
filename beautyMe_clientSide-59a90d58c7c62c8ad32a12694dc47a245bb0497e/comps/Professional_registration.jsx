import React, { useState,useEffect } from 'react';
import {Modal,  StyleSheet, Text, TextInput, View, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './GenralComps/LogIn';
import Create_Business_Pro from './Create_Business_Pro';
import { TouchableOpacity } from 'react-native';
import { Professional_Registration } from './obj/FunctionAPICode';
import {Input} from './obj/Input'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment";
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Button from './obj/Button';
//import PushNofitictaion from './PushNofitictaion';
//import { SaveTokenforIDPro } from './obj/FunctionAPICode';
// http://proj.ruppin.ac.il/cgroup93/prod/api/





const Professional_registration = (props) => {

  const [ID_number, setid] = useState('');
  const [First_name, setFirstName] = useState('');
  const [Last_name, setLastName] = useState('');
  const [birth_date, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [AddressStreet, setStreet] = useState('');
  const [AddressHouseNumber, setHouseNumber] = useState('');
  const [AddressCity, setCity] = useState('');
  const [password, setPassword] = useState('');

  const [isPickerVisible, setPickerVisible] = useState(false);

  const openPicker = () => {
    setPickerVisible(true);
  };

  const closePicker = () => {
    setPickerVisible(false);
    console.log(gender)
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFemaleChecked, setFemaleChecked] = useState(false);
  const [isMaleChecked, setMaleChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");


//   useEffect( () => {
// if(ID_number){
//      PushNofitictaion().then((token) => {
//          let data = { "pushtoken": token };
//          console.log('***',token)
      
//              let temp = Object.assign({ Token: token });
             
//              SaveTokenforIDPro(ID_number,token).then(()=>{
//              console.log("token saved")
//               })    
     
//      }).catch((error) => {
         
//          console.log("error in function post_pushToken " + error);
       
//      });
//    }
//  }, [ID_number])


  const handleRegistration = () => {
    const data = {
      ID_number: ID_number,
      First_name: First_name,
      Last_name: Last_name,
      birth_date: birth_date,
      gender: gender,
      phone: phone,
      Email: Email,
      AddressStreet: AddressStreet,
      AddressHouseNumber: AddressHouseNumber,
      AddressCity: AddressCity,
      password: password,
      ProfilPic:"profil"+ID_number,
     

    }
    Professional_Registration(data).then((result) => {
      console.log('yes', result)
      props.navigation.navigate('Create_Business_Pro', { ID: ID_number, })
    }, (error) => {
      console.log('error', error)
    });


    // fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Professional/NewProfessional', {
    //   method: 'POST',
    //   headers: new Headers({
    //     "Content-type": "application/json; charset=UTF-8",
    //     'Accept': "application/json; charset=UTF-8",
    //   }),
    //   body: JSON.stringify({
    //     ID_number,
    //     First_name,
    //     Last_name,
    //     birth_date,
    //     gender,
    //     phone,
    //     Email,
    //     AddressStreet,
    //     AddressHouseNumber,
    //     AddressCity,
    //     password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))

    //   .catch((error) => console.error(error));

    // props.navigation.navigate('Create_Business_Pro')

  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
};

const hideDatePicker = () => {
    setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
    //  setSelectedDate(moment(date).format('DD/MM/YYYY'));
    setDateOfBirth(moment(date).format('YYYY-MM-DD'))
    hideDatePicker();
    
};


  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
    <ScrollView>

        <View style={styles.container}>
          <Text style={styles.title}>איזה כיף שהחלטת להצטרף לקהילת בעלי העסקים שלנו!</Text>
          <Text style={styles.titp}>רק עוד כמה פרטים קטנים בשביל שנוכל להמשיך</Text>

    
          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="תעודת זהות"
              value={ID_number}
              placeholderTextColor="#92a2bd"
              onChangeText={(text) => setid(text)}
            />
            {/* <Text style={styles.text}>תעודת זהות </Text> */}
          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="שם פרטי"
              value={First_name}
              placeholderTextColor="#92a2bd"
              onChangeText={(text) => setFirstName(text)}
            />
            {/* <Text style={styles.text}>שם פרטי</Text> */}
          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="שם משפחה"
              value={Last_name}
              placeholderTextColor="#92a2bd"
              onChangeText={(text) => setLastName(text)}
            />
            {/* <Text>שם משפחה</Text> */}
          </View>

          <View style={styles.inp}>   
          <TouchableOpacity onPress={openPicker}>
            <Text style={styles.textInputS}>בחר מין</Text>
          </TouchableOpacity>
          </View>
<Modal
  animationType="slide"
  transparent={true}
  visible={isPickerVisible}
  onRequestClose={closePicker}
>
  <View style={styles.modalContainer}>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="בחר מין" value="" />
        <Picker.Item label="נקבה" value="F" />
        <Picker.Item label="זכר" value="M" />
      </Picker>
      <View style={{height:80}} />
      <View>   
          <TouchableOpacity style={styles.but} onPress={closePicker}>
            <Text style={styles.textInputS}> סיום</Text>
          </TouchableOpacity>
          </View>
    </View>
  </View>
</Modal>

          <View>

                <TouchableOpacity style={styles.dateContainer} onPress={showDatePicker}>
                      <View
                        style={styles.inpd}>
                        <Text style={styles.textInputS}>{selectedDate ? selectedDate : "תאריך לידה"}</Text>
                      </View>
                    </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                        setSelectedDate(date.toLocaleDateString("he-IL"));
                        handleConfirm(date);
                      }}
                    onCancel={hideDatePicker}
                    confirmTextIOS="אישור"
                    cancelTextIOS="ביטול"
                    locale="he"
                  />
                  </View>

          {/* <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="תאריך לידה"
              value={birth_date}
              placeholderTextColor="#92a2bd"
              onChangeText={(text) => setDateOfBirth(text)}
            />
          </View> */}

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="פלאפון"
              placeholderTextColor="#92a2bd"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            {/* <Text>פלאפון</Text> */}
          </View>
          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="אימייל"
              placeholderTextColor="#92a2bd"
              value={Email}
              onChangeText={(text) => setEmail(text)}
            />
            {/* <Text>איימיל</Text> */}
          </View>


          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="רחוב"
              placeholderTextColor="#92a2bd"
              value={AddressStreet}
              onChangeText={(text) => setStreet(text)}
            />
            {/* <Text>רחוב</Text> */}
          </View>


          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="מספר בית"
              placeholderTextColor="#92a2bd"
              value={AddressHouseNumber}
              onChangeText={(text) => setHouseNumber(text)}
            />
            {/* <Text>מספר בית</Text> */}
          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="עיר"
              placeholderTextColor="#92a2bd"
              value={AddressCity}
              onChangeText={(text) => setCity(text)}
            />
            {/* <Text>עיר</Text> */}
          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="סיסמא"
              placeholderTextColor="#92a2bd"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            {/* <Text>סיסמא</Text> */}
          </View>

       
          <View>     
            <TouchableOpacity style={styles.but} onPress={()=>props.navigation.navigate('CameraUse',{imageName:"profil"+ID_number})}>
              <View>
                <Text style={styles.thachtext}>הוספת תמונת פרופיל</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.but} onPress={handleRegistration}>
              <View>
                <Text style={styles.thachtext}>המשך</Text>
              </View>

            </TouchableOpacity>
          </View>
        </View>

    </ScrollView>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  inp: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    width: '80%',
    borderRadius: 25,
    height: 45,
    marginBottom: 10,
    borderColor:"rgb(92, 71, 205)",
    backgroundColor: 'white',
    border:1

  },
  textInputS: {
    // height: 40,
    // width: "80%",
    // margin: 10,
    // borderWidth: 1,
    // padding: 10,
    color: '#808080',
    // height: 50,
    fontSize: 15,
    textAlign: 'right',
    fontWeight: 'bold',
    opacity: 0.5,
    color: '#92a2bd'
    

  },
  inpd: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    width: 300,
    borderRadius: 25,
    height: 45,
    marginBottom: 10,
    borderColor:"rgb(92, 71, 205)",
    backgroundColor: 'white',
    border:1

  },
  title: {
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: "rgb(92, 71, 205)",
    fontWeight: 'bold',
    textShadowColor: 'rgb(92, 71, 205)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,

  },

  titp: {
    textAlign: 'center',
    color: '#fffaf0',
    fontSize: 15,
    color: "rgb(92, 71, 205)",
    padding:10
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6fa',
  },

  text: {
    textAlign: 'right',
    paddingBottom: 10,
  },
  but: {
    textAlign: 'center',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    backgroundColor: "rgb(92, 71, 205)",
    padding: 8,
    margin: 10,
    marginTop: 10,
    
  },
  thachtext: {
    textAlign: 'center',
    color: '#fffaf0',
    fontSize:20,
    fontWeight:'bold',
    //borderRadius: 10,
     height: 50,
    // marginBottom: 20,
    // backgroundColor: '#fffaf0',
    // padding: 15,
    // margin: 10,
    // marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  pickerContainer: {
    backgroundColor: '#e6e6fa',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },

});
export default Professional_registration;


// import React, { useState } from 'react';
// import { Button, StyleSheet, Text, TextInput, View, ScrollView, Keyboard } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LogIn from './GenralComps/LogIn';
// import Create_Business_Pro from './Create_Business_Pro';
// import { TouchableOpacity } from 'react-native';
// import { Professional_Registration } from './obj/FunctionAPICode';

// // http://proj.ruppin.ac.il/cgroup93/prod/api/

// const Professional_registration = (props) => {

//   const [ID_number, setid] = useState('');
//   const [First_name, setFirstName] = useState('');
//   const [Last_name, setLastName] = useState('');
//   const [birth_date, setDateOfBirth] = useState('');
//   const [gender, setGender] = useState('');
//   const [phone, setPhone] = useState('');
//   const [Email, setEmail] = useState('');
//   const [AddressStreet, setStreet] = useState('');
//   const [AddressHouseNumber, setHouseNumber] = useState('');
//   const [AddressCity, setCity] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegistration = () => {
//     const data = {
//       ID_number: ID_number,
//       First_name: First_name,
//       Last_name: Last_name,
//       birth_date: birth_date,
//       gender: gender,
//       phone: phone,
//       Email: Email,
//       AddressStreet: AddressStreet,
//       AddressHouseNumber: AddressHouseNumber,
//       AddressCity: AddressCity,
//       password: password,
//     }
//     Professional_Registration(data).then((result) => {
//       console.log('yes', result)
//       props.navigation.navigate('Create_Business_Pro',{ID:ID_number,})
//     }, (error) => {
//       console.log('error', error)
//     });
    

//     // fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Professional/NewProfessional', {
//     //   method: 'POST',
//     //   headers: new Headers({
//     //     "Content-type": "application/json; charset=UTF-8",
//     //     'Accept': "application/json; charset=UTF-8",
//     //   }),
//     //   body: JSON.stringify({
//     //     ID_number,
//     //     First_name,
//     //     Last_name,
//     //     birth_date,
//     //     gender,
//     //     phone,
//     //     Email,
//     //     AddressStreet,
//     //     AddressHouseNumber,
//     //     AddressCity,
//     //     password,
//     //   }),
//     // })
//     //   .then((response) => response.json())
//     //   .then((data) => console.log(data))

//     //   .catch((error) => console.error(error));

//     // props.navigation.navigate('Create_Business_Pro')

//   };


//   return (

//     <TouchableOpacity onPress={Keyboard.dismiss}>
//       <ScrollView>
//     <View style={{ padding: 50, backgroundColor: '#f8f8ff' }}>
//       <Text style={styles.title}>איזה כיף שהחלטת להצטרף לקהילת בעלי העסקים שלנו!</Text>
//       <Text style={styles.titp}> אנא מלא/י את הפרטים הבאים:</Text>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="תעודת זהות"
//           value={ID_number}
//           onChangeText={(text) => setid(text)}
//         />
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="שם פרטי"
//           value={First_name}
//           onChangeText={(text) => setFirstName(text)}
//         />
//         <Text>שם פרטי</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="שם משפחה"
//           value={Last_name}
//           onChangeText={(text) => setLastName(text)}
//         />
//         <Text>שם משפחה</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="מין"
//           value={gender}
//           onChangeText={(text) => setGender(text)}
//         />
//         <Text>מין</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="תאריך לידה"
//           value={birth_date}
//           onChangeText={(text) => setDateOfBirth(text)}
//         />
//         <Text>תאריך</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="פלאפון"
//           value={phone}
//           onChangeText={(text) => setPhone(text)}
//         />
//         <Text>פלאפון</Text>
//       </View>
//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="אימייל"
//           value={Email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <Text>איימיל</Text>
//       </View>


//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="רחוב"
//           value={AddressStreet}
//           onChangeText={(text) => setStreet(text)}
//         />
//         <Text>רחוב</Text>
//       </View>


//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="מספר בית"
//           value={AddressHouseNumber}
//           onChangeText={(text) => setHouseNumber(text)}
//         />
//         <Text>מספר בית</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="עיר"
//           value={AddressCity}
//           onChangeText={(text) => setCity(text)}
//         />
//         <Text>עיר</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="סיסמא"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//           secureTextEntry={true}
//         />
//         <Text>סיסמא</Text>
//       </View>


//       <View>
//         <TouchableOpacity onPress={handleRegistration}>
//           <View>
//             <Text style={styles.titp}>המשך</Text>
//           </View>

//         </TouchableOpacity>
//       </View>
//     </View>
//     </ScrollView>
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   inp: {
//     flexDirection: 'row',
//     padding: 10,
//     justifyContent: 'space-between',

//   },
//   textInputS: {
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     width: "80%",
//     marginRight: 8,
//   },
//   title: {
//     padding: 60,
//     justifyContent: 'center',
//     textAlign: 'center'
//   },
//   titp: {
//     textAlign: 'center',
//     borderColor: '#cccccc'
//   }
// });

// export default Professional_registration;

