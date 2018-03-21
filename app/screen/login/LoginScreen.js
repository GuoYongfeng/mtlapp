import React, { Component } from 'react';
import { View, Text } from 'react-native';

class LoginScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>欢迎登陆</Text>
      </View>
    );
  }
}

export default LoginScreen