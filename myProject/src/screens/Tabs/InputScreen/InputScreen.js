import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import DatePicker from 'react-native-date-picker';


const InputScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Squat', value: 'squat'},
    {label: 'Bench', value: 'bench'},
    {label: 'Deadlift', value: 'deadlift'}
  ]);


  const [weight, setWeight] = React.useState('');
  const [reps, setReps] = React.useState('');
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');

  const onChanged = (text, cond) => {
      let newText = '';
      let numbers = '0123456789';
  
      for (var i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
          }
          else {
              alert("Please enter numbers only");
          }
      }
      if(cond == 'weight') {
        setWeight(newText);
      }
      else if(cond == 'reps'){
        setReps(newText);
      }
      else if(cond == 'day'){
        setDay(newText);
      }
      else if(cond == 'month'){
        setMonth(newText);
      }
      else {
        setYear(newText);
      }
  }

  const onPress = async () => {
      if (weight.length !== 0 && reps.length !== 0 && day.length !== 0 
        && month.length !== 0 && year.length !== 0) {
          Alert.alert(
              "Confirm Weight: " + weight + 
              "\nConfirm Reps: " + reps,
              "",
              [
                  {
                      text: "Cancel",
                      onPress: () => onCancelPress(),
                  },

                  { 
                      text: "OK", 
                      onPress: () => onOkPress(),
                  },
              ],
              {cancelable: false},
          );
      }
      else {
        Alert.alert("All fields are required")
      }
  }

  const onCancelPress = () => {
    setWeight('');
    setReps('');
    setDay('');
    setMonth('');
    setYear('');
  }

  const onOkPress = async() => {
        setWeight('');
        setReps('');
        setDay('');
        setMonth('');
        setYear('');
        try {
            const user = await Auth.currentAuthenticatedUser();
            const response = await API.graphql({
                query: createTodo,
                variables: {
                    input: {
                    "name": value,
                    "weight": weight,
                    "reps": reps,
                    "userId": user.attributes.sub,
                    "userName": user.username,
                    "day": day,
                    "month": month,
                    "year": year,
                }
                }
            });
        console.log('Response :\n');
        console.log(response);
        } catch (e) {
        console.log(e.message);
        }  
        Keyboard.dismiss();
  }
 
  return (
    <View style={styles.container}>
    <Text>Add a lift</Text>
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
          onChangeText={text => onChanged(text, 'day')}
          value={day}
          style={styles.input}
          placeholder='Day'
          maxLength={2}
      />
      <TextInput
          keyboardType='numeric'
          onChangeText={text => onChanged(text, 'month')}
          value={month}
          style={styles.input}
          placeholder='Month'
          maxLength={2}
      />
      <TextInput
          keyboardType='numeric'
          onChangeText={text => onChanged(text, 'year')}
          value={year}
          style={styles.input}
          placeholder='Year'
          maxLength={4}
      />
      <TextInput
          keyboardType='numeric'
          onChangeText={text => onChanged(text, 'weight')}
          value={weight}
          style={styles.input}
          placeholder='Weight'
          maxLength={10}
      />
      <TextInput
          keyboardType='numeric'
          onChangeText={text => onChanged(text, 'reps')}
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