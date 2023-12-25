import React, {useContext, useEffect, useState} from "react";
import {View, Text, TouchableOpacity, Linking, StyleSheet, Image, BackHandler, Alert} from "react-native";
import {Button} from 'react-native-elements';
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../UserDietails";
import { exp } from "react-native-reanimated";
import { useNavigation} from "@react-navigation/core";
import { DeleteClient } from "../obj/FunctionAPICode";
import { TextInput } from "react-native-gesture-handler";
import { string } from "prop-types";
import { useFocusEffect } from '@react-navigation/native';
import { openURL, canOpenURL } from "expo-linking";
import Menu_Client from "../obj/Menu_Client";




const ClientProfile = (Props) => {

  // זה של התמונת פרופיל
  const [src, setsrc] = useState()
  useFocusEffect(
      React.useCallback(() => {
     setsrc(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${userDetails.ID_number}.jpg`)
     console.log(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${userDetails.ID_number}.jpg`)
    },[]))
    
  const { userDetails, setUserDetails } = useContext(UserContext);
const navigation=useNavigation();
useEffect(()=>{
  console.log("profile cli = "+JSON.stringify(userDetails));
},[])

const handleInstagramLink = async () => {
  try {
    // const url = 'https://www.instagram.com/your_instagram_account';
    const url = `https://www.instagram.com/${userDetails.Instagram_link}`;
    await Linking.openURL(url);
    console.log(Linking.openURL(url))
  } catch (error) {
    console.error('שגיאה בפתיחת האינסטגרם:', error);
  }
};
const handleFacebookLink = async () => {
  try {
    // const url = 'https://www.instagram.com/your_instagram_account';
    const url = `${userDetails.Facebook_link}`;
    await Linking.openURL(url);
    console.log(Linking.openURL(url))
  } catch (error) {
    console.error('שגיאה בפתיחת הפייסבוק:', error);
  }
};

const dialNumber = (number) => { //אם לא עובד זה כי צריך לאשר בהגדרות שימוש בטלפון לאפליקציה
  console.log(number);
  let phoneNumber = "";

  if (Platform.OS === "android") {
    console.log(Platform.OS);
    phoneNumber = `tel:${number}`;
  } else {
    console.log(Platform.OS);
    phoneNumber = `telprompt:${number}`;
  }
  canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        alert("Phone number is not available");
      } else {
        return openURL(phoneNumber);
      }
    })
    .catch((err) => console.error("error!", err));
};

  
  const ClientData = userDetails;

  
  const [deleteSection, SetDeleteSection] = useState(false);
  const[confirmID,SetConfirmID]=useState('');
  const handleDeleteSection = () => SetDeleteSection(prevState => !prevState);
  function exitApp() {
    BackHandler.exitApp();
    return true;
}

function deleteAccount() {
  if(confirmID==="DELETE"){
    console.log("starting to delete account");
    DeleteClient(ClientData.ID_number).then(
    (result) => {
      console.log(`client ${ClientData.ID_number} DELETED! `);
      console.log(result.data);
      
      exitApp();
    },
    (error) => {
      console.log("error", error);
      // Handle error, including finding a way to display to the user that deletion failed.
    }
  );
}
else{
  console.log("confirmation didn't operate correctly");
  Alert.alert("confirmation of ID was wrong!")
}
}
  return (
    <>
    <View style={styles.container}>

   
    <View style={styles.view}>

    <View style={styles.view1}>
           <Text style={styles.tit}> שלום {userDetails.First_name}</Text>
         



{/* העליון לא נכון!! התחתון אמור לעבוד אבל לא מצליח למצוא את התמונה של אם אין תמונת פרופיל אז לא יכולה בנתיים לבדוק את זה */}
{/* <TouchableOpacity onPress={() => Props.navigation.navigate('CameraUse', { imageName: "profil" + userDetails.ID_number })}>
  {src ? (
    <Image style={styles.img} source={{ uri: src }} />
  ) : (
    <Image style={styles.img} onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} source={{ uri: src }} />
  )}
</TouchableOpacity> */}


<TouchableOpacity onPress={() => navigation.navigate('CameraUse', { imageName: "profil" + userDetails.ID_number })}>
  <Image style={styles.img} onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} source={{ uri: src }} />
</TouchableOpacity>

<View style={styles.iconContainer}> 
<TouchableOpacity onPress={handleInstagramLink}>
<FontAwesome name="instagram" size={24} color="black" style={{ marginRight: 100 }} />
</TouchableOpacity>
<TouchableOpacity onPress={handleFacebookLink}>
<Feather name="facebook" size={24} color="black" style={{ marginRight: 100 }}/>
{/* <FontAwesome name="facebook" size={24} color="black"  /> */}
</TouchableOpacity>
<TouchableOpacity
  style={styles.link}
  onPress={() => dialNumber(userDetails.phone)}
>
  <AntDesign name="phone" size={24} color="black" />
</TouchableOpacity>
</View>

    </View>

