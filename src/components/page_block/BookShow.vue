<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="book_show">
        <div class="business_recommend">
            <div class="business_recommend_title">
                <p>店铺热销</p>
            </div>
            <div class="business_recommend_book">
                <div :key="index"
                     class="business_recommend_list"
                     v-for="(bookItem, index) in this.$store.getters.resultInfo_bookDetailInfo_businessBookList">
                    <div class="business_recommend_image">
                        <el-image style="height: 150px; width: 130px;cursor: pointer;"
                                  v-bind:src="bookItem.book_image_path"/>
                    </div>
                    <div class="business_recommend_info">
              <span>
                <span class="business_recommend_num">{{index + 1}}</span> 热销{{bookItem.book_num}}件</span>
                        <span class="business_recommend_price">￥{{bookItem.book_price}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="book_detail">
            <el-row>
                <div class="book_detail_block block_tab">
                    <el-tabs @tab-click="handleClickDetail" v-model="activeNameDetail">
                        <el-tab-pane label="商品介绍" name="first">
                            <div class="book_detail_main">
                                <el-row style="text-align: left; margin-left: 30px; margin-top: 5px;">
                                    <span>作者：</span>
                                    <el-link style="font-size: 15px;color: #6E77BD">
                                        {{this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookAuthor}}
                                    </el-link>
                                </el-row>
                                <el-row style="text-align: left; margin-left: 30px; margin-top: 5px;">
                                    <span>出版社：{{this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookPub}}</span>
                                </el-row>
                                <el-row style="text-align: left; margin-left: 30px; margin-top: 5px;">
                                    <span>出版年月：{{this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookYear}}</span>
                                </el-row>
                                <el-row style="text-align: left; margin-left: 30px; margin-top: 5px;">
                                    <span>ISBN：{{this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookIsbn}}</span>
                                </el-row>
                                <el-row
                                    style="text-align: left; margin-left: 30px; margin-top: 3px; margin-bottom: 30px;">
                                    <p><span style="color: #527722;margin-left: 0">内容简介  · · · · · ·</span></p>
                                    <p><span style="margin-left: 20px">{{this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookDescription}}</span>
                                    </p>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="商品评价" name="second">

                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-row>
            <el-row>
                <div class="book_recommend_block">
                    <el-tabs @tab-click="handleClickRecommend" type="border-card" v-model="activeNameRecommend">
                        <el-tab-pane label="相同作者" name="first">
                            <el-row>
                                <el-col :key="index"
                                        :span="4"
                                        v-for="(bookItem,index) in this.$store.getters.resultInfo_bookDetailInfo_authorBookList">
                                    <div class="book_card">
                                        <div class="book_img">
                                            <el-image style="width: 90px; height: 110px;" v-bind:src="bookItem.img"/>
                                        </div>
                                        <div class="book_title">
                                            <a>{{bookItem.title}}</a>
                                        </div>
                                        <div class="book_author">
                                            <a>{{bookItem.author}}</a>
                                        </div>
                                        <div class="book_price">
                                            <a>￥{{bookItem.price}}</a>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="相同类型" name="second">
                            <el-row>
                                <el-col :key="index"
                                        :span="4"
                                        v-for="(bookItem,index) in this.$store.getters.resultInfo_bookDetailInfo_typeBookList">
                                    <div class="book_card">
                                        <div class="book_img">
                                            <el-image style="width: 90px; height: 110px;" v-bind:src="bookItem.img"/>
                                        </div>
                                        <div class="book_title">
                                            <a>{{bookItem.title}}</a>
                                        </div>
                                        <div class="book_author">
                                            <a>{{bookItem.author}}</a>
                                        </div>
                                        <div class="book_price">
                                            <a>￥{{bookItem.price}}</a>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="相同出版社" name="third">
                            <el-row>
                                <el-col :key="index"
                                        :span="4"
                                        v-for="(bookItem,index) in this.$store.getters.resultInfo_bookDetailInfo_pressBookList">
                                    <div class="book_card">
                                        <div class="book_img">
                                            <el-image style="width: 90px; height: 110px;" v-bind:src="bookItem.img"/>
                                        </div>
                                        <div class="book_title">
                                            <a>{{bookItem.title}}</a>
                                        </div>
                                        <div class="book_price">
                                            <a>￥{{bookItem.price}}</a>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "BookShow.vue",
        inject: ['reload'],
        data() {
            return {
                activeNameDetail: 'first',
                activeNameRecommend: 'first',
            };
        },
        computed: {},
        methods: {
            handleClickDetail(tab, event) {
                console.log(tab, event);
            },

            handleClickRecommend(tab, event) {
                console.log(tab, event);
            },

            // 获取相同作者书籍的推荐
            getAuthorBookRecommendInfo: function () {
                let params = {
                    'name': this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookIsbn,
                    'pageNum': 0,
                    'pageSize': 6
                };
                ws_axios.fetchGet2('/author/byBookNodeName', params).then((back) => {
                    if (back.data.resultCode === "0") {
                        console.log("error");
                    } else {
                        this.$store.dispatch("saveBookDetailInfoAuthorBookList", back.data);
                    }
                });
            },

            // 获取相同类型书籍的推荐
            getTypeBookRecommendInfo: function () {
                let params = {
                    'name': this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookIsbn,
                    'pageNum': 0,
                    'pageSize': 6
                };
                ws_axios.fetchGet2('/type/byBookNodeName', params).then((back) => {
                    if (back.data.resultCode === "0") {
                        console.log("error");
                    } else {
                        this.$store.dispatch("saveBookDetailInfoTypeBookList", back.data);
                    }
                });
            },

            // 获取相同出版社书籍的推荐
            getPressBookRecommendInfo: function () {
                let params = {
                    'name': this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookIsbn,
                    'pageNum': 0,
                    'pageSize': 6
                };
                ws_axios.fetchGet2('/press/byBookNodeName', params).then((back) => {
                    if (back.data.resultCode === "0") {
                        console.log("error");
                    } else {
                        this.$store.dispatch("saveBookDetailInfoPressBookList", back.data);
                    }
                });
            },
        },
        mounted() {
            this.getAuthorBookRecommendInfo();
            this.getTypeBookRecommendInfo();
            this.getPressBookRecommendInfo();
        },
        updated() {
        },
    }
