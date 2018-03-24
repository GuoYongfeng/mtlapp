import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, Image,
    TouchableWithoutFeedback, 
 } from 'react-native';
import PropTypes from 'prop-types'

import px from '../../utils/responsive'

export default class ProductItem extends React.Component {
    render() {
        const { items } = this.props;
        return <View style={productItemStyles.order}>
            {items.map((item, index) => <View style={productItemStyles.expressItem} key={index}>
                <TouchableWithoutFeedback onPress={() => this.props.goDetail}>
                    <View style={[productItemStyles.skuItemBase, productItemStyles.skuItem]}>
                        <Image style={productItemStyles.skuItemImage} source={{ uri: item.prodImg }} />
                        <View style={productItemStyles.skuItemInfo}>
                            <Text allowFontScaling={false} style={productItemStyles.skuItemFont}>{item.goodsName}</Text>
                        </View>
                        <View style={productItemStyles.skuItemPrice}>
                            <Text allowFontScaling={false} style={productItemStyles.skuItemFont}>¥{item.prodPrice}</Text>
                            <Text allowFontScaling={false} style={productItemStyles.skuItemFontSmall}>x{item.prodQty}</Text>
                            {item.refundQty > 0 &&
                                <Text allowFontScaling={false} style={productItemStyles.skuItemFontShow}>已退货:{item.refundQty}</Text>}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            )}
        </View>
    }
}

const productItemStyles = StyleSheet.create({
    order: {
        backgroundColor: '#fff',
        marginTop: px(20)
    },
    expressItem: {
        borderBottomWidth: px(1),
        borderBottomColor: '#e7e7e7'
    },
    skuItemBase: {
        paddingTop: px(20),
        paddingBottom: px(20),
        backgroundColor: '#fbfafc',
        paddingLeft: px(30),
        paddingRight: px(30)
    },
    skuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    skuItemImage: {
        backgroundColor: '#fff',
        width: px(150),
        height: px(150),
        borderRadius: px(10)
    },
    skuItemInfo: {
        width: px(400),
        height: px(150),
    },
    skuItemFont: {
        fontSize: px(26),
        color: '#252426',
        marginBottom: px(10)
    },
    skuItemPrice: {
        alignItems: 'flex-end'
    },
    skuItemFont: {
        fontSize: px(26),
        color: '#252426',
        marginBottom: px(10)
    },
    skuItemFontSmall: {
        color: '#858385',
        fontSize: px(24),
    },
    skuItemFontShow: {
        marginTop: px(10),
        color: '#d0648f',
        fontSize: px(24),
    },
})