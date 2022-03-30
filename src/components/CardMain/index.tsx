import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

import {Feather, Fontisto} from '@expo/vector-icons'

export function CardMain(props){

  const Icon = () => {
    if(props.icon === 'morning'){
      return (
        <Feather name="sun" style={styles.sun} size={40} color="orange"/>
      )
    }
    if(props.icon === 'afternoon'){
      return (
        <Fontisto name="day-cloudy" style={styles.sun} size={40} color="orange"/>
      )
    }
    if(props.icon === 'night'){
      return (
        <Feather name="cloud-rain" style={styles.sun} size={40} color="orange"/>
      )
    }
  }

  const styles = StyleSheet.create({
    card: {
      backgroundColor: props.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      width: 110,
      height: 210,
      borderRadius: 10,
    },
    sun: {
      color: '#FFFFFF',
      margin: 15
    },
    text: {
      color: '#FFFFFF',
      margin: 15,
      fontSize: 20
    }
  })

  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {props.title}
      </Text>
      <Icon/>
      <Text style={styles.text}>
        {props.temperature}
      </Text>
    </View>
  );
}