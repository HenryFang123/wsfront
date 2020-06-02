<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-grid"/> 订单详情
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="block">
                <el-row>
                    <el-col :span="24">
                        <el-button size="mini" v-print="'#print'">打 印</el-button>
                    </el-col>
                </el-row>
            </div>

            <el-form id="print" label-width="150px">
                <el-row>
                    <h3>基本信息</h3>
                    <el-col :span="12">
                        <el-form-item label="订单号" style="font-weight: bold">
                            <span>{{form.orderId}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单用户" style="font-weight: bold">
                            {{form.userPhone}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态" style="font-weight: bold">
                            <span>
                                <el-tag v-if="form.orderState===2" type="danger">未发货</el-tag>
                                <el-tag v-if="form.orderState===3" type="success">已发货</el-tag>
                                <el-tag v-if="form.orderState===4" type="danger">退货中</el-tag>
                            </span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单备注" style="font-weight: bold">
                            <span></span>
                        </el-form-item>
                    </el-col>
                    <h3>收货信息</h3>
                    <el-col :span="12">
                        <el-form-item label="收货人" style="font-weight: bold">
                            <span>{{form.consignee}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" style="font-weight: bold">
                            <span>{{form.postPhone}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货地址" style="font-weight: bold">
                            <span>{{form.address}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" style="margin-bottom: 15px">
                        <h3>订单明细</h3>
                    </el-col>
                    <el-table :data="List"
                              border
                              class="table"
                              header-cell-class-name="table-header"
                              ref="multipleTable">
                        <el-table-column label="图书名称" property="bookName"/>
                        <el-table-column label="图片" property="bookImagePath" width="130">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.bookImagePath"/>
                            </template>
                        </el-table-column>
                        <el-table-column label="价格(元)">
                            <template slot-scope="scope">
                                {{scope.row.totalPrice/scope.row.bookNumber}}
                            </template>
                        </el-table-column>
                        <el-table-column label="商品数量(件)" property="bookNumber"/>
                        <el-table-column label="合计(元)" prop="totalPrice"/>
                    </el-table>
                </el-row>

            </el-form>

        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        inject: ['reload'],
        name: "BackOrderDetail",
        data() {
            return {
                form: [],
                List: [],
                add: {}
            };
        },
        watch: {
            '$route'(to, from) {
                this.getData(this.$route.query.orderId)
            }
        },
        created() {
            this.getData(this.$route.query.orderId)
        },
        methods: {
            getData(id) {
                let params = {
                    'orderId': id
                };
                ws_axios.fetchPost1('/order/getOrderInfoByOrderId', params).then((back) => {
                    this.List = back.data;
                    this.form = this.List[0];
                    this.form.consignee = this.form.userAddress.split(" ")[0];
                    this.form.postPhone = this.form.userAddress.split(" ")[1];
                    this.form.address = this.form.userAddress.split(" ")[2];
                    for (var i = 3; i < this.form.userAddress.split(" ").length; i++) {
                        this.form.address += " " + this.form.userAddress.split(" ")[i]
                    }
                })
            },
            printOrder() {
                this.$print(this.$refs.print)
            }

        }
    }
</script>

<style scoped>
    .block {
        padding-bottom: 25px;
    }

    .el-form-item {
        margin-bottom: 2px;
    }


</style>
