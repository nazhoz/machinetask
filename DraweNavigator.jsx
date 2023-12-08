import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'


const Drawer = createDrawerNavigator();

 
const DraweNavigator = () => {
  
    <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="MapScreen" component={MapScreen} />
  </Drawer.Navigator>
}

export default DraweNavigator

const styles = StyleSheet.create({})