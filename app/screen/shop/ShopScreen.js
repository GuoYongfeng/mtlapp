'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import Header from '../../components/Header'
import { observer } from "mobx-react"
import px from '../../utils/responsive'
import ShopViewModel from './service'

// 组件
import GoodList from './GoodList'
import ShopFooter from './ShopFooter'

@observer
export default class ShopCartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: '编辑',
            requestStatue: false, //请求状态  是否请求中
            refreshing: false, //下拉刷新状态
            editStatus: false, //编辑状态
            selectAllStatus: false,
            editSelectAllStatus: false,
            SelectArr: [],
            editorArr: [],//编辑的商品数组
        };
        this.edit = this.edit.bind(this);
    }
    render() {
        return <View style={{ flex: 1, backgroundColor: '#f5f3f6', paddingBottom: px(100) }}>
            {/*顶部*/}
            <Header
                showLeft={false}
                style={{
                    backgroundColor: "#fff",
                }}
                title={`购物车(${ShopViewModel.data.goods_count || 0})`}
                titleStyle={{
                    color: "#000"
                }}
                rightBtn={this.state.editStatus ?
                    <Text allowFontScaling={false}
                        onPress={() => this.done()}
                        style={styles.headerRight}>完成</Text> :
                    <Text allowFontScaling={false}
                        onPress={() => this.edit()}
                        style={styles.headerRight}>编辑</Text>
                }
            />
            <FlatList
                keyExtractor={item => item.id}
                refreshing={this.state.refreshing}
                onRefresh={() => this.refresh()}
                ListEmptyComponent={() => {
                    if (CartList.data.list.length === 0) {
                        return <View style={styles.empty}>
                            <Text allowFontScaling={false} style={styles.empty_txt}>购物车没有商品哦</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.goHome.bind(this)}>
                                <View style={styles.empty_btn}>
                                    <Text allowFontScaling={false} style={styles.empty_btn_txt}>去首页看看</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    } else {
                        return <View></View>
                    }
                }}
                data={CartList.data.list}
                renderItem={({ item, index }) => <GoodList
                    items={item}
                    editStatus={this.state.editStatus}
                    limitStock={this.limitStock}
                    editorArr={this.state.editorArr}
                    editSelect={() => this.editSelect(index)}
                    goodsChangeQty={this.goodsChangeQty.bind(this)}
                    goDetail={() => this.goDetail(item.id, item.sku)}
                    select={() => this.select(item.id, item.select_status)}
                />
                }
            />
            {CartList.data.list.length == 0
                ? null
                : <Footer
                    editStatus={this.state.editStatus}
                    total_count={CartList.data.total_count}
                    total_price={CartList.data.total_price}
                    selectAllStatus={this.state.selectAllStatus}
                    editSelectAllStatus={this.state.editSelectAllStatus}
                    selectAllFn={CartList.selectAll}
                    editSelectAllFn={this.editSelectAllFn.bind(this)}
                    delete={this.delete.bind(this)}
                    submit={this.submit.bind(this)}
                />
            }
        </View>
    }
    //进入编辑状态
    edit() {
        this.setState({ editStatus: true })
    }
    //退出编辑状态
    done() {
        this.setState({ editStatus: false })
    }
    //编辑选中商品
    editSelect(index) {
        let item = ShopViewModel.data.list[index];
        if (this.state.editorArr.indexOf(item.id) < 0) {
            this.state.editorArr.push(item.id);
        } else {
            this.state.editorArr.splice(this.state.editorArr.indexOf(item.id), 1)
        }
        let editSelectAllStatus = false;
        if (this.state.editorArr.length === ShopViewModel.data.list.length) {
            editSelectAllStatu = true;
        }
        this.setState({ editorArr: this.state.editorArr.concat(), editSelectAllStatus })
    }
    //编辑选中所有商品
    editSelectAllFn() {
        if (this.state.editSelectAllStatus) {
            this.setState({ editorArr: [], editSelectAllStatus: false })
        } else {
            let list = []
            ShopViewModel.data.list.forEach(item => {
                list.push(item.id)
            })
            this.setState({ editorArr: list, editSelectAllStatus: true })
        }
    }
    //删除
    delete() {
        ShopViewModel.deleteGoods(this.state.editorArr.join(','))
    }
    //修改数量
    goodsChangeQty(id, num) {
        ShopViewModel.setNum(id, Number(num));
    }
    //选中商品
    select(id, status) {
        ShopViewModel.select(id, status);
    }
    //全部选中的状态
    selectAllStatus() {
        let status = ShopViewModel.data.list.every(res => {
            if (res.can_select == 0 || res.limitStock == 0) {
                return true;
            }
            return res.select_status == 1;
        });
        this.setState({
            selectAllStatus: status
        });
    }
    //提交订单
    submit() {
        let ids = [];
        let nums = [];
        ShopViewModel.data.list.forEach(item=>{
            if(item.select_status==1){
                ids.push(item.id)
                nums.push(item.quantity)
            }
        })
        this.props.navigation.navigate('Submit', {
            ids, nums
        });
    }
    //跳转到商品详情
    goDetail(id, sku) {
        this.props.navigation.navigate('Goods', {
            id: sku ? '' : id,
            sku: sku
        });
    }
    //跳到首页
    goHome() {
        this.props.navigation.navigate('Home');
    }
}

//  observer(ShopCartScreen)

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