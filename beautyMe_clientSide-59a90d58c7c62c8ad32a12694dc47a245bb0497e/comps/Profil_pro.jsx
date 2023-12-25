import React, { useContext, useEffect,useState } from 'react';
import {Modal,ScrollView,Button,TextInput,StyleSheet,BackHandler, View, Text,TouchableOpacity, Image, Linking} from 'react-native';
import Menu_professional from './obj/Menu_professional';
import { UserContext } from './UserDietails';
import Header from './obj/Header';
// import Button from './obj/Button';
import { useNavigation} from "@react-navigation/core";
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { openURL, canOpenURL } from "expo-linking";
import Loading from './CTools/Loading';
import { DeleteClient, DeleteProAndBusiness } from './obj/FunctionAPICode';
import Icon from 'react-native-vector-icons/FontAwesome';



const Profil_pro = (Props) => {
  const [showLoading,setshowLoading]=useState(true)
    const [src, setsrc] = useState('');
    useFocusEffect(     
        React.useCallback(() => {
            setshowLoading(true)
       setsrc(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${userDetails.ID_number}.jpg`)
       setInterval(() => {
        showLoading&&setshowLoading(false)
       },2000);
      },[]))
      
    const { userDetails, setUserDetails } = useContext(UserContext);
const navigation=useNavigation();
useEffect(()=>{

    console.log("profile pro = "+JSON.stringify(userDetails));
   
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

  const dialNumber = (number) => { //לא עובד כי בתחלה לא אישרתי להשתמש בטלפון בהגדרות אפליקציה
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
    DeleteProAndBusiness(userDetails.ID_number).then(
    (result) => {
      console.log(`client ${userDetails.ID_number} DELETED! `);
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

  <View style={styles.view}>
      <View style={styles.view1}>
          <Text style={styles.tit}> שלום {userDetails.First_name}</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('CameraUse',{imageName:"profil"+userDetails.ID_number})}> 
              <Image style={styles.img} onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} source={{ uri: src }} />
          </TouchableOpacity>
          <View style={styles.iconContainer}> 
              <TouchableOpacity style={styles.link} onPress={handleInstagramLink}>
                  <FontAwesome name="instagram" size={24} color="black" style={{ marginRight: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity
             
             onPress={() => Linking.openURL(userDetails.Facebook_link)}
           > 
           <Feather name="facebook" size={24} color="black" style={{ marginRight:50 }}/>  
           </TouchableOpacity>
              <TouchableOpacity
                  style={styles.link}
                  onPress={() => dialNumber(userDetails.phone)}
              >
                  <AntDesign name="phone" size={24} color="black" />
              </TouchableOpacity>

       
          </View>
      </View>
      <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Update_personal_details_Professional')} >
              <Text style={styles.buttonText}>עריכת פרטים אישים </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Update_personal_details_Bussines')}>
              <Text style={styles.buttonText}> עריכת פרטי העסק  </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('ShowReviews',{BusinessNumber:JSON.stringify(userDetails.Business_Number)})}>
              <Text style={styles.buttonText}> צפייה בביקורות על העסק </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('Update_MenuTreatment')}>
              <Text style={styles.buttonText}>הוספת טיפול לתפריט הטיפולים</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Photos_BUS')}>            
              <Text style={styles.buttonText}>הוספת תמונה לאלבום תמונות</Text>           
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleDeleteSection}>            
              <Text style={styles.deleteButtonText}> מחיקת חשבון</Text>           
          </TouchableOpacity>
          {/* <Button title="מחיקת חשבון" onPress={handleDeleteSection} buttonStyle={{backgroundColor:'red'}}/> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteSection}
          onRequestClose={() => {
            SetDeleteSection(!deleteSection);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>כדי למחוק את החשבון יש לכתוב DELETE</Text>
              <TextInput placeholder="כתוב DELETE" value={confirmID} onChangeText={(value)=>SetConfirmID(value)}/>
              <TouchableOpacity onPress={deleteAccount}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
              <Button
                title="Close"
                onPress={() => SetDeleteSection(!deleteSection)}
              />
            </View>
          </View>
        </Modal>
      </View>
      <Menu_professional />
      {showLoading && <TouchableOpacity onPress={()=>setshowLoading(!showLoading)}><Loading text='מביא את נתוני בעל העסק'/></TouchableOpacity>}
  </View>

)
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#f8f8ff',
        opacity: 0.9,
        // borderColor: '#800080',
        // borderWidth: 2,
        // borderRadius: 10,
        width: '90%',
        height: '40%',
        
    },
    view: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6fa',
        paddingTop:20,
        marginTop:0,
    },
    button: {
        alignItems: 'center',
        backgroundColor: "rgb(92, 71, 205)",
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '100%',
    },
    deleteButton: {
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
    deleteButtonText: {
      color: 'red',
      fontSize: 20,
  },
    img: {
        borderRadius: 150,
        marginBottom: 20,
        width: 250,
        height: 250,
    },
    view1:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6fa',
        
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

export default Profil_pro; 