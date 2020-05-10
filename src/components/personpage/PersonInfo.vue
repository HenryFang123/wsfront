<template>
    <div>
        <div class="info-box">
            <div class="info-header">
                <span>我的信息</span>
            </div>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
        <el-form ref="form" :model="form" label-width="80px "  >
            <el-form-item label="用户名">
                <el-input v-model="form.userName"  ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.userSex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="form.userAge"></el-input>
            </el-form-item>
            <el-form-item label="省">

                <el-input v-model="form.userProvince"></el-input>

            </el-form-item>
            <el-form-item label="市">
                <el-input v-model="form.userCity"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.userAddress"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";
    export default {
        inject: ['reload'],
        name: "PersonInfo",
        data() {
            return {
                form: {

                },
                List:{}
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                let params = {
                    'userPhone': this.$store.getters.userInfo_userSelf,

                };
                console.log(this.$store.getters.userInfo_userSelf);

                ws_axios.fetchPost1('/user/getUserInfoByUserPhone', params).then((back) => {
                    this.form = back.data;
                    console.log(this.form);
                })
            },
            onSubmit() {
                let params = {
                    'userPhone' : this.$store.getters.userInfo_userSelf,
                    'userName' : this.form.userName,
                    'userEmail' : this.form.userEmail,
                    'userSex' : this.form.userSex,
                    userAge : this.form.userAge,
                    'userProvince' : this.form.userProvince,
                    'userCity' : this.form.userCity,
                    'userAddress' : this.form.userAddress
                };
                ws_axios.fetchPost1('/user/updateUserInfo', params).then((back) => {
                    this.reload();
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
        margin: 0px;
        border-radius: 5px;
        box-shadow: 0px 0px 5px #ccc;
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
