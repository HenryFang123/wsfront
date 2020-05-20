<template>
    <div>
        <div>
            <span style="font-size: 20px">欢迎光临:{{this.$store.getters.adminInfo.adminName}}</span><br>
            <span style="font-size: 20px;margin-top: 20px">您的店铺id为:{{this.$store.getters.adminInfo.businessId}}</span>
        </div>
        <div class="main-cards">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card class="box-card">
                        <el-col :span="12">
                            <i class="el-icon-s-goods"></i>
                        </el-col>
                        <el-col :span="12">
                            <div class="card-panel-text">累计订单</div>
                            <div class="card-panel-num">
                                {{this.orderCount}}
                            </div>
                        </el-col>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <el-col :span="12">
                            <i class="el-icon-s-custom"></i>
                        </el-col>
                        <el-col :span="12">
                            <div class="card-panel-text">累计顾客</div>
                            <div class="card-panel-num">{{this.customerCount}}</div>
                        </el-col>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <el-col :span="12">
                            <i class="el-icon-ice-cream-round"></i>
                        </el-col>
                        <el-col :span="12">
                            <div class="card-panel-text">累计收入</div>
                            <div class="card-panel-num">{{this.priceCount}}</div>
                        </el-col>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <el-col :span="12">
                            <i class="el-icon-document-copy"></i>
                        </el-col>
                        <el-col :span="12">
                            <div class="card-panel-text">上架图书</div>
                            <div class="card-panel-num">{{this.bookCount}}</div>
                        </el-col>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";
    export default {
        name: "BackDashboard.vue",
        data() {
            return {
                orderCount : '',
                bookCount : '',
                customerCount : '',
                priceCount : ''
            }
        },
        created() {
            this.getOrderCount();
            this.getBookCount();
            this.getCustomerCount();
            this.getPriceCount();
        },
        methods: {
            getOrderCount() {
                let params = {
                    businessId: this.$store.getters.adminInfo.businessId,
                };
                ws_axios.fetchPost1('/order/getOrderSumCountByBusinessId', params).then((back) => {
                    this.orderCount = back.data;
                });
            },
            getBookCount(){
                let params = {
                    businessId: this.$store.getters.adminInfo.businessId,
                };
                ws_axios.fetchPost1('/book/getBookInfoCountByBusinessId', params).then((back) => {
                    this.bookCount = back.data;
                });
            },
            getCustomerCount(){
                let params = {
                    businessId: this.$store.getters.adminInfo.businessId,
                };
                ws_axios.fetchPost1('/order/getCustomerCountByBusinessId', params).then((back) => {
                    this.customerCount = back.data;
                });
            },
            getPriceCount(){
                let params = {
                    businessId: this.$store.getters.adminInfo.businessId,
                };
                ws_axios.fetchPost1('/order/getPriceCountByBusinessId', params).then((back) => {
                    this.priceCount = back.data;
                });
            }
        }
    }
</script>

<style scoped>
    .main-cards{
        margin-top: 20px;
    }
    .el-card .el-col:first-child {
        color: #34BFA3;
        font-size: 400%
    }

    .box-card {
        height: 108px;
    }

    .chart {
        height: 350px;
    }

    .section {
        padding: 20px;
        background-color: white;
        border: 1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    .box-card > div > div > .svg-icon {
        width: 4em;
        height: 4em;
        color: #34bfa3;
    }

    .card-panel-text {
        padding-top: 10px;
        font-size: 16px;
        color: gray;
    }

    .card-panel-num {
        padding-top: 10px;
        font-size: 20px;
        font-weight: bold;
    }
</style>
