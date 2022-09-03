import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';

// import Animation from '../../splashLottie1.json';
// import LottieView from "lottie-react-native";
import Activity from '../Activity/Activity';

const Market = () => {
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
      <Tab.Screen name="Gems" component={Activity} />
      <Tab.Screen name="Others" component={Activity} />
    </Tab.Navigator>
  );
};
export default Market;
