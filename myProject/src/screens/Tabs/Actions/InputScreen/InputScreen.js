import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../../graphql/mutations';
import DatePicker from 'react-native-date-picker'
import {useNavigation} from '@react-navigation/native';


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
  const [inputDate, setInputDate] = React.useState('');
    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();

    const onGoBackPress = () => {
      navigation.navigate('TabNavigation');
    }


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
        setInputDate(date.toISOString().substring(0,10));
        
    if (weight.length !== 0 && reps.length !== 0) {
          let max = (weight * (36/(37-reps))).toFixed(0);
          Alert.alert(
              "Confirm: " + weight + " x " + reps,
              "\n1 rep max: " + max,
              [
                  {
                      text: "Cancel",
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

  const onOkPress = async() => {
        setWeight('');
        setReps('');
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
                    "inputDate": inputDate,
                    "type": "general",
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
    <Text style={styles.header}>Add a lift!</Text>
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
      <DatePicker date={date} 
        mode="date" 
        onDateChange={setDate} 
        textColor="#002b80"
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
      <Button 
              title='Go back'
              onPress={() => onGoBackPress()}
          />
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

export default InputScreen;