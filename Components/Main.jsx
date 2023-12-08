import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Main = ({ route }) => {
  const [auctionData, setAuctionData] = useState([]);

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

  useEffect(() => {
    // Fetch data on component mount
    fetchAuctionData();

    // Set interval for auto-refresh every 2 seconds
    const interval = setInterval(fetchAuctionData, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Auction Inventory Page</Text>
      <FlatList
        data={auctionData}
        keyExtractor={(item) => item.auctionId}
        renderItem={({ item }) => (
          <View>
            <Text>Auction ID: {item.auctionId}</Text>
            {/* Add other auction details */}
          </View>
        )}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
