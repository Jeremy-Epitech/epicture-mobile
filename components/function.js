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