import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Button, Alert, TouchableHighlight, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimerPicker } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import usePokemonImage from '../hooks/usePokemon';
import PokemonImage from '../components/PokemonImage';

export default function TimerScreen() {

  const [selectedPokeId, setSelectedPokeId] = useState(1);
  const [task, setTask] = useState('')
  const [selectedTime, setSelectedTime] = useState({ minutes: 0, seconds: 0 });
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);

  const pokemons = [1, 4, 7, 25, 100, 150];
  const { data, isLoading, error } = usePokemonImage(selectedPokeId);

  const handleStartTimer = () => {
    const totalTime = selectedTime.minutes * 60 + selectedTime.seconds;
    if (totalTime > 0) {
      setSecondsLeft(totalTime)
      setIsTimeRunning(true)
    } else {
      Alert.alert('Please set a valid duration')
      return;
    }
  };

  useEffect(() => {
    if (isTimeRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsTimeRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isTimeRunning]);


  return (
    <SafeAreaView style={styles.container}>
      {!isTimeRunning ? (
        <>
          <Text>Pick a friend!</Text>
          <ScrollView
            //style={styles.scroll}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {pokemons.map((id) => (
              <TouchableHighlight
                underlayColor={false}
                key={id}
                onPress={() => setSelectedPokeId(id)}>
                <PokemonImage id={id} />
              </TouchableHighlight>
            ))}
          </ScrollView>
          <PokemonImage id={selectedPokeId} />
          <TextInput
            style={styles.taskInput}
            placeholder='What is your task?'
            value={task}
            onChangeText={setTask}
          />
          <TimerPicker
            padWithNItems={2}
            hideHours={true}
            disableInfiniteScroll={true}
            repeatMinuteNumbersNTimes={1}
            repeatSecondNumbersNTimes={1}
            minuteLabel="min"
            secondLabel="sec"
            LinearGradient={LinearGradient}
            styles={{
              pickerItem: {
                fontSize: 30,
              },
              pickerItemContainer: {
                width: 130,
              },
            }}
            onDurationChange={({ minutes, seconds }) => setSelectedTime({ minutes, seconds })}
          />
          <Button
            title="Start timer"
            onPress={handleStartTimer}
          />
        </>
      ) : (
        <View style={styles.timerContainer}>
          <PokemonImage id={selectedPokeId} />
          <Text style={{ fontSize: 30 }}>{task}</Text>
          <Text style={{ fontSize: 30 }}>{secondsLeft} seconds left</Text>
        </View>
      )
      }
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scroll: {

  },
  taskInput: {
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40
  },
  taskText: {
    fontSize: 30,
  },
  timerText: {
    fontSize: 30,
  }
})
