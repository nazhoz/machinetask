import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import axios from 'axios'
import { CountryPicker } from 'react-native-country-codes-picker'
import { Checkbox } from 'galio-framework';

const StartPage = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  


  const SeparatorLine = () => (
    <View style={styles.separatorLine} />
  );

  const navigation = useNavigation()




  return (
    <KeyboardAvoidingView style={{flex:1,backgroundColor:"white",justifyContent:"space-between",alignItems:"center"}}>
      {/* <View style={{width:"100%",height:200}}>
        <Image
        source={require('./Assets/rapido-banner.png')}
        style={{width:"100%",height:200}}/>

        

      </View> */}
    
      <View style={{width:"100%",height:200,paddingLeft:20,gap:20, marginTop:20}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ bottom: 5, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', right:10 }}>
          <Image  source={require('../Assets/OtpPage/left.png')} />
          <Text style={{color:'black', fontSize:18, fontWeight:'700'}}>Back</Text>
        </TouchableOpacity>
      <Text style={{fontSize:30,color:"black",fontWeight:"500", bottom:10}}>Sign Up</Text>
        {/* <Text style={{fontSize:15,color:"gray"}}>Verify your account using OTP</Text> */}


    <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
     
    <TextInput
      placeholder='Enter name'
      style={{width:"80%",fontSize:16, color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text) => handleChange(text, "name")}
      // value={name}
      // onChangeText={(text) => {
      //   setName(text);
      //   setNameerror('');
      // }}
      
     />
     </View>
     {/* {Nameerror ? <Text style={{ color: 'red' }}>{Nameerror}</Text> : null} */}
    

     <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
     <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: '15%',
            height: 60,
            // padding: 10,
            alignItems:'center',
            // right:10,
            borderRightWidth:.5,
            justifyContent:'center',
            borderRightColor:"#899499"
        }}
      >
        <Text style={{
            color: 'black',
            fontSize: 16,
            right:5
        }}>
            {countryCode}
        </Text>
      </TouchableOpacity>

      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
     
     <TextInput
      placeholder='Enter your phone number'
      style={{width:"80%",fontSize:16, color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text)=>handleChange(text, "phoneNumber")}
      // value={phoneNumber}
      // onChangeText={(text)=>{
      //   setPhonenumber(text);
      //   setPhonenumberError('');
      // }}
      
     />
     </View>
     {/* {phoneNumberError ?(
      <Text style={{color:"red"}}>{phoneNumberError}</Text>
     ):null} */}
      <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>     
     <TextInput
      placeholder='Enter your Email'
      style={{width:"80%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text)=>handleChange(text, "email")}

     
     />
     </View>
     
     <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>     
     <TextInput
      placeholder='Enter Password'
      style={{width:"80%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text)=>handleChange(text,"pwd")}

     
     />
     </View>

     <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>     
     <TextInput
      placeholder='Confirm Password'
      style={{width:"80%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text)=>handleChange(text, "confirmpwd")}


     />
     </View>

     <View style={{ width:'90%', height:50,justifyContent:'space-around', top:10, alignItems:'center' }}>
     <Checkbox  color="success" label="By Signing Up. You agree to the Terms of Service and  Privacy and Policy" />
     </View>


     <TouchableOpacity
       style={{width:"90%",height:65,backgroundColor:'#EDAE10',alignItems:"center",justifyContent:"center",borderRadius:7, marginTop:20}}
       onPress={()=>navigation.navigate('Main')} 
      
      >
        <Text style={{fontSize:20,
          fontWeight:"600", color:'white'}}>Proceed</Text>
     </TouchableOpacity>


     <View style={{flexDirection:'row', width:'90%', alignItems:'center', justifyContent:'center', bottom:10}}>
     <SeparatorLine />
      <Text style={{color:'black', marginHorizontal: 10, fontSize:18}}>or</Text>
      <SeparatorLine />
     </View>

     <View style={{flexDirection:'row', width:'50%', alignItems:'center', justifyContent:'space-around', left:80}}>
      <TouchableOpacity>
      <Image style={{width:30, height:30}} source={require('../Assets/logoicon/gmail.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
      <Image style={{width:30, height:30}} source={require('../Assets/logoicon/facebook.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
      <Image style={{width:30, height:30}} source={require('../Assets/logoicon/apple.png')}></Image>
      </TouchableOpacity>
      
      
     </View>

    <View style={{flexDirection:'row', width:'90%', alignItems:'center', justifyContent:'center'}}>
      <Text style={{color:'#797979', fontSize:18, fontWeight:600}}>Already have an Account?  </Text>
    <TouchableOpacity
      onPress={()=>navigation.navigate("Otp")}
      // onPress={handleClick}
      style={{}}
     >
     <Text style={{color:'#F2C24C', fontSize:18, fontWeight:600}}>Login</Text>
     </TouchableOpacity> 
     </View>

     {/* <Text>privecy policy</Text> */}
      </View>

     
     
      
    </KeyboardAvoidingView>
  )}

export default StartPage

const styles = StyleSheet.create({
  separatorLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth, // or any desired height
    backgroundColor: 'black',
  },
})