<template>
    <div class="shop_car-page">
        <Header/>

        <div class="shop_car" v-if="this.order.length">
            <el-container style="border: 1px solid #eee">
                <el-header style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); height: 100px">
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
                            <span style="font-family:Microsoft YaHei; font-size: 20px; color: #F56C6C;">订单</span>
                        </el-col>
                        <el-col :span="4"/>
                    </el-row>

                    <el-row style="margin-top: 6px; padding: 0; display: flex;">
                        <el-col :span="4"/>
                        <el-col :span="16">
                            <div class="select-item-show" style="padding-left: 5px;">
                                <el-row>
                                    <el-col :span="2"/>
                                    <el-col style="text-align: left" :span="14"><span
                                        style="font-size: 14px;padding-left: 20px;">商品</span></el-col>
                                    <el-col  :span="2"/>
                                    <el-col  :span="2"><span
                                        style="font-size: 14px;">数量</span></el-col>
                                    <el-col style="text-align: center" :span="2"><span
                                        style="font-size: 14px;">小计</span></el-col>
                                    <el-col  :span="2"/>
                                </el-row>
                            </div>
                        </el-col>

                        <el-col :span="4"/>
                    </el-row>
                </el-header>

                <!--  订单项-->
                <el-main style="margin: 5px auto; padding: 0; width: 100%;">
                    <el-row style="padding: 0; display: flex;">
                        <el-col :span="4"/>
                        <el-col :span="16">
                            <div style="margin-top: 0;border-radius: 2px;background-color: #F2F6FC;padding: 5px; width: 100%;">
                                <el-row style="margin-left: 13px;margin-top: 10px;" :key="index"
                                        v-for="(bookItem, index) in this.order">
                                    <el-col :span="2"/>
                                    <el-col :span="2">
                                        <el-image :src="bookItem.bookImagePath"
                                                  style="width: 75px;height: 75px;"/>
                                    </el-col>
                                    <el-col :span="12" style="text-align: left">
                                        <span style="font-size: 13px;font-family:Microsoft YaHei ">{{bookItem.bookName}}</span>
                                    </el-col>
                                    <el-col :span="2"/>
                                    <el-col :span="2">
                                       <span style="font-size: 13px;font-family:Microsoft YaHei;">{{bookItem.bookNumber}}</span>
                                    </el-col>
                                    <el-col style="text-align: center;" :span="2"><b>{{bookItem.totalPrice | showPrice}}</b></el-col>
                                    <el-col :span="2">
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
                                        <span style="color: red;font-size: 25px;"><b>{{totalPrice | showPrice}}</b></span>
                                    </el-col>
                                    <el-col :span="2">
                                        <div class="go-buy-it" @click="gotoPayDone" v-if="!isShow">
                                            <b>去付款</b><br/>
                                            <i class="el-icon-right"></i>
                                        </div>
                                        <div v-else class="go-buy-it2">
                                            <b>您已付款</b><br/>
                                            <i class="el-icon-finished"></i>
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
        <div v-else style="width: 100%;height: 70%;">
            <el-row>
                <el-col style="text-align: center"><h1>订单为空</h1></el-col>
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
        name: "SettlementPage.vue",
        components: {
            Header, Footer
        },
        data() {
            return {
                order:[],
                isShow:''
            }
        },
        created(){
            // ws_axios.setBaseIrl(1);
            ws_axios.fetchPost1('/order/getOrdersByUserId',{'userId':this.$store.state.userInfo.userId}).then((back)=>{
                this.order=back.data
            })
            this.isShow = this.$store.state.resultInfo.orderConfirm
            console.log(this.$store.state.resultInfo.orderConfirm)
        },
        methods:{
            gotoHome() {
                this.$router.push("/")
            },
            gotoPayDone(){
                this.$router.push("/")
            }
        },
        filters: {
            showPrice(price) {
                return '￥' + price.toFixed(2)
            },
        },
        computed: {
            totalPrice() {
                return this.order.reduce(function (prevalue,n) {
                            return prevalue + n.totalPrice
                },0)
            }
        }
    }
</script>

<style>
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

    .go-buy-it2 {
        background-color: #E6A23C;
        text-align: center;
        width: 85px;
        height: 45px;
        border-radius: 4px;
        margin-left: 10px;
        padding-top: 5px;
        color: #FFFFFF;
    }

    .el-col {
        min-height: 1px;
    }
    .el-header{
        padding: 0px;
    }
</style>
