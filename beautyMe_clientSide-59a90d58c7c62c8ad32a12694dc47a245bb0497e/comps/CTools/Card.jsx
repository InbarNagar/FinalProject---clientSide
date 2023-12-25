import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import FlipCard from 'react-native-flip-card'
import Input from './Input';
export default function Card(props) {
    const { name, image, index } = props
    return (
        <FlipCard
            // style={styles.card(index)}
            friction={15} //The friction of card animation
            perspective={1000} //The amount of perspective applied to the flip transformation
            flipHorizontal={true}
            flipVertical={false} //If you set false, a card not flip to vertical. If you set true both flipHorizontal and flipVertical , a card flip to diagonal.
            flip={false}  //start side flase=face true=back
            clickable={true}  //false for disable 
        // alignWidth(boolean) Default:false
        // alignHeight(boolean) Default:false
        // onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
        // onFlipStart={()=>{}} When a card starts a flip animation, call onFlipEnd function with param.
        >
            {/* Face Side */}
            <View style={styles.face}>
                <Text style={styles.faceTitle}>{name}</Text>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            {/* Back Side */}
            <View style={styles.back}>
                    <Text style={styles.backTitle}>Carbohydrates: 34</Text>
                    <Input
                        label='Unit of measure'
                        height={40}
                        width={100}
                        editable={false}
                        type='selectBox'
                        SelectBox_placeholder='Select Unit of measure'
                        selectBox_items={[
                            { itemKey: 0, label: 'unit', value: 'unit' },
                            { itemKey: 1, label: 'grams', value: 'grams' },
                            { itemKey: 2, label: 'cup', value: 'cup' },
                        ]} />
                    <Input
                        label='amount'
                        validtion='number'
                        keyboardType='decimal-pad'
                        height={40}
                        width={100}
                    />
            </View>
        </FlipCard>

    );
}
const styles = StyleSheet.create({
    // card: (index) => {
    //     //the two first cards witout exstra posttion
    //     let bottom=0
    //    if(index>=2){
    //     bottom=38
    //        if(index%2==0){
    //            bottom*=index;
    //        }else{
    //         bottom*=(index-1);
    //        }
    //    }
    //     return {
    //         borderWidth: 2,
    //         flex: 0.6,
    //         width: '95%',
    //         borderColor: 'white',
    //         bottom: bottom,
    //     }
    // },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    face: {
        flex: 1,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    faceTitle: {
        fontSize: 20
    },
    back: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ff9900',
        paddingTop: '5%'
    },
    backTitle: {
        marginBottom: '2%',
        fontSize: 16,
        fontWeight: 'bold'
    }

})