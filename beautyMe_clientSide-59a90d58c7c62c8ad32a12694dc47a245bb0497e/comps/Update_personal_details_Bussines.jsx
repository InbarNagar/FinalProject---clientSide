import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Keyboard, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import { Alert } from 'react-native';
import { RadioButton } from "react-native-paper";
import { UserContext } from './UserDietails';
import React, { useState, useEffect, useContext } from 'react';
import { BusinessDetails } from './obj/FunctionAPICode';
import { UpdateapiBusiness } from './obj/FunctionAPICode';
import Menu_professional from './obj/Menu_professional';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import {Input} from './obj/Input'
import { Kaede } from 'react-native-textinput-effects';
import { Akira } from 'react-native-textinput-effects';




export default function Update_personal_details_Bussines() {

  const { userDetails, setUserDetails } = useContext(UserContext);
  const [Name, setName] = useState('');
  const [AddressStreet, setStreet] = useState('');
  const [AddressHouseNumber, setHouseNumber] = useState('');
  const [AddressCity, setCity] = useState('');
  const [Is_client_house, setLocation] = useState('');
  const [Professional_ID_number, setIdPro] = useState('');
  const [About, setAbout] = useState('');

  const BussinesNumber = userDetails.Business_Number;

  const [DataDetails, setDetailsBus] = useState(null);

  useEffect(() => {
    BusinessDetails(userDetails.Business_Number).then((result) => {
      setDetailsBus(result.data);
      
      setName(result.data.Name);
      setStreet(result.data.AddressStreet);
      setHouseNumber(result.data.AddressHouseNumber);
      setCity(result.data.AddressCity);
      setLocation(result.data.Is_client_house);
      setIdPro(result.data.Professional_ID_number);
      setAbout(result.data.About);

    }, (error) => {
      console.log('error', error)
    })
  }, []);

 
console.log(DataDetails)
  const Update_Bussines = () => {

    const data = {
      Name: Name,
      Is_client_house: Is_client_house,
      AddressStreet: AddressStreet,
      AddressHouseNumber: AddressHouseNumber,
      AddressCity: AddressCity,
      Professional_ID_number: Professional_ID_number,
      Business_Number: userDetails.Business_Number,
      About: About
    }
   
    UpdateapiBusiness(data).then(
      (res) => {

        console.log('yes', res.data)
           Alert.alert("הפרטים עודכנו בהצלחה")

      }, (error) => {
        console.log('error', error)


      });
  }

  return (
<>
<KeyboardAvoidingView  style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <ScrollView>
      {/* <TouchableOpacity onPress={Keyboard.dismiss}> */}
        <View style={styles.container}>

          <Text style={styles.tit}>  עריכת פרופיל עסקי</Text>



              <Akira
                  label={'שם העסק'}
                  // this is used as active and passive border color
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4', textAlign:'left' }}
                  placeholder={Name}
                  placeholderTextColor="#92a2bd"
                  // value={Name}
                  onChangeText={(text) => setName(text)}
                /> 

              <Akira
                  label={'רחוב'}
                  // this is used as active and passive border color
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4', textAlign:'left' }}
                  placeholder={AddressStreet}
                  placeholderTextColor="#92a2bd"
                  // value={AddressStreet}
                  onChangeText={(text) => setStreet(text)}
                /> 

              <Akira
                  label={'מספר בית'}
                  // this is used as active and passive border color
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4', textAlign:'left' }}
                  placeholder={AddressHouseNumber}
                  placeholderTextColor="#92a2bd"
                  // value={AddressHouseNumber}
                  onChangeText={(text) => setHouseNumber(text)}
                /> 

              <Akira
                  label={'עיר'}
                  // this is used as active and passive border color
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4', textAlign:'left'}}
                  placeholder={AddressCity}
                  placeholderTextColor="#92a2bd"
                  // value={AddressCity}
                  onChangeText={(text) => setCity(text)}
                /> 

<View style={styles.container1}>
      <Text style={styles.label1}>היכן מטפל?</Text>
      <View style={styles.radioButtonContainer}>
        <View style={styles.radioButtonGroup}>
        <Text>  </Text>
          <Text>בית  העסק  </Text>
          <RadioButton
            value="NO"
            status={  Is_client_house === 'NO' ? 'checked' : 'unchecked' }
            onPress={() => setLocation('NO')}
          />
        </View>
        <View style={styles.radioButtonGroup}>
        <Text>  </Text>
          <Text>   בית הלקוח </Text>
          <RadioButton
            value="YES"
            status={  Is_client_house === 'YES' ? 'checked' : 'unchecked' }
            onPress={() => setLocation('YES')}
          />
        </View>
      </View>
    </View>


<Akira
                  label={'אודות העסק'}
                  // this is used as active and passive border color
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4', textAlign:'left' }}
                  placeholder={About}
                  placeholderTextColor="#92a2bd"
                  // value={AddressHouseNumber}
                  onChangeText={(text) => setAbout(text)}
                /> 




                {/* <Text>{'\n'}</Text>
          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={Name}
              placeholderTextColor="#92a2bd"
             // value={Name}
              onChangeText={(text) => setName(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={AddressStreet}
              placeholderTextColor="#92a2bd"
             // value={AddressStreet}
              onChangeText={(text) => setStreet(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={AddressHouseNumber}
              placeholderTextColor="#92a2bd"
             // value={AddressHouseNumber}
              onChangeText={(text) => setHouseNumber(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={AddressCity}
              placeholderTextColor="#92a2bd"
             // value={AddressCity}
              onChangeText={(text) => setCity(text)}
            />

          </View>

          <View style={styles.inp}>
            <TextInput style={styles.textInputS}
              placeholder={Is_client_house}
              placeholderTextColor="#92a2bd"
             // value={Is_client_house}
              onChangeText={(text) => setLocation(text)}
            />

          </View> */}



          <View>
            <TouchableOpacity onPress={Update_Bussines} >
              <View style={styles.but}>
                <Text style={styles.thachtext}>עדכן</Text>
              </View>
            </TouchableOpacity>
            </View>
          
<View style={styles.image1}>
            <Image style={styles.image} source={require('../assets/logoo.png')}/>
                 {/* <Text style={styles.tit1}>see the beauty around you</Text>
            <Text style={styles.tit1}>beautyMe - see the beauty around you</Text> */}
            </View>
        </View>
        
      {/* </TouchableOpacity> */}
    </ScrollView>
    <Menu_professional />
    </KeyboardAvoidingView>

    </>
  )
}

