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
    console.log("Selected date:", dateString);
    const filtered = timers.filter(timer => timer.date.startsWith(dateString));
    console.log("Filtered timers:", filtered);
    setDay(filtered);
    setSelectedDate(dateString);
  };
  // marked and handledaypress done with chatgpt

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          textMonthFontSize: 26,
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
          <Text style={styles.header}>Timers for {format(new Date(selectedDate), 'dd.MM.yyyy')}</Text>
          <FlatList
            style={{width: '100%'}}
            data={day}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.leftColumn}>
                  {format(new Date(item.date), 'HH:mm')}
                </Text>
                <Text style={styles.rightColumn}>{item.duration.minutes}m {item.duration.seconds}s</Text>
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
    padding: 20,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  row: {
    flexDirection: 'row',       // vasen → oikea
    justifyContent: 'space-between', // levittää sarakkeet
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leftColumn: {
    flex: 1,
    fontWeight: '500',
  },
  rightColumn: {
    flex: 1,
    textAlign: 'right',
  },
});