import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { TaskScreen, ListScreen, CalendarScreen } from './components/screens';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Tasks" 
                    screenOptions={({ route }) => ({
                                                    tabBarIcon: ({ focused, color }) => {
                                                      let iconName;

                                                      if (route.name === 'Tasks') {
                                                        iconName = focused
                                                          ? 'checkmark-circle-outline'
                                                          : 'checkmark-circle';
                                                      } else if (route.name === 'Lists') {
                                                        iconName = focused ? 'list-outline' : 'list';
                                                      } else if (route.name === 'Calendar') {
                                                        iconName = focused ? 'calendar-outline' : 'calendar';
                                                      }

                                                      // You can return any component that you like here!
                                                      return <Ionicons name={iconName} size={40} color={color} />;
                                                    },
                                                    tabBarStyle:styles.tabBar,
                                                    tabBarActiveTintColor: '#3E3364',
                                                    tabBarInactiveTintColor: '#6b696e',
                                                  })}>
        <Tab.Screen name="Tasks" component={TaskScreen} options={{ title: 'Tâches' }}/>
        <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendrier' }}/>
        <Tab.Screen name="Lists" component={ListScreen} options={{ title: 'Listes' }}/>
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
  tabBar: {
    backgroundColor: '#bcabd4',
    height:70,
  }
});