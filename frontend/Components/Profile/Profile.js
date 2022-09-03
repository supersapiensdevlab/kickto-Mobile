import React from 'react';
import {
  StyleSheet,
  TextInput,
  StatusBar,
  View,
  Text,
  ScrollView,
  Button,
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
const Profile = ({navigation}) => {
  var menuItems = {
    Membership: 'Free User',
    'Activation Code': '0',
    'Total Distance': '0Km',
    'Kickto Power-Ups': '0/3',
  };

  return (
    <View className="flex flex-col h-full pt-4">
      <View className="justify-between flex-row flex px-6 py-4 border border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center bg-[#ff8c3d] rounded-3xl mx-4">
        <View className="flex flex-row items-center align-middle flex: 1 ">
          <>
            <View className="rounded-full bg-white h-16 w-16 border border-r-2 border-b-2 "></View>
            <View className="-mt-4 rounded-lg bg-[#ff8c3d] border border-b-2 border-r-2 w-16 h-4 hidden"></View>
          </>
          <View className="flex-col mx-3">
            <Text className="text-[#444] italic font-bold text-lg">
              Username
            </Text>
            <Text className="text-[#444] italic  ">email</Text>
          </View>
        </View>

        <TouchableOpacity className="  bg-white z-10 rounded-full p-1  bg-opacity-50  ">
          <FontAwesomeIcon
            style={{color: '#444'}}
            icon={faChevronRight}
            size={18}
          />
        </TouchableOpacity>
      </View>
      <View className="flex p-6 gap-y-8">
        {Object.entries(menuItems).map(([key, value]) => {
          return (
            <View key={key} className="flex-row justify-between">
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
          );
        })}
      </View>
      <View className="flex px-6 absolute bottom-2 align-middle items-center">
        <TouchableOpacity className="bg-[#ff8c3d] rounded-full   px-6 py-2  mt-6 mb-3   border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center  ">
          <Text className="font-bold text-xl italic">LOGOUT</Text>
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
