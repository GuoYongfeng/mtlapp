import React, { Component } from 'react';
import {
    StyleSheet, View, Text, TouchableWithoutFeedback,
    TouchableOpacity, ImageBackground, Image,
    ScrollView, Platform, Modal, TextInput
} from 'react-native';

import { log, logWarm, logErr } from '../../utils/log'
import request from '../../utils/request'
import px from '../../utils/responsive'
import toast from '../../utils/toast'

import Header from '../../components/Header'
import ImgsModal from '../../components/ImgsModal'

/**
 * GoodsScreen 商品详情页
 */
export default class GoodsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            labelList: [],
            goodsShowName: "",
            goodsShowDesc: "",
            salePrice: 0,
            discount: '10',
            marketPrice: 0,
            isInBond: 0,
            isForeignSupply: 0,
            taxation: 0,
            detail: {
                mobile_detail: { list: [] }
            },
            priceBoxStatus: false,
            smallImage: '',
            buyNumber: 1,
            imgs:[]
        };
        this.id = this.props.navigation.state.params.id;
        this.sku = this.props.navigation.state.params.sku;
    }
    render() {
        return <View style={{ flex: 1 }}>
            <Header navigation={this.props.navigation} title="详情页" />
            <ScrollView>
                <View style={styles.goodsInfo}>
                    {/*顶部图片*/}
                    {this.state.image ? <Image style={styles.coverImage}
                        source={{
                            uri: this.state.image
                        }}
                        resizeMode="cover"
                        resizeMethod="resize" /> : null}
                    {/*图片上的标签*/}
                    <View style={styles.labels}>
                        {this.state.labelList.map((item) =>
                            <Image key={item.labelId} style={[styles.labelImg, { width: px(item.width), height: px(item.height) }]}
                                resizeMode="cover"
                                resizeMethod="resize"
                                source={{
                                    uri: item.labelLogo
                                }} />)}
                    </View>
                    {/*商品的标题*/}
                    <View style={styles.goodsWrap}>
                        <Text allowFontScaling={false} style={styles.goodsWrapTxt}>
                            {this.state.goodsShowName} {this.state.goodsShowDesc}
                        </Text>
                    </View>
                    {/*商品价格*/}
                    <View style={styles.goodsPrices}>
                        <View style={[styles.priceInfo]}>
                            <Text allowFontScaling={false} style={styles.price1}>
                                ￥<Text allowFontScaling={false} style={{ fontSize: px(50) }}>{Number(this.state.salePrice).toFixed(2)}</Text>
                            </Text>
                            <View style={styles.price2}>
                                <Text allowFontScaling={false} style={{ fontSize: px(22), includeFontPadding: false, color: '#eb83b2' }}>
                                    {this.state.discount}折
                                        </Text>
                            </View>
                            <Text allowFontScaling={false} style={{ fontSize: px(22), color: '#7a787a', textDecorationLine: 'line-through' }}>
                                ￥{Number(this.state.marketPrice).toFixed(2)}
                            </Text>
                        </View>
                        {
                            (this.state.isInBond == 1 || this.state.isForeignSupply == 2) &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: px(22), color: '#7a787a', marginLeft: px(12) }}>
                                        税费￥{Number(this.state.taxation).toFixed(2)}
                                    </Text>
                                </View>
                                <Text allowFontScaling={false}
                                    style={styles.gou}>海购政策</Text>
                            </View>
                        }
                    </View>
                    {/*三个标签,做展示用的*/}
                    <View style={styles.promotes}>
                        <View style={styles.promotesBox}>
                            <Image
                                style={styles.promoteIcon}
                                source={{ uri: require('../../images/icon-promoteRed') }}>
                            </Image>
                            <Text allowFontScaling={false} style={styles.promoteTxt}>一件包邮</Text>
                        </View>
                        <View style={styles.promotesBox}>
                            <Image
                                style={styles.promoteIcon}
                                source={{ uri: require('../../images/icon-promoteRed') }}>
                            </Image>
                            <Text allowFontScaling={false} style={styles.promoteTxt}>正品保证</Text>
                        </View>
                        <View style={styles.promotesBox}>
                            <Image
                                style={styles.promoteIcon}
                                source={{ uri: require('../../images/icon-promoteRed') }}>
                            </Image>
                            <Text allowFontScaling={false} style={styles.promoteTxt}>极速发货</Text>
                        </View>
                    </View>
                    {/*图文详情的顶部*/}
                    <View style={styles.detailHead_}>
                        <Text allowFontScaling={false} style={styles.detailHead}>图文详情</Text>
                    </View>
                    {/*图文详情的内容*/}
                    <View style={styles.detail}>
                        {/*图文中的规格*/}
                        {this.state.detail['more_property'] && this.state.detail['more_property'].length > 0 &&
                            <View style={{ marginBottom: px(35) }}>
                                <Image
                                    style={{ width: px(690), height: px(10), marginBottom: px(5), marginLeft: px(30) }}
                                    source={{ uri: require('../../images/spu_line') }} />
                                <View style={styles.spu_detailContentHeadBox_}>
                                    <View style={styles.spu_detailContentHeadBox}>
                                        <Text allowFontScaling={false} style={[styles.detailContentHead, styles.spu_detailContentHead]}>产品规格</Text>
                                        {this.state.detail['more_property'].map((prop, index) =>
                                            <View key={index} style={[styles.spu_detailPropBox, { backgroundColor: index % 2 ? '#faf8fb' : '#fff' }]}>
                                                <View style={styles.detailProp}>
                                                    <Text allowFontScaling={false} style={[styles.detailPropKey, { color: '#858385' }]}>{prop.key}</Text>
                                                    <Text allowFontScaling={false} style={styles.detailPropValue}>{prop.value}</Text>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        }
                        {/*图片列表*/}
                        {
                            this.state.detail.mobile_detail.list.map((img, index) =>
                                <TouchableWithoutFeedback key={index} onPress={()=>this.openBigImg(img.image)} ><Image
                                    style={{ width: px(img.width), height: px(img.height) }}
                                    source={{
                                        uri: img.image
                                    }}
                                    resizeMode="cover"
                                    resizeMethod={Platform.OS == 'ios' ? "resize" : "auto"}
                                >
                                </Image></TouchableWithoutFeedback>)
                        }
                    </View>
                    {/*保税商品的额外说明*/}
                    {
                        (this.state.isInBond == 1 || this.state.isForeignSupply == 2) &&
                        <View style={styles.consumer}>
                            <View style={styles.consumerBox}>
                                <View style={styles.consumer_head}>
                                    <Image
                                        source={{ uri: require('../../images/icon-consumer') }}
                                        style={{ width: px(80), height: px(1) }}>
                                    </Image>
                                    <Text allowFontScaling={false} style={styles.collectionHeadTxt}>消费者告知书</Text>
                                    <Image
                                        source={{ uri: require('../../images/icon-consumer') }}
                                        style={{ width: px(80), height: px(1) }}>
                                    </Image>
                                </View>
                                <Text allowFontScaling={false} style={styles.consumer_dec}>
                                    尊敬的客户：
                                        </Text>
                                <Text allowFontScaling={false} style={styles.consumer_dec}>
                                    您好！为帮助您更好地选购境外商品，请您在购买前务必认真、详细阅读并完全理解本告知书的全部内容，并对自身风险承担做出客观判断。同意本告知书内容后再下单购买：
                                        </Text>
                                <Text allowFontScaling={false} style={styles.consumer_dec}>
                                    1.您在本（公司）网站购买的境外商品等同于原产地直接销售商品，因此商品本身可能无中文标签，如果需要您可以通过网站查看相关商品标签中文翻译或联系客服。
                                        </Text>
                                <Text allowFontScaling={false} style={styles.consumer_dec}>
                                    2.根据相关法律政策，您选购的境外商品仅限于个人自用，不得进行再次销售。
                                        </Text>
                                <Text allowFontScaling={false} style={styles.consumer_dec}>
                                    3.您购买的境外商品符合原产地有关品质、健康、标识的相关标准，与我国产品标准或有所不同，由此可能造成的风险，达令家不承担责任。
                                        </Text>
                                <Text allowFontScaling={false} style={styles.consumer_dec}>
                                    4.您在本（公司）网站上购买的保税区发货的境外商品时，自动视为由达令家代您向海关进行申报和代收代缴税费。
                                        </Text>
                            </View>
                            <View style={{ height: px(40) }}></View>
                        </View>
                    }
                </View>
            </ScrollView>
            {/*底部按钮组*/}
            <View style={styles.footer}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.goCart()}>
                    <View style={styles.footerCart}>
                        <Image
                            source={{ uri: require('../../images/icon-detail-cart') }}
                            style={{ width: px(46), height: px(39) }}>
                        </Image>
                        <Text allowFontScaling={false} style={styles.footerCartTxt}>
                            {this.state.cartNum}
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.state.limitStock == 0
                    ? <TouchableOpacity>
                        <View style={[styles.footerBuy, styles.footerBuy1, { width: px(620) }]}>
                            <Text allowFontScaling={false} style={[styles.footerBuyTxt, styles.footerBuy1Txt]}>
                                已抢光
                                </Text>
                        </View>
                    </TouchableOpacity>
                    : <TouchableOpacity activeOpacity={0.8} onPress={() => this.openbuy()}>
                        <View style={[styles.footerBuy, { width: px(310) }]}>
                            <Text allowFontScaling={false} style={styles.footerBuyTxt}>
                                立即购买
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.sharePage()}>
                    <View style={styles.footerShare}>
                        <Text allowFontScaling={false} style={styles.footerShareTxt}>
                            分享商品
                            </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/*弹出购买层*/}
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.priceBoxStatus}
                onRequestClose={() => null}>
                <View style={SpecificationsStyle.warp}>
                    <TouchableOpacity activeOpacity={0.9}
                        style={{ width: px(750), flex: 1 }} onPress={() => this.setState({ priceBoxStatus: false })}>
                    </TouchableOpacity>
                    <View style={SpecificationsStyle.box}>
                        <View style={SpecificationsStyle.detail}>
                            {/*小图*/}
                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: px(10) }}>
                                <Image style={SpecificationsStyle.coverImage}
                                    source={{
                                        uri: this.state.smallImage
                                    }}
                                    resizeMode="cover"
                                    resizeMethod="resize">
                                </Image>
                            </View>
                            {/*价格*/}
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: px(35), color: '#252426' }}>
                                        ￥{Number(this.state.salePrice).toFixed(2)}
                                    </Text>
                                    <Text allowFontScaling={false} style={{ fontSize: px(24), color: '#858385', textDecorationLine: 'line-through', marginLeft: px(13) }}>
                                        ￥{Number(this.state.marketPrice).toFixed(2)}
                                    </Text>
                                </View>
                                <Text allowFontScaling={false} style={{ fontSize: px(28), color: '#d0648f', marginTop: px(13) }}>
                                    购买有奖励
                            </Text>
                            </View>
                            {/*关闭按钮*/}
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.setState({ priceBoxStatus: false })}>
                                <View style={SpecificationsStyle.closeImageBox}>
                                    <Image style={SpecificationsStyle.closeImage}
                                        source={{ uri: require('../../images/icon-closeSpu') }}
                                        resizeMode="cover"
                                        resizeMethod="resize">
                                    </Image>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={SpecificationsStyle.other}>
                            <View style={SpecificationsStyle.spuCartMain}>
                                {/*数量选择器*/}
                                <View style={SpecificationsStyle.quantityBox}>
                                    <Text allowFontScaling={false} style={SpecificationsStyle.quantity}>数量</Text>
                                    {
                                        this.state.limitStock < 10 &&
                                        <Text allowFontScaling={false} style={{ fontSize: px(24), color: '#858385', marginRight: px(45) }}>库存{this.state.limitStock}件</Text>
                                    }
                                    <View style={SpecificationsStyle.quantityMain}>
                                        <TouchableOpacity activeOpacity={0.8} onPress={this.reduce.bind(this)}>
                                            <View style={SpecificationsStyle.reduce}>
                                                <Text style={SpecificationsStyle.reduceText}> - </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={SpecificationsStyle.quantityInputBox}>
                                            <TextInput
                                                style={SpecificationsStyle.quantityInput}
                                                value={String(this.state.buyNumber)}
                                                autoFocus={false}
                                                underlineColorAndroid="transparent"
                                                keyboardType="numeric"
                                                onChangeText={this.changeNumber.bind(this)}>
                                            </TextInput>
                                        </View>
                                        <TouchableOpacity activeOpacity={0.8} onPress={this.plus.bind(this)}>
                                            <View style={SpecificationsStyle.plus}>
                                                <Text
                                                    style={SpecificationsStyle.plusText}> + </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/*购买按钮*/}
                                {
                                    this.state.isBuyLimit == 1 &&
                                    <View style={SpecificationsStyle.tipLimitBuy}>
                                        <Text style={SpecificationsStyle.tipLimitBuyTip} allowFontScaling={false}>{this.state.buyLimitMsg}</Text>
                                    </View>

                                }
                                {this.state.limitStock == 0
                                    ? <TouchableOpacity style={SpecificationsStyle.spuQuantityBtnBox}>
                                        <View style={[styles.footerBuy, styles.footerBuy1, { width: px(750) }]}>
                                            <Text allowFontScaling={false} style={[styles.footerBuyTxt, styles.footerBuy1Txt]}>
                                                已抢光
                                                </Text>
                                        </View>
                                    </TouchableOpacity> : <View style={SpecificationsStyle.spuQuantityBtnBox}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={this.addCartFn.bind(this)}>
                                            <View
                                                style={[SpecificationsStyle.quantityBtn, SpecificationsStyle.quantityBtnColor2]}>
                                                <Text allowFontScaling={false} style={SpecificationsStyle.quantityBtnText}>加入购物车</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={this.goSubmit.bind(this)}>
                                            <View
                                                style={[SpecificationsStyle.quantityBtn, SpecificationsStyle.quantityBtnColor1]}>
                                                <Text allowFontScaling={false} style={SpecificationsStyle.quantityBtnText}>立即购买</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            {/*大图弹层*/}
            <ImgsModal 
              ref={ n => this.imgsModal = n } 
              list={this.state.imgs}
            />
        </View>
    }
    componentDidMount() {
        this.getDetail()
    }

    async getDetail() {
        let goods = {};
        let imgs=[];
        try {
            if (this.sku) {
                goods = await request.get(`/goods/detail.do`, { sku: this.sku });
            } else {
                goods = await request.get(`/goods/detail.do`, { id: this.id });
            }
            if (!goods.detail.mobile_detail) {
                goods.detail.mobile_detail={
                    list : []
                };
            }
            if (goods.detail.mobile_detail.list.length > 0) {
                goods.detail.mobile_detail.list.map((item) => {
                    if (Number(item.width) != 750) {
                        try {
                            item.height = 750 / Number(item.width) * Number(item.height) >> 0;
                            item.width = 750;
                        } catch (e) {
                            logWarm(e.message)
                        }
                    }
                    imgs.push(item)
                    return item;
                });
            }
            //将接口返回的数据并入state中
            this.setState({
                image: goods.image,
                labelList: goods.labelList,
                goodsShowName: goods.goodsShowName,
                goodsShowDesc: goods.goodsShowDesc,
                salePrice: goods.salePrice,
                discount: goods.discount,
                marketPrice: goods.marketPrice,
                isInBond: goods.isInBond,
                taxation: goods.taxation,
                detail: goods.detail,
                limitStock: goods.limitStock,
                salePrice: goods.salePrice,
                marketPrice: goods.marketPrice,
                smallImage: goods.shareImage,
                isBuyLimit: goods.isBuyLimit,
                buyLimitMsg: goods.buyLimitMsg,
                imgs
            })
        } catch (e) {
            toast(e.message || "内容不存在");
            this.props.navigation.goBack();
        }
    }
    //进入购物车的方法
    goCart() { }
    //加入购物车的方法
    addCartFn() { }
    //购买方法
    openbuy() {
        this.setState({ priceBoxStatus: true })
    }
    //立即购买
    goSubmit() {
      this.props.navigation.navigate('Order', {

      })
     }
    //分享商品
    sharePage() { }
    //数量减少
    reduce() {
        if (this.state.buyNumber == 1) return;
        let buyNumber = Number(this.state.buyNumber) || 2;
        if (isNaN(buyNumber)) buyNumber = 2;
        this.setState({ buyNumber: --buyNumber })
    }
    //改数量
    changeNumber(num) {
        num = Number(num);
        if (isNaN(num)) num = 1;
        if (num > this.state.limitStock) {
            num = 1
            toast(`库存不足`);
        }
        this.setState({
            buyNumber: num
        });
    }
    //增加数量
    plus() {
        if (this.state.isBuyLimit == 1 && this.state.buyNumber >= this.state.buyLimitNum) {
            toast(`该商品为限购商品,${this.state.buyLimitMsg}`);
            return;
        }
        if (this.state.buyNumber >= this.state.limitStock) {
            toast(`库存仅剩${this.state.limitStock}件`);
            return;
        }
        let qty = this.state.buyNumber || 1;
        if (isNaN(qty)) qty = 1;
        this.setState({
            buyNumber: ++qty
        })
    }
    openBigImg(key){
      console.log(this.imgsModal)

      this.imgsModal.Open(key);
    }
}

