
import px from '../../utils/responsive'

//订单列表
class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            list: [],
            empty: ""
        };
    }

    render() {
        return <FlatList style={{ flex: 1 }}
            refreshing={this.state.refreshing}
            data={this.state.list}
            onRefresh={() => this.refresh()}
            keyExtractor={(item) => item.orderNo}
            onEndReached={() => this.next()}
            renderItem={({ item }) =>
                <OrderItem
                    order={item}
                    navigation={this.props.navigation} />
            }
            ListEmptyComponent={
                <Text allowFontScaling={false} style={orderListStyles.emptyList}>{this.state.empty}</Text>
            } />
    }
    componentDidMount() {
        this.refresh()
    }
    pageIndex = 0;
    //获取第一页的数据
    refresh() {
        this.pageIndex = 0;
        let list = [];
        try {
            for (let index = 0; index < 10; index++) {
                let expressList = [];
                for (let j = 0; j < 2; j++) {
                    expressList.push({
                        id: j,
                        prodImg: "http://img4.daling.com/data/files/mobile/2017/11/30/15120349684184.jpg_300x300.jpg",
                        goodsName: "MAC/魅可子弹头口红 Dangerous (3g )",
                        prodPrice: "126.00",
                        prodQty: 1,
                        refundQty: j
                    })
                }
                list.push({
                    orderNo: "NO" + index + '210928893289287sw',
                    id: index,
                    orderStatusNm: this.props.tabLabel,
                    payableAmount: (120 + index) + ".00",
                    payAmount: (110 + index) + ".00",
                    expressList: expressList,
                })
            }
        } catch (e) {
            toast(e.message)
        }
        if (list.length === 0) {
            //设置空列表的文字
            this.state.empty = "暂无订单"
        }
        this.setState({ list, empty: this.state.empty })
    }
    //加载下一页可以自己来实现
    next() { }
}

const orderListStyles = {
    emptyList: {
        flex: 1,
        fontSize: px(26),
        marginTop: px(50),
        textAlign: 'center',
        color: '#858385'
    }
}


