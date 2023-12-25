import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, Text, TextInput, View, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Professional_registration from './Professional_registration';
// import Menu_treatment_registration from './Menu_treatment_forAppointment';
import { Professional_Business } from './obj/FunctionAPICode';
import Menu_treatment_registration from './Menu_treatment_registration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserDietails';
import { getCord } from './obj/FunctionAPICode';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
const Create_Business_Pro = (props) => {
  const [Name, setName] = useState('');
  const [AddressStreet, setStreet] = useState('');
  const [AddressHouseNumber, setHouseNumber] = useState('');
  const [AddressCity, setCity] = useState('');
  const [Is_client_house, setLocation] = useState('');
  const [Professional_ID_number, setIdPro] = useState('');
  const [About, setAbout] = useState('');
  const [Facebook_link, setFacebook_link] = useState('')
  const [Instagram_link, setInstagram_link] = useState('')
  const [LongCordinate, setLongCordinate] = useState('')
  const [LetCordinate, setLetCordinate] = useState('')
  const [isRadioVisible, setRadioVisible] = useState(false);
  const [p, setp] = useState('');
  const openRadio = () => setRadioVisible(true);
  const closeRadio = () => setRadioVisible(false);
  const { navigation, route } = props
  let Id_Pro = route.params.ID
  // navigation = useNavigation();
  // let Id_Pro = 123455555
  // const idpro=123455555

  const handleRegistrationB = async () => {

    { setIdPro(Id_Pro) }

    let LetCordinate = null
    let LongCordinate = null
    await getCord(AddressStreet, AddressHouseNumber, AddressCity).then((result) => {
      if (result.results && result.results[0].geometry.location && result.results[0].geometry &&
        result.results.length > 0)
        console.log('yes', result.results[0].geometry.location)
      LongCordinate = result.results[0].geometry.location.lng
      LetCordinate = result.results[0].geometry.location.lat

    }, (error) => {
      console.log('error', error)
    });
    const data = {
      Name: Name,
      Is_client_house: Is_client_house,
      AddressStreet: AddressStreet,
      AddressHouseNumber: AddressHouseNumber,
      AddressCity: AddressCity,
      Professional_ID_number: Id_Pro,
      about: About,
      phone: p,
      // Professional_ID_number: Professional_ID_number
      LongCordinate: LongCordinate,
      LetCordinate: LetCordinate,
      Facebook_link: Facebook_link,
      Instagram_link: `https://www.instagram.com/${Instagram_link}`
    }
    await Professional_Business(data).then((result) => {
      console.log('yes', result)
      console.log(result.data)

      console.log(result.data.businessId + "ppppp")
      const businessId = result.data.businessId.toString();
      console.log(businessId + "oooooo")
      AsyncStorage.setItem('businessId', businessId);
      navigation.navigate('Menu_treatment_registration')
      // setBussinessDetails(result.data)****************************
      // navigation.navigate('Menu_treatment_registration', {businessId:result.data.businessId})

    }, (error) => {
      console.log('error', error)
    });
    // fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Business/NewBusiness', {
    //   method: 'POST',
    //   headers: new Headers({
    //     "Content-type": "application/json; charset=UTF-8",
    //     'Accept': "application/json; charset=UTF-8",
    //   }),
    //   body: JSON.stringify({

    //     Name,
    //     AddressStreet,
    //     AddressHouseNumber,
    //     AddressCity,
    //     Is_client_house,
    //     Professional_ID_number,

    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))

    //   .catch((error) => console.error(error));

    // props.navigation.navigate('AddTratment')

  };


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>
        <View style={styles.container}>

          <Text style={styles.title}>בניית פרופיל עסקי</Text>
          <Text style={styles.titp}> רק עוד כמה פרטים קטנים והעמוד שלך מוכן</Text>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="שם העסק"
              placeholderTextColor="#92a2bd"
              value={Name}
              onChangeText={(text) => setName(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="טלפון"
              placeholderTextColor="#92a2bd"
              value={p}
              onChangeText={(text) => setp(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="רחוב"
              placeholderTextColor="#92a2bd"
              value={AddressStreet}
              onChangeText={(text) => setStreet(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="מספר בית"
              placeholderTextColor="#92a2bd"
              value={AddressHouseNumber}
              onChangeText={(text) => setHouseNumber(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="עיר"
              placeholderTextColor="#92a2bd"
              value={AddressCity}
              onChangeText={(text) => setCity(text)}
            />

          </View>
          {/* 
          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder="נותן שירות בבית הלקוח ?"
              placeholderTextColor="#92a2bd"
              value={Is_client_house}
              onChangeText={(text) => setLocation(text)}
            />
          </View> */}

          <View style={styles.inp}>
            <TouchableOpacity onPress={openRadio}>
              <Text style={styles.textInputS}>בחר</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isRadioVisible}
            onRequestClose={closeRadio}
          >
            <View style={styles.modalContainer}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={Is_client_house}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
                >
                  <Picker.Item label="בחר " value="" />
                  <Picker.Item label="טיפול בבית הלקוח" value="YES" />
                  <Picker.Item label="טיפול בבית העסק" value="NO" />
                </Picker>
                <View style={{ height: 80 }} />
                <View>
                  <TouchableOpacity style={styles.but} onPress={closeRadio}>
                    <Text style={styles.textInputS}> סיום</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.inp}>

            <TextInput style={styles.textInputAbout}
              placeholder=" שם משתמש באינסטגרם"
              placeholderTextColor="#92a2bd"
              value={Instagram_link}
              onChangeText={(text) => setInstagram_link(text)}
            />

          </View>

          <View style={styles.inp}>

            <TextInput style={styles.textInputAbout}
              placeholder="קישור לפייסבוק"
              placeholderTextColor="#92a2bd"
              value={Facebook_link}
              onChangeText={(text) => setFacebook_link(text)}
            />

          </View>

          <Text style={styles.titp}> כתוב בבקשה כמה פרטים על העסק כדי שהלקוח יוכל להכיר יותר טוב את העסק שלך {'\n'}</Text>

          <View style={styles.inpAbout}>

            <TextInput style={styles.textInputAbout}
              placeholder="אודות העסק"
              placeholderTextColor="#92a2bd"
              value={About}
              onChangeText={(text) => setAbout(text)}
            />

          </View>



          <View>
            <TouchableOpacity onPress={handleRegistrationB}>
              <View style={styles.but}>
                <Text style={styles.thachtext}>המשך</Text>
              </View>
            </TouchableOpacity></View>

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
    borderColor: "rgb(92, 71, 205)",
    backgroundColor: 'white',
    border: 1

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


  },
  textInputAbout: {
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


  },
  inpAbout: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    width: '80%',
    borderRadius: 25,
    height: 170,
    marginBottom: 10,
    borderColor: "rgb(92, 71, 205)",
    backgroundColor: 'white',
    border: 1

  },
  title: {
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    color: "rgb(92, 71, 205)",
    textShadowColor: 'rgb(92, 71, 205)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  titp: {
    textAlign: 'center',
    color: '#fffaf0',
    fontSize: 15,
    color: "rgb(92, 71, 205)",
    padding: 10
  },


  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6fa',
    paddingHorizontal: 20,
    // paddingTop: 50,
    height: '100%',
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderColor: 'black',
    paddingBottom: 150,
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
    padding: 15,
    margin: 10,
    marginTop: 10,

  },
  thachtext: {
    textAlign: 'center',
    color: '#fffaf0',
    fontSize: 25,
    fontWeight: 'bold',
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

export default Create_Business_Pro;


// import React, { useState } from 'react';
// import { Button, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TouchableOpacity } from 'react-native';
// import Professional_registration from './Professional_registration';
// // import Menu_treatment_registration from './Menu_treatment_forAppointment';
// import { Professional_Business } from './obj/FunctionAPICode';
// import Menu_treatment_registration from './Menu_treatment_registration';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const Create_Business_Pro = (props) => {
//   const [Name, setName] = useState('');
//   const [AddressStreet, setStreet] = useState('');
//   const [AddressHouseNumber, setHouseNumber] = useState('');
//   const [AddressCity, setCity] = useState('');
//   const [Is_client_house, setLocation] = useState('');
//   const [Professional_ID_number, setIdPro] = useState('');

//   const { navigation, route } = props
//   let Id_Pro = route.params.ID
//   // navigation = useNavigation();
//   // let Id_Pro = 123455555
//   // const idpro=123455555

//   const handleRegistrationB = async () => {

//     { setIdPro(Id_Pro) }
//     const data = {

//       Name: Name,
//       Is_client_house: Is_client_house,
//       AddressStreet: AddressStreet,
//       AddressHouseNumber: AddressHouseNumber,
//       AddressCity: AddressCity,
//       Professional_ID_number: Id_Pro
//       // Professional_ID_number: Professional_ID_number

//     }

//     Professional_Business(data).then((result) => {
//       console.log('yes', result)
//       console.log(result.data)
//       console.log(result.data.businessId + "ppppp")
//       const businessId = result.data.businessId.toString();
//       console.log(businessId + "oooooo")
//       AsyncStorage.setItem('businessId', businessId);
//       navigation.navigate('Menu_treatment_registration')

//       // navigation.navigate('Menu_treatment_registration', {businessId:result.data.businessId})

//     }, (error) => {
//       console.log('error', error)
//     });
//     // fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Business/NewBusiness', {
//     //   method: 'POST',
//     //   headers: new Headers({
//     //     "Content-type": "application/json; charset=UTF-8",
//     //     'Accept': "application/json; charset=UTF-8",
//     //   }),
//     //   body: JSON.stringify({

//     //     Name,
//     //     AddressStreet,
//     //     AddressHouseNumber,
//     //     AddressCity,
//     //     Is_client_house,
//     //     Professional_ID_number,

//     //   }),
//     // })
//     //   .then((response) => response.json())
//     //   .then((data) => console.log(data))

//     //   .catch((error) => console.error(error));

//     // props.navigation.navigate('AddTratment')

//   };


//   return (
// <TouchableOpacity onPress={Keyboard.dismiss}>
//     <View>

//       <Text>Create_Business_Pro</Text>

//       <Text style={styles.title}>בניית פרופיל עסקי</Text>
//       <Text style={styles.titp}> רק עוד כמה פרטים קטנים והעמוד שלך מוכן</Text>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="שם העסק"
//           value={Name}
//           onChangeText={(text) => setName(text)}
//         />
//         <Text>שם העסק</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="רחוב"
//           value={AddressStreet}
//           onChangeText={(text) => setStreet(text)}
//         />
//           <Text>רחוב</Text>
//       </View>

//       <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="מספר בית"
//           value={AddressHouseNumber}
//           onChangeText={(text) => setHouseNumber(text)}
//         />
//           <Text>מספר בית</Text>
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
//           placeholder="נותן שירות בבית הלקוח ?"
//           value={Is_client_house}
//           onChangeText={(text) => setLocation(text)}
//         />
//         <Text>האם נותן שירות בבית הלקוח?</Text>
//       </View>


//       {/* <View>
//         <Text>{Id_Pro}</Text>
//       </View> */}
//       {/* <View style={styles.inp}>
//         <TextInput style={styles.textInputS}
//           placeholder="תעודת זהות בעל עסק"
//           value={Professional_ID_number}
//           onChangeText={(text) => setIdPro(text)}
//         />
//       </View> */}

//       <View>

//         <TouchableOpacity onPress={handleRegistrationB}

//         >
//           <View>
//             <Text style={styles.titp}>המשך</Text>
//           </View>

//         </TouchableOpacity>
//       </View>
//     </View>
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   inp: {
//     flexDirection: 'row',
//     padding: 10,
//     justifyContent: 'space-between',
//     color: 'red',
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

// export default Create_Business_Pro;