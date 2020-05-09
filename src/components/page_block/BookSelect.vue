<template>
    <div class="book_select">
        <div class="book_select_left">
            <div class="book_select_img">
                <el-image style="height: 200px;"
                          v-bind:src="this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookImagePath"/>
            </div>
        </div>
        <div class="book_select_middle">
            <div class="book_select_title">
                <p><span class="book_select_tag">网书配送</span>
                    {{this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookName}}</p>
            </div>
            <div class="book_select_info">
                <div class="book_select_price">
                    <div class="book_price_row">
                        <p>
                            <span class="book_price_left">商 城 价</span>
                            <span class="book_price_right">￥{{this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookPrice}}</span>
                        </p>
                    </div>
                </div>
                <div class="book_select_comment">
                    <div class="book_comment_row">
                        <p>累计评价</p>
                        <p>
                            <span class="book_comment_num">{{this.$store.getters.resultInfo_bookDetailInfo_bookInfo.bookComment}} 条</span>
                        </p>
                    </div>
                </div>
            </div>
            <br>
            <div class="book_select_add_car">
                <div class="book_add_car_row">
                    <el-row>
                        <el-col :span="8">
                            <el-input :min="1" v-model="bookCount"/>
                        </el-col>
                        <el-col :span="2">
                        </el-col>
                        <el-col :span="5">
                            <el-button :disabled="isDisable" @click="addShoppingCartBtn()" type="danger">加入购物车
                            </el-button>
                        </el-col>
                        <el-col :span="1">
                        </el-col>
                        <el-col :span="8">
                            <el-button @click="payForBookBtn()" plain type="danger">立即购买</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="book_select_right">
            <div class="business_block">
                <div class="business_block_info">
                    <el-image style="width: 200px; height: 80px;"
                              v-bind:src="this.$store.getters.resultInfo_bookDetailInfo_businessInfo.businessImagePath"/>
                    <p><span>店铺名：</span> {{this.$store.getters.resultInfo_bookDetailInfo_businessInfo.businessName}}</p>
                    <p><span>店铺ID：</span> {{this.$store.getters.resultInfo_bookDetailInfo_businessId}}</p>
                </div>
                <div class="business_block_button">
                    <el-button plain>进入店铺</el-button>
                    <el-button plain>收藏店铺</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "BookSelect.vue",
        data() {
            return {
                bookCount: 1,
                isDisable: false,
            };
        },
        methods: {
            // 加书籍进购物车或更新购物车中的书籍
            addShoppingCartBtn: function () {
                let flag = 0;
                let params = {};
                if (this.$store.getters.resultInfo_bookDetailInfo_bookId.length > 0
                    && this.$store.getters.resultInfo_bookDetailInfo_businessId.length > 0
                    && this.$store.getters.userInfo_userId.length > 0
                    && this.bookCount > 0) {

                    for (let i = 0; i < this.$store.state.resultInfo.shopCarInfo.list.length; i++) {
                        if (this.$store.state.resultInfo.shopCarInfo.list[i].book_id.toString() === this.$store.getters.resultInfo_bookDetailInfo_bookId) {
                            flag = 1;
                            params = {
                                "shopCarId": this.$store.state.resultInfo.shopCarInfo.list[i].shop_car_id,
                                'bookNumber': this.bookCount
                            };
                            break;
                        }
                    }

                    if (flag === 1) {
                        // ws_axios.setBaseIrl(1);
                        ws_axios.fetchPost1('/shopCar/updateBookNumber', params).then((back) => {
                            if (back.data.resultCode === "0") {
                                console.log("update error");
                            } else {
                                console.log("update success");
                                this.isDisable = true;
                                this.$router.push("/");
                            }
                        })
                    } else {
                        params = {
                            'userId': this.$store.getters.userInfo_userId,
                            'businessId': this.$store.getters.resultInfo_bookDetailInfo_businessId,
                            'bookId': this.$store.getters.resultInfo_bookDetailInfo_bookId,
                            'bookNumber': this.bookCount
                        };
                        // ws_axios.setBaseIrl(1);
                        ws_axios.fetchPost1('/shopCar/addItemToShopCar', params).then((back) => {
                            if (back.data.resultCode === "0") {
                                console.log("add error");
                            } else {
                                console.log("add success");
                                this.isDisable = true;
                                this.$router.push("/");
                            }
                        })
                    }
                } else {
                    console.log("no data in vuex.");
                }
            },
            // 直接购买书籍
            payForBookBtn: function () {
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    /******************商品图片及购买详情开始******************/
    .book_select {
        width: 100%;
        margin: 15px auto;
        display: flex;
        flex-direction: row;
    }

    .book_select .book_select_left {
        width: 300px;
        margin-right: 10px;
    }

    .book_select .book_select_left .book_select_img {
        width: 250px;
        height: 260px;
        box-shadow: 0 0 4px #ccc;
        cursor: pointer;
    }

    .book_select .book_select_left .book_select_img .el-image {
        margin: 30px auto;
        width: 70%;
        height: 70%;
    }

    /*商品选购详情*/
    .book_select .book_select_middle {
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .book_select .book_select_middle .book_select_title p {
        color: #666;
        font-size: 25px;
    }

    .book_select .book_select_middle .book_select_title p .book_select_tag {
        font-size: 14px;
        padding: 2px 3px;
        border-radius: 3px;
        background-color: #e4393c;
        color: #fff;
    }

    /*价格详情等*/
    .book_select .book_select_middle .book_select_info {
        margin: 10px 0;
        padding: 5px;
        width: 600px;
        height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #f3f3f3;
    }

    .book_select .book_select_middle .book_select_info .book_select_price {
        display: flex;
        flex-direction: column;
    }

    .book_select .book_select_middle .book_select_info .book_select_price .book_price_row {
        margin: 5px auto;
    }

    .book_select .book_select_middle .book_select_info .book_select_comment .book_comment_row p {
        color: #999999;
        font-size: 12px;
        line-height: 10px;
        text-align: center;
    }

    .book_select .book_select_middle .book_select_info .book_select_price .book_price_row p .book_price_left {
        color: #999999;
        font-size: 15px;
        margin-right: 15px;
    }

    .book_select .book_select_middle .book_select_info .book_select_price .book_price_row p .book_price_right {
        color: #e4393c;
        font-size: 23px;
        cursor: pointer;
    }

    .book_select .book_select_middle .book_select_info .book_select_comment .book_comment_row {
        margin: 10px 0;
        padding-left: 10px;
        padding-right: 15px;
        border-left: 1px solid #ccc;
    }

    .book_select .book_select_middle .book_select_info .book_select_comment .book_comment_row p {
        color: #999999;
        font-size: 15px;
        line-height: 15px;
        text-align: center;
    }

    .book_select .book_select_middle .book_select_info .book_select_comment .book_comment_row p .book_comment_num {
        line-height: 15px;
        color: #005eb7;
    }

    .book_select .book_select_middle .book_select_add_car {
        width: 100%;
        margin-top: 15px;
        border-top: 1px dotted #ccc;
    }

    .book_select .book_select_middle .book_select_add_car .book_add_car_row {
        margin-top: 15px;
    }

    .book_select .book_select_middle .book_select_add_car .book_add_car_row .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex
    }

    .book_select .book_select_middle .book_select_add_car .book_add_car_row .el-row .el-col {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .book_select .book_select_right {
        margin: 0 auto;
        padding: 0;
        height: 100%;
    }

    .book_select .book_select_right .business_block {
        margin: 0 auto;
        padding: 0;
        height: 100%;
        border: 1px solid #e9e9eb;
    }

    .book_select .book_select_right .business_block .business_block_info {
        margin: 0 auto;
    }

    .book_select .book_select_right .business_block .business_block_info .el-image {
        margin: 0 auto;
    }

    .book_select .book_select_right .business_block .business_block_info p {
        margin: 10px 10px;
        text-align: left;
        font-size: 14px;
    }

    .book_select .book_select_right .business_block .business_block_button {
        margin: 20px auto;
        border-top: 1px solid #d3dce6;
        font-size: 12px;
    }

    .book_select .book_select_right .business_block .business_block_button .el-button {
        margin: 10px 10px 0;
        padding: 4px;
    }

    /******************商品图片及购买详情结束******************/
</style>
