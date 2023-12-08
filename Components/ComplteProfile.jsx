import { StyleSheet, Text, View ,ScrollView, Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ComplteProfile = () => {
 
    const navigation = useNavigation();

  return (
     <ScrollView contentContainerStyle={{backgroundColor:"white"}}>
    <View style={{width:"100%",height:150,backgroundColor:"#E6FF00",alignItems:"center",justifyContent:"center"}}>
     
    <TouchableOpacity 
    onPress={()=>navigation.navigate('Home') }
    style={{width:30,height:25,top:8,right:325,position:"absolute"}}>
    <Image style={{width:30,height:25,tintColor:"black"}}
             source={require('./Assets/arrow.png')}/>
    </TouchableOpacity>
    
    <Image style={{width:45,height:45,opacity:.6,tintColor:"gray"}}
             source={require('./Assets/user.png')}/>
             
      <Text style={{fontSize:25,color:"black",fontWeight:"600"}}>Complete Profile</Text>
    </View>

    <Text style={{fontSize:13,fontWeight:"700",color:"black",marginLeft:11,marginTop:15}}>Whats pending?</Text>

<TouchableOpacity
 onPress={()=> navigation.navigate('Profile')}
>
    <View style={{width:"95%",height:50,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between"}}>
               <Text style={{fo4tSize:16,color:"gray"}}>Email address</Text>
               <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>
      
            <TouchableOpacity
            onPress={()=> navigation.navigate('Profile')}
            >
            <View style={{width:"95%",height:50,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between",}}>
               <Text style={{fontSize:14,color:"gray"}}>Date of birth</Text>
               <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>
     
            <TouchableOpacity
             onPress={()=> navigation.navigate('Payment')}
            >
            <View style={{width:"95%",height:50,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between"}}>
            <Text style={{fontSize:14,color:"gray"}}>Add payment method</Text>
            <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>

<TouchableOpacity>
            <View style={{width:"95%",height:50,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between"}}>
               <Text style={{fontSize:14,color:"gray"}}>Home location</Text>
               <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>
             
            <TouchableOpacity>
            <View style={{width:"95%",height:50,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between"}}>
               <Text style={{fontSize:14,color:"gray"}}>Work location</Text>
               <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>
             
            <TouchableOpacity>
            <View style={{width:"95%",height:50,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between"}}> 
               <Text style={{fontSize:14,color:"gray"}}>Book your first ride</Text>
               <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity>
            <View style={{width:"95%",height:60,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between",borderBottomWidth:1,borderBottomColor:"gray"}}>
               <Text style={{fontSize:14,color:"gray"}}>Emergancy contacts</Text>
               <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>


            <Text style={{fontSize:13,fontWeight:"700",color:"black",marginLeft:11,marginTop:15}}>Completed</Text>
            

            <TouchableOpacity>
            <View style={{width:"95%",height:50,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between",}}>
               <Text style={{fontSize:14,color:"gray"}}>Sign Up</Text>
               <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>

            <TouchableOpacity>
            <View style={{width:"95%",height:50,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20,justifyContent:"space-between"}}>
               <Text style={{fontSize:14,color:"gray"}}>Name</Text>
               <Image
                 source={require('./Assets/tick.png')}
                 style={{width:20,height:20}}
               />
            </View>
            </TouchableOpacity>

     
    
  </ScrollView>
  )
}

export default ComplteProfile

const styles = StyleSheet.create({})