import React, { Component } from 'react';
import {
    Modal, Text, View, StyleSheet,
    TouchableOpacity, TouchableWithoutFeedback,
    KeyboardAvoidingView, Dimensions
} from 'react-native'

import px from '../utils/responsive'
import toast from '../utils/toast'
import { log, logWarm, logErr } from '../utils/log'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

/**
 * alert提示
 * @param {*} opt.title 标题
 * @param {*} opt.content<array> 内容
 * @param {*} opt.btns<array> 按钮组
 * @param {*} opt.btns.txt 按钮标题
 * @param {*} opt.btns.click 按钮点击事件
 */
export default class DialogModal extends Component {
    constructor(props) {
        super(props)
        this.enabledExit = this.props.enabledExit;
        this.state = {
            show: false,
            opt: { title: "", content: [], btns: [] }
        }
    }
    render() {
        let opt = this.state.opt;
        return <Modal
            visible={this.state.show}
            onShow={() => { }}
            onRequestClose={() => { }}
            animationType="none"
            transparent={true}>
            {this.state.show && <View style={[base.flex_middle, { backgroundColor: "rgba(0,0,0,.5)" }]}>
                <TouchableWithoutFeedback onPress={() => {
                    this.enabledExit && this.setState({ show: false })
                }}>
                    <View style={base.bg}></View>
                </TouchableWithoutFeedback>
                <View style={base.alertContainer}>
                    <View style={DialogStyle.alert_box}>
                        <View style={DialogStyle.alert_title}>
                            {opt.title && <Text style={DialogStyle.alert_title_txt}>{opt.title}</Text>}
                        </View>
                        <View style={DialogStyle.alert_body}>
                            {opt.content.map((txt, index) =>
                                <Text key={index} style={DialogStyle.alert_body_txt}>{txt}</Text>
                            )}
                        </View>
                        <View style={DialogStyle.alert_foot}>
                            {opt.btns.map((btn, index) => <TouchableOpacity key={index} onPress={() => {
                                btn.click && btn.click(); this.setState({ show: false })
                            }}><View style={[DialogStyle.alert_foot_btn, { borderLeftWidth: index > 0 ? px(1) : 0 }]} ><Text style={{ color: btn.color }}>{btn.txt}</Text></View></TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </View>}
        </Modal>
    }
    //弹框参数
    open(opt) {
        if (!opt || !opt.content) return logWarm("alert没有传入内容参数");
        if (!opt.btns || opt.btns.length === 0) {
            opt.btns = [{ txt: "确定", click: () => { } }]
        }
        if (opt.btns.length == 1) {
            opt.btns[0].color = "#d0648f";
        }
        if (opt.btns.length == 2) {
            opt.btns[1].color = "#d0648f";
        }
        this.setState({
            show: true, opt
        })
    }
    //重载参数
    _alert(title, content, success, cancel) {
        let opt = {
            title, content,
            btns: []
        }
        if (success) opt.btns.push(success)
        if (cancel) opt.btns.push(cancel)
        this.open(opt);
    }
    /**
    * alert提示
    * @param {*} title 标题
    * @param {*} content<array> 内容
    * @param {*} success<array> 成功
    * @param {*} cancel<array> 取消
    * @param {*} success.txt 按钮标题
    * @param {*} success.click 按钮点击事件
    * 重载,(content<string|array>)
    * 重载,(title<string>,content<string|array>)
    * 重载,(title<string>,content<string|array>,success<string|object>)
    * 重载,(title<string>,content<string|array>,success<string|object>,cancel<string|object>)
    */
    alert(title, content, success, cancel) {
        if (!title) {
            title = null
        }
        if (title && !content) {
            const tmp = content;
            content = title;
            title = tmp;
        }
        if (typeof content === "string") content = [content]
        if (typeof success === "string") success = { txt: success }
        if (typeof cancel === "string") cancel = { txt: cancel }
        this._alert(title, content, success, cancel)
    }
}


const base = StyleSheet.create({
    /**
     * 一行，居中
     */
    line: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    position: {
        position: 'absolute',
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inline_between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text_center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex_middle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg: {
        flex: 1,
        width: deviceWidth,
        height: deviceHeight,
        zIndex: 1
    },
    alertContainer: {
        flex: 1,
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})



const DialogStyle = StyleSheet.create({
    alert_box: {
        width: px(600),
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(25),
        overflow: "hidden"
    },
    alert_title: {
        paddingTop: px(40),
    },
    alert_title_txt: {
        fontSize: px(34),
    },
    alert_body: {
        paddingHorizontal: px(20),
        paddingTop: px(5),
        paddingBottom: px(30),
        alignItems: 'center',
    },
    alert_body_txt: {
        lineHeight: px(40),
        fontSize: px(26),
    },
    alert_foot: {
        borderTopWidth: px(1),
        borderColor: "#ccc",
        width: px(600),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    alert_foot_btn: {
        width: px(300),
        alignItems: 'center',
        borderColor: "#ccc",
        paddingVertical: px(30)
    }
})

