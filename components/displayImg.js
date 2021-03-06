import React, { Component, useState } from 'react';
import { Text, Image, ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

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
                    <Text style={styles.text} >{data.title}</Text>
                    {data.imgs.img.slice((data.imgs.img.length - 4), data.imgs.img.length) == '.mp4' &&
                        <View style={styles.imgContainer}>
                            <Video
                                ref={(ref) => { this.player = ref }}
                                style={styles.images}
                                source={{ uri: data.imgs.img }}
                                useNativeControls
                                resizeMode="contain"
                                isLooping={false}
                            />

                        </View>
                    }
                    {data.imgs.img.slice((data.imgs.img.length - 4), data.imgs.img.length) != '.mp4' &&
                        <Image
                            style={styles.images} resizeMode={"contain"}
                            source={{ uri: data.imgs.img }}
                            defaultSource={require('../assets/loading.gif')}></Image>
                    }
                </View>
            )
        });

        return (
            // <h1>ezzabu</h1>
            <View>
                <ScrollView>
                    {this.props.images.length > 1 && List}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    images: {
        position: 'relative',
        width: Dimensions.get('window').width - 25,
        height: Dimensions.get('window').height,
    }
});