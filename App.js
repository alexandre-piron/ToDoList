import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { TaskSreen, ListSreen, CalendarSreen } from './components/sreens';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    /*<View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <AwesomeButton></AwesomeButton>
      <StatusBar style="auto" />
    </View>*/
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" >
        <Tab.Screen name="Tasks" component={TaskSreen} />
        <Tab.Screen name="Calendar" component={CalendarSreen} />
        <Tab.Screen name="Lists" component={ListSreen} />
      </Tab.Navigator>
    </NavigationContainer>
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