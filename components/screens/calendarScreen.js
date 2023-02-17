import { React, useState } from 'react';
import {SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from "@react-native-async-storage/async-storage";

function CalendarScreen() {
  const [itemList,setItemList] = useState([]);
  const datesMarked = {}
  const getItem = async () => {
    try {
        const jsonlist =  await AsyncStorage.getItem('tasks')
        setItemList(jsonlist != null ? JSON.parse(jsonlist) : null);
    } catch(e) {
        console.log(e);
    }
    
}
getItem();
itemList.forEach(item => {
  console.log(datesMarked)
  datesMarked[item['date']] = { marked: true };
});
//console.log(datesMarked);
  return (
      <SafeAreaView style={styles.container}>
        <Calendar onDayPress={(day) => console.log('Selected date: ', day) } markedDates={datesMarked}/>
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