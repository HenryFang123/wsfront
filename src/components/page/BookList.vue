<template>
    <div class="show_book-page">
        <Header/>

        <div class="show_book-main">
            <el-row style="margin: 0 auto; padding: 0; width: 100%; display: flex">
                <el-col :span="4" style="margin: 0 auto; padding: 0; height: 100%;">
                    <div class="main_left" style="margin: 0 auto; padding: 0; width: 100%;">
                        <!--占位块-->
                    </div>
                </el-col>
                <el-col :span="16" style="margin: 0 auto; padding: 0; height: 100%;">
                    <el-container style="border: 1px solid #eee">
                        <el-header style="height: 140px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                            <el-row style="margin-top: 5px;height:10px">
                                <el-col :span="3" style="text-align: left">
                                    <el-link :underline="false" @click="gotoHome" icon="el-icon-caret-left" type="info">
                                        首页
                                    </el-link>
                                </el-col>
                                <el-col :span="21"/>
                            </el-row>
                            <el-divider/>
                            <div class="item-class-show">
                                <el-row>
                                    <el-col :span="24">
                                        <el-row class="item-class-group">
                                            <el-col :span="3" class="item-class-name" style="font-size: 13px">{{tagsInfo.tagName}} :
                                            </el-col>
                                            <el-col :span="21" class="item-class-select"
                                                    style="text-align: left;font-size: 13px"><span
                                                :key="tagsIndex" v-for="(tagsItem, tagsIndex) in tagsInfo.tags">{{tagsItem.tagItemName}}</span>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-header>
                        <el-container style="margin-top: 30px;">
                            <el-aside style="width: 220px;">
                                <div class="show_book-main-aside">
                                    <el-row>
                                        <el-col :span="24" class="show-aside-right">
                                            <el-row class="show-advertise">
                                                <span>热卖图书</span>
                                                <span>广告</span>
                                            </el-row>
                                            <el-row>
                                                <div :key="index" class="demo-image__placeholder"
                                                     v-for="(bookItem, index) in this.$store.state.resultInfo.bookListInfo.hotBookInfo">
                                                    <div class="block"
                                                         style="text-align: center; margin-top: 10px; padding: 0; border-bottom: 1px solid #e9e9eb;">
                                                        <el-image @click="toDetailSH(index)"
                                                                  style="height: 150px; width: 130px;cursor: pointer;"
                                                                  v-bind:src="bookItem.bookImagePath"/>
                                                        <br>
                                                        <div class="goods-show-detail">
                                                            <span class="advertise-price text-danger"
                                                                  style="font-family:Arial;">￥{{bookItem.bookPrice}}</span>
                                                        </div>
                                                        <div class="goods-show-detail">
                                                            <span>{{bookItem.bookName | ellipsisName}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-aside>
                            <el-main>
                                <div class="show_book-main-main">
                                    <div class="no_result_message" v-show="ifHaveResult">
                                        <span style="font-size: 15px;">抱歉，没有找到与“</span>
                                        <span style="font-size: 15px; color: #f56c6c">{{this.$store.state.searchInfo.searchWord}}</span>
                                        <span style="font-size: 15px;"> ”相关的商品，为您推荐以下商品 ...</span>
                                    </div>
                                    <!--每一件图书的可定义样式-->
                                    <div :key="'no-result-' + sIndex" class="show_book-main-main-no_result_list"
                                         v-for="(bookItem, sIndex) in this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS" v-show="ifHaveResult">
                                        <el-row>
                                            <el-col :span="4">
                                                <div class="block">
                                                    <el-image style=" margin-top: 20px; height: 140px; width: 120px;"
                                                              v-bind:src="bookItem.bookImagePath"/>
                                                </div>
                                            </el-col>
                                            <el-col :span="20" style="text-align: left">
                                                <el-row>
                                                    <el-link @click="toDetail(sIndex)" style="font-size: 24px; font-weight: bold; text-underline: none;">{{bookItem.bookName | ellipsisName}}
                                                    </el-link>
                                                </el-row>
                                                <el-row
                                                    style="color: #A94442;font-size: 25px;font-weight: bold;line-height:30px;margin-top: 5px">
                                                    ￥{{bookItem.bookPrice}}
                                                </el-row>
                                                <el-row>
                                                    <span style="font-size: 14px">
                                                        {{bookItem.bookAuthor | ellipsisAuthor}}
                                                    </span>
                                                    <el-divider direction="vertical"/>
                                                    <span style="font-size: 14px">{{bookItem.bookYear}}</span>
                                                    <el-divider direction="vertical"/>
                                                    <span style="font-size: 14px" v-html="bookItem.bookPub">{{bookItem.bookPub}}</span>
                                                    <el-divider direction="vertical"/>
                                                    <span style="font-size: 14px" v-html="bookItem.bookIsbn">ISBN: {{bookItem.bookIsbn}}</span>
                                                    <el-divider direction="vertical"/>
                                                    <span style="font-size: 14px">评分: {{bookItem.bookRating}}</span>
                                                </el-row>
                                                <el-row style="margin-top: 5px">
                                                    <p style="font-size: 14px">{{bookItem.bookDescription}} </p>
                                                </el-row>
                                                <el-row style="margin-top: 10px; margin-bottom: 10px;">
                                                    <el-button @click="toDetailNoResult(sIndex)" type="danger">
                                                        加入购物车
                                                    </el-button>
                                                    <el-button @click="addCollectNoResult(sIndex)" plain
                                                               style=" margin-left:20px;" type="danger">
                                                        收藏本书
                                                    </el-button>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div :key="'result-' + solrIndex" class="show_book-main-main-list"
                                         v-for="(bookItem, solrIndex) in solrBookList" v-show="!ifHaveResult">
                                        <el-row>
                                            <el-col :span="4">
                                                <div class="block">
                                                    <el-image style=" margin-top: 20px; height: 140px; width: 120px;"
                                                              v-bind:src="bookItem.book_image_path"/>
                                                </div>
                                            </el-col>
                                            <el-col :span="20" style="text-align: left">
                                                <el-row>
                                                    <span class="tag"
                                                          style="margin-right: 10px;font-size: 14px;padding: 3px 4px;border-radius: 3px;background-color:#e4393c;color:#fff;">{{bookItem.book_type_name}}</span>
                                                    <el-link @click="toDetail(solrIndex)" style="font-size: 24px; font-weight: bold; text-underline: none;"
                                                             v-html="bookItem.book_name">{{bookItem.book_name | ellipsisName}}
                                                    </el-link>
                                                </el-row>
                                                <el-row
                                                    style="color: #A94442;font-size: 25px;font-weight: bold;line-height:30px;margin-top: 5px">
                                                    ￥{{bookItem.book_price}}
                                                </el-row>
                                                <el-row>
                                                    <span style="font-size: 14px" v-html="bookItem.book_author">
                                                        {{bookItem.book_author | ellipsisAuthor}}
                                                    </span>
                                                    <el-divider direction="vertical"/>
                                                    <span style="font-size: 14px">{{bookItem.book_year}}</span>
                                                    <el-divider direction="vertical"/>
                                                    <span style="font-size: 14px" v-html="bookItem.book_pub">{{bookItem.book_pub}}</span>
                                                    <el-divider direction="vertical"/>
                                                    <span style="font-size: 14px" v-html="bookItem.book_isbn">ISBN: {{bookItem.book_isbn}}</span>
                                                    <el-divider direction="vertical"/>
                                                    <span style="font-size: 14px">评分: {{bookItem.book_rating}}</span>
                                                </el-row>
                                                <el-row style="margin-top: 5px">
                                                    <p style="font-size: 14px">{{bookItem.book_description}} </p>
                                                </el-row>
                                                <el-row style="margin-top: 10px; margin-bottom: 10px;">
                                                    <el-button @click="toDetail(solrIndex)" type="danger">
                                                        加入购物车
                                                    </el-button>
                                                    <el-button @click="addCollect(solrIndex)" plain
                                                               style=" margin-left:20px;" type="danger">
                                                        收藏本书
                                                    </el-button>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="block" style="margin-top: 30px; text-align: right;" v-show="!ifHaveResult">
                                        <el-pagination
                                            :current-page="currentPage"
                                            :page-size="pageSize"
                                            :page-sizes="[10, 20, 30, 40, 50]"
                                            :total="itemTotal"
                                            @current-change="handleCurrentChange"
                                            @size-change="handleSizeChange"
                                            background
                                            layout="total, sizes, prev, pager, next"/>
                                    </div>
                                </div>
                            </el-main>
                        </el-container>
                    </el-container>
                </el-col>
                <el-col :span="4" style="margin: 0 auto; padding: 0; height: 100%;">
                    <div class="main_right" style="margin: 0 auto; padding: 0; width: 100%;">
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
    import ws_axios from "network/ws_axios";

    export default {
        inject: ['reload'],
        name: "BookList.vue",
        components: {Header, Footer},
        data() {
            return {
                ifHaveResult: false,
                currentPage: 1,
                pageSize: 10,
                itemTotal: 0,
                solrBookList: [],
                tagsInfo: {
                    tagName: '分类',
                    tags: [
                        {
                            tagItemName: '名著'
                        },
                        {
                            tagItemName: '文化'
                        },
                        {
                            tagItemName: '哲学'
                        },
                        {
                            tagItemName: '思想'
                        }
                    ]
                },
            }
        },
        filters: {
            // 设置书名超长显示内容
            ellipsisName(value) {
                if (value.length > 9){
                    return value.slice(0,9) + '...';
                } else {
                    return value;
                }
            },

            // 设置作者名超长显示内容
            ellipsisAuthor(value) {
                if (value.length > 11){
                    return value.slice(0,11) + '...';
                } else {
                    return value;
                }
            },
        },
        methods: {
            // 获取系统热门书籍列表
            getSystemHotBookInfoList() {
                ws_axios.fetchPost1('/recommend/getRecommendSystemHot', {}).then((back) => {
                    this.$store.dispatch("saveBookListInfoHotBookInfo", back.data)
                });
            },

            // 获取查询结果列表
            getSolrBookInfoList() {
                let params = {
                    'searchWord': this.$store.state.searchInfo.searchWord,
                    'pageNum': 1,
                    'pageSize': 10
                };
                ws_axios.fetchPost2('/solr/doSearch', params).then((back) => {
                    if (back.data.resultCode === "1") {
                        this.itemTotal = back.data.itemTotal;
                        this.solrBookList = back.data.jsonArraySolrDocument;
                    } else {
                        this.ifHaveResult = true;
                    }
                })
            },

            // 跳转至书籍信息详情页面
            toDetailSH(index){
                let params = {
                    'bookId': this.$store.state.resultInfo.bookListInfo.hotBookInfo[index].bookId,
                    'businessId': this.$store.state.resultInfo.bookListInfo.hotBookInfo[index].businessId,
                };
                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);
                    this.$router.push("/book_detail");
                });
            },

            // 跳转至书籍信息详情页面
            toDetail(index) {
                let params = {
                    'bookId': this.solrBookList[index].book_id,
                    'businessId': this.solrBookList[index].business_id,
                };

                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);
                    this.$router.push("/book_detail");
                });
            },
            // 收藏书籍
            addCollect(index) {
                let params = {
                    'userId': this.$store.state.currUserInfo.userId,
                    'userStarId': this.solrBookList[index].book_id,
                    'userStarTag': 0
                };
                ws_axios.fetchPost1('/userStar/insertUserStar', params).then((back) => {
                });
                this.$message({
                    message: '收藏成功',
                    type: 'success'
                });
            },

            // 跳转至书籍信息详情页面
            toDetailNoResult(index) {
                let params = {
                    'bookId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS[index].bookId,
                    'businessId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS[index].businessId,
                };

                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);
                    this.$router.push("/book_detail");
                });
            },
            // 收藏书籍
            addCollectNoResult(index) {
                let params = {
                    'userId': this.$store.state.currUserInfo.userId,
                    'userStarId': this.$store.state.resultInfo.homeInfo.bottomInfo.bookListS[index].bookId,
                    'userStarTag': 0
                };
                ws_axios.fetchPost1('/userStar/insertUserStar', params).then((back) => {
                    this.$message({
                        message: '收藏成功',
                        type: 'success'
                    });
                });
            },

            // 改变搜索显示页页大小限制
            handleSizeChange(val) {
                this.pageSize = val;
            },

            // 改变页码选择
            handleCurrentChange(val) {
                this.currentPage = val;
                let params = {
                    'searchWord': this.$store.state.searchInfo.searchWord,
                    'pageNum': val,
                    'pageSize': this.pageSize
                };
                ws_axios.fetchPost2('/solr/doSearch', params).then((back) => {
                    if (back.data.resultCode === "1") {
                        this.solrBookList = back.data.jsonArraySolrDocument;
                        document.documentElement.scrollTop=192;
                    }
                })
            },

            gotoHome() {
                this.$router.push("/")
            },
        },
        created() {
            this.getSystemHotBookInfoList();

            if (this.$store.state.searchInfo.searchWord !== ""){
                this.getSolrBookInfoList();
            } else {
                this.ifHaveResult = true;
            }
        },
    }