{/* <View style={styles.container}> */}


    <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Update_ClientDetailes')} >

        <Text style={styles.buttonText}>עריכת פרטים אישים </Text>
    </TouchableOpacity>
    <Button title="מחיקת חשבון" onPress={handleDeleteSection} buttonStyle={{backgroundColor:'red',margin:10}}/>
    {deleteSection &&
       <View>
        <Text>כדי למחוק את החשבון יש לכתוב DELETE</Text>
        <TextInput placeholder="כתוב DELETE" value={confirmID} onChangeText={(value)=>SetConfirmID(value)}/>
      <TouchableOpacity onPress={deleteAccount}>
      <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
      </View>}
    {/* </View> */}
    </View>
    </View>
    <Menu_Client/>

    </>


    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6fa',
    // paddingTop: 20,
    marginTop: 0,
    // paddingBottom:500,
  },
  view: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#e6e6fa',
    padding:10,
    marginTop:0,
    // height: '100%',
},
view1:{
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding:10,
  
  // backgroundColor: '#e6e6fa',
  
},
button: {
    alignItems: 'center',
    backgroundColor: "rgb(92, 71, 205)",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
},
button1: {
  alignItems: 'center',
  backgroundColor: "red",
  padding: 10,
  marginTop: 10,
  borderRadius: 5,
  width: '100%',
},
buttonText: {
    color: '#fff',
    fontSize: 20,
},
img: {
    borderRadius: 150,
    marginBottom: 20,
    width: 250,
    height: 250,
},

greeting: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
tit:{
"fontSize": 40,
"fontWeight": "500",
"letterSpacing": 0.15,
"lineHeight": 50,
textShadowColor: 'rgb(92, 71, 205)',
textShadowOffset: { width: 2, height: 2 },
textShadowRadius: 5,
opacity:0.7
},
iconContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    // width: "50%",
    marginTop: 10,
    marginBottom: 10,
  },
});
export default ClientProfile;































/////////////////////////// הגרסה שהייתה לפני התחלת עיצוב וסידור
// import { React, useContext, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Linking,
//   StyleSheet,
//   Image,
//   BackHandler,
//   Alert
// } from "react-native";
// import {Button} from 'react-native-elements';
// import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
// import { UserContext } from "../UserDietails";
// import { exp } from "react-native-reanimated";
// import { useNavigation } from "@react-navigation/native";
// import { DeleteClient } from "../obj/FunctionAPICode";
// import { TextInput } from "react-native-gesture-handler";
// import { string } from "prop-types";

// const ClientProfile = (props) => {
//   const navigation = useNavigation();

//   const { userDetails, setUserDetails } = useContext(UserContext);
//   const ClientData = userDetails;

//   const handleFacebookLink = () => {
//     Linking.openURL(ClientData.Facebook_link); // לשים משתנה של כתובת פייסבוק שהמשתמש יזין
//   };

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

// function deleteAccount() {
//   if(confirmID==="DELETE"){
//     console.log("starting to delete account");
//     DeleteClient(ClientData.ID_number).then(
//     (result) => {
//       console.log(`client ${ClientData.ID_number} DELETED! `);
//       console.log(result.data);
      
//       exitApp();
//     },
//     (error) => {
//       console.log("error", error);
//       // Handle error, including finding a way to display to the user that deletion failed.
//     }
//   );
// }
// else{
//   console.log("confirmation didn't operate correctly");
//   Alert.alert("confirmation of ID was wrong!")
// }
// }
//   return (
//     <View style={styles.container}>
//       <Image
//         // source={require("")}
//         style={styles.profilePicture}
//       />
//       <View style={styles.iconContainer}>
//         <TouchableOpacity onPress={handleInstagramLink}>
//           <FontAwesome name="instagram" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleFacebookLink}>
//           <FontAwesome name="facebook-square" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.name}>
//         {ClientData.First_name + " " + ClientData.Last_name}
//       </Text>
//       <Text style={styles.address}>
//         {ClientData.AddressStreet +
//           " " +
//           ClientData.AddressHouseNumber +
//           ", " +
//           ClientData.AddressCity}
//       </Text>
//       <Button
//         title="עריכת פרופיל"
//         onPress={() => navigation.navigate("Update_ClientDetailes")}
//       />
//       <Button title="מחיקת חשבון" onPress={handleDeleteSection} buttonStyle={{backgroundColor:'red'}}/>
//       {deleteSection &&
//        <View>
//         <Text>כדי למחוק את החשבון יש לכתוב DELETE</Text>
//         <TextInput placeholder="כתוב DELETE" value={confirmID} onChangeText={(value)=>SetConfirmID(value)}/>
//       <TouchableOpacity onPress={deleteAccount}>
//       <AntDesign name="delete" size={24} color="black" />
//       </TouchableOpacity>
//       </View>}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     paddingTop: 10,
//   },
//   profilePicture: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   iconContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "50%",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   address: {
//     fontSize: 14,
//     textAlign: "center",
//   },
// });
// export default ClientProfile;
