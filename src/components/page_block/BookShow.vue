<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="book_show">
        <div class="business_recommend">
            <div class="business_recommend_title">
                <p>店铺热销</p>
            </div>
            <div class="business_recommend_book">
                <div :key="'bh-' + index"
                     class="business_recommend_list"
                     v-if="businessBookList !== undefined"
                     v-for="(bookItem, index) in this.businessBookList">
                    <div class="business_recommend_image">
                        <el-image style="height: 150px; width: 130px;cursor: pointer;"
                                  v-bind:src="bookItem.bookImagePath" @click="toDetailBH(index)"/>
                    </div>
                    <div class="business_recommend_info">
                        <span><span class="business_recommend_num">{{index + 1}}</span> 评分: {{bookItem.bookRating}}</span>
                        <span class="business_recommend_price">￥{{bookItem.bookPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="book_detail">
            <el-row>
                <div class="book_detail_block block_tab">
                    <el-tabs type="card" v-model="activeNameDetail">
                        <el-tab-pane name="first">
                            <span slot="label">商品介绍</span>
                            <div class="book_detail_main">
                                <el-row style="text-align: left; margin-left: 30px; margin-top: 5px;">
                                    <span>作者：</span>
                                    <el-link style="font-size: 15px;color: #6E77BD">
                                        {{this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookAuthor}}
                                    </el-link>
                                </el-row>
                                <el-row style="text-align: left; margin-left: 30px; margin-top: 5px;">
                                    <span>出版社：{{this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookPub}}</span>
                                </el-row>
                                <el-row style="text-align: left; margin-left: 30px; margin-top: 5px;">
                                    <span>出版年月：{{this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookYear}}</span>
                                </el-row>
                                <el-row style="text-align: left; margin-left: 30px; margin-top: 5px;">
                                    <span>ISBN：{{this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookIsbn}}</span>
                                </el-row>
                                <el-row
                                    style="text-align: left; margin-left: 30px; margin-top: 3px; margin-bottom: 30px;">
                                    <p><span style="color: #527722; margin-left: 0">内容简介  · · · · · ·</span></p>
                                    <p><span style="margin-left: 20px">{{this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookDescription}}</span>
                                    </p>
                                </el-row>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane name="second">
                            <span slot="label">商品评价</span>
                            <div class="remarks-container">
                                <div class="remarks-analyse-box">
                                    <div class="remarks-analyse-goods">
                                        <el-progress :width="110" :stroke-width="15" stroke-linecap="butt"  type="circle" :percentage="this.bookRemarkSum.goodRating | judgeNumberIfZero" :color="progressColors"/>
                                    </div>
                                    <div class="remarks-analyse-tags">
                                        <el-tag checkable :color="tagsColor[index % 4]" v-for="(item, index) in remarksTags" :key="index">{{item}}</el-tag>
                                    </div>
                                </div>
                                <div class="remarks-bar">
                                    <span>好评({{this.bookRemarkSum.goodNumber}})</span>
                                    <span>中评({{this.bookRemarkSum.notGoodNumber}})</span>
                                    <span>差评({{this.bookRemarkSum.badNumber}})</span>
                                </div>
                                <div class="remarks-box" v-if="bookCommentList !== undefined" v-for="(bookCommentItem, bookCommentIndex) in bookCommentList" :key="'bc-' + bookCommentIndex">
                                    <div class="remarks-user">
                                        <el-avatar icon="el-icon-user-solid" />
                                        <span class="remarks-user-name">{{bookCommentItem.userId}}</span>
                                    </div>
                                    <div class="remarks-content-box">
                                        <p>
                                            <el-rate disabled :value="bookCommentItem.rating" class="remarks-star" show-score text-color="#ff9900"/>
                                        </p>
                                        <p class="remarks-content">{{bookCommentItem.content}}</p>
                                        <p class="remarks-time">{{bookCommentItem.create_time}}</p>
                                    </div>
                                </div>
                                <div class="my-remarks">
                                    <div class="remarks-content-box">
                                        <el-input
                                            type="textarea"
                                            :rows="5"
                                            placeholder="请输入内容"
                                            v-model="comment">
                                        </el-input>
                                    </div>
                                    <div class="remarks-rating-button">
                                        <p>请评分:<el-rate :colors="ratingColors" class="remarks-star" v-model="rating" show-text/></p>
                                        <el-button type="primary" @click="sendMyComment">发 表 评 论</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-row>
            <el-row>
                <div class="book_recommend_block">
                    <el-tabs @tab-click="handleRecommendTabClick" type="border-card">
                        <el-tab-pane :key="'neo4j-tab-' + tabIndex" v-for="(tabItem, tabIndex) in tabList" :name="numToString(tabIndex)">
                            <span slot="label">{{tabItem.labelName}}</span>
                            <el-row>
                                <el-col :key="'neo4j-recommend-' + index"
                                        :span="4"
                                        v-if="neo4jBookList !== undefined"
                                        v-for="(bookItem, index) in neo4jBookList">
                                    <div class="book_card" @click="toDetailNR(index)">
                                        <div class="book_img">
                                            <el-image style="width: 90px; height: 110px;" v-bind:src="bookItem.img"/>
                                        </div>
                                        <div class="book_title">
                                            <a>{{bookItem.title | ellipsisName}}</a>
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
                progressColors: [
                    {color: '#1C86EE', percentage: 20},
                    {color: '#f56c6c', percentage: 40},
                    {color: '#FF8247', percentage: 60},
                    {color: '#F4A460', percentage: 80},
                    {color: '#FFD700', percentage: 100}
                ],
                tagsColor: [ '#409EFF', '#67C23A', '#F56C6C', '#FFD700' ],
                remarksTags: [ '实惠优选', '质量没话说', '比定做还合适', '完美品质', '正品行货', '包装有档次', '书籍很好看' ],
                bookRemarkSum: {},
                bookCommentList: [],
                rating: null,
                ratingColors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                comment: '',
                businessBookList: [],
                tabList: [
                    {
                        "labelName": "相同作者"
                    },
                    {
                        "labelName": "相同类型"
                    },
                    {
                        "labelName": "相同出版社"
                    }
                ],
                neo4jBookList: [],
            };
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

            // 判断显示评价数量显示
            judgeNumberIfZero(value) {
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

            // 点击标签头处理
            handleRecommendTabClick(tab, event) {
                this.getNeo4jBookRecommendInfo(tab.name);
            },

            // 获取店铺热门的推荐
            getBusinessHotRecommend() {
                let params = {
                    'businessId': this.$store.state.resultInfo.bookDetailInfo.businessInfo.businessId
                };
                ws_axios.fetchPost1("/recommend/getRecommendBusinessHot", params).then((back) => {
                    this.businessBookList = back.data;
                });
            },

            // 获取图谱书籍的推荐
            getNeo4jBookRecommendInfo(val) {
                val = this.stringToNum(val);
                let urlList = [
                    "/author/byBookNodeName",
                    "/type/byBookNodeName",
                    "/press/byBookNodeName"
                ];
                let params = {
                    'name': this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookIsbn,
                    'pageNum': 0,
                    'pageSize': 12
                };
                ws_axios.fetchPost2(urlList[val], params).then((back) => {
                    if (back.data.resultCode === "1") {
                        this.neo4jBookList = back.data.bookList;
                    }
                });
            },

            // 获取书籍的评论分析
            getBookCommentAnalyse() {
                let params = {
                    'bookId': this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookId,
                };
                ws_axios.fetchPost1('/bookComment/getBookCommentAnalyseByBookId', params).then((back) => {
                    this.bookRemarkSum = back.data;
                });
            },

            // 获取书籍的评论
            getBookCommentList() {
                let params = {
                    'bookId': this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookId,
                };
                ws_axios.fetchPost1('/bookComment/getBookCommentListByBookId', params).then((back) => {
                    if (back.data.resultCode === "1") {
                        this.bookCommentList = back.data.bookCommentList;
                    }
                });
            },

            // 跳转至书籍信息详情页面
            toDetailBH(index){
                let params = {
                    'bookId': this.businessBookList[index].bookId,
                    'businessId': this.businessBookList[index].businessId,
                };
                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);

                    // 详情页面点击图片进入详情页权重值为 10
                    let params_after = {
                        userId: this.$store.state.currUserInfo.userId,
                        bookTypeId: this.businessBookList[index].bookTypeId,
                        number: 10,
                    };

                    ws_axios.fetchPost1('/userTypeNumber/operateUserTypeNumber', params_after).then((back) => {
                        this.$router.push("/to_detail");
                    });
                });
            },

            // 跳转至书籍信息详情页面
            toDetailNR(index) {
                let params = {
                    'bookId': this.neo4jBookList[index].img.substring(this.neo4jBookList[index].img.lastIndexOf('/')+1, this.neo4jBookList[index].img.lastIndexOf('.') ),
                    'businessId': this.neo4jBookList[index].business_id,
                };

                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);
                    this.$router.push("/to_detail");
                });
            },

            // 发送评论
            sendMyComment(){
                let params = {
                    'userId': this.$store.state.currUserInfo.userId,
                    'bookId': this.$store.state.resultInfo.bookDetailInfo.bookInfo.bookId,
                    'content': this.comment,
                    'rating': this.rating,
                };
                ws_axios.fetchPost1('/bookComment/insertBookComment', params).then((back) => {
                    this.rating = null;
                    this.comment = "";
                    this.getBookCommentAnalyse();
                    this.getBookCommentList();
                });
            },
        },
        created() {
            this.getBusinessHotRecommend();
            this.getBookCommentAnalyse();
            this.getBookCommentList();
            this.getNeo4jBookRecommendInfo(0);
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

    .book_show .book_detail .book_detail_block .remarks-container {
        width: 100%;
        margin: 0 auto;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-analyse-box {
        padding: 15px;
        display: flex;
        align-items: center;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-analyse-box .remarks-analyse-goods {
        margin-left: 15px;
        margin-right: 5px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-analyse-box .remarks-analyse-goods .remarks-analyse-num {
        font-size: 29px;
        background-color: #f56c6c;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-analyse-box .remarks-analyse-goods .remarks-analyse-title {
        font-size: 12px;
        line-height: 20px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-analyse-box .remarks-analyse-tags {
        margin-left: 30px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-analyse-box .remarks-analyse-tags .el-tag {
        margin-left: 10px;
        color: #FFFFFF;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-bar {
        text-align: right;
        padding-right: 30px;
        height: 36px;
        border-bottom: 1px solid #e9e9eb;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-bar span {
        margin-right: 15px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-box {
        padding: 15px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px #ccc dotted;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-box .remarks-user {
        margin-left: 20px;
        width: 160px;
        text-align: left;
        display: flex;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-box .remarks-user .el-avatar {
        width: 45px;
        height: 45px;
        margin-top: 10px;
        border: 2px solid #f56c6c;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-box .remarks-user .remarks-user-name {
        padding-left: 10px;
        padding-top: 30px;
        font-size: 15px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-box .remarks-content-box {
        width: calc(100% - 180px);
        text-align: left;
        background-color: #FFFFFF;
        padding-left: 10px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-box .remarks-content-box .remarks-star {

    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-box .remarks-content-box .remarks-content {
        font-size: 16px;
        color: #232323;
        line-height: 28px;
        margin-top: 5px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .remarks-box .remarks-content-box .remarks-time {
        margin-top: 5px;
        font-size: 14px;
        color: #232323;
    }

    .book_show .book_detail .book_detail_block .remarks-container .my-remarks {
        padding: 15px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px #ccc dotted;
    }

    .book_show .book_detail .book_detail_block .remarks-container .my-remarks .remarks-content-box {
        width: 640px;
        text-align: left;
        background-color: #FFFFFF;
        margin-left: 20px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .my-remarks .remarks-rating-button {
        margin-top: 10px;
        margin-left: 20px;
        text-align: left;
    }

    .book_show .book_detail .book_detail_block .remarks-container .my-remarks .remarks-rating-button .el-rate {
        margin-top: 5px;
    }

    .book_show .book_detail .book_detail_block .remarks-container .my-remarks .remarks-rating-button .el-button {
        margin-top: 20px;
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
