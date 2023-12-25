import { StyleSheet, Text, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";

import React ,{forwardRef, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

const PickerMenu = forwardRef(({},ref)=>{
const options =[
{name:"   Take from camera",icon : <AntDesign name='camerao' size={27}/> ,onPress:()=>{} },
{name:"   Choose from gallery",icon :<MaterialCommunityIcons name='image-search-outline' size={27}/> , onPress:()=>{} }
]

//const [camera,setCamera]=useState()


return(
  <RBSheet
          ref={ref}
          height={230}
          openDuration={250}
          closeOnDragDown    
          customStyles={{
            container: {
              borderTopRightRadius:20,
              borderTopLeftRadius:20,
              alignItems: "center",
              paddingTop:15
            }
          }}
        >
          <View style={styles.warpMenu}>
          {options.map(({name,onPress,icon})=>
          <TouchableOpacity onPress={onPress} style={styles.pickOption} key={name}>
            {icon}
            <Text style={styles.text}>{name}</Text>

          </TouchableOpacity>
          
          )}
          </View>
        </RBSheet>
)

})


export default PickerMenu;

const styles = StyleSheet.create({
pickOption:{flexDirection: "row",
paddingTop:30},
warpMenu:{paddingHorizontal:20},
text:{fontSize:25}
});
