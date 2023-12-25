import { View, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Constants } from 'expo-constants';
import Button from '../CTools/Button';
import { Ionicons } from '@expo/vector-icons';

export default function GalleryPick(props,{navigation}) {
  const {description=true}=props

  
  //let urlImage = props.route.params.urlImage;

  const [image, setImage] = useState(null);

  //waiting for permision
  
  useEffect(() => {
    (async ()=>{
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log(status);
        alert('permission denied!')
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
      quality: 1
    })
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

//Todo change icon and text
 return (
    <View style={styles.container}>
     <TouchableOpacity style={styles.pic} onPress={PickImage}>
        {image==null ? <Image style={styles.img} source={require('../../images/blankProfilePicture.png')}/>: 
        <Image source={{ uri: image }} style={styles.img} /> }
        <View style={styles.icon}><Ionicons name="camera-reverse-outline"  size={25}  /></View>
        {description&&<Text style={{alignSelf: 'center',justifyContent:'flex-start' }}>Tap To Edit </Text>}
      </TouchableOpacity>

      <Button text='DONE'
      style={styles.button}
    // onPress={() => navigation.navigate({name:'PersonalInfo1',imageUrl:image})}
      onPress={()=> {navigation.navigatwe('PersonalInfo1')}}
      /> 

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img:{
    height: 250,
    width: 250,
    borderRadius: 1000,
    
  },
  pic: { justifyContent: 'center', flex: 1 },
 // button: { justifyContent: 'flex-end' },
  icon: { justifyContent:'flex-start',alignSelf: 'center',borderRadius:1000,padding:'1%',position:'relative',bottom:'1%' }

});
