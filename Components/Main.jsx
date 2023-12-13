import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Main = ({ route,navigation }) => {
  const [auctionData, setAuctionData] = useState([]);
  const [isLiveAuction, setIsLiveAuction] = useState(true);


  const handleToggle = () => {
    setIsLiveAuction(!isLiveAuction);
  };

  console.log('Auction Data Length:', auctionData.length);

  // console.log('Auction Data:', auctionData);

  const fetchAuctionData = async () => {
    try {
      const response = await axios.get(
        'https://auction.riolabz.com/v1/auction_inventory/get/all/participant?auctionId=654c6e0e4c178569c7bc607f',
        {
          headers: {
            Authorization: `Bearer ${route.params.sessionToken}`,
          },
        }
      );

      // Access the auction inventory data from the "data" field
      const inventoryData = response.data.data;
      setAuctionData(inventoryData);
    } catch (error) {
      // console.error('Error fetching auction data:', error);
    }
  };

  const arrfn1 = () => {
    if (auctionData.length !== 0) {
      // console.log('Newarray1', auctionData);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchAuctionData();

    // const interval = setInterval(fetchAuctionData, 2000);

    // return () => clearInterval(interval);
  }, [route.params.sessionToken]);

  useEffect(() => {
    // Call arrfn1 after setting auction data
    arrfn1();
  }, [auctionData]);

  return (
    <View style={styles.container}>

        {/*========================================== NAVBAR ============================================= */}

      <View style={styles.navbar}>
      <View style={styles.navbarbutton}>
        <Image style={{width:20, height:20}} source={require("../Assets/test/menu.png")}/>
      </View>
      <View style={styles.navbaruser}>
        <Image style={{width:15, height:15}} source={require("../Assets/test/user.png")}/>
      </View>
      </View>

        {/* ================================= TOGGLE BUTTON =================================================*/}

    <View style={{flexDirection:'row', backgroundColor:'white', height:50, width:"95%",alignItems:'center',top:20,elevation:5,zIndex:2,borderRadius: 10,}}>
    <TouchableOpacity
        style={[
          styles.button,
          isLiveAuction ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>Live Auction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          !isLiveAuction ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>Upcoming</Text>
      </TouchableOpacity>
        </View>
      
    <ScrollView style={{top:20,width: "100%",flex:1}} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center',gap:15,paddingBottom:60 }}>

        {!auctionData ? (
          <Text style={styles.noDataText}>No auction data available.</Text>
        ) : (
          auctionData
            .filter(
               (item, index, self) =>
                item.inventory &&
                (item.inventory.status == 'Active') && self.findIndex((i) => i.inventory.vehicleInfo.make === item.inventory.vehicleInfo.make) === index
            )
            .map(item => (
              <View key={item.inventory._id} style={styles.itemContainer}>

                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'100%',gap:40}}>
                <Text style={{color:'red',fontWeight: 'bold', }}>{item.inventory.status ? 'Live' : 'Not Live'}</Text>
                <Text style={{color:'black',fontWeight: 'bold',backgroundColor:'pink', width:100,right:10,textAlign:'center'}}>{item.inventory.auctionType}</Text>
                <Image style={{width:20, height:20}} source={require("../Assets/test/clipboard.png")}/>
                </View>

                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',width:'100%',gap:10,left:20}}>
                <Text style={styles.auctionIdText}>{item.inventory.vehicleInfo.model}</Text>
                <Text style={styles.auctionIdText}>{item.inventory.vehicleInfo.make}</Text>
                </View>

                <View style={{borderTopWidth: 1,borderBottomWidth: 1,borderColor: '#000',borderStyle: 'dashed',width:'85%', height:50,justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
                <Text style={{ color: 'black', fontWeight: '500' }}>
                    Vehicle Type:
                </Text>

                <Image
                    style={{ width: 25, height: 25, marginLeft: 10 ,objectFit:"contain"}}
                    source={require("../Assets/test/car.png")}
                  />
                </View>
                

                <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:'90%',gap:10}}>
                  <View style={{flexDirection:'column', borderRightWidth: .2, borderColor: 'lightgrey', width:'25%'}}>
                  <Text style={{color:'black',fontWeight: '400',fontSize:70}}>{item.inventory.auction.inventoryCount}</Text>
                  <Text style={styles.auctionIdText}>Vehicles</Text>
                  </View>
                  <View style={{flexDirection:'column',height:100,justifyContent:'space-evenly'}}>
                  <Text style={styles.auctionIdText}>
                    End Date: {new Date(item.inventory.endTimestamp).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false, // Set to false for 24-hour format
                    })}
                  </Text>                
                    <Text style={styles.auctionIdText}>Auction Type: {item.inventory.auction.businessType}</Text>
                  <Text style={styles.auctionIdText}>Auction ID: {item.inventory.auctionNo}</Text>
                  </View>
                  
                </View>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%',gap:10}}>
                  <TouchableOpacity onPress={() => navigation.navigate('auctionpage', { vehicleMake: item.inventory.vehicleInfo.make })} style={{width:"70%",backgroundColor:'#FFDD03', height:50,justifyContent:'center',alignItems:'center',borderRadius:10}}
                  >               
                    <Text style={{color:'white',fontWeight: '800'}}>View</Text>                    
                  </TouchableOpacity>
                  <TouchableOpacity style={{width:"15%",backgroundColor:'#DCDCDB', height:50,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                    <Image style={{width:20, height:20}} source={require('../Assets/test/download.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
                  <TouchableOpacity style={{width:"90%",backgroundColor:'#52BE80', height:50,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                    <Text style={{color:'white',fontWeight: '800'}}>Pay to Register</Text>
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.auctionIdText}>
                  Fuel: {item.inventory.vehicleInfo.fuelType}
                </Text> */}
                
                {/* <Text style={styles.auctionIdText}>
                  Details:  {console.log(item.inventory.images.exterior)}
                  Details:  {console.log(item.inventory.images.general)}
                </Text> */}
                {/* <View style={styles.imageContainer}>
                {item.inventory.images && item.inventory.images.general && typeof item.inventory.images.general === 'string' ? (
                    <Image
                      source={{ uri: item.inventory.images.general }}
                      style={styles.image}
                    />
                  ) : (
                    <Text>Byeeee</Text>
                  )}
                </View>  */}
                {/* <View style={styles.imageContainer}>
             
                    <Image
                      source={{ uri: item.inventory.images.exterior }}
                      style={styles.image}
                    />
                </View> */}
                
                
                
               
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  auctionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    top:20,
    // borderWidth:1,
    width: "90%",
    height: 450,
    backgroundColor:'white',
    elevation:5,
    borderRadius:10,
    justifyContent:'space-around',
    alignItems:'center',
  },
  auctionIdText: {
    color: 'black',
    fontWeight: 'bold',
  },
  noDataText: {
    color: 'black',
  },
  imageContainer: {
    backgroundColor:"yellow",
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    height:300,
    width:"100%"
  },
  image: {
    width: 100,
    height: 100,
  },
  navbar:{
    width:"100%",
    height:80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor:'white',
    elevation:5,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center'
  },
  navbarbutton:{
    left:20,
    // borderWidth:.2, 
    borderRadius:10, 
    width:40,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#eeeee4',
  },
  navbaruser:{
    right:20,
    borderRadius:10, 
    width:40,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#eeeee4',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    alignItems: 'center',

  },
  activeButton: {
    backgroundColor: '#FFDD03',
    width:20,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    left:1,
    right:1
  },
  inactiveButton: {
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:20,
  },
  buttonText: {
    color: 'black',
    fontWeight:"800"
  },
});
