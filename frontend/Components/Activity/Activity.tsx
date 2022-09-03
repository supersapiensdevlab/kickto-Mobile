import {
  faCar,
  faClock,
  faMap,
  faShoePrints,
  faStopwatch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import StepCounter from 'react-native-daily-step-counter';
import {useTimer} from '../../hooks/useTimer';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import RNSpeedometer from 'react-native-speedometer';
import {map, filter} from 'rxjs/operators';
import {Icon} from '@ui-kitten/components';
import Maps from '../Maps/Maps';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoicmlzaGlrZXNoazkiLCJhIjoiY2w3bTA0ZDJ6MGxtbDNvcDlyc2N2a3NoZiJ9.AIrU3Ngbi0174p3_VJxuMg',
);
const Activity = ({navigation}) => {
  const [stepCount, setStepCount] = useState<number>(0);
  const [stepInitialCount, setStepInitialCount] = useState<number>(0);
  const [stepsStop, setStepsStop] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(0);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [viewMap, setViewMap] = useState<boolean>(false);
  const {pause, reset, running, seconds, start, stop} = useTimer();

  const startStreaming = () => {
    setStreaming(!streaming);
  };

  const updateStepCounter = () => {
    console.log('Updating Steps Data...');
    const startDate = new Date();
    startDate.setDate(startDate.getDate()); // getting date from yesterday
    startDate.setHours(0, 0, 0);
    const endDate = new Date();
    StepCounter.queryPedometerDataBetweenDates(
      startDate.getTime(), // react native can't pass Date object, so you should pass timestamp.
      endDate.getTime(),
      (error, data) => {
        console.log('Ped Data:', data);

        setStepInitialCount(data?.numberOfSteps ?? 0);
        setStepCount(() => data?.numberOfSteps - stepInitialCount ?? 0);
        console.log(stepInitialCount, stepCount);
      },
    );
  };

  // android need initial listner register process.
  useEffect(() => {
    // on android, you should call StepCounter.startPedometerUpdatesFromDate once to start collecting step count.
    // make sure you get permission before you call this.
    // don't call stopPedometerUpdates unless you want to stop collecting step count.
    if (Platform.OS === 'android') {
      updateStepCounter();
    }

    accelerometer
      .pipe(
        map(({x, y, z}) => x + y + z),
        filter(speed => speed >= 0),
      )
      .subscribe(
        speed => setSpeed(speed),
        error => {
          console.log('The sensor is not available');
        },
      );
  }, []);

  useEffect(() => {
    updateStepCounter();
  }, [stepsStop]);

  useEffect(() => {
    if (streaming) {
      var startDate = new Date().getTime() + 5.5 * 60 * 60 * 1000;

      console.log(startDate);
      // startDate.setHours(0, 0, 0); // ios collects hours, minutes, seconds. but android only works for date. step counts are saved per date YYYY-MM-DD.
      StepCounter.startPedometerUpdatesFromDate(startDate, pedometerData => {
        setStepCount(pedometerData.numberOfSteps - stepInitialCount);
      });
      setStepsStop(false);
    } else {
      StepCounter.stopPedometerUpdates();
      setStepCount(0);
      setStepsStop(true);
    }
  }, [streaming]);

  function secondsToTime(e) {
    const h = Math.floor(e / 3600)
        .toString()
        .padStart(2, '0'),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, '0'),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, '0');

    return m + ':' + s;
    //return `${h}:${m}:${s}`;
  }

  setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms

  return (
    <>
      {viewMap ? (
        <View style={styles.page}>
          <View className="bg-white mb-12 mx-4 rounded-xl h-24 absolute z-10 overflow-hidden left-0 right-0 top-6 border border-[#666] flex-col justify-center ">
            <View className="flex-row flex justify-between px-12 ">
              <Text className="text-lg font-bold text-[#444] italic text-left  w-fit">
                0.00
              </Text>
              <Text className="text-lg font-bold text-[#444] italic text-left  w-fit ">
                {secondsToTime(seconds)}
              </Text>
              <Text className="text-lg font-bold text-[#444] italic text-left  w-fit">
                0.0
              </Text>
            </View>
            <View className="flex-row flex justify-between px-12 ">
              <Text className=" text-[#444]">km</Text>
              <Text className=" text-[#444] text-right pl-6 ">Time</Text>
              <Text className=" text-[#444] text-right">km/h</Text>
            </View>
          </View>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={16}
              animationMode={'flyTo'}
              animationDuration={1100}
              followUserLocation={true}
            />
            <MapboxGL.UserLocation
              visible={true}
              animated={true}
              showsUserHeadingIndicator={true}
              androidRenderMode={'compass'}
              renderMode={'native'}
              minDisplacement={1}
            />
          </MapboxGL.MapView>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => setViewMap(false)}
              style={styles.closeButton}>
              <FontAwesomeIcon
                style={{color: '#FFF'}}
                icon={faTimes}
                size={18}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View
            className="flex flex-col "
            style={{flex: 1, paddingVertical: 36}}>
            <View style={styles.containerHorizontal}>
              <View style={styles.container}>
                <Text style={styles.timerText}>{secondsToTime(seconds)}</Text>
                <FontAwesomeIcon
                  style={{color: '#666'}}
                  icon={faStopwatch}
                  size={18}
                />
              </View>
              <View style={styles.container}>
                <Text style={styles.stepsText}>0.0km/h</Text>
                <FontAwesomeIcon
                  style={{color: '#666'}}
                  icon={faCar}
                  size={18}
                />
              </View>
              {/* <Text>{stepInitialCount}</Text> */}
              <View style={styles.container}>
                <Text style={styles.stepsText}>{stepCount} </Text>
                <FontAwesomeIcon
                  style={{color: '#666', transform: [{rotate: '-90deg'}]}}
                  icon={faShoePrints}
                  size={18}
                />
              </View>
            </View>
            {/* <View style={styles.container}>
        <RNSpeedometer value={speed} size={100} />
      </View> */}
            <View style={{marginVertical: 36}}></View>
            <View style={styles.container}>
              <Text
                style={styles.distanceText}
                onPress={() => console.log('Map')}>
                0.00{' '}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  color: '#666',
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                }}>
                kilometers{' '}
              </Text>
            </View>
            <View className="flex-row align-middle items-center absolute bottom-24 justify-around gap-6 mx-6">
              <TouchableOpacity
                className="p-4 items-center align-middle bg-[#b9f18c] rounded-full border-[#b9f18c] border-r-4 border-b-4 border-r-[#8cd154]  border-b-[#78af4c]"
                onPress={() => setViewMap(!viewMap)}
                style={{}}>
                <FontAwesomeIcon
                  style={{color: '#fff'}}
                  icon={faMap}
                  size={18}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  running ? stop() : start();
                  startStreaming();
                }}
                className="bg-[#BEA7E5] rounded-full   px-8  py-2   border-[#BEA7E5] border-r-4 border-b-4 border-r-[#9f87c9]  border-b-[#8c73b6] align-middle items-center  ">
                <Text className="font-bold text-xl italic text-white">
                  {!streaming ? 'Start' : 'Stop'}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};
