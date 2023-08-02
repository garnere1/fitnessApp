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
        backgroundColor: '#7094db',
    },

    container_TERTIARY: {
        backgroundColor: '#99b3e6',
        borderColor: '#C6C8C9',
        borderWidth: 2,
    },

    container_SECONDARY: {
        backgroundColor: '#d6e0f5',
        borderColor: '#C6C8C9',
        borderWidth: 2,
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'black',
    },

    text_SECONDARY: {
        color: 'black',
    }
});

export default CustomInput