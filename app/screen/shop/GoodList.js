
import React, { Component} from 'react';
import {
    StyleSheet, View, Text, FlatList,
    TouchableOpacity, Image, TextInput
} from 'react-native';
import Header from '../../components/Header'
import { observer } from "mobx-react"
import px from '../../utils/responsive'
import CartList from './service'

/**
 * 购物车页面的商品列表展示
 */
@observer
export default class GoodList extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.items, {
            selectStatus: false
        });
    }
    render() {
        return <View style={styles.goods_main}>
            <View style={styles.goods_list}>
                {/*选中的按钮*/}
                {this.props.editStatus
                    ? <View style={styles.operatingBtn}>
                        <TouchableOpacity activeOpacity={0.8}
                            style={styles.operatingBtnBox}
                            onPress={this.props.editSelect}>
                            {this.props.editorArr.indexOf(this.props.items.id) < 0 ?
                                <Image source={{ uri: require('../../images/tab-shopping-cart-select') }}
                                    resizeMode='cover'
                                    style={{ width: px(34), height: px(34) }} />
                                : <Image source={{ uri: require('../../images/tab-shopping-cart-selected') }}
                                    resizeMode='cover'
                                    style={{ width: px(34), height: px(34) }} />
                            }
                        </TouchableOpacity>
                    </View>
                    : <View style={styles.operatingBtn}>
                        {this.props.items.limitStock > 0 && this.props.items.can_select == 1
                            ? <TouchableOpacity activeOpacity={0.8}
                                style={styles.operatingBtnBox}
                                onPress={this.props.select}>
                                {this.props.items.select_status == 0
                                    ? <Image source={{ uri: require('../../images/tab-shopping-cart-select') }}
                                        resizeMode='cover'
                                        style={{ width: px(34), height: px(34) }} />
                                    : <Image source={{ uri: require('../../images/tab-shopping-cart-selected') }}
                                        resizeMode='cover'
                                        style={{ width: px(34), height: px(34) }} />
                                }
                            </TouchableOpacity>
                            : null}
                    </View>
                }
                {/*商品图*/}
                <View style={styles.goods_img}>
                    <TouchableOpacity onPress={() => this.props.goDetail()}>
                        <Image source={{ uri: this.props.items.image }}
                            style={styles.img}
                            resizeMode='cover'
                        />
                        {this.props.items.limitStock == 0
                            ? <View style={styles.goods_img_cover}>
                                <Text allowFontScaling={false} style={styles.goods_img_txt}>已抢光</Text>
                            </View>
                            : null
                        }
                        {this.props.items.limitStock > 0 && this.props.items.limitStock < 10
                            ? <View style={styles.goods_limit}>
                                <Text allowFontScaling={false} style={styles.goods_limit_txt}>仅剩{this.props.items.limitStock}件</Text>
                            </View>
                            : null
                        }
                    </TouchableOpacity>
                </View>
                {/*商品名称价格等*/}
                <View style={styles.goods_content}>
                    <TouchableOpacity onPress={() => this.props.goDetail()}>
                        <Text allowFontScaling={false}
                            style={[styles.goods_name, this.props.items.limitStock == 0 || this.props.items.can_select == 0 ? styles.color_disabled : '']}
                            numberOfLines={2}>
                            <Text allowFontScaling={false}>{this.props.items.goodsShowDesc}</Text>
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.operating}>
                        <Text allowFontScaling={false}
                            style={[styles.money, this.props.items.limitStock == 0 || this.props.items.can_select == 0 ? styles.color_disabled : '']}>
                            ¥{this.props.items.salePrice}
                        </Text>
                        <Text allowFontScaling={false}
                            style={[styles.quantity, this.props.items.limitStock == 0 || this.props.items.can_select == 0 ? styles.color_disabled : '']}>
                            x{this.props.items.quantity}
                        </Text>
                        {this.props.items.limitStock > 0 && this.props.items.can_select != 0
                            ? <View style={styles.operatingBox}>
                                {this.props.items.quantity == 1
                                    ? <TouchableOpacity
                                        activeOpacity={0.8}>
                                        <View style={styles.reduce}>
                                            <Text allowFontScaling={false} style={[styles.btn1, styles.color_disabled1]}>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                    : <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={CartList.reduce.bind(null, this.props.items.id, this.props.items.quantity)}>
                                        <View style={styles.reduce}>
                                            <Text allowFontScaling={false} style={[styles.btn1]}>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                <View style={styles.inpBox}>
                                    <TextInput allowFontScaling={false}
                                        style={styles.inp1}
                                        defaultValue={String(this.props.items.quantity)}
                                        keyboardType="numeric"
                                        onChangeText={(txt) => this.props.goodsChangeQty(this.props.items.id, txt)}
                                        autoFocus={false}
                                        underlineColorAndroid="transparent">
                                    </TextInput>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={CartList.plus.bind(null, this.props.items.id, this.props.items.quantity, this.props.items.isBuyLimit, this.props.items.buyLimitNum, this.props.items.buyLimitMsg)}>
                                    <View style={styles.plus}>
                                        <Text allowFontScaling={false} style={[styles.btn1]}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : null
                        }
                    </View>
                </View>
            </View>
        </View>
    }
}



