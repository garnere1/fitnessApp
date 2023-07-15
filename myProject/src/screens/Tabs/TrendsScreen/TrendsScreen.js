import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Alert, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


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
  const [keys, setKeys] = useState(false);
  const [points, setPoints] = useState(false);
  const [nums, setNums] = useState([0]);
  const [dates, setDates] = useState([0]);

  const test = [];

  const onPress = async (value) => {
    const user = await Auth.currentAuthenticatedUser();
    try {
        const variables = {
          filter: {
            name: {
              eq: value
            },
            userName: {
              eq: user.username
            }
          }
        };
        const allTodos = await API.graphql({ query: queries.listTodos, variables: variables });
        const toDoList = allTodos.data.listTodos.items;
        setLi(toDoList);
        test.push(toDoList);
        console.log(test);
        const times = test.flatMap(innerArr => innerArr.map(obj => obj.createdAt.substring(5,10)));
        const weights = test.flatMap(innerArr => innerArr.map(obj => obj.weight));
        setShow(true);
        setNums(weights.map(Number));
        setDates(times);

     } catch (e) {
      console.log(e.message);
    }  
    
  }


  const data = {
      labels: dates,
      datasets: [
        {
          data: nums,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
          strokeWidth: 2 
        }
      ],
    };

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
      {show && (
        <LineChart
        data={data}
        width={Dimensions.get("window").width / 1.1}
        height={220}
        yAxisSuffix="lb"
        chartConfig={{
          decimalPlaces: 2, 
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#ccd9ff",
          backgroundGradientTo: "#ccd9ff",
          color: (opacity = 1) => `rgba(39, 73, 245, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(39, 73, 245, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
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
  chart: {
    flex: 1
  },
})


export default TrendsScreen;