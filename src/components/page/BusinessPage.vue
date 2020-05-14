<template>
    <div class="business_page">
        <Header/>
        <div class="business_page_main">
            <el-row>
                <el-col :span="4">
                    <div class="main_left">
                        <!--占位块-->
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="main_top">
                        <BusinessTop/>
                    </div>
                    <div class="main_bottom">
                        <BusinessBottom/>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="main_right">
                        <!--占位块-->
                    </div>
                </el-col>
            </el-row>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "../header/Header";
    import Footer from "../footer/Footer";
    import BusinessTop from "../page_block/BusinessTop";
    import BusinessBottom from "../page_block/BusinessBottom";

    export default {
        name: "BusinessPage.vue",
        components: {Header, Footer, BusinessTop, BusinessBottom},
        created() {
            document.documentElement.scrollTop=192;
        },
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .business_page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
    }

    .business_page .business_page_main {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .business_page .business_page_main .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex
    }

    .business_page .business_page_main .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .business_page .business_page_main .main_left,
    .business_page .business_page_main .main_right {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .business_page .business_page_main .main_top {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .business_page .business_page_main .main_bottom {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }
</style>