const styles = StyleSheet.create({
    headerRight: {
        color: '#858385',
        paddingVertical: px(17),
        width: px(90),
        justifyContent: 'flex-start',
        textAlign: 'right'
    },
    empty: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_txt: {
        paddingTop: px(300),
        paddingBottom: px(30),
        color: '#858385',
        fontSize: px(26)
    },
    empty_btn: {
        width: px(180),
        height: px(60),
        backgroundColor: '#d0648f',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(6)
    },
    empty_btn_txt: {
        fontSize: px(26),
        color: '#fff'
    },
    goods_main: {
        width: px(750),
        height: px(211),
        borderBottomWidth: px(1),
        borderBottomColor: '#efefef',
    },
    goods_list: {
        width: px(750),
        paddingVertical: px(30),
        paddingRight: px(30),
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    operatingBtn: {
        backgroundColor: '#fff',
        width: px(88),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    operatingBtnBox: {
        width: px(88),
        height: px(80),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    goods_img: {
        width: px(150),
        height: px(150),
        position: 'relative'
    },
    img: {
        width: px(150),
        height: px(150),
        borderRadius: px(10), overflow: 'hidden',
        position: 'relative',
        zIndex: 0
    },
    goods_img_cover: {
        position: 'absolute',
        left: px(20),
        top: px(20),
        zIndex: 1,
        width: px(110),
        height: px(110),
        borderRadius: px(55),
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goods_img_txt: {
        fontSize: px(26),
        color: '#fff'
    },
    goods_limit: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: px(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    goods_limit_txt: {
        color: '#fff',
        fontSize: px(22)
    },
    goods_content: {
        flex: 1,
        paddingLeft: px(23)
    },
    goods_name: {
        color: '#252426',
        height: px(92),
        lineHeight: px(30),
        fontSize: px(26)
    },
    operating: {
        height: px(58),
        flexDirection: 'row',
        alignItems: 'center'
    },
    money: {
        color: '#f25ca0',
        fontSize: px(28),
        marginRight: px(20)
    },
    quantity: {
        flex: 1,
        color: '#666',
        fontSize: px(28)
    },
    operatingBox: {
        width: px(210),
        height: px(68),
        borderColor: '#ddd',
        borderWidth: px(1),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: px(10),
        overflow: 'hidden'
    },
    reduce: {
        width: px(68),
        height: px(68),
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: px(1),
        borderRightColor: '#ddd',
    },
    plus: {
        width: px(68),
        height: px(68),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn1: {
        fontSize: px(36),
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    inpBox: {
        flex: 1,
        borderRightWidth: px(1),
        borderRightColor: '#ddd',
    },
    inp1: {
        flex: 1,
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: 0,
        fontSize: px(28)
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        height: px(98),
        borderTopWidth: px(1),
        borderTopColor: '#efefef',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        height: px(98),
        backgroundColor: '#fff'
    },
    footerContentTxt0: {
        flex: 1,
        textAlign: 'left'
    },
    footerContentTxt1: {
        fontSize: px(28),
        color: '#252426'
    },
    footerContentTxt2: {
        fontSize: px(38),
        color: '#d0648f',
        marginRight: px(56),
    },
    submit: {
        width: px(250),
        height: px(98),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d0648f'
    },
    submitDisabled: {
        backgroundColor: '#b2b3b5'
    },
    submit_txt: {
        fontSize: px(34),
        color: '#fff'
    },
    delete: {
        width: px(140),
        height: px(60),
        borderColor: '#d0648f',
        borderWidth: px(1),
        borderRadius: px(8),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: px(30)
    },
    delete_txt: {
        fontSize: px(26),
        color: '#d0648f'
    },
})