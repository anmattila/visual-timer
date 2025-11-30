import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from "react-native-paper";
import { Calendar } from 'react-native-calendars';
import { format } from "date-fns";
import { getAllTimerData } from '../services/storage';

export default function CalendarScreen() {

  const [timers, setTimers] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [day, setDay] = useState([]);

  useEffect(() => {
    const fetchTimers = async () => {
      const allData = await getAllTimerData();
      const timerData = allData['@data_key'] ?? [];
      setTimers(timerData)
    }
    fetchTimers();
  }, [])

  const marked = timers.reduce((accumulator, timer) => {
    const date = timer.date.split('T')[0]; // YYYY-MM-DD
    accumulator[date] = { selected: true, selectedColor: 'green' };
    return accumulator;
  }, {});

  const handleDayPress = (dateString) => {
    const filtered = timers.filter(timer => timer.date.startsWith(dateString));
    setDay(filtered);
    setSelectedDate(dateString);
  };
  // marked and handledaypress done with chatgpt

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          textMonthFontSize: 20,
          arrowColor: 'black',
        }}
        hideExtraDays={true}
        current={Date.now()}
        firstDay={1}
        enableSwipeMonths={true}
        onDayPress={(day) => handleDayPress(day.dateString)}
        markedDates={marked}
      >
      </Calendar>

      {selectedDate ? (
        <>
          <Text variant='headlineSmall'>Timers for {format(new Date(selectedDate), 'dd.MM.yyyy')}</Text>
          <FlatList
            style={{ width: '50%' }}
            data={day}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <Text style={{ fontSize: 16 }}>
                  {format(new Date(item.date), 'HH:mm')}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {item.duration.minutes}m {item.duration.seconds}s
                </Text>
              </View>
            )}
          />
        </>
      ) : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  calendar: {
    width: 350,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15
  },
  flatlist: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
});