import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';

const Main = ({route}) => {
  const [auctionData, setAuctionData] = useState([]);

  console.log(auctionData);

  const fetchAuctionData = async () => {
    try {
      const response = await axios.get(
        'https://auction.riolabz.com/v1/auction_inventory/get/all/participant?auctionId=654c6e0e4c178569c7bc607f',
        {
          headers: {
            Authorization: `Bearer ${route.params.sessionToken}`,
          },
        },
      );

      // Access the auction inventory data from the "data" field
      const inventoryData = response.data.data;
      setAuctionData(inventoryData);
    } catch (error) {
      console.error('Error fetching auction data:', error);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchAuctionData();

    // Set interval for auto-refresh every 2 seconds
    const interval = setInterval(fetchAuctionData, 200000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [route.params.sessionToken]);

  return (
    <View style={styles.container}>
    <Text style={styles.auctionText}>Auction Inventory Page</Text>
    {auctionData.map((item) => (
      <View key={item.auctionId} style={styles.itemContainer}>
        <Text style={styles.auctionIdText}>Auction ID: {item.auctionId}</Text>
        <Text>Status: {item.status}</Text>
        
        {/* Render properties individually */}
          <View>
            <Text>Vehicle Name: {item.inventory.vehicleName}</Text>
            <Text>Vehicle Type: {item.inventory.vehicleType}</Text>
            <Text>Number of Vehicles: {item.inventory.numberOfVehicles}</Text>
            <Text>End Date: {item.inventory.endDate}</Text>
            <Text>Auction Type: {item.inventory.auctionType}</Text>
          </View>

      </View>
    ))}
  </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set your background color here
  },
  auctionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  auctionIdText: {
    color: 'black',
  },
});
