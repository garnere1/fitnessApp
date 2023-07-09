import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const onRegisterPressed = () => {
        console.warn("Register");
    }
    const onSignInPress = () => {
        console.warn('onSignUpPress');
    }
    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    }
    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    }
    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                <CustomInput 
                    placeholder="Username" 
                    value={username} 
                    setValue={setUsername}
                    secureTextEntry={false}
                />
                <CustomInput 
                    placeholder="Email" 
                    value={email} 
                    setValue={setEmail}
                    secureTextEntry={false}
                />
                <CustomInput 
                    placeholder="Password"                     
                    value={password} 
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomInput 
                    placeholder="RepeatPassword" 
                    value={passwordRepeat} 
                    setValue={setPasswordRepeat}
                    secureTextEntry
                    
                />
                <CustomButton 
                    text="Register" 
                    onPress={onRegisterPressed}
                />

                <Text style={styles.text}>
                    By registering, 
                    you confirm that you accept our {' '}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '} 
                    <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton 
                    text="Have an account? Sign in" 
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

export default SignUpScreen