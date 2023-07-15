import React from 'react';
import {View, Text} from 'react-native';
import {Auth} from 'aws-amplify';

const HomeScreen = () => {
  const signOut = () => {
    Auth.signOut();
  };

  return (
    <View style={{flex: 1}}>
      <Text>
        Home page
      </Text>
    </View>
  );
};

export default HomeScreen;