const styles = StyleSheet.create({
  inp: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 30,
    backgroundColor: '#f3e5f5' // Material Design light purple 100
  },
  textInputS: {
    color: '#808080',
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  title: {
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#ba68c8', // Material Design purple 300
    fontWeight: 'bold',
  },
  titp: {
    textAlign: 'center',
    color: '#f3e5f5', // Material Design light purple 100
    fontSize: 17,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // width: '100%',
    // padding:40,
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#e6e6fa', // Material Design purple 200
    padding: 10,
    paddingBottom:150,
    // height: "100%"
  },
  image1:{
    alignItems: 'center',

  },
  text: {
    textAlign: 'left',
    paddingBottom: 10,
  },
  but: {
    textAlign: 'center',
    borderRadius: 25,
    height: 50,
    // marginBottom: 20,
    backgroundColor: "rgb(92, 71, 205)", // Material Design purple 100
    padding: 15,
    margin: 10,
    marginTop: 20,
    width: "90%",
  },
  thachtext: {
    textAlign: 'center',
    color: '#f3e5f5', // Material Design light purple 100
    fontSize: 25,
    fontWeight: 'bold',
    height: 50,
  },

  tit1:{
    "fontSize": 15,
    "fontWeight": "500",
    "letterSpacing": 0.15,
    "lineHeight": 50,
    textShadowColor: 'rgb(92, 71, 205)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    opacity:0.7
    },
   tit:{
      textAlign: 'center',
      "fontSize": 35,
      "fontWeight": "500",
      "letterSpacing": 0.15,
      "lineHeight": 50,
      textShadowColor: 'rgb(92, 71, 205)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
      opacity:0.7
      },
      image:{
        width:200,
        height:200,
        alignItems: 'center', 
        justifyContent: 'center',
        },
        label1: {
          fontSize: 18,
          color: '#ac83c4'
          // marginBottom: 5,
        },
      radioButtonGroup: {
          flexDirection: 'column',
          alignItems: 'center',
        },
      container1: {
          marginTop:10,
          alignItems: 'center',
        },
      radioButtonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
});