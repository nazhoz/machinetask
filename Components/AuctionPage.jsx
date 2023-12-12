import { StyleSheet, Text, View, Image,TouchableOpacity , ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import DraggableBottomSheet from './DraggableBottomSheet';

const AuctionPage = ({route}) => {

  const {item} = route.params;
  const [isLiveAuction, setIsLiveAuction] = useState(true);
  const [isBottomVisible, setIsBottomVisible] = useState(false);


  const handleToggle = () => {
    setIsLiveAuction(!isLiveAuction);
  };

  //=========================================== BOTTOM SHEET====================================================

  const toggleBottomSheet = () =>{
    setIsBottomVisible(!isBottomVisible)
  }

  const bottomSheetCloseButton = ()=>{
    setIsBottomVisible(false)
  }

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

        {/*====================================== BUYING LIMITS ============================================= */}
        
        <View style={{backgroundColor:'#FFDD03',width:"100%", height:80,bottom:10,zIndex:-1, justifyContent:'center', alignItems:'center', gap:5}}>
          <Text style={styles.auctionIdText}>Remaning Buying Limit</Text>
          <Text style={styles.auctionIdText}>₹82,00,000</Text>
        </View>

        {/* ================================= TOGGLE BUTTON =================================================*/}

    <View style={{flexDirection:'row', backgroundColor:'white', height:50, width:"95%",alignItems:'center',top:10,elevation:5,borderRadius: 10,}}>
    <TouchableOpacity
        style={[
          styles.button,
          isLiveAuction ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>Live Inventory</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          !isLiveAuction ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>Completed</Text>
      </TouchableOpacity>
        </View>

        {/* ====================================== AUCTION NAME ============================================== */}

        <View style={{width:"100%", justifyContent:'center', alignItems:'center',top:30}}>
          <Text style={styles.auctionIdText}>
            {item.inventory.auction.name}
            {console.log("User",item.userHighestBid)}
            {console.log("Images",item.inventory.images)}
            </Text>
            
        </View>
      
        <ScrollView style={{top:20,width: "100%",flex:1}} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center',gap:15 }}>
              <View style={styles.itemContainer}>
                <View style={{width:'100%'}}>
                  <Image style={{width:381, height:250,resizeMode: "cover",bottom:20,right:10,borderRadius:10}} source={require('../Assets/test/ecosport.png')}/>
                  <View style={{position:'absolute', flexDirection:'row', justifyContent:'space-between', width:'95%', alignItems:'center', left:10,}}>
                    <View style={{width:180, height:35,backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius:10}}>
                    <Text style={{color:'black',fontWeight:"800"}}>View Inspection Report</Text>
                    </View>
                    <TouchableOpacity style={{width:40, height:35,backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius:10}}>
                    <Image style={{width:20, height:20}} source={require('../Assets/test/eye.png')}/>
                    </TouchableOpacity>                   
                  </View>
                  <View style={{position:'absolute',flexDirection:'row', top:190, justifyContent:'center', alignItems:'center', width:'100%',backgroundColor:'white', height:30, borderRadius:10, gap:10}} >
                    <Text style={{color:'grey', fontWeight:'800'}}>{item.inventory.registrationNumber}</Text>
                    <Text style={{color:'grey', fontWeight:'800',bottom:10,fontSize:30}}>.</Text>
                    <Text style={{color:'grey', fontWeight:'800'}}>{item.inventory.vehicleInfo.fuelType}</Text>
                    <Text style={{color:'grey', fontWeight:'800',bottom:10,fontSize:30}}>.</Text>
                    <Text style={{color:'grey', fontWeight:'800'}}>
                      {item.inventory.vehicleInfo.mfgYear}

                      </Text>
                    <Text style={{color:'grey', fontWeight:'800',bottom:10,fontSize:30}}>.</Text>
                    <Text style={{color:'grey', fontWeight:'800'}}>38000kms</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'100%',gap:10,}}>
                <Text style={{fontSize:20, fontWeight:'800', color:'black'}}>{item.inventory.vehicleInfo.make}</Text>
                <TouchableOpacity>
                  <Image style={{width:20, height:20}} source={require('../Assets/test/heart.png')}/>
                </TouchableOpacity>
                </View>

                <View style={{width:'85%', height:50,justifyContent:'space-around',alignItems:'center',flexDirection:"row",top:5}}>
                  <Image style={{width:20, height:20}} source={require('../Assets/test/car.png')}/>
                  <Text style={{ fontWeight:'800', color:'black'}}>{item.inventory.vehicleType.name}</Text>
                  <Text style={{ fontWeight:'800', color:'grey'}}>{item.inventory.vehicleInfo.yardLocation}</Text>
                  <Text style={{ fontWeight:'800', color:'grey'}}>{item.inventory.remarks}</Text>
                  <Image style={{width:20, height:20}} source={require('../Assets/test/thump.png')}/>
                </View>
                

                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'90%',gap:10}}>
                  <View style={{justifyContent:'center',alignItems:'flex-start'}}>
                    <Text style={{ fontWeight:'800', color:'black', fontSize:20}}>02:24:22</Text>
                    <Text style={{ fontWeight:'800', color:'black'}}>{new Date(item.inventory.endTimestamp).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false, // Set to false for 24-hour format
                    })}</Text>
                    <Text style={{ fontWeight:'400', color:'grey'}}>End time</Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{ fontWeight:'800', color:'black'}}>{item.inventory.totalBidCount}</Text>
                    <Text style={{ fontWeight:'400', color:'grey'}}>Bids</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight:'400', color:'lightgreen'}}>Reserve Met</Text>
                    <Text style={{ fontWeight:'400', color:'grey'}}>Comments</Text>
                  </View>
                  
                </View>

                <View>
                  <Text style={{ fontWeight:'400', color:'lightgrey', fontSize:13}}>Tip : {item.inventory.vehicleInfo.make} was approved @5 lakh in previous auction.</Text>
                </View>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%',gap:10}}>
                  <TouchableOpacity style={{width:"45%",backgroundColor:'#fff', height:50,justifyContent:'center',alignItems:'center',borderRadius:5,borderWidth:.2}}>
                    <Text style={{color:'grey',fontWeight: '800'}}>Set Auto Bid</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleBottomSheet} style={{width:"45%",backgroundColor:'#FFDD03', height:50,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                  <Text style={{color:'white',fontWeight: '800'}}>Place Bid</Text>
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'90%',gap:10}}>

                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    {/* <Text style={{ fontWeight:'800', color:'black'}}>{item.inventory.totalBidCount}</Text> */}
                    <Text style={{ fontWeight:'400', color:'grey'}}>Your Highest bid - {item.userHighestBid.amount} </Text>
                  </View>
                  <View>
                    {/* <Text style={{ fontWeight:'400', color:'lightgreen'}}>Reserve Met</Text> */}
                    <Text style={{ fontWeight:'400', color:'grey'}}>{(item.inventory.bidLimit)-(item.inventory.totalBidCount)}/{item.inventory.bidLimit} Bids remaining</Text>
                  </View>
                  
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
              
      </ScrollView>
      {
      isBottomVisible && (
      <DraggableBottomSheet onClose={bottomSheetCloseButton} item={item} >
      </DraggableBottomSheet>
      )}
    </View>
  )
}

export default AuctionPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // height:1000
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
    height: 580,
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
})

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const AuctionPage = () => {
//   return (
//     <View>
//       <Text>AuctionPage</Text>
//     </View>
//   )
// }

// export default AuctionPage

// const styles = StyleSheet.create({})