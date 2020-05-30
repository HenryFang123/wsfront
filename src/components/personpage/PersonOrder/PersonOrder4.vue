<template>
    <div>
        <div style="margin-top: 20px;" >
            <div class="info-box">
                <div class="info-header">
                    <span>历史订单</span>
                </div>
            </div>
            <div class="container" style="margin-top: 15px" v-if="this.DoneList.length >0">
                <div class="handle-box">
                    <el-table
                        :data="this.DoneList"
                        style="width: 100%"
                        :row-style="{background:'#F2F6FC'}"
                        :default-sort = "{prop: 'createTime', order: 'descending'}"
                        max-height="642">
                        <el-table-column prop="createTime" label="日期" width="180" align="center" sortable>
                            <template slot-scope="scope">
                                <i class="el-icon-time"/>
                                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderId" label="订单号" width="140" align="center"/>
                        <el-table-column prop="bookImagePath" label="图片" width="100" align="center">
                            <template slot-scope="scope">
                                <img :src="scope.row.bookImagePath" style="width: 75px;height: 85px;"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bookName" label="书名" width="170" align="center"/>
                        <el-table-column prop="bookNumber" label="数量" width="80" align="center"/>
                        <el-table-column prop="totalPrice" label="总价（元）" width="100" align="center"/>
                        <el-table-column prop="userAddress" label="收货信息" align="center"/>
                        <el-table-column prop="orderInfo" label="状态" width="160" align="center"
                                         :filters="[{ text: '已完成', value: '已完成' }, { text: '已取消', value: '已取消' }]"
                                         :filter-method="filterInfo">
                        </el-table-column>

                    </el-table>
                </div>
            </div>
            <div v-else>
                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <span>没有历史订单</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "PersonOrder4.vue",
        data() {
            return {
                DoneList: [],
                dialogVisible:true
            }
        },
        created() {
            ws_axios.fetchPost1('/order/getDoneOrderInfoByUserId', {'userId': this.$store.state.currUserInfo.userId}).then((back) => {
                this.DoneList = back.data;
            });
        },
        methods: {
            filterInfo(value, row){
                 return  row.orderInfo.substring(0,3) === value
            }
        }
    }
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

    .info-box {
        padding: 15px;
        margin: 0;
        border-radius: 5px;
        box-shadow: 0 0 5px #ccc;
        background-color: #ffffff;
    }

    .info-header {
        height: 35px;
        display: flex;
        justify-content: space-between;
        color: #232323;
        font-size: 18px;

    }
</style>
