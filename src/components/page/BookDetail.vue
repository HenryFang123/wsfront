<template>
    <div class="book_detail_page">
        <Header/>
        <div class="main">
            <el-row>
                <el-col :span="4">
                    <div class="main_left">
                        <!--占位块-->
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="main_top">
                        <BookSelect/>
                    </div>
                    <div class="main_bottom">
                        <BookShow/>
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
    import Header from "../header/Header"
    import Footer from "../footer/Footer";
    import BookSelect from "../page_block/BookSelect";
    import BookShow from "../page_block/BookShow";
    import ws_axios from "network/ws_axios";

    export default {
        name: "BookDetail.vue",
        components: {Header, Footer, BookSelect, BookShow},
        created() {
            document.documentElement.scrollTop=0
        },
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .book_detail_page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
    }

    .book_detail_page .main {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .book_detail_page .main .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex
    }

    .book_detail_page .main .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .book_detail_page .main .main_left,
    .book_detail_page .main .main_right {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .book_detail_page .main .main_top {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .book_detail_page .main .main_bottom {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }
</style>
