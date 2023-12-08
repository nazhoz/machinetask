import { TextInput, StyleSheet, Text, View,ScrollView, Image,TouchableOpacity,Modal } from 'react-native'
import React, { useState ,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';


const Profile = () => {

   const [name, setName] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [email, setEmail] = useState('');
   const [editable, setEditable] = useState(false);
   const [isEmailModalVisible, setEmailModalVisible] = useState(false);
   const [editedEmail, setEditedEmail] = useState(email);
   const [emailError, setEmailError] = useState('');
   const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // To store the selected date

   
     const navigation = useNavigation();
 
     useEffect(() => {
   const retrieveData = async () => {
     try {
       const storedName = await AsyncStorage.getItem('name');
       const storedMobileNumber = await AsyncStorage.getItem('phonenumber');
       const storedEmail = await AsyncStorage.getItem('email');
       console.log('Stored Name:', storedName);
       console.log('Stored Phone Number:', storedMobileNumber);
       console.log('Stored Email:', storedEmail);
       if (storedName && storedMobileNumber) {
         setName(storedName);
         setMobileNumber(storedMobileNumber);
         setEmail(storedEmail);
       }
     } catch (error) {
       console.error('Error retrieving data: ', error);
     }
   }
 
   retrieveData();
 }, []);

 
 const handleEdit = () => {
  setEditable(true);
};

const handleSave = async () => {
  try {
    // Save the edited name and phone number to AsyncStorage
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('phonenumber', mobileNumber);
    await AsyncStorage.setItem('email', email);
    setEditable(false);
  } catch (error) {
    console.error('Error saving data: ', error);
  }
};



const toggleEmailModal = () => {
  setEmailModalVisible(!isEmailModalVisible);
};

const editEmail = () => {
  setEditedEmail(email); // Reset the editedEmail state
  toggleEmailModal();
};

const saveEditedEmail = () => {
  // Basic email validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(editedEmail)) {
    setEmailError('Invalid email format');
    return;
  }
  setEmail(editedEmail);
  setEmailError(''); // Clear the email error
  toggleEmailModal();
};



const handleRequire = () => {
  // Implement the logic to store the email in the "require" text
  // For now, let's just log it to the console
  console.log('Require Text:', email);
};

const toggleGenderModal = () => {
  setGenderModalVisible(!isGenderModalVisible);
};

const saveSelectedGender = () => {
  // Implement logic to save selected gender (similar to email)
  // For now, let's log it to the console
  console.log('Selected Gender:', selectedGender);
  toggleGenderModal();
};

const toggleDateModal = () => {
  setDateModalVisible(!isDateModalVisible);
};

const handleDateConfirm = (date) => {
  setSelectedDate(date);
  toggleDateModal();
};

const saveSelectedDate = () => {
  // Implement logic to save the selected date (similar to email)
  // For now, let's log it to the console
  console.log('Selected Date:', selectedDate);
  toggleDateModal();

}

  return (
    <ScrollView contentContainerStyle={{backgroundColor:"white"}}>
    <View style={{width:"100%",height:150,backgroundColor:"#E6FF00",paddingLeft:20,justifyContent:"flex-end"}}>
     
    <TouchableOpacity 
    onPress={()=>navigation.navigate('Home') }
    style={{width:30,height:25,top:8,right:325,position:"absolute"}}>
    <Image style={{width:30,height:25,tintColor:"black"}}
             source={require('./Assets/arrow.png')}/>
    </TouchableOpacity>
    <Image style={{width:45,height:45,opacity:.6,tintColor:"gray",position:"absolute",marginLeft:160,top:50}}       
    source={require('./Assets/user.png')}/>
    <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
    <View>

             {editable ? (
          <TextInput
            style={{ fontSize: 25, color: 'black', fontWeight: '600' }}
            value={name}
            onChangeText={text => setName(text)}
          />
        ) : (
          <Text style={{ fontSize: 25, color: 'black', fontWeight: '600' }}>{name}</Text>
        )}
        {editable ? (
          <TextInput
            style={{ fontSize: 15, color: 'black', fontWeight: '600' }}
            value={mobileNumber}
            onChangeText={text => setMobileNumber(text)}
          />
        ) : (
          <Text style={{ fontSize: 15, color: 'black', fontWeight: '600' }}>+91 {mobileNumber}</Text>
        )}
        </View>


<TouchableOpacity onPress={editable ? handleSave : handleEdit} style={{ marginLeft: 11, marginTop: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: 'blue' }}>{editable ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>
      </View>
             </View>
    <Text style={{fontSize:13,fontWeight:"700",color:"black",marginLeft:11,marginTop:15}}>Profile</Text>
 


    <TouchableOpacity onPress={editEmail}>
        <View
          style={{
            width: '100%',
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 15,
            gap: 25,
            paddingTop: 20,
          }}>
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image style={{ width: 25, height: 25 }} source={require('./Assets/mail.png')} />
          </View>
          <View style={{ width: '100%', height: 45 }}>
            <Text style={{ fontSize: 13, color: 'gray' }}>Email</Text>
            {editable ? (
              <TextInput
                style={{ fontSize: 16, color: 'black' }}
                value={editedEmail}
                onChangeText={(text) => setEditedEmail(text)}
              />
            ) : (
              <Text style={{ fontSize: 16, color: 'black' }}>{editedEmail || 'require'}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <Modal
      visible={isDateModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleDateModal}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
          <Text>Select Date</Text>
          {/* Date picker for date selection */}
          <DateTimePicker
            value={selectedDate}
            onChange={(event, date) => date && setSelectedDate(date)}
            mode="date"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={toggleDateModal}>
              <Text style={{ color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveSelectedDate}>
              <Text style={{ color: 'blue' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
            
      <TouchableOpacity onPress={toggleGenderModal}>
            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"green",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25,tintColor:"white"}}
               source={require('./Assets/user.png')}/>
               </View>
               <View style={{width:"100%",height:45}}>
               <Text style={{fontSize:13,color:"gray"}}>Gender</Text>
               <Text style={{fontSize:16,color:"black"}}>{selectedGender || 'require'}</Text>
               </View>
            </View>
            </TouchableOpacity>

            <Modal
      visible={isGenderModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleGenderModal}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'lightgray',justifyContent:"space-evenly",padding:10, borderRadius: 10, width: '80%',height:150, }}>
          <Text>Select Gender</Text>
          {/* Radio buttons for gender selection */}
          <TouchableOpacity onPress={() => setSelectedGender('Male')}>
            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"space-between" }}>
              <Text style={{ marginRight: 10 }}>Male</Text>
              <Image style={{ width: 20, height: 20 }} source={selectedGender === 'Male' ? require('./Assets/check.png') : require('./Assets/square.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedGender('Female')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:"space-between"}}>
              <Text style={{ marginRight: 10 }}>Female</Text>
              <Image style={{ width: 20, height: 20 }} source={selectedGender === 'Female' ? require('./Assets/check.png') : require('./Assets/square.png')} />
            </View>
          </TouchableOpacity>
          {/* Add more gender options if needed */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={toggleGenderModal}>
              <Text style={{ color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveSelectedGender}>
              <Text style={{ color: 'blue' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
          
          

    <TouchableOpacity onPress={toggleDateModal}>
            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
            <View style={{width:45,height:45,borderRadius:100,backgroundColor:"orange",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25,tintColor:"white"}}
            source={require('./Assets/calender.png')}/>
            </View>
            <View style={{width:"100%",height:45}}>
               <Text style={{fontSize:13,color:"gray"}}>Date of Birth</Text>
               <Text style={{fontSize:16,color:"black"}}>{selectedDate.toDateString() || 'require'}</Text>
               </View>
            </View>
            </TouchableOpacity>

            
            <Modal
      visible={isDateModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleDateModal}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
          <Text>Select Date</Text>
          {/* Date picker for date selection */}
          <DateTimePicker
            isVisible={isDateModalVisible}
            mode="date"
            date={selectedDate}
            onConfirm={handleDateConfirm}
            onCancel={toggleDateModal}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={toggleDateModal}>
              <Text style={{ color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveSelectedDate}>
              <Text style={{ color: 'blue' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>


            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"lightblue",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25,tintColor:"white"}}
               source={require('./Assets/member.png')}/>
               </View>
               <View style={{width:"100%",height:45}}>
               <Text style={{fontSize:13,color:"gray"}}>Member since</Text>
               <Text style={{fontSize:16,color:"black"}}>require</Text>
               </View>
            </View>

            <View style={{width:"100%",height:100,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,borderBottomWidth:1,boerdeBottomColor:"gay"}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"red",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25,tintColor:"white"}}
               source={require('./Assets/warning.png')}/>
               </View>
               <View style={{width:"100%",height:45}}>
               <Text style={{fontSize:13,color:"gray"}}>Emergancy contacts</Text>
               <Text style={{fontSize:16,color:"black"}}>Share with trusted people</Text>
               </View>
            </View>

            <Text style={{fontSize:13,fontWeight:"700",color:"black",marginLeft:11,marginTop:15}}>Others</Text>


            <View style={{width:"100%",height:70,flexDirection:"row",
          alignItems:"center",paddingLeft:15,gap:25,paddingTop:20}}>
               
               <View style={{width:45,height:45,borderRadius:100,backgroundColor:"brown",alignItems:"center",justifyContent:"center"}}>
               <Image style={{width:25,height:25,tintColor:"white"}}
               source={require('./Assets/exit.png')}/>
               </View>
               <Text style={{fontSize:16,color:"black"}}>Rapido Wallet</Text>
            </View>
     
    
  </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({})