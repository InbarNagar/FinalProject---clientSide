import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


const Button = (props) => {
    const { onPress, text, color, fontSize, colortext, borderRadius, width } = props

    Button.defaultProps = {
      backgroundColor: "#98FB98",
      fontSize: 16,
      color: 'white',
      borderRadius: 10,
      alignItems: 'center',
      borderColor:"rgb(92, 71, 205)",
      borderWidth: 1,
    };

    const styles = StyleSheet.create({
      button: (color) => ({
        alignItems: 'center',
        backgroundColor: color,
        padding: 15,
        borderRadius: borderRadius,
        margin: 10,
        marginTop: 20,
        width: width,
      }),

      buttonText:(colortext) => ({
        fontSize: fontSize,
        fontWeight:'bold',
        color: colortext,
        textAlign: 'center',
        opacity: 0.5,
     }),
    });

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.button(color)}>
      <Text style={styles.buttonText(colortext)}>{text}</Text>
    </TouchableOpacity>
  );
};



export default Button;



// const styles = StyleSheet.create({
//   button: (color) => ({
//     alignItems: 'center',
//     backgroundColor: color,
//     padding: 15,
//     borderRadius: borderRadius,
//     margin: 10,
//     marginTop: 20,
//   }),
//   buttonText: {
//     fontSize: fontSize,
//     fontWeight: 'bold',
//     color: colortext,
//     textAlign: 'center',
//     opacity: 0.5,
//   },
// });