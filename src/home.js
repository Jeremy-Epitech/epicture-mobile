import React, { Component } from 'react';
import { Text, Alert, Button, View, StyleSheet, TextInput } from 'react-native';
import { env } from 'yargs';

export default class home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgur: '',
        };
    }

    go = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === true) {
            alert('valid');
        }
        else {
            alert();
        }

    }

    async callImgur(tag) {
        console.log(tag)
        const uri = `https://api.imgur.com/3/gallery/t/${tag}`;
        await axios.get(uri, {
            headers: {
                Authorization: `ClientID${ENV.CLIENT_ID}`
            }
        }).then((response) => {
            console.log(response)
        });
    }

    render() {
        return (
            <h1>ezzabu</h1>
            // <View style={styles.container}>
            //     <View style={styles.inputContainer}>
            //         <Form>
            //             <Input
            //                 placeholder="Tag of imgur"
            //                 style={styles.input}
            //                 onSubmit={event => callImgur(event.target.value)}
            //             />
            //         </Form>
            //     </View>
            //     <View>
            //         {imgur.map((title) => <Text>{title}</Text>)}
            //     </View>
            // </View>
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
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    inputext: {
        width: 200,
        height: 44,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
});