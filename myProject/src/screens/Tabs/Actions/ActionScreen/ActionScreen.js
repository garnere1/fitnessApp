import React from 'react';
import {StyleSheet, Pressable, PixelRatio, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}

const ActionScreen = () => {
  const navigation = useNavigation();

  const onInputPress = () => {
    navigation.navigate('InputScreen');
  }

  const onDeletePress = () => {
    navigation.navigate('DeleteScreen');
  }

  const onCreatePress = () => {
    navigation.navigate('CreateScreen');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>What would you like to do?</Text>
      <Pressable 
        onPress={onInputPress} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#79d2a6' : '#b3e6cc' ,
          },
          styles.buttonContainer,
        ]}>
        <Text 
          style = {styles.buttonText}>
          Input
        </Text>
      </Pressable>
      
      <Pressable 
        onPress={onDeletePress} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#d27979' : '#e6b3b3',
          },
          styles.buttonContainer,
        ]}>
        <Text 
          style = {styles.buttonText}>
          Delete
        </Text>
      </Pressable>
      <Pressable 
        onPress={onCreatePress} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#6666ff' : '#b3b3ff',
          },
          styles.buttonContainer,
        ]}>
        <Text 
          style = {styles.buttonText}>
          Edit lifts
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#d6e0f5",
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  header: {
    marginVertical: '20%',
    fontSize: FONT_BACK_LABEL,
    fontFamily: "Avenir",
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 20,
    padding: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: FONT_BACK_LABEL,
  },
  deleteButton: {
    fontFamily: "Avenir",
    borderWidth: 3,
    fontSize: FONT_BACK_LABEL,
  }
})


export default ActionScreen;