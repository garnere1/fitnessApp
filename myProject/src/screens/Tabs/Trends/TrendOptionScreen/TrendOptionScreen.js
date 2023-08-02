import React from 'react';
import {StyleSheet, Pressable, PixelRatio, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}

const TrendOptionScreen = () => {
  const navigation = useNavigation();

  const onGraphPress = () => {
    navigation.navigate('GraphScreen');
  }
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>What would you like to do?</Text>
      <Pressable 
        onPress={onGraphPress} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#79d2a6' : '#b3e6cc' ,
          },
          styles.buttonContainer,
        ]}>
        <Text 
          style = {styles.buttonText}>
          Graph
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


export default TrendOptionScreen;