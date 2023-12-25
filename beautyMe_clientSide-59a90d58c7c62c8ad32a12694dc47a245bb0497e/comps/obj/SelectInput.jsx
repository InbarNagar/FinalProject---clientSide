import React, { useState,useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';



export default function MultiSelectInput(props) {
  const { data,getValue,placeholder=" Select categories" } = props
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    getValue && getValue(selected)
}, [selected]);
  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        search
        activeColor='#FFCF84'
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color="black"
        //     name="Safety"
        //     size={20}
        //   />
        // )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: '4%',
    paddingLeft:'12%',
    paddingRight:'12%'
  },
  dropdown: {
    // height: 50,
    backgroundColor: 'white',
    borderRadius:5
    // borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 15,
    color:'#B6B6B6'
  },
  selectedTextStyle: {
    fontSize: 14,
    color:'black',

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
   
  },
  icon: {
    // marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    borderColor:'black',
  },
});