import {
  faCross,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoicmlzaGlrZXNoazkiLCJhIjoiY2w3bTA0ZDJ6MGxtbDNvcDlyc2N2a3NoZiJ9.AIrU3Ngbi0174p3_VJxuMg',
);
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  container: {
    height: 300,
    width: 300,
    flex: 1,
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
});
const Maps = ({setViewMap}) => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.topBox}>
        <View style={styles.horizontalRow}>
          <Text style={styles.texth1}>0.00</Text>
          <Text style={styles.texth1}>00:00:00</Text>
          <Text style={styles.texth1}>0.0</Text>
        </View>
        <View style={styles.horizontalRow}>
          <Text style={styles.textCaption}>km</Text>
          <Text style={styles.textCaption}>Time</Text>
          <Text style={styles.textCaption}>km/h</Text>
        </View>
      </View>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={15}
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
          <FontAwesomeIcon style={{color: '#FFF'}} icon={faTimes} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Maps;
