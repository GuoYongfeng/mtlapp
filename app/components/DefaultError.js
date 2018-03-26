
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
    StyleSheet, View, Text
} from 'react-native';

export default class DefaultError extends Component {
    render(){
        return (
            <View>
                <Text> 404，您访问的内容走丢了，我们正在紧急帮您找回来。</Text>
            </View>
        )
    }
}
