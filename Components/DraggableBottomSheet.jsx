import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Dimensions, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import { Image } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const windowHeight = Dimensions.get('window').height;

const DraggableBottomSheet = ({onClose,item}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pan = useRef(new Animated.Value(windowHeight - 470)).current;

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
          pan.setValue( gestureState.dy);
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
        toValue: windowHeight ,
        useNativeDriver: false,
      }).start();
      setIsSheetOpen(true);
    }
  };

  const closeSheet = () => {
    Animated.spring(pan, {
      toValue: windowHeight - 470,
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
        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 20, width:50 , height:50, alignItems:'center', justifyContent:'center'}}>
            <Text style={{ fontSize: 28, color: 'black' , fontWeight:'900'}}>x</Text>
            {/* <Image source={require('../Assets/Videos/close.png')}/> */}
        </TouchableOpacity>
      <View style={styles.handle} />
      <View style={styles.content}>
        <View style={{top:50, borderWidth:.5, width:"80%", height:50,borderRadius:5,alignItems:'center', justifyContent:'center',borderColor:'grey'}}>
            <Text style={{color:'black',fontWeight:'900', fontSize:20}}>{new Date(item.highestInventoryBid.timestamp).getMinutes()}m : {new Date(item.highestInventoryBid.timestamp).getSeconds()}s </Text>
        </View>
        <View style={{top:70,  width:"80%", height:50,alignItems:'center', justifyContent:'space-around',flexDirection:'row'}}>
          <Text style={{color:'black',fontWeight:'400',fontSize: 18}}>Current Bid</Text>
          <Text style={{color:'black',fontWeight:'800',fontSize: 20}}>{item.highestInventoryBid.amount}{console.log("HIGHHH",item.highestInventoryBid)}</Text>
        </View>
        <View style={{top:40, width:"80%", height:50,alignItems:'center',  justifyContent:'space-around',flexDirection:'row'}}>
          <Text style={{color:'black',fontWeight:'400',fontSize: 18}}>Bid increment</Text>
          <Text style={{color:'black',fontWeight:'800',fontSize: 20}}>₹ 5,000</Text>
        </View>
        <View style={{top:50,width:"80%",alignItems:'center',justifyContent:'space-around',height:90}}>
          <Text style={{color:'lightgrey',fontWeight:'700'}}>Enter your Maximum bid amount</Text>
          <View style={{  width:"80%", height:50,borderRadius:5,alignItems:'center', justifyContent:'center',borderColor:'grey'}}>
          {/* <Text style={{color:'black',fontWeight:'700'}}>₹ 4,00,000</Text> */}
          <TextInput style={{borderWidth:.5,width:"100%",borderRadius:5,paddingLeft:80}} placeholder='Enter your Amount' placeholderTextColor='black'/>
          </View>
        </View>
        <TouchableOpacity style={{top:80, width:"100%", height:70,borderRadius:5,alignItems:'center', justifyContent:'center',borderColor:'grey',backgroundColor:'#FFDD03'}}>
          <Text style={{color:'white',fontWeight:'700',fontSize: 20}}>Set Auto Bid</Text>
        </TouchableOpacity>

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
    elevation: 4,
    // height:200
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
    // paddingTop: 10,
    alignItems: 'center',
    justifyContent:'space-around',
    height:'40%'
  },
});

export default DraggableBottomSheet;