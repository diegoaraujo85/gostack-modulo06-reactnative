import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

console.tron.warn('hi');

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcome}>Diego!</Text>
      </View>
    </>
  );
}
