import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={ styles.view }>
                <Text>这是首页</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 200
    }
})