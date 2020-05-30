<template>
    <div class="home-main-middle-bottom">
        <div class="home-main-middle-bottom-top">
            <el-divider content-position="left">
                <el-image style="height: 50px; width: 125px;" v-bind:src="this.$store.state.webImg.homeBottomDjtj"/>
            </el-divider>
        </div>
        <div class="home-main-middle-bottom-book">
            <el-tabs v-if="ifShowTags">
                <el-tab-pane :key="itemIndex" v-for="(item, itemIndex) in this.$store.state.resultInfo.homeInfo.bottomInfo.bookListM" >
                    <span style="font-size: 15px;" slot="label">{{item.bookTypeName}}</span>
                    <div class="list_block">
                        <el-row>
                            <el-col :key="bookItemIndex"
                                    :offset="1"
                                    :span="4"
                                    v-for="(bookItem, bookItemIndex) in item.bookRecommend">
                                <div class="book_card" @click="toDetailM(itemIndex, bookItemIndex)">
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
                </el-tab-pane>
                <div class="list_block">
                    <el-row>
                        <el-col :key="bookItemIndex"
                                :offset="1"
                                :span="4"
                                v-for="(bookItem, bookItemIndex) in this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS">
                            <div class="book_card" @click="toDetailS(bookItemIndex)">
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
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "HomeBottom.vue",
        data() {
            return {
                ifShowTags: false,
            }
        },
        methods: {
            getRecommendBookInfoOfCurrentUser: function () {
                let params = {
                    'userId': this.$store.state.currUserInfo.userId,
                };
                ws_axios.fetchPost1('recommend/getRecommendMahoutByUserId', params).then((back) => {
                    if (back.data.resultCode === "1") {
                        this.$store.dispatch("saveHomeInfoBottomInfoBookListM", back.data.recommendBookListM);
                    } else {
                        this.ifShowTags = true;
                    }
                });
                ws_axios.fetchPost1('recommend/getRecommendSystem', params).then((back) => {
                    if (back.data.resultCode === "1") {
                        this.ifShowTags = true;
                        this.$store.dispatch("saveHomeInfoBottomInfoBookListS", back.data.recommendBookListS);
                    }
                });
            },

            // 跳转至书籍信息详情页面
            toDetailM: function (index1, index2) {
                let params = {
                    'bookId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListM[index1].bookRecommend[index2].bookId,
                    'businessId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListM[index1].bookRecommend[index2].businessId,
                };
                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);
                });
                this.$router.push("/book_detail");
            },
            // 跳转至书籍信息详情页面
            toDetailS: function (index) {
                let params = {
                    'bookId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS[index].bookId,
                    'businessId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS[index].businessId,
                };
                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);
                });
                this.$router.push("/book_detail");
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

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row .el-col .book_card:hover {
        box-shadow: 0 0 4px #ccc;
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
        margin-right: 20px;
        font-size: 13px;
        padding: 0;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .el-row .el-col .book_card .book_author {
        margin-top: 5px;
        margin-left: 50px;
        margin-right: 20px;
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
