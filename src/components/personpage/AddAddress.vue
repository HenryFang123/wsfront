<template>
    <div>
        <div class="info-box">
            <div class="info-header">
                <span>添加收货地址</span>
            </div>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
                <el-form ref="form" :model="form" label-width="80px "  >
                    <el-form-item label="收货人">
                        <el-input v-model="form.consignee"/>
                    </el-form-item>
                    <el-form-item label="省市区">
                        <VDistpicker :province="form.province" :city="form.city" :area="form.region" @selected="onSelected"/>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="form.address"/>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input  v-model="form.postPhone"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">添加</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";
    import VDistpicker from 'v-distpicker'
    export default {
        inject: ['reload'],
        components: {
            VDistpicker
        },
        name: "AddAddress.vue",
        data() {
            return {
                form: {},
            }
        },
        methods: {
            onSelected(data) {
                this.form.province = data.province.value;
                this.form.city = data.city.value;
                this.form.region = data.area.value
            },
            onSubmit() {
                let params = {
                    'userPhone' : this.$store.state.currUserInfo.userPhone,
                    'consignee' : this.form.consignee,
                    'province' : this.form.province,
                    'city' : this.form.city,
                    'region' : this.form.region,
                    'address' : this.form.address,
                    'postPhone' : this.form.postPhone
                };
                this.$confirm(
                    "确认添加吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('/shippingAddress/insertAddress', params).then((back) => {
                        this.$message.success('添加成功');
                        location.reload()
                    })
                })

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
