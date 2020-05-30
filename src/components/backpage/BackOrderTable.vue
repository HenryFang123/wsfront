<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-grid"/> 订单列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
                <el-row>
                    <el-col :span="2" style=";margin-top:.5rem;">
                        <span style="font-size:.9rem">订单状态：</span>
                    </el-col>
                    <el-col :span="22">
                        <el-button size="mini" autofocus @click.native="getDataAll('All')">全部
                            <el-tag type="warning" size="mini">{{this.allCount}}</el-tag>
                        </el-button>
                        <el-button size="mini" @click.native="getDataPay('Pay')">未发货
                            <el-tag type="danger" size="mini">{{this.payCount}}</el-tag>
                        </el-button>
                        <el-button size="mini" @click.native="getDataSend('Send')">已发货
                            <el-tag type="success" size="mini">{{this.sendCount}}</el-tag>
                        </el-button>
                    </el-col>
                </el-row>
                <el-form :model="formQuery" label-width="70px" ref="form" style="margin-top: 15px">
                    <el-input size="mini" class="handle-input mr10" placeholder="订单ID" v-model="formQuery.orderId"/>
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
                <el-table-column label="订单ID" prop="orderId" v-model="query.orderId" width="140">
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
                <el-table-column label="状态" prop="orderInfo">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.orderState===2" type="danger">未发货</el-tag>
                        <el-tag v-if="scope.row.orderState===3" type="success">已发货</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="用户号码" prop="userPhone" width="110"/>
                <el-table-column align="center" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.orderState===2" @click.native.prevent="ship(scope.$index, List)"
                                   icon="el-icon-circle-check" type="text">发货
                        </el-button>
                        <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"
                                   type="text">编辑
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

            <!-- 编辑弹出框 -->
            <el-dialog :visible.sync="editVisible" title="编辑" width="30%">
                <el-form :model="form" label-width="70px" ref="form">
                    <el-form-item label="订单号">
                        <el-input disabled="true" v-model="form.orderId"/>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.userAddress"/>
                    </el-form-item>
                </el-form>
                <span class="dialog-footer" slot="footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button @click="saveEdit" type="primary">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog :visible.sync="queryVisible" title="编辑" width="100%">
                <el-table v-bind:data="QueryList">
                    <el-table-column label="订单ID" property="orderId" width="150">
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
                    <el-table-column label="状态" prop="orderInfo">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.orderState===2" type="danger">未发货</el-tag>
                            <el-tag v-if="scope.row.orderState===3" type="success">已发货</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户号码" prop="userPhone"/>
                    <el-table-column align="center" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.orderState===2"
                                       @click.native.prevent="shipSearch(scope.$index, QueryList)"
                                       icon="el-icon-circle-check" type="text">发货
                            </el-button>
                            <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"
                                       type="text">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        inject: ['reload'],
        name: 'BackOrderTable.vue',
        data() {
            return {
                loading: true,
                count: 0,
                allCount: '',
                payCount: '',
                sendCount: '',
                status: 'All',
                pageSize: 5,//每页的数据条数
                currentPage: 1,//默认开始页面
                itemTotal: 0,
                List: [],
                QueryList: [],
                query: {},
                editVisible: false,
                queryVisible: false,
                form: {},
                formQuery: {},
                idx: -1,
                id: -1,
                briefAddress: ''
            };
        },
        created() {
            this.getCount(this.status);
            this.getData(this.status);
            this.getAllCount();
            this.getPayCount();
            this.getSendCount();
        },
        methods: {
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.getData(this.status);
            },
            getCount(status) {
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                };
                if (status === 'All') {
                    ws_axios.fetchPost1('/order/getOrderInfoCountByBusinessId', params).then((back) => {
                        this.itemTotal = back.data;
                    });
                } else if (status === 'Pay') {
                    ws_axios.fetchPost1('/order/getPayOrderInfoCountByBusinessId', params).then((back) => {
                        this.itemTotal = back.data;
                    });
                } else if (status === 'Send') {
                    ws_axios.fetchPost1('/order/getSendOrderInfoCountByBusinessId', params).then((back) => {
                        this.itemTotal = back.data;
                    });
                }
            },
            getDataAll(status) {
                this.currentPage = 1;
                this.getData(status)
            },
            getDataPay(status) {
                this.currentPage = 1;
                this.getData(status)
            },
            getDataSend(status) {
                this.currentPage = 1;
                this.getData(status)

            },
            getData(status) {
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize
                };
                if (status === 'All') {
                    this.status = 'All';
                    this.getCount(status);
                    ws_axios.fetchPost1('/order/getOrderInfoListByBusinessId', params).then((back) => {
                        this.List = back.data;
                        console.log(this.List)
                        for (let i in this.List) {
                            this.List[i].briefAddress = this.List[i].userAddress.substring(0, 15);
                        }
                        this.loading = false;
                        this.reload();
                    })
                } else if (status === 'Pay') {
                    this.status = 'Pay';
                    this.getCount(status);
                    ws_axios.fetchPost1('/order/getPayOrderInfoListByBusinessId', params).then((back) => {
                        this.List = back.data;
                        console.log(this.List)
                        for (let i in this.List) {
                            this.List[i].briefAddress = this.List[i].userAddress.substring(0, 15);
                        }
                        this.loading = false;
                        this.reload();
                    })
                } else if (status === 'Send') {
                    this.status = 'Send';
                    this.getCount(status);
                    ws_axios.fetchPost1('/order/getSendOrderInfoListByBusinessId', params).then((back) => {
                        this.List = back.data;
                        console.log(this.List)
                        for (let i in this.List) {
                            this.List[i].briefAddress = this.List[i].userAddress.substring(0, 15);
                        }
                        this.loading = false;
                        this.reload();
                    })
                }

            },
            getAllCount(){
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                };
                ws_axios.fetchPost1('/order/getOrderInfoCountByBusinessId', params).then((back) => {
                    this.allCount = back.data;
                    console.log(this.allCount)
                });
            },
            getPayCount(){
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                };
                ws_axios.fetchPost1('/order/getPayOrderInfoCountByBusinessId', params).then((back) => {
                    this.payCount = back.data;
                });
            },
            getSendCount(){
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                };
                ws_axios.fetchPost1('/order/getSendOrderInfoCountByBusinessId', params).then((back) => {
                    this.sendCount = back.data;
                });
            },
            handleSearch() {
                let params = {
                    'orderId': this.formQuery.orderId
                };
                ws_axios.fetchPost1('/order/getOrderInfoByOrderId', params).then((back) => {
                    this.QueryList = back.data;
                    for (let i in this.QueryList) {
                        this.QueryList[i].briefAddress = this.QueryList[i].userAddress.substring(0, 15);
                    }
                    this.queryVisible = true
                })

            },
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            ship(index, rows) {
                let params = {
                    'orderId': this.List[index].orderId,
                };
                this.$confirm(
                    "确认发货吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('order/shipByOrderId', params).then((back) => {
                        location.reload()
                    })
                })
            },
            shipSearch(index, rows) {
                let params = {
                    'orderId': this.QueryList[index].orderId,
                };
                this.$confirm(
                    "确认发货吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('order/shipByOrderId', params).then((back) => {
                        location.reload()
                    })
                })
            },
            // 保存编辑
            saveEdit() {
                let params = {
                    'orderId': this.form.orderId,
                    'userAddress': this.form.userAddress,
                };
                ws_axios.fetchPost1('/order/updateOrderInfo', params).then((back) => {
                    this.editVisible = false;
                    location.reload();
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.form);
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
