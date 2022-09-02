import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
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
} from 'react-native';
import {useMoralis} from 'react-moralis';
import {useNFTBalance} from '../../hooks/useNFTBalance';
import {useMoralisDapp} from '../../providers/MoralisDappProvider/MoralisDappProvider';
import {Divider, Card} from '@ui-kitten/components';
// import Animation from '../../splashLottie1.json';
// import LottieView from "lottie-react-native";
import Transfer from '../Transfer/Transfer';
import Activity from '../Activity/Activity';

const Market = () => {
  const {NFTBalance, isLoading} = useNFTBalance();
  const {chainId} = useMoralisDapp();
  const {Moralis} = useMoralis();
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#444',

        tabBarStyle: {
          backgroundColor: '#BEA7E5',
          marginTop: 15,
          marginHorizontal: 25,
          borderRadius: 50,
          elevation: 0,
          overflow: 'hidden',
          left: 0,
          bottom: 0,
          right: 0,
        },
      }}>
      <Tab.Screen name="Sneakers" component={Activity} />
      <Tab.Screen name="Gems" component={Transfer} />
      <Tab.Screen name="Others" component={Transfer} />
    </Tab.Navigator>
  );
};
export default Market;
