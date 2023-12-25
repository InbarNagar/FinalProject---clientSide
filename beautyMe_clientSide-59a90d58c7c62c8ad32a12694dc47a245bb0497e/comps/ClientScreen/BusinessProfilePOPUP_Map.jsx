import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Button, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Linking } from "react-native";
import { GetOneBusiness, AllBusinessReviews } from "../obj/FunctionAPICode";
import { FontAwesome5, AntDesign, FontAwesome } from "@expo/vector-icons";
import { openURL, canOpenURL } from "expo-linking";
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from "../UserDietails";
import { useNavigation } from "@react-navigation/core";
import Header from "../obj/Header";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

const BusinessProfilePOPUP_Map = (props) => {

  const { isVisible, onClose, Business_Number,x} = props;
  
  const [businessDetails, SetBusinessDetails] = useState({});
   const [businessRankArr, SetBusinessRankArr] = useState();
  const [Overall_rating, SetOverall_rating] = useState();
  const [Professionalism, SetProfessionalism] = useState();
  const [Cleanliness, SetCleanliness] = useState();
  const [On_time, SetOn_time] = useState();
  const [ShowReviewsSection, SetShowReviewsSection] = useState(false);
  const [src, setsrc] = useState('');
  
const handleInstagramLink = async () => {
  try {
    // const url = 'https://www.instagram.com/your_instagram_account';
    const url = `https://www.instagram.com/${businessDetails.Instagram_link}`;
    await Linking.openURL(url);
    console.log(Linking.openURL(url))
  } catch (error) {
    console.error('שגיאה בפתיחת האינסטגרם:', error);
  }
};
const handleFacebookLink = async () => {
  try {
    // const url = 'https://www.instagram.com/your_instagram_account';
    const url = `https://www.Facebook.com/${businessDetails.Facebook_link}`;
    await Linking.openURL(url);
    console.log(Linking.openURL(url))
  } catch (error) {
    console.error('שגיאה בפתיחת הפייסבוק:', error);
  }
};
  const [imagesExist, setImagesExist] = useState([]);


  // const image =
  //   "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedias.timeout.co.il%2Fwww%2Fuploads%2F2017%2F03%2F%25D7%259E%25D7%25A8%25D7%259E%25D7%2595%25D7%25A8%25D7%25A7_17_T-1140x641.jpg&tbnid=uEfqyzHNmhL4UM&vet=12ahUKEwi1qeq93aH_AhVDmycCHYoMB54QMygFegUIARDMAQ..i&imgrefurl=https%3A%2F%2Ftimeout.co.il%2F%25D7%2594%25D7%259E%25D7%25A1%25D7%25A4%25D7%25A8%25D7%2595%25D7%25AA-%25D7%2594%25D7%259B%25D7%2599-%25D7%2598%25D7%2595%25D7%2591%25D7%2595%25D7%25AA%2F&docid=BMiIRS3jiJIo_M&w=1140&h=641&q=%D7%9E%D7%A1%D7%A4%D7%A8%D7%94&ved=2ahUKEwi1qeq93aH_AhVDmycCHYoMB54QMygFegUIARDMAQ";

  const imageUrls = [
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil1${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil2${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil3${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil4${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil5${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil6${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil7${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil8${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil9${Business_Number}.jpg`,
    `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil10${Business_Number}.jpg`,
];

useEffect(() => {
  Promise.all(
      imageUrls.map((url) =>
          Image.prefetch(url)
              .then(() => true)
              .catch(() => false)
      )
  ).then(setImagesExist);
}, []);



  useEffect(() => {
    var rankarr=[]
    AllBusinessReviews(Business_Number).then(
      (result) => {
        console.log("yes", "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", result);
        rankarr=result;
        SetBusinessRankArr(result)
      },
      (error) => {
        console.log("error", error);
      }
    );

    GetOneBusiness(Business_Number).then(
      (result) => {
        console.log("yes", result.data);
        SetBusinessDetails(result.data);
        console.log(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${result.data.Professional_ID_number}.jpg`)
        setsrc(`http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${result.data.Professional_ID_number}.jpg`);
      },
      (error) => {
        console.log("error", error);
      }
    );

    let onTimeSum = 0;
    let professionalismSum = 0;
    let cleanlinessSum = 0;
    let overallRatingSum = 0;
    rankarr.map(bus => {
      onTimeSum += bus.On_time;
      professionalismSum += bus.Professionalism;
      cleanlinessSum += bus.Cleanliness;
      overallRatingSum += bus.Overall_rating;
    });

    SetOn_time(onTimeSum /rankarr.length);
    console.log(On_time);
    SetProfessionalism(professionalismSum /rankarr.length);
    console.log(Professionalism);
    SetCleanliness(cleanlinessSum / rankarr.length);
    console.log(Cleanliness);
    SetOverall_rating(overallRatingSum / rankarr.length);
    console.log(Overall_rating);

  }, []);


  // function handleInstagramLink() {
  //   // openURL(businessDetails.Instagram_link); //לשים משתנה של כתובת אינסטגרם שהמשתמש יזין
  //   openURL('https://www.instagram.com');}

    // function handleFacebookLink() {
    // openURL(businessDetails.Facebook_link); // לשים משתנה של כתובת פייסבוק שהמשתמש יזין
//     openURL('https://www.facebook.com');
  
// }

  const dialNumber = (number) => { //לא עובד כי בתחלה לא אישרתי להשתמש בטלפון בהגדרות אפליקציה
    console.log(number);
    let phoneNumber = "";

    if (Platform.OS === "android") {
      console.log(Platform.OS);
      phoneNumber = `tel:${number}`;
    } else {
      console.log(Platform.OS);
      phoneNumber = `telprompt:${number}`;
    }
    canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          alert("Phone number is not available");
        } else {
          return openURL(phoneNumber);
        }
      })
      .catch((err) => console.error("error!", err));
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>


            <View style={styles.view1}>
              <Image style={styles.img} onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} source={{ uri: src }} />


              {/* <TouchableOpacity onPress={() => navigation.navigate('CameraUse', { imageName: "profil" + userDetails.ID_number })}>
  <Image style={styles.img} onError={({ currentTarget }) => setsrc('http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profilUser.jpeg')} source={{ uri: src }} />
</TouchableOpacity> */}

              {/* <View style={styles.iconContainer}> 
<TouchableOpacity onPress={handleInstagramLink}>
<FontAwesome name="instagram" size={24} color="black" style={{ marginRight: 100 }} />
</TouchableOpacity>
<TouchableOpacity
  style={styles.link}
  onPress={() => dialNumber(userDetails.phone)}
>
  <AntDesign name="phone" size={24} color="black" />
</TouchableOpacity>
</View> */}

            </View>
            {/* <Image
            style={styles.profileImage}
            source={{ uri: "https://example.com/your-image.jpg" }} // replace with your image url
          /> */}
            <Header text={businessDetails.Name} paddingTop={0} fontSize={25} color={"rgb(92, 71, 205)"} />
            
            <Swiper style={styles.wrapper} showsButtons={true} height={300} 
            autoplay={true}
            autoplayTimeout={2}
            activeDotColor="rgb(92, 71, 205)"
            paginationStyle={{ bottom: 0 }}
            removeClippedSubviews={false}>
            {imageUrls.map((url, index) => (
                <View key={index} style={styles.slide}>
                    {imagesExist[index] ? (
                        <Image
                            style={styles.img2}
                            source={{ uri: url }}
                            onError={(error) => {
                                console.log('Failed to load image', url, error);
                                const updatedImagesExist = [...imagesExist];
                                updatedImagesExist[index] = false;
                                setImagesExist(updatedImagesExist);
                            }}
                        />
                    ) :  null
                    }
                </View>
            ))}
        </Swiper>
            {/* <Text style={styles.textBox}>{businessDetails.Name}</Text> */}
            <Text style={styles.textBox}>
              {businessDetails.AddressStreet +
                " " +
                businessDetails.AddressHouseNumber +
                ", " +
                businessDetails.AddressCity}
            </Text>
            <Text>{businessDetails.about}</Text>
          {/* האייקונים של אופיר */}
            <View style={styles.linksContainer}>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.instagram.com/${businessDetails.Instagram_link}`)}>
                  <FontAwesome name="instagram" size={24} color="rgb(92, 71, 205)" style={{ marginRight: 50 }} />
                </TouchableOpacity>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(businessDetails.Facebook_link)}
                >
                  <Icon
                    name="facebook"
                    size={20}
                    color="rgb(92, 71, 205)"
                    // style={styles.icon}
                    style={{ marginRight: 50 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.link} onPress={() =>
                  Linking.openURL(`tel:${x.phone}`)
                }>
                  <AntDesign name="phone" size={24} color="rgb(92, 71, 205)" style={{ marginRight: 50 }} />
                </TouchableOpacity>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => {
                  const scheme = Platform.select({ ios: 'waze://', android: 'https://waze.com/ul' });
                  const address = `${businessDetails.AddressCity},${businessDetails.AddressHouseNumber} ${businessDetails.AddressStreet} `
                  const url = `${scheme}?q=${encodeURIComponent(address)}&navigate=yes`;

                  Linking.canOpenURL(url).then((supported) => {
                    if (supported) {
                      return Linking.openURL(url);
                    } else {
                      console.log(`Can't handle url: ${url}`);
                    }
                  }).catch((err) => console.error('An error occurred', err));
                }}>
                  <MaterialCommunityIcons name="waze" size={24} color="rgb(92, 71, 205)" />
                </TouchableOpacity>
              </View>
            </View>
            {/* האייקונים של אופיר */}
            {/* <TouchableOpacity
              style={styles.link}
              onPress={() => Linking.openURL("https://waze.com/ul")}
            >
              <FontAwesome5 name="waze" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={handleInstagramLink}>
              <FontAwesome name="instagram" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={handleFacebookLink}>
              <FontAwesome name="facebook-square" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => dialNumber("0523124500")}
            >
              <AntDesign name="phone" size={24} color="black" />
            </TouchableOpacity> */}
            {/* 
          <ScrollView horizontal>
             <Image
            style={styles.imageInScrollView}
            source={{ uri:{image}}}
          />
          <Image
            style={styles.imageInScrollView}
            source={{ uri:{image}}}          />
          <Image
            style={styles.imageInScrollView}
            source={{ uri:{image}}}          /> 
            Add more images as needed 
          </ScrollView> */}
            <View style={styles.rankingContainer}>
              {/* <Text style={styles.rankingTitle}>ציון עסק: {Overall_rating}</Text>
  <Text style={styles.rankingItem}>ניקיון: {Cleanliness}</Text>
  <Text style={styles.rankingItem}>מקצועיות: {Professionalism}</Text>
  <Text style={styles.rankingItem}>זמנים: {On_time}</Text> */}
              <View style={styles.view2}>
                <Text style={styles.title}>קצת על העסק:</Text>
                <Text style={styles.text1}>{businessDetails.About}</Text>
              </View>

              <TouchableOpacity onPress={() => {SetShowReviewsSection(!ShowReviewsSection) }}>
                <View style={styles.view2}>
                  <Text style={styles.textview2}>ביקורות של לקוחות</Text>
                  <AntDesign name="downcircleo" size={24} color="black" />
                </View>
              </TouchableOpacity>


              {ShowReviewsSection && businessRankArr.length > 0 &&
                <ScrollView>
                  <View style={styles.container}>
                    {businessRankArr.map((bus) => {
                      console.log("key: " + bus.Number_appointment);
                      return (
                        <View key={bus.Number_appointment} style={styles.card}>
                          <View style={styles.rowContainer}>
                            <View style={styles.textContainer}>
                              <View style={styles.reviewRow}>
                                <MaterialCommunityIcons
                                  name="star"
                                  size={24}
                                  color="gold"
                                  style={styles.icon}
                                />
                                <Text style={styles.ratingTitle}>
                                  ציון כללי: {bus.Overall_rating}
                                </Text>
                              </View>
                              <View style={styles.parameterRow}>
                                <View style={styles.parameterContainer}>
                                  <MaterialCommunityIcons
                                    name="broom"
                                    size={24}
                                    color="gray"
                                    style={styles.parameterIcon}
                                  />
                                  <Text style={styles.parameterText}>ניקיון:</Text>
                                  <Text style={styles.parameterValue}>{bus.Cleanliness}</Text>
                                </View>
                                <View style={styles.parameterContainer}>
                                  <MaterialCommunityIcons
                                    name="timer"
                                    size={24}
                                    color="gray"
                                    style={styles.parameterIcon}
                                  />
                                  <Text style={styles.parameterText}>זמנים:</Text>
                                  <Text style={styles.parameterValue}>{bus.On_time}</Text>
                                </View>
                                <View style={styles.parameterContainer}>
                                  <MaterialCommunityIcons
                                    name="briefcase"
                                    size={24}
                                    color="gray"
                                    style={styles.parameterIcon}
                                  />
                                  <Text style={styles.parameterText}>מקצועיות:</Text>
                                  <Text style={styles.parameterValue}>{bus.Professionalism}</Text>
                                </View>
                              </View>
                              <View style={styles.customerCommentContainer}>
                                <MaterialCommunityIcons
                                  name="comment"
                                  size={24}
                                  color="gray"
                                  style={styles.parameterIcon}
                                />
                                <Text style={styles.customerComment}>{bus.Comment}</Text>
                              </View>
                            </View>
                            <View style={styles.imageContainer}>
                              <Image
                                style={styles.img1}
                                source={{
                                  uri: `http://proj.ruppin.ac.il/cgroup93/prod/uploadFile2/profil${bus.Number_appointment}.jpg`,
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              }
            </View>


          </ScrollView>
          <Button title="סגור" onPress={onClose} color={"rgb(92, 71, 205)"} />

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // This will create a semi-transparent dark background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    // height: "80%",
    // maxWidth: 500,

    // alignItems: "flex-end"
  },

  text1: {
    fontSize: 20
  },


  scrollView: {
    width: '100%', // קביעת רוחב התוכן ל-100% של הכרטיסייה
  },
  scrollViewContainer: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // overflow: "scroll",
    width: "10%",
    marginBottom: 20,
  },
  view2: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textview2: {
    fontSize: 20,
    marginBottom: 20,
    color: 'rgb(92, 71, 205)',
    fontWeight: 'bold',
  },
  img: {
    borderRadius: 150,
    marginBottom: 20,
    width: 250,
    height: 250,
  },
  img1: {
    borderRadius: 0,
    marginTop: 10,
    width: 110,
    height: 110,

  },
  view1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    color: 'rgb(92, 71, 205)',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'right',
    fontSize: 20
  }, slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
},
img2: {
    width: '100%',
    height: '100%',
},
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  textBox: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '80%', 
    marginBottom: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  link: {
    padding: 10, // Add padding to increase touchable area
  },
  imageInScrollView: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  rankingContainer: {
    width: '100%',
    padding: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  rankingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  rankingItem: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'right',
  },
  reviewItem: {
    marginBottom: 10,
  },
  container: {
    padding: -90,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  ratingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",

  },
  parameterRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 0,
  },
  parameterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  parameterIcon: {
    marginRight: 5,
  },
  parameterText: {
    color: "#666",
    textAlign: 'left'
  },
  parameterValue: {
    color: "#333",
    fontWeight: "bold",
    margin: 6,
   
  },
  customerCommentContainer: {
    flexDirection: "row"
  },
  customerComment: {
    color: "#666",
    textAlign: 'left'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  imageContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
});

export default  BusinessProfilePOPUP_Map;


//  {/* <View style={styles.card}>
//         <Text style={styles.title}>ציון כלללי: {bus.Overall_rating}</Text>
//         <Text style={styles.title}>ניקיון: {bus.Cleanliness}     זמנים: {bus.On_time}     מקצועיות: {bus.Professionalism}</Text>
//         <Text style={styles.title}>תגובת לקוח: </Text><Text style={styles.title}>{bus.Comment}</Text>
//       </View> */}