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
                <el-button
                    @click="delAllSelection"
                    class="handle-del mr10"
                    icon="el-icon-delete"
                    type="primary"
                >批量删除
                </el-button>

                <el-input class="handle-input mr10" placeholder="用户名"></el-input>
                <el-button @click="handleSearch" icon="el-icon-search" type="primary">搜索</el-button>
            </div>
            <el-table
                :data="List"
                @selection-change="handleSelectionChange"
                border
                class="table"
                header-cell-class-name="table-header"
                ref="multipleTable"
            >
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" label="ID" prop="id" width="55"></el-table-column>
                <el-table-column label="订单ID" prop="orderId"></el-table-column>
                <el-table-column label="订单生成时间" prop="orderDate"></el-table-column>
                <el-table-column label="用户名" prop="userId"></el-table-column>
                <el-table-column label="商品价格(元)" prop="orderPriceTotal"></el-table-column>
                <el-table-column label="地址" prop="orderAddress"></el-table-column>
                <el-table-column label="用户号码" prop="orderPhone"></el-table-column>


                <el-table-column align="center" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleEdit()"
                            icon="el-icon-edit"
                            type="text"
                        >编辑
                        </el-button>
                        <el-button
                            @click="handleDelete(scope.$index, scope.row)"
                            class="red"
                            icon="el-icon-delete"
                            type="text"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: 'classification',
        data() {
            return {
                count: 0,
                List: {
                    id: Number,
                    createTime: '',
                    orderId: Number,
                    orderAddress: '',
                    userId: Number,
                    orderPhone: '',
                    orderPriceTotal: '',
                    orderDate: ''

                },
            };
        },
        created() {
            this.getData();
        },
        methods: {

            getData() {
                let params = {};
                ws_axios.fetchPost1('/order/getOrder', params).then((back) => {

                    this.List = back.data;
                    for (let i in this.List) {
                        this.List[i].id = ++this.count
                    }
                    console.log(this.List)

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
