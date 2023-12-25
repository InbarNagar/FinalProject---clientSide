import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
import PopUp from './PopUp'
// import { ImageUri } from '../Routes/Url';




export default function Loading(props) {
  const { opacity = '#e6e6fa', text } = props

  const element = <View style={styles.container}>
    <ImageBackground source={require('./logoo.png')} style={styles.image} resizeMode='contain' >
      <Progress.Bar useNativeDriver={true}
                borderWidth={2}
                indeterminate={true}
                animationConfig={{ bounciness: 20 }}
                 progress={0.1}
                  indeterminateAnimationDuration={700} 
                  size={200}  style={styles.bar} color='rgb(92, 71, 205)' />
      {text && <Text style={{ position: 'relative', top: '95%', flexWrap: 'wrap', fontSize: 18, textAlign: 'center' }}>{text}</Text>}
    </ImageBackground>
  </View>;


  return (<PopUp
    width={200}
    height={200}
    animationType='fade'
    backgroundColor={opacity}
    isButton={false}
    element={element}
  />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height:150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',

  }, progress: (top) => {
    return {
      alignItems: 'flex-end',
      top: top + '%'
    }
  },
  bar:{
    position:'absolute',
    top:175,
   borderColor:"rgb(92, 71, 205)",
  }
})