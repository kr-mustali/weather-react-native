import React from 'react';
import {Button, Text, View} from 'react-native';

const Login = (props: {navigation: {navigate: (arg0: string) => void}}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30, marginBottom: 10}}>Login Screen</Text>
      <Button
        title="Go to weather screen"
        onPress={() => props.navigation.navigate('Weather')}
      />
    </View>
  );
};

export default Login;
