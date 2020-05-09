<!--项目前端，展示搜索书籍信息后，显示加结果的页面-->
<template>
    <div class="show_book-page">
        <!--引入Header-->
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
                        <el-header style="height: 180px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                            <el-row style="margin-top: 5px;height:10px">
                                <el-col :span="3" style="text-align: left">
                                    <el-link :underline="false" @click="gotoHome" icon="el-icon-caret-left" type="info">
                                        首页
                                    </el-link>
                                </el-col>
                                <el-col :span="21"/>
                            </el-row>
                            <el-divider/>
                            <!--书籍分类-->
                            <div class="item-class-show">
                                <el-row>
                                    <el-col :span="24">
                                        <el-row :key="index" class="item-class-group"
                                                v-for="(items, index) in tagsInfo">
                                            <el-col :span="3" class="item-class-name" style="font-size: 13px">{{
                                                items.tagName }} :
                                            </el-col>
                                            <el-col :span="21" class="item-class-select"
                                                    style="text-align: left;font-size: 13px"><span
                                                :key="subIndex" v-for="(item, subIndex) in items.tags">{{ item }}</span>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-header>
                        <el-container style="margin-top: 30px;">
                            <el-aside style="width: 220px;">
                                <!--el-aside中添加样式的class-->
                                <div class="show_book-main-aside">
                                    <el-row>
                                        <el-col :span="24" class="show-aside-right">
                                            <el-row class="show-advertise">
                                                <span>热卖图书</span>
                                                <span>广告</span>
                                            </el-row>
                                            <!--aside部分左侧广告-->
                                            <el-row>
                                                <div :key="index" class="demo-image__placeholder"
                                                     v-for="(bookItem, index) in this.$store.getters.resultInfo_bookListInfo_hotBookInfo ">
                                                    <div class="block"
                                                         style="text-align: center; margin-top: 10px; padding: 0; border-bottom: 1px solid #e9e9eb;">
                                                        <el-image @click="toDetail(index)"
                                                                  style="height: 150px; width: 130px;cursor: pointer;"
                                                                  v-bind:src="bookItem.book_image_path"/>
                                                        <br>
                                                        <div class="goods-show-detail">
                                                            <span class="advertise-price text-danger"
                                                                  style="font-family:Arial;">￥{{bookItem.book_price}}</span>
                                                        </div>
                                                        <div class="goods-show-detail">
                                                            <span>{{bookItem.book_name}}</span>
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
                                    <!--每一件图书的可定义样式-->
                                    <div :key="index" class="show_book-main-main-list"
                                         v-for="(bookItem, index) in this.$store.getters.resultInfo_bookListInfo_bookList">
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
                                                    <el-link style="font-size: 24px; font-weight: bold"
                                                             v-html="bookItem.book_name">{{bookItem.book_name}}
                                                    </el-link>
                                                </el-row>
                                                <el-row
                                                    style="color: #A94442;font-size: 25px;font-weight: bold;line-height:30px;margin-top: 5px">
                                                    ￥{{bookItem.book_price}}
                                                </el-row>
                                                <el-row>
                                                    <el-link style="font-size: 14px" v-html="bookItem.book_author">
                                                        {{bookItem.book_author}}
                                                    </el-link>
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
                                                    <el-button @click="toDetail(index)" type="danger">
                                                        加入购物车
                                                    </el-button>
                                                    <el-button @click="addCollect(index)" plain
                                                               style=" margin-left:20px;" type="danger">
                                                        收藏本书
                                                    </el-button>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="block" style="margin-top: 30px">
                                        <el-pagination
                                            :current-page="this.currentPage"
                                            :page-size="this.pageSize"
                                            :page-sizes="[10, 20, 30, 40, 50]"
                                            :total="this.itemTotal"
                                            @current-change="handleCurrentChange"
                                            @size-change="handleSizeChange"
                                            background
                                            layout="total, sizes, prev, pager, next">
                                        </el-pagination>
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

        <!--引入Footer-->
        <Footer/>
    </div>


</template>

<script>
    import Header from "../header/Header";
    import Footer from "../footer/Footer";
    import ws_axios from "network/ws_axios";

    export default {
        name: "BookList.vue",
        components: {Header, Footer},
        inject: ['reload'],
        data() {
            return {
                bookInfoValue: true,
                currentPage: 1,
                pageSize: 10,
                itemTotal: 0,
                tagsInfo: [
                    {
                        tagName: '分类',
                        tags: ['其他', '工学', '理学', '计算机']
                    },
                    {
                        tagName: '出版社',
                        tags: ['人民教育出版社', '中国石油大学出版社', '科学出版社']
                    }
                ],
            }
        },
        methods: {
            // 跳转至书籍信息详情页面
            toDetail: function (index) {
                this.$store.dispatch("saveBookDetailInfoBookId", this.$store.getters.resultInfo_bookListInfo_bookList[index].book_id.toString());
                this.$store.dispatch("saveBookDetailInfoBusinessId", this.$store.getters.resultInfo_bookListInfo_bookList[index].business_id.toString());
                this.$router.push("/to_detail");
            },
            gotoHome() {
                this.$router.push("/")
            },

            // 收藏书籍
            addCollect: function (index) {
            },
            // 改变搜索显示页页大小限制
            handleSizeChange(val) {
                this.pageSize = val;
            },
            // 改变页码选择
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.$store.getters.searchInfo_searchWord.length > 0) {
                    // 提交到 doSearch 方法
                    let params = {
                        'searchWord': this.$store.getters.searchInfo_searchWord,
                        'pageNum': val,
                        'pageSize': this.pageSize
                    };
                    // ws_axios.setBaseIrl(2);
                    ws_axios.fetchPost2('/solr/doSearch', params).then((back) => {
                        if (back.data.resultCode === "0") {
                            console.log("error");
                        } else {
                            this.$store.dispatch("saveBookListInfoBookList", back.data.jsonArraySolrDocument);
                            // location.reload();
                        }
                    })
                } else {
                    console.log("error");
                }
            },
            // 设置搜索结果总条数
            setResultItemTotal: function () {
                if (this.$store.getters.resultInfo_bookListInfo_itemTotal > 0) {
                    this.itemTotal = this.$store.getters.resultInfo_bookListInfo_itemTotal;
                    // console.log(this.$store.getters.resultInfo_bookListInfo_itemTotal)
                }
            }
        },
        mounted() {
            this.setResultItemTotal();
        }
    }
</script>

<style>
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
