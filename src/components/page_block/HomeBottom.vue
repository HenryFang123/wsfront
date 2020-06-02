<template>
    <div class="home-main-middle-bottom">
        <div class="home-main-middle-bottom-book">
            <div class="list_block" v-if="ifShowTags">
                <el-divider content-position="left">
                    <el-image style="height: 50px; width: 125px;" v-bind:src="this.$store.state.webImg.homeBottomDjtj"/>
                </el-divider>
                <el-tabs style="margin-top: 40px;" type="border-card" :stretch=true>
                    <el-tab-pane :key="'mahout-recommend-' + itemIndex"
                                 v-for="(item, itemIndex) in this.$store.state.resultInfo.homeInfo.bottomInfo.bookListM">
                        <span slot="label" style="font-size: 17px; margin-left: 20px; margin-right: 20px;">{{item.bookTypeName}}</span>
                        <el-row>
                            <el-col :key="'mahout-recommend-list-' + bookItemIndex"
                                    :offset="1"
                                    :span="4"
                                    v-for="(bookItem, bookItemIndex) in item.bookRecommend">
                                <div @click="toDetailM(itemIndex, bookItemIndex)" class="book_card">
                                    <div class="book_img">
                                        <el-image style="width: 100px; height: 130px;"
                                                  v-bind:src="bookItem.bookImagePath"/>
                                    </div>
                                    <div class="book_title">
                                        <a>{{bookItem.bookName | ellipsisName}}</a>
                                    </div>
                                    <div class="book_author">
                                        <a>{{bookItem.bookAuthor | ellipsisAuthor}}</a>
                                    </div>
                                    <div class="book_price">
                                        <a>￥{{bookItem.bookPrice}}</a>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="list_block_2">
                <el-divider content-position="left">
                    <el-image style="height: 50px; width: 125px;" v-bind:src="this.$store.state.webImg.homeBottomXttj"/>
                </el-divider>
                <el-row>
                    <el-col :key="'system-recommend-' + bookItemIndex"
                            :offset="1"
                            :span="4"
                            v-for="(bookItem, bookItemIndex) in this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS">
                        <div @click="toDetailS(bookItemIndex)" class="book_card">
                            <div class="book_img">
                                <el-image style="width: 100px; height: 130px;" v-bind:src="bookItem.bookImagePath"/>
                            </div>
                            <div class="book_title">
                                <a>{{bookItem.bookName | ellipsisName}}</a>
                            </div>
                            <div class="book_author">
                                <a>{{bookItem.bookAuthor | ellipsisAuthor}}</a>
                            </div>
                            <div class="book_price">
                                <a>￥{{bookItem.bookPrice}}</a>
                            </div>
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
        name: "HomeBottom.vue",
        data() {
            return {
                ifShowTags: false,
            }
        },
        filters: {
            // 设置书名超长显示内容
            ellipsisName(value) {
                if (value.length > 9) {
                    return value.slice(0, 9) + '...';
                } else {
                    return value;
                }
            },

            // 设置作者名超长显示内容
            ellipsisAuthor(value) {
                if (value.length > 11) {
                    return value.slice(0, 11) + '...';
                } else {
                    return value;
                }
            },
        },
        methods: {
            getRecommendBookInfoOfCurrentUser() {
                let params = {
                    'userId': this.$store.state.currUserInfo.userId,
                };

                ws_axios.fetchPost1('/recommend/getRecommendMahoutByUserId', params).then((back) => {
                    if (back.data.resultCode === "1") {
                        this.ifShowTags = true;
                        this.$store.dispatch("saveHomeInfoBottomInfoBookListM", back.data.recommendBookListM);
                    } else {
                        this.ifShowTags = false;
                    }
                });

                ws_axios.fetchPost1('/recommend/getRecommendSystem', {}).then((back) => {
                    if (back.data.resultCode === "1") {
                        this.$store.dispatch("saveHomeInfoBottomInfoBookListS", back.data.recommendBookListS);
                    }
                });
            },

            // 跳转至书籍信息详情页面
            toDetailM(index1, index2) {
                let params = {
                    'bookId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListM[index1].bookRecommend[index2].bookId,
                    'businessId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListM[index1].bookRecommend[index2].businessId,
                };

                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);

                    // 首页点击图片进入详情页权重值为 5
                    let params_after = {
                        userId: this.$store.state.currUserInfo.userId,
                        bookTypeId: this.$store.state.resultInfo.homeInfo.bottomInfo.bookListM[index1].bookRecommend[index2].bookTypeId,
                        number: 5,
                    };

                    ws_axios.fetchPost1('/userTypeNumber/operateUserTypeNumber', params_after).then((back) => {
                        this.$router.push("/book_detail");
                    });
                });
            },
            // 跳转至书籍信息详情页面
            toDetailS(index) {
                let params = {
                    'bookId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS[index].bookId,
                    'businessId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS[index].businessId,
                };

                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);

                    // 首页点击图片进入详情页权重值为 5
                    let params_after = {
                        userId: this.$store.state.currUserInfo.userId,
                        bookTypeId: this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS[index].bookTypeId,
                        number: 5,
                    };

                    ws_axios.fetchPost1('/userTypeNumber/operateUserTypeNumber', params_after).then((back) => {
                        this.$router.push("/book_detail");
                    });
                });
            },
        },
        mounted() {
            this.getRecommendBookInfoOfCurrentUser();
        },
    }
</script>

<style scoped>
    .home-main-middle-bottom {
        margin: 50px auto;
        padding: 0;
        width: 100%;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book {
        margin: 0 auto;
        width: 100%;
        position: relative;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block {
        margin: 0 auto;
        width: 100%;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block .el-row .el-col .book_card {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block .el-row .el-col .book_card:hover {
        box-shadow: 0 0 4px #ccc;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block .el-row .el-col .book_card .book_img {
        margin: 20px auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block .el-row .el-col .book_card .book_title {
        margin-top: 5px;
        margin-left: 50px;
        margin-right: 20px;
        font-size: 13px;
        padding: 0;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block .el-row .el-col .book_card .book_author {
        margin-top: 5px;
        margin-left: 50px;
        margin-right: 20px;
        font-size: 12px;
        color: #999999;
        padding: 0;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block .el-row .el-col .book_card .book_price {
        margin-top: 5px;
        margin-left: 50px;
        font-size: 14px;
        font-weight: bold;
        color: #f56c6c;
        padding: 0;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 {
        margin: 50px auto;
        width: 100%;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 .el-row {
        margin: 0 auto;
        padding: 0;
        /*text-align: left;*/
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 .el-row .el-col .book_card {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        border-left: 1px solid #e9e9eb;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 .el-row .el-col .book_card:hover {
        box-shadow: 0 0 4px #ccc;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 .el-row .el-col .book_card .book_img {
        margin: 20px auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 .el-row .el-col .book_card .book_title {
        margin-top: 5px;
        margin-left: 50px;
        margin-right: 20px;
        font-size: 13px;
        padding: 0;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 .el-row .el-col .book_card .book_author {
        margin-top: 5px;
        margin-left: 50px;
        margin-right: 20px;
        font-size: 12px;
        color: #999999;
        padding: 0;
        text-align: left;
    }

    .home-main-middle-bottom .home-main-middle-bottom-book .list_block_2 .el-row .el-col .book_card .book_price {
        margin-top: 5px;
        margin-left: 50px;
        font-size: 14px;
        font-weight: bold;
        color: #f56c6c;
        padding: 0;
        text-align: left;
    }
</style>
