import React from 'react';
import {View, Text} from 'react-native';
import {Auth} from 'aws-amplify';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../SettingsScreen';
import HomeScreen from '../HomeScreen';
import ActionScreen from '../Actions/ActionScreen';
import TrendsScreen from '../TrendsScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <View style={{flex: 1}}>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Action" component={ActionScreen} />
            <Tab.Screen name="Trends" component={TrendsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    </View>
  );
};

export default TabNavigation;