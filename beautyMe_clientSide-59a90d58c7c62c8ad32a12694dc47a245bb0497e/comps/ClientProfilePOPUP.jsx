import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { ClientDetailes } from "../obj/FunctionAPICode";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { openURL, canOpenURL } from "expo-linking";

const ClientProfilePOPUP = (props) => {
  const { isVisible, onClose, Business_Number } = props;

  const [ClientDetails, SetClientDetails] = useState({});
  const image =
    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedias.timeout.co.il%2Fwww%2Fuploads%2F2017%2F03%2F%25D7%259E%25D7%25A8%25D7%259E%25D7%2595%25D7%25A8%25D7%25A7_17_T-1140x641.jpg&tbnid=uEfqyzHNmhL4UM&vet=12ahUKEwi1qeq93aH_AhVDmycCHYoMB54QMygFegUIARDMAQ..i&imgrefurl=https%3A%2F%2Ftimeout.co.il%2F%25D7%2594%25D7%259E%25D7%25A1%25D7%25A4%25D7%25A8%25D7%2595%25D7%25AA-%25D7%2594%25D7%259B%25D7%2599-%25D7%2598%25D7%2595%25D7%2591%25D7%2595%25D7%25AA%2F&docid=BMiIRS3jiJIo_M&w=1140&h=641&q=%D7%9E%D7%A1%D7%A4%D7%A8%D7%94&ved=2ahUKEwi1qeq93aH_AhVDmycCHYoMB54QMygFegUIARDMAQ";

  useEffect(() => {
    ClientDetailes(clientID).then(
      (result) => {
        console.log("yes", result.data);
        SetClientDetails(result.data);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);
  function handleInstagramLink() {
    // openURL(ClientDetails.Instagram_link); //לשים משתנה של כתובת אינסטגרם שהמשתמש יזין
    openURL('https://www.instagram.com');

}
  function handleFacebookLink() {
    // openURL(ClientDetails.Facebook_link); // לשים משתנה של כתובת פייסבוק שהמשתמש יזין
    openURL('https://www.facebook.com');
  
}

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
          <Image
            style={styles.profileImage}
            source={{ uri: "https://example.com/your-image.jpg" }} // replace with your image url
          />
          <Text style={styles.textBox}>{ClientDetails.Name}</Text>
          <Text style={styles.textBox}>
            {ClientDetails.AddressStreet +
              " " +
              ClientDetails.AddressHouseNumber +
              ", " +
              ClientDetails.AddressCity}
          </Text>

          <View style={styles.linksContainer}>
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
            </TouchableOpacity>
          </View>
          <Button title="סגור" onPress={onClose} />
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
    width: "80%",
    maxHeight: "80%",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  textBox: {
    fontSize: 18,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '80%', 
    marginBottom: 20,
  },
  link: {
    padding: 10, // Add padding to increase touchable area
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
});

export default ClientProfilePOPUP;
