<template>
    <div class="shop_car-page">
        <Header/>
        <div class="shop_car" v-if="this.$store.state.resultInfo.shopCarInfo.list.length">
            <el-container style="border: 1px solid #eee">
                <el-header style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); height: 100px;">
                    <el-row style="margin-top: 5px; padding: 0; display: flex">
                        <el-col :span="4"/>
                        <el-col :span="20" style="text-align: left;">
                            <el-link :underline="false" @click="gotoHome" icon="el-icon-caret-left" type="info">首页
                            </el-link>
                        </el-col>
                    </el-row>

                    <el-row style="margin-top: 10px; padding: 0; display: flex">
                        <el-col :span="4"/>
                        <el-col :span="16" style="text-align: left">
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
                                    <el-col style="margin-left: 25px;" :span="1"><span
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
                            <div style="margin-top: 0;border-radius: 2px;background-color: #F2F6FC;padding: 5px; width: 100%;">
                                <el-row style="margin-left: 13px;margin-top: 10px;" :key="bookItem.id"
                                        v-for="(bookItem, index) in this.$store.state.resultInfo.shopCarInfo.list">
                                    <el-col :span="2">
                                        <el-checkbox-group v-model="select" @change="CheckedBookSelect">
                                            <el-checkbox v-bind:label="bookItem.id"><span/></el-checkbox>
                                        </el-checkbox-group>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-image v-bind:src="bookItem.book_image_path"
                                                  style="width: 75px;height: 75px;"/>
                                    </el-col>
                                    <el-col :span="12" style="text-align: left">
                                        <span style="font-size: 13px;font-family:Microsoft YaHei ">{{bookItem.book_name}}</span>
                                    </el-col>
                                    <el-col :span="2">
                                        <span style="font-family: Microsoft YaHei; font-size: 13px;">{{bookItem.book_price | showPrice}}</span>
                                    </el-col>
                                    <el-col :span="2">
                                        <button @click="decrement(index)" :disabled="bookItem.book_number<=1"
                                                style="background-color:#EBEEF5; outline: none; font-size: 22px;">-
                                        </button>
                                        <input type="text" v-model.lazy.number="bookItem.book_number" size="1px;"
                                               style="text-align: center;outline: none;"
                                               onkeyup="if(this.value.length<=1){this.value=this.value.replace(/[^1-9]/g,1)}else{this.value=this.value.replace(/\D/g,'')}"
                                               onafterpaste="if(this.value.length<=1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
                                        <button @click="increment(index)"
                                                style="background-color:#EBEEF5; outline: none; font-size: 22px;">+
                                        </button>
                                    </el-col>
                                    <el-col style="text-align: center;" :span="2"><b>{{getBookPrice(index) |
                                        showPrice}}</b></el-col>
                                    <el-col :span="2">
                                        <el-button type="text" icon="el-icon-delete" @click="remove(index)"
                                                   style="padding-top: 0px;font-size: 13px">删除
                                        </el-button>
                                        <br/>
                                        <el-button type="text" icon="el-icon-star-on" @click=""
                                                   style="padding-top: 0px;font-size: 13px">移入收藏
                                        </el-button>
                                    </el-col>
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
                                    <el-col :span="1"/>
                                    <el-col :span="21" style="text-align: right">总价：
                                        <span
                                            style="color: red;font-size: 25px;"><b>{{totalPrice | showPrice}}</b></span>
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
            <el-row>
                <el-col style="text-align: center"><h1>购物车为空</h1></el-col>
            </el-row>
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
                select: [],
                selectId: [],
                curList: [],
                userPhone:'',
                userAddress: ''
            }
        },
        created() {
            this.init();
            ws_axios.fetchPost1('/user/getUserPhoneAndAddressByUserId',{'userId': this.$store.state.userInfo.userId}).then((back)=>{
                this.userPhone = back.data.userPhone;
                this.userAddress = back.data.userAddress
            })
        },
        beforeDestroy() {
            for (let i in this.curList) {
                let flag = false;
                for (let k in this.$store.state.resultInfo.shopCarInfo.list) {
                    if (this.$store.state.resultInfo.shopCarInfo.list[k].shop_car_id === this.curList[i].shopcarId) {
                        flag = true;
                        if (this.$store.state.resultInfo.shopCarInfo.list[k].book_number !== this.curList[i].bookNum) {
                            const params = {
                                'shopCarId': this.curList[i].shopcarId,
                                'bookNumber': this.$store.state.resultInfo.shopCarInfo.list[k].book_number
                        };
                            ws_axios.fetchPost1('/shopCar/updateShopCarInfoBookNumberChange', params)
                        }
                         break;
                    }
                }
                if (flag === false) {
                    ws_axios.fetchPost1('/shopCar/deleteShopCarInfoByShopCarId', {'shopCarId': this.curList[i].shopcarId})
                }
            }
        },
        methods: {
            //存在传入的index形参，不能用计算属性来完成
            getBookPrice(index) {
                if (this.$store.state.resultInfo.shopCarInfo.list[index].book_number < 1) {
                    this.$store.state.resultInfo.shopCarInfo.list[index].book_number = 1;
                }
                return this.$store.getters.shopCar_getBookPrice(index)
            },

            decrement(index) {
                this.$store.commit('decrement', index)
            },

            increment(index) {
                this.$store.commit('increment', index)
            },

            remove(index) {
                this.$store.commit('removeBookByIndex', index)
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
                for (let i = 0; i < this.$store.state.resultInfo.shopCarInfo.list.length; i++) {
                    this.selectId.push(this.$store.state.resultInfo.shopCarInfo.list[i].id);
                    this.curList.push({
                        shopcarId: this.$store.state.resultInfo.shopCarInfo.list[i].shop_car_id
                        ,bookNum: this.$store.state.resultInfo.shopCarInfo.list[i].book_number
                    })
                }
                this.select = this.selectId;
            },

            gotoHome() {
                this.$router.push("/")
            },

            gotoSettlement() {
                let id = [];
                this.randomNumber(this.select.length,9,function (arr) {id = arr})
                for(let i in this.select){
                    let params = {
                        'orderId':id[i],
                        'userAddress': this.userAddress,
                        'userId': this.$store.state.userInfo.userId,
                        'userPhone': this.userPhone,
                        'businessId':this.$store.state.resultInfo.shopCarInfo.list[this.select[i]-1].business_id,
                        'bookId':this.$store.state.resultInfo.shopCarInfo.list[this.select[i]-1].book_id,
                        'bookName':this.$store.state.resultInfo.shopCarInfo.list[this.select[i]-1].book_name,
                        'bookImagePath':this.$store.state.resultInfo.shopCarInfo.list[this.select[i]-1].book_image_path,
                        'bookNumber':this.$store.state.resultInfo.shopCarInfo.list[this.select[i]-1].book_number,
                        'totalPrice':this.$store.getters.shopCar_getBookPrice(this.select[i]-1).toFixed(2)
                    };
                    ws_axios.fetchPost1('/order/insertOrderInfo',params).then((back) => {
                        ws_axios.fetchPost1('/shopCar/deleteShopCarInfoByShopCarId', {'shopCarId': this.$store.state.resultInfo.shopCarInfo.list[this.select[i]-1].shop_car_id})
                    });
                }
                //this.$store.commit('setOrderNum',this.select.length)
                this.$store.commit('setOrderConfirm',false);
                this.$router.push("/settlement_page")
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
                for (let index in this.$store.state.resultInfo.shopCarInfo.list) {
                    result += this.$store.getters.shopCar_getBookPrice(index);
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
</style>
