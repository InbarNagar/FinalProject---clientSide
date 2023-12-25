import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { NewTreatmentForBussines, Treatment_type_GET, Category_GET } from './obj/FunctionAPICode';
import Calendar_professional from './Calendar_professional';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LogIn from './GenralComps/LogIn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './obj/Header';
import Update_Menu_treatment from './Update_Menu_treatment'


const Update_MenuTreatment = (props) => {

  const [treatments, setTreatments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [price, setPrice] = useState(null);
  //const [durationn, setDurationn] = useState(null);
  // const [duration, setduration] = useState(false);
  // const [durationTime, setdurationTime] = useState(new Date());
  const [durationTimePicker, setdurationTimePicker] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [idNumberbusiness, setIdNumber] = useState(''); // ללוקאלסטורג

  // const [duration, setDuration] = useState(null);

  const [openC, setOpenC] = useState(false);
  const [openT, setOpenT] = useState(false);
  const [openD, setOpenD] = useState(false);

  const [duration, setDuration] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // התחל עם זמן כלשהו, אך עם דקות שהן אפס
  const initialTime = new Date();
  initialTime.setMinutes(0);
  const [date, setDate] = useState(initialTime);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    // שינוי זה ימיר את התאריך לפורמט של שעות:דקות
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    setDuration(`${hours}:${minutes}`);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };



  // const { navigation, route } = props
  //  let businessID = route.params.businessId
  //  navigation = useNavigation();

  const bus = 1;




  const getHoursInterface = () => {
    let data = []
    for (let i = 0; i <= 23; i++) {
      const temp = 15;
      for (let x = 0; x <= 3; x++) {
        let tempDate = new Date()
        tempDate.setSeconds(0)
        tempDate.setHours(i)
        tempDate.setMinutes(temp * x)
        data.push({
          label: (i < 10 ? '0' + i : i) + ':' + (x == 0 ? '00' : temp * x),
          value: tempDate
        })
      }
    }
    return data
  }

  const hoursSelected = (e) => {
    console.log(e)
  }




  const { userDetails, setUserDetails } = useContext(UserContext);
  const navigation=useNavigation();
 
  useEffect(() => {
    console.log("profile pro = "+JSON.stringify(userDetails));
  }, []);


  const addTreatment = () => {
    if (selectedTreatment && selectedCategory && price && duration) {

      const newTreatment = {
        Type_treatment_Number: selectedTreatment,
        Category_Number: selectedCategory,
        Business_Number: idNumberbusiness,
        Price: Number(price),
        Treatment_duration: duration
        //.toLocaleTimeString(),
      };
      console.log(newTreatment, "**********************************");
      NewTreatmentForBussines(newTreatment).then(result => {
        console.log(result.data)
        console.log(result.status)
        Alert.alert(
          'העסק נוסף בהצלחה',
           +
          'תרצו להוסיף טיפול נוסף?',
          [
            {
              text: 'הוספת טיפול נוסף', onPress: () => {
                setSelectedTreatment(null)
                setSelectedCategory(null)
                setPrice(null)
                setDuration(null)
              }
            },
            { text: 'חזור לאיזור האישי', onPress: () => { props.navigation.navigate('Profil_pro') } },
          ],
          { cancelable: false }
        );
      }).catch(error => {
        console.log(error);
      });
    };
  }


  return (
    <ScrollView >
      <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header text="צור את תפריט הטיפולים שלך" fontSize={50} height={200} color={"rgb(92, 71, 205)"} />
          <DropDownPicker
            open={openT}
            items={treatments.map(treatment => ({ label: treatment.Name, value: treatment.Type_treatment_Number }))}
            setOpen={setOpenT}
            setValue={setSelectedTreatment}
            placeholder="בחר טיפול"
            value={selectedTreatment}
            containerStyle={{ height: 40, borderColor: '#d3d3d3', borderRadius: 10 }}
            onChangeItem={item => setSelectedTreatment(item.value)}
            searchable={true}
            style={{ backgroundColor: '#fafafa', zIndex: 10000 }}
            dropDownContainerStyle={{ backgroundColor: '#FFFFFF' }}
            listMode="MODAL"
            positionFixed={true}
            itemStyle={{ justifyContent: 'flex-end' }}
            placeholderStyle={{ color: 'gray' }}
            labelStyle={{ fontSize: 14, color: '#000' }}
          />
          <Text>{'\n'}</Text>

          <DropDownPicker
            open={openC}
            items={categories.map(category => ({ label: category.Name, value: category.Category_Number }))}
            setOpen={setOpenC}
            setValue={setSelectedCategory}
            placeholder="בחר קטגוריה"
            value={selectedCategory}
            containerStyle={{ height: 40 }}
            onChangeItem={item => setSelectedCategory(item.value)}
            searchable={true}
            style={{backgroundColor: '#fafafa', zIndex: 10000 }}
            dropDownContainerStyle={{ backgroundColor: '#FFFFFF' }}
            listMode="MODAL"  // שימוש במצב מודאל
            positionFixed={true}
            itemStyle={{ justifyContent: 'flex-end' }}
            placeholderStyle={{ color: 'gray' }}
            labelStyle={{ fontSize: 14, color: '#000' }}
          />
          <Text>{'\n'}</Text>

          <View>
            <Button onPress={showTimepicker} title=" בחר משך זמן טיפול" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          {duration && <Text>משך זמן הטיפול: {duration}</Text>}
          
          <Text>{'\n'}</Text>
          <Text style={styles.title}>מחיר</Text>
          <View style={styles.inp}>
            <TextInput
              style={styles.input}
              placeholder="מחיר"
              value={price}
              onChangeText={setPrice}
            />

          </View>

          <Button
            title="הוספת הטיפול לתפריט הטיפולים"
            onPress={addTreatment}
            disabled={!selectedTreatment || !selectedCategory || !price || !duration}
          />


        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes all available space
    padding: 20,
    backgroundColor: '#e6e6fa', // Change background color here
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    flexDirection: 'column', // Ensure the direction is from top to bottom
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right', // Align text to the right
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right', // Align text to the right
  },
  input: {
    borderWidth: 1,
    borderColor: "rgb(92, 71, 205)",
    width: "100%",
    marginRight: 8,
    borderRadius: 20,
    height: 50,
    textAlign: 'right', // Align text to the right
  },
  inp: {
    flexDirection: 'row-reverse', // Reverse the row direction
    padding: 2,
    justifyContent: 'space-between',
  },
});


