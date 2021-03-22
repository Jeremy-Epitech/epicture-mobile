import React, { Component, useState } from 'react';
import { Text, ImageBackground, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import DisplayImg from './displayImg';
import axios from 'axios';
import imgur from '../constants/imgur';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
        };
    }

    componentDidMount() {
        this.callImgur();
        console.log(this.state.images)
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
        console.log(this.state.images)
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
                        <Text style={styles.text}>Login page</Text>
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

                <DisplayImg images={this.state.images}></DisplayImg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007c91',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: "80%",
        backgroundColor: "#00b5ad",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
        // borderRadius: 25,
        // borderColor: 'black',
        // backgroundColor: 'grey',
        // textAlign: 'center'
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