<!--项目前端，商城首页面-->
<template>
    <div class="home-page">
        <!-- 引入 Header.vue， 做页面头部 -->
        <Header/>

        <!-- 页面头部主题内容块 -->
        <div class="home-main">
            <el-row>
                <el-col :span="4">
                    <div class="block_home_main_left">
                        <!--占位块-->
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="home-main-middle">
                        <HomeTop/>
                        <HomeBottom/>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="block_home_main_right">
                        <!--占位块-->
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 引入 Footer.vue， 做页面尾部 -->
        <Footer/>
    </div>
</template>

<script>
    import Header from "./header/Header";
    import Footer from "./footer/Footer";
    import HomeTop from "./page_block/HomeTop";
    import HomeBottom from "./page_block/HomeBottom";
    import ws_axios from "network/ws_axios";

    export default {
        name: "Home.vue",
        components: {Header, Footer, HomeTop, HomeBottom},
        methods: {
            // 获取当前用户所有的购物车数据
            getShopCarInfoOfCurrentUser: function () {
                if (this.$store.getters.userInfo_userId.length > 0) {
                    // ws_axios.setBaseIrl(1);
                    let params = {'userId': this.$store.getters.userInfo_userId};
                    ws_axios.fetchPost1('/shopCar/getShopCarInfoByUserId', params).then((back) => {
                        if (back.data.resultCode === "0") {
                            console.log("get error");
                        } else {
                            this.$store.dispatch("saveShopCarInfoList", back.data);
                        }
                    })
                } else {
                    console.log("no user id.");
                }
            }
        },
        mounted() {
            this.getShopCarInfoOfCurrentUser();
        },
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .home-page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
    }

    .home-page .home-main {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .home-page .home-main .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex
    }

    .home-page .home-main .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .home-page .home-main .block_home_main_left,
    .home-page .home-main .block_home_main_right {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .home-page .home-main .home-main-middle {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }
</style>
