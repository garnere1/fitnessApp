import React, {useState} from 'react';
import { ScrollView, StyleSheet, Pressable, PixelRatio, FlatList, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API } from 'aws-amplify';
import {deleteTodo } from '../../../../graphql/mutations';
import {useNavigation} from '@react-navigation/native';
import * as queries from '../../../../graphql/queries';
import styled from 'styled-components/native';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}


const DeleteScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Squat', value: 'squat'},
    {label: 'Bench', value: 'bench'},
    {label: 'Deadlift', value: 'deadlift'}
  ]);
  const [fullList, setFullList] = useState([0]);
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  

  const onGoBackPress = () => {
    navigation.navigate('TabNavigation');
  }

  const onDeletePress = async(id_num) => {
    try {
        const response = await API.graphql({ 
        query: deleteTodo, 
        variables: { input: {id: id_num} }
      });
      console.log('Response :\n');
      console.log(response);
      onSubmitPress();
    } catch (e) {
      console.log(e.message);
    }  
  }

  const onSubmitPress = async() => {
    const user = await Auth.currentAuthenticatedUser();
    const variables = 
    {
      type: "general",
      filter: {
        name: {
          eq: value
        },
        userName: {
          eq: user.username
        }
      },
      sortDirection: "ASC",
    };
    const allTodos = await API.graphql({ 
      query: queries.todosByDate, 
      variables: variables 
    });
    const toDoList = allTodos.data.todosByDate.items;
    setFullList(toDoList);
    if(toDoList.length != 0) {
      setShow(true);
    }
    else {

    }
    
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delete a lift!</Text>
      <DropDownPicker
        placeholder="Select which lift you want to delete"
        placeholderStyle={{
          color: "black",
          fontFamily: "Avenir",
        }}
        dropDownDirection='AUTO'
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        dropDownContainerStyle = {styles.dropDownContainerStyle}
        itemSeparator={true}
        labelStyle = {styles.labelStyle}
      />
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
        onPress={onGoBackPress} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#d27979' : '#ecc6c6' ,
          },
          styles.buttonContainer,
        ]}>
        <Text 
          style = {styles.buttonText}>
          Go back
        </Text>
      </Pressable>
      {show && (
      <Text style={styles.header2}>Click the lift you want to delete</Text>
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
                      "\nDate: " + item.inputDate,
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
              <Text style={styles.text}>Weight: {item.weight} 
                {' '}Reps: {item.reps} 
                {'\n'}Date: {item.inputDate}
              </Text>
            </TouchableOpacity>
          }
        />
      )}
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
    fontSize: FONT_BACK_LABEL,
    color: '#003366',
    fontFamily: "Avenir",
    marginVertical: 30,
  },
  header2: {
    fontSize: FONT_BACK_LABEL,
    color: '#003366',
    fontFamily: "Avenir",
    marginVertical: 20,
  },
  dropDownContainerStyle: {
    backgroundColor: "#f2f2f2",
  },
  labelStyle: {
    color: "#003366",
    fontFamily: "Avenir",
  },
  
  text: {
    borderWidth:2,
    width:'100%',
    borderColor:'#9494b8',
    padding:10,
    marginVertical: 8,
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
})
export default DeleteScreen;