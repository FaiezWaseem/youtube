import AsyncStorage from '@react-native-async-storage/async-storage';
class Storage {
  static DEFAULT = 0;
  static JSON = 1;

  static save(key, value, type = Storage.JSON) {
    if (type == Storage.JSON) {
      AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      AsyncStorage.setItem(key, value.toString());
    }
  }

  static async get(key, type = Storage.JSON) {
    try {
      let data = (await AsyncStorage.getItem(key)) || undefined;
      if (data != undefined) {
        if (type == Storage.JSON) {
          return JSON.parse(data);
        }
        return data;
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  static async clearAll() {
    await AsyncStorage.clear();
  }
  static async clear(key) {
    await AsyncStorage.removeItem(key);
  }
}

export default Storage;
