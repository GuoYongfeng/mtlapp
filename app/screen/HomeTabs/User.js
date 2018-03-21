import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class User extends Component {
    render() {
        return (
            <View style={ styles.view }>
                <Text>User</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 200
    }
})