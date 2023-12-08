import { StyleSheet, Text, View , Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Setting from './Setting';
import UserProfile from './UserProfile';
import { BlurView } from '@react-native-community/blur';

const Navigation = () => {
    const Tab = createBottomTabNavigator();

    const CustomTabBarButton =({children, onPress})=>(
        <TouchableOpacity 
        onPress={onPress} 
        style={{
            top:-30,
            justifyContent:'center',
            alignItems:'center',
            ...styles.shadow
        }}
        >
            <View style={{
                width:65,
                height:65,
                // borderRadius:35,
                backgroundColor:'#FEC400',
                borderTopEndRadius:20,
                borderBottomLeftRadius:20,
                borderTopLeftRadius:20,
                borderBottomEndRadius:20
            }}>
                
                {children}
            </View>
        </TouchableOpacity>
    )
  return (
    
    <Tab.Navigator
    screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle:{
            position:'absolute',
            bottom:15,
            left:20,
            right:20,
            elevation:0,
            backgroundColor:'#ffff',
            borderRadius:20,
            height:90,
            // width:'95%',
            ...styles.shadow
        }
      }}
      initialRouteName='Homes'
    >
        
        <Tab.Screen name="Settings" component={Setting} options={{
        tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                <Image 
                source={require('./Assets/BottomNavigationImages/setting.png')} 
                resizeMode='contain'
                style={{width:25, height:25, tintColor: focused ? '#FEC400':'#748c94'}}
                />
                <Text style={{color:focused ? '#FEC400' :'#748c94', fontSize:12}}>SETTINGS</Text>
            </View>
        )
      }}/>
      <Tab.Screen name="Homes" component={Home} options={{
        tabBarIcon:({focused})=>(
            <Image 
            source={require('./Assets/BottomNavigationImages/house.png')}
            resizeMode='contain'
            style={{
                width:30,
                height:30,
                tintColor:'#ffff'
            }}
            />
        ),
        tabBarButton:(props)=>(
            <CustomTabBarButton {...props}/>
        )
      }}/>
      <Tab.Screen name="User" component={UserProfile} options={{
        tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                <Image 
                source={require('./Assets/BottomNavigationImages/user.png')} 
                resizeMode='contain'
                style={{width:25, height:25, tintColor: focused ? '#FEC400':'#748c94'}}
                />
                <Text style={{color:focused ? '#FEC400' :'#748c94', fontSize:12}}>USER</Text>
            </View>
        )
      }}/>
    </Tab.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
        
    },
})