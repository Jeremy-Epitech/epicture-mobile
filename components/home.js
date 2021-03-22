import React, { Component, useState } from 'react';
import { Text, ImageBackground, Button, View, StyleSheet, TextInput } from 'react-native';
import DisplayImg from './displayImg';
import axios from 'axios';
import env from '../variables';


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
        axios.get(`${env.dev.apiUrl}/3/gallery/hot/viral`, {
            headers: {
                Authorization: `Client-ID ${env.client.CLIENT_ID}`
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
                    <Button style={styles.button}
                        title='le button'>
                    </Button>
                    <Button
                        style={styles.button}
                        title="Home page"
                        onPress={() =>
                            this.props.navigation.navigate('Home')
                        }
                    />
                </View>

                <DisplayImg images={this.state.images}></DisplayImg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#5f5f5f',
    },
    button: {
        borderRadius: 25,
        borderColor: 'black',
        backgroundColor: 'grey',
        textAlign: 'center'
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