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
import ModuleItem from './ModuleItem'
import px from '../../utils/responsive';
import request from '../../utils/request';
import toast from '../../utils/toast';

export default class Modules extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            isMargin: false
        }
    }
    render() {
        if (this.state.list.length == 0) return null;
        return <View style={{ backgroundColor: '#f2f2f2' }}>
            {this.state.list.map((item, index) => {
                return <View key={index}
                    style={[floorStyles.floor, { marginBottom: index == 0 && this.state.isMargin ? 0 : px(20), paddingBottom: index == 0 && this.state.isMargin ? 0 : px(20) }]}>
                    {(item.isApplName == 1 || item.isApplName == 0 && item.titleImg) && <View style={[floorStyles.floorTitle, { paddingBottom: item.isApplName == 0 ? px(0) : px(24) }]}>
                        {
                            item.isApplName == 0 && item.titleImg &&
                            <Image
                                source={{ uri: item.titleImg }}
                                style={{ width: px(item.titleImgWidth), height: px(item.titleImgHeight) }} />

                        }
                        {
                            item.isApplName == 1 &&
                            <Text allowFontScaling={false} style={floorStyles.floorTitleTxt}>{item.moduleName}</Text>
                        }
                    </View>}
                    <View style={{ paddingTop: item.isApplName == 0 && !item.titleImg ? px(24) : px(0) }}>
                        {item.moduleTemplates && item.moduleTemplates.map((i, _index) => <ModuleItem
                            navigation={this.props.navigation}
                            goOtherPage={this.props.goOtherPage}
                            p_index={index}
                            key={_index} i={i}
                            isMargin={this.state.isMargin}
                            _index={_index} />)}
                    </View>
                </View>
            })}

        </View>
    }
    componentDidMount() {
        this.refresh();
    }
    refresh() {
        this.getModuleList();
    }

    /**
     * 获取楼层
     */
    async getModuleList() {
        try {
            let moduleList = await request.get(`/module/findModuleListV2.do?categoryId=`);
            if (moduleList && moduleList.length > 1) {
                let l0 = moduleList[0].moduleTemplates
                let l1 = moduleList[1].moduleTemplates
                if (l0.length == 1 && l1.length == 1 && l0[0].tplId == 13 && l1[0].tplId == 14) {
                    this.setState({
                        isMargin: true
                    })
                }
            }
            this.setState({
                list: moduleList || []
            })
        } catch (e) {
            toast(e.message);
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
