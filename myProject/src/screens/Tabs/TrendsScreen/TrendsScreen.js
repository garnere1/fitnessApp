import React, {useEffect, useState} from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, Button, Keyboard, Alert, Dimensions, ActionSheetIOS } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Auth, API, graphqlOperation, SortDirection } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import {useNavigation} from '@react-navigation/native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import SelectDropdown from 'react-native-select-dropdown'



const TrendsScreen = () => {
  const [liftsOpen, setLiftsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [lifts, setLifts] = useState([
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
  const navigation = useNavigation();
  const list = ["Squat", "Bench", "Deadlift"];
  
  const test = [];
  const test2 = [];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      loadList();
    });
    
  }, [])

  const loadList = async() => {
    const user = await Auth.currentAuthenticatedUser();
    const variables = 
    {
      filter: {
        userName: {
          eq: user.username
        }
      },
    };
    const allTodos = await API.graphql({ 
      query: queries.listLifts, 
      variables: variables 
    });
    const toDoList = allTodos.data.listLifts.items;
    test2.push(toDoList);
    const names = test2.flatMap(innerArr => innerArr.map(obj => obj.name));
    names.forEach((name) => {
      list.push(name);
      console.log(name);
    });
    console.log(list);
  }

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
      <SelectDropdown
        data={list}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
      <Button 
          title='Submit'
          onPress={() => onPress(value)}
      />
      {noGraph && (
        <Text>No data yet</Text>
      )}
      {show && (
        <ScrollView horizontal={true}>
          <LineChart
            data={data}
            verticalLabelRotation={30}
            width={Dimensions.get("window").width * 1.5}
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
              borderRadius: 5,
            }}
          />
        </ScrollView>
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
    backgroundColor: "#d6e0f5",
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  dropDownContainerStyle: {
    backgroundColor: "#f2f2f2",
  },
  labelStyle: {
    color: "#003366",
    fontFamily: "Avenir",
  },
})


export default TrendsScreen;