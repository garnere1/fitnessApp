import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const onConfirmPressed = () => {
        navigation.navigate('Home')
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn')
    }
    const onResendPress = () => {
        console.warn('onResendPress');
    }
    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your email</Text>

                <CustomInput
                    placeholder="Enter your confirmation code"
                    value={code}
                    setValue={setCode}
                />

                <CustomButton 
                    text="Confirm" 
                    onPress={onConfirmPressed}
                />

                <CustomButton 
                    text="Resend code" 
                    onPress={onResendPress} 
                    type="SECONDARY"
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

export default ConfirmEmailScreen