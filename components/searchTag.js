import React, { Component, useState } from 'react';
import { Text, ImageBackground, Button, View, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import env from '../variables';


export default class SearchTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
        };
    }

    componentDidMount() {
        this.callImgur();
    }


    async callImgur() {
        await axios.get(`${env.dev.apiUrl}/3/gallery/hot/viral`, {
            headers: {
                Authorization: `Client-ID ${env.client.CLIENT_ID}`
            }
        }).then(response => {
            this.pushImgs(response.data.data);
        }).catch(err => {
            console.log(err)
        });
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Tag of imgur"
                        style={styles.inputext}
                        onSubmit={event => callImgur(event.target.value)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5f5f5f',
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 3,
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