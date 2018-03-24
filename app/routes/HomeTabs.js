import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import Navigation, { TabNavigator, TabBarBottom } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screen/home/HomeScreen'
import UserScreen from '../screen/user/UserScreen'
import ProductsScreen from '../screen/product/ProductsScreen'
import ShopCartScreen from '../screen/shop/ShopCartScreen'

import { logWarm, log } from '../utils/log'
import request from '../utils/request'

//创建tab页的顶部样式
const styles = StyleSheet.create({
    tabs: {
        height: 42,
        backgroundColor: '#fbfafc',
        borderTopColor: '#efefef'
    },
    tabIcon: {
        width: 18,
        height: 18
    },
    tabLabel: {
        marginBottom: 1
    }
})

export default TabNavigator({
    'HomeScreen': { screen: HomeScreen },
    'ProductsScreen': { screen: ProductsScreen },
    'ShopCartScreen': { screen: ShopCartScreen },
    'UserScreen': { screen: UserScreen }
}, {
    navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;

            if (routeName === 'HomeScreen') {
                iconName = `ios-apps${focused ? '' : '-outline'}`;
            } else if (routeName === 'ProductsScreen') {
                iconName = `ios-add-circle${focused ? '' : '-outline'}`;
            } else if (routeName === 'ShopCartScreen') {
                iconName = `ios-basket${focused ? '' : '-outline'}`;
            } else if (routeName === 'UserScreen') {
                iconName = `ios-contact${focused ? '' : '-outline'}`;
            }

            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarLabel: ({focused, tintColor}) => {
            const { routeName } = navigation.state;

            if (routeName === 'HomeScreen') { 
                return '首页'
            } else if (routeName === 'ProductsScreen') {
                return '产品分类'
            } else if (routeName === 'ShopCartScreen') {
                return '购物车'
            } else if (routeName === 'UserScreen') {
                return '我的'
            }
        }
    }),
    //设置tab使用的组件
    tabBarComponent: TabBarBottom,
    //点击哪个才加载哪个tab里的页面
    lazy: true,
    //设置tab放在界面的底部
    tabBarPosition: 'bottom',
    //设置tab里面的样式
    tabBarOptions: {
        style: styles.tabs,
        labelStyle: styles.tabLabel,
        activeTintColor: '#d0648f'
    }
});

