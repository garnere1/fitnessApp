import React, {useEffect, useState} from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View, TextInput, Button, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../graphql/mutations';

const SettingsScreen = () => {
  const [name, setName] = React.useState('');
  const [usern, setUsern] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [newName, setNewName] = React.useState('');

  const signOut = () => {
    Auth.signOut();
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
      <Text>Name: {name}</Text>
      <Text>Username: {usern}</Text>
      <Text>Email: {email}</Text>
      <Text>Change your name:</Text>
      <TextInput placeholder='New name'
        onChangeText={setNewName}
        value={newName}
        autoCapitalize='none'
        style={styles.input}
      ></TextInput>
      <View style={styles.buttonContainer}>
        <Button 
            title='Change name'
            onPress={() => onChangeNamePress()}
        />
      </View>
      <Text
        onPress={signOut}
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'red',
          marginTop: 'auto',
          marginVertical: 20,
          fontSize: 20,
        }}>
        Sign out
      </Text>
    </View></TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  },
  input: {
      borderWidth:1,
      width:'80%',
      borderColor:'#c7c3c3',
      padding:10,
  },
  buttonContainer: {
      marginBottom: 1,
      width:'80%',
  },
})

export default SettingsScreen;