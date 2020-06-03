<template>
    <div class="business_page_bottom">
        <el-tabs :tab-position="tabPosition" @tab-click="handleTabClick">
            <el-tab-pane :key="typeIndex" v-for="(typeItem, typeIndex) in currBusinessTypeList" :name="numToString(typeIndex)" >
                <span style="font-size: 22px;" slot="label">{{typeItem.bookTypeName}}</span>
                <div class="type_list_block">
                    <el-row>
                        <el-col :key="'business-tags-' + index"
                                :span="4"
                                v-for="(bookItem, index) in currBusinessTypeBookList">
                            <div class="book_card" @click="toDetail(index)">
                                <div class="book_img">
                                    <el-image style="width: 130px; height: 189px;" v-bind:src="bookItem.bookImagePath"/>
                                </div>
                                <div class="book_title_author">
                                    <a style="display:block; white-space:nowrap; overflow:hidden;text-overflow:ellipsis; font-weight: bold;">{{bookItem.bookName}}</a>
                                    <a style="display:block; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">{{bookItem.bookAuthor}}</a>
                                </div>
                                <div class="book_price">
                                    <a>￥{{bookItem.bookPrice}}</a>
                                </div>
                                <div class="book_comment_rating">
                                    <a style="display:block; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">已有{{bookItem.bookComment | ellipsisComment}}评价|{{bookItem.bookRating}}评分</a>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="block">
                    <el-pagination
                        @current-change="currentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        background
                        layout="total, prev, pager, next"
                        :total="itemTotal"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "BusinessBottom.vue",
        inject: ['reload'],
        data() {
            return {
                tabPosition: 'left',
                typeIndex: 0,
                pageSize: 18,
                currentPage: 1,
                itemTotal: 0,
                currBusinessTypeList: [],
                currBusinessTypeBookList: [],
            };
        },
        filters: {
            // 过滤评论数为 undefined
            ellipsisComment(value) {
                if (value === undefined){
                    return 0;
                } else {
                    return value;
                }
            },
        },
        methods: {
            numToString(val){
                val = val.toString();
                return val;
            },
            stringToNum(val){
                val = parseInt(val);
                return val;
            },

            // 点击标签头处理函数
            handleTabClick(tab, event) {
                this.currentPage = 1;
                this.typeIndex = this.stringToNum(tab.name);
                document.documentElement.scrollTop=192;
                this.getCurrentBusinessTypeBookList(tab.name);
            },

            // 改变页面显示分页的当前页码
            currentChange(val) {
                this.currentPage = val;
                this.getCurrentBusinessTypeBookList(this.typeIndex);
            },

            // 获取后端查找店铺下分类信息
            getTypeListByBusinessId() {
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                };
                ws_axios.fetchPost1('/book/getBookInfoTypeListByBusinessId', params).then((back) => {
                    this.currBusinessTypeList = back.data;
                    this.getCurrentBusinessTypeBookList(0);
                });
            },

            // 获取后端查找店铺下分页的总数
            getTotal(typeIndex) {
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                    typeId: this.currBusinessTypeList[typeIndex].bookTypeId,
                };
                ws_axios.fetchPost1('/book/getBookInfoCountByBusinessIdAndTypeId', params).then((back) => {
                    this.itemTotal = back.data;
                });
            },

            // 获取后端查找店铺某一类别下书籍列表
            getCurrentBusinessTypeBookList(typeIndex) {
                typeIndex = this.stringToNum(typeIndex);
                this.getTotal(typeIndex);
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                    typeId: this.currBusinessTypeList[typeIndex].bookTypeId,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                };
                ws_axios.fetchPost1('/book/getBookInfoListByBusinessIdAndTypeId', params).then((back) => {
                    this.currBusinessTypeBookList = back.data;
                    document.documentElement.scrollTop=192;
                });
            },

            // 跳转至书籍信息详情页面
            toDetail(index) {
                let params = {
                    'bookId': this.currBusinessTypeBookList[index].bookId,
                    'businessId': this.currBusinessTypeBookList[index].businessId,
                };

                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);

                    // 店铺页面点击图片进入详情页权重值为 15
                    let params_after = {
                        userId: this.$store.state.currUserInfo.userId,
                        bookTypeId: this.currBusinessTypeBookList[index].bookTypeId,
                        number: 15,
                    };

                    ws_axios.fetchPost1('/userTypeNumber/operateUserTypeNumber', params_after).then((back) => {
                        this.$router.push("/book_detail");
                    });
                });
            },
        },
        created() {
            this.getTypeListByBusinessId();
        },
    }
</script>

<style scoped>
    .business_page_bottom {
        margin: 40px auto;
        padding: 0;
        width: 100%;
    }

    .business_page_bottom .type_list_block {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .business_page_bottom .type_list_block .el-row {
        text-align: left;
        width: 100%;
    }

    .business_page_bottom .type_list_block .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .business_page_bottom .type_list_block .el-row .el-col .book_card {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .business_page_bottom .type_list_block .el-row .el-col .book_card:hover {
        box-shadow: 0 0 4px #ccc;
    }

    .business_page_bottom .type_list_block .el-row .el-col .book_card .book_img {
        margin: 20px auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .business_page_bottom .type_list_block .el-row .el-col .book_card .book_title_author {
        margin-top: 5px;
        margin-left: 30px;
        margin-right: 20px;
        font-size: 13px;
        padding: 0;
        text-align: left;
    }

    .business_page_bottom .type_list_block .el-row .el-col .book_card .book_price {
        margin-top: 5px;
        margin-left: 30px;
        font-size: 14px;
        font-weight: bold;
        color: #f56c6c;
        padding: 0;
        text-align: left;
    }

    .business_page_bottom .type_list_block .el-row .el-col .book_card .book_comment_rating {
        margin-top: 5px;
        margin-left: 30px;
        font-size: 14px;
        font-weight: bold;
        padding: 0;
        text-align: left;
    }

    .business_page_bottom .block {
        margin: 50px 0 20px 0;
        padding: 0;
        text-align: right;
        width: 100%;
    }
</style>
