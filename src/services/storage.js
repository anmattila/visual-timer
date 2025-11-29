import  AsyncStorage from "@react-native-async-storage/async-storage";

  export const saveTimerToHistory = async (timerData) => {
    try {
      const historyJson = await AsyncStorage.getItem('@data_key')
      const history = historyJson ? JSON.parse(historyJson) : [];
      history.push(timerData)
      await AsyncStorage.setItem('@data_key', JSON.stringify(history))
      console.log("Saved to storage")
      console.log(timerData)
    } catch (err){
      console.log("Error in saving history", err)
    }
  }
  
  export const getTimerHistory = async () => {
    try {
      const historyJson = await AsyncStorage.getItem('@data_key')
      return historyJson != null ? JSON.parse(jsonValue) : [];
    } catch (err) {
      console.log("Error in getting history", err)
      return []
    }
  }
  
