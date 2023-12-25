import { React, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import ClientSearchReasultCard from "./ClientSearchReasultCard";
import {
  Search_post,
  GetAllAvailableAppointments,
  Treatment_type_GET,
} from "../obj/FunctionAPICode";
import { MaterialIcons as Icon } from "@expo/vector-icons";
export default function SearchFiltersMenu(props) {
  const { ClientIDnumber, ClientFirstName } = props;

  const [loading, setLoading] = useState(true);
  const [filter_catgories, set_filter_catgories] = useState([]);

  const [ShowFilter, SethowFilter] = useState(false);
  const navigation = useNavigation();
  const [chosenTreratmentNum, setChosenTreratmentNum] = useState(0);
  const [NameTreatment, setNameTreatment] = useState("");
  const [gender, setGender] = useState("");
  const [AddressCity, setAddressCity] = useState("");
  const [Is_client_house, setIs_client_house] = useState("");
  const [categories, setCategories] = useState(["קטגוריה"]);
  const [response, SetResponse] = useState([]); //מערך תוצאות החיפוש
  const sorts = ["דירוג גבוהה תחילה", "דירוג נמוך תחילה"];
  //const [apo, setapo] = useState();//inbar
  useEffect(() => {
    Treatment_type_GET().then(
      (result) => {
        console.log("categories: ", result);
        if (result) {
          // let temp = result.map((x) => x.Name);
          setCategories(result);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
    // AllApointemtDetailes().then((res) => {

    //   console.log("&&&&&&&&&&&&&&&&&&&&&&", res.data)
    //   setapo(res.data)
    //   console.log(ClientIDnumber.toString())
    // });
    GetAllAvailableAppointments().then(
      (result) => {
        console.log("available appointments amount: ", result.length);
        if (result) {
          // let temp = result.map((x) => x.Name);
          SetResponse(result);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);
  function btnSearch() {
    let num = 0;
    {
      categories.map((z) => {
        //שומר את מספר ההטיפול בשביל הקריאה לשמירת תור עתידי
        if (z.Name == NameTreatment) {
          num = z.Type_treatment_Number;
          setChosenTreratmentNum(num);
          console.log(
            "treatment number: " + chosenTreratmentNum,
            "treatment name: " + NameTreatment
          );
        }
      });
      const obj = {
        AddressCity: AddressCity,
        NameTreatment: NameTreatment,
        // sort: "דירוג גבוהה תחילה",
        gender: gender,
        Is_client_house: Is_client_house,
      };
      // SetResponse([{"Appointment_status": null, "Business_Number": 1, "Date": "2023-04-09T00:00:00", "End_time": "12:30:00", "Is_client_house": "YES       ", "Number_appointment": 4, "Start_time": "12:00:00"}, {"Appointment_status": null, "Business_Number": 2, "Date": "2023-04-10T00:00:00", "End_time": "13:30:00", "Is_client_house": "YES       ", "Number_appointment": 6, "Start_time": "13:00:00"}])
      Search_post(obj).then(
        (result) => {
          console.log("yes", result.data);
          if (result.data) {
            SetResponse(result.data);
            console.log("amount of results: " + result.data.length);
            //מפעיל את הכפתור תצוגת מפה
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }

  const FilterTreatment = (text) => {
    console.log(
      "&&&&&&&&&&&&&&&&&&",
      filter_catgories && filter_catgories.length > 0
    );

    const filterSearch = categories.filter((value) =>
      value.Name.includes(text)
    );
    set_filter_catgories(filterSearch);
    console.log("&&&&&&&&%%%%%%%", filterSearch);
    console.log(text);
  };

  return (
    <View>
      <View>
        <Text style={styles.title}>שלום {ClientFirstName} </Text>
        <View style={{ flexDirection: "column" }}>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              placeholderTextColor: "#E6E6FA",
            }}
            onChangeText={(text) => FilterTreatment(text)}
            placeholder="הקלדי טיפול יופי"
          >
            {" "}
          </TextInput>

          <View style={styles.buttonContainer}>
            <Button
              title="חפש"
              onPress={btnSearch}
              buttonStyle={{
                backgroundColor: "rgb(92, 71, 205)",
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 30,
              }}
              icon={<Icon name="search" size={24} color="white" />}
            />
            {response.length > 0 && (
              <Button
                style={{ Color: "rgb(92, 71, 205)" }}
                title="תצוגת מפה"
                buttonStyle={{
                  backgroundColor: "rgb(92, 71, 205)",
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 30,
                }}
                // containerStyle={{
                //   width: 200,
                //   marginHorizontal: 50,
                //   marginVertical: 10,
                // }}
                // titleStyle={{ fontWeight: "bold" }}
                onPress={() => {
                  props.navigation.navigate("SearchOnMap", {
                    results: response,
                  });
                }}
                icon={<Icon name="place" size={24} color="white" />}
              />
            )}
            <Button
              title="סינון"
              buttonStyle={{
                backgroundColor: "rgb(92, 71, 205)",
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 30,
              }}
              icon={<Icon name="filter-list" size={24} color="white" />}
              onPress={() => SethowFilter(!ShowFilter)}
            />
          </View>
        </View>

        <Picker
          selectedValue={NameTreatment}
          onValueChange={(value) => setNameTreatment(value)}
          style={styles.picker}
        >
          {filter_catgories && filter_catgories.length > 0 ? (
            filter_catgories.map((category, i) => (
              <Picker.Item
                label={category.Name}
                value={category.Name}
                key={i}
              />
            ))
          ) : (
            <Picker.Item label={"אין תוצאות"} key={0} />
          )}
        </Picker>

        {ShowFilter && (
          <View style={styles.filterContainer}>
            <View>
              <TextInput
                style={styles.input}
                placeholder="עיר"
                value={AddressCity}
                onChangeText={(value) => setAddressCity(value)}
              />
            </View>
            <View>
              <Text style={styles.sectionTitle}>מין מטפל:</Text>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="M"
                  status={gender === "M" ? "checked" : "unchecked"}
                  onPress={() => setGender("M")}
                />
                <Text style={styles.radioButtonLabel}>זכר</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="F"
                  status={gender === "F" ? "checked" : "unchecked"}
                  onPress={() => setGender("F")}
                />
                <Text style={styles.radioButtonLabel}>נקבה</Text>
              </View>
            </View>

            <View>
              <Text style={styles.sectionTitle}>טיפול ביתי:</Text>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="YES"
                  status={Is_client_house === "YES" ? "checked" : "unchecked"}
                  onPress={() => setIs_client_house("YES")}
                />
                <Text style={styles.radioButtonLabel}>כן</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="NO"
                  status={Is_client_house === "NO" ? "checked" : "unchecked"}
                  onPress={() => setIs_client_house("NO")}
                />
                <Text style={styles.radioButtonLabel}>לא</Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <ScrollView>
        {response &&
          response.length > 0 &&
          response.map((x, i) => {
            return (
              <View key={i}>
                <ClientSearchReasultCard
                  Is_client_house={x.Is_client_house}
                  End_time={x.End_time}
                  Start_time={x.Start_time}
                  Date={x.Date}
                  Number_appointment={x.Number_appointment}
                  Business_Number={x.Business_Number}
                  AddressStreet={x.AddressStreet}
                  AddressHouseNumber={x.AddressHouseNumber}
                  AddressCity={x.AddressCity}
                  ClientIDnumber={ClientIDnumber}
                  Appointment_status={x.Appointment_status}
                  //apo={apo}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  inp: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    backgroundColor: "#eee", // Lighter color for better visibility
  },
  textInputS: (borderColor) => {
    return {
      color: "rgb(92, 71, 205)",
      borderColor: borderColor ? "green" : "red",
      fontSize: 20, // Less emphasis on the font size
      textAlign: "right",
      fontWeight: "bold",
    };
  },
  title: {
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    color: "#000", // Change color to black for better visibility
    fontWeight: "bold",
    color: "rgb(92, 71, 205)",
  },
  titp: {
    textAlign: "center",
    color: "red",
    fontSize: 17,
  },
  container: {
    flex: 1, // Let it take the available space
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa", // Lighter background color for better contrast
    padding: "5%", // Use percentage for padding
  },
  text: {
    textAlign: "right",
    paddingBottom: 10,
  },
  but: {
    textAlign: "center",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    backgroundColor: "#1E90FF", // More conventional button color
    padding: 15,
    margin: 10,
  },
  thachtext: {
    textAlign: "center",
    color: "#fffaf0",
    fontSize: 20, // Less emphasis on font size
    fontWeight: "bold",
    height: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  picker: {
    // height: 50,
    // width: 150,
    borderColor: "rgb(92, 71, 205)",
    // borderWidth: 1,
    borderRadius: 20, // This will make the picker appear as a rounded rectangle
    backgroundColor: "#E6E6FA", // This will give the picker a white background with 50% opacity
  },

  filterContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: "#EEE",
  },
  input: {
    fontSize: 16,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    marginVertical: 5,
  },
  radioButtonContainer: {
    flexDirection: "row-reverse", // Reverses the direction
    alignItems: "center",
    marginVertical: 5,
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 10,
    flexDirection: "row-reverse",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
    textAlign: "right",
  },
});
