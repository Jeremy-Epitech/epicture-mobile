import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';


export default class ActionStorage extends React.Component {

    getToken = (token) => ({
        type: 'GET_TOKEN',
        token,
    });

    saveToken = token => ({
        type: 'SAVE_TOKEN',
        token
    });

    removeToken = () => ({
        type: 'REMOVE_TOKEN',
    });

    loading = bool => ({
        type: 'LOADING',
        isLoading: bool,
    });

    error = error => ({
        type: 'ERROR',
        error,
    });


    getUserToken = () => dispatch =>

        AsyncStorage.getItem('userToken')
            .then((data) => {
                dispatch(loading(false));
                dispatch(getToken(data));
            })
            .catch((err) => {
                dispatch(loading(false));
                dispatch(error(err.message || 'ERROR'));
            })



    saveUserToken = (data) => dispatch =>
        AsyncStorage.setItem('userToken', data)
            .then((data) => {
                dispatch(loading(false));
                dispatch(saveToken('token saved'));
            })
            .catch((err) => {
                dispatch(loading(false));
                dispatch(error(err.message || 'ERROR'));
            })


    removeUserToken = () => dispatch =>
        AsyncStorage.removeItem('userToken')
            .then((data) => {
                dispatch(loading(false));
                dispatch(removeToken(data));
            })
            .catch((err) => {
                dispatch(loading(false));
                dispatch(error(err.message || 'ERROR'));
            })
}