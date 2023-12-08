import { Image, StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements';


const data =[
    {
        id:'123',
        title:"Get a ride",
        image:"https://links.papareact.com/3pn",
        screen:"MapScreen"
    },
    {
        id:'456',
        title:"Order Food",
        image:"https://links.papareact.com/28w",
        screen:"EatsScreen"
    },
]


const NavOptions = () => {

    const navigation = useNavigation()
     
  return (
 <FlatList
  data={data}
  horizontal
  keyExtractor={(item)=>item.id}
  renderItem={({ item }) =>(
    <TouchableOpacity
    onPress={()=> navigation.navigate(item.screen)}
     style={tw`p-2 pl-6 pb-8 bg-gray-200 m-2 w-30`}
    >
        <View style={{}}>
          <Image
             style={{width:120,height:120,resizeMode:"contain"}}
             source={{uri: item.image}}
          />
          <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
         {/* <Image 
         style={{margin:2,width:35,height:35}}
          source={require('../Components/rightarrow.png')}
         /> */}
        </View>
    </TouchableOpacity>
  )}
 />
  )
}

export default NavOptions

const styles = StyleSheet.create({})