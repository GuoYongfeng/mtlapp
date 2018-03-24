import React, { Component } from 'react';
import { 
    View, Text, StyleSheet,
 } from 'react-native';
import PropTypes from 'prop-types'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import px from '../../utils/responsive'
import Header from '../../components/Header'
import DialogModal from '../../components/DialogModal'
import OrderList from './OrderList'

export default class List extends Component {
    render() {
        return <View style={{ flex: 1 }}>
            {/*头部组件*/}
            <Header title="订单管理" navigation={this.props.navigation} />
            {/*列表tab*/}
            <ScrollableTabView
                initialPage={0}
                tabBarBackgroundColor="#fff"
                tabBarInactiveTextColor="#858385"
                tabBarActiveTextColor="#252426"
                tabBarUnderlineStyle={{ backgroundColor: '#e86d78', height: px(4) }}
                renderTabBar={() => <DefaultTabBar />}>
                {this.renderList("待支付")}
                {this.renderList("待收货")}
                {this.renderList("已完成")}
                {this.renderList("已退货")}
            </ScrollableTabView>
            <DialogModal ref="dialog" />
        </View>
    }
    renderList(title) {
        return <OrderList tabLabel={title} navigation={this.props.navigation} />
    }

}