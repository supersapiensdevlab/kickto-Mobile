import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [mail, setMail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const [userDetails, setUserDetails] = useState<string>();

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@email', value);
      getData();
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@email');

      if (value?.length > 1) {
        // value previously stored
        console.log('Login using ', value);
        setMail('');
        setUserDetails(value);
        navigation.replace('Homescreen');
      }
    } catch (e) {
      // error reading value
    }
  };

  const removeValue = async () => {
    try {
      AsyncStorage.setItem('@email', '').then(() => {
        //navigation.replace('Login');
        console.log('Done.');
        setUserDetails('');
      });
    } catch (e) {
      // remove error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex-col bg-lime-100 p-6 h-full justify-center align-middle gap-y-4">
      <TextInput
        className="justify-between flex-row flex px-6 py-4 border border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center bg-[#ff8c3d] rounded-3xl mx-4"
        placeholder="Enter your mail ID"
        onChangeText={newText => setMail(newText)}
        defaultValue={mail}
      />
      <TextInput
        className="justify-between flex-row flex px-6 py-4 border border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center bg-[#ff8c3d] rounded-3xl mx-4"
        placeholder="Verification Code"
        onChangeText={newText => setCode(newText)}
        defaultValue={code}
      />
      <View>
        <TouchableOpacity
          onPress={() => storeData(mail)}
          className="bg-brand rounded-full   px-6  py-2   border-[#BEA7E5] border-r-4 border-b-4 border-r-[#9f87c9]  border-b-[#8c73b6] align-middle items-center  ">
          <Text className="font-bold text-xl italic text-white">
            Login/Signup
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-slate-800" onPress={() => getData()}>
        Get User Details
      </Text>

      {userDetails ? (
        <Text className="text-slate-800" onPress={() => removeValue()}>
          Remove User Details of {userDetails}
        </Text>
      ) : null}
    </View>
  );
};

export default Home;
