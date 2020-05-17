<template>
    <div class="person_star_book">
        <div class="info-box">
            <div class="info-header">
                <span>我收藏的图书</span>
            </div>
        </div>
        <div class="star_book">
            <el-row :gutter="10">
                <el-col :span="4" :key="index" v-for="(bookItem, index) in starBook">
                    <div class="star_book_block">
                        <el-row>
                            <el-col :span="8">
                                <div class="star_book_block_left">
                                    <el-image v-bind:src="bookItem.bookImagePath" style="width: 80px; height: 95px;"/>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="star_book_block_right">
                                    <div class="star_book_block_right_top">
                                        <p><span style="font-size: 14px">{{bookItem.bookName}}</span></p>
                                        <p><span style="font-size: 22px; color: #f56c6c; font-weight: bold">￥{{bookItem.bookPrice}}</span></p>
                                    </div>
                                    <div class="star_book_block_right_bottom">
                                        <el-row>
                                            <el-col :span="19">
                                                <el-button type="info" plain @click=" saveBookIdAndBusinessIdToBookDetail(index)">查看详情</el-button>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-button type="primary" icon="el-icon-delete" @click="openBox(index)"/>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "PersonShopCar.vue",
        data() {
            return {
                starBook: [],
            }
        },
        methods: {
            // 获取用户收藏书籍信息
            getCurrUserStarBooks(){
                let params= {
                  'userId': this.$store.state.currUserInfo.userId
                };
                ws_axios.fetchPost1('/userStar/getBookUserStarByUserId', params).then((back) => {
                    this.starBook = back.data;
                });
            },

            // 保存书籍及店铺信息，并转至书籍详情页面
            saveBookIdAndBusinessIdToBookDetail(index){
                let params = {
                    'bookId': this.starBook[index].bookId,
                    'businessId': this.starBook[index].businessId,
                };
                ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                    this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                    this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);
                });
                this.$router.push("/book_detail");
            },

            // 移除收藏
            deleteCurrUserStarBooK(index){
                let params = {
                    'userId': this.$store.state.currUserInfo.userId,
                    'userStarId': this.starBook[index].bookId,
                };
                ws_axios.fetchPost1('/userStar/updateUserStar', params).then((back) => {
                });
            },

            // 打开消息框
            openBox(index) {
                this.$confirm('此操作将删除该收藏项, 确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteCurrUserStarBooK(index);
                    this.getCurrUserStarBooks();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        },
        created() {
            this.getCurrUserStarBooks();
        },
    }
</script>

<style scoped>
    .person_star_book .info-box {
        padding: 15px;
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0 0 5px #ccc;
        background-color: #ffffff;
    }

    .person_star_book .info-box .info-header {
        height: 35px;
        display: flex;
        justify-content: space-between;
        color: #232323;
        font-size: 18px;
    }

    .person_star_book .star_book {
        padding: 0;
        margin: 0 auto;
    }

    .person_star_book .star_book .star_book_block {
        padding: 7px;
        margin-top: 10px;
        border-radius: 3px;
        box-shadow: 0 0 5px #ccc;
        background-color: #ffffff;
        display: flex;
    }

    .person_star_book .star_book .star_book_block .star_book_block_left {
        padding: 0;
        margin-top: 10px;
    }

    .person_star_book .star_book .star_book_block .star_book_block_right {
        padding: 0;
        margin-top: 10px;
        margin-left: 10px;
    }

    .person_star_book .star_book .star_book_block .star_book_block_right .star_book_block_right_top {
        padding: 0;
    }

    .person_star_book .star_book .star_book_block .star_book_block_right .star_book_block_right_bottom {
        padding: 0;
        margin-top: 10px;
    }
</style>
