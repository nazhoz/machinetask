import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React, { useState ,useEffect, useRef} from 'react'
import tw from 'tailwind-react-native-classnames'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapViewDirections from 'react-native-maps-directions';
// import haversine from 'haversine-distance';
import Video from 'react-native-video';
import DraggableBottomSheet from './DraggableBottomSheet'





const Home = () => {

  const navigation = useNavigation()

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [initialLatitude, setInitialLatitude] = useState(null);
  const [initialLongitude, setInitialLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  const [fare,setfare] = useState('')


  const videoRef = useRef(null);

  const handleEnd = () => {
    // Seek to the beginning when the video ends to create a loop
    videoRef.current.seek(0);
  };


  
  
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuAnimation = new Animated.Value(0);
  // const overlayAnimation = new Animated.Value(0);
  
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const [isBottomVisible, setIsBottomVisible] = useState(false);

  const toggleBottomSheet = () =>{
    setIsBottomVisible(!isBottomVisible)
  }

  const bottomSheetCloseButton = ()=>{
    setIsBottomVisible(false)
  }

  const [isFullScreen, setIsFullScreen] = useState(false);

  const fullScreen = ()=>{
    setIsFullScreen(!isFullScreen)
  }

 
  Animated.timing(menuAnimation, {
    toValue: isMenuVisible ? 0 : 1,
    duration: 300,
    useNativeDriver: false,
  }).start();

  // Animated.timing(overlayAnimation, {
  //   toValue: isMenuVisible ? 0 : 1,
  //   duration: 300,
  //   useNativeDriver: false,
  // }).start();


const menuTranslateX = menuAnimation.interpolate({
  inputRange: [-1, 0],
  outputRange: [300, 0],
});

// const overlayOpacity = overlayAnimation.interpolate({
//   inputRange: [0, 1],
//   outputRange: [0, 0.5], // Adjusted opacity range
// });

useEffect(() => {
  const retrieveData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedMobileNumber = await AsyncStorage.getItem('phonenumber');
      console.log('Stored Name:', storedName);
      console.log('Stored Phone Number:', storedMobileNumber);
      if (storedName && storedMobileNumber) {
        setName(storedName);
        setMobileNumber(storedMobileNumber);
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  }

  retrieveData();
}, []);


useEffect( () => {
//   if (initialLatitude && initialLongitude && destinationCoords) {
//     const distanceInMeters = haversine(
//       { lat: initialLatitude, lon: initialLongitude },
//       { lat: destinationCoords.latitude, lon: destinationCoords.longitude }
//     );

//     // Convert distance to kilometers and update the state
//     if(Number(distance) < 1.5){
//       setfare(30)
//       console.log('less than 5');
//     }else{
//       let dist= Number(distance) - 1.5;
//       setfare(30 + (dist*15))
//       console.log('Not less than 5');
//     }
//     setDistance((distanceInMeters / 1000).toFixed(2));

//   }
// }, [initialLatitude, initialLongitude, destinationCoords]);
async function fetchData() {
  try {
    const apiKey = 'AIzaSyA_l_K_OuqpSIrYiULGz22Vbe4votSkqvM';
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${initialLatitude},${initialLongitude}&destinations=${destinationCoords.latitude},${destinationCoords.longitude}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const distanceInMeters = data.rows[0].elements[0].distance.value;
          if(Number(distanceInMeters) < 1500){
      setfare(30)
      console.log('less than 5');
    }else{
      let dist= Number(distanceInMeters) - 1500;
      const totalfare = dist * 0.015 +30
      setfare(totalfare)
      console.log('Not less than 5');
    }

      const distanceInKilometers = distanceInMeters / 1000;
      setDistance((distanceInKilometers));
      console.log('Distance:', distanceInKilometers);
    } else {
      console.error('Error fetching distance:', data.status);
    }
  } catch (error) {
    console.error('Error calculating distance:', error);
  }
}

fetchData();

}, [initialLatitude, initialLongitude, destinationCoords]);



let watchId;

useEffect(() => {
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        // Now you can get the user's location
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  

  requestLocationPermission();

  return () => {
    // Cleanup
    Geolocation.clearWatch(watchId);
  };
}, []);


const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log('Current Location:', latitude, longitude);
      setInitialLatitude(latitude);
      setInitialLongitude(longitude);
      setLoading(false); // Set loading to false once location is fetched
    },
    (error) => {
      console.log('Error getting location:', error);
      setLoading(false); // Set loading to false in case of an error
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};
if (loading) {
  // You can render a loading indicator here if needed
  return (
    <View>
      <Video 
      source={require('../Assets/Autoanimation.mp4')}
      style={{marginRight:0, width:"100%",height:'100%' }}
      controls={false}
      onEnd={handleEnd}
      repeat={true}
      resizeMode="contain"
      ></Video>
    </View>
  );
}

   console.log(initialLatitude);
   console.log(initialLongitude);

  return(

    <View style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        mapType="standard"
        initialRegion={{
          latitude: 11.2796891,
          longitude: 76.2314468,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: 11.27995669,
            longitude: 76.23195543,
          }}
          title="Your Location"
          description="This is your current location"
        />
        {destinationCoords && (
          <MapViewDirections
            origin={{
              latitude: initialLatitude,
              longitude: initialLongitude,
            }}
            destination={destinationCoords}
            apikey="AIzaSyA_l_K_OuqpSIrYiULGz22Vbe4votSkqvM"
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
    <View style={styles.bottomContainer}>

      
      

        <TouchableOpacity onPress={toggleBottomSheet}>
          {/* <Text>Show Bottom Sheet</Text> */}
          <Image style={{width:30, height:30}} source={require('../Assets/Videos/gps.png')}/>
        </TouchableOpacity>
    </View>
    {
      isBottomVisible && (
      <DraggableBottomSheet onClose={bottomSheetCloseButton}>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed="auto"
        fetchDetails={true}
        renderDescription={(row) => row.description}
        onPress={(data, details = null) => {
          setDestinationCoords({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: 'Your Google API Key',
          language: 'en',
          types: ['geocode', 'establishment'],
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgb(240,240,240)',
            width: '100%',
            justifyContent:'center',
            alignItems:'center'
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: 'black',
          },
          textInput: {
            color: 'black',
          },
          placeholder: {
            color: 'grey',
          },
        }}
      /> */}
      </DraggableBottomSheet>
      )}
    
  </View>
  )
}

export default Home

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    width:"100%",
    height:100,
    // backgroundColor:'red',
    alignItems: 'center'
  },
})