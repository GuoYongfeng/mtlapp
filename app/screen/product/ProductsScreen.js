import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class Products extends Component {
    render() {
        return (
            <View style={ styles.view }>
                <Text>Products</Text>
                {/* 
                    <Image source={require('../../images/tinper.png')} />
                    <Image source={{uri: 'http://tinper.org/assets/images/tinperlogos32.png'}} />
                */}
                
                <Image source={{uri: 'http://tinper.org/assets/images/tinperlogos32.png'}}
                    style={{width:200,height:100}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 200
    }
})