import { Calendar } from 'react-native-calendars';
import { getTimerHistory } from "../services/storage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Text } from "react-native-paper";
import { format } from "date-fns";

export default function CalendarScreen() {

  const [history, setHistory] = useState([]);
  const [marked, setMarked] = useState({})
  const [selected, setSelected] = useState('')

  useEffect(() => {
    const showHistory = async () => {
      const data = await getTimerHistory();
      setHistory(data)
      const marks = {}
      history.forEach(item => {
        if (item.date) {
          marks[item.date] = { marked: true, dotColor: 'red' }
        }
      });
      setMarked(marks)
    };
    showHistory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        hideExtraDays={true}
        current={Date.now()}
        firstDay={1}
        enableSwipeMonths={true}
        style={{
          width: 300,
        }}
        markingType='simple'
        //onDayPress={onDayPress}
        markedDates={marked}
      >
      </Calendar>

      <Text>Here is list of timers</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{format(new Date(item.date), 'dd.MM.yyyy')} : {item.duration.minutes}m {item.duration.seconds}s</Text>
        )}
      />
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