import { View, Text, Modal, StyleSheet } from 'react-native';
import React from 'react';
import Button from './Button';
export default function PopUp(props) {

    const { show, animationType = 'slide', setShow, width, height, button_width = 15, button_height = 3, button_textSize = 17, button_txt = 'OK', padding, title, title_size, element, backgroundColor, isButton=true,alignItems='center',justifyContent='center',style } = props

    return (
        <>
            <Modal
                transparent={true}
                visible={show}
                animationType={animationType} //slide ,fade ,none
            >
                <View style={styles.centeredView(justifyContent,alignItems,style)}>

                    <View style={styles.modalView(width, height, padding, backgroundColor)}>
                        {title ? <Text style={styles.title(title_size)}>{title}</Text> : <></>}

                        {/* the element that will show in pop up */}
                        {element}
                        {isButton&&<Button
                            text={button_txt}
                            width={button_width}
                            height={button_height}
                            textSize={button_textSize}
                            onPress={() => { setShow(false); }}
                            justifyContent='flex-end'
                        />}
                    </View>
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    centeredView:(justifyContent,alignItems,style)=> {
       if(style&&style=='information'){
        return{
            flex: 1,
            justifyContent:justifyContent,
            alignItems: alignItems,
            top:'13%',
            right:'5%'
        }
       }
        return{flex: 1,
        justifyContent:justifyContent,
        alignItems: alignItems,
    }
    },
    modalView: (width = 75, height = 40, padding = 5, backgroundColor = "white") => {
        return {
            backgroundColor: backgroundColor,
            borderRadius: 20,
            padding: padding + '%',
            width: width + '%',
            height: height + '%',
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 2,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        }
    },
    title: (title_size = 20) => {
        return {
            fontSize: title_size,

        }
    }
});