import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { AllBusinessReviews } from "./obj/FunctionAPICode";
import Menu_professional from './obj/Menu_professional';
import Header from "./obj/Header";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ShowReviews = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { BusinessNumber } = route.params;
  const [allReviews, SetAllReviews] = useState([]);
  useEffect(() => {
    console.log("business reviews= " + BusinessNumber);
    console.log(AllBusinessReviews(BusinessNumber))
    AllBusinessReviews(BusinessNumber)
      .then((result) => {
        console.log(result, "10101010101010101")
        console.log(result.data);
        SetAllReviews(result);
      })
      // .then((result) => {
      //   jjjjj = result.
      //   console.log(result.data);
      //   SetAllReviews(result.data);
      // })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(allReviews), "5555555555555555555555555555555555");
  }, [allReviews]);

  return (
    <>
      <ScrollView style={styles.container}>
        <Header text="ביקורות על העסק שלך" fontSize={35} color={"rgb(92, 71, 205)"} />
        <View style={styles.contentContainer}>
          {allReviews.map((review) => (
            <View key={review.Number_appointment} style={styles.card}>

              <View style={styles.textContainer}>
                <View style={styles.reviewRow}>
                  <MaterialCommunityIcons name="star" size={24} color="gold" />
                  <Text style={styles.ratingTitle}>ציון כללי: {review.Overall_rating}</Text>
                </View>
                <View style={styles.parameterRow}>
                  <View style={styles.parameterContainer}>
                    <MaterialCommunityIcons name="broom" size={24} color="gray" />
                    <Text style={styles.parameterText}>ניקיון: {review.Cleanliness}</Text>
                  </View>
                  <View style={styles.parameterContainer}>
                    <MaterialCommunityIcons name="timer" size={24} color="gray" />
                    <Text style={styles.parameterText}>זמנים: {review.On_time}</Text>
                  </View>
                  <View style={styles.parameterContainer}>
                    <MaterialCommunityIcons name="briefcase" size={24} color="gray" />
                    <Text style={styles.parameterText}>מקצועיות: {review.Professionalism}</Text>
                  </View>
                </View>
                <View style={styles.commentContainer}>
                  <MaterialCommunityIcons name="comment" size={24} color="gray" />
                  <Text style={styles.commentText}>{review.Comment}</Text>
                </View>
              </View>

              <Image
                style={styles.image}
                source={{
                  uri: `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${review.Number_appointment}.jpg`,
                }}
              />

            </View>
          ))}
        </View>
      </ScrollView>
      <Menu_professional />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingTitle: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  parameterRow: {
    marginBottom: 10,
  },
  parameterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  parameterText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   // marginTop: 10,
  },
  commentText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
});
export default ShowReviews;
