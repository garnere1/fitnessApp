import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, Alert, Dimensions, ActionSheetIOS } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API, graphqlOperation, SortDirection } from 'aws-amplify';
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
import list from 'tcomb-form-native/lib/templates/bootstrap/list';



const TrendsScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Squat', value: 'squat'},
    {label: 'Bench', value: 'bench'},
    {label: 'Deadlift', value: 'deadlift'}
  ]);
  const [show, setShow] = useState(false);
  const [noGraph, setNoGraph] = useState(false);
  const [nums, setNums] = useState([0]);
  const [dates, setDates] = useState([0]);
  const [showText, setShowText] = useState(false);
  const [days, setDays] = useState([0]);
  const [month, setMonth] = useState([0]);
  const [years, setYears] = useState([0]);
  
  const test = [];
  const test2 = [];

  /*query todosByDate {
    todosByDate(
      type: "Todo"
      sortDirection: ASC
    ) {
      items {
        id
        title
        createdAt
      }
    }
  }*/

  const onPress = async (value) => {
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
          const weights = test.flatMap(innerArr => innerArr.map(obj => obj.weight));
          const reps = test.flatMap(innerArr => innerArr.map(obj => obj.reps));
          const days = test.flatMap(innerArr => innerArr.map(obj => obj.inputDate));
          arr1 = weights.map(Number)
          arr2 = reps.map(Number)
          const te = arr1.map(function(x,y){return ((x * (36/(37-arr2[y]))).toFixed(2))});
          setShow(true);
          setNoGraph(false);
          setNums(te.map(Number));
          setDates(days);
        }
        else {
          setShow(false);
          setNoGraph(true);
        }
      
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
      {noGraph && (
        <Text>No data yet</Text>
      )}
      {show && (
        <LineChart
        data={data}
        width={Dimensions.get("window").width / 1.1}
        height={220}
        withInnerLines = "false"
        withOuterLines = "false"
        withVerticalLines = "false"
        withHorizontalLines = "false"
        onDataPointClick={({index})=>{

          setShowText(true);
        }} 
        yAxisSuffix=" lbs"
        chartConfig={{
          decimalPlaces: 0, 
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
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
          borderRadius: 5,

        }}
      />
      )}
      {showText && (
        <Text>Hello</Text>
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