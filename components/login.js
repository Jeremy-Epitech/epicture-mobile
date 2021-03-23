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
        console.log(this.getData());
    }

    storeData = async (value) => {
        try {
            await AsyncStorage.setItem('token', value)
        } catch (e) {
            // saving error
        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }

    login = async () => {
        console.log('ok');

        if (this.state.user == null) {
            const res = await Linking.openURL(`https://api.imgur.com/oauth2/authorize?response_type=token&client_id=${imgur.client.CLIENT_ID}`)
            const url = window.location.href;

            const { access_token, account_id, account_username, expires_in, refresh_token, token_type } = parseURl(url);
            this.setState({
                user: { access_token, account_id, account_username, expires_in, refresh_token, token_type }
            });

            this.storeData(access_token);

        } else {
            console.log('already logged as ' + this.state.user.account_username);
        }
    }

    isLogged() {
        if (this.state.user == null) {
            return false
        } else {
            return true
        }
    }

    loginPage() {
        if (!this.isLogged()) {
            return <View>
                <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
                    <Text style={styles.loginText}>Connect with imgur</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('Home')
                    }>
                    <Text>Continue without connexion</Text>
                </TouchableOpacity>
            </View>
        } else {
            return <View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() =>
                        this.props.navigation.navigate('Home')
                    }>
                    <Text>Home page</Text>
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
        width: "80%",
        backgroundColor: "#00b5ad",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    }
}