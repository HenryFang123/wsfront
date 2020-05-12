<template>
    <div class="business_page_bottom">
        <el-tabs :tab-position="left" style="height: 200px;">
            <el-tab-pane @click="getCurrentBusinessTypeBookList(typeIndex)" :key="typeIndex" v-for="(typeItem, typeIndex) in this.currBusinessTypeList">
                <span slot="label">{{typeItem.typeName}}</span>
                <div class="type_list_block">
                    <el-row>
                        <el-col :key="index"
                                :span="4"
                                v-for="(bookItem,index) in this.currBusinessTypeBookList">
                            <div class="book_card">
                                <div class="book_img">
                                    <el-image style="width: 90px; height: 110px;" v-bind:src="bookItem.bookImgPath"/>
                                </div>
                                <div class="book_title">
                                    <a>{{bookItem.bookTitle}}</a>
                                </div>
                                <div class="book_author">
                                    <a>{{bookItem.bookAuthor}}</a>
                                </div>
                                <div class="book_price">
                                    <a>￥{{bookItem.bookPrice}}</a>
                                </div>
                                <div class="book_comment">
                                    <a>已有{{bookItem.bookComment}}评价</a>
                                    <el-divider direction="vertical"/>
                                    <a>{{bookItem.bookRating}}评分</a>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="block">
                    <el-pagination
                        @current-change="currentChange"
                        :current-page.sync="currentPage"
                        :page-size="this.pageSize"
                        layout="total, prev, pager, next"
                        :total="this.itemTotal">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "BusinessBottom.vue",
        data() {
            return {
                pageSize: 24,
                currentPage: 1,
                itemTotal: 0,
                currBusinessTypeList: [],
                currBusinessTypeBookList: [],
            };
        },
        methods: {
            // 改变页面显示分页的当前页码
            currentChange: function (val) {
                this.currentPage = val;
            },

            // 获取后端查找店铺下分类信息
            getTypeListByBusinessId: function () {
                let params = {
                    businessId: this.$store.getters.businessInfo.businessId,
                };
                ws_axios.fetchPost1('/book/getBookInfoTypeListByBusinessId', params).then((back) => {
                    this.currBusinessTypeList = back.data;
                });
            },

            // 获取后端查找店铺下分页的总数
            getTotal: function (typeIndex) {
                let params = {
                    businessId: this.$store.getters.businessInfo.businessId,
                    typeId: this.currBusinessTypeList[typeIndex],
                };
                ws_axios.fetchPost1('/book/getBookInfoCountByBusinessIdAndTypeId', params).then((back) => {
                    this.itemTotal = back.data;
                });
            },

            // 获取后端查找店铺某一类别下书籍列表
            getCurrentBusinessTypeBookList: function (typeIndex) {
                this.getTotal(typeIndex);
                let params = {
                    businessId: this.$store.getters.businessInfo.businessId,
                    typeId: this.currBusinessTypeList[typeIndex],
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                };
                ws_axios.fetchPost1('/book/getBookInfoListByBusinessIdAndTypeId', params).then((back) => {
                    this.currBusinessTypeBookList = back.data;
                });
            },
        },
        created() {
            this.getTypeListByBusinessId();
            this.getCurrentBusinessTypeBookList(0);
        },
    }
</script>

<style scoped>
    .business_page_bottom {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .business_page_bottom .type_list_block {
        margin: 50px auto;
        padding: 0;
        width: 100%;
    }

    .business_page_bottom .type_list_block .el-row {
        text-align: left;
        width: 100%;
    }

    .business_page_bottom .type_list_block .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .business_page_bottom .type_list_block .el-row .el-col .book_card {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        border-left: 1px solid #e9e9eb;
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

    .business_page_bottom .type_list_block .el-row .el-col .book_card .book_title {
        margin-top: 5px;
        margin-left: 30px;
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
</style>
