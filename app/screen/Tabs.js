import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import Navigation, { TabNavigator, TabBarBottom } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Home, User, Products, ShopCart } from './HomeTabs'

import { logWarm, log } from '../utils/log'
import request from '../utils/request'

console.log(request.get)

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
    'Home': { screen: Home },
    'Products': { screen: Products },
    'ShopCart': { screen: ShopCart },
    'User': { screen: User }
}, {
    navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;

            if (routeName === 'Home') {
                iconName = `ios-apps${focused ? '' : '-outline'}`;
            } else if (routeName === 'Products') {
                iconName = `ios-add-circle${focused ? '' : '-outline'}`;
            } else if (routeName === 'ShopCart') {
                iconName = `ios-basket${focused ? '' : '-outline'}`;
            } else if (routeName === 'User') {
                iconName = `ios-contact${focused ? '' : '-outline'}`;
            }

            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarLabel: ({focused, tintColor}) => {
            const { routeName } = navigation.state;

            if (routeName === 'Home') { 
                return '玩事'
            } else if (routeName === 'Products') {
                return '应用中心'
            } else if (routeName === 'ShopCart') {
                return '购物中心'
            } else if (routeName === 'User') {
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

