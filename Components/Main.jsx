import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Main = ({ route }) => {
  const [auctionData, setAuctionData] = useState([]);
  const [isFirstActive, setIsFirstActive] = useState(true);


  const handleToggle = () => {
    setIsFirstActive(!isFirstActive);
  };

  console.log('Auction Data Length:', auctionData.length);
  console.log('Auction Data:', auctionData);

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
      console.error('Error fetching auction data:', error);
    }
  };

  const arrfn1 = () => {
    if (auctionData.length !== 0) {
      console.log('Newarray1', auctionData);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchAuctionData();

    // Set interval for auto-refresh every 2 seconds
    const interval = setInterval(fetchAuctionData, 20000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
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

        
      
      <ScrollView>

    {/* ================================= TOGGLE BUTTON =================================================*/}

    <View>
        <TouchableOpacity
        style={[styles.button, isFirstActive ? styles.activeButton : styles.inactiveButton]}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>{isFirstActive ? 'Active' : 'Inactive'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          !isFirstActive ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>{!isFirstActive ? 'Active' : 'Inactive'}</Text>
      </TouchableOpacity>
        </View>


        {!auctionData ? (
          <Text style={styles.noDataText}>No auction data available.</Text>
        ) : (
          auctionData
            .filter(
              item =>
                item.inventory &&
                (item.inventory.auctionType === 'Physical' ||
                  item.inventory.auctionType === 'Online')
            )
            .map(item => (
              <View key={item.inventory._id} style={styles.itemContainer}>
                <Text style={styles.auctionIdText}>
                  Auction ID: {item.inventory.auctionNo}
                </Text>
                <Text style={styles.auctionIdText}>
                  Auction Type: {item.inventory.auctionType}
                </Text>
                <Text style={styles.auctionIdText}>
                  Vehicle Name: {item.inventory.vehicleInfo.model}
                </Text>
                <Text style={styles.auctionIdText}>
                  Fuel: {item.inventory.vehicleInfo.fuelType}
                </Text>
                <Text style={styles.auctionIdText}>
                  Details: {item.inventory.vehicleInfo.make}
                </Text>
                <Text style={styles.auctionIdText}>
                  Details:  {console.log(item.inventory.images)}
                </Text>
                <View style={styles.imageContainer}>
             
                    {/* <Image
                      source={{ uri: item.inventory.images.exterior }}
                      style={styles.image}
                    /> */}
                </View>
                <Text style={styles.auctionIdText}>
                  Vehicle Type: {item.inventory.vehicleType.vehicleTypeName}
                </Text>
                <Text style={styles.auctionIdText}>
                  Number of Vehicles: {item.inventory.bidCounts.length}
                </Text>
                <Text style={styles.auctionIdText}>
                  End Date:{' '}
                  {new Date(item.inventory.endDate).toLocaleDateString()}
                </Text>
                <Text style={styles.auctionIdText}>
                  Live Status: {item.liveStatus ? 'Live' : 'Not Live'}
                </Text>
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
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'green',
  },
  inactiveButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
  },
});
