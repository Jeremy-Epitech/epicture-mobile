import Constants from 'expo-constants';

// export const prodUrl = "https://someapp.herokuapp.com";

const ENV = {
    dev: {
        apiUrl: 'https://api.imgur.com'
    },
    client: {
        CLIENT_ID: 'acc0fb8e45ded71',
        CLIENT_SECRET: '8877154e2e927ed6fc5ae02a5243a7c1b90d5b47'
    },
};

function getEnvVars(env = "") {
    if (env === null || env === undefined || env === "") return ENV;
    if (env.indexOf("dev") !== -1) return ENV.dev;
    if (env.indexOf("client") !== -1) return ENV.client;
}

export default getEnvVars(Constants.manifest.releaseChannel);