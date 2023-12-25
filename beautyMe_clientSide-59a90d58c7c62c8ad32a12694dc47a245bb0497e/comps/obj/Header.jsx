import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    const {text, color, fontSize, backgroundColor, height, paddingTop, marginTop} = props

    Header.defaultProps = {
      backgroundColor: 'transparent',
      fontSize: 30,
      color: 'white',
      height: 80,
      paddingTop: 10,
      marginTop:10
    };
    
    const styles = StyleSheet.create({
      header: {
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: backgroundColor,
        height: height,
        paddingTop: paddingTop,
        marginTop: marginTop,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
      },
      headerText: {
        fontSize:fontSize,
        // fontWeight: 'bold',
        color: color,
        textAlign: 'center',
        "letterSpacing": 0.15,
        "fontWeight": "500",
        "lineHeight": 50,
        textShadowColor: 'rgb(92, 71, 205)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        opacity:0.7

      }

      
      
    });

  return (
    <View style={styles.header}>
        <Text style={styles.headerText}>{text}</Text>
        {/* <Text style={[styles.headerText, { color, fontSize }]}>{text}</Text> */}
    </View>
  );
};



export default Header;

