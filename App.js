import { env } from 'node:process';
import React, { useState } from 'react';
import { StyleSheet, Input, View, Form } from 'react-native';

const App = () => {
  const [imgur, setImgur] = useState([]);

  async function callImgur(tag) {
    console.log(tag)
    const uri = `https://api.imgur.com/3/gallery/t/${tag}`;
    await axios.get(uri, {
      headers: {
        Authorization: `ClientID${env.CLIENT_ID}`
      }
    }).then((response) => {
      console.log(response)
    });
  }

  return (
    // <h1>test ta mère</h1>
    <View style={styles.container}>
      <Form>
        <Input
          placeholder="Tag of imgur"
          // style={styles.input}
          onSubmit={event => callImgur(event.target.value)}
        />
      </Form>
      {/* <View>
      {imgur.map((title) => <Text>{title}</Text>)}
    </View> */}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
