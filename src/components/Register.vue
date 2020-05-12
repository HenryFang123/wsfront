<template>
    <div class="register-page">
        <div class="register-header">
            <div class="register-header-block">
                <div class="register-header-block-img">
                    <el-image style="height: 80px; width: 80px" v-bind:src="this.$store.getters.webImg_wsLogo"/>
                </div>
                <div class="register-header-block-span">
                    <span>欢迎注册</span>
                </div>
                <div class="register-header-block-link">
                    <el-link :underline="false" @click="gotoLogin">已有帐号？请<span style="color: red; ">登录></span></el-link>
                </div>
            </div>
        </div>

        <div class="register-main">
            <div class="register-main-block">
                <el-steps :active="registerActive" align-center finish-status="success">
                    <el-step title="验证手机"/>
                    <el-step title="设置信息"/>
                    <el-step title="注册成功"/>
                </el-steps>
                <el-form :model="register" class="register-main-form"
                         ref="register">
                    <div class="register-main-form-step_phone" v-if="registerActive===0">
                        <el-form-item prop="user_phone">
                            <el-input class="register-main-form-step_phone-select_phone" clearable
                                      n placeholder="建议使用常用手机号" v-model="register.user_phone" v-on:blur="checkPhone">
                                <el-select placeholder="中国(+86)" slot="prepend" v-model="register.selectPhoneFront">
                                    <el-option label="暂无其他选项" value="1"/>
                                </el-select>
                            </el-input>
                            <el-input class="register-main-form-step_phone-get_code" clearable placeholder="请输入验证码"
                                      v-model="register.inputCode">
                                <el-button @click="registerGetCode"
                                           class="register-main-form-step_phone-get_code-button" slot="append">
                                    <span v-if="!sendMsgDisabled && !reGet">获取验证码</span>
                                    <span v-if="!sendMsgDisabled && reGet">重新获取</span>
                                    <span v-if="sendMsgDisabled">{{'输入验证码('+ codeTime + ')'}}</span>
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="registerNext" class="el-button" plain type="info">下一步</el-button>
                        </el-form-item>
                    </div>
                    <div class="register-main-form-step_info" v-if="registerActive===1">
                        <el-form-item prop="user_name">
                            <el-input auto-complete="off" clearable placeholder="设置用户名" type="text"
                                      v-model="register.user_name">
                                <template slot="prepend">用户名：</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="pass_word">
                            <el-input auto-complete="off" clearable placeholder="设置密码" type="password"
                                      v-model="register.pass_word">
                                <template slot="prepend">密&emsp;&emsp;码：</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="pass_word2">
                            <el-input auto-complete="off" clearable placeholder="确认密码" type="password"
                                      v-model="register.pass_word2">
                                <template slot="prepend">确认密码：</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="submitForm('register')" class="el-button" plain type="primary">注&emsp;&emsp;册
                            </el-button>
                        </el-form-item>
                    </div>
                    <div class="register-main-form-step_mesg" v-if="registerActive===2">
                        <div class="register-main-form-step_mesg-info">
                            <span>注册成功</span>
                        </div>
                        <div class="register-main-form-step_mesg-link">
                            <el-link @click="registerOver" type="success">进入首页></el-link>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>

        <div class="register-footer">
            <footer class="register-footer-block">
                <div/>
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
                    <div/>
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
        name: "Register.vue",
        data() {
            return {
                registerActive: 0,  // 注册页面轮转参数
                reGet: false, // 重新获取
                codeTime: 60, // 发送验证码倒计时
                sendMsgDisabled: false, // 发送验证码按钮状态
                register: {
                    user_phone: '',
                    selectPhoneFront: '',
                    inputCode: '',
                    user_name: '',
                    pass_word: '',
                    pass_word2: ''
                },
                phoneCode: '',
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

            // 获取当前时间并格式化生成用户 userId
            getCurrentTimeToBeUserId: function () {
                const date = new Date();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                let submitUserId = "";
                submitUserId += "";
                if (month >= 10) {
                    submitUserId += month;
                } else {
                    submitUserId += "0" + month;
                }

                if (day >= 10) {
                    submitUserId += day;
                } else {
                    submitUserId += "0" + day;
                }

                if (hours >= 10) {
                    submitUserId += hours;
                } else {
                    submitUserId += "0" + hours;
                }

                if (minutes >= 10) {
                    submitUserId += minutes;
                } else {
                    submitUserId += "0" + minutes;
                }

                if (seconds >= 10) {
                    submitUserId += seconds;
                } else {
                    submitUserId += "0" + seconds;
                }

                return parseInt(submitUserId);
            },

            // 注册页面轮换页
            registerNext: function () {
                if (this.isnull(this.register.user_phone) || this.isnull(this.register.inputCode)) {
                    this.$message.error('错误，输入框不能为空');
                } else {
                    if (this.register.inputCode !== this.phoneCode) {
                        this.$message.error('验证错误，请输入正确的手机验证码');
                    } else {
                        if (this.registerActive++ > 2) {
                            this.registerActive = 0;
                        }
                    }
                }
            },

            // 验证手机号
            checkPhone: function () {
                if (this.register.user_phone !== null) {
                    let params = {'userPhone': this.register.user_phone};
                    ws_axios.fetchPost1('/utils/checkPhone', params).then((back) => {
                        if (back.data.resultCode === "0") {
                            this.$message.error('注册手机号已被占用，请更换');
                        }
                    });
                }
            },

            // 获取手机验证码
            registerGetCode: function () {
                if (this.register.user_phone.length !== 11) {
                    this.$message.error('输入错误，请输入正确的手机号');
                } else {
                    let params = {'userPhone': this.register.user_phone};
                    ws_axios.fetchPost1('/utils/sendSms', params).then((back) => {
                        if (back.data.resultCode === "0") {
                            this.$message.error('未知错误，请重新获取');
                        } else {
                            this.$message({
                                message: '验证码已发送，请注意查收',
                                type: 'success'
                            });

                            this.phoneCode = back.data.phoneCode;

                            this.sendMsgDisabled = true;
                            let codeTime = this.codeTime;
                            let interval = window.setInterval(() => {
                                if (--this.codeTime <= 0) {
                                    this.codeTime = codeTime;
                                    this.sendMsgDisabled = false;
                                    this.reGet = true;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        }
                    });
                }
            },

            // 进入首页，结束注册
            registerOver: function () {
                this.$router.push({path: '/'});
                this.$notify({
                    title: '注册完成',
                    message: '欢迎登陆' + this.$store.getters.currUserInfo.userName,
                    type: 'success'
                });
            },

            // 注册提交表单验证
            submitForm(register) {
                if (this.isnull(this.register.user_name) || this.isnull(this.register.pass_word) || this.isnull(this.register.pass_word2)) {
                    this.$message.error('错误，输入框不能为空');
                } else if (this.register.pass_word.length < 6 || this.register.pass_word2.length < 6) {
                    this.$message.error('错误，密码长度最小6位');
                } else {
                    this.$refs.register.validate((valid) => {
                        if (valid) {
                            let params = {
                                userId: this.getCurrentTimeToBeUserId(),
                                'userName': this.register.user_name,
                                'userPassWord': this.register.pass_word,
                                'userPhone': this.register.user_phone,
                                userTar: 0
                            };
                            ws_axios.fetchPost1('/user/doRegister', params).then((back) => {
                                if (back.data.resultCode === "0") {
                                    this.$message.error('注册错误，注册过程中发生未知错误');
                                } else {
                                    this.$store.dispatch('saveUserInfo', back.data.userInfoObject);
                                    this.registerActive++;
                                    this.clearCookie();
                                }
                            })
                        } else {
                            return false;
                        }
                    });
                }
            },

            // 清除cookie
            clearCookie: function () {
                this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
            },

            gotoLogin() {
                this.$router.push("/login")
            },
        },
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .register-page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
    }

    .register-page .register-header {
        box-shadow: 0 3px 5px #cac6c6;
        background-color: #FFFFFF;
        color: #000000;
        font-size: 30px;
        height: 100px;
        text-align: center;
    }

    .register-page .register-header .register-header-block {
        margin: 10px auto;
        width: 950px;
        height: 80px;
    }

    .register-page .register-header .register-header-block .register-header-block-img {
        float: left;
        height: 80px;
        margin-top: 10px;
        margin-right: 20px;
    }

    .register-page .register-header .register-header-block .register-header-block-span {
        float: left;
        height: 50px;
        margin-top: 25px;
        font-size: 35px;
        text-align: center;
    }

    .register-page .register-header .register-header-block .register-header-block-link {
        float: right;
        height: 20px;
        margin-top: 55px;
    }

    .register-page .register-main {
        margin: 5px auto;
        padding: 50px 0 0 0;
        text-align: center;
        background-color: #FFFFFF;
        width: 100%;
        height: 450px;
    }

    .register-page .register-main .register-main-block {
        margin: 0 auto;
        padding: 20px;
        width: 650px;
        height: 400px;
        background-color: #FFFFFF;
        text-align: center;
    }

    .register-page .register-main .register-main-block .register-main-form {
        margin: 0 auto;
        width: 530px;
        height: 300px;
        background-color: #FFFFFF;
        text-align: center;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_phone {
        margin-top: 50px;
        width: 100%;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_phone .register-main-form-step_phone-select_phone {
        width: 340px;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_phone .register-main-form-step_phone-select_phone .el-select {
        width: 110px;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_phone .register-main-form-step_phone-get_code {
        margin-top: 30px;
        width: 340px;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_phone .register-main-form-step_phone-get_code .register-main-form-step_phone-get_code-button {
        margin-top: 0;
        margin-bottom: 0;
        width: 120px;
        text-align: center;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_phone .el-button {
        margin-top: 20px;
        width: 270px;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_info {
        margin-top: 50px;
        background-color: #FFFFFF;
        width: 100%;
        text-align: center;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_info .el-form-item {
        margin: 25px auto;
        width: 360px;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_info .el-button {
        margin-top: 20px;
        width: 270px;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_mesg {
        margin: 50px auto;
        padding: 10px;
        background-color: #FFFFFF;
        /*width: 100%;*/
        height: 280px;
        text-align: center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_mesg .register-main-form-step_mesg-info {
        margin: 30px 0 0;
        padding: 20px;
        /*width: 100%;*/
        text-align: center;
        font-size: 40px;
        color: #f56c6c;
        background-color: #f7f7f7;
    }

    .register-page .register-main .register-main-block .register-main-form .register-main-form-step_mesg .register-main-form-step_mesg-link {
        margin: 10px 0 0;
        padding: 0;
        /*width: 100%;*/
        text-align: center;
    }

    .register-page .register-footer {
        background-color: #FFFFFF;
        text-align: center;
        height: 70px;
    }

    .register-page .register-footer .register-footer-block {
        width: 100%;
        height: 65px;
        margin-top: 5px;
        background-color: #FFFFFF;
    }

    .register-page .register-footer .register-footer-block .service-intro {
        width: 100%;
    }

    .register-page .register-footer .register-footer-block .service-intro .friend-link {
        border-top: 1px solid #cac6c6;
        display: flex;
        align-items: center;
        width: 910px;
        height: 30px;
        margin: 0 auto;
        color: #666666;
    }

    .register-page .register-footer .register-footer-block .service-intro .friend-link .friend-link-item {
        margin: 0 auto;
    }

    .register-page .register-footer .register-footer-block .service-intro .friend-link .friend-link-item ul {
        list-style: none;
    }

    .register-page .register-footer .register-footer-block .service-intro .friend-link .friend-link-item ul li {
        padding: 7px 0;
        float: left;
    }

    .register-page .register-footer .register-footer-block .service-intro .friend-link .friend-link-item ul li .link-item {
        padding: 0 8px;
        cursor: pointer;
        border-right: 1px solid #ccc;
    }

    .register-page .register-footer .register-footer-block .service-intro .friend-link .friend-link-item ul li .link-last-item {
        border: none;
    }

    .register-page .register-footer .register-footer-block .service-intro .copyright {
        width: 100%;
        color: #666666;
        line-height: 30px;
        text-align: center;
    }

    .register-page .register-footer .register-footer-block .service-intro .copyright a {
        color: #232323;
        font-size: 20px;
    }
</style>