export default Update_MenuTreatment;















/////////////////////////////////////////////////
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
//       props.navigation.navigate('Create_Business_Pro', { ID: ID_number, })
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
//     <ScrollView>
//       <TouchableOpacity onPress={Keyboard.dismiss}>

//         <View style={styles.container}>
//           <Text style={styles.title}>איזה כיף שהחלטת להצטרף לקהילת בעלי העסקים שלנו!</Text>
//           <Text style={styles.titp}>רק עוד כמה פרטים קטנים בשביל שנוכל להמשיך</Text>

//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="תעודת זהות"
//               value={ID_number}
//               placeholderTextColor="#92a2bd"
//               onChangeText={(text) => setid(text)}
//             />
//             {/* <Text style={styles.text}>תעודת זהות </Text> */}
//           </View>

//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="שם פרטי"
//               value={First_name}
//               placeholderTextColor="#92a2bd"
//               onChangeText={(text) => setFirstName(text)}
//             />
//             {/* <Text style={styles.text}>שם פרטי</Text> */}
//           </View>

//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="שם משפחה"
//               value={Last_name}
//               placeholderTextColor="#92a2bd"
//               onChangeText={(text) => setLastName(text)}
//             />
//             {/* <Text>שם משפחה</Text> */}
//           </View>

//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="מין"
//               value={gender}
//               placeholderTextColor="#92a2bd"
//               onChangeText={(text) => setGender(text)}
//             />
//             {/* <Text>מין</Text> */}
//           </View>

//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="תאריך לידה"
//               value={birth_date}
//               placeholderTextColor="#92a2bd"
//               onChangeText={(text) => setDateOfBirth(text)}
//             />
//             {/* <Text>תאריך</Text> */}
//           </View>

//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="פלאפון"
//               placeholderTextColor="#92a2bd"
//               value={phone}
//               onChangeText={(text) => setPhone(text)}
//             />
//             {/* <Text>פלאפון</Text> */}
//           </View>
//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="אימייל"
//               placeholderTextColor="#92a2bd"
//               value={Email}
//               onChangeText={(text) => setEmail(text)}
//             />
//             {/* <Text>איימיל</Text> */}
//           </View>


//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="רחוב"
//               placeholderTextColor="#92a2bd"
//               value={AddressStreet}
//               onChangeText={(text) => setStreet(text)}
//             />
//             {/* <Text>רחוב</Text> */}
//           </View>


//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="מספר בית"
//               placeholderTextColor="#92a2bd"
//               value={AddressHouseNumber}
//               onChangeText={(text) => setHouseNumber(text)}
//             />
//             {/* <Text>מספר בית</Text> */}
//           </View>

//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="עיר"
//               placeholderTextColor="#92a2bd"
//               value={AddressCity}
//               onChangeText={(text) => setCity(text)}
//             />
//             {/* <Text>עיר</Text> */}
//           </View>

//           <View style={styles.inp}>
//             <TextInput style={styles.textInputS}
//               placeholder="סיסמא"
//               placeholderTextColor="#92a2bd"
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//               secureTextEntry={true}
//             />
//             {/* <Text>סיסמא</Text> */}
//           </View>


//           <View>
//             <TouchableOpacity style={styles.but} onPress={handleRegistration}>
//               <View>
//                 <Text style={styles.thachtext}>המשך</Text>
//               </View>

//             </TouchableOpacity>
//           </View>
//         </View>

//       </TouchableOpacity>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   inp: {
//     flexDirection: 'row',
//     padding: 15,
//     justifyContent: 'center',
//     width: '80%',
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//     backgroundColor: '#fffaf0'

//   },
//   textInputS: {
//     // height: 40,
//     // width: "80%",
//     // margin: 10,
//     // borderWidth: 1,
//     // padding: 10,
//     color: '#808080',
//     // height: 50,
//     fontSize: 25,
//     textAlign: 'right',
//     fontWeight: 'bold',
//     opacity: 0.5,

//   },
//   title: {
//     padding: 10,
//     justifyContent: 'center',
//     textAlign: 'center',
//     fontSize: 25,
//     color: '#fff',
//     fontWeight: 'bold',

//   },

//   titp: {
//     textAlign: 'center',
//     color: '#fffaf0',
//     fontSize: 17,
//   },

//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#9acd32'
//   },

//   text: {


//     textAlign: 'right',
//     paddingBottom: 10,

//   },
//   but: {
//     textAlign: 'center',
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//     backgroundColor: '#ff69b4',
//     padding: 15,
//     margin: 10,
//     marginTop: 10,
    
//   },
//   thachtext: {
//     textAlign: 'center',
//     color: '#fffaf0',
//     fontSize:25,
//     fontWeight:'bold',
//     //borderRadius: 10,
//      height: 50,
//     // marginBottom: 20,
//     // backgroundColor: '#fffaf0',
//     // padding: 15,
//     // margin: 10,
//     // marginTop: 20,
//   },

// });

// export default Professional_registration;


