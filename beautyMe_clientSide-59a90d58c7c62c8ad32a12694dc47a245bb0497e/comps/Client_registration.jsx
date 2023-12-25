import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Keyboard, TouchableOpacity, KeyboardAvoidingView, ScrollView, Linking } from 'react-native';
import { Cli_Registration } from './obj/FunctionAPICode';
import { Akira } from 'react-native-textinput-effects';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Button from './CTools/Button';
import { Button } from 'react-native';

import moment from "moment";
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { Feather, SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Client_registration = (props) => {
  const [ID_number, setid] = useState('');
  const [First_name, setFirstName] = useState('');
  const [Last_name, setLastName] = useState('');
  const [birth_date, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [AddressStreet, setStreet] = useState('');
  const [AddressHouseNumber, setHouseNumber] = useState('');
  const [AddressCity, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [instagramUserName, setinstagramUserName] = useState('');
  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFemaleChecked, setFemaleChecked] = useState(false);
  const [isMaleChecked, setMaleChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [facebookUserName, setfacebookUserName] = useState('');
  const [instagramUri, setInstagramUri] = useState('');
  const [facebookUri, setFacebookUri] = useState('');

  // const handleInstagramLink = async () => {
  //   try {
  //     // const url = 'https://www.instagram.com/your_instagram_account';
  //     const url = 'https://www.instagram.com/1noa_1';
  //     await Linking.openURL(url);
  //     console.log(Linking.openURL(url))
  //   } catch (error) {
  //     console.error('שגיאה בפתיחת האינסטגרם:', error);
  //   }
  // };

  // בגלל שאני לא מצליחה לקבל את הURI של פייסבוק אז זה לא שימושי
  // const handleFacebookLink = async () => {
  //   try {
  //     const url = 'https://www.facebook.com/your_facebook_account';
  //     await Linking.openURL(url);
  //   } catch (error) {
  //     console.error('שגיאה בפתיחת הפייסבוק:', error);
  //   }
  // };



  // יש פה שתי גרסאות לפונקציות שאמורות איכשהו לקבל את ה URI של הפייסבוק של המשתמש... הן לא עובדות עם שגיאות מסובכות!!!
  // const handleFacebookLogin = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions(['public_profile']);
  //     if (result.isCancelled) {
  //       console.log('התחברות לפייסבוק בוטלה');
  //     } else {
  //       const accessTokenData = await AccessToken.getCurrentAccessToken();
  //       const accessToken = accessTokenData.accessToken.toString();
  //       const response = await fetch(
  //         `https://graph.facebook.com/v13.0/me?fields=id&access_token=${accessToken}`
  //       );
  //       const json = await response.json();
  //       const facebookUri = `https://www.facebook.com/${json.id}`;
  //       setFacebookUri(facebookUri);
  //     }
  //   } catch (error) {
  //     console.error('שגיאה בהתחברות לפייסבוק:', error);
  //   }
  // };

  // const handleFacebookLogin = async () => {
  //   try {
  //     const accessTokenData = await AccessToken.getCurrentAccessToken();
  //     const accessToken = accessTokenData.accessToken.toString();
  //     const response = await fetch(
  //       `https://graph.facebook.com/v13.0/me?fields=id&access_token=${accessToken}`
  //     );
  //     const json = await response.json();
  //     const facebookUri = `https://www.facebook.com/${json.id}`;
  //     setFacebookUri(facebookUri);
  //   } catch (error) {
  //     console.error('שגיאה בהתחברות לפייסבוק:', error);
  //   }
  // };
  const handleRegistrationC = () => {

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
      ProfilPic: "profil" + ID_number,
      Instagram_link: instagramUserName,
      Facebook_link: facebookUserName
      // Facebook_link: Facebook_link
    }
    Cli_Registration(data).then((result) => {

      console.log('yes', result)

      if (result.status == 200) {
        // Notificationss("OK", "התור נוסף בהצלחה") 
        Alert.alert(
          'ישששש',
          'שמחים שהצטרפת למשפחת Beauty Me',
          [
            { text: 'ייאאלה בואו נתחיל', onPress: () => { navigation.navigate('LogInGenral', { userType: 'Pro' }) } },
          ],
          { cancelable: false }
        );
      }
    }).catch(error => {
      console.log(error);
      Alert.alert(
        'אופס',
        'אחד הפרטים לא נכונים' + error,
        [
          { text: 'נסה שוב' },
        ],
        { cancelable: false }
      );
    });


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


  // const handleConfirm = (date) => {
  //   setDateOfBirth(date);
  //   setDatePickerVisibility(false);
  // };

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  const handleGenderSelection = (gender) => {
    if (gender === 'female') {
      setFemaleChecked(!isFemaleChecked);
      setMaleChecked(false);
    } else if (gender === 'male') {
      setMaleChecked(!isMaleChecked);
      setFemaleChecked(false);
    }
  };

  //   const handleInstagramLink = () => {
  //     Linking.openURL(ClientData.Instagram_link); //לשים משתנה של כתובת אינסטגרם שהמשתמש יזין
  //   };
  //   const [deleteSection, SetDeleteSection] = useState(false);
  //   const[confirmID,SetConfirmID]=useState('');
  //   const handleDeleteSection = () => SetDeleteSection(prevState => !prevState);
  //   function exitApp() {
  //     BackHandler.exitApp();
  //     return true;
  // }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView>
        <View style={styles.container}>



          {/* <TextInput    ניסיונות לאינסטגרם... 
        placeholder="הכנס URI של אינסטגרם"
        placeholderTextColor={'black'}
        onChangeText={(text) => setInstagramUri(text)}
        value={instagramUri}
      />
       <Button title="שמור" />
      <Button title="קישור לאינסטגרם שלך" onPress={handleInstagramLink} />
      <Button title="קישור לפייסבוק שלך" onPress={handleFacebookLink} /> */}


          {/* // שני כפתורים שמנסים לקבל את ה URI של הפייסבוק של המשתמש... שולחות לפונקציות שלא עובדות...  */}
          {/* <LoginButton
        onLoginFinished={async (error, result) => {
          if (error) {
            console.log('התחברות לפייסבוק נכשלה:', error);
          } else if (result.isCancelled) {
            console.log('התחברות לפייסבוק בוטלה');
          } else {
            await handleFacebookLogin();
          }
        }}
      /> */}

          {/* <Button title="התחברות דרך פייסבוק" onPress={handleFacebookLogin} /> */}

          {/* 
    <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleInstagramLink}>
          <FontAwesome name="instagram" size={24} color="black" />
        </TouchableOpacity>
      </View> */}




          <Text style={styles.title}>איזה כיף שהחלטת להצטרף לקהילת הלקוחות שלנו!</Text>
          <Text style={styles.titp}> אנא מלא/י את הפרטים הבאים:</Text>

          {/* <Input styleText={styles.title} styleView={styles.inp} styleTextInput={styles.input} placeholder="תעודת זהות" value={ID_number} onBlur={(text) => setid(text)} textt="תעודת זהות:" /> */}

          <View style={styles.akiraContainer}>
            <Akira
              label={'    תעודת זהות'}
              // this is used as active and passive border color
              // borderColor={"rgb(92, 71, 205)"}
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setid(text)}
            />
            <Akira
              label={'    שם פרטי'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setFirstName(text)}
              style={styles.akira}
            />
            <Akira
              label={'    שם משפחה'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setLastName(text)}
              style={styles.akira}
            />
            {/* <Akira
                  label={'    מין'}
                  // this is used as active and passive border color
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4'}}
                  onChangeText={(text) => setGender(text)}
                  style={styles.akira}
                />  */}


            <Text>{'\n'}</Text>


            {/* <Text>{'\n'}</Text>
<View>
  <View style={{ borderWidth: 5, borderColor: "rgb(204, 204, 255)", paddingVertical: 16, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
    <Text style={{ color: "#ac83c4", textAlign: 'right', fontWeight: 'bold', fontSize: 14 }}>   מין:</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontWeight: isMaleChecked ? 'bold' : 'normal', color: isMaleChecked ? '#ac83c4' : 'black' }}>זכר</Text>
      <CheckBox
        checked={isMaleChecked}
        onPress={() => {
          setMaleChecked(!isMaleChecked);
          setGender(isMaleChecked ? 'M' : '');
          console.log('Set Gender to', !isMaleChecked ? 'M' : '');
          console.log('Gender:', gender);
        }}
        checkedColor="#ac83c4"
      />
      <View style={styles.inp}>
         <TextInput style={styles.textInputS} 
           placeholder="תעודת זהות"
           value={ID_number}
           onChangeText={(text) => setid(text)}
         />
       
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="שם פרטי"
          value={First_name}
          onChangeText={(text) => setFirstName(text)}
        />
      
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="שם משפחה"
          value={Last_name}
          onChangeText={(text) => setLastName(text)}
        />
       
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="מין"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
   
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="תאריך לידה"
          value={birth_date}
          onChangeText={(text) => setDateOfBirth(text)}
        />
    
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="פלאפון"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
    
      </View>
      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="אימייל"
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />
     
      </View>


      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="רחוב"
          value={AddressStreet}
          onChangeText={(text) => setStreet(text)}
        />
      
      </View>


      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="מספר בית"
          value={AddressHouseNumber}
          onChangeText={(text) => setHouseNumber(text)}
        />
       
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="עיר"
          value={AddressCity}
          onChangeText={(text) => setCity(text)}
        />
      
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="סיסמא"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
     
      </View>

      <Button color='#9acd32' title="סיום הרשמה" onPress={handleRegistrationC} />
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontWeight: isFemaleChecked ? 'bold' : 'normal', color: isFemaleChecked ? '#ac83c4' : 'black' }}>נקבה</Text>
      <CheckBox
        onPress={() => {
          setFemaleChecked(!isFemaleChecked);
          setGender(isFemaleChecked ? 'F' : '');
          console.log('Set Gender to', !isFemaleChecked ? 'F' : '');
          console.log('Gender:', gender);
        }}
        checked={isFemaleChecked}
        checkedColor="#ac83c4"
      />
    </View>
  </View>
</View>
<Text>{'\n'}</Text> */}




            {/* <Text>מין:</Text>
                <Button
                  title="נקבה"
                  onPress={() => setGender('F')}
                />
                <Button
                  title="זכר"
                  onPress={() => setGender('M')}
                />
                <Text>מין: {gender}</Text> */}

            {/* <View style={styles.dateContainer}>   ///// עובד אבל מכוער ולא צריך
                    <Button text="תאריך לידה" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        confirmTextIOS="אישור"
                        cancelTextIOS="ביטול"
                        locale="he"
                    />
                    <Text style={styles.selectedDate}>{Date}</Text>
                </View> */}

            <View>
              <TouchableOpacity style={styles.dateContainer} onPress={showDatePicker}>
                <View
                  style={{
                    borderWidth: 5,
                    borderColor: "rgb(204, 204, 255)",
                    paddingVertical: 16,
                  }}
                >
                  <Text style={{ color: "#ac83c4", textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>{selectedDate ? selectedDate : "תאריך לידה"}</Text>
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

            <Akira
              label={'    פאלפון'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setPhone(text)}
              style={styles.akira}
            />
            <Akira
              label={'Email'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setEmail(text)}
              style={styles.akira}
            />
            <Akira
              label={'    רחוב'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setStreet(text)}
              style={styles.akira}
            />
            <Akira
              label={'    מספר בית'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setHouseNumber(text)}
              style={styles.akira}
            />
            <Akira
              label={'    עיר'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setCity(text)}
              style={styles.akira}
            />
            <Akira
              label={'    סיסמה'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setPassword(text)}
              style={styles.akira}
            />

            <Akira
              label={'    שם המשתמש באינסטגרם'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setinstagramUserName(text)}
              style={styles.akira}
            />

            <Akira
              label={'    לינק לפייסבוק'}
              // this is used as active and passive border color
              borderColor={"rgb(204, 204, 255)"}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{ color: '#ac83c4' }}
              onChangeText={(text) => setfacebookUserName(text)}
              style={styles.akira}
            />


            <View style={styles.container1}>
              <Text style={styles.label1}>בחר מין</Text>
              <View style={styles.radioButtonContainer}>
                <View style={styles.radioButtonGroup}>
                  <Text>זכר</Text>
                  <RadioButton
                    value="M"
                    status={gender === 'M' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('M')}
                  />
                </View>
                <View style={styles.radioButtonGroup}>
                  <Text>נקבה</Text>
                  <RadioButton
                    value="F"
                    status={gender === 'F' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('F')}
                  />
                </View>
              </View>
            </View>

          </View>


          {/* //החלק של המצלמה... עובד!!! אבל לא יודעת למה כשהוא לא בהערה אז הכפתור "סיים הרשמה" שמתחתיו לא מופיע בדף!!! */}

          {/* <Text>{'\n'}</Text>     
                <Text style={{ color: "#ac83c4",  textAlign: 'center', fontWeight: 'bold', fontSize: 14  }}>הוספת תמונת פרופיל</Text>
              <Button
                  element={<SimpleLineIcons name="camera" size={30} color="black" />}
                  // radios={1000}
                  width={10}
                  height={10}
                  
                  // justifyContent='flex-end'
                  alignItems='center'
                  // style={styles.roundButton}
                  onPress={()=>props.navigation.navigate('CameraUse',{imageName:"profil"+ID_number})} 
                  /> */}

          <Text>{'\n'}</Text>
          <Text style={{ color: "#ac83c4", textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>הוספת תמונת פרופיל</Text>
          <TouchableOpacity style={styles.roundButton} onPress={() => props.navigation.navigate('CameraUse', { imageName: "profil" + ID_number })}>
            <SimpleLineIcons name="camera" size={30} color="black" />
          </TouchableOpacity>




          <Text>{'\n'}</Text>

          {/* <Button color='#9acd32' title="סיום הרשמה" onPress={handleRegistrationC} /> */}
          <View>
            <TouchableOpacity style={styles.but} onPress={handleRegistrationC}>
              <View>
                <Text style={styles.thachtext}>סיים הרשמה</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#e6e6fa',
    justifyContent: 'flex-start',
    // width: '100%',
    padding: 20,
  },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(92, 71, 205)',
  },
  akiraContainer: {
    width: '90%',
    borderRadius: 10,
    borderColor: "rgb(204, 204, 255)"

  },
  akira: {
    // borderRadius: 10,
    // borderWidth: 2, // עובי הגבול
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderColor: "rgb(204, 204, 255)"
  },
  but: {
    width: '70%',
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
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    //borderRadius: 10,
    // height: 50,
    // marginBottom: 20,
    // backgroundColor: '#fffaf0',
    // padding: 15,
    // margin: 10,
    // marginTop: 20,
  },
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
    padding: 10
  },

  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#e6e6fa',
  // },

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
    fontSize: 20,
    fontWeight: 'bold',
    //borderRadius: 10,
    height: 50,
    // marginBottom: 20,
    // backgroundColor: '#fffaf0',
    // padding: 15,
    // margin: 10,
    // marginTop: 20,
  },
  container1: {
    marginTop: 10,
    alignItems: 'center',

  },
  label1: {
    fontSize: 18,
    color: '#ac83c4'
    // marginBottom: 5,
  },
  radioGroup1: {
    flexDirection: 'row',
  },
  radioButton1: {
    marginRight: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 25,
    border: 1,
    borderColor: "rgb(92, 71, 205)",
  },
  radioButtonGroup: {
    flexDirection: 'column',
    alignItems: 'center',
  },

});


