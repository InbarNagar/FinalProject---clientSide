import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';


export default function Button(props) {

    const { flex=1,element,text, onPress, width, height, radius, textSize, justifyContent, alignItems,color,borderColor } = props

    return (
        <View style={styles.possition(justifyContent, alignItems,flex)}>
            <TouchableOpacity
                onPress={onPress}
       
                style={styles.button(width, height, radius,color,borderColor)}
            >
             
                {element? element:<></>}

                {text?<Text
                style={styles.btntext(textSize)}
                >{text}
                </Text>:<></>}
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    possition: (justifyContent = '', alignItems = '',flex) => {
        return {
            flex: flex,
            justifyContent: justifyContent,
            alignItems: alignItems,
            shadowOffset: {
                width: -1,
                height: 1
              },
            //   shadowColor:'#D1D1D1',
              shadowColor:'#575454',
              shadowOpacity:10,
        }
    },
    //generic bottom style
    button: (size = 15, height = 4, radius = 30,color="rgb(92, 71, 205)",borderColor='white') => {
        return {
            borderWidth: 1,
            borderRadius: radius,
            backgroundColor: color,
            paddingTop: height + '%',
            paddingBottom: height + '%',
            paddingRight: size + '%',
            paddingLeft: size + '%',
            borderColor: borderColor,
        }
    },
    btntext: (textSize = 18) => {
        return {
            color: 'white',
            fontSize: textSize,
        }
    },
    logo: ( logoHeight= 40, logoWidth=40)=>{
        return{
            height:logoHeight,
            width:logoWidth,   
        }
    }
    
});