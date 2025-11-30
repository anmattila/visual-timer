import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableHighlight,
  Image,
} from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { saveTimerToHistory } from "../services/storage";
import usePokemonImages from "../hooks/usePokemonImages";
import PokemonImage from "../components/PokemonImage";
import TimePicker from "../components/TimePicker";
import AnimatedPokemon from "../components/AnimatedPokemon";

export default function TimerScreen() {
  const [selectedTime, setSelectedTime] = useState({ minutes: 0, seconds: 0 });
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);
  const [task, setTask] = useState("");

  const pokemons = [
    1, 4, 7, 23, 25, 35, 37, 43, 52, 100, 116, 120, 133, 143, 150,
  ];
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [animation, setAnimation] = useState(false);
  const { data: images, isLoading, error } = usePokemonImages(pokemons);

  const handleStartTimer = () => {
    const totalTime = selectedTime.minutes * 60 + selectedTime.seconds;
    if (totalTime > 0) {
      setSecondsLeft(totalTime);
      setIsTimeRunning(true);
      setAnimation(true);
      activateKeepAwakeAsync();
    } else {
      Alert.alert("Please set a valid duration");
      return;
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsTimeRunning(false);
    setTask("");
    setSecondsLeft(0);
    deactivateKeepAwake();
  };

  const handleCancelTimer = () => {
    stopTimer();
    Alert.alert("Timer cancelled");
  };

  const finishTimer = async () => {
    stopTimer();
    Alert.alert("Time's up, good job!");
    const timerData = {
      id: Date.now(),
      duration: selectedTime,
      date: new Date().toISOString(),
    };
    await saveTimerToHistory(timerData);
  };

  useEffect(() => {
    if (!isTimeRunning) return;
    const totalTime = selectedTime.minutes * 60 + selectedTime.seconds;
    intervalRef.current = setInterval(async () => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          finishTimer(totalTime);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isTimeRunning]);

  return (
    <SafeAreaView style={styles.container}>
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
                  {images && images[0] ? ( // If there's images array and at least 1 image
                    <Image
                      style={styles.pokemonsInList}
                      source={{ uri: images[i] }}
                    />
                  ) : (
                    <View style={styles.pokemonsInList} />
                  )}
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
          <PokemonImage
            imageUrl={selectedPokemon || images?.[0]} // default pokemon
            isLoading={isLoading}
            error={error}
            style={styles.selectedPokemon}
          />
          <TextInput
            placeholder="What's your plan?"
            value={task}
            onChangeText={setTask}
            mode="outlined"
            style={styles.taskInput}
          />
          <TimePicker
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
          <AnimatedPokemon
            imageUrl={selectedPokemon || images?.[0]}
            style={styles.animatedPokemon}
            selectedTime={secondsLeft}
          />
          <Text variant="headlineLarge">{secondsLeft} seconds left</Text>
          {task && <Text variant="headlineMedium">for {task}</Text>}
          <Button
            onPress={handleCancelTimer}
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timerContainer: {
    //gap: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timerButton: {
    width: 160,
    height: 55,
    margin: 30,
    justifyContent: "center",
  },
  taskInput: {
    width: "75%",
    margin: 20,
    fontSize: 20,
  },
  pokemonsInList: {
    width: 90,
    height: 90,
    margin: 20,
  },
  selectedPokemon: {
    width: 150,
    height: 150,
  },
  animatedPokemon: {
    width: 250,
    height: 250,
  },
});
