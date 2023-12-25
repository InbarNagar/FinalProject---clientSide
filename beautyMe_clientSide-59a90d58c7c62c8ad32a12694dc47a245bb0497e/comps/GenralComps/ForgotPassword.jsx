
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { forgotPassword } from '../obj/FunctionAPICode';
import { resetPassword } from '../obj/FunctionAPICode';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [codefromS, setcodefromS] = useState('');
  const [code, setcode] = useState('');
  const [show, setshow] = useState('');
  const [ID_number, setID_number] = useState('');
  const [password, setPassword] = useState('');
 


  const handleResetPassword = () => {
    if (email === '') {
      Alert.alert('שגיאה', 'אנא הזן כתובת אימייל');
      return;
    }
    else {
      forgotPassword(email).then((code) => {
        setcodefromS(code)
        setshow(true)
console.log(code)
        Alert.alert('בקשת איפוס סיסמא נשלחה', `אנא בדוק את תיבת הדואר הנכנס שלך בכתובת ${email}`);

      }).catch((error) => {
        console.log("error!", error);
      }).finally(() => {
        // setInterval(() => {
        //   showLoading && setshowLoading(false)
        // }, 4000);

      });
      // כאן אתה יכול להוסיף את הקוד שלך לשליחת בקשת איפוס סיסמא לשרת
      // לדוגמה:
      // sendResetPasswordEmail(email);
    }

  };
  const handleResetPassword1 = () => {
    if (code == codefromS) {

      const data={
        Email:email,
        password:password
      }
      resetPassword(data).then(() => {
        Alert.alert("השינוים נשמרו בהצלחה");
        navigation.navigate('LogInGenral')
      }).catch((error) => {
        console.log("error!", error);
      }).finally(() => {
        // setInterval(() => {
        //   showLoading && setshowLoading(false)
        // }, 4000);

      });

    }
    else{
      Alert.alert("הקוד אינו תקין, נסה שוב");
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>איפוס סיסמא</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="הזן את כתובת האימייל שלך"
        keyboardType="email-address"
        autoCapitalize="none"
        color="black"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>שלח</Text>
      </TouchableOpacity>

     {show&& <View>
        <TextInput
          style={styles.input}
          onChangeText={setcode}
          value={code}
          placeholder="הכנס קוד"
          autoCapitalize="none"
          color="black"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="הכנס סיסמא"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword1}>
          <Text style={styles.buttonText}> אפס סיסמא</Text>
        </TouchableOpacity>
      </View>}

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    direction: 'rtl',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 48,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: "rgb(92, 71, 205)",
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;