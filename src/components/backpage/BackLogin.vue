<template>
    <div class="login-main" style=" display: block;
    position: absolute;
    left: 600px;
    top: 70px;
    bottom: 0;">
        <el-form :model="param" :rules="rules" class="login-main-form"
                 label-position="left"
                 label-width="0px"
                 ref="login"
                 status-icon>
            <el-form-item prop="adminId">
                <el-input auto-complete="off" placeholder="请输入账号" prefix-icon="el-icon-ump-yonghu" type="text" v-model="param.adminId">
                    <template slot="prepend">账号：</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="adminPassword">
                <el-input auto-complete="off" placeholder="请输入密码" prefix-icon="el-icon-ump-mima" type="password" v-model="param.adminPassword">
                    <template slot="prepend">密&emsp;码：</template>
                </el-input>
            </el-form-item>
            <div class="login-main-form-blank-1"/>
            <el-form-item style="width:100%;">
                <el-button @click="submitForm()" class="btn" style="width:100%;" type="primary">登&emsp;&emsp;录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: 'BackLogin.vue',
        data: function () {
            return {
                param: {
                    adminId: '',
                    adminPassword: '',
                },
                rules: {
                    adminId: [{required: true, message: '请输入管理员帐号', trigger: 'blur'}],
                    adminPassword: [{required: true, message: '请输入管理员密码', trigger: 'blur'}],
                },
            };
        },
        methods: {
            submitForm() {
                this.$refs.login.validate((valid) => {
                    if (valid) {
                        let params = {
                            adminId: this.param.adminId,
                            adminPassword: this.param.adminPassword
                        };
                        ws_axios.fetchPost1('/admin/checkLogin', params).then((back) => {
                            if (back.data.resultCode === "1") {
                                this.$message.error('登录错误，请输入正确的用户名或密码');
                            } else {
                                // 传入保存登录成功后返回的 UserId
                                this.$message.success('登录成功');
                                localStorage.setItem('adminId', this.param.adminId);
                                this.$store.dispatch('saveAdminInfoAdminName', back.data.adminName);
                                // 传入保存登录使用名 UserSelf
                                this.$store.dispatch('saveAdminInfoBusinessId', back.data.businessId);
                                this.$router.push({path: '/BackHome'});
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
        },
    };
</script>

<style scoped>

</style>
