import React, { Component, useState } from 'react';
import { Text, ScrollView, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayImg from './displayImg';
import axios from 'axios';
import imgur from '../constants/imgur';


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
        this.callImgur();
    }

    getData = async (item) => {
        try {
            const value = await AsyncStorage.getItem(item)
            if (value && typeof (value) != 'undefined') {
                // value previously stored
                this.setState({
                    user: { access_token: value, isLogged: true }
                })
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

    pushImgs(res) {
        this.setState({
            images: []
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
            // <h1>ezzabu</h1>
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
                            this.props.navigation.navigate('Search')
                        }>
                        <Text style={styles.text}>Search page</Text>
                    </TouchableOpacity>
                    {this.state.user !== null &&
                        <TouchableOpacity
                            style={styles.button}
                            title=""
                            onPress={() =>
                                this.props.navigation.navigate('Profil')
                            }>
                            <Text style={styles.text}>Profil page</Text>
                        </TouchableOpacity>}
                </View>

                <DisplayImg images={this.state.images}></DisplayImg>
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
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 20,
        padding: 12
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
});