import React, {useEffect, useState} from 'react';
import {StyleSheet, PixelRatio, View, Text, Button} from 'react-native';
import { Auth, API } from 'aws-amplify';
import * as queries from '../../../graphql/queries';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}

const HomeScreen = () => {
  const test = [];
  const [show, setShow] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [squatVal, setSquatVal] = useState(0);
  const [squatPositive, setSquatPositive] = useState(true);
  const [benchVal, setBenchVal] = useState(0);
  const [benchPositive, setBenchPositive] = useState(true);
  const [deadliftVal, setDeadliftVal] = useState(0);
  const [deadliftPositive, setDeadliftPositive] = useState(true);


  const loadData = async (value) => {
    const user = await Auth.currentAuthenticatedUser();
    try {
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
      if(toDoList.length != 0) {
        test.push(toDoList);
        const maxes = test.flatMap(innerArr => innerArr.map(obj => obj.max));
        if(value == "squat") {
          setSquatVal((((maxes[maxes.length - 1] - maxes[0]) / maxes[0]) * 100).toFixed(1));
          if(squatVal < 0) {
            setSquatPositive(false);
          }
        }
        setEmpty(false);
        setShow(true);
      }
      else {
        setShow(false);
        setEmpty(true);
      }
    
    } catch (e) {
      console.log(e.message);
      } 
  }

  useEffect(() => {
    loadData("squat");
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Quick Statistics
      </Text>
      {show && (
        <Text style={[
          {color: squatPositive ? '#53c653' : '#ff4d4d'},
          styles.number,
        ]}>{squatVal}</Text>
      )}
      {empty && (
        <Text>Empty</Text>
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
    marginVertical: 30,
    fontSize: FONT_BACK_LABEL,
    color: '#003366',
    fontFamily: "Avenir",
  },
  number: {
    fontFamily: "Avenir",
  }
})

export default HomeScreen;