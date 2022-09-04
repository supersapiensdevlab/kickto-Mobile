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
  faFemale,
  faMale,
  faMap,
  faShoePrints,
  faStopwatch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const [userDetails, setUserDetails] = useState<any>({name: '', mail: ''});
  const [modalVisible, setModalVisible] = useState(false);

  var menuItems = {
    Email: userDetails.mail,
    Name: userDetails.name,
    Gender: 'male',
    Password: '***',
  };
  const getData = async () => {
    console.log('Fetching Data');
    try {
      const value = await AsyncStorage.getItem('@email');
      const userName = await AsyncStorage.getItem('@name');

      if (value !== null) {
        // value previously stored
        setUserDetails({name: userName, mail: value});
        console.log('Welcome ', value);
      }
    } catch (e) {
      // error reading value
      console.log('Error: ', e);
    }
  };
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@email');
      navigation.replace('Login');
    } catch (e) {
      // remove error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex flex-col h-full pt-4">
      <Modal
        className="justify-center align-middle items-center absolute bottom-0"
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="absolute bottom-0 w-full">
          <View
            style={{elevation: 10}}
            className="  bg-brand rounded-xl p-6 items-center flex-col justify-around ">
            <Text className="text-white italic  font-bold text-2xl mb-3">
              Select Gender
            </Text>
            <View className="flex-row gap-4">
              <View className="flex-col justify-center items-center">
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  className="bg-white  border-[#fff]     border-b-4 border-r-4 border-b-[#DDD]  border-r-[#EEE] rounded-full w-10 h-10  p-2   justify-center        align-middle items-center">
                  <FontAwesomeIcon
                    style={{color: '#ff8c3d'}}
                    icon={faMale}
                    size={16}
                  />
                </Pressable>
                <Text className="text-lg italic font-bold text-white">
                  Male
                </Text>
              </View>
              <View className="flex-col justify-center items-center">
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  className="bg-white  border-[#fff]     border-b-4 border-r-4 border-b-[#DDD]  border-r-[#EEE] rounded-full w-10 h-10  p-2   justify-center        align-middle items-center">
                  <FontAwesomeIcon
                    style={{color: '#ff8c3d'}}
                    icon={faFemale}
                    size={16}
                  />
                </Pressable>
                <Text className="text-lg italic font-bold text-white">
                  Female
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View className=" justify-center flex-col flex px-6 py-4 border border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center bg-[#ff8c3d] rounded-3xl mx-4">
        <View className="flex flex-row items-center align-middle flex: 1 ">
          <>
            <View className="rounded-full bg-white h-16 w-16 border border-r-2 border-b-2 "></View>
            <View className="-mt-4 rounded-lg bg-[#ff8c3d] border border-b-2 border-r-2 w-16 h-4 hidden"></View>
          </>
        </View>
        <View className="bg-white p-2 rounded-3xl   flex-row mt-2">
          <View className="h-8 w-8 bg-slate-200 rounded-full mr-2"></View>
          <View className="h-8 w-8 bg-slate-200 rounded-full mr-2"></View>
          <View className="h-8 w-8 bg-slate-200 rounded-full"></View>
        </View>
      </View>

      <View className="flex p-6 gap-y-8">
        {Object.entries(menuItems).map(([key, value]) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                key == 'Name'
                  ? navigation.replace('Name')
                  : key == 'Gender'
                  ? setModalVisible(!modalVisible)
                  : null;
              }}>
              <View className="flex-row justify-between">
                <Text className="text-[#444] italic ">{key}</Text>
                <View className="flex-row  align-middle items-center">
                  <Text className="text-[#444] italic font-bold">{value}</Text>
                  <FontAwesomeIcon
                    style={{color: '#888'}}
                    icon={faChevronRight}
                    size={16}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex px-6 absolute bottom-2 align-middle items-center">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-red-500 rounded-full   px-6 py-2  mt-6 mb-3   border-red-600 border-r-4 border-b-4 border-r-red-600  border-b-red-700 align-middle items-center  ">
          <Text className="font-bold text-xl italic">Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    backgroundColor: 'red',
    elevation: 10,
    borderRadius: 15,
    shadowColor: 'grey',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});

export default Profile;
