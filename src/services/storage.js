import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTimerToHistory = async (timerData) => {
  try {
    const historyJson = await AsyncStorage.getItem("@data_key");
    const history = historyJson ? JSON.parse(historyJson) : [];
    history.push(timerData);
    await AsyncStorage.setItem("@data_key", JSON.stringify(history));
    console.log("Saved to storage");
  } catch (err) {
    console.log("Error in saving history", err);
  }
};

export const getAllTimerData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    const obj = Object.fromEntries(result);

    Object.keys(obj).forEach((key) => {
      try {
        obj[key] = JSON.parse(obj[key]);
      } catch (error) {
        obj[key] = obj[key];
      }
    });
    return obj;
  } catch (err) {
    console.log("Error in getting history", err);
  }
};
// https://stackoverflow.com/questions/48194482/react-native-return-all-json-data-in-asyncstorage
