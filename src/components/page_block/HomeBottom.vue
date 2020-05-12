<template>
    <div class="home-main-middle-bottom">
        <div class="home-main-middle-bottom-top">
            <el-divider content-position="left">
                <el-image style="height: 50px; width: 125px;" v-bind:src="this.$store.getters.webImg_homeBottomDjtj"/>
            </el-divider>
        </div>
        <div class="home-main-middle-bottom-book">
            <el-row>
                <el-col :key="index" :offset="1" :span="4"
                        v-for="(bookItem,index) in this.$store.getters.resultInfo_homeInfo_bottomInfo_bookList">
                    <div class="book_card">
                        <div class="book_img">
                            <el-image style="width: 100px; height: 130px;" v-bind:src="bookItem.bookImagePath"/>
                        </div>
                        <div class="book_title">
                            <a>{{bookItem.bookName}}</a>
                        </div>
                        <div class="book_author">
                            <a>{{bookItem.bookAuthor}}</a>
                        </div>
                        <div class="book_price">
                            <a>￥{{bookItem.bookPrice}}</a>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";
    import HomeTop from "./HomeTop";

    export default {
        name: "HomeBottom.vue",
        data() {
            return {}
        },
        methods: {
            // 获取为当前用户推荐的书籍数据
            getRecommendBookInfoOfCurrentUser: function () {
                let params = {
                    'userId': this.$store.getters.currUserInfo.userId,
                };
                ws_axios.fetchGet2('redis/byUserId', params).then((back) => {
                    if (back.data.resultCode === "0") {
                        console.log("get error");
                    } else {
                        this.$store.dispatch("saveHomeInfoBottomInfoBookList", back.data);
                    }
                })
            },
        },
        mounted() {
            this.getRecommendBookInfoOfCurrentUser();
        }
    }
</script>

<style scoped>
    .home-main-middle-bottom {
        margin: 50px auto;
        padding: 0;
        width: 100%;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-top {
        margin: 0 auto;
        width: 100%;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book {
        margin: 0 auto;
        width: 100%;
        position: relative;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row {
        margin: 0 auto;
        padding: 0;
        /*text-align: left;*/
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row .el-col .book_card {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        border-left: 1px solid #e9e9eb;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row .el-col .book_card .book_img {
        margin: 20px auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row .el-col .book_card .book_title {
        margin-top: 5px;
        margin-left: 50px;
        font-size: 13px;
        padding: 0;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row .el-col .book_card .book_author {
        margin-top: 5px;
        margin-left: 50px;
        font-size: 12px;
        color: #999999;
        padding: 0;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row .el-col .book_card .book_price {
        margin-top: 5px;
        margin-left: 50px;
        font-size: 14px;
        font-weight: bold;
        color: #f56c6c;
        padding: 0;
        text-align: left;
    }
</style>