export default Client_registration;





{/* <View style={styles.inp}>
         <TextInput style={styles.textInputS} 
           placeholder="תעודת זהות"
           value={ID_number}
           onChangeText={(text) => setid(text)}
         />
         <Text>תעודת זהות:</Text>
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="שם פרטי"
          value={First_name}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text>שם פרטי</Text>
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="שם משפחה"
          value={Last_name}
          onChangeText={(text) => setLastName(text)}
        /> 
        <Text>שם משפחה</Text>
      </View>*/}

{/* <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="מין"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
        <Text>מין</Text>
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="תאריך לידה"
          value={birth_date}
          onChangeText={(text) => setDateOfBirth(text)}
        />
        <Text>שם משפחה</Text>
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="פלאפון"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Text>פלאפון</Text>
      </View>
      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="אימייל"
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>איימיל</Text>
      </View> */}


{/* <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="רחוב"
          value={AddressStreet}
          onChangeText={(text) => setStreet(text)}
        />
        <Text>רחוב</Text>
      </View>


      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="מספר בית"
          value={AddressHouseNumber}
          onChangeText={(text) => setHouseNumber(text)}
        />
        <Text>מספר בית</Text>
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="עיר"
          value={AddressCity}
          onChangeText={(text) => setCity(text)}
        />
        <Text>עיר</Text>
      </View>

      <View style={styles.inp}>
        <TextInput style={styles.textInputS}
          placeholder="סיסמא"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Text>סיסמא</Text>
      </View> */}
/////////////////////////////////////////////////////////////////////////////////////////
















//   console.log('yes', result)

    // }, (error) => {
    //   console.log('error', error)
    // });

    // fetch('http:proj.ruppin.ac.il/cgroup93/prod/api/Client/NewClient', {
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