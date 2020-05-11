<template>
    <div class="business_page_top">
        <el-row>
            <el-col :span="3">
                <el-row>
                    <el-image style="width: 300px; height: 121px" v-bind:src="this.$store.getters.businessInfo_businessDetail.businessImagePath"/>
                </el-row>
                <el-row>
                    <span style="font-size: 10px;">店铺ID：{{this.$store.getters.businessInfo_businessDetail.businessId}}</span>
                </el-row>
            </el-col>
            <el-col :span="7">
                <el-row>
                    <span style="font-size: 20px; font-weight: bold">{{this.$store.getters.businessInfo_businessDetail.businessName}}</span>
                </el-row>
                <el-row>
                    <span style="font-size: 12px;">店铺描述：{{this.$store.getters.businessInfo_businessDetail.businessDescription}}</span>
                </el-row>
            </el-col>
            <el-col :span="14">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "BusinessTop",
        methods: {
            // 获取当前店铺信息
            getBusinessInfo : function () {
                if (this.$store.getters.businessInfo_businessId.length > 0) {
                    let params = {"businessId": this.$store.getters.businessInfo_businessId};
                    ws_axios.fetchPost1('/business/getBusinessInfoByBusinessId', params).then((back) => {
                        this.$store.dispatch("saveBusinessInfoBusinessDetail", back.data);
                    })
                }
            },
        },
        mounted() {
            this.getBusinessInfo();
        }
    }
</script>

<style scoped>
    .business_page_top {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        border-bottom: 3px solid #f56c6c;
    }
</style>
