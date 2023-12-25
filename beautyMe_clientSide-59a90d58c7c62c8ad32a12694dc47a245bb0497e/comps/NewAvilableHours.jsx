import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import Button from './CTools/Button';
import { AddNewAvailableHours,DeleteAvailability } from './obj/FunctionAPICode';
import { Alert } from 'react-native';
import { UserContext } from './UserDietails';
import { useNavigation } from "@react-navigation/core";
import Menu_professional from './obj/Menu_professional';
import moment from "moment";
import Header from './obj/Header';

const NewAvailableHours = (Props) => {


    const navigation = useNavigation();

    const [End_time, setSelectedTimeEnd] = useState('00:00');
    const [Start_time, setSelectedTimeStart] = useState('00:00');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [Date, setSelectedDate] = useState('');
    const [Date2, setSelectedDate2] = useState('');
    const { userDetails, setUserDetails } = useContext(UserContext);
    const BussinesNumber = userDetails.Business_Number;
    const [Date3, setSelectedDate3] = useState('');
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(moment(date).format('DD/MM/YYYY'));
        setSelectedDate2(moment(date).format('YYYY-MM-DD'))
        hideDatePicker();

    };

    const handleConfirm1 = (date) => {
        setSelectedDate(moment(date).format('DD/MM/YYYY'));
        setSelectedDate3(moment(date).format('YYYY-MM-DD'))
        hideDatePicker();

    };

    const handleTimeChange = (time) => {
        setSelectedTimeStart(time);
    };

    const handleTimeChange2 = (time) => {
        setSelectedTimeEnd(time);
    };

    const hourOptions = [];
    for (let i = 6; i < 24; i++) {
        for (let j = 0; j < 60; j += 15) {
            let hour = i.toString().padStart(2, '0');
            let minute = j.toString().padStart(2, '0');
            hourOptions.push({ label: `${hour}:${minute}`, value: `${hour}:${minute}` });
        }
    }

    const handleSendData = () => {

        const [hours, minutes] = Start_time.split(':');
        const numericTime = parseInt(hours, 10) + parseInt(minutes, 10) / 60;

        const [hour, minute] = End_time.split(':');
        const numericTime2 = parseInt(hour, 10) + parseInt(minute, 10) / 60;
        const data = {
            "Business_id": parseInt(BussinesNumber),
            "Date": Date2,
            "Start_time": numericTime,
            "End_time": numericTime2
        }
        AddNewAvailableHours(data).then((result) => {
            console.log('yes^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', result)
            alert("השינוים נשמרו בהצלחה")
            navigation.navigate('Calendar_professional')

        }, (error) => {
            alert("  כבר פרסמת את טווח השעות הכוללות את השעות האלה, נסה שוב")
            console.log('error', error)
        });

    };
    const cancel = () => {

       
        const data = {
            "Business_id": parseInt(BussinesNumber),
            "Date": Date3,
        }
        DeleteAvailability(data).then((result) => {
            console.log('yes^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', result)
            alert("השינוים נשמרו בהצלחה")
            navigation.navigate('Calendar_professional')

        }, (error) => {
            alert("  כבר פרסמת את טווח השעות הכוללות את השעות האלה, נסה שוב")
            console.log('error', error)
        });

    };

    return (<>
        <ScrollView>
            <View style={styles.container}>

                {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
                <View style={styles.card}>
                <Header text="הוספת שעות זמינות ליומן" color={"rgb(92, 71, 205)"} fontSize={24} />
                <View style={styles.dateContainer}>
                    <Button text="בחר תאריך" alignItems="center" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        confirmTextIOS="אישור"
                        cancelTextIOS="ביטול"
                        locale="he"
                    />
                    <Text style={styles.selectedDate}>{Date}</Text>
                </View>
                <Text>{'\n'}</Text>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <Text style={styles.pickerLabel}>ממתי פנוי?</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={Start_time}
                            onValueChange={handleTimeChange}
                        >
                            {hourOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                        {/* <Text style={styles.selectedTime}>{selectedTimeStart}</Text> */}
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Text style={styles.pickerLabel}>עד מתי פנוי?</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={End_time}
                            onValueChange={handleTimeChange2}
                        >
                            {hourOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                        {/* <Text style={styles.selectedTime}>{selectedTimeEnd}</Text> */}
                    </View>
                </View>
              

                <Button text="שלח" alignItems="center" onPress={handleSendData} />
              
            </View>
             

                <View>
             <Header text="ביטול שעות זמינות ליומן" color={"red"} fontSize={20} />
                <View style={styles.dateContainer}>
   
                    <Button text="  בחר תאריך לביטול" alignItems="center" onPress={showDatePicker1} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible1}
                        mode="date"
                        onConfirm={handleConfirm1}
                        onCancel={hideDatePicker1}
                        confirmTextIOS="אישור"
                        cancelTextIOS="ביטול"
                        locale="he"
                    />
                    <Text style={styles.selectedDate}>{Date3}</Text>
                   
                </View> 
                <Button text="מחק" alignItems="center" onPress={cancel} />
               </View>
                 <View style={{height:160}}></View>
            </View>
            
        </ScrollView>

        <Menu_professional />

    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    // contentContainer: {
    //     paddingHorizontal: 20,
    //     paddingBottom: 20,
    // },
    dateContainer: {
        // flexDirection: 'row',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 30,

    },
    selectedDate: {
        fontSize: 26,
        // marginTop: 16,
        textAlign: 'center',
        color: 'rgb(92, 71, 205)',
    },
    pickerContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        marginBottom: 200,
    },
    pickerWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        height: 50,
        width: '80%',
        alignSelf: 'center',
    },
    selectedTime: {
        fontSize: 16,
        marginTop: 8,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginBottom: 50,
        height: 150,
        width: 150,
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    // image:{
    //     paddingTop: 100,
    //     width:200,
    //     height:200,
    //     alignItems: 'center',
    //     textAlign: 'center',    
    //     justifyContent: 'center',
    //     },
    //     image1:{
    //         alignItems: 'center',

    //       },
});

export default NewAvailableHours;