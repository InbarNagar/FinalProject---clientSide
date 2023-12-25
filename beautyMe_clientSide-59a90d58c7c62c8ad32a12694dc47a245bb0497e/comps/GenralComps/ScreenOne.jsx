import React, { useState,useEffect,useContext } from 'react';
import { StyleSheet, View, TextInput, Button, Text, marginRight, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import LogIn from './LogIn';
import Header from '../obj/Header';
import PushNofitictaion from '../PushNofitictaion';
import { UserContext } from '../UserDietails';
const ScreenOne = (props) => {

   
 

    return (

        <View style={{flex: 1}}>
           
            <Text style={style.wel} >Beauty Me</Text>
            {/* <Header text="BeautyMe" fontSize={75} height={200}/> */}

            <View >
           <Image style={style.image} source={require('../../assets/Studio.png')}/>


                 <TouchableOpacity onPress={() => {props.navigation.navigate('LogInGenral',{userType:'Pro'})


                }}>
                    <View style={style.viewS}>
                        <Text style={style.titleText}>בעלי עסקים</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => { props.navigation.navigate('LogInGenral',{userType:'Cli'})
             }}>
                    <View style={style.viewS}>
                        <Text style={style.titleText} >לקוחות</Text>
                    </View>

                </TouchableOpacity> 
            </View>
        </View>
    )
}

const style = StyleSheet.create({

    wel: {
        textAlign: "center",
        fontSize: 70,
        paddingTop: 50,
        color:'#9acd32',
    },

    titleText: {
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 40,
        backgroundColor:'#9acd32',
        color: '#f0f8ff',
        opacity: 0.5,
        

    },
    viewS: {
        borderRadius: 62,
        flexDirection: 'column',
        textAlign: 'center',
        padding: 15,
        
    },
    image:{
    width:100,
    height:100,
    padding:20
    }
})

export default ScreenOne;