<!--项目前端，登录页面-->
<template>
    <div class="login-page">
        <!-- 页面头部块 -->
        <div class="login-header">
            <div class="login-header-block">
                <div class="login-header-block-img">
                    <el-image style="height: 80px; width: 80px" v-bind:src="this.$store.getters.webImg_wsLogo"/>
                </div>
                <div class="login-header-block-span">
                    <span>欢迎登录</span>
                </div>
                <div class="login-header-block-link">
                    <el-link :underline="false">问题反馈></el-link>
                </div>
            </div>
        </div>

        <!-- 页面主题内容块 -->
        <div class="login-main">
            <el-form :model="login" :rules="rule" class="login-main-form"
                     label-position="left"
                     label-width="0px"
                     ref="login"
                     status-icon>
                <span class="title">登&emsp;录</span>
                <div class="login-main-form-blank-0"/>
                <el-form-item prop="user_self">
                    <el-input auto-complete="off" placeholder="手机号/用户名" prefix-icon="el-icon-ump-yonghu" type="text"
                              v-model="login.user_self">
                        <template slot="prepend">用户名：</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pass_word">
                    <el-input auto-complete="off" placeholder="请输入密码" prefix-icon="el-icon-ump-mima" type="password"
                              v-model="login.pass_word">
                        <template slot="prepend">密&emsp;码：</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="login-main-form-link">
                        <el-row>
                            <el-col :span="12">
                                <div class="login-main-form-link-remember_me">
                                    <el-checkbox class="remember-me" v-model="ws_checked">
                                        记住密码(7d)
                                    </el-checkbox>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="login-main-form-link-to_register">
                                    <el-link :underline="false" @click="gotoRegister">还没帐号？去注册</el-link>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
                <div class="login-main-form-blank-1"/>
                <el-form-item style="width:100%;">
                    <el-button @click="submitForm('login')" class="btn" style="width:100%;" type="primary">登&emsp;&emsp;录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 页面尾部块 -->
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
    // 导入数据请求配置文件
    import ws_axios from "network/ws_axios";

    export default {
        name: "Login.vue",
        data() {
            return {
                ws_checked: true,
                token: '',
                login: {
                    user_self: '',
                    pass_word: ''
                },
                rule: {
                    // use setting to check input item
                    user_self: [
                        {required: true, message: '☆ 用户名不能为空', trigger: 'blur'}
                    ],
                    pass_word: [
                        {required: true, message: '☆ 密码不能为空', trigger: 'blur'},
                        {type: 'string', min: 6, message: '☆ 密码不能少于6位', trigger: 'blur'}
                    ]
                },
                linkItemClass: 'link-item',
                moreLink: [
                    '关于我们', '联系我们', '联系客服', '合作招商', '商家帮助', '营销中心', '销售联盟', '校园社区', '风险监测', '隐私政策'
                ]
            }
        },
        methods: {
            // 判断输入框是否为空
            isnull: function (val) {
                const str = val.replace(/(^\s*)|(\s*$)/g, '');  //去除空格;
                return str === '' || str === undefined || str === null;
            },
            // 登录表单提交+存储操作
            submitForm(login) {
                // 提交登录表单
                this.$refs.login.validate((valid) => {
                    if (valid) {
                        // 提交表单到 checkLogin 方法
                        let params = {
                            'userSelf': this.login.user_self,
                            'userPassWord': this.login.pass_word
                        };
                        // ws_axios.setBaseIrl(1);
                        ws_axios.fetchPost1('/user/checkLogin', params).then((back) => {
                            // console.log(back.data);
                            if (back.data.resultCode === "1") {
                                this.$message.error('登录错误，请输入正确的用户名或密码');
                                this.clearCookie();
                            } else {
                                // 传入保存登录成功后返回的 UserId
                                this.$store.dispatch('saveUserInfoUserId', back.data.userId);
                                // 传入保存登录使用名 UserSelf
                                this.$store.dispatch('saveUserInfoUserSelf', this.login.user_self);

                                // 判断复选框是否被勾选 勾选则调用配置cookie方法
                                if (this.ws_checked === true && !this.isnull(this.login.user_self) && !this.isnull(this.login.pass_word)) {
                                    // 传入保存账号名，保存密码，保存天数3个参数
                                    this.setCookie(back.data.userId, this.login.user_self, this.login.pass_word, 7);
                                } else {
                                    // 清空Cookie
                                    this.clearCookie();
                                }

                                this.$router.push({path: '/'});
                                this.$notify({
                                    title: '登录成功',
                                    message: '欢迎登陆' + this.$store.getters.userInfo_userSelf,
                                    type: 'success'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 设置cookie
            setCookie: function (ws_user_id, ws_user_self, ws_pass_word, ws_save_days) {
                const current_date = new Date(); // 获取时间
                current_date.setTime(current_date.getTime() + 24 * 60 * 60 * 1000 * ws_save_days); // 保存的天数

                // 字符串拼接cookie
                window.document.cookie = "WSUserId" + "=" + ws_user_id + ";path=/;expires=" + current_date.toUTCString();
                window.document.cookie = "WSUserSelf" + "=" + ws_user_self + ";path=/;expires=" + current_date.toUTCString();
                window.document.cookie = "WSPassWord" + "=" + ws_pass_word + ";path=/;expires=" + current_date.toUTCString();
            },
            // 读取cookie
            getCookie: function () {
                if (document.cookie.length > 0) {
                    const array_ws_cookie_1 = document.cookie.split('; ');  // 这里显示的格式需要切割一下自己可输出看下

                    for (let i = 0; i < array_ws_cookie_1.length; i++) {
                        const array_ws_cookie_2 = array_ws_cookie_1[i].split('='); // 再次切割

                        // 判断查找相对应的值
                        if (array_ws_cookie_2[0] === 'WSUserSelf') {
                            this.login.user_self = array_ws_cookie_2[1];
                        } else if (array_ws_cookie_2[0] === 'WSPassWord') {
                            this.login.pass_word = array_ws_cookie_2[1];
                        }
                    }
                }
            },
            // 清除cookie
            clearCookie: function () {
                this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
            },
            gotoRegister() {
                this.$router.push("/register")
            }

        },
        mounted() {
            this.getCookie();
        }
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .login-page {
        /*position: absolute;*/
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 800px;
        width: 100%;
        background-color: #FFFFFF;
    }

    .login-page .login-header {
        /*border-bottom: 1px solid #DCDFE6;*/
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
