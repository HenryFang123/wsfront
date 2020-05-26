<template>
    <div class="shop_car-page">
        <Header/>
        <div class="shop_car" v-if="this.$store.state.resultInfo.shopCarInfo.number">
            <el-container style="border: 1px solid #eee">
                <el-header style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); height: 100px;">
                    <el-row style="margin-top: 5px; padding: 0; display: flex">
                        <el-col :span="4"/>
                        <el-col :span="20" style="text-align: left;">
                            <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-top: 10px;">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>购物车</el-breadcrumb-item>
                            </el-breadcrumb>

                        </el-col>
                    </el-row>

                    <el-row style="margin-top: 10px; padding: 0; display: flex">
                        <el-col :span="4"/>
                        <el-col :span="16" style="text-align: left;padding-top: 4px;">
                            <span style="font-family:Microsoft YaHei; font-size: 20px; color: #F56C6C;">全部商品</span>
                        </el-col>
                        <el-col :span="4"/>
                    </el-row>

                    <el-row style="margin-top: 6px; padding: 0; display: flex;">
                        <el-col :span="4"/>
                        <el-col :span="16">
                            <div class="select-item-show" style="padding-left: 5px;">
                                <el-row >
                                    <el-col :span="2" style="margin-left: 13px;">
                                        <el-checkbox :indeterminate="isIndeterminate" v-model="allSelect"
                                                     @change="CheckAllSelect">全选
                                        </el-checkbox>
                                    </el-col>
                                    <el-col style="text-align: left" :span="14"><span
                                        style="font-size: 14px;padding-left: 20px;">商品</span></el-col>
                                    <el-col style="margin-left: 0;" :span="2" ><span
                                        style="font-size: 14px;">单价</span></el-col>
                                    <el-col style="margin-left: 4px;" :span="2"><span
                                        style="font-size: 14px;">数量</span></el-col>
                                    <el-col style="margin-left: 15px;" :span="1"><span
                                        style="font-size: 14px;">小计</span></el-col>
                                    <el-col style="margin-left: 25px;text-align: center" :span="1"><span
                                        style="font-size: 14px;">操作</span></el-col>
                                    <el-col :span="2"/>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="4"/>
                    </el-row>
                </el-header>

                <el-main style="margin: 5px auto; padding: 0; width: 100%;">
                    <el-row style="padding: 0; display: flex;">
                        <el-col :span="4"/>
                        <el-col :span="16">
                            <div style="margin-top: 0;border-radius: 2px;background-color: #F2F6FC;padding: 5px; width: 100%;height: 530px;">
                                <el-row style="margin-top: 10px;margin-left: 11px;" :key="bookItem.id"
                                        v-for="(bookItem, index) in curPageList">
                                    <el-col :span="2">
                                        <el-checkbox-group v-model="select" @change="CheckedBookSelect">
                                            <el-checkbox :label="bookItem.id"><span/></el-checkbox>
                                        </el-checkbox-group>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-image :src="bookItem.book_image_path" style="width: 75px;height: 85px;"/>
                                    </el-col>
                                    <el-col :span="12" style="text-align: left">
                                        <span style="font-size: 13px;font-family:Microsoft YaHei ">{{bookItem.book_name}}</span>
                                    </el-col>
                                    <el-col :span="2">
                                        <span style="font-family: Microsoft YaHei; font-size: 13px;">{{bookItem.book_price | showPrice}}</span>
                                    </el-col>
                                    <el-col :span="2">
                                        <button @click="decrement(index)" :disabled="bookItem.book_number<=1"
                                                style="background-color:#F2F6FC; outline: none; font-size: 22px;">-</button>
                                        <input type="text" v-model.lazy.number="bookItem.book_number" size="1px;" style="text-align: center;outline: none;background-color: #FFFFFF"
                                               onkeyup="if(this.value.length<=1){this.value=this.value.replace(/[^1-9]/g,1)}else{this.value=this.value.replace(/\D/g,'')}"
                                               onafterpaste="if(this.value.length<=1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
                                        <button @click="increment(index)" style="background-color:#F2F6FC; outline: none; font-size: 22px;">+
                                        </button>
                                    </el-col>
                                    <el-col style="text-align: center;" :span="2"><b>{{getBookPrice(index) | showPrice}}</b></el-col>
                                    <el-col :span="2" style="text-align: center">
                                        <el-popover
                                            placement="left-start"
                                            width="100"
                                            trigger="hover"
                                            content="将此物品移入您的收藏单中">
                                            <el-button type="warning" icon="el-icon-star-off" circle size="mini"
                                                       slot="reference" @click=""/>
                                        </el-popover>
                                        <el-popconfirm
                                            confirmButtonText='删除'
                                            cancelButtonText='再想想'
                                            icon="el-icon-delete"
                                            confirmButtonType="danger"
                                            iconColor="#FF3228"
                                            title="您确定将此物品删除吗?"
                                            @onConfirm="remove(index)">
                                            <el-button slot="reference" type="danger" icon="el-icon-delete" circle
                                                       size="mini" style="margin-left: 2px"/>
                                        </el-popconfirm>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4"/>
                                    <el-col :span="16" style="text-align: center">
                                        <div :style="{position:'relative',top:paginationtop}">
                                            <el-pagination
                                                @current-change="handleCurrentChange"
                                                :current-page="this.currentPage"
                                                :page-size="this.pageSize"
                                                layout="total, prev, pager, next"
                                                :total="this.itemTotal"
                                                background
                                                :hide-on-single-page="this.singlePage">
                                            </el-pagination>
                                        </div>
                                    </el-col>
                                    <el-col :span="4"/>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="4"/>
                    </el-row>
                    <el-row style="margin-top: 6px; padding: 0; display: flex;">
                        <el-col :span="4"/>
                        <el-col :span="16">
                            <div class="settle-shop-car">
                                <el-row>
                                    <el-col :span="14"/>
                                    <el-col :span="8" style="text-align: right">总价：
                                        <span style="color: red;font-size: 30px;padding-top: 15px;"><b>{{totalPrice | showPrice}}</b></span>
                                    </el-col>
                                    <el-col :span="2">
                                        <div class="go-buy-it" @click="gotoSettlement">
                                            <b>去结算</b><br/>
                                            <i class="el-icon-thumb"/>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="4"/>
                    </el-row>
                </el-main>
            </el-container>
        </div>
        <div v-else style="width: 100%;">
            <el-row><br/></el-row>
            <el-row><br/></el-row>
            <el-row>
                <el-col :span="6"/>
                <el-col :span="6">
                <img src="~assets/img/payImage/shop_car_empty.png" style="height: 264px;width: 336px"/>
                </el-col>
                <el-col :span="8" style="text-align:left">
                    <br/>
                    <br/>
                    <br/>
                    <span style="font-size: 17px;font-family:Microsoft YaHei">您的购物车还是空的，您可以:
                        <el-link type="danger" @click="gotoHome" style="font-size: 18px;font-family:Microsoft YaHei" :underline="false">
                            去逛逛</el-link>
                    </span>
                </el-col>
                <el-col :span="4"/>
            </el-row>
            <el-row><br/></el-row>
            <el-row><br/></el-row>
            <el-row><br/></el-row>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from '../header/Header'
    import Footer from '../footer/Footer'
    import ws_axios from "network/ws_axios";

    export default {
        name: "ShopCar.vue",
        components: {
            Header, Footer
        },
        data() {
            return {
                allSelect: true,
                isIndeterminate: false,
                currentPage: 1,
                pageSize: 5,
                itemTotal: 1,
                singlePage:false,
                select: [],
                selectId: [],
                curPageList: [],
                num:[],
                paginationtop:''
            }
        },
        created() {
            this.init();
            document.documentElement.scrollTop=192;
        },
        updated() {
            for (let i=0; i< this.curPageList.length; i++) {
                let k = this.curPageList[i].id -1;
                if (this.num[k] !== this.curPageList[i].book_number) {
                    this.$set(this.num, k, this.curPageList[i].book_number);
                    const params = {
                        'shopCarId': this.curPageList[i].shop_car_id,
                        'bookNumber': this.curPageList[i].book_number
                    };
                    ws_axios.fetchPost1('/shopCar/updateShopCarInfoBookNumberChange', params);
                }
            }
            if(this.curPageList.length === 5){this.paginationtop = ''}
            else if(this.curPageList.length === 4){this.paginationtop = '99px'}
            else if(this.curPageList.length === 3){this.paginationtop = '198px'}
            else if(this.curPageList.length === 2){this.paginationtop = '297px'}
            else if(this.curPageList.length === 1){this.paginationtop = '396px'}
            else {this.paginationtop = '495px'}
        },
        beforeDestroy() {
            for(let i in this.num){
                if(this.num[i] !== -1){
                    if(this.num[i] !== this.$store.state.resultInfo.shopCarInfo.list[i].book_number){
                        const params = {
                            'shopCarId': this.$store.state.resultInfo.shopCarInfo.list[i].shop_car_id,
                            'bookNumber': this.num[i]
                        };
                        ws_axios.fetchPost1('/shopCar/updateShopCarInfoBookNumberChange', params);
                    }
                }
            }
        },
        methods: {
            //存在传入的index形参，不能用计算属性来完成
            getBookPrice(index) {
                return this.curPageList[index].book_price * this.curPageList[index].book_number
            },

            decrement(index) {
                this.curPageList[index].book_number--;
                let k = this.curPageList[index].id -1;
                this.$set(this.num,k,this.curPageList[index].book_number)
            },

            increment(index) {
                this.curPageList[index].book_number++;
                let k = this.curPageList[index].id -1;
                this.$set(this.num,k,this.curPageList[index].book_number)
            },

            remove(index) {
                let k = this.curPageList[index].id -1;
                this.num.splice(k,1,-1);
                this.select.splice(k,1);
                ws_axios.fetchPost1('/shopCar/deleteShopCarInfoByShopCarId', {'shopCarId': this.curPageList[index].shop_car_id})
                this.$store.state.resultInfo.shopCarInfo.number-- ;
                this.curPageList.splice(index,1);
            },

            // val有值时是this.selectId否则为空[]
            CheckAllSelect(val) {
                this.select = val ? this.selectId : [];
                this.isIndeterminate = false;
            },

            // value.length是选中的多少项
            CheckedBookSelect(value) {
                let checkedCount = value.length;
                this.allSelect = checkedCount === this.$store.state.resultInfo.shopCarInfo.list.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.$store.state.resultInfo.shopCarInfo.list.length;
            },

            init() {
                this.itemTotal = this.$store.state.resultInfo.shopCarInfo.list.length;
                if(this.itemTotal <= 5){
                    this.singlePage = true;
                    this.curPageList = this.$store.state.resultInfo.shopCarInfo.list
                }
                else {
                    for(let i = 0; i < 5 ; i++){
                        this.curPageList[i] = this.$store.state.resultInfo.shopCarInfo.list[i]
                    }
                }
                for (let i in this.$store.state.resultInfo.shopCarInfo.list) {
                    this.selectId.push(this.$store.state.resultInfo.shopCarInfo.list[i].id);
                    this.num.push(this.$store.state.resultInfo.shopCarInfo.list[i].book_number)
                }
                this.select = this.selectId;
            },

            gotoHome() {
                this.$router.push("/")
            },

            gotoSettlement() {
                if (this.select.length === 0){
                    this.$message({
                        showClose: true,
                        message: '请选择要结算的购物车！',
                        type: 'warning'
                    });
                } else {
                    let id = [];
                    this.randomNumber(this.select.length, 15, function (arr) {
                        id = arr
                    })
                    for (let i in this.select) {
                        let toltal = this.$store.state.resultInfo.shopCarInfo.list[this.select[i] - 1].book_price * this.num[this.select[i] - 1]
                        let address = '';
                        for (let k of this.$store.state.currShippingAddress) {
                            if (k.ifDefaultAddress === 1) {
                                address = k.detail
                            }
                        }
                        let params = {
                            'orderId': id[i],
                            'userAddress': address,
                            'userId': this.$store.state.currUserInfo.userId,
                            'userPhone': this.$store.state.currUserInfo.userPhone,
                            'businessId': this.$store.state.resultInfo.shopCarInfo.list[this.select[i] - 1].business_id,
                            'bookId': this.$store.state.resultInfo.shopCarInfo.list[this.select[i] - 1].book_id,
                            'bookName': this.$store.state.resultInfo.shopCarInfo.list[this.select[i] - 1].book_name,
                            'bookImagePath': this.$store.state.resultInfo.shopCarInfo.list[this.select[i] - 1].book_image_path,
                            'bookNumber': this.num[parseInt(this.select[i] - 1)],
                            'totalPrice': toltal.toFixed(2)
                        };
                        ws_axios.fetchPost1('/order/insertOrderInfo', params).then((back) => {
                            ws_axios.fetchPost1('/shopCar/deleteShopCarInfoByShopCarId', {'shopCarId': this.$store.state.resultInfo.shopCarInfo.list[this.select[i] - 1].shop_car_id})
                        });
                        this.$store.state.resultInfo.orderInfo.number++;
                    }
                    this.$router.push("/settlement_page")
                }
            },

            handleCurrentChange(val) {
                if(this.$store.state.resultInfo.shopCarInfo.number <= 5){
                    this.singlePage = true;
                    location.reload()
                }
                this.currentPage = val;
                let n = (val-1) * 5;
                for(let i = n,k = 0;i < n+5 ;i++,k++){
                    if(this.$store.state.resultInfo.shopCarInfo.list[i] !== undefined){
                    this.curPageList[k] = this.$store.state.resultInfo.shopCarInfo.list[i]
                    }
                    else {this.curPageList.pop()}
                }
            },

            // 产生不重复的随机数: num(产生数量)  digits(生成位数) callback(回调函数)
            randomNumber(num,digits,callback){
                let RandomArr = [];
                let RandomTotal= 0;
                function createRandom(num ,digit){
                    if(RandomArr.length === 0){
                        RandomTotal = num;
                    }
                    let start = "1";
                    let end ="9";
                    let wint = parseInt(digit);
                    for(let i=1;i<wint;i++){
                        start+="0";
                        end+="0";
                    }
                    for(let i=0;i<parseInt(num);i++){
                        let code =parseInt(Math.random()*parseInt(end)+parseInt(start));
                        let str = ","+RandomArr.toString()+",";
                        if(str.indexOf(","+code+",") === -1){
                            RandomArr.push(code);
                        }
                    }
                    //Remove duplication
                    let cha = RandomTotal-RandomArr.length;
                    if(cha<=0){
                        callback(RandomArr);
                        RandomArr=[];
                        RandomTotal=0;
                    }else{
                        createRandom(cha,digit)
                    }
                }
                createRandom(num,digits);
            }
        },

        filters: {
            showPrice(price) {
                return '￥' + price.toFixed(2)
            },
        },

        computed: {
            totalPrice() {
                let result = 0;
                for (let i in this.select) {
                    let k = parseInt(this.select[i] - 1);
                    result += this.$store.state.resultInfo.shopCarInfo.list[k].book_price * this.num[k]
                }
                return result
            }
        }
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .shop_car-page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
    }
    .shop_car {
        padding: 0;
        margin: 0 auto;
        width: 100%;
    }

    .select-item-show {
        border-radius: 4px;
        background-color: #DCDFE6;
        height: 20px;
        width: 100%;
    }

    .settle-shop-car {
        border-radius: 4px;
        background-color: #EBEEF5;
        height: 50px;
    }

    .go-buy-it {
        background-color: #FF3228;
        text-align: center;
        width: 85px;
        height: 45px;
        border-radius: 4px;
        margin-left: 10px;
        padding-top: 5px;
        color: #FFFFFF;
    }
    .el-col{
        min-height: 1px;
    }

    .el-header{
        padding: 0;
    }
    .el-button--danger{
        background-color: #FF3228;
    }
</style>
