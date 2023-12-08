import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { Image } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const windowHeight = Dimensions.get('window').height;

const DraggableBottomSheet = ({onClose}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pan = useRef(new Animated.Value(windowHeight - 330)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dy > 5 || gestureState.dy < -5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0 && !isSheetOpen) {
          // Allow dragging down when sheet is closed
          pan.setValue(gestureState.dy);
        } else if (gestureState.dy < 0 && isSheetOpen) {
          // Allow dragging up when sheet is open
          pan.setValue(windowHeight - 330 + gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > windowHeight * 0.3) {
          closeSheet();
        } else {
          openSheet();
        }
      },
    })
  ).current;

  useEffect(()=>{
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        ()=>{
            closeSheet()
        }
    )

    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        ()=>{
            openSheet()
        }
    )

    return ()=>{
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove()
    }
  })

  const openSheet = () => {
    if (!isSheetOpen) {
      Animated.spring(pan, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      setIsSheetOpen(true);
    }
  };

  const closeSheet = () => {
    Animated.spring(pan, {
      toValue: windowHeight - 330,
      useNativeDriver: false,
    }).start();
    setIsSheetOpen(false);
  };

  return (
    <Animated.View
      style={[
        styles.bottomSheet,
        {
          transform: [{ translateY: pan }],
          height: windowHeight -10,
        },
      ]}
      {...panResponder.panHandlers}
    >
        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
            <Text style={{ fontSize: 28, color: 'red' , fontWeight:'900'}}>x</Text>
            {/* <Image source={require('../Assets/Videos/close.png')}/> */}
        </TouchableOpacity>
      <View style={styles.handle} />
      <View style={styles.content}>
        <View style={{width:"100%",height:60,flexDirection:"row",alignItems:"center"}}>
            {/* <Image style={{width:50,height:50,borderRadius:25}} source={require("../Assets/profile.jpeg")}/> */}
            <View style={{width:"55%"}}>
                <Text style={{fontSize:17,fontWeight:"bold",marginLeft:10,color:"black"}}>Fahad Bin saeed</Text>
                <Text style={{fontSize:14,fontWeight:"400",marginLeft:10,color:"black"}}>Fahad Bin saeed</Text>
            </View>
            <View style={{width:"30%",alignItems:"flex-end"}} >
                <Text style={{fontSize:17,fontWeight:"bold",marginLeft:10,color:"black"}}>₹ 500.00</Text>
                <Text style={{fontSize:14,fontWeight:"400",marginLeft:10,color:"black"}}>Earned</Text>
            </View>
        </View>
        <View  style={{marginTop:30,width:"100%",flexDirection:"row",alignItems:"center",borderRadius:20,justifyContent:"space-evenly"}}>
        <GooglePlacesAutocomplete
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
          key: 'AIzaSyA_l_K_OuqpSIrYiULGz22Vbe4votSkqvM',
          language: 'en',
          types: ['geocode', 'establishment'],
        }}
        styles={{
          textInputContainer: {
            backgroundColor: '#ffff',
            width: '100%',
            justifyContent:'center',
            alignItems:'center',
            height:60,
            borderRadius:10,
            // elevation:1
            
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: 'black',
          },
          textInput: {
            color: 'black',
            backgroundColor:'#ffff',
            height:60,
            // elevation:1,
            borderWidth:0.2,
            borderColor:'black',
          },
          placeholder: {
            color: 'red',
          },
        }}
      />
        
        </View>

      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    elevation: 4
  },
  handle: {
    width: 70,
    height: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 2,
  },
  content: {
    paddingTop: 10,
    alignItems: 'center',
  },
});

export default DraggableBottomSheet;