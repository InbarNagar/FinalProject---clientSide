
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AddTratment = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['קוסמטיקה', 'הסרת שיער', 'ציפורניים', 'שיער', 'איפור'];

  const renderOptionItems = () => {
    return options.map(option => (
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

  const Choosetype =()=>{
    return( <View>
        <Text>
            ffff
        </Text>
    </View>)
  }


  return (
    <View style={{ flex: 1 }}>
    <Text>בחר קטגוריה</Text>
      <View style={styles.optionsContainer}>{renderOptionItems()}</View>
      <TouchableOpacity style={styles.button} onPress={Choosetype}>
        <Text style={styles.buttonText}>בחר</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 16,
  },
  optionItem: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  optionText: {
    color: '#000',
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: 'blue',
  },
  selectedOptionText: {
    color: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 4,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});



export default AddTratment 