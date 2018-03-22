import React, { PureComponent } from 'react';
import {
    StyleSheet, View, Text, Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper'
import px from '../../utils/responsive'

export default class GoodItem extends PureComponent {
    constructor(props){
        super(props)
    }
    //跳转商品详情页
    getDetail() {
        this.props.navigation.navigate('Goods', {
            id: this.props.goods.sku ? '' : this.props.goods.id,
            sku: this.props.goods.sku
        });
    }
    render() {
        const { index, goods } = this.props
        return (
            <View style={goodStyles.goodsBox}>
                <View style={[goodStyles.goods, {
                    borderTopLeftRadius: index % 2 === 0 ? px(0) : px(12),
                    borderTopRightRadius: index % 2 === 0 ? px(12) : px(0),
                    borderBottomLeftRadius: index % 2 === 0 ? px(0) : px(12),
                    borderBottomRightRadius: index % 2 === 0 ? px(12) : px(0),
                }]}>
                    <View style={[goodStyles.goods_]}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            key={goods.id}
                            onPress={() => this.getDetail()}>
                            <View>
                                <Image
                                    resizeMethod="scale"
                                    source={{ uri: goods.specImage1 }}
                                    style={goodStyles.goodsCover}
                                />
                                {this.props.goods.limitStock == 0
                                    ? <View style={goodStyles.goods_img_cover}>
                                        <Text allowFontScaling={false} style={goodStyles.goods_img_txt}>抢光了</Text>
                                    </View>
                                    : null
                                }
                                <View style={goodStyles.labels}>
                                    {goods.labelList && goods.labelList.length > 0 && goods.labelList.map((item) =>
                                        <Image key={item.labelId} resizeMode="contain" resizeMethod="scale"
                                            style={[goodStyles.labelImg, { width: px(item.width), height: px(item.height) }]}
                                            source={{ uri: item.labelLogo }} />
                                    )}
                                </View>
                            </View>
                            <View style={goodStyles.sessionName}>
                                <View style={goodStyles.goodsShowNameBox}>
                                    <Text allowFontScaling={false}
                                        numberOfLines={1}
                                        style={goodStyles.goodsShowName}>
                                        {goods.goodsShowName}
                                    </Text>
                                </View>
                                <View style={goodStyles.goodsShowDesc_}>
                                    {
                                        (goods.isInBond == 1 || goods.isForeignSupply == 2) &&
                                        <View
                                            style={[goodStyles.flag_, goods.isInBond == 1 ? goodStyles.flagB : goodStyles.flagZ]}>
                                            <Text
                                                style={goodStyles.flagTxt}
                                                allowFontScaling={false}>
                                                {goods.isInBond == 1 ? '保税' : goods.isForeignSupply == 2 ? '直邮' : ''}
                                            </Text>
                                        </View>
                                    }
                                    <Text style={goodStyles.goodsShowDesc} allowFontScaling={false}
                                        numberOfLines={2}>
                                        {
                                            (goods.isInBond == 1 || goods.isForeignSupply == 2) &&
                                            <Text style={goodStyles.flag}
                                                allowFontScaling={false}>{goods.isInBond == 1 ? '保税' : '直邮'}    </Text>
                                        }
                                        {goods.goodsShowDesc}
                                    </Text>
                                </View>
                            </View>

                            <View style={[goodStyles.sessionNoName, goodStyles.sessionNoNameBig, { alignItems: 'center' }]}>
                                <View style={[goodStyles.sessionPrice, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                                    <Text allowFontScaling={false}
                                        style={goodStyles.salePrice}>
                                        ￥
                                            <Text allowFontScaling={false}
                                            style={goodStyles.salePrice_}>
                                            {spliceNum(goods.salePrice)[0]}
                                        </Text>.{spliceNum(goods.salePrice)[1]}
                                    </Text>
                                    <Text allowFontScaling={false}
                                        style={goodStyles.marketPrice}>
                                        ￥{goods.marketPrice}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={goodStyles.cartCBorder}
                                    activeOpacity={0.8}
                                    onPress={() => this.props.addCart(goods.id, 1)}>
                                    <View style={goodStyles.cartC}>
                                        <Image
                                            resizeMode="cover"
                                            source={{ uri: require('../../images/icon-indexCart') }}
                                            style={goodStyles.cart} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

// 价格，整数小数字体大小不一样
function spliceNum(price) {
    let p_int = (price + '').split('.')[0]
    let p_float = ((price * 1 - p_int * 1).toFixed(2) + '').split('.')[1]
    return [p_int, p_float]
}

const goodStyles = StyleSheet.create({
    goodsBox: {},
    goods: {
        width: px(367),
        marginRight: px(16),
        marginBottom: px(16),
        overflow: 'hidden',
    },
    goods_: {
        width: px(367),
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: px(24)
    },
    goodsCover: {
        width: px(367),
        height: px(367),
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden'
    },
    goodsCoverBig: {
        width: px(710),
        height: px(440),
        overflow: 'hidden',
        borderRadius: px(12)
    },
    imageBox: {
        width: px(710),
        height: px(440),
        position: 'relative',
        zIndex: 0,
        borderRadius: px(12),
        overflow: 'hidden'
    },
    goods_img_cover: {
        position: 'absolute',
        left: px(94),
        top: px(94),
        zIndex: 1,
        width: px(180),
        height: px(180),
        borderRadius: px(90),
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goods_img_coverBig: {
        position: 'absolute',
        left: px(285),
        top: px(130),
        zIndex: 1,
        width: px(180),
        height: px(180),
        borderRadius: px(90),
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goods_img_txt: {
        fontSize: px(36),
        color: '#fff'
    },
    labels: {
        position: 'absolute',
        top: px(8),
        left: px(8),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    labelImg: {
        width: px(60),
        height: px(60),
        marginRight: px(8)
    },
    sessionName: {
        paddingLeft: px(20),
        paddingRight: px(20),
        paddingTop: px(20),
        backgroundColor: '#fff'
    },
    goodsShowNameBox: {
        height: px(32),
        marginBottom: px(10)
    },
    goodsShowName: {
        fontSize: px(28)
    },
    goodsShowDesc_: {
        height: px(85),
        position: 'relative'
    },
    flag_: {
        position: 'absolute',
        zIndex: 1,
        paddingLeft: px(5),
        paddingRight: px(5),
        backgroundColor: '#000',
        height: px(24),
        borderRadius: px(4),
        overflow: 'hidden',
        marginTop: px(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    flagB: {
        backgroundColor: '#56beec',
    },
    flagZ: {
        backgroundColor: '#6cd972',
    },
    flagTxt: {
        color: '#fff',
        fontSize: px(18)
    },
    goodsShowDesc: {
        fontSize: px(24),
        color: '#858385'
    },
    flag: {
        fontSize: px(18)
    },
    salePrice: {
        fontSize: px(26),
        color: "#d0648f"
    },
    salePrice_: {
        fontSize: px(38)
    },
    sessionPrice: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#fff'
    },
    marketPrice: {
        color: '#858385',
        fontSize: px(24),
        marginLeft: px(20),
        marginBottom: px(5),
        textDecorationLine: 'line-through'
    },
    sessionNoName: {
        paddingLeft: px(20),
        paddingRight: px(20),
        backgroundColor: '#fff'
    },
    sessionNoNameBig: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    operator: {
        width: px(320),
        height: px(52),
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    operatorBg: {
        width: px(320),
        height: px(52),
        position: 'absolute',
        left: 0
    },
    shareBorder: {
        width: px(252),
        height: px(50),
        paddingLeft: px(18),
        paddingRight: px(18),
    },
    share_: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    goodsActionShareBtn: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontSize: px(24),
    },
    goodsShareIcon: {
        width: px(30),
        height: px(32),
        marginRight: px(8)
    },
    cartBorder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartC: {
        width: px(60),
        height: px(60),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cartCBorder: {
        overflow: 'hidden',
        borderRadius: px(30),
    },
    cart: {
        overflow: 'hidden',
        width: px(39),
        height: px(33)
    },
});
