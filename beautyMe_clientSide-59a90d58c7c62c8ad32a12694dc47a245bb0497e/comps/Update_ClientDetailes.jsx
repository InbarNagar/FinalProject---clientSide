import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { UserContext } from './UserDietails';
import { UpdateClient } from './obj/FunctionAPICode';
import { Akira } from 'react-native-textinput-effects';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Menu_Client from './obj/Menu_Client';



export default function Update_ClientDetailes() {

  const { userDetails, setUserDetails } = useContext(UserContext);

  const navigation = useNavigation();

  const [ID_number, setIDNumber] = useState(userDetails.ID_number);
  const [firstName, setFirstName] = useState(userDetails.First_name);
  const [lastName, setLastName] = useState(userDetails.Last_name);
  const [birthDate, setBirthDate] = useState(userDetails.birth_date);
  const [gender, setGender] = useState(userDetails.gender);
  const [phone, setPhone] = useState(userDetails.phone);
  const [email, setEmail] = useState(userDetails.Email);
  const [addressStreet, setAddressStreet] = useState(userDetails.AddressStreet);
  const [addressHouseNumber, setAddressHouseNumber] = useState(userDetails.AddressHouseNumber);
  const [addressCity, setAddressCity] = useState(userDetails.AddressCity);
  const [password, setPassword] = useState(userDetails.password);
  const [Instagram_link, setInstagram_link] = useState(userDetails.Instagram_link);
  const [Facebook_link, setFacebook_link] = useState(userDetails.Facebook_link)

  const handle = () => {
    const data = {
      "ID_number": ID_number,
      "First_name": firstName,
      "Last_name": lastName,
      "phone": phone,
      "Email": email,
      "AddressStreet": addressStreet,
      "AddressHouseNumber": addressHouseNumber,
      "AddressCity": addressCity,
      "gender": gender,
      "birth_date": birthDate,
      "Instagram_link": Instagram_link,
      "Facebook_link": Facebook_link
    };

    UpdateClient(data).then(
      (res) => {
        console.log('yes', res.data)
      navigation.navigate('ClientHome')

      }, (error) => {
        console.log('error', error)
      });

  };

  return (

    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>עריכת פרטים אישים</Text>

          <Akira
            label={'    תעודת זהות'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="תעודת זהות"
            value={ID_number}
            onChangeText={setIDNumber}
            style={styles.akira}
          />

          <Akira
            label={'    שם פרטי'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="שם פרטי"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.akira}
          />

          <Akira
            label={'    שם משפחה'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="שם משפחה"
            value={lastName}
            onChangeText={setLastName}
            style={styles.akira}
          />

          <Akira
            label={'    פלאפון'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="פלאפון"
            value={phone}
            onChangeText={setPhone}
            style={styles.akira}
          />

          <Akira
            label={'    Email'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="אימייל" value={email}
            onChangeText={setEmail}
            style={styles.akira}
          />

          <Akira
            label={'    רחוב'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="רחוב"
            value={addressStreet}
            onChangeText={setAddressStreet}
            style={styles.akira}
          />

          <Akira
            label={'    מספר בית'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="מספר בית"
            value={addressHouseNumber}
            onChangeText={setAddressHouseNumber}
            style={styles.akira}
          />

          <Akira
            label={'    עיר'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="עיר"
            value={addressCity}
            onChangeText={setAddressCity}
            style={styles.akira}
          />

          <Akira
            label={'    סיסמה'}
            // this is used as active and passive border color
            borderColor={"rgb(204, 204, 255)"}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: '#ac83c4' }}
            placeholder="סיסמא"
            value={password}
            onChangeText={setPassword}
            style={styles.akira}
          />

          <View>
            <TouchableOpacity onPress={handle}>
              <View style={styles.but}>
                <Text style={styles.thachtext}>עדכן שינויים</Text>
              </View>

            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      <Menu_Client/>
    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',

    backgroundColor: '#e6e6fa', // Material Design purple 200
    padding: 10,
    paddingBottom: 150,
  },
  wrapper: {
    backgroundColor: '#f8f8ff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    textAlign: 'right',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    textAlign: 'right',
  },
  but: {
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    // marginBottom: 20,
    backgroundColor: "rgb(92, 71, 205)", // Material Design purple 100
    padding: 15,
    margin: 10,
    marginTop: 50,
    width: "90%",
  },
  thachtext: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#f3e5f5', // Material Design light purple 100
    fontSize: 25,
    fontWeight: 'bold',
    height: 50,
  },
});