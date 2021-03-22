import React from 'react';
import * as AuthSession from 'expo-auth-session';
import { Text, View, TouchableOpacity } from 'react-native';

export default class Login extends React.Component {
    apiKey = '839f1758e3815fb'
    // redirectUrl = "localhost:19006"

    state = {
        user: {},
    }

    login = async () => {
        console.log('ok');
        let user = null;

        if (!user) {
            let redirectUrl = 'https://google.com/';
            user = (await AuthSession.startAsync({
                authUrl: `https://api.imgur.com/oauth2/authorize?response_type=token&client_id=${this.apiKey}`,
                returnUrl: redirectUrl
            })).params;
        } else {
            console.log('already logged as ' + user.account_username);
        }

        console.log("user:", user)
    }

    render() {
        console.log("rendererndnenfenf")
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Epicture</Text>
                <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
                    <Text style={styles.loginText}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.loginText}>Continuer sans se connecter</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        color: "black"
    }
}