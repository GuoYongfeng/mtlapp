import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import px from '../../utils/responsive';
import request from '../../utils/request';
import toast from '../../utils/toast';

export default class ModuleItem extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { i, p_index, isMargin } = this.props
        return <View style={{ alignItems: 'center' }}>
            {
                i.tplId == 10 && /*通栏750*300*/
                <View style={[floorStyles.module]}>
                    {
                        i.moduleTemplateImages.map(k =>
                            <TouchableWithoutFeedback
                                key={k.imgId}
                                onPress={() => this.props.goOtherPage(k)}>
                                <Image resizeMode="cover" resizeMethod="scale"
                                    style={[{
                                        height: px(300),
                                        width: px(750)
                                    }]}
                                    source={{ uri: k.imageUrl }}
                                />
                            </TouchableWithoutFeedback>
                        )
                    }
                </View>

            }
            {
                (i.tplId == 1 || i.tplId == 2 || i.tplId == 13 || i.tplId == 11 || i.tplId == 12) && /*通栏1个1.1，1.2，平均两个，平均三个,这里的10是710*220，记得换！！！*/
                <View style={[floorStyles.module, {
                    justifyContent: 'space-between',
                    width: px(710),
                    paddingBottom: p_index == 0 && isMargin ? px(0) : px(16)
                }]}>
                    {
                        i.moduleTemplateImages.map(k =>
                            <TouchableWithoutFeedback
                                key={k.imgId}
                                onPress={() => this.props.goOtherPage(k)}>
                                <View style={floorStyles.moduleImage_}>
                                    <Image resizeMode="cover" resizeMethod="scale"
                                        style={[{
                                            height: i.tplId == 13 ? px(220) : i.tplId == 11 ? px(450) : px(240),
                                            width: i.tplId == 2 ? px(347) : i.tplId == 12 ? px(226) : px(710)
                                        }, floorStyles.moduleImage]}
                                        source={{ uri: k.imageUrl }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }
                </View>

            }
            {
                (i.tplId == 4 || i.tplId == 3) && /*4:左边468，右边226  3:左边226，右边468*/
                <View style={[floorStyles.module, {
                    justifyContent: 'space-between',
                    width: px(710)
                }]}>
                    {
                        i.moduleTemplateImages.map((k, k_index) =>
                            <TouchableWithoutFeedback
                                key={k.imgId}
                                onPress={() => this.props.goOtherPage(k)}>
                                <View style={floorStyles.moduleImage_}>
                                    <Image resizeMode="cover" resizeMethod="scale"
                                        style={[{
                                            width: k_index == 0 ? i.tplId == 4 ? px(468) : px(226) : i.tplId == 4 ? px(226) : px(468),
                                            height: px(240)
                                        }, floorStyles.moduleImage]}
                                        source={{ uri: k.imageUrl }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }
                </View>

            }
            {i.tplId == 9 &&
                <View style={[floorStyles.module, {
                    justifyContent: 'space-between',
                    width: px(710)
                }]}>
                    <View style={{ justifyContent: 'space-between' }}>
                        {
                            i.moduleTemplateImages.map((k, k_index) => {
                                return k_index < 2 ? <TouchableWithoutFeedback
                                    key={k.imgId}
                                    onPress={() => this.props.goOtherPage(k)}>
                                    <View style={[floorStyles.moduleImage_, {
                                        width: px(347),
                                        height: px(240),
                                        marginBottom: k_index == 0 ? px(16) : px(0)
                                    }]}>
                                        <Image resizeMode="cover" resizeMethod="scale"
                                            style={[{ width: px(347), height: px(240) }, floorStyles.moduleImage]}
                                            source={{ uri: k.imageUrl }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback> : null
                            })
                        }
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.goOtherPage(i.moduleTemplateImages[2])}>
                        <View style={floorStyles.moduleImage_}>
                            <Image resizeMode="cover" resizeMethod="scale"
                                style={[{ height: px(496), width: px(347) }, floorStyles.moduleImage]}
                                source={{ uri: i.moduleTemplateImages[2].imageUrl }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            }
            {
                (i.tplId == 14 || i.tplId == 15) &&
                <View style={[floorStyles.module]}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{ paddingLeft: px(20) }}
                    //pagingEnabled={true}

                    >
                        {
                            i.moduleTemplateImages.map(k =>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    key={k.imgId}
                                    onPress={() => this.props.goOtherPage(k)}>
                                    <View style={[floorStyles.moduleImage_, {
                                        width: px(220),
                                        height: i.tplId == 14 ? px(280) : 'auto',
                                        marginRight: px(16)
                                    }]}>
                                        <Image resizeMode="cover" resizeMethod="scale"
                                            style={[{ width: px(220), height: i.tplId == 14 ? px(280) : px(220) }, floorStyles.moduleImage]}
                                            source={{ uri: k.imageUrl }}
                                        >
                                        </Image>
                                    </View>
                                    {i.tplId == 15 && k.urlType == 'sku' &&
                                        <View style={{ width: px(220), alignItems: 'center' }}>
                                            <Text style={floorStyles.moduleGoodName} allowFontScaling={false}>{k.title}</Text>
                                            <View style={floorStyles.modulePrice}><Text style={floorStyles.moduleGoodPrice}
                                                allowFontScaling={false}>￥{toInt(k.salePrice)}</Text><Text
                                                    style={floorStyles.moduleGoodMarket} allowFontScaling={false}>￥{toInt(k.marketPrice)}</Text></View>
                                        </View>
                                    }
                                </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                </View>

            }
            {
                i.tplId == 8 &&
                <View
                    style={[floorStyles.module]}>
                    <View style={{ marginRight: px(16) }}>
                        <TouchableWithoutFeedback
                            onPress={() => this.props.goOtherPage(i.moduleTemplateImages[0])}>
                            <View style={[floorStyles.moduleImage_, { width: px(347), height: px(496) }]}>
                                <Image resizeMode="cover" resizeMethod="scale"
                                    style={[{ width: px(347), height: px(496) }, floorStyles.moduleImage]}
                                    source={{ uri: i.moduleTemplateImages[0].imageUrl }}
                                >
                                </Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flexDirection: 'row', width: px(347), flexWrap: 'wrap' }}>
                        {
                            i.moduleTemplateImages.map((k, k_index) => {
                                return k_index > 0 ? <TouchableWithoutFeedback
                                    key={k.imgId}
                                    onPress={() => this.props.goOtherPage(k)}>
                                    <View style={[floorStyles.moduleImage_, {
                                        width: px(347),
                                        height: px(240),
                                        marginBottom: k_index == 1 ? px(16) : px(0)
                                    }]}>
                                        <Image resizeMode="cover" resizeMethod="scale"
                                            style={[{ width: px(347), height: px(240) }, floorStyles.moduleImage]}
                                            source={{ uri: k.imageUrl }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback> : null
                            })
                        }

                    </View>
                </View>

            }
            {
                i.tplId == 6 &&
                <View
                    style={[floorStyles.module]}>
                    <View style={{ marginRight: px(16) }}>
                        <TouchableWithoutFeedback
                            onPress={() => this.props.goOtherPage(i.moduleTemplateImages[0])}>
                            <View style={[floorStyles.moduleImage_, { width: i.tplId == 8 ? px(347) : px(258), height: i.tplId == 8 ? px(496) : px(476) }]}>
                                <Image resizeMode="cover" resizeMethod="scale"
                                    style={[{ width: i.tplId == 8 ? px(347) : px(258), height: i.tplId == 8 ? px(496) : px(476) }, floorStyles.moduleImage]}
                                    source={{ uri: i.moduleTemplateImages[0].imageUrl }}
                                >
                                </Image>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{/*flexDirection: 'row',*/ width: px(436), flexWrap: 'wrap' }}>
                        <View style={{ flexDirection: 'row', width: px(436) }}>
                            {
                                i.moduleTemplateImages.map((k, k_index) => {
                                    return k_index > 0 && k_index < 3 ? <TouchableWithoutFeedback
                                        key={k.imgId}
                                        onPress={() => this.props.goOtherPage(k)}>
                                        <View style={[floorStyles.moduleImage_, {
                                            width: px(210),
                                            height: px(230),
                                            marginRight: k_index == 1 ? px(16) : px(0),
                                            marginBottom: px(16)
                                        }]}>
                                            <Image resizeMode="cover" resizeMethod="scale"
                                                style={[{ width: px(210), height: px(230) }, floorStyles.moduleImage]}
                                                source={{ uri: k.imageUrl }}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback> : null
                                })
                            }
                        </View>
                        <View style={{ flexDirection: 'row', width: px(436) }}>
                            {
                                i.moduleTemplateImages.map((k, k_index) => {
                                    return k_index > 2 && k_index < 5 ? <TouchableWithoutFeedback
                                        key={k.imgId}
                                        onPress={() => this.props.goOtherPage(k)}>
                                        <View style={[floorStyles.moduleImage_, {
                                            width: px(210),
                                            height: px(230),
                                            marginRight: k_index == 3 ? px(16) : px(0)
                                        }]}>
                                            <Image resizeMode="cover" resizeMethod="scale"
                                                style={[{ width: px(210), height: px(230) }, floorStyles.moduleImage]}
                                                source={{ uri: k.imageUrl }}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback> : null
                                })
                            }
                        </View>
                    </View>
                </View>

            }
        </View>
    }
}


// 价格，小数不为零去掉小数
function toInt(price) {
    if (!price % 1) {
        return price
    } else {
        let p_int = (price + '').split('.')[0]
        let p_float = ((price * 1 - p_int * 1).toFixed(2) + '').split('.')[1]
        if (p_float > 0) {
            return price
        } else {
            return p_int
        }
    }
}


const floorStyles = StyleSheet.create({
    floorTitle: {
        height: px(100),
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingLeft: px(20)
    },
    floorTitleTxt: {
        fontSize: px(30)
    },
    floor: {
        backgroundColor: '#fff',
        marginBottom: px(20),
        paddingBottom: px(20)
    },
    module: {
        width: px(750),
        //paddingBottom: px(10),
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: px(16)
    },
    moduleImage_: {
        borderRadius: px(12),
        overflow: 'hidden'
    },
    moduleImage: {
        borderRadius: px(12),
        overflow: 'hidden'
    },
    moduleGoodName: {
        fontSize: px(24),
        color: '#252426',
        marginTop: px(20),
        marginBottom: px(6)
    },
    modulePrice: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    moduleGoodPrice: {
        fontSize: px(24),
        color: '#d0648f'
    },
    moduleGoodMarket: {
        fontSize: px(20),
        color: '#858385',
        textDecorationLine: 'line-through',
        marginLeft: px(10)
    }
})
