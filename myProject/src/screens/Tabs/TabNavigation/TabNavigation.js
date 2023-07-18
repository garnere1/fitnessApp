import React from 'react';
import {View, Text, Image} from 'react-native';
import {Auth} from 'aws-amplify';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../SettingsScreen';
import HomeScreen from '../HomeScreen';
import ActionScreen from '../Actions/ActionScreen';
import TrendsScreen from '../TrendsScreen';
import { fontFamily } from '@mui/system';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <View style={{flex: 1}}>
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
              tabBarLabel: 'Home',
              tabBarLabelStyle: {color: 'black',
                fontFamily: "Avenir",
              },
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={
                    focused
                      ? require('../../../../assets/images/homeLogo.jpeg')
                      : require('../../../../assets/images/homeLogoOutline.jpeg')
                  }
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
              }}
            />
          <Tab.Screen name="Action" 
            component={ActionScreen} 
            options={{
              tabBarLabel: 'Action',
              tabBarLabelStyle: {color: 'black',
                fontFamily: "Avenir",
              },
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={
                    focused
                      ? require('../../../../assets/images/actionLogo.png')
                      : require('../../../../assets/images/actionLogoOutline.png')
                  }
                  style={{
                    width: size * 1.3,
                    height: size* 1.3,
                    borderRadius: size* 1.3,
                  }}
                />
              ),
              }}
          />
          <Tab.Screen name="Trends" 
            component={TrendsScreen} 
            options={{
              tabBarLabel: 'Trends',
              tabBarLabelStyle: {color: 'black',
                fontFamily: "Avenir",
              },
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={
                    focused
                      ? require('../../../../assets/images/trendsLogo.jpeg')
                      : require('../../../../assets/images/trendsLogoOutline.jpeg')
                  }
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
              }}
          />
          <Tab.Screen name="Settings" 
            component={SettingsScreen} 
            options={{
              tabBarLabel: 'Settings',
              tabBarLabelStyle: {color: 'black',
                fontFamily: "Avenir",
              },
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={
                    focused
                      ? require('../../../../assets/images/settingsLogo.png')
                      : require('../../../../assets/images/settingsLogoOutline.png')
                  }
                  style={{
                    width: size * 0.8,
                    height: size* 0.8,
                    borderRadius: size* 0.8,
                  }}
                />
              ),
              }}
          />
        </Tab.Navigator>
    </View>
  );
};

export default TabNavigation;