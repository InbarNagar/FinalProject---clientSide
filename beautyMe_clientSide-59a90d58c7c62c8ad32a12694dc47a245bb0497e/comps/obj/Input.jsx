// import { View, Text ,TextInput, StyleSheet, style} from 'react-native'
// import React,{useState} from 'react'
// import { Akira } from 'react-native-textinput-effects';

// const Input = (props) => {
//                     placeholderTextColor="#92a2bd"
//                     const {textt, styleText, styleView, styleTextInput, placeholder, placeholderTextColor, 
//                           value, onBlur, onChangeText, autoCapitalize, keyboardType, autoCompleteType,
//                               } = props

//     const [inputValue, setInputValue] = useState(value);

//     return (
//         <View style={styleView}>

//             <Sae
//                 iconClass={FontAwesomeIcon}
//                 iconName={'pencil'}
//                 iconColor={'black'}
//                 inputPadding={16}
//                 labelHeight={24}
//                 borderHeight={2}
//                 autoCapitalize={'none'}
//                 autoCorrect={false}
//                 style={{ zIndex: 10 }}
//                 textInputStyle={{ fontSize: 30 }}
//                 iconStyle={{ fontSize: 40 }}
//             >
//                 <Text style={{ flex: 1, textAlign: 'right' }}>{textt}</Text>
//                 <TextInput
//                     style={{ flex: 1, textAlign: 'right' }}
//                     placeholder={placeholder}
//                     placeholderTextColor={placeholderTextColor}
//                     value={inputValuelue}
//                     onChangeText={onChange && onChange.textInput}
//                     onBlur={onBlur && onBlur.textInput}                    
//                 />
//             </Sae>
//         </View>
//     )
// }

  
// export default Input;



       // <Input textt={"תעודת זהותתתת"} placeholder={"תעודת זהות"} value={ID_number}
         //     placeholderTextColor="#92a2bd" onChangeText={(text) => setid(text)}></Input>



////////////////////////////////////////////////////////////////////////////////////////
import { View, Text ,TextInput, StyleSheet, style} from 'react-native'
import React,{useState} from 'react'

const Input = (props) => {
    const {textt, styleText, styleView, styleTextInput, placeholder, value, onBlur, autoCapitalize, keyboardType, autoCompleteType
    } = props

    const [inputValue, setInputValue] = useState(value);

    return (
        <View style={styleView}>

            <TextInput
        
                style={styleTextInput}
                placeholder={placeholder}
                value={inputValue}
                onChangeText={onChange && onChange.textInput}
                     onBlur={onBlur && onBlur.textInput}  
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                autoCompleteType={autoCompleteType}
            />
            <Text style={styleText}>{textt}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
      },
    input: {
      borderWidth: 1,
      borderColor: '#9acd32',
      width: "80%",
      marginRight: 8,
    },
    inp: {
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between',
      width: "100%",
    },
  });
  
export default Input;