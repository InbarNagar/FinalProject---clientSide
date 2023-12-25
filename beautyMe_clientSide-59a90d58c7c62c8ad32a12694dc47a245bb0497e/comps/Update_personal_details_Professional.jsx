import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import Menu_professional from './obj/Menu_professional';
import { UserContext } from './UserDietails';
import { useState, useEffect, useContext } from 'react';
import Header from './obj/Header';

import { UpdateProffesional } from './obj/FunctionAPICode';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Akira } from 'react-native-textinput-effects';





export default function Update_personal_details_Professional(Props) {
    // const userDetails = {
    //     "ID_number": "123455555 ",
    //     "First_name": "nira",
    //     "Last_name": "cohen",
    //     "birth_date": "1965-10-12T00:00:00",
    //     "gender": "F",
    //     "phone": "521212121",
    //     "Email": "nira@gmail.com",
    //     "AddressStreet": "ehud",
    //     "AddressHouseNumber": "5         ",
    //     "AddressCity": "haifa",
    //     "password": "12333",
    //     "Business_Number": 4,
    //     "userType": null
    // };
    const { userDetails, setUserDetails } = useContext(UserContext);

    const [ID_number, setid] = useState(userDetails.ID_number);
    const [First_name, setFirstName] = useState(userDetails.First_name);
    const [Last_name, setLastName] = useState(userDetails.Last_name);
    const [birth_date, setDateOfBirth] = useState(userDetails.birth_date);
    const [gender, setGender] = useState(userDetails.gender);
    const [phone, setPhone] = useState(userDetails.phone);
    const [Email, setEmail] = useState(userDetails.Email);
    const [AddressStreet, setStreet] = useState(userDetails.AddressStreet);
    const [AddressHouseNumber, setHouseNumber] = useState(userDetails.AddressHouseNumber);
    const [AddressCity, setCity] = useState(userDetails.AddressCity);
    const [password, setPassword] = useState(userDetails.password);
    const Business_Number = userDetails.Business_Number;



    // useEffect(() => {
    //     if (userDetails)
    //     setid(userDetails.ID_number)
    //     setFirstName(userDetails.First_name)
    //     setLastName(userDetails.Last_name)
    //     setDateOfBirth(userDetails.birth_date)
    //     setGender(userDetails.gender)
    // })

    const CheckInput = (name, value) => {
        console.log((!value.includes('@')))
        switch (name) {
            case "Email":
                if (!value.includes('@')) return false;
                if (!value.endsWith(".com") && !value.endsWith(".co.il")) return false;
                break;

            default:
                break;

        }return true;
    }

    const Update_Diteails = () => {

        if (!First_name || !Last_name || !birth_date || !phone || !Email || !AddressStreet || !AddressHouseNumber ||
            !AddressCity || !password || !Business_Number) {
            return
        }
        if (!CheckInput("Email", Email)) {
            setAlert(<Alert
                text='האיימיל אינו תקין'
                type='worng'
                time={3000}
                bottom={100}
            />)
            return
        }
        const data = {
            "ID_number": ID_number,
            "First_name": First_name,
            "Last_name": Last_name,
            "birth_date": birth_date,
            "gender": gender,
            "phone": phone,
            "Email": Email,
            "AddressStreet": AddressStreet,
            "AddressHouseNumber": AddressHouseNumber,
            "AddressCity": AddressCity,
            "password": password,
            "Business_Number": Business_Number,
        
        }

        console.log(data)
        UpdateProffesional(data).then(
            (res) => {
             alert("השינוים נשמרו בהצלחה")
                console.log('yes', res)
                setUserDetails(data)
                
            }, (error) => {
                console.log('error', error)
              alert("נסה שנית")

            });
    

}

return (

    <>
        {/* {alert && alert} */}
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {/* <ScrollView contentContainerStyle={styles.scrollView}> */}
        <ScrollView>
            <View style={styles.container}>
                {/* <Header text="עריכת פרטים אישים " coolr='rgb(92, 71, 205)' fontSize={35} /> */}
                <Text style={styles.tit}>עריכת פרטים אישיים</Text>
               
                <View style={styles.akiraContainer}>
                <Akira 
                  label={'Email'}
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4'}}
                  placeholder={userDetails.Email}
                    placeholderTextColor="#92a2bd"
                    value={Email}
                    onChangeText={(text) => setEmail(text)}
                  style={styles.akira}
                /> 
                <Text>{'\n'}</Text>

                <Akira 
                  label={'פאלפון'}
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4'}}
                  placeholder="פלאפון"
                        placeholderTextColor="#92a2bd"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                  style={styles.akira}
                /> 
                <Text>{'\n'}</Text>

                <Akira 
                  label={'רחוב'}
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4'}}
                  placeholder="רחוב"
                        placeholderTextColor="#92a2bd"
                        value={AddressStreet}
                        onChangeText={(text) => setStreet(text)}
                  style={styles.akira}
                /> 
                
                <Text>{'\n'}</Text>

                <Akira 
                  label={'עיר'}
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4'}}
                  placeholder="עיר"
                        placeholderTextColor="#92a2bd"
                        value={AddressCity}
                        onChangeText={(text) => setCity(text)}
                  style={styles.akira}
                /> 
                
                <Text>{'\n'}</Text>

                <Akira 
                  label={'מספר בית'}
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4'}}
                  placeholder="מספר בית"
                        placeholderTextColor="#92a2bd"
                        value={AddressHouseNumber}
                        onChangeText={(text) => setHouseNumber(text)}
                  style={styles.akira}
                /> 
                
                <Text>{'\n'}</Text>

                <Akira 
                  label={'סיסמה'}
                  borderColor={"rgb(204, 204, 255)"}
                  inputPadding={16}
                  labelHeight={24}
                  labelStyle={{ color: '#ac83c4'}}
                  placeholder="סיסמא"
                        placeholderTextColor="#92a2bd"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                  style={styles.akira}
                /> 
            </View>
                
                <Text>{'\n'}</Text>


                <View>
                    <TouchableOpacity style={styles.but} onPress={Update_Diteails}>
                        <View>
                            <Text style={styles.thachtext}>עדכן</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text>{'\n'}</Text>

                <Text style={styles.tit1}>beautyMe - see the beauty around you</Text>


            </View>
          
        </ScrollView>
        </KeyboardAvoidingView>
        <Menu_professional />
    </>
)
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    akiraContainer: {
        width: '90%',
        borderRadius: 10,
        borderColor: "rgb(204, 204, 255)"
    
      },
    inp: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f2f2f2',
        borderRadius: 10,
        // paddingHorizontal: 10,
        // marginBottom: 10,

        // flexDirection: 'row',
        // padding: 15,
        // justifyContent: 'center',
        // width: '100%',
        // borderRadius: 25,
        // height: 45,
        // marginBottom: 10,
        // borderColor: "rgb(92, 71, 205)",
        // // backgroundColor: '#ffffff',
        // border: 1
    

    },
    inputLabel: {
        flex: 1,
        textAlign: 'right',
        // marginRight: 10,
        color: '#808080',
        fontSize: 20,
      },
      textInput: {
        flex: 2,
        height: 40,
        color: '#808080',
        fontSize: 20,
      },
    textInputS: ({ title, borderColor }) => {
        return {
             height: 30,
            width: "80%",
            // margin: 10,
            borderWidth: 1,
            // padding: 10,
            color: '#808080',
            borderColor: borderColor ? 'green' : 'red',
            // height: 50,
            fontSize: 25,
            textAlign: 'right',
            fontWeight: 'bold',
            opacity: 0.5,
        }

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
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
        // padding:40,
        // alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: '#e6e6fa', // Material Design purple 200
        padding: 10,
        paddingBottom:150,
        // height: "100%"
      },
    text: {
        textAlign: 'right',
        paddingBottom: 10,

    },
    but: {
        width: 250,
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

    tit:{
        "fontSize": 35,
        "fontWeight": "500",
        "letterSpacing": 0.15,
        "lineHeight": 50,
        textShadowColor: 'rgb(92, 71, 205)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        opacity:0.7
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
            }

});