</script>

<style scoped>
    .book_show {
        width: 100%;
        margin: 40px auto;
        display: flex;
        flex-direction: row;
        background-color: #fff;
    }

    .book_show .business_recommend {
        width: 200px;
        display: flex;
        flex-direction: column;
    }

    .book_show .business_recommend .business_recommend_title {
        width: 100%;
        height: 38px;
        font-size: 16px;
        line-height: 38px;
        color: #fff;
        background-color: #E4393C;
        box-shadow: 0 0 5px #E4393C;
        text-align: center;
    }

    .book_show .business_recommend .business_recommend_book {
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 5px #999;
    }

    .book_show .business_recommend .business_recommend_book .business_recommend_list {
        margin-top: 15px;
    }

    .book_show .business_recommend .business_recommend_book .business_recommend_list .business_recommend_image {
        width: 80%;
        margin: 0 auto;
        cursor: pointer;
    }

    .book_show .business_recommend .business_recommend_book .business_recommend_list .business_recommend_image .el-image {
        width: 100%;
    }

    .book_show .business_recommend .business_recommend_book .business_recommend_list .business_recommend_info {
        padding: 5px 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
        cursor: pointer;
    }

    .book_show .business_recommend .business_recommend_book .business_recommend_list .business_recommend_info .business_recommend_num {
        color: #fff;
        margin: 0 2px;
        padding: 1px 5px;
        border-radius: 12px;
        background-color: #E4393C;
    }

    .book_show .business_recommend .business_recommend_book .business_recommend_list .business_recommend_info .business_recommend_price {
        color: #E4393C;
        font-weight: bolder;
    }

    .book_show .book_detail {
        margin-left: 30px;
        padding-left: 10px;
        width: calc(80vw - 300px);
    }

    .book_show .book_detail .book_detail_block {
        width: 100%;
        background-color: #F7F7F7;
        border-bottom: 1px solid #e9e9eb;
        font-size: 15px;
    }

    .book_show .book_detail .book_recommend_block {
        margin: 50px auto;
        padding: 0;
        width: 100%;
    }

    .book_show .book_detail .book_recommend_block .el-row {
        text-align: left;
        width: 100%;
    }

    .book_show .book_detail .book_recommend_block .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .book_show .book_detail .book_recommend_block .el-row .el-col .book_card {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        border-left: 1px solid #e9e9eb;
    }

    .book_show .book_detail .book_recommend_block .el-row .el-col .book_card:hover {
        box-shadow: 0 0 4px #ccc;
    }

    .book_show .book_detail .book_recommend_block .el-row .el-col .book_card .book_img {
        margin: 20px auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .book_show .book_detail .book_recommend_block .el-row .el-col .book_card .book_title {
        margin-top: 5px;
        margin-left: 30px;
        font-size: 13px;
        padding: 0;
        text-align: left;
    }

    .book_show .book_detail .book_recommend_block .el-row .el-col .book_card .book_price {
        margin-top: 5px;
        margin-left: 30px;
        font-size: 14px;
        font-weight: bold;
        color: #f56c6c;
        padding: 0;
        text-align: left;
    }
</style>
