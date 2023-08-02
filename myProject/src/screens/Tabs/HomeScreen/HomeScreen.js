import React, {useEffect, useState} from 'react';
import {StyleSheet, PixelRatio, View, Text, Image, useWindowDimensions, Dimensions, Button} from 'react-native';
import { Auth, API } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import squat from '../../../../assets/images/squat.png';
import bench from '../../../../assets/images/bench.png';
import deadlift from '../../../../assets/images/deadlift.png';

var FONT_BACK_LABEL   = 25;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 20;
}

const HomeScreen = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to myFitApp
      </Text>
      <Image
        style={styles.image}
        source={squat}
      />
      <Image
        style={styles.image}
        source={bench}
      />
      <Image
        style={styles.image}
        source={deadlift}
      />
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
  },
  image: {
    width: Dimensions.get("window").width * .5,
    height: Dimensions.get("window").height * 0.2,
  }
})

export default HomeScreen;