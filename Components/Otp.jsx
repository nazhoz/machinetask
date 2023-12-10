import { StyleSheet, Text, TextInput, View ,TouchableOpacity, Image,KeyboardAvoidingView} from 'react-native'
import React, { useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';



export default function Otp() {


  const [showPassword , setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleShowPassword = (text)=>{
    setPassword(text)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const SeparatorLine = () => (
    <View style={styles.separatorLine} />
  );

  const [loginDetails, setLoginDetails] = useState({
    email:"",
    pwd:""
  })
  

  const handleChange = (value, fieldName) =>{
    setLoginDetails((prev)=>({...prev, [fieldName]: value}))

  }
  console.log(loginDetails)

  
  
    const navigation = useNavigation();



    const handleLogin = async () => {
      try {
        const response = await axios.post(
          'https://auction.riolabz.com/v1/auth/login',
          { email, password }
        );
  
        // Assuming successful login, navigate to AuctionInventory page
        navigation.navigate('Main', {
          sessionToken: response.data.data.sessionToken,
        });
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

  return (
    <View style={{flex:1, backgroundColor:'white',}}>

      <View>
        <Image style={{width:"100%", height:300,resizeMode: "stretch", position: "absolute",top: 0,left: 0,}} source={require("../Assets/test/vehiclelogo.png")}/>
      </View>

      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
    >
      <View style={{width:"100%",height:500,gap:15,backgroundColor:'white',borderTopLeftRadius:20,borderTopRightRadius:20, top:280,}}>     
      <View style={{alignItems:'center', top:30}}>
      <Text style={{fontSize:25,color:"black",fontWeight:"500"}}>You're Welcome</Text>
      <Text style={{fontSize:12,color:"black",fontWeight:"500"}}>Enter your Login details</Text>  
        {/* <Text style={{fontSize:15,color:"gray"}}>we have sent an OTP to {mobileNumber}</Text> */}
      </View>
{/* 
      <View style={{width:"90%",height:50,borderWidth:2,borderRadius:3,borderColor:"lightgray",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
     <TextInput
      placeholder='Enter OTP'
      style={{width:"80%",fontSize:16,textAlign:"center"}}
      
     />
     </View> */}

     <View style={{width:"90%",height:55,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row",left:20, top:60}}>     
     <TextInput
      placeholder='Enter Email'
      style={{width:"80%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text) => setEmail(text)}

     />
     </View>

     <View style={{width:"90%",height:55,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row",left:20, top:60}}>     
     <TextInput
      placeholder='Enter Password'
      style={{width:"70%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text) => setPassword(text)}
      secureTextEntry={!showPassword}
     />
      <TouchableOpacity onPress={toggleShowPassword} style={{ marginLeft: 20 }}>
    {showPassword ? (
      <Image
        source={require('../Assets/OtpPage/hide.png')} // Replace with the correct path to your open eye image
        style={{ width: 20, height: 20, tintColor: 'black' }}
      />
    ) : (
      <Image
        source={require('../Assets/OtpPage/show.png')} // Replace with the correct path to your close eye image
        style={{ width: 20, height: 20, tintColor: 'black' }}
      />
    )}
  </TouchableOpacity>
     </View>

     <TouchableOpacity
       style={{width:"90%",height:55,backgroundColor: "#EDAE10",alignItems:"center",justifyContent:"center",borderRadius:7,left:20, top:60}}
      //  onPress={()=> navigation.navigate('Main')}
      onPress={handleLogin}
      >
        <Text style={{fontSize:15,
          color:"white",
          fontWeight:"600",}}>Log in</Text>
     </TouchableOpacity>
     
     <TouchableOpacity
      onPress={()=>navigation.navigate("forgot")}
      style={{ width:'95%', alignItems:'center', top:60}}
     >
     <Text style={{color:'black', fontSize:13, fontWeight:'500'}}>Forgot Password ?</Text>
     </TouchableOpacity>



     <View style={{flexDirection:'row', width:'95%', alignItems:'center', justifyContent:'center', top:60}}>
      <Text style={{color:'black', marginHorizontal: 10, fontSize:15}}>or</Text>
     </View>

     <View style={{flexDirection:'row', width:'95%', alignItems:'center', justifyContent:'center', top:60,}}>
    <TouchableOpacity
      onPress={()=>navigation.navigate("Start")}
      // onPress={handleClick}
      style={{borderWidth:.5, width:"50%", height:40, borderRadius:10,alignItems:'center', justifyContent:"center"}}
     >
     <Text style={{color:'black', fontSize:18, fontWeight:600}}>Register</Text>
     </TouchableOpacity> 
     </View>
      </View>
      </KeyboardAvoidingView>

      
    </View>
  )
}

const styles = StyleSheet.create({
  separatorLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
})