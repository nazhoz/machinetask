import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './Jsitems/Store'
import HomeScreen from './Screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MapScreen from './Screens/MapScreen'
import Home from './Components/Home'
import StartPage from './Components/StartPage'
import Otp from './Components/Otp'
import Payment from './Components/Payment'
import MyRides from './Components/MyRides'
import Rides from './Components/Rides'
import Parcel from './Components/Parcel'
import MyRideMain from './Components/MyRideMain'
import Safty from './Components/Safty'
import ComplteProfile from './Components/ComplteProfile'
import Profile from './Components/Profile'
import FogotPass from './Components/FogotPass'
import Navigation from './Components/Navigation'
import Main from './Components/Main'
import PayToRegister from './Components/PayToRegister'
import AuctionPage from './Components/AuctionPage'

const App = () => {
 
  const Stack = createStackNavigator()

  return (

     <NavigationContainer>
      <SafeAreaProvider>
       <Stack.Navigator 
       screenOptions={{headerShown:false}}
       initialRouteName='Otp'
       >
        <Stack.Screen name='Start' component={StartPage}/>
        <Stack.Screen name='Main' component={Main}/>
        <Stack.Screen name='Otp' component={Otp}/>
        <Stack.Screen name='forgot' component={FogotPass}/>
        <Stack.Screen name='auctionpage' component={AuctionPage}/>
        <Stack.Screen name='paytoregister' component={PayToRegister}/>
        

       </Stack.Navigator>
      </SafeAreaProvider>
     </NavigationContainer>
  )
}

export default App


const styles = StyleSheet.create({})