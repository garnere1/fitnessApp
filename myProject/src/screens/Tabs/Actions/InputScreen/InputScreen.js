import React, {useState} from 'react';
import { StyleSheet, Pressable, PixelRatio, Text, View, TextInput, Button, Keyboard, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API } from 'aws-amplify';
import { createTodo } from '../../../../graphql/mutations';
import DatePicker from 'react-native-date-picker'
import {useNavigation} from '@react-navigation/native';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}


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

  const onSubmitPress = async () => {
        setInputDate(date.toISOString().substring(0,10));
    if(reps >= 37) {
      Alert.alert("Max reps is 36")
    }
    else if (weight.length !== 0 && reps.length !== 0 && weight != 0 && reps != 0) {
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
        placeholder="Select a lift"
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
  dropDownContainerStyle: {
    backgroundColor: "#f2f2f2",
  },
  labelStyle: {
        color: "#003366",
        fontFamily: "Avenir",
  },
  input: {
      borderWidth:2,
      width:'80%',
      borderColor:'#9494b8',
      padding:10,
      marginTop: 10,
      marginBottom: 10,
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

export default InputScreen;