<template>
    <div class="login-page">
        <div class="login-header">
            <div class="login-header-block">
                <div class="login-header-block-img">
                    <el-image v-bind:src="this.$store.state.webImg.wsLogo" style="height: 80px; width: 80px"/>
                </div>
                <div class="login-header-block-span">
                    <span>欢迎登录商家管理系统</span>
                </div>
                <div class="login-header-block-link">
                    <el-link :underline="false">问题反馈></el-link>
                </div>
            </div>
        </div>

        <div class="login-main" >
            <el-form :model="param" :rules="rules" class="login-main-form"
                     label-position="left"
                     label-width="0px"
                     ref="login"
                     status-icon>
                <span class="title">登&emsp;录</span>
                <div class="login-main-form-blank-0"/>
                <el-form-item prop="adminId">
                    <el-input auto-complete="off" placeholder="请输入账号" prefix-icon="el-icon-ump-yonghu" type="text" v-model="param.adminId">
                        <template slot="prepend">账&emsp;号：</template>
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

        <div class="login-footer">
            <footer class="login-footer-block">
                <div class="clearfix"></div>
                <div class="service-intro">
                    <div class="friend-link">
                        <div class="friend-link-item">
                            <ul>
                                <li :key="index" v-for="(link, index) in moreLink">
                                    <span :class="[linkItemClass, {'link-last-item': index === 9}]">{{link}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="copyright">
                        <p>Copyright © 2020 by FZZ
                            <span>WS商城</span></p>
                    </div>
                </div>
            </footer>
        </div>
    </div>

</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: 'BackLogin.vue',
        data: function () {
            return {
                moreLink: [
                    '关于我们', '联系我们', '联系客服', '合作招商', '商家帮助', '营销中心', '销售联盟', '校园社区', '风险监测', '隐私政策'
                ],
                linkItemClass: 'link-item',
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
                            if (back.data.resultCode === "0") {
                                this.$message.error('登录错误，请输入正确的用户名或密码');
                            } else {
                                this.$message.success('登录成功');
                                localStorage.setItem('adminId', this.param.adminId);
                                this.$store.dispatch('saveAdminInfo', back.data.adminInfo);

                                let params = {
                                    'businessId': this.$store.state.adminInfo.businessId,
                                };
                                ws_axios.fetchPost1('/business/getBusinessInfoByBusinessId', params).then((back) => {
                                    this.$store.dispatch("saveBusinessInfo", back.data);
                                });

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
    html,
    body,
    #app,
    .login-page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 800px;
        width: 100%;
        background-color: #FFFFFF;
    }

    .login-page .login-header {
        box-shadow: 0 3px 5px #cac6c6;
        background-color: #FFFFFF;
        color: #000000;
        font-size: 30px;
        height: 100px;
        text-align: center;
    }

    .login-page .login-header .login-header-block {
        margin: 10px auto;
        width: 950px;
        height: 80px;
    }

    .login-page .login-header .login-header-block .login-header-block-img {
        float: left;
        height: 80px;
        margin-top: 10px;
        margin-right: 20px;
    }

    .login-page .login-header .login-header-block .login-header-block-span {
        float: left;
        height: 50px;
        margin-top: 25px;
        font-size: 35px;
        text-align: center;
    }

    .login-page .login-header .login-header-block .login-header-block-link {
        float: right;
        height: 20px;
        margin-top: 55px;
    }

    .login-page .login-main {
        margin: 5px auto;
        padding: 30px 0 0 0;
        text-align: center;
        background-color: #FFFFFF;
        width: 100%;
        height: 450px;
    }

    .login-page .login-main .login-main-form {
        margin: 0 auto;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        width: 330px;
        height: 340px;
        padding: 50px 35px 15px;
        background: #FFFFFF;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login-page .login-main .login-main-form .title {
        margin: 0 auto;
        font-size: 25px;
        font-weight: bold;
    }

    .login-page .login-main .login-main-form .login-main-form-blank-0 {
        width: 100%;
        height: 40px;
    }

    .login-page .login-main .login-main-form .login-main-form-link {
        margin: 0 auto;
        width: 100%;
    }

    .login-page .login-main .login-main-form .login-main-form-link .login-main-form-link-remember_me {
        margin: 0 auto;
        width: 100%;
        text-align: left;
    }

    .login-page .login-main .login-main-form .login-main-form-link .login-main-form-link-to_register {
        margin: 0 auto;
        width: 100%;
        text-align: right;
    }

    .login-page .login-main .login-main-form .login-main-form-blank-1 {
        width: 100%;
        height: 10px;
    }

    .login-page .login-footer {
        background-color: #FFFFFF;
        text-align: center;
        height: 70px;
    }

    .login-page .login-footer .login-footer-block {
        width: 100%;
        height: 65px;
        margin-top: 5px;
        background-color: #FFFFFF;
    }

    .login-page .login-footer .login-footer-block .login-intro {
        width: 100%;
    }

    .login-page .login-footer .login-footer-block .service-intro .friend-link {
        border-top: 0.5px solid #cac6c6;
        display: flex;
        align-items: center;
        width: 910px;
        height: 30px;
        margin: 0 auto;
        color: #666666;
    }

    .login-page .login-footer .login-footer-block .service-intro .friend-link .friend-link-item {
        margin: 0 auto;
    }

    .login-page .login-footer .login-footer-block .service-intro .friend-link .friend-link-item ul {
        list-style: none;
    }

    .login-page .login-footer .login-footer-block .service-intro .friend-link .friend-link-item ul li {
        padding: 7px 0;
        float: left;
    }

    .login-page .login-footer .login-footer-block .service-intro .friend-link .friend-link-item ul li .link-item {
        padding: 0 8px;
        cursor: pointer;
        border-right: 1px solid #ccc;
    }

    .login-page .login-footer .login-footer-block .service-intro .friend-link .friend-link-item ul li .link-last-item {
        border: none;
    }

    .login-page .login-footer .login-footer-block .service-intro .copyright {
        width: 100%;
        color: #666666;
        line-height: 30px;
        text-align: center;
    }

    .login-page .login-footer .login-footer-block .service-intro .copyright a {
        color: #232323;
        font-size: 20px;
    }

</style>
