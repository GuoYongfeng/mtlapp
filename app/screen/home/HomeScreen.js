import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import px from '../../utils/responsive'
import request from '../../utils/request'

import Banner from './Banner'
import GoodItem from './GoodItem'
import SearchHeader from './SearchHeader'
import DialogModal from '../../components/DialogModal'
import ShareView, { SHARETYPE } from '../../components/ShareView'
import Modules from './Modules'

// 获取设备屏幕宽高
const { height, width } = Dimensions.get('window');

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadText: "加载中...",
            list: [],
            refreshing: false, //列表刷新用到的变量
            scrollTop: new Animated.Value(0),
            showTop: false
        }
        this.start = 0;
    }

    render() {
        return <View style={{ flex: 1 }}>
            <Animated.View style={[styles.headerView, {
                backgroundColor: this.state.scrollTop.interpolate({
                    inputRange: [-100, 0, 100],
                    outputRange: ['rgba(255,255,255,.5)', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)']
                })
            }]}>
                <SearchHeader share={() => this.share()} navigation={this.props.navigation} />
            </Animated.View>
            <View style={styles.pageView}>
                <FlatList ref="flatlist"
                    refreshing={this.state.refreshing}
                    numColumns={2}//2列
                    onRefresh={() => this.refresh()}//刷新调用的方法
                    onEndReached={() => this.nextPage()}//拉倒底部加载下一页
                    ListHeaderComponent={<View style={{ backgroundColor: "#fff" }}>
                        <Banner ref="banner" navigation={this.props.navigation} />
                        <Modules ref="module"
                            navigation={this.props.navigation}
                            goOtherPage={this.goOtherPage.bind(this)} />
                        <View style={{
                            height: px(100),
                            backgroundColor: '#f2f2f2',
                            paddingLeft: px(20)
                        }}>
                            <Image
                                style={{
                                    height: px(100),
                                    width: px(280)
                                }}
                                source={{ uri: require('../../images/index-title') }}
                            />
                        </View>
                    </View>}
                    renderItem={({ item, index }) =>
                        <GoodItem
                            addCart={this.addCart.bind(this)}
                            index={index}
                            goods={item}
                            navigation={this.props.navigation}
                        />
                    }
                    ListFooterComponent={<View>
                        <Text style={styles.loading}>{this.state.loadText}</Text>
                    </View>}
                    onScroll={(e) => this._onScroll(e.nativeEvent)}
                    scrollEventThrottle={100}
                    keyExtractor={(goods) => goods.id}
                    data={this.state.list}
                />
            </View>
            {this.state.showTop && <TouchableOpacity onPress={()=>this.toTop()}>
                <Image style={styles.toBtn}
                    source={{ uri: require("../../images/icon-to-top") }} />
            </TouchableOpacity>}
            {/*
            
            */}
            <ShareView ref='shareView' types={[SHARETYPE.WEIXIN, SHARETYPE.PENGYOUQUAN, SHARETYPE.LIANJIE, SHARETYPE.ERWEIMA]} />
            <DialogModal ref="dialog" />
        </View>
    }
    async componentDidMount() {
        this.loadShop();
    }
    share() {
        this.refs.shareView.open();
    }
    //刷新方法
    async refresh() {
        this.isEnd = false;
        this.setState({
            refreshing: true
        })
        try {
            await this.refs.banner.refresh()
            await this.refs.module.refresh();
            await this.loadShop();
        } finally {
            this.setState({
                refreshing: false
            });
        }
    }
    //加载商品第一页
    async loadShop() {
        this.start = 0;
        try {
            let list = await request.get(`/goods/list.do?limit=20&start=${this.start}&categoryId=`)
            if (!list.items || list.items.length == 0) {
                this.setState({
                    loadText: "别扯啦，到底了"
                });
                this.isEnd = true;
                return;
            }
            if (list.totalPages < 2) {
                this.setState({
                    loadText: list.items.length > 1 ? "别扯啦，到底了" : ''
                });
                this.isEnd = true;
            }
            this.setState({
                list: list.items,
                total: list.total
            });
        } catch (e) {
            toast(e.message);
            this.isEnd = true;
            this.setState({
                loadText: this.state.items.length > 1 ? "别扯啦，到底了" : ''
            });
        }
        this.loading = false;
    }
    //加载商品其他页
    async nextPage() {
        if (this.loading || this.isEnd) return;
        this.loading = true;
        try {
            if (!this.start) this.start = 0;
            this.start = this.start + 1;
            let res = await request.get(`/goods/list.do?limit=20&start=${this.start}&categoryId=`);//this.start + 1
            this.setState({
                list: this.state.list.concat(res.items),
                total: res.total
            });
            if (!res.items || res.items.length == 0 || res.totalPages <= this.start + 1) {
                this.setState({
                    loadText: "别扯啦，到底了"
                });
                this.isEnd = true;
                return;
            }

        } catch (e) {
            toast(e.message);
            this.isEnd = true;
            this.setState({
                loadText: "别扯啦，到底了"
            });
        } finally {
            this.loading = false;
        }
    }
    //滚动监听
    _onScroll(e) {
        const y = e.contentOffset.y;
        if (y < 200) this.state.scrollTop.setValue(y)
        if (y < 500 && this.state.showTop) {
            this.setState({ showTop: false })
        }
        if (y > 500 && !this.state.showTop) {
            this.setState({ showTop: true })
        }
    }
    //回到顶部
    toTop(){
        this.refs.flatlist.scrollToOffset({offset:0})
    }
    //TODO:加入购物车
    addCart() { }
    /**
     * 跳转到其他页面
     * @param {*} item 
     */
    goOtherPage(item) {
        if (item.urlType == "sku" && item.prodId) {
            this.props.navigation.navigate('Goods', {
                id: item.prodId
            });
        }
        if (item.urlType == "h5") {
            this.props.navigation.navigate('Browser', {
                webPath: item.urlTypeValue,
                img: item.imageUrl
            });
        }
    }
}

const styles = StyleSheet.create({
    headerView: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
    },
    pageView: {
        flex: 1,
        width: width,
    },
    loading: {
        textAlign: 'center',
        fontSize: px(28),
        color: "#ccc"
    },
    toBtn: {
        width: px(100),
        height: px(100),
        position: "absolute",
        right: 5,
        bottom: 5
    }
})