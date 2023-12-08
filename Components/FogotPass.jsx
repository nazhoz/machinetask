
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const FogotPass = () => {

  const [resetemail, setResetEmail] = useState({
    email:''
  })
  
    const navigation = useNavigation();

    const handleChange = (value, fieldName) =>{
          setResetEmail((prev)=>({...prev , [fieldName]: value}))
    }

    console.log("email is ",resetemail)

    const handleClick = async() =>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!resetemail.email){
      Alert.alert('Please fill all fields', 'All fields are required');
     }else if(!emailRegex.test(resetemail.email)){
      Alert.alert("Invalid Email!")
     }else{
        await axios.post("http://192.168.1.131:5051/api/request-reset/reset-pwd",resetemail)
        console.log("sucess")
        navigation.navigate('reset', { email: resetemail.email });     }
         
    }

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
    <View style={{width:"100%",height:500,paddingTop:100,gap:10,paddingLeft:20}}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ bottom: 20, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', right:10 }}>
          <Image  source={require('../Assets/OtpPage/left.png')} />
          <Text style={{color:'black', fontSize:18, fontWeight:'700'}}>Back</Text>
    </TouchableOpacity>
    <View style={{top:30}}>
    <Text style={{fontSize:25,color:"black",fontWeight:"500",bottom:20}}>Verification Email</Text>
    </View>


   <View style={{width:"95%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row",top:50}}>     
   <TextInput
    placeholder='Enter Your Email'
    style={{width:"80%",fontSize:16, color:'black'}}
    placeholderTextColor='grey'
    onChangeText={(text)=>handleChange(text, "email")}
   />
   </View>
   


   <TouchableOpacity
     style={{width:"95%",height:65,
     backgroundColor: "#EDAE10",
     marginTop:540,
     alignItems:"center",justifyContent:"center",borderRadius:7}}
    //  onPress={()=> navigation.navigate('Otp')}
    onPress={handleClick}
    >
      <Text style={{fontSize:20,
        color:"#fff",
        fontWeight:"700", }}>Send</Text>
   </TouchableOpacity>

    </View>
    
  </View>
  )
}

export default FogotPass

const styles = StyleSheet.create({})