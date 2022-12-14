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
import {ActivityIndicator} from 'react-native-paper';

import {getNativeByChain} from '../../helpers/networks';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBolt,
  faIcons,
  faLocationArrow,
  faShoePrints,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const requestActivityPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: 'Kickto need to track user Activity',
          message:
            'Kickto App need to track user Activity ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can track User Activity');
      } else {
        console.log('Activity permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Kickto App needs access your Location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can access the User's Location");
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View className="flex-col">
      <View className="flex-col p-6 justify-center items-center  ">
        <View className="rounded-3xl bg-white h-56 w-full border-[#fff]     border-b-4 border-r-4 border-b-[#DDD]  border-r-[#EEE] mx-6mt-6 mb-3 "></View>
        <View className="bg-white w-[150] h-4 mb-10  items-center text-[#444]  px-1 flex-row rounded-lg">
          <FontAwesomeIcon icon={faBolt} size={12} />
          <Text className="text-[#444] text-xs font-bold italic">0.0/0</Text>
        </View>
        <View className="bg-white w-[150] h-4 mb-10  items-center text-[#444]  px-1 flex-row rounded-lg">
          <FontAwesomeIcon icon={faShoePrints} size={12} />
          <Text className="text-[#444]   text-xs font-bold italic ">0.0/0</Text>
        </View>
        <TouchableOpacity
          onPress={requestLocationPermission}
          className="bg-[#ff8c3d] rounded-full   px-6 py-2  mt-6 mb-3   border-[#ff8c3d] border-r-4 border-b-4 border-r-[#e65b2d]  border-b-[#de4b28] align-middle items-center  ">
          <Text className="font-bold text-xl italic text-white">START</Text>
        </TouchableOpacity>
        <Text className=" underline text-[#444] italic font-bold">
          How to Play?
        </Text>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   headerText: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 35,
//     backgroundColor: 'white',
//     paddingTop: 10,
//   },
//   itemContainer: {
//     backgroundColor: 'white',
//     paddingTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 5,
//     marginVertical: 10,
//     borderRadius: 30,
//     elevation: 5, //for android
//     shadowColor: '#171717',
//     shadowOffset: {width: 0, height: 6},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     paddingBottom: 10,
//   },
//   itemView: {
//     backgroundColor: 'white',
//     width: '95%',
//     flexDirection: 'column',
//     shadowColor: 'black',
//     shadowRadius: 40,
//   },
//   nameBig: {
//     fontSize: 25,
//     color: '#414a4c',
//     fontWeight: '600',
//   },
//   name: {
//     fontSize: 15,
//     color: '#414a4c',
//     fontWeight: '600',
//   },
//   logo: {
//     height: 450,
//     borderRadius: 20,
//   },
//   assetsViewer: {
//     borderRadius: 10,
//     backgroundColor: 'white',
//   },
//   container: {
//     marginTop: 42,
//     height: 36,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   equippedNFT: {
//     borderRadius: 30,
//     backgroundColor: 'white',
//     height: 250,
//     width: 325,
//     borderColor: '#444',
//     margin: 24,
//     borderWidth: 2,
//     borderEndWidth: 5,
//     borderBottomWidth: 5,
//   },
//   startButton: {
//     borderRadius: 30,
//     backgroundColor: '#BEA7E5',
//     height: 55,
//     borderColor: '#444',
//     marginTop: 24,
//     marginBottom: 12,
//     width: 150,
//     borderWidth: 2,
//     borderEndWidth: 5,
//     borderBottomWidth: 5,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   startText: {
//     fontStyle: 'italic',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   linkText: {
//     fontStyle: 'italic',
//     fontWeight: 'bold',
//     fontSize: 12,
//     color: '#444',
//     textDecorationLine: 'underline',
//   },
//   progressStyle: {
//     borderRadius: 30,
//     backgroundColor: '#fff',
//     width: 150,
//     height: 20,
//     marginBottom: 10,
//     borderColor: '#444',
//     color: '#444',
//     padding: 4,
//     paddingHorizontal: 6,
//     flexDirection: 'row',
//   },
//   progressText: {
//     color: '#444',
//     fontSize: 12,
//     padding: 0,
//     marginTop: -2,
//     marginLeft: 4,
//     fontStyle: 'italic',
//     fontWeight: 'bold',
//   },
// });

export default Home;
