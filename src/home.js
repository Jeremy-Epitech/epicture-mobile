import React, { Component, useState } from 'react';
import { Text, Form, Button, View, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import env from '../variables';


export default class home extends Component {
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

    pushImgs(res) {
        res.forEach(element => {
            let img;
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
            const imgData = {
                title: element.title,
                imgs: img,
                date: element.datetime
            };
            this.state.images.push(imgData)
        })
    };

    render() {
        const imgList = this.state.images.map((title) => {
            return (
                <View><Text>{title}</Text></View>
            )
        })
        return (
            // <h1>ezzabu</h1>
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Tag of imgur"
                        style={styles.inputext}
                        onSubmit={event => callImgur(event.target.value)}
                    />
                </View>
                {imgList}
                {/* <View>
                {images.map((title) => <Text>{title}</Text>)}
            </View> */}
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
    input: {
        // width: 200,
        // height: 44,
        // padding: 3,
        textAlign: 'center',
        // borderWidth: 1,
        // borderColor: 'black',
        // marginBottom: 10,
        maringTop: 5,
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
});