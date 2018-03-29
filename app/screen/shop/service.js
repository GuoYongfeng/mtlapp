//购物车
import {
    observable,
    extendObservable,
    action,
    useStrict,
    autorun,
    runInAction
} from 'mobx';

export default class {
    //购物车用到的数据
    data = extendObservable(this, {
        dis_count: 0,
        goods_amount: "0",
        goods_count: 0,
        is_in_bond: 0,
        list: [],
        total_count: 0,
        total_price: "0",
        total_reduce: "0"
    });
    //初次加载是否完成
    isLoaded = observable(false);
    //初始化
    init = action(() => {
        this.isLoaded = false;
        this.update();
    });
    //重设
    reset() {
        runInAction(() => {
            this.data.total_count = 0;
            this.data.total_price = "0";
            this.data.total_reduce = "0";
            this.data.list = [];
            this.isLoaded = true;
            this.data.goods_count = 0;
        })
    }
    //更新购物车内容
    update = action(() => {
        let list = [{
            benefitMoney: '3.00',
            buyLimitNum: 0,
            can_select: 1,
            goodsName: "MAC/魅可子弹头口红 Dangerous (3g )",
            goodsShowDesc: '[MAC]MAC/魅可子弹头口红 Dangerous (3g )',
            goodsShowName: '美国·抢镜的必备法宝',
            goods_price: '384.00',
            id: '11',
            image: 'http://img4.daling.com/data/files/mobile/2017/11/30/15120349684184.jpg_300x300.jpg',
            isBuyLimit: 0,
            isForeignSupply: 1,
            isInBond: 1,
            limitStock: 400,
            marketPrice: '170.00',
            quantity: 3,
            salePrice: "128.00",
            select_status: 0
        },
        {
            benefitMoney: '3.00',
            buyLimitNum: 0,
            can_select: 1,
            goodsName: "MAC/魅可子弹头口红 Dangerous (3g )",
            goodsShowDesc: '[MAC]MAC/魅可子弹头口红 Dangerous (3g )',
            goodsShowName: '美国·抢镜的必备法宝',
            goods_price: '384.00',
            id: '22',
            image: 'http://img4.daling.com/data/files/mobile/2017/11/30/15120349684184.jpg_300x300.jpg',
            isBuyLimit: 0,
            isForeignSupply: 1,
            isInBond: 1,
            limitStock: 400,
            marketPrice: '170.00',
            quantity: 3,
            salePrice: "128.00",
            select_status: 0
        }]
        this.data.total_count = 3;
        this.data.total_price = "0";
        this.data.total_reduce = "0";
        this.data.list = list;
        this.isLoaded = true;
        this.data.goods_count = 0;
    })
    /**
     * 选中,取消选中
     */
    select = action(async (id, status) => {
        this.data.list.filter(item => item.id == id).map(item => item.select_status = status == 0 ? 1 : 0)
        //执行选中之后的请求
    });
    /**
     * 是否选中了所有
     */
    isSelectAll = observable(false);
    /**
     * 选中全部
     */
    selectAll = action(async () => {
        this.isSelectAll = !this.isSelectAll;
        let ids = [];
        this.data.list.map(item => {
            item.select_status = this.isSelectAll ? 1 : 0;
            ids.push(item.id);
            return item;
        });
        ids = ids.join(',');
        //执行全选操作        
    });
    /**
     * 数量减少
     */
    reduce = action(async (id, num) => {
        num = Number(num);
        num--;
        this.data.list.filter(item => item.id == id).map(item => {
            item.quantity = num
        })
        //减少数量
    });
    /**
     * 增加数量
     */
    plus = action(async (id, num, isBuyLimit, buyLimitNum, buyLimitMsg) => {
        num = Number(num);
        if (isBuyLimit == 1 && num >= buyLimitNum) {
            toast(`该商品为限购商品,${buyLimitMsg}`);
            return;
        }
        num++;
        this.data.list.filter(item => item.id == id).map(item => {
            item.quantity = num
        })
        //执行减少操作,注意出错的情况下回复原来的数量
    });
    /**
     * 直接设置数量
     */
    setNum = action((id, num) => {
        this.data.list.filter(item => item.id == id).map(item => {
            if (!item.old) item.old = item.quantity;
            item.quantity = num;
        })
    });
    /**
     * 改变数量
     */
    changeNum = action(async (id) => {
        let num = 0;
        let old = 0;
        this.data.list.forEach(res => {
            if (res.id == id) {
                num = res.quantity; old = res.old;
            }
        });
        if (num == old) return;
        //修改数量的请求
    });
    /**
     * 删除单个商品
     * @param {*} id 
     */
    del(id) {
        for (let i = 0; i < this.data.list.length; i++) {
            if (this.data.list[i].id == id) {
                return this.data.list.splice(i, 1);
            }
        }
    }
    /**
     * 删除部分商品
     */
    deleteGoods = action(async (ids) => {
        for (let id of ids) this.del(id);
        //删除的请求
    });
    /**
     * 删除所有
     */
    deleteAll = action(async () => {
        this.data.list.length = 0;
        //删除所有的请求
    });
    /**
     * 添加到购物车
     */
    addCart = action(async (id, num) => {
        this.data.total_count += num * 1;
        //添加的请求
        return this.data.total_count;
    });
    addCartAll = async (id, num) => {
        this.data.total_count += num * 1;
        //添加
        return this.data.total_count;
    };

}