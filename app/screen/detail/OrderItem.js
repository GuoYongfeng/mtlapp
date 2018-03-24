import React, { Component } from 'react';
import { 
  StyleSheet, View, Text, Image, ScrollView,
  TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import px from '../../utils/responsive'
import ProductItem from './ProductItem'

/**
 * 订单列表的一行内容
 */
export default class OrderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { order } = this.props;
        return <View style={orderStyles.order}>
            <View>
                {/*订单编号/状态*/}
                <TouchableWithoutFeedback onPress={() => this.goDetail(order.orderNo)}>
                    <View style={orderStyles.orderHeader}>
                        <Text allowFontScaling={false} style={orderStyles.orderNo}>订单编号 {order.orderNo} </Text>
                        <Text allowFontScaling={false} style={orderStyles.orderStatus}>{order.orderStatusNm}</Text>
                    </View>
                </TouchableWithoutFeedback>
                {/*商品列表*/}
                <ProductItem
                    items={order.expressList}
                    order={order}
                    goDetail={() => this.goDetail(order.orderNo)}
                    navigation={this.props.navigation} />
            </View>
            {/*订单金额/操作*/}
            <TouchableWithoutFeedback onPress={() => this.goDetail(order.orderNo)}>
                <View style={orderStyles.orderFooter}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text allowFontScaling={false} style={orderStyles.orderPay}>
                            {order.orderStatus == 0 ? `应付金额￥${order.payableAmount}` : `实付金额￥${order.payAmount}`}
                        </Text>
                        {order.orderStatusNm == '待支付' &&
                            <Text allowFontScaling={false} style={{ fontSize: px(20), color: '#858385' }}>
                                付款剩余时间60:00:00
                            </Text>
                        }
                    </View>
                    {order.orderStatusNm == '待支付' &&
                        <View style={{ flexDirection: 'row' }}>
                            <Text onPress={this.cancel} style={[orderStyles.cBtn, orderStyles.cancelBtn]}
                                allowFontScaling={false}>取消订单</Text>
                            <Text onPress={this.pay} style={[orderStyles.cBtn, orderStyles.payBtn]}
                                allowFontScaling={false}>去支付</Text>
                        </View>}
                    {order.orderStatusNm == '已完成' &&
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#858385', fontSize: px(24) }}
                                allowFontScaling={false}>{`还有7天佣金可到账`}</Text>
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>
    }
    goDetail(orderNo) {
        this.props.navigation.navigate('OrderDetail', {
            orderNo: orderNo
        });
    }
}

const orderStyles = StyleSheet.create({
    order: {
        backgroundColor: '#fff',
        marginTop: px(20)
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: px(20),
        paddingBottom: px(20),
        paddingLeft: px(30),
        paddingRight: px(30),
        borderBottomWidth: px(1),
        borderColor: '#efefef'
    },
    orderNo: {
        fontSize: px(28),
        color: '#222'
    },
    orderStatus: {
        fontSize: px(26),
    },
    ,
    orderFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: px(80),
        paddingLeft: px(30),
        paddingRight: px(30)
    },
    orderPay: {
        fontSize: px(26),
        color: '#222'
    },
    cBtn: {
        fontSize: px(24),
        height: px(48),
        borderWidth: px(1),
        marginLeft: px(14),
        width: px(128),
        borderRadius: px(6),
        overflow: 'hidden',
        textAlign: 'center',
        paddingTop: px(11)
    },
    cancelBtn: {
        color: '#252426',
        borderColor: '#b2b3b5'
    },
    payBtn: {
        color: '#fff',
        backgroundColor: '#d0648f',
        borderColor: '#d0648f'
    }
})