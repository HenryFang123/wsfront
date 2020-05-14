<template>
    <div>
        <div class="info-box">
            <div class="info-header">
                <span>我的收货地址</span>
            </div>
        </div>
        <div class="address-box" v-for="(item, index) in address" :key="index">
            <div class="address-header">
                <span>{{item.consignee}}</span>
                <div class="address-action">
                    <span @click="edit(index)"> 修改</span>
                    <span @click="del(index)"> 删除</span>
                </div>
            </div>
            <div class="address-content">
                <p><span class="address-content-title"> 收 货 人 :</span> {{item.consignee}}</p>
                <p><span class="address-content-title">收货地区:</span> {{item.province}}  {{item.city}}  {{item.region}}</p>
                <p><span class="address-content-title">收货地址:</span> {{item.address}}</p>
                <p><span class="address-content-title">手机号码:</span> {{item.postPhone}}</p>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :visible.sync="editVisible" title="编辑" width="30%">
            <el-form :model="formData" label-width="70px" ref="form">
                <el-form-item label="收货人">
                    <el-input  v-model="formData.consignee"/>
                </el-form-item>
                <el-form-item label="省">
                    <el-input  v-model="formData.province"/>
                </el-form-item>
                <el-form-item label="市">
                    <el-input  v-model="formData.city"/>
                </el-form-item>
                <el-form-item label="区">
                    <el-input  v-model="formData.region"/>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input  v-model="formData.address"/>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input  v-model="formData.postPhone"/>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="saveEdit" type="primary">确 定</el-button>
                <el-button @click="editVisible = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        inject: ['reload'],
        name: "PersonAddress.vue",
        data() {
            return {
                modal: false,
                editVisible: false,
                form: {},
                List:[],
                address:[],
                formData: {
                    id:'',
                    consignee:'',
                    address: '',
                    postPhone: '',
                    province: '',
                    city: '',
                    region:''
                },
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                let params = {
                    'userPhone': this.$store.getters.currUserInfo.userPhone,
                };
                ws_axios.fetchPost1('/shippingAddress/getShippingAddressByUserPhone', params).then((back) => {
                    this.address = back.data;
                })
            },

            edit (index) {
                this.editVisible = true;
                this.formData.id  = this.address[index].id;
                this.formData.consignee = this.address[index].consignee;
                this.formData.province = this.address[index].province;
                this.formData.city = this.address[index].city;
                this.formData.address = this.address[index].address;
                this.formData.region = this.address[index].region;
                this.formData.postPhone = this.address[index].postPhone;
            },
            del(index){
                let params = {
                    'id' : this.address[index].id,
                    'userPhone': this.$store.getters.currUserInfo.userPhone,

                };
                this.$confirm(
                    "确认删除吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('/shippingAddress/deleteShippingAddress', params).then((back) => {
                        location.reload();
                    })
                })
            },
            // 保存编辑
            saveEdit() {
                let params = {
                    'id' : this.formData.id,
                    'userPhone': this.$store.getters.currUserInfo.userPhone,
                    'consignee' : this.formData.consignee,
                    'province' : this.formData.province,
                    'city' : this.formData.city,
                    'region' : this.formData.region,
                    'address' : this.formData.address,
                    'postPhone' : this.formData.postPhone,
                };
                ws_axios.fetchPost1('/shippingAddress/updateShippingAddress', params).then((back) => {
                    this.editVisible = false;
                    location.reload();
                })
            },

        }

    }
</script>

<style scoped>
    .address-box {
        padding: 15px;
        margin-top: 15px;
        border-radius: 5px;
        box-shadow: 0 0 5px #ccc;
        background-color: #ffffff;
    }
    .address-header {
        height: 35px;
        display: flex;
        justify-content: space-between;
        color: #232323;
        font-size: 18px;
    }
    .address-content {
        font-size: 14px;
    }
    .address-content-title {
        color: #999;
    }
    .address-action span{
        margin-left: 15px;
        font-size: 14px;
        color: #2d8cf0;
        cursor: pointer;
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
