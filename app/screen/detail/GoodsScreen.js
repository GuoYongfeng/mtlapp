import React, { Component } from 'react';
import { 
  StyleSheet, View, Text, Image, ScrollView,
  TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types'

import Header from '../../components/Header'
import px from '../../utils/responsive'
// import { pay, isWXAppInstalled } from 'react-native-wechat';
import toast from '../../utils/toast';
import DialogModal from '../../components/DialogModal'
import ProductItem from './ProductItem'

const payType = {
    "weixin": "微信支付"
}

export default class GoodsScreen extends Component {
    constructor(props) {
        super(props);
        if (!this.props.navigation.state.params) this.props.navigation.state.params = {};
        this.state = {
            orderNo: this.props.navigation.state.params.orderNo,
            order: {},
            address: {},
            item: [],
            time: "20小时10分钟10秒"
        };
    }

    render() {
        const { order, item } = this.state;
        return <View style={{ flex: 1 }}>
            {/*头部组件*/}
            <Header title="订单详情" navigation={this.props.navigation} />
            {/**/}
            <ScrollView style={{ flex: 1 }}>
                {/*顶部的信息*/}
                <View style={styles.head}>
                    <View>
                        <Text allowFontScaling={false} style={[styles.headTxt, { fontSize: px(30), marginBottom: px(16) }]}>
                            {order.orderStatusNm}
                        </Text>
                    </View>
                    <View style={styles.rows}>
                        <Text allowFontScaling={false} style={[styles.headTxt, { fontSize: px(24), marginBottom: px(7) }]}>
                            订单编号 {order.orderNo}   </Text>
                        <TouchableWithoutFeedback><View style={styles.copyBtn}>
                            <Text style={styles.copyText} onPress={() => this.copy(order.orderNo)} >复制</Text>
                        </View></TouchableWithoutFeedback>

                    </View>
                    <Text allowFontScaling={false} style={[styles.headTxt, { fontSize: px(24) }]}>
                        下单时间 {order.orderDate}
                    </Text>
                    {order.payPlatform && <Text allowFontScaling={false} style={[styles.headTxt, { fontSize: px(24) }]}>
                        支付方式 {payType[order.payPlatform]}
                    </Text>}
                </View>
                {/*订单地址信息*/}
                <View style={styles.address}>
                    <Image style={styles.addressIcon}
                        source={{ uri: require('../../images/icon-address') }}></Image>
                    <View style={styles.addressInfo}>
                        <Text allowFontScaling={false}
                            style={styles.addressLine1}>{this.state.address.name} {this.state.address.phone}</Text>
                        <Text allowFontScaling={false} style={styles.addressLine2}>
                            {this.state.address.province}-{this.state.address.city}-{this.state.address.district}
                            {this.state.address.detail}
                        </Text>
                    </View>
                </View>
                {/*订单地址下面的样式*/}
                <View style={{ marginBottom: px(20), flexDirection: 'row', width: px(762) }}>
                    {[...Array(3)].map((i, idx) =>
                        <Image key={idx}
                            source={{ uri: require('../../images/bg-address-line') }}
                            style={{ width: px(254), height: px(4) }}
                            resizeMode='contain' />
                    )}
                </View>
                {/*商品信息*/}
                <View style={styles.returnList}>
                    <ProductItem
                        items={item}
                        order={order}
                        goDetail={() => { }}
                        navigation={this.props.navigation} />
                </View>
                {/*商品金额*/}
                <View style={styles.sectionBox}>
                    <View style={styles.section}>
                        <Text allowFontScaling={false} style={{ fontSize: px(26), color: '#858385' }}>商品金额</Text>
                        <Text allowFontScaling={false}
                            style={{ fontSize: px(28), color: '#858385' }}>￥{order.prodAmount}</Text>
                    </View>
                </View>
                {/*商品金额2*/}
                <View style={styles.section2}>
                    <View style={styles.section3}>
                        <View style={styles.section4}>
                            <Text allowFontScaling={false}
                                style={{ fontSize: px(28), color: '#252426' }}>{order.orderStatus == 0 ? '应付金额' : '实付金额'}</Text>
                            <Text allowFontScaling={false} style={{
                                fontSize: px(32),
                                color: '#eb83b2'
                            }}>￥{order.orderStatus == 0 ? order.payableAmount : order.payAmount}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/*订单操作*/}
            <View style={styles.foot}>
                <View style={[styles.footer2, styles.footer]}>
                    <Text allowFontScaling={false} style={{ fontSize: px(20), color: '#858385' }}>付款剩余时间{this.state.time}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text onPress={this.cancel.bind(this)} style={[styles.cBtn, styles.cancelBtn]}
                            allowFontScaling={false}>取消订单</Text>
                        {/*
                          <Text onPress={this.pay.bind(this)} style={[styles.cBtn, styles.payBtn]}
                            allowFontScaling={false}>去支付</Text>
                        */}
                    </View>
                </View>
            </View>
            <DialogModal ref="dialog" />
        </View>
    }

    componentDidMount() {
        //get this.state.orderNo
        let order = {
            orderNo: "No2938447489932",
            orderDate: "2018年1月12日",
            payPlatform: "weixin",
            prodAmount: "200.00",
            orderStatus: 0,
            payableAmount: "200.00",
            payAmount: "150.00",
        }
        let address = {
            phone: "15600022200",
            province: "北京",
            city: "北京",
            district: "朝阳",
            detail: "朝阳大悦城",

        }
        let item = [];
        for (let j = 0; j < 2; j++) {
            item.push({
                id: j,
                prodImg: "http://img4.daling.com/data/files/mobile/2017/11/30/15120349684184.jpg_300x300.jpg",
                goodsName: "MAC/魅可子弹头口红 Dangerous (3g )",
                prodPrice: "126.00",
                prodQty: 1,
                refundQty: j
            })
        }

        this.setState({ order, address, item })
    }
    //复制订单号
    copy(str) {
        Clipboard.setString(str);
        toast('复制成功');
    }
    //支付
    async pay() {
        //请求下单
        //await reqest.post('/saleOrderApp/payOrder.do')
        let isInstalled = await isWXAppInstalled();
        if (!isInstalled) {
            toast('没有安装微信');
            return;
        }
        //调起微信
        // let res = await wxPay(data.paydata);
    }
    //取消订单
    cancel() { 
        this.refs.dialog.alert(null,"是否取消订单?",{
            txt:"放弃操作",
        },{
            txt:"取消订单",click:()=>{
                //request.post()
                toast('取消成功')
            }
        });
    }
}


