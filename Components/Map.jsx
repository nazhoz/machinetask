import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const [initialLatitude, setInitialLatitude] = useState(0);
  const [initialLongitude, setInitialLongitude] = useState(0);

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
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    // For simplicity, using a hardcoded location (New York City) if geolocation is not available.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Current Location:', latitude, longitude);
        setInitialLatitude(latitude);
        setInitialLongitude(longitude);
      },
      (error) => {
        console.log('Error getting location:', error);
        // Hardcoded fallback location (New York City)
        setInitialLatitude(40.7128);
        setInitialLongitude(-74.006);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: initialLatitude,
            longitude: initialLongitude,
          }}
          title="Your Location"
          description="This is your current location"
        />
      </MapView>
    </View>
  );
};


export default Map




// // 

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, SafeAreaView, View, Button, Text } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import tw from 'tailwind-react-native-classnames';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   selectOrigin,
//   selectDestination,
//   setDestination,
//   setOrigin,
// } from '../slices/navSlice';
// import { GOOGLE_MAPS_APIKEY } from '@env';

// const Map1 = () => {
//   const origin = useSelector(selectOrigin);
//   const destination = useSelector(selectDestination);
//   const dispatch = useDispatch();
//   const [isMapLoaded, setIsMapLoaded] = useState(false);
//   const [distance, setDistance] = useState(null);

//   // Set default initial location to Malappuram
//   const defaultInitialRegion = {
//     latitude: 11.0732,
//     longitude: 76.074,
//     latitudeDelta: 0.005,
//     longitudeDelta: 0.005,
//   };

//   useEffect(() => {
//     // Map-related logic here
//     if (origin && destination) {
//       // Calculate distance between origin and destination
//       const distanceInKm = calculateDistance(origin.location, destination.location);
//       setDistance(distanceInKm);
//     }
//   }, [origin, destination, isMapLoaded]); // Add other dependencies as needed

//   const calculateDistance = (location1, location2) => {
//     const lat1 = location1.lat;
//     const lon1 = location1.lng;
//     const lat2 = location2.lat;
//     const lon2 = location2.lng;

//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };

//   const deg2rad = (deg) => {
//     return deg * (Math.PI / 180);
//   };

//   const handleLoadMap = () => {
//     setIsMapLoaded(!isMapLoaded); // Toggle the state
//   };

//   const resetMap = () => {
//     setIsMapLoaded(false);
//   };

//   return (
//     <SafeAreaView style={tw`bg-white h-full`}>
//       <View style={tw`p-5`}>
//         <GooglePlacesAutocomplete
//           styles={{
//             container: {
//               flex: 0,
//             },
//             textInput: {
//               fontSize: 18,
//               color: 'grey',
//               width: 200,
//               backgroundColor: 'blue',
//             },
//           }}
//           enablePoweredByContainer={false}
//           query={{
//             key: GOOGLE_MAPS_APIKEY,
//             language: 'en',
//           }}
//           onPress={(data, details = null) => {
//             dispatch(
//               setOrigin({
//                 location: details.geometry.location,
//                 discription: data.description,
//               })
//             );
//             dispatch(setDestination(null));
//             resetMap();
//           }}
//           fetchDetails={true}
//           returnKeyType={'search'}
//           placeholder="Where From"
//           nearbyPlacesAPI="GooglePlaceSearch"
//           debounce={400}
//         />
//         <GooglePlacesAutocomplete
//           styles={{
//             container: {
//               flex: 0,
//             },
//             textInput: {
//               fontSize: 18,
//               color: 'grey',
//               width: 200,
//               backgroundColor: 'blue',
//             },
//           }}
//           enablePoweredByContainer={false}
//           query={{
//             key: GOOGLE_MAPS_APIKEY,
//             language: 'en',
//           }}
//           onPress={(data, details = null) => {
//             dispatch(
//               setDestination({
//                 location: details.geometry.location,
//                 discription: data.description,
//               })
//             );
//             resetMap();
//           }}
//           fetchDetails={true}
//           returnKeyType={'search'}
//           placeholder="Where To"
//           nearbyPlacesAPI="GooglePlaceSearch"
//           debounce={400}
//         />
//         <Button title="Toggle Map" onPress={handleLoadMap} />
//         {distance && <Text>{`Distance: ${distance.toFixed(2)} km`}</Text>}
//       </View>
//       {isMapLoaded && (
//         <MapView
//           style={{ height: '100%', width: '100%', position: 'relative' }}
//           mapType="standard"
//           initialRegion={
//             origin?.location
//               ? {
//                   latitude: origin.location.lat,
//                   longitude: origin.location.lng,
//                   latitudeDelta: 0.005,
//                   longitudeDelta: 0.005,
//                 }
//               : defaultInitialRegion
//           }>
//           {origin?.location && (
//             <Marker
//               coordinate={{
//                 latitude: origin.location.lat,
//                 longitude: origin.location.lng,
//               }}
//               title="Origin"
//               description={origin.description}
//               identifier="origin"
//             />
//           )}
//           {destination?.location && (
//             <Marker
//               coordinate={{
//                 latitude: destination.location.lat,
//                 longitude: destination.location.lng,
//               }}
//               title="Destination"
//               description={destination.description}
//               identifier="destination"
//             />
//           )}
//           {origin?.location && destination?.location && (
//             <Polyline
//               coordinates={[
//                 {
//                   latitude: origin.location.lat,
//                   longitude: origin.location.lng,
//                 },
//                 {
//                   latitude: destination.location.lat,
//                   longitude: destination.location.lng,
//                 },
//               ]}
//               strokeColor="red" // Change the line color to red
//               strokeWidth={2}
//             />
//           )}
//         </MapView>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Map1;

// const styles = StyleSheet.create({});

// // 