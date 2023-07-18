import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, Text, View, TextInput, Button, Keyboard, Alert, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../../graphql/mutations';
import DatePicker from 'react-native-date-picker'
import {useNavigation} from '@react-navigation/native';
import { responsiveFontSizes } from '@mui/material';
import * as queries from '../../../../graphql/queries';
import styled from 'styled-components/native';

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
  const Separator = styled.View`
    height: 10%;
    width: 100%;
    background-color: #ced0ce;
`;
const ContentView = styled.View`
    height: 50%;
    overflow: hidden;
    margin-bottom: 5px;
`;


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delete a lift!</Text>
      <DropDownPicker
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
      <Button 
              title='Submit'
              onPress={() => onSubmitPress()}
          />
      <Button 
              title='Go back'
              onPress={() => onGoBackPress()}
          />
      {show && (
        <FlatList
            data={fullList}
            keyExtractor={({ id }) => id.toString()}
            ItemSeparatorComponent={() => <Separator />}
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
            <ContentView>
              <Text>Weight: {item.weight} 
                Reps: {item.reps} 
                Date: {item.inputDate}
              </Text>
            </ContentView>
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
      justifyContent:'center',
      alignItems:'center',
  },
  dropDownContainerStyle: {
    backgroundColor: '#cce6ff',
  },
  labelStyle: {
        color: "#003366"
  },
  header: {
    marginBottom: 10,
    fontSize: 20,
    color: '#003366',
  },
  input: {
      borderWidth:1,
      width:'80%',
      borderColor:'#c7c3c3',
      padding:10,
      marginTop: 10,
      marginBottom: 10,
  },
  buttonContainer: {
      width:'80%',
      borderWidth: 1,
  },
})
export default DeleteScreen;