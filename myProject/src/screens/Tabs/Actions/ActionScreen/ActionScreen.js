import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';

const ActionScreen = () => {
  
  const navigation = useNavigation();

  const onInputPress = () => {
    navigation.navigate('InputScreen');
  }

  const onDeletePress = () => {
    navigation.navigate('DeleteScreen');
  }

  return (
    <View style={{flex: 1}}>
      <Text>What would you like to do?</Text>
      <Button 
              title='Input'
              onPress={() => onInputPress()}
      />
      <Button 
              title='Delete'
              onPress={() => onDeletePress()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  },
})

export default ActionScreen;