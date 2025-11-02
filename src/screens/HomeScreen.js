import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { TimerPicker } from 'react-native-timer-picker';
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {

  const [selectedTime, setSelectedTime] = useState({ minutes: 0, seconds: 0 });
  const [task, setTask] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const intervalRef = useRef(null);

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
    <View style={styles.container}>
      {(!isTimeRunning) && (
        <TextInput
          style={styles.taskInput}
          placeholder='Set a task'
          value={task}
          onChangeText={setTask}
        />
      )}
      {!isTimeRunning && (
        <View>
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
              //theme: "light",
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
            title="Set timer"
            onPress={handleStartTimer}
          />
        </View>
      )}

      {(isTimeRunning || secondsLeft > 0) && (
        <View style={styles.timerContainer}>
          <Text style={{ fontSize: 30 }}>{task}</Text>
          <Text style={{ fontSize: 30 }}>{secondsLeft} seconds</Text>
        </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
