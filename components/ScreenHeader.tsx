import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {COLORS} from '../constants/theme';

export default function ScreenHeader() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Popcorn Queue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontFamily: 'Geist-Bold',
    color: COLORS.text,
    fontSize: 24,
    marginTop: 10,
  },
});
