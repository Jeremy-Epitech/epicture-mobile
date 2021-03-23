import React, { Component, useState } from 'react';
import { Text, ImageBackground, Button, View, StyleSheet, TextInput } from 'react-native';


export default class DisplayImg extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        // console.log(this.state.images)
        const List = this.props.images.map((data, i) => {
            return (
                <View key={i}>
                    {data.imgs.img.slice((data.imgs.img.length - 4), data.imgs.img.length) != '.mp4' &&
                        <View style={styles.imgContainer}>
                            <Text style={styles.text} >{data.title}</Text>
                            <ImageBackground style={styles.images} source={data.imgs.img} ></ImageBackground>
                        </View>
                    }
                </View>
            )
        });

        return (
            // <h1>ezzabu</h1>
            <View style={styles.container}>
                {this.props.images.length > 1 && List}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 3,
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    images: {
        position: 'relative',
        width: 50,
        height: 75,
    }
});