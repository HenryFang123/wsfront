<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-grid"></i> 订单列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
                <el-form :model="formDelete" label-width="70px" ref="form">
                    <el-input class="handle-input mr10" placeholder="订单ID" v-model="formDelete.orderId"></el-input>
                    <el-button @click="handleSearch" icon="el-icon-search" type="primary">搜索</el-button>
                </el-form>
            </div>
            <el-table
                :data="List"
                border
                class="table"
                header-cell-class-name="table-header"
                ref="multipleTable"
            >
                <el-table-column align="center" label="ID" prop="id" width="55">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column label="订单ID" prop="orderId"></el-table-column>
                <el-table-column label="用户ID" prop="userId"></el-table-column>
                <el-table-column label="图书ID" property="bookId"></el-table-column>
                <el-table-column label="图书名称" property="bookName"></el-table-column>
                <el-table-column label="商品数量(件)" property="bookNumber"></el-table-column>
                <el-table-column label="商品价格(元)" prop="totalPrice"></el-table-column>
                <el-table-column label="地址" prop="userAddress"></el-table-column>
                <el-table-column label="用户号码" prop="userPhone"></el-table-column>


                <el-table-column align="center" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="deleteRow(scope.$index, List)"
                            class="red"
                            icon="el-icon-delete"
                            type="text"
                        >删除
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
                    <el-table :data="QueryList">
                        <el-table-column label="订单ID" property="orderId" v-model="formDeleteInfo.orderId" width="150"></el-table-column>
                        <el-table-column label="用户ID" property="userId" width="200"></el-table-column>
                        <el-table-column label="图书ID" property="bookId"></el-table-column>
                        <el-table-column label="图书名称" property="bookName"></el-table-column>
                        <el-table-column label="商品数量(件)" property="bookNumber"></el-table-column>
                        <el-table-column label="商品价格(元)" property="totalPrice"></el-table-column>
                        <el-table-column label="地址" property="userAddress"></el-table-column>
                        <el-table-column label="用户号码" prop="userPhone"></el-table-column>
                        <el-table-column align="center" label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button
                                    @click="deleteSearch"
                                    class="red"
                                    icon="el-icon-delete"
                                    type="text"
                                >删除
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
        name: 'ReturnTable',
        data() {
            return {
                count: 0,
                pageSize: 5,//每页的数据条数
                currentPage: 1,//默认开始页面
                itemTotal: 0,
                List: {},
                QueryList: {},
                editVisible: false,
                queryVisible: false,
                form: {},
                formDelete: {},
                formDeleteInfo: {},
                idx: -1,
                id: -1,

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
                console.log(currentPage)
            },

            getCount() {
                let params = {
                    businessId: this.$store.getters.AdminInfo_businessId,
                };
                ws_axios.fetchPost1('/order/getOrderCount', params).then((back) => {
                    this.itemTotal = back.data;
                    console.log(this.itemTotal)
                });
            },
            getData() {
                let params = {
                    businessId: this.$store.getters.AdminInfo_businessId,
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize
                };
                ws_axios.fetchPost1('/order/getOrder', params).then((back) => {

                    this.List = back.data;
                    console.log(this.List)

                })
            },
            deleteRow(index, rows) {
                let params = {
                    'orderId': this.List[index].orderId,
                };
                this.$confirm(
                    "确认删除吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('order/deleteOrder', params).then((back) => {
                        rows.splice(index, 1);
                    })
                })
            },
            deleteSearch() {
                let params = {
                    'orderId': this.formDelete.orderId
                };
                this.$confirm(
                    "确认删除吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('order/deleteOrder', params).then((back) => {
                        location.reload();
                    })
                })
            },
            handleSearch() {
                let params = {
                    'orderId': this.formDelete.orderId
                };
                ws_axios.fetchPost1('/order/getOneOrder', params).then((back) => {
                    this.QueryList = back.data;
                    console.log(back.data)
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
