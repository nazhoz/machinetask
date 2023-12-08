import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavOptions from '../Components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env'
import { useDispatch } from 'react-redux';
import { setDestination,setOrigin} from '../Slices/Navslice';
import MapView from 'react-native-maps';


const HomeScreen = () => {
 
  const dispatch = useDispatch();


  return (
    <SafeAreaView style={tw`bg-white h-full`}>
       <View style={{width:"100%",height:160,justifyContent:"space-evenly"}}>
      
<GooglePlacesAutocomplete
    styles={{
        
        container: {
            flex:0,
            borderWidth:1,
            borderColor:"gray",
            borderRadius:10
        },
        textInput:{
            fontSize:18,
            color:'grey',
            textAlign:"center"
        }
    }}
    enablePoweredByContainer={false}
    query={{
        key:"AIzaSyA_l_K_OuqpSIrYiULGz22Vbe4votSkqvM",
        language:'en'
    }}
    
    onPress={(data, details=null)=>{
        dispatch(setOrigin({
            location:details.geometry.location,
            discription:data.description
        }))

        dispatch(setDestination(null));
    }}
    fetchDetails={true}
    returnKeyType={"search"}
    placeholder='Where From'
    nearbyPlacesAPI='GooglePlaceSearch'
    debounce={400}


/>
<GooglePlacesAutocomplete
    styles={{
        
        container: {
            flex:0,
            borderWidth:1,
            borderColor:"gray",
            borderRadius:10
        },
        textInput:{
            fontSize:18,
            color:'grey',
            textAlign:"center"
        }
    }}
    enablePoweredByContainer={false}
    query={{
        key:"AIzaSyA_l_K_OuqpSIrYiULGz22Vbe4votSkqvM",
        language:'en'
    }}
    
    onPress={(data, details=null)=>{
        dispatch(setOrigin({
            location:details.geometry.location,
            discription:data.description
        }))

        dispatch(setDestination(null));
    }}
    fetchDetails={true}
    returnKeyType={"search"}
    placeholder='Where up to'
    nearbyPlacesAPI='GooglePlaceSearch'
    debounce={400}
/>


        
       
       </View>

      
       <MapView
  style={{ width: "100%", height: 300 }}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  txt:{
    color:"blue"
  }
})