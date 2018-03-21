import React, { Component } from 'react';
import {
    StyleSheet, View, Text, Image, Platform,
    TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import Swiper from 'react-native-swiper'

import px from '../../utils/responsive'

/**
 * 顶部搜索条组件
 */
export default class SearchHeader extends Component {
    render() {
        return <View style={styleSearchBar.header}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => this.shareTo()}>
                <View style={styleSearchBar.back}>
                    <Image source={{ uri: 'http://img.cdn.daling.com/data/files/mobile/img/dalingjia.jpg' }}
                        style={styleSearchBar.shopLogo} />
                    <Image style={styleSearchBar.headerShareImg}
                        source={{ uri: require("../../images/icon-index-share") }} />
                </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => this.goSearch()}>
                <View style={[styleSearchBar.headerSearchBar, {
                    backgroundColor: '#fff'
                }]}>
                    <Image style={styleSearchBar.headerSearchImg}
                        source={{ uri: require("../../images/icon-search-gray") }} />
                    <Text allowFontScaling={false} style={styleSearchBar.headerSearchInput}>在<Text allowFontScaling={false} style={{ color: '#d0648f' }}>安心淘</Text>中搜索</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    }
    //跳转搜索页
    goSearch() {
        this.props.navigation.navigate('SearchPage', {});
    }
    //TODO:分享
    shareTo() {
        this.props.share && this.props.share();
    }
}

const styleSearchBar = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingLeft: px(24),
        paddingRight: px(30),
        paddingTop: Platform.OS === "ios" ? px(40) : px(10),
        height: Platform.OS === "ios" ? px(116) : px(76),
    },
    back: {
        width: px(70),
        height: px(60),
    },
    shopLogo: {
        width: px(56),
        height: px(56),
        borderRadius: px(28),
        overflow: 'hidden',
        borderWidth: px(2),
        borderColor: "#fff"
    },
    headerShareImg: {
        width: px(28),
        height: px(28),
        borderRadius: px(14),
        borderWidth: px(1),
        borderColor: '#efefef',
        overflow: 'hidden',
        position: 'absolute',
        left: px(40),
        top: px(30)
    },
    headerSearchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: px(35),
        justifyContent: "center",
        height: px(56),
        overflow: 'hidden',
        marginLeft: px(10)
    },
    headerSearchImg: {
        marginLeft: px(16),
        width: px(28),
        height: px(28),
        marginRight: px(8)
    },
    headerSearchInput: {
        width: px(570),
        color: "#b2b3b5",
        fontSize: px(26),
    },
    modalHead: {
        alignItems: 'center',
        flexDirection: 'column',
        height: px(169),
        paddingLeft: px(145),
        paddingRight: px(145),
        paddingTop: px(53)
    },
    modalTxt1: {
        fontSize: px(42),
        color: '#d0648f',
        fontWeight: '900'
    },
    modalTxt2: {
        fontSize: px(26),
        color: '#858385',
        textAlign: 'center',
        marginTop: px(10),
        lineHeight: px(30)
    }
});