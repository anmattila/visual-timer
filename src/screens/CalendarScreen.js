import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { getTimerHistory } from "../services/storage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useState } from 'react';

export default function CalendarScreen() {

  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});