GoodsScreen.propTypes = {

}


const styles = StyleSheet.create({
    head: {
        backgroundColor: '#eb83b2',
        height: px(180),
        justifyContent: 'center',
        paddingLeft: px(70)
    },
    headTxt: {
        color: '#fff'
    },
    copyBtn: {
        marginLeft: px(10),
        marginTop: px(-5),
        borderWidth: px(1),
        borderColor: '#fff',
        borderRadius: px(2),
        paddingHorizontal: px(20),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: px(5)
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    copyText: {
        color: '#fff',
        fontSize: px(20)
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: px(25),
        paddingBottom: px(25),
        backgroundColor: '#fff'
    },
    addressChange: {
        justifyContent: 'center',
        alignItems: 'center',
        width: px(200),
        height: px(54),
        borderWidth: 1,
        borderColor: '#b2b3b5',
        borderRadius: px(30)
    },
    addressIcon: {
        width: px(25),
        height: px(32),
        marginLeft: px(30),
        marginRight: px(20)
    },
    addressIconArrow: {
        width: px(15),
        height: px(26),
        marginRight: px(30),
        marginLeft: px(20)
    },
    addressHint: {
        color: '#222',
        fontSize: px(28),
        paddingTop: px(20),
        paddingBottom: px(20),
        textAlignVertical: 'center',
        flex: 1,
        includeFontPadding: false
    },
    addressInfo: {
        flex: 1
    },
    addressLine1: {
        fontSize: px(27),
        color: '#222',
        includeFontPadding: false
    },
    addressLine2: {
        marginRight: px(30),
        paddingTop: px(6),
        fontSize: px(27),
        color: '#858385',
        includeFontPadding: false
    },
    returnList: {
        marginBottom: px(20),
        backgroundColor: '#fff',
    },
    sectionBox: {
        paddingTop: px(20),
        paddingBottom: px(20),
        backgroundColor: '#fff',
    },
    section: {
        height: px(45),
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: px(30),
        paddingRight: px(30),
        marginBottom: px(1)
    },
    sectionLabel: {
        fontSize: px(26),
        color: '#252426',
    },
    section2: {
        height: px(80),
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: px(30),
        paddingRight: px(30),
        marginBottom: px(1)
    },
    section3: {
        borderTopWidth: px(1),
        borderTopColor: '#efefef',
        width: px(690), height: px(80)
    },
    section4: {
        height: px(80),
        width: px(690),
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    foot: {
        borderTopColor: '#efefef',
        borderTopWidth: px(1),
        height: px(100),
    },
    footer: {
        height: px(100),
        paddingLeft: px(30),
        paddingRight: px(30),
        backgroundColor: '#fff',
    },
    footer1: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    footer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cBtn: {
        fontSize: px(24),
        height: px(52),
        borderWidth: px(1),
        marginLeft: px(14),
        width: px(150),
        borderRadius: px(6),
        overflow: 'hidden',
        textAlign: 'center',
        paddingTop: px(14)
    },
    cancelBtn: {
        color: '#252426',
        borderColor: '#b2b3b5'
    },
    payBtn: {
        color: '#fff',
        backgroundColor: '#d0648f',
        borderColor: '#d0648f'
    },
})

