import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/Signing/SignInScreen';
import SignUpScreen from '../screens/Signing/SignUpScreen';
import ConfirmEmailScreen from '../screens/Signing/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/Signing/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/Signing/NewPasswordScreen';
import TabNavigation from '../screens/Tabs/TabNavigation';
import {Auth, Hub} from 'aws-amplify';
import DeleteScreen from '../screens/Tabs/Actions/DeleteScreen';
import InputScreen from '../screens/Tabs/Actions/InputScreen';
import CreateScreen from '../screens/Tabs/Actions/ActionScreen/CreateScreen';
import GraphScreen from '../screens/Tabs/Trends/GraphScreen/GraphScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
          <Stack.Screen name="InputScreen" component={InputScreen} />
          <Stack.Screen name="CreateScreen" component={CreateScreen} />
          <Stack.Screen name="GraphScreen" component={GraphScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;