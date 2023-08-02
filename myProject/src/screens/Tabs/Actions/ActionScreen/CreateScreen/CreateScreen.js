import React, {useState} from 'react';
import { StyleSheet,TouchableOpacity, Pressable,FlatList, PixelRatio, Text, View, TextInput, Button, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API } from 'aws-amplify';
import { createLifts, deleteLifts } from '../../../../../graphql/mutations';
import DatePicker from 'react-native-date-picker'
import {useNavigation} from '@react-navigation/native';
import { create } from 'react-test-renderer';
import * as queries from '../../../../../graphql/queries';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}


const CreateScreen = () => {
  const navigation = useNavigation();
  const [newName, setNewName] = React.useState('');
  const [fullList, setFullList] = useState([0]);
  const [show, setShow] = useState(false);
  const [empty, setEmpty] = useState(false);

  const onGoBackPress = () => {
    navigation.navigate('TabNavigation');
    //setItems(items => [...items, {label : 'test', value: 'testVal'}]);
    
  }
  const onSubmitPress = async () => {
    if(newName.length == 0) {
      Alert.alert("Input name of new exercise")
    }
    else {
      Alert.alert(
      "Confirm name of exercise: ", newName,
      [
          {
              text: "Cancel",
              onPress: () => setNewName(''),
          },

          { 
              text: "Submit", 
              onPress: () => onChangePress(),
          },
      ],
      {cancelable: false},
      );  
    }
  }

  const onChangePress = async() => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql({
          query: createLifts,
          variables: {
              input: {
              "name": newName,
              "userId": user.attributes.sub,
              "userName": user.username,
          }
          }
      });
      console.log('Response :\n');
      console.log(response);
    } catch (e) {
    console.log(e.message);
    }  
    Keyboard.dismiss();
    setNewName('');
  }

  const onDeletePress = async(id_num) => {
    try {
        const response = await API.graphql({ 
        query: deleteLifts, 
        variables: { input: {id: id_num} }
      });
      console.log('Response :\n');
      console.log(response);
      onDeleteListPress();
    } catch (e) {
      console.log(e.message);
    }  
  }

  const onDeleteListPress = async() => {
    const user = await Auth.currentAuthenticatedUser();
    const variables = 
    {
      filter: {
        userName: {
          eq: user.username
        }
      },
    };
    const allTodos = await API.graphql({ 
      query: queries.listLifts, 
      variables: variables 
    });
    const toDoList = allTodos.data.listLifts.items;
    setFullList(toDoList);
    if(toDoList.length != 0) {
      setEmpty(false);
      setShow(true);
    }
    else {
      setShow(false);
      setEmpty(true);
    }
  }


  return (
    <View style={styles.container}>
    <Text style={styles.header}>Add an exercise:</Text>
    <TextInput placeholder='Name of exercise'
        onChangeText={setNewName}
        value={newName}
        autoCapitalize='none'
        style={styles.input}
      ></TextInput>
      <Pressable 
        onPress={onSubmitPress} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#80bfff' : '#cce6ff' ,
          },
          styles.buttonContainer,
        ]}>
        <Text 
          style = {styles.buttonText}>
          Submit
        </Text>
      </Pressable>
      <Pressable 
        onPress={onDeleteListPress} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#ff884d' : '#ffbb99' ,
          },
          styles.buttonContainer,
        ]}>
        <Text 
          style = {styles.buttonText}>
          Delete an exercise
        </Text>
      </Pressable>

      {show && (
        <Text>Click which exercise you would like to delete</Text>
      )}

      {show && (
        <FlatList
            data={fullList}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => 
            <TouchableOpacity
                onPress={() =>
                    Alert.alert(
                      "Confirm Delete: ",
                      "\nName: " + item.name,
                      [
                          {
                              text: "Cancel",
                          },

                          { 
                              text: "Delete", 
                              onPress: () => onDeletePress(item.id),
                          },
                      ],
                      {cancelable: false},
                    )
                }
            >
              <Text style={styles.text}>
                <Text style={{fontWeight: 'bold'}}>Name:</Text> {item.name}               </Text>
            </TouchableOpacity>
          }
        />
      )}
      {empty && (
        <Text style={styles.header}>No custom exercises</Text>
      )}
      <Pressable 
        onPress={onGoBackPress} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#d27979' : '#ecc6c6' ,
            position: 'absolute', 
            bottom: 0, 
          },
          styles.buttonContainer,
        ]}>
        <Text 
          style = {styles.buttonText}>
          Go back
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
    marginVertical: 30,
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
  text: {
    flex: 1,
    borderWidth:2,
    width:'100%',
    borderColor:'#9494b8',
    padding:10,
    marginVertical: 8,
    fontFamily: "Avenir",
},
})

export default CreateScreen;