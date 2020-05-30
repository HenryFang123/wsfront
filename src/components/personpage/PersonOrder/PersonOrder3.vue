<template>
    <div>
        <div style="margin-top: 20px;">
            <div class="info-box">
                <div class="info-header">
                    <span>待确认的订单</span>
                </div>
            </div>
            <div class="container" style="margin-top: 15px" v-if="this.notSignList.length >0">
                <div class="handle-box">
                    <el-table
                        :data="this.notSignList"
                        style="width: 100%"
                        :row-style="{background:'oldlace'}"
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
                            <template slot-scope="scope" >
                                <el-button
                                    size="mini"
                                    @click="gotoCancel(scope.row.orderId)">退货</el-button>
                                <el-button
                                    size="mini"
                                    style="margin-right: 50px;"
                                    @click="gotoCheck(scope.row.orderId)">确认收货</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!--退货弹出框 -->
                    <el-dialog title="您确定退货吗？" :visible.sync="dialogFormVisible">
                        <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
                            <el-form-item label="请选择退货原因:" prop="radio" label-width="150px" :rules="rules.radio" size="medium">
                                <el-radio-group v-model="dialogForm.radio">
                                    <el-radio   label="7天无理由退换货">7天无理由退换货</el-radio><br/>
                                    <el-radio   label="大小尺寸与商品描述不符" style="margin-top: 10px;">大小尺寸与商品描述不符</el-radio><br/>
                                    <el-radio   label="颜色/图案与商品描述不符" style="margin-top: 10px;">颜色/图案与商品描述不符</el-radio><br/>
                                    <el-radio   label="材质与商品描述不符" style="margin-top: 10px;">材质与商品描述不符</el-radio><br/>
                                    <el-radio   label="做工粗糙/有瑕疵" style="margin-top: 10px;">做工粗糙/有瑕疵</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <div style="text-align: right;">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="submitForm('dialogForm')">提 交</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </div>
            </div>
            <div v-else>
                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <span>没有待确认的订单</span>
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
        name: "PersonOrder3.vue",
        data() {
            return {
                notSignList: [],
                dialogVisible:true,
                curOrderId:'',
                dialogFormVisible: false,
                dialogForm: {
                    radio: [],
                },
                rules: {
                    radio: [
                        { required: true, message: '☆ 请选择退货原因!', trigger: 'change' }
                    ]
                }
            }
        },
        created() {
            ws_axios.fetchPost1('/order/getNotSignOrderInfoByUserId', {'userId': this.$store.state.currUserInfo.userId}).then((back) => {
                this.notSignList = back.data;
            });
        },
        methods: {
            gotoCheck(orderId){
                ws_axios.fetchPost1('/order/checkOrderInfoByOrderId',{'orderId':orderId});
                this.$message.success("已确认签收!");
                ws_axios.fetchPost1('/order/getNotSignOrderInfoByUserId', {'userId': this.$store.state.currUserInfo.userId}).then((back) => {
                    this.notSignList = back.data;
                });
            },
            gotoCancel(orderId){
                this.dialogFormVisible=true;
                this.curOrderId=orderId;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        let parm = {
                            'orderId':this.curOrderId,
                            'orderInfo':'已退货：'+this.dialogForm.radio
                        };
                        ws_axios.fetchPost1('/order/cancelOrderInfoByOrderId', parm);
                        this.$refs[formName].resetFields();
                    } else {
                        return false;
                    }
                });
                ws_axios.fetchPost1('/order/getNotSignOrderInfoByUserId', {'userId': this.$store.state.currUserInfo.userId}).then((back) => {
                    this.notSignList = back.data;
                });
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
