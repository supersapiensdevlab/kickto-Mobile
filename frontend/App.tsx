import React from 'react';
import {useMoralis} from 'react-moralis';
import {useWalletConnect} from './WalletConnect';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, LogBox} from 'react-native';

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
} from '@fortawesome/free-solid-svg-icons';

import {LinearGradient} from 'react-native-svg';

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
          backgroundColor: '#BEA7E5',
          marginBottom: 35,
          marginHorizontal: 25,
          borderRadius: 50,
          elevation: 0,
          position: 'absolute',
          overflow: 'hidden',
          left: 0,
          bottom: 0,
          right: 0,
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
        component={NFTAssets}
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

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DrawerNavigationRoutes">
        {/* Auth Navigator: Include Login and Signup */}
        {/* <Stack.Screen
          name="Auth"
          component={CryptoAuth}
          options={{headerShown: false}}
        /> */}
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={Home}
          // Hiding header for Navigation Drawer
          options={{
            headerTitle: props => <Header />,
            headerStyle: {elevation: 0, backgroundColor: '#EEE'},
          }}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;