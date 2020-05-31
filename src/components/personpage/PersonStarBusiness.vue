<template>
    <div class="person_star_business">
        <div class="info-box">
            <div class="info-header">
                <span>我收藏的店铺</span>
            </div>
        </div>
        <div class="star_business">
            <el-row :gutter="10">
                <el-col :span="6" :key="index" v-for="(businessItem, index) in starBusiness">
                    <div class="star_business_block">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-image v-bind:src="businessItem.businessImagePath" style="width: 150px; height: 60px; margin-top: 7px;"/>
                            </el-col>
                            <el-col :span="12">
                                <p><span style="font-size: 18px; font-weight: bold; margin-left: 2px;">{{businessItem.businessName | ellipsisBusinessName}}</span></p>
                                <el-row :gutter="20" style="margin-top: 10px;">
                                    <el-col :span="10">
                                        <el-button style="margin: 10px 2px 0; padding: 4px;" type="info" plain @click="saveBusinessInfoToBusinessPage(index)">进入店铺</el-button>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-button style="margin: 10px 10px 0; padding: 4px;" type="primary" @click="openBox(index)">取消收藏</el-button>
                                    </el-col>
                                </el-row>
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
        name: "PersonStarBusiness.vue",
        data() {
            return {
                starBusiness: [],
            }
        },
        filters: {
            // 设置店铺名超长显示内容
            ellipsisBusinessName(value) {
                if (value.length > 9) {
                    return value.slice(0, 9) + '...';
                } else {
                    return value;
                }
            },
        },
        methods: {
            // 获取用户收藏店铺信息
            getCurrUserStarBusinesses(){
                let params= {
                    'userId': this.$store.state.currUserInfo.userId
                };
                ws_axios.fetchPost1('/userStar/getBusinessUserStarByUserId', params).then((back) => {
                    this.starBusiness = back.data;
                });
            },
            // 保存店铺信息，并转至店铺详情页面
            saveBusinessInfoToBusinessPage(index){
                this.$store.dispatch("saveBusinessInfo", this.starBusiness[index]);
                this.$router.push("/business_page")
            },
            // 移除收藏
            deleteCurrUserStarBusiness(index){
                let params = {
                    'userId': this.$store.state.currUserInfo.userId,
                    'userStarId': this.starBusiness[index].businessId,
                };
                ws_axios.fetchPost1('/userStar/updateUserStar', params).then((back) => {
                    this.getCurrUserStarBusinesses();
                });
            },
            // 打开消息框
            openBox(index) {
                this.$confirm('此操作将删除该收藏项, 确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteCurrUserStarBusiness(index);
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
            this.getCurrUserStarBusinesses();
        },
    }
</script>

<style scoped>
    .person_star_business .info-box {
        padding: 15px;
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0 0 5px #ccc;
        background-color: #ffffff;
    }

    .person_star_business .info-box .info-header {
        height: 35px;
        display: flex;
        justify-content: space-between;
        color: #232323;
        font-size: 18px;
    }

    .person_star_business .star_business {
        padding: 0;
        margin: 0 auto;
    }

    .person_star_business .star_business .star_business_block {
        padding: 10px;
        margin-top: 10px;
        border-radius: 3px;
        box-shadow: 0 0 5px #ccc;
        background-color: #ffffff;
        display: flex;
    }
</style>
