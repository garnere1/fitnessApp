import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';

const CustomInput = ({ onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {}
            ]}>
            <Text 
                style={[
                    styles.text, 
                    styles[`text_${type}`],
                    fgColor ? {color: fgColor} : {}
                ]}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding:15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY: {
        backgroundColor: '#3DB8FF',
    },

    container_TERTIARY: {
        backgroundColor: '#B5E6FF',
        borderColor: '#C6C8C9',
        borderWidth: 2,
    },

    container_SECONDARY: {
        backgroundColor: '#E8F7FF',
        borderColor: '#C6C8C9',
        borderWidth: 2,
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'grey',
    },

    text_SECONDARY: {
        color: 'grey',
    }
});

export default CustomInput