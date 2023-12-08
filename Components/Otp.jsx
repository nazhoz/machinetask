import { StyleSheet, Text, TextInput, View ,TouchableOpacity, Image} from 'react-native'
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
    <View style={{flex:1, backgroundColor:'white'}}>
      <View style={{width:"100%",height:500,paddingTop:80,gap:15,paddingLeft:20}}>
        
      
      <View>
      <Text style={{fontSize:30,color:"black",fontWeight:"500"}}>Login</Text>
        {/* <Text style={{fontSize:15,color:"gray"}}>we have sent an OTP to {mobileNumber}</Text> */}
      </View>
{/* 
      <View style={{width:"90%",height:50,borderWidth:2,borderRadius:3,borderColor:"lightgray",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
     <TextInput
      placeholder='Enter OTP'
      style={{width:"80%",fontSize:16,textAlign:"center"}}
      
     />
     </View> */}

     <View style={{width:"95%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>     
     <TextInput
      placeholder='Enter Email'
      style={{width:"80%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text) => setEmail(text)}

     />
     </View>

     <View style={{width:"95%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>     
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
      onPress={()=>navigation.navigate("forgot")}
      style={{ width:'95%',justifyContent:'flex-end', alignItems:'flex-end', right:5}}
     >
     <Text style={{color:'red', fontSize:17, fontWeight:'500'}}>Forgot Password ?</Text>
     </TouchableOpacity>

     <TouchableOpacity
       style={{width:"95%",height:65,
       backgroundColor: "#EDAE10",
       marginTop:40,
       alignItems:"center",justifyContent:"center",borderRadius:7}}
      //  onPress={()=> navigation.navigate('Main')}
      // onPress={handleClick}
      onPress={handleLogin}
      >
        <Text style={{fontSize:20,
          color:"white",
          fontWeight:"600",}}>Proceed</Text>
     </TouchableOpacity>

     <View style={{flexDirection:'row', width:'95%', alignItems:'center', justifyContent:'center',top:10}}>
     <SeparatorLine />
      <Text style={{color:'black', marginHorizontal: 10, fontSize:18}}>or</Text>
      <SeparatorLine />
     </View>

     <View style={{flexDirection:'row', width:'50%', alignItems:'center', justifyContent:'space-around', left:90, top:20}}>
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

     <View style={{flexDirection:'row', width:'95%', alignItems:'center', justifyContent:'center', top:30}}>
      <Text style={{color:'#797979', fontSize:18, fontWeight:600}}>Don't have an account?  </Text>
    <TouchableOpacity
      onPress={()=>navigation.navigate("Start")}
      // onPress={handleClick}
      style={{}}
     >
     <Text style={{color:'#F2C24C', fontSize:18, fontWeight:600}}>Sign Up</Text>
     </TouchableOpacity> 
     </View>

     <TouchableOpacity
      onPress={()=>navigation.navigate("reset")}
      style={{top:30, width:'95%', alignItems:'center', justifyContent:'center'}}
     >
     <Text style={{color:'#797979', fontSize:18}}>Reset Password</Text>
     </TouchableOpacity>



      </View>

      
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