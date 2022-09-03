import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

import Address from './Address';

export default function Header({navigation}) {
  return (
    <View className="mx-4">
      <TouchableOpacity onPress={() => navigation.replace('profile')}>
        <View style={styles.viewContainer}>
          <View style={styles.profile}></View>
          <View style={styles.profileBadge}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    borderRadius: 50,
    backgroundColor: '#F8F4F9',
    height: 48,
    width: 48,
    borderWidth: 1,
    borderEndWidth: 2,
    borderBottomWidth: 2,
  },
  profileBadge: {
    width: 50,
    height: 15,
    marginTop: -14,
    borderRadius: 50,
    backgroundColor: '#ff8c3d',
    borderWidth: 1,
    borderEndWidth: 2,
    borderBottomWidth: 2,
  },
});
