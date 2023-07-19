import React, {useEffect, useState} from 'react';
import { TouchableWithoutFeedback, Pressable, PixelRatio, StyleSheet, Text, View, TextInput, Button, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../graphql/mutations';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}


const SettingsScreen = () => {
  const [name, setName] = React.useState('');
  const [usern, setUsern] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [newName, setNewName] = React.useState('');

  const signOut = async () => {
    Alert.alert(
      "Are you sure you want to sign out? ","",
      [
          {
              text: "No",
          },

          { 
              text: "Yes", 
              onPress: () => Auth.signOut(),
          },
      ],
      {cancelable: false},
    ); 
    
  };

  const onChangeNamePress = async () => {
    Alert.alert(
      "Confirm new name: ",newName,
      [
          {
              text: "Cancel",
              onPress: () => setNewName(''),
          },

          { 
              text: "OK", 
              onPress: () => changeName(),
          },
      ],
      {cancelable: false},
    );  
  }

  const changeName = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, {
      name: newName
    });
    console.log(result);
    loadUser();
    setNewName('');
  }


  const loadUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
        setEmail(user.attributes.email);
        setUsern(user.username);
        setName(user.attributes.name);
      } catch (e) {
      console.log(e.message);
      }  
  }

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
    <View style={styles.container} >
      <Text style = {styles.text}>Name: {name} {'\n'}
      Username: {usern} {'\n'}
      Email: {email} {'\n'}
      </Text>
      <Text style = {styles.header}>Change your name:</Text>
      <TextInput placeholder='New name'
        onChangeText={setNewName}
        value={newName}
        autoCapitalize='none'
        style={styles.input}
      ></TextInput>
        <Pressable 
          onPress={onChangeNamePress} 
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#80bfff' : '#cce6ff' ,
            },
            styles.buttonContainer,
          ]}>
          <Text 
            style = {styles.buttonText}>
            Change name
          </Text>
        </Pressable>
        <Pressable 
          onPress={signOut} 
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#d27979' : '#ecc6c6' ,
            },
            styles.buttonContainer,
          ]}>
          <Text 
            style = {styles.buttonText}>
            Sign out
          </Text>
        </Pressable>
    </View></TouchableWithoutFeedback>
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
  text: {
    fontSize: FONT_BACK_LABEL,
    color: '#003366',
    fontFamily: "Avenir",
    marginVertical: 30,
  },
  header: {
    fontSize: FONT_BACK_LABEL,
    color: '#003366',
    fontFamily: "Avenir",
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: FONT_BACK_LABEL,
  },
  input: {

    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    width: '60%',
  },
})

export default SettingsScreen;