import React, { Component, useState } from 'react';
import { Text, ImageBackground, Button, View, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import env from '../variables';


export default class home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imagesDetails: [],
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
            if (element.imagesDetails) {
                element.imagesDetails.forEach(image => {
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
                imgs: img,
                title: element.title,
                date: element.datetime
            };

            this.setState({
                imagesDetails: [...this.state.imagesDetails, imgData],
            });
        })
    };

    displayImg() {
        const imagesDetails = this.state.imagesDetails.map((data, i) => {
            return (
                <View key={i}>
                    <Text >{data.imgs.img.description}</Text>
                    <ImageBackground style={styles.imagesDetails} source={data.imgs.img} >
                    </ImageBackground>
                </View>
            )
        })

        const List = this.state.imagesDetails.map((data, i) => {
            return (
                <View key={i}>
                    <View style={styles.imgContainer}>
                        <Text >{data.title}</Text>
                        {imagesDetails}
                        {/* <ImageBackground style={styles.imagesDetails} source={data.imgs.img} >
                            {data.imgs.img} 
                        </ImageBackground>
                        {imgList} */}
                    </View>
                    {/* <Image styles={styles.imagesDetails}>{data.imgs.img}</Image> */}
                </View>
            )
        });
        return List;
    }

    render() {
        console.log(this.state.imagesDetails)
        const List = this.displayImg();

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
                {List}
                {/* <View>
                {imagesDetails.map((title) => <Text>{title}</Text>)}
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
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 3,
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
    imagesDetails: {
        position: 'relative',
        width: 50,
        height: 75,
    }
});