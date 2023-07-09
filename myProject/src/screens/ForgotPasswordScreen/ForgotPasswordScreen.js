import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');

    const onSendPressed = () => {
        console.warn("Send");
    }
    const onSignInPress = () => {
        console.warn('onSignUpPress');
    }
    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>

                <CustomInput
                    placeholder="username"
                    value={username}
                    setValue={setUsername}
                />

                <CustomButton 
                    text="Send" 
                    onPress={onSendPressed}
                />

                <CustomButton 
                    text="Back to sign in" 
                    onPress={onSignInPress} 
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    }
});

export default ForgotPasswordScreen