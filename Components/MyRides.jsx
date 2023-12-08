import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Rides from './Rides';
import Parcel from './Parcel';
import { color } from 'react-native-tailwindcss';

const MyRides = () => {

   const Tab = createMaterialTopTabNavigator();

  return (
        <Tab.Navigator
         tabBarOptions={{
          labelStyle: {
            color: 'black', // Tab label color
          },
          indicatorStyle: {
            backgroundColor: 'black', // Indicator (line) color
          },
          style: {
            backgroundColor: '#E6FF00', // Background color of the tab bar
          },
        }}
         
        >
          <Tab.Screen name="Ride" component={Rides} />
          <Tab.Screen name="Parcel" component={Parcel} />
        </Tab.Navigator>
     
  )
}

export default MyRides

const styles = StyleSheet.create({})