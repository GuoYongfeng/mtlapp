import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import Pages from './routes'

export default class App extends Component {
    constructor(props){
        super(props)
    }

    listenChange = () => {
        // 监听路由跳转
        // TODO
    }

    render(){
        return <Pages onNavigationStateChange={ this.listenChange } />
    }
}

