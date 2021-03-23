import AsyncStorage from '@react-native-async-storage/async-storage';

export const parseURl = (url) => {
    var regex = /[?&#]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
    while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
    }
    return params
};

export const getData = async (item) => {
    try {
        const value = await AsyncStorage.getItem(item)
        if (value !== null) {
            // value previously stored
            console.log(`la value: ${value}`)
            const user = { access_token: value, isLogged: true }
            return user
        }
        console.log(value)

    } catch (e) {
        console.log(e)
        // error reading value
    }
}