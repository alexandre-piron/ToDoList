import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar onDayPress={(day) => console.log('Selected date: ', day.dateString) }/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export {CalendarScreen};