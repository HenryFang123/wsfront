<template>
    <div class="business_page_top">
        <div class="business_page_top_top">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>店铺</el-breadcrumb-item>
                <el-breadcrumb-item>{{this.$store.state.businessInfo.businessName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="business_page_top_bottom">
            <el-row>
                <el-col :span="5">
                    <el-row>
                        <el-image style="width: 180px; height: 72px" v-bind:src="this.$store.state.businessInfo.businessImagePath"/>
                    </el-row>
                </el-col>
                <el-col :span="9">
                    <el-row style="text-align: left;">
                        <span style="font-size: 30px; font-weight: bold">{{this.$store.state.businessInfo.businessName}}</span>
                    </el-row>
                    <el-row style="text-align: left; margin-top: 15px;">
                        <span style="font-size: 12px;">店铺描述：{{this.$store.state.businessInfo.businessDescription}}</span>
                    </el-row>
                </el-col>
                <el-col :span="10">
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "BusinessTop",
    }
</script>

<style scoped>
    .business_page_top {
        margin: 20px auto;
        padding: 0;
        width: 100%;
        border-bottom: 2px solid #999999;
    }

    .business_page_top .business_page_top_top {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .business_page_top .business_page_top_top .el-breadcrumb {
        margin: 5px auto;
        padding: 5px;
        background-color: #f7f7f7;
    }

    .business_page_top .business_page_top_bottom {
        margin: 10px auto;
        padding: 0;
        width: 100%;
    }
</style>
