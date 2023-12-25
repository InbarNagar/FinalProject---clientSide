import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function TimeCounter(props) {
  const { initialMinute = 0, initialSeconds = 0, initialHours = 0 ,days,init=false} = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [hours, setHours] = useState(initialHours);



  useFocusEffect(
    React.useCallback(() => {
      if(init&&(hours!=initialHours||initialMinute!=minutes)){
        setMinutes(initialMinute)
        setHours(initialHours)
        setSeconds(0)
      }


      let myInterval = setInterval(() => {
        if (seconds >= 0 && seconds < 59) {
          setSeconds(seconds + 1);
        }
        if (seconds === 59) {
          if (minutes === 59) {
            setMinutes(0);
            setSeconds(0);
            setHours(hours + 1)
          }
          // else if (minutes === 0) {
          //   clearInterval(myInterval)
          // }
           else {
            setMinutes(minutes + 1);
            setSeconds(0);
          }
        }
      }, 1000)
      return () => {
        clearInterval(myInterval);
      };
    }))

  return (
    <View style={styles.container}>
      {minutes === 0 && seconds === 0 && hours===0?<></> :
        <Text style={styles.text}>{days&&days>0?days+' days ' :''}{hours<10?`0${hours}`:hours}:{minutes < 10 ?`0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} ago</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    alignItems:'center',
  },text:{
fontSize:30,
fontWeight:'bold',
color:'#1ea6d6',
textShadowColor: 'white',
textShadowOffset: { width: 2, height: 2 },
textShadowRadius: 3,
  }
})