import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function TimePicker({ onDurationChange }) {
  return (
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
      onDurationChange={onDurationChange}
    />
  )
}