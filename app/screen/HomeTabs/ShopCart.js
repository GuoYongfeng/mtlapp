import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class ShopCart extends Component {
    render() {
        return (
            <View style={ styles.view }>
                <Text>ShopCart</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 200
    }
})