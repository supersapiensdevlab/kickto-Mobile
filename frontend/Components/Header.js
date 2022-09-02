import React from 'react';
import {View, StyleSheet} from 'react-native';

import Address from './Address';

export default function Header() {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.profile}></View>
      <View style={styles.profileBadge}></View>

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
  profile:{
    borderRadius:50,
    backgroundColor:"#F8F4F9",
    height:48,
    width:48,    borderWidth:1,
    borderEndWidth:2,
    borderBottomWidth:2
  },
  profileBadge:{
    width:50,
    height:15,
    marginTop:-14,
    borderRadius:50,
    backgroundColor:"#BEA7E5",
    borderWidth:1,
    borderEndWidth:2,
    borderBottomWidth:2
  }
});
