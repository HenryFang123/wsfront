<template>
    <div class="div-header">
        <div class="div-header-tools">
            <el-row>
                <el-col :span="4">
                    <div class="block_tools_left">
                        <!--占位块-->
                    </div>
                </el-col>
                <el-col :span="16">
                    <el-row>
                        <el-col :span="4">
                            <div class="div-header-tools-main-city">
                                <div class="div-header-tools-main-city-main">
                                    <span>送至: </span>
                                    <el-dropdown>
                                        <span class="el-dropdown-link">{{city}}<i
                                            class="el-icon-arrow-down el-icon--right"/></span>
                                        <el-dropdown-menu>
                                            <el-dropdown-item :key="index" v-for="(cityItem, index) in cityArr">
                                                <span @click="changeCity(cityItem)">{{cityItem}}</span>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="div-header-tools-main-link">
                                <div class="div-header-tools-main-link-main">
                                    <el-row>
                                        <el-col :span="10">
                                            <div class="div-header-tools-main-link-main-no_login" v-if="!if_login">
                                                <el-link :underline="false" @click="gotoLogin" icon="el-icon-user-solid"
                                                         type="info">你好，请<span
                                                    style="color: red; ">登录</span></el-link>
                                                <el-link :underline="false" @click="gotoRegister" icon="el-icon-user"
                                                         type="info">免费注册
                                                </el-link>&nbsp;&nbsp;&nbsp;
                                            </div>
                                            <div class="div-header-tools-main-link-main-yes_login" v-if="if_login">
                                                <el-link :underline="false" @click="gotoPersonPage" type="info">
                                                    欢迎访问WSBook商城：
                                                    <span>{{this.$store.getters.currUserInfo.userName}}</span></el-link>
                                            </div>
                                        </el-col>
                                        <el-col :span="14">
                                            <div class="div-header-tools-main-link-main-click">
                                                <el-link :underline="false" icon="el-icon-message-solid" type="info">
                                                    我的消息
                                                </el-link>&nbsp;&nbsp;&nbsp;
                                                <el-link :underline="false" icon="el-icon-s-platform" type="info">网站导航
                                                </el-link>&nbsp;&nbsp;&nbsp;
                                                <el-link :underline="false" icon="el-icon-edit" type="info">问题反馈
                                                </el-link>&nbsp;&nbsp;&nbsp;
                                                <el-link :underline="false" icon="el-icon-s-home" type="info">主页
                                                </el-link>&nbsp;
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4">
                    <div class="block_tools_right">
                        <!--占位块-->
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="div-header-main">
            <div class="div-header-main-search">
                <el-row>
                    <el-col :span="7">
                        <div class="div-header-main-search-ico">
                            <div class="div-header-main-search-ico-main">
                                <a href="/">
                                    <el-image v-bind:src="this.$store.getters.webImg_wsLogo" style="height: 115px; width: 115px"/>
                                </a>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="div-header-main-search-input">
                            <el-form :model="search" class="div-header-main-search-form"
                                     ref="search">
                                <el-form-item prop="inputSearchWord">
                                    <el-input class="input-to-search" clearable placeholder="查找你喜爱的书籍"
                                              v-model="search.inputSearchWord">
                                        <el-button @click="submitForm('search')" class="btn" icon="el-icon-search"
                                                   slot="append"/>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="div-header-main-search-button">
                            <div class="div-header-main-search-button-main">
                                <el-badge :max="99" :value="this.shopCarNum"
                                          class="div-header-main-search-button-shop_car">
                                    <el-button @click="gotoShopCar">购物车</el-button>
                                </el-badge>
                                <el-badge :max="99" :value="this.orderNum"
                                          class="div-header-main-search-button-order">
                                    <el-button @click="gotoSettlementPage">我的订单</el-button>
                                </el-badge>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="div-header-main-tag">
                <el-row>
                    <el-col :span="4">
                        <div class="block_tag_left">
                            <!--占位块-->
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <el-row>
                            <el-col :span="4">
                                <div class="div-header-main-tag-hot">
                                    <a>热门书籍推荐</a>
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <div class="div-header-main-tag-link">
                                    <el-row>
                                        <el-col :span="4">
                                            <el-link :underline="false" href="" type="info">图书</el-link>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-link :underline="false" href="" type="info">电子书</el-link>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-link :underline="false" href="" type="info">网络文学</el-link>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-link :underline="false" href="" type="info">小说</el-link>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-link :underline="false" href="" type="info">青春文学</el-link>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-link :underline="false" href="" type="info">历史书籍</el-link>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                        <div class="block_tag_right">
                            <!--占位块-->
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "Header.vue",
        inject: ['reload'],
        data() {
            return {
                if_login: false,
                user_self: '',
                orderNum: 0,
                shopCarNum: 0,
                search: {
                    inputSearchWord: ''
                },
                city: '北京',
                cityArr: [
                    '北京', '上海', '天津', '重庆', '广州', '深圳', '河南', '辽宁', '吉林', '江苏', '江西', '四川', '海南', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '珠海'
                ]
            }
        },
        created() {
            ws_axios.fetchPost1('/order/getOrderInfoCountByUserId',{'userId': this.$store.state.currUserInfo.userId}).then((back) =>{
                this.orderNum=back.data;
            });
            ws_axios.fetchPost1('/shopCar/getShopCarInfoCountByUserId',{'userId': this.$store.state.currUserInfo.userId}).then((back) =>{
                this.shopCarNum=back.data;
            })
        },
        methods: {
            // 判断输入框是否为空
            isnull: function (val) {
                const str = val.replace(/(^\s*)|(\s*$)/g, '');  //去除空格;
                return str === '' || str === undefined || str === null;
            },

            // 读取cookie
            getCookie: function () {
                if (document.cookie.length > 0) {
                    const array_ws_cookie_1 = document.cookie.split('; ');

                    for (let i = 0; i < array_ws_cookie_1.length; i++) {
                        const array_ws_cookie_2 = array_ws_cookie_1[i].split('=');

                        if (array_ws_cookie_2[0] === 'WSUserId') {
                            if (array_ws_cookie_2[1].length > 0) {
                                this.if_login = true;
                                let params = {
                                  "userId": array_ws_cookie_2[1],
                                };
                                this.$store.dispatch('saveCurrUserInfo', params);
                                this.getShopCarInfoOfCurrentUser();
                            }
                        }
                    }
                }
            },

            // 获取vuex传递参数
            getDataFromVuex: function () {
                if (this.$store.getters.currUserInfo.userName === undefined) {
                    let params = {
                        'userId': this.$store.getters.currUserInfo.userId,
                    };
                    ws_axios.fetchPost1('/user/getUserInfoByUserId', params).then((back) => {
                        this.$store.dispatch('saveCurrUserInfo', back.data);
                    });
                } else {
                    this.if_login = true;
                    if (this.$store.state.resultInfo.shopCarInfo.list.length === 0){
                        this.getShopCarInfoOfCurrentUser();
                    }
                }
                if (this.$store.getters.searchInfo_searchWord.length > 0) {
                    this.search.inputSearchWord = this.$store.getters.searchInfo_searchWord;
                }
            },

            // 获取当前用户所有的购物车数据
            getShopCarInfoOfCurrentUser() {
                let params = {
                    'userId': this.$store.getters.currUserInfo.userId,
                };
                ws_axios.fetchPost1('/shopCar/getShopCarListInfoByUserId', params).then((back) => {
                    this.$store.dispatch("saveShopCarInfoList", back.data);
                })
            },

            // 改变城市选择
            changeCity: function (city) {
                this.city = city;
            },

            // 查询操作 + 存储
            submitForm(search) {
                if (this.isnull(this.search.inputSearchWord)) {
                    this.$message.error('错误，输入框不能为空');
                } else {
                    this.$refs.search.validate((valid) => {
                        if (valid) {
                            this.$store.dispatch('saveSearchInfoSearchWord', this.search.inputSearchWord);
                            this.$router.push("/to_list");
                        } else {
                            return false;
                        }
                    });
                }
            },

            gotoShopCar() {
                this.$router.push("/shop_car")
            },

            gotoLogin() {
                this.$router.push("/login")
            },

            gotoRegister() {
                this.$router.push("/register")
            },

            gotoPersonPage() {
                this.$router.push("/person_page")
            },

            gotoSettlementPage() {
                this.$router.push("/settlement_page")
            },
        },
        mounted() {
            this.getCookie();
            this.getDataFromVuex();
        },
    }
