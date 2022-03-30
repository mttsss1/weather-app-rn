import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  PermissionsAndroid} 
  from 'react-native';

import {Feather, EvilIcons} from '@expo/vector-icons'
import * as Location from 'expo-location'

import { CardMain } from './src/components/CardMain';
import { InfoCard } from './src/components/InfoCard';
import getCurrentWeather from './src/api/api';

export default function App() {

  const [darkTheme, setDarkTheme] = useState (true);
  const [currentTemperature, setCurrentTemperature] = useState ('27')
  const [location, setLocation] = useState ('BR, São Paulo')
  const [currentHour, setCurrentHour] = useState ('13:00')

  const [wind, setWind] = useState('65')
  const [umidity, setUmidity] = useState('80')
  const [tempMin, setTempMin] = useState('21')
  const [tempMax, setTempMax] = useState('31')
  const [locationCoords, setLocationCoords] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#232624' : '#F2F2F2',
      alignItems: 'center',
    },
    sun: {
      marginTop: 60
    },
    temperature: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10
    },
    temperatureText: {
      fontSize: 55,
      color: darkTheme ? '#E0E0E0' : 'black',
    },
    refreshButton: {
      top: 50,
      margin: 30,
      alignSelf: 'flex-start'
    },
    cardView: {
      color: darkTheme ? 'black' : 'white',
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    info: {
      alignItems: 'center',
      backgroundColor: darkTheme ? '#393E54' : '#8F8F8F',
      borderRadius: 20,
      width: 350,
      height: 250
    },
    infoText: {
      color: darkTheme ? '#E0E0E0' : '#FFFFFF',
      fontSize: 20,
      margin: 15,
      fontWeight: 'bold'
    },
    infoCards: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25
    },
    squareButton: {
      backgroundColor: darkTheme ? '#F2F2F2' : '#8F8F8F',
      justifyContent: 'center',
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25
    },
    circleButton: {
      backgroundColor: darkTheme ? '#232634' : '#F2F2F2',
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 50
    }
  });

  async function setCurrentWeather (){

    let date = new Date()
    setCurrentHour(date.getHours() + ':' + date.getMinutes())

    await getLocation()

    const data = await getCurrentWeather(locationCoords)
    
    setCurrentTemperature(convertKelvinInC(data[0]))
    setTempMin(convertKelvinInC(data[1]))
    setTempMax(convertKelvinInC(data[2]))
    setLocation(data[3])
    setWind(data[4])
    setUmidity(data[5])
  }

  function convertKelvinInC(kelvin){
    return parseInt(kelvin - 273)
  }
  
  async function getLocation (){
    let {status} = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted'){
      setErrorMsg('Sem permissão')
    }
    else {
      let location = await Location.getCurrentPositionAsync({})
      await setLocationCoords(location.coords)
    }
  }

  useEffect(() => {
    setCurrentWeather()
  }, [])

  return (
    <View style={styles.container}>

      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={() => setCurrentWeather()}
      >
        <EvilIcons
          name="refresh"
          size={24}
          color={darkTheme ? 'white' : 'black'}
        />
      </TouchableOpacity>

      <Feather
        name="sun"
        style={styles.sun}
        size={40}
        color="orange"
      />

      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>
          {currentTemperature}
        </Text>
        <Text style={[styles.temperatureText, {fontSize: 14}]}>
          °C
        </Text>
      </View>

      <Text style={[styles.temperatureText, {fontSize: 14}]}>
        {location}, {currentHour}
      </Text>

      <View style={styles.cardView}>
        <CardMain 
          title={'Manhã'}
          backgroundColor={darkTheme ? '#FF873D' : '#CC6E30'}
          icon={'morning'}
          temperature={'24°'}
        />
        <CardMain 
          title={'Tarde'}
          backgroundColor={darkTheme ? '#D29600' : '#FCC63F'}
          icon={'afternoon'}
          temperature={'31°'}
        />
        <CardMain 
          title={'Noite'}
          backgroundColor={darkTheme ? '#008081' : '#38B7B8'}
          icon={'night'}
          temperature={'21°'}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          Informações adicionais
        </Text>
        <View style={styles.infoCards}>
          <InfoCard title={'Vento'} value={wind + 'm/h'}></InfoCard>
          <InfoCard title={'Umidade'} value={umidity + '%'}></InfoCard>
          <InfoCard title={'Temp. Min'} value={tempMin}></InfoCard>
          <InfoCard title={'Temp. Max'} value={tempMax}></InfoCard>
        </View>
      </View>

      <View style={styles.themeButton}>
        <View style={styles.squareButton}>
          <TouchableOpacity 
            style={styles.circleButton}
            onPress={() => darkTheme ? setDarkTheme (false) : setDarkTheme (true)}
          >

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
