import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TextInput, Button, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../graphql/mutations';

const todo = { name: "My first todo", description: "Hello world!" };

const InputScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Squat', value: 'squat'},
    {label: 'Bench', value: 'bench'},
    {label: 'Deadlift', value: 'deadlift'}
  ]);

  const [number, setNumber] = React.useState('');
  const [reps, setReps] = React.useState('');

  const onChanged = (text) => {
      let newText = '';
      let numbers = '0123456789';
  
      for (var i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
          }
          else {
              alert("please enter numbers only");
          }
      }
      setNumber(newText);
  }
  const onChanged1 = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            alert("please enter numbers only");
        }
    }
    setReps(newText);
}

  const onPress = async () => {
      if (number.length !== 0) {
          Alert.alert(
              "Confirm Number",
              number,
              [
                  {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                  },

                  { 
                      text: "OK", 
                      onPress: () => console.log("OK Pressed"),
                  },
              ],
          );
          setNumber('');
          setReps('');
          try {
            const response = await API.graphql(graphqlOperation(createTodo, {input: todo}));
            console.log('Response :\n');
            console.log(response);
          } catch (e) {
            console.log(e.message);
          }          
          Keyboard.dismiss();
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
      <TextInput
          keyboardType='numeric'
          onChangeText={text => onChanged(text)}
          value={number}
          style={styles.input}
          placeholder='Weight'
          maxLength={10}
      />
      <TextInput
          keyboardType='numeric'
          onChangeText={text1 => onChanged1(text1)}
          value={reps}
          style={styles.input}
          placeholder='Reps'
          maxLength={10}
      />
      <View style={styles.buttonContainer}>
          <Button 
              title='Submit'
              onPress={() => onPress()}
          />
      </View>
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

export default InputScreen;