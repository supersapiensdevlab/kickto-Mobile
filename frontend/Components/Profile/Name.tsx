import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  StatusBar,
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  Pressable,
} from 'react-native';
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from 'react-moralis';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCar,
  faChevronRight,
  faClock,
  faDoorOpen,
  faMap,
  faShoePrints,
  faStopwatch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const [userName, setUserName] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);

  var menuItems = {
    Membership: 'Free User',
    'Activation Code': '0',
    'Total Distance': '0Km',
    'Kickto Power-Ups': '0/3',
  };
  const getData = async () => {
    console.log('Fetching Data');
    try {
      const value = await AsyncStorage.getItem('@name');

      if (value !== null) {
        // value previously stored
        setUserName(value);
        console.log('Username ', value);
      }
    } catch (e) {
      // error reading value
      console.log('Error: ', e);
    }
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@name', value);
      navigation.replace('profileEdit');
      getData();
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex flex-col h-full pt-4">
      <TextInput
        className="justify-between  flex-row flex px-6 py-4 border border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center bg-[#ff8c3d] rounded-3xl mx-4"
        placeholder="Enter Your Name"
        onChangeText={newText => setUserName(newText)}
        defaultValue={userName}
      />
      <View className="flex px-6 absolute bottom-2 align-middle items-center">
        <TouchableOpacity
          onPress={() => storeData(userName)}
          className="bg-[#ff8c3d] rounded-full   px-6 py-2  mt-6 mb-3   border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center  ">
          <Text className="font-bold text-xl italic">SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
