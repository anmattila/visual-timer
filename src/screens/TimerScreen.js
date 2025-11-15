import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableHighlight,
  Image,
} from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import PokemonImage from "../components/PokemonImage";
import usePokemonImages from "../hooks/usePokemonImages";
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

export default function TimerScreen() {
  const [selectedTime, setSelectedTime] = useState({ minutes: 0, seconds: 0 });
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);
  const [task, setTask] = useState("");

  const pokemons = [1, 4, 7, 23, 25, 35, 37, 43, 52, 100, 116, 120, 133, 143, 150];
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { data: images, isLoading, error } = usePokemonImages(pokemons);
  //const theme = useTheme();

  const handleStartTimer = () => {
    const totalTime = selectedTime.minutes * 60 + selectedTime.seconds;
    if (totalTime > 0) {
      setSecondsLeft(totalTime);
      setIsTimeRunning(true);
      activateKeepAwakeAsync(); 
    } else {
      Alert.alert("Please set a valid duration");
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
            deactivateKeepAwake();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isTimeRunning]);

  console.log("Render: ", selectedPokemon, selectedTime)

  return (
    <SafeAreaView
      style={styles.container}
    >
      {/* Landing page part */}
      {!isTimeRunning ? (
        <>
          <Text variant="displaySmall">Pick a friend!</Text>
          <View style={{ height: 140 }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {/* https://stackoverflow.com/questions/65520976/maping-in-scrollview-makes-horizontal-list-vertical-in-react-native */}
              {pokemons?.map((id, i) => (
                <TouchableHighlight
                  underlayColor={false}
                  key={id}
                  onPress={() => setSelectedPokemon(images[i])}
                >
                  {images && images[0] ? (    // If there's images array and at least 1 image
                    <Image
                      style={{ width: 90, height: 90, margin: 20 }}
                      source={{ uri: images[i] }}
                    />
                  ) : (
                    <View style={{ width: 90, height: 90, margin: 20 }} />
                  )}
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
          <PokemonImage
            imageUrl={selectedPokemon || images?.[0]}   // default pokemon
            isLoading={isLoading}
            error={error}
          />
          <TextInput
            placeholder="What's your plan?"
            value={task}
            onChangeText={setTask}
            mode="outlined"
            style={styles.taskInput}
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
                height: 55,
              },
            }}
            onDurationChange={({ minutes, seconds }) =>
              setSelectedTime({ minutes, seconds })
            }
          />
          <Button
            onPress={handleStartTimer}
            mode="outlined"
            buttonColor="white"
            style={styles.timerButton}
          >
            <Text variant="titleLarge">Start timer</Text>
          </Button>
        </>

      ) : (
        // Timer view
        <View style={styles.timerContainer}>
          <PokemonImage imageUrl={selectedPokemon} />
          <Text variant="headlineLarge">{secondsLeft} seconds left</Text>
          <Text variant="headlineMedium">for {task}</Text>
          <Button
            onPress={() => setIsTimeRunning(false)}
            mode="outlined"
            buttonColor="white"
            style={styles.timerButton}
          >
            <Text variant="titleLarge">Cancel</Text>
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,

  },
  timerContainer: {
    //gap: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timerButton: {
    width: 140,
    height: 55,
    margin: 30,
    justifyContent: "center",
  },
  taskInput: {
    width: "75%",
    margin: 20,
    fontSize: 20,
  },
  timerRunning: {},
});
