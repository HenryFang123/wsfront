<template>
    <div>
        <span style="color: RED;font-size: 75px">欢迎{{this.$store.getters.AdminInfo_adminName}}登录后端管理系统</span><br>
        <span style="color: yellowgreen;font-size: 50px">您的店铺id为:{{this.$store.getters.AdminInfo_businessId}}</span>

        <el-calendar v-model="value">
        </el-calendar>
    </div>
</template>

<script>
    export default {
        name: "dashboard",
        data() {
            return {
                value: new Date()
            }
        }
    }
</script>

<style scoped>

</style>
