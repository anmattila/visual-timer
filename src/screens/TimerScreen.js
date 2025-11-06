import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, ScrollView, TextInput, Alert, TouchableHighlight, FlatList, Image } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
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

  const { data, isLoading, error } = usePokemonImage(selectedPokeId);
  const pokemons = [1, 4, 7, 23, 25, 35, 37, 43, 52, 100, 116, 120, 133, 143, 150];
  //const theme = useTheme();

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

  console.log("Rendering PokemonImage component id:", selectedPokeId, "data:", data ?? 'loading');

  return (
    <SafeAreaView style={styles.container}>
      {!isTimeRunning ? (
        <>
          <Text variant="headlineMedium">Pick a friend!</Text>
          <ScrollView
            style={styles.scroll}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {pokemons.map((id) => (
              <TouchableHighlight
                underlayColor={false}
                key={id}
                onPress={() => setSelectedPokeId(id)}
              >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{
                    //uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                  }}
                />
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
            padWithNItems={1}
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
          <Button onPress={handleStartTimer} title='Start timer'/>
        </>
      ) : (
        <View style={styles.timerContainer}>
          <PokemonImage id={selectedPokeId} />
          <Text style={{ fontSize: 30 }}>{secondsLeft} seconds left</Text>
          <Text style={{ fontSize: 30 }}>{task}</Text>
        </View>
      )}
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
    paddingTop: 20,
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
