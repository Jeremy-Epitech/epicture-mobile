import React from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseURl } from './function';
import imgur from '../constants/imgur';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        this.getData('access_token');
    }

    storeData = async (item, value) => {
        try {
            await AsyncStorage.setItem(item, value)
        } catch (e) {
            // saving error
        }
    }

    getData = async (item) => {
        try {
            const value = await AsyncStorage.getItem(item)
            if (value !== null) {
                // value previously stored
                console.log(`la value: ${value}`)
                this.setState({
                    user: { access_token: value, isLogged: true }
                })
            }
        } catch (e) {
            // error reading value
        }
    }

    removeData = async (item) => {
        try {
            await AsyncStorage.removeItem(item)
        } catch (e) {

        }
    }

    login = async () => {
        if (this.state.user == null) {
            await Linking.openURL(`https://api.imgur.com/oauth2/authorize?response_type=token&client_id=${imgur.client.CLIENT_ID}`)
            this.setStorage();
        } else {
            console.log('already logged as ' + this.state.user.account_username);
        }
    }

    setStorage() {
        const url = window.location.href;

        const { access_token, account_id, account_username, expires_in, refresh_token, token_type } = parseURl(url);
        this.setState({
            user: { access_token, account_id, account_username, expires_in, refresh_token, token_type }
        });
        console.log(access_token)

        this.storeData('access_token', access_token);
    }

    loginPage() {
        if (this.state.user == null) {
            return <View>
                <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
                    <Text style={styles.loginText}>Connect with imgur</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('Home')
                    }>
                    <Text style={{ margin: 15 }}>Continue without connexion</Text>
                </TouchableOpacity>
            </View>
        } else {
            return <View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() =>
                        this.props.navigation.navigate('Home')
                    }>
                    <Text style={styles.loginText}>Home page</Text>
                </TouchableOpacity>
            </View>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Epicture</Text>
                {this.loginPage()}

            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#007c91',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#00b5ad",
        marginBottom: 40
    },
    loginBtn: {
        // width: "80%",
        backgroundColor: "#00b5ad",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        padding: 20
    },
    loginText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    }
}