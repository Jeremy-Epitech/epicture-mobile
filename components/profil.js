import React, { Component, useState } from 'react';
import { Text, ImageBackground, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DisplayImg from './displayImg';
import axios from 'axios';
import imgur from '../constants/imgur'


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            user: null,
        };
    }

    componentDidMount() {
        this.getData('access_token');
        this.getData('account_username');
        console.log(this.state)
    }

    getData = async (item) => {
        try {
            const value = await AsyncStorage.getItem(item)
            if (value !== null && value != undefined) {
                // value previously stored
                if (item === 'access_token')
                    this.setState(prevState => ({
                        user: { ...prevState.user, access_token: value, isLogged: true }
                    }));

                if (item === 'account_username')
                    this.setState(prevState => ({
                        user: { ...prevState.user, account_username: value }
                    }));
            }
        } catch (e) {
            console.log(e)
            // error reading value
        }
    }

    callImgur() {
        axios.get(`${imgur.dev.apiUrl}/3/gallery/hot/viral`, {
            headers: {
                Authorization: `Client-ID ${imgur.client.CLIENT_ID}`
            }
        }).then(response => {
            this.pushImgs(response.data.data);
        }).catch(err => {
            console.log(err)
        });
    };

    favoriteImgur() {
        axios.get(`${imgur.dev.apiUrl}/3/account/${this.state.user.account_username}/gallery_favorites`, {
            headers: {
                Authorization: `Client-ID ${imgur.client.CLIENT_ID}`
            }
        }).then(response => {
            this.pushImgs(response.data.data);
        }).catch(err => {
            console.log(err)
        });
    };

    favoriteImgur() {

    }

    pushImgs(res) {
        this.setState({
            user: null
        });
        res.forEach(element => {
            let img;
            let imgs = [];
            if (element.images) {
                element.images.forEach(image => {
                    img = {
                        description: image.title,
                        img: image.link
                    }
                })
            } else {
                img = {
                    description: '',
                    img: element.link
                }
            }
            imgs.push(img)
            const imgData = {
                title: element.title,
                imgs: img,
                date: element.datetime
            };
            this.setState({
                images: [...this.state.images, imgData],
            });
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.fixToText}>
                    <TouchableOpacity
                        style={styles.button}
                        title=""
                        onPress={() =>
                            this.props.navigation.navigate('Login')
                        }>
                        <Text style={styles.text}>User page</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title=""
                        onPress={() =>
                            this.props.navigation.navigate('Home')
                        }>
                        <Text style={styles.text}>Home page</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fixToText}>
                    {/* Bouton pour récupérer les images du compte */}
                    <TouchableOpacity
                        style={styles.button}
                        title=""
                        onPress={this.favoriteImgur()}>
                        <Text style={styles.text}>Favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        title=""
                        onPress={this.callImgur()}>
                        <Text style={styles.text}>My post</Text>
                    </TouchableOpacity>
                </View>
                {this.state.images !== [] && <DisplayImg images={this.state.images}></DisplayImg>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007c91',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#00b5ad",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        padding: 20
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    inputext: {
        width: 200,
        height: 44,
        padding: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 25,
    },
    images: {
        position: 'relative',
        width: 50,
        height: 75,
    }
});