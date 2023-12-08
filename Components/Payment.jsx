import { StyleSheet, Text, View,Image, ScrollView ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Payment = () => {

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
               source={require('./Assets/card.png')}/>
               
        <Text style={{fontSize:29,fontWeight:"600"}}>Payment</Text>
      </View>
      <View style={{width:"100%",height:800,backgroundColor:"white",paddingTop:10}}>
      <Text style={{fontSize:13,fontWeight:"700",color:"black",marginLeft:11}}>Personal Wallet</Text>
       
      <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"black",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25}}
               source={require('./Assets/wallet.png')}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>Rapido Wallet</Text>
            </View>

            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"white",borderColor:"rgb(245,245,245)",borderWidth:1,alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25}}
               source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI8GAOU7yfdUYAPUGnGoSb1aENrSd97kkxPg3tIqyABkbpHo74H5avcWzcQ_y0ZIfdNeQ&usqp=CAU"}}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>Paytm</Text>
            </View>

            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"white",alignItems:"center",justifyContent:"center",borderRadius:100,backgroundColor:"white",borderColor:"rgb(245,245,245)",borderWidth:1}}>
               <Image style={{width:25,height:25}}
               source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ohzUkxGWvSNgjT8L8SKW1HeDgSDiFrsVENzIJcadq3B41NaXXUCiLj86j_0azoEakWA&usqp=CAU"}}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>AmazonPay</Text>
            </View>
       
            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"white",alignItems:"center",justifyContent:"center",borderRadius:100,backgroundColor:"white",borderColor:"rgb(245,245,245)",borderWidth:1}}>
               <Image style={{width:35,height:35}}
               source={{uri:"https://cdn.iconscout.com/icon/free/png-256/free-upi-2085056-1747946.png"}}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>UPI</Text>
            </View>

            <Text style={{fontSize:13,fontWeight:"700",color:"black",marginLeft:11}}>Pay Later</Text>

            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"white",alignItems:"center",justifyContent:"center",borderRadius:100,backgroundColor:"white",borderColor:"rgb(245,245,245)",borderWidth:1,overflow:"hidden"}}>
               <Image style={{width:45,height:45}}
               source={{uri:"https://play-lh.googleusercontent.com/36CPltbJ7hRAQrmmJv666I5ChgV0z74JLyA7LGFVnfqFcDlN763O-eJhcrPcdP4Gq3zv=w600-h300-pc0xffffff-pd"}}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>Lazypay</Text>
            </View>

            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"white",alignItems:"center",justifyContent:"center",borderRadius:100,backgroundColor:"white",borderColor:"rgb(245,245,245)",borderWidth:1,overflow:"hidden"}}>
               <Image style={{width:45,height:45}}
               source={{uri:"data:image/png;base64,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"}}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>Simpl</Text>
            </View>

            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"black",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25}}
               source={require('./Assets/qr-code.png')}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>Pay at Drop</Text>
            </View>

            <Text style={{fontSize:13,fontWeight:"700",color:"black",marginLeft:11}}>Others</Text>

            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"lightgreen",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25}}
               source={require('./Assets/rupee.png')}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>Cash</Text>
            </View>

            <View style={{marginTop:30,width:"100%",height:70,flexDirection:"row",borderWidth:1,borderTopColor:"gray",borderBottomColor:"gray",
          alignItems:"center",paddingLeft:15,gap:25}}>
               
               <Image style={{width:25,height:25}}
               source={require('./Assets/bank.png')}/>
              
               <Text style={{fontSize:16,color:"black"}}>SHOW PASSBOOK</Text>
            </View>

            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"flex-end",justifyContent:"center",gap:25}}>
               
              
              
               <Text style={{fontSize:13,color:"gray"}}>we value you privecy</Text>
            </View>


       
      </View>
    </ScrollView>
  )
}

export default Payment

const styles = StyleSheet.create({})