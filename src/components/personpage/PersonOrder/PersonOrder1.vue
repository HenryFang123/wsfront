<template>
    <div>
        <div>
            <div class="info-box">
                <div class="info-header">
                    <span>进行中的订单</span>
                </div>
            </div>
            <div class="container" style="margin-top: 15px" v-if="this.notPayList.length > 0">
                <div class="handle-box">
                    <el-table
                        :data="this.notPayList"
                        style="width: 100%"
                        :row-style="{background:'#f0f9eb'}"
                        max-height="642">
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
                        <el-table-column align="right">
                            <template slot="header" slot-scope="scope">
                                <span style="font-size: 15px;font-family:Microsoft YaHei">去付款</span>&emsp;
                                <el-button @click="gotoSettlement" type="success" size="mini" icon="el-icon-right" circle/>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div v-else>
                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <span>没有进行中的订单</span>
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
        name: "PersonOrder1.vue",
        data() {
            return {
                notPayList: [],
                dialogVisible: true
            }
        },
        created() {
            ws_axios.fetchPost1('/order/getOrderInfoListByUserId', {'userId': this.$store.state.currUserInfo.userId}).then((back) => {
                this.notPayList = back.data;
            });
        },
        methods: {
            gotoSettlement(){
                this.$router.push("/settlement_page")
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
