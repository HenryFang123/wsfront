<template>
    <div class="settlement-page">
        <Header/>

        <div class="settlement" v-if="this.$store.state.resultInfo.orderInfo.list.length">
            <el-container style="border: 1px solid #eee">
                <el-header style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); height: 100px">
                    <el-row style="margin-top: 5px; padding: 0; display: flex">
                        <el-col :span="4"/>
                        <el-col :span="20" style="text-align: left;">
                            <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-top: 10px;">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>我的订单</el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                    </el-row>

                    <el-row style="margin-top: 10px; padding: 0; display: flex">
                        <el-col :span="4"/>
                        <el-col :span="16" style="text-align: left;padding-top: 4px;">
                            <span style="font-family: Microsoft YaHei; font-size: 20px; color: #F56C6C;">订单</span>
                        </el-col>
                        <el-col :span="4"/>
                    </el-row>

                    <el-row style="margin-top: 6px; padding: 0; display: flex;">
                        <el-col :span="4"/>
                        <el-col :span="16">
                            <div class="select-item-show" style="padding-left: 5px;">
                                <el-row>
                                    <el-col style="text-align: left;margin-left: 10px;" :span="12"><span
                                        style="font-size: 14px;padding-left: 20px;">商品</span></el-col>
                                    <el-col  :span="2"><span
                                        style="font-size: 14px;">数量</span></el-col>
                                    <el-col style="text-align: center" :span="2"><span
                                        style="font-size: 14px;">小计</span></el-col>
                                    <el-col style="text-align: center" :span="4"><span
                                        style="font-size: 14px;">收货信息</span>
                                    </el-col>
                                    <el-col style="text-align: center" :span="3"><span
                                        style="font-size: 14px;">操作</span></el-col>
                                    <el-col :span="1"/>
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
                                <el-row style="margin-left: 13px;margin-top: 10px;" :key="index"  v-infinite-scroll=""
                                        v-for="(bookItem, index) in this.$store.state.resultInfo.orderInfo.list">
                                    <el-col :span="2" style="margin-left: 10px;">
                                        <el-image :src="bookItem.bookImagePath"
                                                  style="width: 75px;height: 85px;"/>
                                    </el-col>
                                    <el-col :span="9" style="text-align: left">
                                        <span style="font-size: 13px;font-family:Microsoft YaHei ">{{bookItem.bookName}}</span>
                                    </el-col>
                                    <el-col :span="1"/>
                                    <el-col :span="2">
                                       <span style="font-size: 13px;font-family:Microsoft YaHei;">{{bookItem.bookNumber}}</span>
                                    </el-col>
                                    <el-col style="text-align: center;" :span="2"><b>{{bookItem.totalPrice | showPrice}}</b></el-col>
                                    <el-col :span="4" style="text-align: center;">
                                        <el-select v-model="tempAddress[index]" size="mini" @change="changeAddress($event,index)">
                                        <el-option
                                            v-for="item in allAddress"
                                            :key="item.id"
                                            :label="item.detail"
                                            :value="item.detail">
                                        </el-option>
                                    </el-select>
                                    </el-col>
                                    <el-col :span="3" style="text-align: center">
                                        <el-button type="info" round size="mini" icon="el-icon-close" @click="deleteOrder($event,index)"/>
                                    </el-col>
                                    <el-col :span="1"/>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="4"/>
                    </el-row>

                    <!--取消订单弹出框 -->
                    <el-dialog title="您确定取消订单吗？取消订单后不能恢复！" :visible.sync="dialogFormVisible">
                        <el-form :model="dialogForm" :rules="rules" ref="dialogForm" >
                            <el-form-item label="请选择取消原因:" prop="radio" label-width="150px" :rules="rules.radio">
                                <el-radio-group v-model="dialogForm.radio">
                                    <el-radio   label="我不想买了">我不想买了</el-radio>
                                    <el-radio   label="信息填写错误">信息填写错误</el-radio>
                                    <el-radio   label="卖家缺货">卖家缺货</el-radio>
                                    <el-radio   label="其他原因">其他原因</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <div style="text-align: right;">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-dialog>

                    <el-row style="margin-top: 6px; padding: 0; display: flex;">
                        <el-col :span="4"/>
                        <el-col :span="16">
                            <div class="settle-settlement">
                                <el-row>
                                    <el-col :span="13"/>
                                    <el-col :span="8" style="text-align: right">总价：
                                        <span style="color: red;font-size: 25px;"><b>{{totalPrice | showPrice}}</b></span>
                                    </el-col>
                                    <el-col :span="1"/>
                                    <el-col :span="2">
                                        <div class="go-buy-it" @click="gotoPayDone">
                                            <b>去付款</b><br/>
                                            <i class="el-icon-right"/>
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
                    <span style="font-size: 17px;font-family:Microsoft YaHei">您暂时没有未付款订单，您可以:
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
        name: "SettlementPage.vue",
        components: {
            Header, Footer
        },
        data() {
            return {
                dialogFormVisible: false,
                curIndex:0,
                allAddress:[],
                curAddress:'',
                tempAddress:[],
                dialogForm: {
                    radio: [],
                },
                rules: {
                    radio: [
                        { required: true, message: '☆ 请选择取消原因!', trigger: 'change' }
                    ]
                }
            }
        },
        created(){
            document.documentElement.scrollTop=192;
            for(let k of this.$store.state.currShippingAddress){
                if(k.ifDefaultAddress === 1){this.curAddress = k.detail}
                this.allAddress.push({'id':k.id,
                    'detail':k.detail})
            }
            for(let i =0;i< this.$store.state.resultInfo.orderInfo.number;i++){
               this.tempAddress.push(this.$store.state.resultInfo.orderInfo.list[i].userAddress)
            }
        },
        updated() {

        },
        methods:{
            changeAddress(event,index){
                if(this.$store.state.resultInfo.orderInfo.list[index].userAddress !== event){
                    let param = {
                        'orderId':this.$store.state.resultInfo.orderInfo.list[index].orderId,
                        'userAddress': event
                    };
                    ws_axios.fetchPost1('/order/updateUserAddressByOrderId',param)
                }

            },
            deleteOrder(event,index){
                this.dialogFormVisible=true;
                this.curIndex = index;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        let parm = {
                            'orderId':this.$store.state.resultInfo.orderInfo.list[this.curIndex].orderId,
                            'orderInfo':'已取消：'+this.dialogForm.radio
                        };
                        ws_axios.fetchPost1('/order/deleteOrderInfoByOrderId', parm);
                        this.$store.state.resultInfo.orderInfo.list.splice(this.curIndex,1);
                        this.$refs[formName].resetFields();
                    } else {
                        return false;
                    }
                });
            },
            gotoHome() {
                this.$router.push("/")
            },
            gotoPayDone(){
                this.$router.push("/pay_done")
            }
        },
        filters: {
            showPrice(price) {
                return '￥' + price.toFixed(2)
            },
        },
        computed: {
            totalPrice() {
                return this.$store.state.resultInfo.orderInfo.list.reduce(function (prevalue,n) {
                    return prevalue + n.totalPrice
                },0)
            }
        }
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .settlement-page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
    }

    .settlement {
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

    .settle-settlement {
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
</style>