export default Activity;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  map: {height: '100%', width: '100%', flex: 1},
  topBox: {
    backgroundColor: '#FFF',
    marginBottom: 35,
    marginHorizontal: 25,
    borderRadius: 20,
    elevation: 8,
    height: 90,
    position: 'absolute',
    zIndex: 10,
    overflow: 'hidden',
    left: 0,
    right: 0,
    top: 10,
    borderColor: '#666',
    flexDirection: 'column',
    borderWidth: 1,
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: '#333',
    borderRadius: 50,

    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    overflow: 'hidden',
    left: 0,
    right: 0,
    bottom: 100,
  },
  horizontalRow: {
    flexDirection: 'row',
    padding: 8,
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  texth1: {
    color: '#444',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textCaption: {
    color: '#444',
    fontSize: 12,
  },
  headerText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 35,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 30,
    elevation: 5, //for android
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingBottom: 10,
  },
  itemView: {
    backgroundColor: 'white',
    width: '95%',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowRadius: 40,
  },
  nameBig: {
    fontSize: 25,
    color: '#414a4c',
    fontWeight: '600',
  },
  name: {
    fontSize: 15,
    color: '#414a4c',
    fontWeight: '600',
  },
  logo: {
    height: 450,
    borderRadius: 20,
  },
  assetsViewer: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  containerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equippedNFT: {
    borderRadius: 30,
    backgroundColor: 'white',
    height: 250,
    width: 325,
    borderColor: '#444',
    margin: 24,
    borderWidth: 2,
    borderEndWidth: 5,
    borderBottomWidth: 5,
  },
  startButton: {
    borderRadius: 30,
    backgroundColor: '#BEA7E5',
    height: 55,
    borderColor: '#444',
    width: 150,
    borderWidth: 2,
    borderEndWidth: 5,
    borderBottomWidth: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
  },
  linkText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444',
    textDecorationLine: 'underline',
  },
  progressStyle: {
    borderRadius: 30,
    backgroundColor: '#fff',
    width: 150,
    height: 20,
    marginBottom: 10,
    borderColor: '#444',
    color: '#444',
    padding: 4,
    paddingHorizontal: 6,
    flexDirection: 'row',
  },
  progressText: {
    color: '#444',
    fontSize: 12,
    padding: 0,
    marginTop: -2,
    marginLeft: 4,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  timer: {
    marginVertical: 10,
  },
  timerText: {
    fontSize: 32,
    color: '#414a4c',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  stepsText: {
    fontSize: 32,
    color: '#414a4c',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  distanceText: {
    fontSize: 64,
    color: '#414a4c',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