</script>

<style>
    .el-input__inner:focus{
        border-color:#DCDFE6;
    }
    .div-header {
        width: 100%;
        text-align: center;
        border-bottom: 2px solid #f56c6c;
    }

    .div-header .div-header-tools {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        height: 30px;
        background-color: #F7F7F7;
        border-bottom: 1px solid #e9e9eb;
    }

    .div-header .div-header-tools .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
    }

    .div-header .div-header-tools .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .div-header .div-header-tools .block_tools_left,
    .div-header .div-header-tools .block_tools_right {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .div-header .div-header-tools .el-row .el-col .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
    }

    .div-header .div-header-tools .el-row .el-col .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .div-header .div-header-tools .div-header-tools-main-city {
        margin: 0 auto;
        text-align: left;
    }

    .div-header .div-header-tools .div-header-tools-main-city-main {
        margin: 5px auto;
        font-size: 13px;
        text-align: left;
    }

    .div-header .div-header-tools .div-header-tools-main-city .el-dropdown-link {
        cursor: pointer;
        color: #999999;
    }

    .div-header .div-header-tools .div-header-tools-main-city .el-icon-arrow-down {
        font-size: 12px;
    }

    .div-header .div-header-tools .div-header-tools-main-link {
        margin: 0 auto;
        text-align: right;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main {
        margin: 0 auto;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-no_login {
        margin: 0 auto;
        padding: 0;
        height: 100%;
        text-align: left;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-no_login .el-link {
        margin: 3px 10px 0 4px;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-no_login .el-link:hover {
        margin: 3px 10px 0 4px;
        cursor: pointer;
        color: #FF3228;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-yes_login {
        margin: 0 auto;
        padding: 0;
        height: 100%;
        text-align: left;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-yes_login .el-link {
        margin: 3px 10px 0 4px;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-yes_login .el-link:hover {
        margin: 3px 10px 0 4px;
        cursor: pointer;
        color: #FF3228;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-click {
        margin: 0 auto;
        padding: 0;
        height: 100%;
        text-align: right;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-click .el-link {
        margin: 3px 10px 0 4px;
    }

    .div-header .div-header-tools .div-header-tools-main-link-main .el-row .el-col .div-header-tools-main-link-main-click .el-link:hover {
        margin: 3px 10px 0 4px;
        cursor: pointer;
        color: #FF3228;
    }

    .div-header .div-header-main {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        /*height: 170px;*/
        background-color: #F7F7F7;
        text-align: center;
    }

    .div-header .div-header-main .div-header-main-search {
        margin: 0 auto;
        padding: 1px;
    }

    .div-header .div-header-main .div-header-main-search .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
    }

    .div-header .div-header-main .div-header-main-search .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .div-header .div-header-main .div-header-main-search .div-header-main-search-ico {
        margin-top: 0;
        margin-right: 120px;
        text-align: right;
    }

    .div-header .div-header-main .div-header-main-search .div-header-main-search-ico .div-header-main-search-ico-main {
        margin-top: 5px;
    }

    .div-header .div-header-main .div-header-main-search .div-header-main-search-input {
        margin-top: 40px;
        padding: 0;
        text-align: center;
    }

    .div-header .div-header-main .div-header-main-search-input .div-header-main-search-form {
        margin: 0 auto;
        width: 595px;
    }

    .div-header .div-header-main .div-header-main-search-input .div-header-main-search-form .input-to-search {
        margin: 0 auto;
        width: 100%;
        border: 2px solid #f56c6c;
    }

    .div-header .div-header-main .div-header-main-search .div-header-main-search-button {
        margin-top: 0;
        text-align: left;
    }

    .div-header .div-header-main .div-header-main-search .div-header-main-search-button .div-header-main-search-button-main {
        margin-top: 40px;
    }

    .div-header .div-header-main .div-header-main-search .div-header-main-search-button .div-header-main-search-button-shop_car {
        margin-top: 1px;
        margin-right: 15px;
    }

    .div-header .div-header-main .div-header-main-search .div-header-main-search-button .div-header-main-search-button-order {
        margin-top: 1px;
        margin-left: 5px;
    }

    .div-header .div-header-main .div-header-main-tag {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        background-color: #FFFFFF;
    }

    .div-header .div-header-main .div-header-main-tag .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
    }

    .div-header .div-header-main .div-header-main-tag .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .div-header .div-header-main .div-header-main-tag .block_tag_left,
    .div-header .div-header-main .div-header-main-tag .block_tag_right {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .div-header .div-header-main .div-header-main-tag .div-header-main-tag-hot {
        margin: 0 auto;
        height: 35px;
        color: #FFFFFF;
        font-size: 18px;
        background-color: #FF3228;
    }

    .div-header .div-header-main .div-header-main-tag .div-header-main-tag-link {
        margin: 0 auto;
        height: 35px;
        font-size: 20px;
    }

    .div-header .div-header-main .div-header-main-tag .div-header-main-tag-link .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
    }

    .div-header .div-header-main .div-header-main-tag .div-header-main-tag-link .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .div-header .div-header-main .div-header-main-tag .div-header-main-tag-link .el-link {
        margin: 5px auto;
        font-size: 15px;
    }

    .div-header .div-header-main .div-header-main-tag .div-header-main-tag-link .el-link:hover {
        margin: 4px auto;
        font-size: 17px;
        cursor: pointer;
        color: #FF3228;
    }
</style>
