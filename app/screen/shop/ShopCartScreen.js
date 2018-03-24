import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import Header from '../../components/Header'

export default class ShopCart extends Component {
    render() {
        return (
            <View>
                <Header title="订单管理" navigation={this.props.navigation} />
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