const styles = StyleSheet.create({
    goodsInfo: {
        backgroundColor: '#fff',
        marginBottom: px(20)
    },
    coverImage: {
        width: px(750),
        height: px(600)
    },
    labels: {
        position: 'absolute',
        top: px(5),
        left: px(10),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    labelImg: {
        width: px(80),
        height: px(80),
        marginRight: px(8)
    },
    goodsWrap: {
        flexDirection: "row",
        padding: px(30),
        paddingBottom: 0
    },
    goodsWrapTxt: {
        flex: 1,
        fontSize: px(30),
        lineHeight: px(40),
        color: '#222',
        fontWeight: 'normal'
    },
    goodsPrices: {
        marginBottom: px(30),
        width: px(720),
        paddingLeft: px(30)
    },
    priceInfo: {
        height: px(39),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: px(30),
        marginBottom: px(30)
    },
    price1: {
        color: '#252426',
        fontSize: px(26),
        includeFontPadding: false,
        marginRight: px(15),
        marginTop: px(4)
    },
    price2: {
        paddingTop: px(6),
        paddingRight: px(10),
        paddingBottom: px(4),
        paddingLeft: px(10),
        backgroundColor: '#f5f3f6',
        borderRadius: px(6),
        marginRight: px(15)
    },
    gou: {
        color: '#d0648f',
        fontSize: px(24),
    },
    promotes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fbfafc',
        height: px(60),
        paddingLeft: px(30),
        paddingRight: px(30)
    },
    promotesBox: {
        flexDirection: 'row'
    },
    promoteIcon: {
        width: px(24),
        height: px(24)
    },
    promoteTxt: {
        marginLeft: px(8),
        marginRight: px(10),
        fontSize: px(22),
        color: '#7a787a'
    },
    detailHead_: {
        backgroundColor: '#fff',
        paddingTop: px(30),
        height: px(90),
        paddingLeft: px(30),
        paddingRight: px(30),
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: px(5)
    },
    detailHead: {
        textAlign: 'center',
        color: '#eb83b2',
        fontSize: px(26),
        includeFontPadding: false
    },
    detail: {
        backgroundColor: '#fff',
        marginBottom: px(35)
    },
    spu_detailContentHeadBox_: {
        borderWidth: px(1),
        width: px(690),
        marginLeft: px(30),
        borderColor: '#d5d3d7'
    },
    spu_detailPropBox: {
        paddingLeft: px(30),
        paddingRight: px(30),
        minHeight: px(60),
        paddingTop: px(17)
    },
    detailContentHead: {
        paddingLeft: px(12),
        paddingRight: px(12),
        paddingTop: px(17),
        paddingBottom: px(17),
        fontSize: px(25),
        color: '#252426'
    },
    spu_detailContentHead: {
        height: px(60),
        backgroundColor: '#efefef',
        color: '#252426',
        paddingLeft: px(30),
        fontSize: px(26)
    },
    detailProp: {
        flexDirection: 'row',
        marginBottom: px(16),
    },
    detailPropKey: {
        color: '#888',
        fontSize: px(25),
        width: px(160),
    },
    detailPropValue: {
        color: '#252426',
        fontSize: px(25),
        flex: 1,
        lineHeight: px(36),
        paddingLeft: px(12)
    },
    consumer: {
        marginTop: px(20),
        width: px(750),
        backgroundColor: '#fff',
        marginBottom: px(58)
    },
    consumerBox: {
        width: px(750),
        paddingLeft: px(25),
        paddingRight: px(25),
        paddingBottom: px(20),
        backgroundColor: '#fff',
    },
    consumer_head: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: px(110)
    },
    collectionHeadTxt: {
        fontSize: px(24),
        marginLeft: px(20),
        marginRight: px(20),
        color: '#252426'
    },
    consumer_dec: {
        fontSize: px(20),
        color: '#858385',
        lineHeight: px(36)
    },
    footer: {
        height: px(90),
        flexDirection: 'row',
    },
    footerCart: {
        width: px(130),
        height: px(90),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#fbfafc'
    },
    footerCartTxt: {
        position: 'absolute',
        top: px(16),
        left: px(65),
        borderWidth: 1,
        borderColor: '#d0648f',
        height: px(24),
        lineHeight: px(22),
        fontSize: px(16),
        borderRadius: px(10),
        paddingHorizontal: px(8),
        paddingVertical: px(1),
        paddingBottom: px(3),
        color: '#333',
        textAlign: 'center',
        backgroundColor: '#efefef',
        overflow: 'hidden'
    },
    footerBuy: {
        backgroundColor: '#e7895c',
        width: px(310),
        height: px(90),
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerBuyTxt: {
        fontSize: px(30),
        color: '#fff',
        includeFontPadding: false
    },
    footerBuy1: {
        backgroundColor: '#b2b3b5'
    },
    footerBuy1Txt: {},
    footerShare: {
        backgroundColor: '#d0648f',
        width: px(310),
        height: px(90),
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerShareTxt: {
        color: '#fff',
        fontSize: px(30),
        includeFontPadding: false
    },
})

const SpecificationsStyle = StyleSheet.create({
    warp: {
        flex: 1,
        backgroundColor: 'rgba(36, 37, 38, 0.5)'
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: px(750),
    },
    detail: {
        width: px(750),
        paddingLeft: px(26),
        paddingRight: px(30),
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: px(143),
        justifyContent: 'space-between',
        paddingTop: px(10)
    },
    coverImage: {
        width: px(200),
        height: px(200),
        borderRadius: px(10)
    },
    closeImage: {
        width: px(22),
        height: px(22),
    },
    closeImageBox: {
        width: px(50),
        height: px(50),
        marginTop: px(29),
        alignItems: 'flex-end'
    },
    other: {
        width: px(750),
        height: px(282),
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingTop: px(33)
    },
    spuCartMain: {
        flex: 1
    },
    quantityBox: {
        paddingHorizontal: px(30),
        flexDirection: 'row',
        height: px(80),
        alignItems: 'center'
    },
    quantity: {
        fontSize: px(30),
        flex: 1
    },
    quantityMain: {
        width: px(198),
        height: px(58),
        borderWidth: px(1),
        borderColor: '#e5e5e5',
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: px(10)
    },
    reduce: {
        width: px(58),
        height: px(58),
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: px(1),
        borderRightColor: '#e5e5e5'
    },
    reduceText: {
        fontSize: px(28),
        color: '#252426',
    },
    plus: {
        width: px(58),
        height: px(58),
        alignItems: 'center',
        justifyContent: 'center'
    },
    plusText: {
        fontSize: px(28),
        color: '#252426',
    },
    quantityInputBox: {
        flex: 1,
        backgroundColor: '#fff',
        borderRightWidth: px(1),
        borderRightColor: '#e5e5e5'
    },
    quantityInput: {
        flex: 1,
        textAlign: 'center',
        padding: 0,
        fontSize: px(28)
    },
    tipLimitBuy: {
        //height:px(63),
        paddingTop: px(18),
        paddingBottom: px(18),
        alignItems: 'flex-end',
        paddingRight: px(30)
    },
    tipLimitBuyTip: {
        color: '#ed3f58',
        fontSize: px(22)
    },
    spuQuantityBtnBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    quantityBtnBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    quantityBtn: {
        width: px(375),
        height: px(90),
        alignItems: 'center',
        justifyContent: 'center'
    },
    quantityBtnText: {
        fontSize: px(30),
        color: '#fff'
    },
    quantityBtnColor1: {
        backgroundColor: '#d0648f'
    },
    quantityBtnDisabled: {
        color: '#ddd'
    },
    quantityBtnColor2: {
        backgroundColor: '#e7895c'
    },
})