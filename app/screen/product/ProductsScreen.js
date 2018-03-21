import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Products extends Component {
    render() {
        return (
            <View style={ styles.view }>
                <Text>Products</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 200
    }
})