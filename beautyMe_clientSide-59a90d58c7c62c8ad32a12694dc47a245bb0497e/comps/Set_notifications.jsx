// import { View, Text,StyleSheet } from 'react-native'
// import React from 'react'
// import { ScrollView } from 'react-native-gesture-handler'
// import Button from './obj/Button'
// import Header from './obj/Header'
// import { RadioButton } from "react-native-paper";
// import { useState } from 'react'

// export default function Set_notifications() {
//     const [appointment_update, setSelected_appointmentupdate] = useState('onceINday');
//     return (
//         <ScrollView>
//             <Header text=" הגדרת התראות" color='#9acd32' fontSize='35' />
//             <View style={styles.container}>
//             <View>
//                 <Text>הזנת תורים פנויים</Text>
//                 <View style={styles.viewRadio}>
//                     <RadioButton
//                         value="onceINday"
//                         status={appointment_update === 'onceINday' ? 'checked' : 'unchecked'}
//                         onPress={() => setSelected_appointmentupdate('onceINday')}
//                         color={'#8B10AE'}
//                     />
//                 <Text> פעם אחת ביום</Text></View>

//                 <View style={styles.viewRadio}>
//                     <RadioButton
//                         value="onceIn2days"
//                         status={appointment_update === 'onceIn2days' ? 'checked' : 'unchecked'}
//                         onPress={() =>setSelected_appointmentupdate('onceIn2days')}
//                         color={'#8B10AE'}
//                     />
//                 <Text> פעם ביומיים</Text></View>

//                 <View style={styles.viewRadio}>
//                     <RadioButton
//                         value="onceIn3days"
//                         status={appointment_update === 'onceIn3days' ? 'checked' : 'unchecked'}
//                         onPress={() => setSelected_appointmentupdate('onceIn3days')}
//                         color={'#8B10AE'}
//                     />
//                 <Text> פעם בשלושה ימים</Text></View>

//                 <View style={styles.viewRadio}>
//                     <RadioButton
//                         value="onceINweek"
//                         status={appointment_update === 'onceINweek' ? 'checked' : 'unchecked'}
//                         onPress={() =>setSelected_appointmentupdate('onceINweek')}
//                         color={'#8B10AE'}
//                     />
//                 <Text> פעם אחת בשבוע </Text></View>
//             </View>
//             <View>
//                 <Text>התראה על עדכון תורים</Text>
//             </View>
//             <View >
//                 <Text>אישור תורים</Text>
//             </View>


//             <Button text="שמור הגדרות"></Button>
//             </View>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'column',
//         backgroundColor: '#fffaf0',
//         flex: 12,
//        alignItems: 'center',
//     },
//     View:{
//         flex:4,
//         flexDirection: 'column',
//     },

//     viewRadio: {
//          marginBottom: 5 ,
//         flexDirection: 'row',
//     }

// });

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './obj/Button';

const Set_notifications = () => {
  const [appointment_update, setSelected_appointmentupdate] = useState('onceINday');
  const [Alert_appointment,set_Alert_appointment ] = useState('onceINhour');
  const [Automatic_approval,set_Automatic_approval ] = useState('Automatic');

  const RadioButton = ({ value, text }) => (
    <TouchableOpacity style={styles.radioButton} onPress={() =>setSelected_appointmentupdate(value)}>
      <View style={styles.radioButtonIcon}>
        {appointment_update === value && <Icon name="radiobox-marked" size={24} color="#8B10AE" />}
        {appointment_update !== value && <Icon name="radiobox-blank" size={24} color="#8B10AE" />}
      </View>
      <Text style={styles.radioButtonText}>{text}</Text>
    </TouchableOpacity>
    
  );

  const RadioButton2 = ({ value, text }) => (
    <TouchableOpacity style={styles.radioButton} onPress={() =>set_Alert_appointment(value)}>
      <View style={styles.radioButtonIcon}>
        {Alert_appointment === value && <Icon name="radiobox-marked" size={24} color="#8B10AE" />}
        {Alert_appointment !== value && <Icon name="radiobox-blank" size={24} color="#8B10AE" />}
      </View>
      <Text style={styles.radioButtonText}>{text}</Text>
  </TouchableOpacity>
);

const RadioButton3 = ({ value, text }) => (
    <TouchableOpacity style={styles.radioButton} onPress={() =>set_Automatic_approval(value)}>
      <View style={styles.radioButtonIcon}>
        {Automatic_approval === value && <Icon name="radiobox-marked" size={24} color="#8B10AE" />}
        {Automatic_approval !== value && <Icon name="radiobox-blank" size={24} color="#8B10AE" />}
      </View>
      <Text style={styles.radioButtonText}>{text}</Text>
    </TouchableOpacity>
    
  );
console.log({Automatic_approval},"*****");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>  הזנת תורים פנויים:</Text>
      <RadioButton value="onceINday" text="פעם ביום" />
      <RadioButton value="onceIn2days" text=" פעם ביומיים" />
      <RadioButton value="onceIn3days" text=" פעם בשלושה ימים" />
      <RadioButton value="onceInWeek" text=" פעם בשבוע" />


      <Text style={styles.title}>   שלחו לי התראות על תורים שעדיין פנויים:</Text>
      <RadioButton2 value="onceINhour" text="כל שעה עגולה" />
      <RadioButton2 value="twiceAday" text="פעמיים ביום- בוקר וצהריים" />
      <RadioButton2 value="3timesAday" text="שלוש פעמים ביום -בוקר צהריים וערב" />
      <RadioButton2 value="onceInMorning" text="פעם ביום בבוקר " />
      <RadioButton2 value="onceInAfternon" text="פעם ביום בצהריים" />
      <RadioButton2 value="onceInevning" text="פעם ביום בערב" />

      <Text style={styles.title}>  אישור תורים: </Text>
      <RadioButton3 value="Automatic" text=" אישור אוטומטי " />
      <RadioButton3 value="manual" text="אישור ידני עבור כל תור" />


      <Button color="#8B10AE" text="שמור"></Button>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
   
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'right'
  },
  radioButton: {
    flexDirection: 'row',
    marginBottom: 10,
    flexDirection: 'row-reverse'
    
  },
  radioButtonIcon: {
    marginRight: 10,
    alignItems: 'center',
    
  },
  radioButtonText: {
    fontSize: 16,
  },
});

export default Set_notifications;