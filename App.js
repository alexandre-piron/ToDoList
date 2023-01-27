import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@rneui/base';

export default function App() {
  const AwesomeButton = () => (<Button title='Welcome'/>)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <AwesomeButton></AwesomeButton>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});