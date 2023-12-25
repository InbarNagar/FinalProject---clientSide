import React, { useContext, useEffect, useState } from "react";
import { Alert, View, Button, Text, StyleSheet, } from "react-native";
import { UserContext } from "../UserDietails";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';







const AvailableAppointmentForTreatment = (props) => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { result, title, key, onPress } = props;
//   const { Name, Type_treatment_Number } = result; // מפצל את התכונות מתוך אובייקט ה-'result'


  const navigation = useNavigation();

//   useEffect(()=>{
// console.log(result, title, "12121212120000000000000000000000000000000000000")
// // console.log(Name, Type_treatment_Number, "######")

// },[])
   
// function handle(){
//     navigation.navigate('AvailableAppointmentForTreatmentAndCity',{treatmentName:result.Type_treatment_Number})
// }


  
  return (





//   <View style={styles.container} key={result.Type_treatment_Number}>
    <View style={styles.container} >

     <View style={styles.containerBut}>
            <TouchableOpacity style={styles.but} onPress={onPress} >
            {/* <TouchableOpacity style={styles.but}  onPress={handle} > */}

              <View style={styles.buttonContent}>
                <Text style={styles.thachtext}>{title}</Text>
              </View>
            </TouchableOpacity>
          </View>
    </View>


    // <View style={styles.container} key={result.Type_treatment_Number}>
    //  <View style={styles.containerBut}>
    //         <TouchableOpacity style={styles.but}  onPress={() => navigation.navigate('AvailableAppointmentForTreatmentAndCity',{treatmentName:result.Type_treatment_Number})} >
    //         {/* <TouchableOpacity style={styles.but}  onPress={handle} > */}

    //           <View style={styles.buttonContent}>
    //             <Text style={styles.thachtext}>{result.Name}</Text>
    //           </View>
    //         </TouchableOpacity>
    //       </View>
    // </View>

    //  {/* <View style={styles.container} key={result.id}> */}
    //  <View style={styles.containerBut}>
            // <TouchableOpacity style={styles.but}  onPress={() => navigation.navigate('AvailableAppointmentForTreatmentAndCity',{treatmentName:result.Type_treatment_Number})} > 
            // {/* <TouchableOpacity style={styles.but}  onPress={()=>props.navigation.navigate('AvailableAppointmentForTreatmentAndCity',{treatmentName:result.Type_treatment_Number, city:userDetails.AddressCity})} > */}

//               <View style={styles.buttonContent}>
//                 <Text style={styles.thachtext}>{title}</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//   </View>


//     <TouchableOpacity style={styles.but}  onPress={() => navigation.navigate('AvailableAppointmentForTreatmentAndCity',{treatmentName:result.Type_treatment_Number})} >

// <View style={styles.container} >
//      <View style={styles.containerBut}>
//             {/* <TouchableOpacity style={styles.but}  onPress={()=>props.navigation.navigate('AvailableAppointmentForTreatmentAndCity',{treatmentName:result.Type_treatment_Number, city:userDetails.AddressCity})} > */}

//               <View style={styles.buttonContent}>
//                 <Text style={styles.thachtext}>{title}</Text>
//               </View>
//           </View>
//     </View>
//     </TouchableOpacity>

  );
};
export default AvailableAppointmentForTreatment;

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10, // Adjust the margin as needed
  },
  buttonStyle: {
    backgroundColor: "rgb(92, 71, 205)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    width: "45%",
  },
  buttonTitle: {
    fontWeight: "bold",
    color: "white",
  },
});
