
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const AddTratment = () => {
    const [Type_treatment_Number, setType_treatment_Number] = useState('');
    const [Category_Number, setCategory_Number] = useState('');
    const [Business_Number, setBusiness_Number] = useState('');
    const [Price, setPrice] = useState('');
    const [Treatment_duration, setTreatment_duration] = useState('');

    const [selectedOption, setSelectedOption] = useState('');

    const categories = ['קוסמטיקה', 'הסרת שיער', 'ציפורניים', 'שיער', 'איפור'];
    const options = ['קוסמטיקה', 'הסרת שיער', 'ציפורניים', 'שיער', 'איפור'];


    const renderOptionItems = () => {
        return categories.map(option => (
            <TouchableOpacity
                key={option}
                style={[styles.optionItem, selectedOption === option ? styles.selectedOption : null]}
                onPress={() => setSelectedOption(option)}
            >
                <Text style={[styles.optionText, selectedOption === option ? styles.selectedOptionText : null]}>
                    {option}
                </Text>
            </TouchableOpacity>
        ));
    };


    const handleRegistration = () => {

        fetch('http://proj.ruppin.ac.il/cgroup93/prod/api/Professional/NewProfessional', {
            method: 'POST',
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
                'Accept': "application/json; charset=UTF-8",
            }),
            body: JSON.stringify({
                Type_treatment_Number,
                Category_Number,
                Business_Number,
                Price,
                Treatment_duration,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))

            .catch((error) => console.error(error));

        //   props.navigation.navigate('Create_Business_Pro')

    };


    return (

        <View >
            <View>
                <View>
                    <Text>בחר קטגוריה</Text>
                    <View >{renderOptionItems()}</View>
                    <TouchableOpacity  >
                        <Text >בחר</Text>
                    </TouchableOpacity>
                </View>
            </View>



            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder=" מחיר"
                    value={Price}
                    onChangeText={(text) => setPrice(text)}
                />
            </View>

            <View style={styles.inp}>
                <TextInput style={styles.textInputS}
                    placeholder="משך זמן הטיפול"
                    value={Treatment_duration}
                    onChangeText={(text) => setTreatment_duration(text)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inp: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        color: 'red',
    },
    textInputS: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: "80%",
        marginRight: 8,
    },
    title: {
        padding: 60,
        justifyContent: 'center',
        textAlign: 'center'
    },
    titp: {
        textAlign: 'center'
    }
});



export default AddTratment;