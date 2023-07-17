import React from 'react';
import {View, Text, Button} from 'react-native';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';

const DeleteScreen = () => {
  
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('TabNavigation');
  }

  return (
    <View style={{flex: 1}}>
      <Button 
              title='Go back'
              onPress={() => onPress()}
          />
    </View>
  );
};

export default DeleteScreen;