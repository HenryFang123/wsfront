<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-grid"/> 退货管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
                <el-form :model="formDelete" label-width="70px" ref="form">
                    <el-input size="mini" class="handle-input mr10" placeholder="订单ID" v-model="formDelete.orderId"/>
                    <el-button size="mini" @click="handleSearch" icon="el-icon-search" type="primary">搜索</el-button>
                </el-form>
            </div>
            <el-table v-bind:data="List"
                      border
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      class="table"
                      header-cell-class-name="table-header"
                      ref="multipleTable">
                <el-table-column align="center" label="ID" prop="id" width="55">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column label="订单ID" property="orderId" width="140">
                    <template slot-scope="scope">
                        <router-link :to="{path:'BackOrderDetail?orderId='+scope.row.orderId}">
                            {{scope.row.orderId}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="用户ID" prop="userId"/>
                <el-table-column label="图书ID" property="bookId"/>
                <el-table-column label="图书名称" property="bookName"/>
                <el-table-column label="图片" property="bookImagePath" width="130">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.bookImagePath" width="110" height="150"/>
                    </template>
                </el-table-column>
                <el-table-column label="商品数量(件)" property="bookNumber"/>
                <el-table-column label="商品价格(元)" prop="totalPrice"/>
                <el-table-column label="地址" property="briefAddress">
                    <template slot-scope="scope">
                        <el-popover
                            placement="top-start"
                            title="详细地址"
                            width="250"
                            trigger="hover"
                        >
                            <div slot="default">
                                {{scope.row.userAddress}}
                            </div>
                            <div slot="reference">{{scope.row.briefAddress}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="退货原因" prop="orderInfo"/>
                <el-table-column label="用户号码" prop="userPhone" width="110"/>
                <el-table-column align="center" label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, List)" class="red"
                                   icon="el-icon-delete" type="text">同意退货
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total="itemTotal"
                @current-change="current_change"
                background
                layout="prev, pager, next">
            </el-pagination>
            <el-dialog :visible.sync="queryVisible" title="编辑" width="100%">
                <el-form :model="formDeleteInfo" label-width="70px" ref="form">
                    <el-table v-bind:data="QueryList">
                        <el-table-column label="订单ID" property="orderId" v-model="formDeleteInfo.orderId" width="150">
                            <template slot-scope="scope">
                                <router-link :to="{path:'BackOrderDetail?orderId='+scope.row.orderId}">
                                    {{scope.row.orderId}}
                                </router-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户ID" property="userId" width="200"/>
                        <el-table-column label="图书ID" property="bookId"/>
                        <el-table-column label="图书名称" property="bookName"/>
                        <el-table-column label="图片" property="bookImagePath" width="130">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.bookImagePath" width="110" height="150"/>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品数量(件)" property="bookNumber"/>
                        <el-table-column label="商品价格(元)" property="totalPrice"/>
                        <el-table-column label="地址" property="briefAddress">
                            <template slot-scope="scope">
                                <el-popover
                                    placement="top-start"
                                    title="详细地址"
                                    width="250"
                                    trigger="hover"
                                >
                                    <div slot="default">
                                        {{scope.row.userAddress}}
                                    </div>
                                    <div slot="reference">{{scope.row.briefAddress}}</div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="退货原因" prop="orderInfo"/>
                        <el-table-column label="用户号码" prop="userPhone"/>
                        <el-table-column align="center" label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button @click="deleteSearch" class="red" icon="el-icon-delete" type="text">同意退货
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        inject: ['reload'],
        name: 'BackReturnTable.vue',
        data() {
            return {
                loading: true,
                count: 0,
                pageSize: 5,//每页的数据条数
                currentPage: 1,//默认开始页面
                itemTotal: 0,
                List: [],
                QueryList: [],
                editVisible: false,
                queryVisible: false,
                form: {},
                formDelete: {},
                formDeleteInfo: {},
                idx: -1,
                id: -1,
                briefAddress: ''
            };
        },
        created() {
            this.getCount();
            this.getData();
        },
        methods: {
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.getData();
            },

            getCount() {
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                };
                ws_axios.fetchPost1('/order/getReturnOrderInfoCountByBusinessId', params).then((back) => {
                    this.itemTotal = back.data;
                });
            },

            getData() {
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize
                };
                ws_axios.fetchPost1('/order/getReturnOrderInfoListByBusinessId', params).then((back) => {
                    this.List = back.data;
                    for (let i in this.List) {
                        this.List[i].briefAddress = this.List[i].userAddress.substring(0, 15);
                    }
                    this.loading = false;
                    this.reload();
                })
            },
            deleteRow(index, rows) {
                let params = {
                    'orderId': this.List[index].orderId,
                    'orderInfo': "已退货：" + this.List[index].orderInfo
                };
                this.$confirm(
                    "同意退货吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('order/deleteOrderInfoByOrderId', params).then((back) => {
                        rows.splice(index, 1);
                        location.reload()
                    })
                })
            },
            deleteSearch() {
                let params = {
                    'orderId': this.formDelete.orderId,
                    'orderInfo': "已退货：" + this.QueryList[0].orderInfo
                };
                this.$confirm(
                    "同意退货吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('order/deleteOrderInfoByOrderId', params).then((back) => {
                        location.reload();
                    })
                })
            },
            handleSearch() {
                let params = {
                    'orderId': this.formDelete.orderId
                };
                ws_axios.fetchPost1('/order/getOrderInfoByOrderId', params).then((back) => {
                    this.QueryList = back.data;
                    for (let i in this.QueryList) {
                        this.QueryList[i].briefAddress = this.QueryList[i].userAddress.substring(0, 15);
                    }
                    this.queryVisible = true
                })
            },
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
