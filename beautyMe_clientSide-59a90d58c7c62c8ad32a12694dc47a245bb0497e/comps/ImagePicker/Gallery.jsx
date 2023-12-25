import {Alert, View, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect,useContext } from 'react';
import * as ImagePicker from 'expo-image-picker'
import Button from '../CTools/Button';
import { Ionicons } from '@expo/vector-icons';
import PopUp from '../CTools/PopUp';
import * as Progress from 'react-native-progress';
import { Baseurl } from '../obj/Config';
import { useFocusEffect } from '@react-navigation/native';
import { SetPhoto } from '../obj/FunctionAPICode';
export default function Gallery(props) {
  const {description=true, picUri ,setShow,imageName,setDonePicture}=props


  //const {userDetails, setUserDetails} = useContext(UserContext);
  const [image, setImage] = useState(picUri);
  const [loading, setLoading] = useState(false);
  const [Business_Number,setBusiness_Number]=useState();

  useFocusEffect(
    React.useCallback(() => {
    if(imageName.startsWith("REVIEW")){
      let id=imageName.replace("REVIEW","")
      setBusiness_Number(id)
  }
  },[]))
 
  // useEffect(() => {
  //    if(imageName.startsWith("REVIEW")&&Business_Number){
  //     let id=imageName.replace("REVIEW","")
  //     SetPhoto({Business_number:id,url_photo:imageName}).then((res) => {
  //       console.log(res)
  //     }).catch(err => {console.log('err upload= ' + err);     
   
  // });
  // }
    
  // }, [Business_Number])


  //waiting for permision
  useEffect(() => {
    (async ()=>{
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log(status);
        Alert.alert('oops..','permission denied!')
      }
    }
  })
  }, [])


    
    
  //choose *only* picture
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    })
    console.log('ImagePicker=>',result);
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

const btnImgUpload=()=>{
  //upload user picture
console.log('waiting for answer: ');
if(imageName.startsWith("REVIEW")){
  ImgUpload(`${image}`
   ,`${imageName+Date.now()+Math.random().toString(36).substring(2)}.jpg`)
}
else{
  ImgUpload(`${image}`
   ,`${imageName}.jpg`)
}

  
 //imageName=='ingredientPic' || imageName=='recipePic' 
  //complite code for recipe and imgredient 
}


const ImgUpload = (imgUri, picName) => {
  let dataI = new FormData();
  dataI.append('picture', {
  uri: imgUri,
  name: picName,
  type: 'image/jpg',
 
  });
  const config = {
    method: 'POST',
    body: dataI,
    }
     setLoading(true)
    fetch(Baseurl+"uploadpicture", config)
    .then((res) => {
     
      console.log("**********************^^^^^^^^^^^^",config)
    if (res.status == 201) {console.log('resStatus=>',res.status);return res.json(); }
    else {console.log(res.status);return res.err;}
    })
    .then(async(responseData) => {
      if(imageName.startsWith("REVIEW")){
           
           await SetPhoto({Business_number:Business_Number,url_photo:picName}).then((res) => {
              console.log(res)
            }).catch(err => {console.log('err upload= ' + err);     
         
        });
        }
      console.log('responsData=>',responseData);
    if (responseData != "err") {
      
      console.log("LOGpicName1=> ",picName)

    console.log("img uploaded successfully!");   
    setLoading(false)
   setDonePicture(true)
   setShow(false)
   setBusiness_Number(true);
   console.log('DONE!');
  //  if(userDetails&&(picName.startsWith("profileDoctor")||picName.startsWith("profilePatient"))){
  //   setUserDetails({
  //     id:userDetails.id,
  //     name:userDetails.name,
  //     image:picName
  //   })
  //  }
    }
    else {alert('error uploding ...');
    setLoading(false)
  }
    })
    .catch(err => {console.log('err upload= ' + err);     
    setLoading(false)
  });
  }

 return (
<>
<PopUp style={styles.container}
setShow={(isShow)=>setShow(isShow)}
width={100}
height={100}

element={ 
  <>    
    <Text style={styles.title()}> {imageName.includes("Ingredient")?'Ingredient':imageName.includes("REVIEW")?'ביקורת':'הוספת תמונה'}  
    </Text>
<TouchableOpacity style={styles.pic} onPress={PickImage}>
       {image==null ?
         <Image style={styles.img} source={require('../../assets/profilUser.jpeg')}/>: 
          <Image style={styles.img} source={{uri:image}}  /> }         
        <View style={styles.icon}><Ionicons name="camera-reverse-outline"  size={25}  /></View>
        {description&&<Text style={{alignSelf: 'center',justifyContent:'flex-start' }}>בחר תמונה </Text>}
      </TouchableOpacity>

<Button text='העלה תמונה'
style={styles.button}
onPress={image?btnImgUpload:alert('לא נבחרה תמונה')}
/> 
{ loading && <View >
            <Progress.CircleSnail
              // width={255}
              // height={15}
              // borderRadius={5}
               borderColor={"rgb(92, 71, 205)"}
               color="rgb(92, 71, 205)" //#FFCF84-orange
               useNativeDriver={true}
              // borderWidth={2}
              // indeterminate={true}
               //animationConfig={{ bounciness: 20 }}
              size={30} indeterminate={true}
              
            />
          </View>}
</>
}
button_txt='ביטול'
backgroundColor="white"
button_height='4'
/>
 </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
    
  },
  img:{
    height: 250,
    width: 250,
    borderRadius: 1000,
    
  },
  pic: { justifyContent: 'center', flex: 1,marginBottom:'30%' },
 button: {},
  icon: { justifyContent:'flex-start',alignSelf: 'center',borderRadius:1000,padding:'1%',position:'relative',bottom:'1%' },
  title: (paddingRight =0, title_size = 30) => {
    return {
    fontSize: title_size,
      width: '100%',
      height: '100%',
      textAlign: 'center',
      paddingRight: paddingRight + '%',
      paddingTop: '20%',
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'rgb(92, 71, 205)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
      justifyContent:'flex-start',
      alignItems:'flex-end',
      flex:0.8,

    }
  },
});
