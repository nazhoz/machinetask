import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import MyRides from './MyRides'
import { useNavigation } from '@react-navigation/native'

const MyRideMain = () => {

    const navigation = useNavigation();
  return (
    <View style={{flex:1}}>
      <View style={{width:"100%",height:150,backgroundColor:"#E6FF00",alignItems:"center",justifyContent:"center"}}>
      
      <TouchableOpacity 
      onPress={()=>navigation.navigate('Home') }
      style={{width:30,height:25,top:8,right:325,position:"absolute"}}>
      <Image style={{width:30,height:25,tintColor:"black"}}
               source={require('./Assets/arrow.png')}/>
      </TouchableOpacity>
               
        <Text style={{fontSize:29,fontWeight:"600"}}>Orders</Text>
      </View>
      <MyRides/>
    </View>
    
  )
}

export default MyRideMain

const styles = StyleSheet.create({})