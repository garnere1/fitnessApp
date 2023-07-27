import React, {useEffect, useState} from 'react';
import {StyleSheet, PixelRatio, View, Text, Button} from 'react-native';
import { Auth, API } from 'aws-amplify';
import * as queries from '../../../graphql/queries';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to "App name"
      </Text>
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