</script>

<style scoped>
    .item-class-show {
        margin: 15px auto;
        width: 100%;
    }

    .item-class-group {
        margin-top: 1px;
        height: 45px;
        border-bottom: 1px solid #ccc;
    }

    .item-class-group:first-child {
        border-top: 1px solid #ccc;
    }

    .item-class-name {
        text-align: left;
        padding-left: 15px;
        line-height: 44px;
        color: #666;
        font-weight: bold;
        background-color: #f3f3f3;
    }

    .item-class-name:first-child {
        line-height: 43px;
    }

    .item-class-select span {
        text-align: left;
        margin-left: 15px;
        width: 160px;
        color: #005aa0;
        line-height: 45px;
        cursor: pointer;
    }


    .goods-show-detail {
        text-align: left;
        font-size: 15px;
        margin: 0 30px;
    }

    .show_book-main .show_book-main-header .show-name {
        line-height: 44px;
        color: #666;
        font-weight: bold;
        background-color: #FBF2ED;
    }

    .show_book-main .show_book-main-header .show-value {
        line-height: 44px;
        color: #666;
        font-weight: bold;
        background-color: #f3f3f3;
    }

    .show_book-main .show_book-main-aside .show-aside-left {
        background-color: #FFFFFF;
        line-height: 500px;
    }

    .show_book-main .show_book-main-aside .show-aside-right {
        width: 200px;
        border: 1px solid #ccc;
    }

    .show_book-main .show_book-main-aside .show-aside-right .show-advertise {
        width: 100%;
        height: 36px;
        color: #B1191A;
        line-height: 36px;
        font-size: 18px;
    }

    .show_book-main .show_book-main-aside .show-aside-right .show-advertise span:first-child {
        margin-left: 20px;
    }

    .show_book-main .show_book-main-aside .show-aside-right .show-advertise span:last-child {
        float: right;
        margin-right: 15px;
        font-size: 10px;
        color: #ccc;
    }

    .text-danger {
        color: #A94442;
    }

    .advertise-price {
        font-size: 14px;
        font-weight: bold;
    }

    .show_book-main-main-list {
        margin-top: 0;
        padding-top: 10px;
        border-bottom: 1px solid #e9e9eb;
    }

    .show_book-main-main-list:hover {
        background-color: #f7f7f7;
    }

    .show_book-main-main-no_result_list {
        margin-top: 0;
        padding-top: 10px;
        border-bottom: 1px solid #e9e9eb;
    }

    .show_book-main-main-no_result_list:hover {
        background-color: #f7f7f7;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-col {
        min-height: 1px;
    }
</style>
