import React, {useEffect, useState} from 'react';
import {useMoralis} from 'react-moralis';
import {useWalletConnect} from './WalletConnect';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Image, LogBox, TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CryptoAuth from './Components/CryptoAuth';
import RecentTransactions from './Components/RecentTransactions/RecentTransactions';
import Assets from './Components/Assets/Assets';
import Transfer from './Components/Transfer/Transfer';
import Profile from './Components/Profile/Profile';
import Header from './Components/Header';
import NFTAssets from './Components/NFT/NFTAssets';
import HomeTab from './Components/Home/Home';
import MarketTab from './Components/Market/Market';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCreditCard,
  faCoins,
  faUser,
  faPaperPlane,
  faRocket,
  faRunning,
  faShoppingCart,
  faTrophy,
  faShoppingBag,
  faMagic,
  faIcons,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import {LinearGradient} from 'react-native-svg';
import Maps from './Components/Maps/Maps';
import Login from './Components/Authentication/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileEdit from './Components/Profile/ProfileEdit';
import Name from './Components/Profile/Name';

LogBox.ignoreAllLogs();

// const Activecolor =
function Home(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#444',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ff8c3d',
          marginBottom: 35,
          marginHorizontal: 25,
          borderRadius: 50,
          elevation: 0,
          position: 'absolute',
          overflow: 'hidden',
          left: 0,
          bottom: 0,
          right: 0,
          borderColor: '#de4b28',
          borderTopColor: '#de4b28',
          borderBottomColor: '#de4b28',
          borderRightColor: '#e65b2d',
          borderEndColor: '#e65b2d',
          borderStartColor: '#de4b28',
          borderLeftColor: '#F00',

          borderBottomWidth: 4,
          borderRightWidth: 4,
          borderEndWidth: 4,
          borderStartWidth: 1,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color, focused}) => {
            return <FontAwesomeIcon icon={faRunning} color={color} size={20} />;
          },
        }}
        component={HomeTab}
      />
      <Tab.Screen
        name="NFTs"
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faIcons} color={color} size={20} />
          ),
        }}
        component={RecentTransactions}
      />
      <Tab.Screen
        name="Leaderboard"
        options={{
          tabBarIcon: ({color, focused}) => {
            return <FontAwesomeIcon icon={faTrophy} color={color} size={20} />;
          },
        }}
        component={Maps}
      />
      <Tab.Screen
        name="Market"
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faShoppingBag} color={color} size={20} />
          ),
        }}
        component={MarketTab}
      />

      {/* <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={20} />
          ),
        }}
        component={Profile}
      /> */}
    </Tab.Navigator>
  );
}

function Home2(): JSX.Element {
  return <></>;
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Assets':
      return 'Assets';
    case 'Transfer':
      return 'Transfer';
    case 'Transactions':
      return 'Transactions';
    case 'Profile':
      return 'Profile';
  }
}

const App = () => {
  const [userDetails, setUserDetails] = useState<string>();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@email');
      if (value !== null) {
        // value previously stored
        setUserDetails(value);
        console.log('Welcome ', value);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userDetails?.length > 1 ? 'Homescreen' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="Homescreen"
          component={Home}
          // Hiding header for Navigation Drawer
          options={({navigation, route}) => ({
            headerTintColor: '#ff8c3d',
            title: '',
            headerLeft: () => <Header navigation={navigation} />,
            headerStyle: {elevation: 0, backgroundColor: 'transparent'},
          })}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
        <Stack.Screen
          name="Map"
          component={Maps}
          // Hiding header for Navigation Drawer
          options={({navigation, route}) => ({
            headerTitle: props => <Header />,
            headerShown: false,
            headerStyle: {elevation: 0, backgroundColor: 'transparent'},
          })}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          // Hiding header for Navigation Drawer
          options={({navigation, route}) => ({
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.replace('Homescreen')}
                className="bg-[#ff8c3d] rounded-full   p-2  mt-6 mb-3   border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center">
                <FontAwesomeIcon
                  style={{color: '#fff'}}
                  icon={faChevronLeft}
                  size={16}
                />
              </TouchableOpacity>
            ),
            headerStyle: {elevation: 0, backgroundColor: 'transparent'},
          })}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />

        <Stack.Screen
          name="profileEdit"
          component={ProfileEdit}
          // Hiding header for Navigation Drawer
          options={({navigation, route}) => ({
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.replace('profile')}
                className="bg-[#ff8c3d] rounded-full   p-2  mt-6 mb-3   border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center">
                <FontAwesomeIcon
                  style={{color: '#fff'}}
                  icon={faChevronLeft}
                  size={16}
                />
              </TouchableOpacity>
            ),
            headerStyle: {elevation: 0, backgroundColor: 'transparent'},
          })}
        />

        <Stack.Screen
          name="Name"
          component={Name}
          // Hiding header for Navigation Drawer
          options={({navigation, route}) => ({
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.replace('profileEdit')}
                className="bg-[#ff8c3d] rounded-full   p-2  mt-6 mb-3   border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center">
                <FontAwesomeIcon
                  style={{color: '#fff'}}
                  icon={faChevronLeft}
                  size={16}
                />
              </TouchableOpacity>
            ),
            headerStyle: {elevation: 0, backgroundColor: 'transparent'},
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
