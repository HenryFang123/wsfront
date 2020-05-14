<template>
    <div class="business_page_top">
        <el-row>
            <el-col :span="5">
                <el-row>
                    <el-image style="width: 180px; height: 72px" v-bind:src="this.$store.getters.businessInfo.businessImagePath"/>
                </el-row>
            </el-col>
            <el-col :span="9">
                <el-row style="text-align: left;">
                    <span style="font-size: 30px; font-weight: bold">{{this.$store.getters.businessInfo.businessName}}</span>
                </el-row>
                <el-row style="text-align: left; margin-top: 15px;">
                    <span style="font-size: 12px;">店铺描述：{{this.$store.getters.businessInfo.businessDescription}}</span>
                </el-row>
            </el-col>
            <el-col :span="10">

            </el-col>
        </el-row>
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
    }
</style>
