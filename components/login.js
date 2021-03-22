import React from 'react';
import * as AuthSession from 'expo-auth-session';
import { Text, View, TouchableOpacity } from 'react-native';
import imgur from '../constants/imgur';

export default class Login extends React.Component {
    // redirectUrl = "localhost:19006"
    token = "559d66228b87e3babd22192d214b8a6cf5219f73";
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };
    }

    login = async () => {
        console.log('ok');

        if (this.state.user == null) {
            let redirectUrl = 'https://google.com/';
            const resp = (await AuthSession.startAsync({
                authUrl: `https://api.imgur.com/oauth2/authorize?response_type=token&client_id=${imgur.client.CLIENT_ID}`,
                returnUrl: redirectUrl
            })).params;
            console.log(resp)
        } else {
            console.log('already logged as ' + this.state.user.account_username);
        }

        console.log("user:", this.state.user)
    }

    render() {
        console.log("rendererndnenfenf")
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Epicture</Text>
                <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
                    <Text style={styles.loginText}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('Home')
                    }>
                    <Text>Continuer sans se connecter</Text>
                </TouchableOpacity>
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