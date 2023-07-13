import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';


const TrendsScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Squat', value: 'squat'},
    {label: 'Bench', value: 'bench'},
    {label: 'Deadlift', value: 'deadlift'}
  ]);
  const [show, setShow] = useState(false);
  const [li, setLi] = useState(false);

  const onPress = async (value) => {
    try {
        const variables = {
          filter: {
            name: {
              eq: value
            }
          }
        };
        const allTodos = await API.graphql({ query: queries.listTodos, variables: variables });
        const toDoList = allTodos.data.listTodos.items;
        setLi(toDoList);
        setShow(true);
     } catch (e) {
      console.log(e.message);
    }  
}
  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button 
          title='Submit'
          onPress={() => onPress(value)}
      />
      {show && (
        li.map((b, i) => <Text key={i}>{"Weight: " + b.weight + " Reps: " + b.reps}</Text>)
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


export default TrendsScreen;