// return (

//     <>
//         {alert && alert}
//         <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
//         <ScrollView contentContainerStyle={styles.scrollView}>
//             <View style={styles.container}>
//                 {/* <Header text="עריכת פרטים אישים " coolr='rgb(92, 71, 205)' fontSize={35} /> */}
//                 <Text style={styles.tit}>עריכת פרטים אישיים</Text>
               

        
//                 <Text>{'\n'}</Text>
//                 <View style={styles.inp}>
//                     <TextInput style={styles.textInputS(CheckInput('Email', Email))}
//                         placeholder={userDetails.Email}
//                         placeholderTextColor="#92a2bd"
//                         value={Email}
//                         onChangeText={(text) => setEmail(text)}
//                     />
//                     <Text style={styles.inputLabel}>Email</Text>
//                 </View>
//                 <Text>{'\n'}</Text>

        
//                 <View style={styles.inp}>
//                     <TextInput style={styles.textInputS(false)}
//                         placeholder="פלאפון"
//                         placeholderTextColor="#92a2bd"
//                         value={phone}
//                         onChangeText={(text) => setPhone(text)}
//                     />
//                     <Text style={styles.inputLabel}>פאלפון</Text>
//                 </View>
//                 <Text>{'\n'}</Text>


//                 <View style={styles.inp}>
//                     <TextInput style={styles.textInputS(false)}
//                         placeholder="רחוב"
//                         placeholderTextColor="#92a2bd"
//                         value={AddressStreet}
//                         onChangeText={(text) => setStreet(text)}
//                     />
//                     <Text style={styles.inputLabel}>רחוב</Text>

//                 </View>
//                 <Text>{'\n'}</Text>

//                 <View style={styles.inp}>
//                     <TextInput style={styles.textInputS(false)}
//                         placeholder="עיר"
//                         placeholderTextColor="#92a2bd"
//                         value={AddressCity}
//                         onChangeText={(text) => setCity(text)}
//                     />
//                 <Text style={styles.inputLabel}>עיר</Text>
//                 </View>
//                 <Text>{'\n'}</Text>


//                 <View style={styles.inp}>
//                     <TextInput style={styles.textInputS(false)}
//                         placeholder="מספר בית"
//                         placeholderTextColor="#92a2bd"
//                         value={AddressHouseNumber}
//                         onChangeText={(text) => setHouseNumber(text)}
//                     />
//                     <Text style={styles.inputLabel}>מספר בית</Text>
//                 </View>
//                 <Text>{'\n'}</Text>


//                 <View style={styles.inp}>
//                     <TextInput style={styles.textInputS(true)}
//                         placeholder="סיסמא"
//                         placeholderTextColor="#92a2bd"
//                         value={password}
//                         onChangeText={(text) => setPassword(text)}
//                         secureTextEntry={true}
//                     />
//                     <Text style={styles.inputLabel}>סיסמה</Text>
//                 </View>
//                 <Text>{'\n'}</Text>


//                 <View>
//                     <TouchableOpacity style={styles.but} onPress={Update_Diteails}>
//                         <View>
//                             <Text style={styles.thachtext}>עדכן</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//                 <Text>{'\n'}</Text>

//                 <Text style={styles.tit1}>beautyMe - see the beauty around you</Text>


//             </View>
//         </ScrollView>
//         </KeyboardAvoidingView>
//         <Menu_professional />
//     </>
// )

