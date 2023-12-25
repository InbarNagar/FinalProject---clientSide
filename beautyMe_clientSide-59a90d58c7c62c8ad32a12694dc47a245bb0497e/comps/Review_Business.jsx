
// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Button } from "react-native";
// import { Rating } from "react-native-ratings";

// export default function Review_Business() {

//   const [cleanliness, setCleanliness] = useState(3);
//   const [service, setService] = useState(3);
//   const [comments, setComments] = useState("");
//   const [product, setProduct] = useState(3); 

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>דרג את העסק</Text>

//       <Text style={styles.subtitle}>ניקיון:</Text>
//       <Rating
//         imageSize={20}
//         onFinishRating={setCleanliness}
//         style={styles.rating}
//         startingValue={cleanliness}
//       />

//       <Text style={styles.subtitle}>שירות:</Text>
//       <Rating
//         imageSize={20}
//         onFinishRating={setService}
//         style={styles.rating}
//         startingValue={service}
//       />

//       <Text style={styles.subtitle}>מוצר:</Text> 
//       <Rating
//         imageSize={20}
//         onFinishRating={setProduct}
//         style={styles.rating}
//         startingValue={product}
//       />

//       <Text style={styles.subtitle}>הערות:</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setComments}
//         value={comments}
//         multiline
//       />

//       <Button
//         title="שלח דירוג"
//         // בעת לחיצה על הכפתור, אנחנו מדפיסים את כל הדירוגים וההערות לקונסולה.
//         // במקום זאת, אתה תרצה לשלוח את הדירוגים ל
//         onPress={() => {
//             console.log(`ניקיון: ${cleanliness}`);
//             console.log(`שירות: ${service}`);
//             console.log(`מוצר: ${product}`);
//             console.log(`הערות: ${comments}`);
//           }}
//         />
//       </View>
//     );
//   }

//   // זהו העיצוב של הרכיב. ניתן לשנות את הערכים האלה כדי לשנות את המראה והתחושה של הרכיב.
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       padding: 20,
//       backgroundColor: "#f5f5f5"
//     },
//     title: {
//       fontSize: 24,
//       marginBottom: 20,
//       textAlign: "center"
//     },
//     subtitle: {
//       fontSize: 18,
//       marginTop: 20
//     },
//     rating: {
//       alignSelf: "center",
//       marginBottom: 20
//     },
//     input: {
//       height: 100,
//       borderColor: "gray",
//       borderWidth: 1,
//       marginTop: 10,
//       marginBottom: 20,
//       padding: 10
//     }
//   });


import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity ,Image} from 'react-native';
import { Text, Button, TextInput, Provider as PaperProvider, Card, Title, Paragraph } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { ReviewBusiness } from './obj/FunctionAPICode';
import { ScrollView } from 'react-native-gesture-handler';


const Review_Business = ({ route }) => {
  const navigation = useNavigation();

  const { Number_appointment, ClientIDnumber, BusinessName, Business_Number } = route.params;
  const [cleanliness, SetCleanliness] = useState(0);
  const [Professionalism, SetProfessionalism] = useState(0);
  const [On_time, SetOn_time] = useState(0);
  const [Comment, SetComment] = useState('');
  const [ImageID, setImageID] = useState();



  // useFocusEffect(
  //   React.useCallback(() => {
  //     let uniqueId = Date.now();
  //     uniqueId += Math.random().toString(36).substring(2)
  //     setImageID(uniqueId)
  // },[]))



  useEffect(() => {
    console.log(Business_Number + ' ' + BusinessName + ' ' + Number_appointment + ' ' + ClientIDnumber);
  }, []);

  function publsihReview() {
    try {
      // Check if appointmentDetails is not undefined
      // let Overall = (cleanliness + Professionalism + On_time) / 3;
      let cleanlinessRating = Math.round(cleanliness);
      let professionalismRating = Math.round(Professionalism);
      let onTimeRating = Math.round(On_time);
      let Overall = Math.round((cleanlinessRating + professionalismRating + onTimeRating) / 3);
      const reviewDetails = {
        Number_appointment: Number_appointment,
        Client_ID_number: ClientIDnumber,
        cleanliness: cleanliness,
        Professionalism: Professionalism,
        On_time: On_time,
        Comment: Comment,
        Overall_rating: Overall,
        Business_Number: Business_Number//appointmentDetails.Business_Number
      }
      ReviewBusiness(reviewDetails).then(
        (result) => {
          if (result) {
            console.log(result.data);
            Alert.alert("תודה על הדירוג! חכמת ההמונים תמיד מנצחת!")
            navigation.goBack();
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
    catch {
      console.log(`error when trying to post Review of appointment ${Number_appointment}`);
    }
  }

  return (

    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView  style={{ backgroundColor:'#e6e6fa' }}>

        <PaperProvider>
          <View style={styles.container}>
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>נשמח אם תוכל להקדיש כמה דקות מזמנך ולדרג את {'\n'} {BusinessName}</Title>

                <Paragraph style={styles.subtitle}>ניקיון</Paragraph>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={30}
                  onFinishRating={(rating) => SetCleanliness(rating)}
                />

                <Paragraph style={styles.subtitle}>שירות</Paragraph>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={30}
                  onFinishRating={(rating) => SetProfessionalism(rating)}
                />

                <Paragraph style={styles.subtitle}>מקצועיות</Paragraph>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={30}
                  onFinishRating={(rating) => SetOn_time(rating)}
                  style={{ backgroundColor: 'transparent', overflow: 'visible' }}
                />

                <Paragraph style={styles.subtitle}>הערות</Paragraph>
                <TextInput
                  style={styles.input}
                  mode='outlined'
                  multiline
                  numberOfLines={4}
                  value={Comment}
                  onChangeText={(value) => SetComment(value)}
                />


                <Button style={styles.button}
              
                  mode='contained' onPress={() => navigation.navigate('CameraUse', { imageName: "profil" + Number_appointment })}>


                  הוספת תמונה לביקורת
                </Button>

                {/* <Button
            style={styles.button}  onPress={() => navigation.navigate('CameraUse', { imageName: "REVIEW" + Business_Number })}
            >הוסף תמונה</Button>  */}
                {/* 
                <Button
                  style={styles.button} onPress={() => navigation.navigate('CameraUse', { imageName: Number_appointment })}
                > 
                </Button> */}


                <Button
                  style={styles.button}
                  icon='check'
                  mode='contained'
                  onPress={() => {
                    console.log(`ניקיון: ${cleanliness}`);
                    console.log(`שירות: ${On_time}`);
                    console.log(`מוצר: ${Professionalism}`);
                    console.log(`הערות: ${Comment}`);
                    publsihReview();
                  }}
                >
                  שלח דירוג
                </Button>
              </Card.Content>
            </Card>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.image} source={require('../assets/logoo.png')}/>
            </View>
          </View>
        </PaperProvider>
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e6e6fa'
  },
  card: {
    borderRadius: 12,
    backgroundColor: 'rgb(255, 255, 255)',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },
  title: {
    color: 'rgb(92, 71, 205)',
    fontWeight: 'bold',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 10,
    color: 'rgb(92, 71, 205)',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'rgb(92, 71, 205)',
    color:"white"
  },
  but: {
    textAlign: 'center',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    backgroundColor: "rgb(92, 71, 205)",
    padding: 8,
    margin: 10,
    marginTop: 10,

  },
  text: {
    color: "white"
  },
  image:{
    width:100,
    height:100,
    alignItems:'center'
  }
});

export default Review_Business;
