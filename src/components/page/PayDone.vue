<template>
    <div>
        <Header/>
            <el-row><br/></el-row>
            <el-row><br/></el-row>
            <el-row>
                <el-col :span="6"/>
                <el-col :span="4">
                    <img src="~assets/img/payImage/pay-demo.png" style="height: 400px;width: 300px"/>
                </el-col>
                <el-col :span="2"/>
                <el-col :span="4">
                    <img src="~assets/img/payImage/pay-qrscan.png" style="height: 250px;width: 250px;margin-top: 75px;"/>
                </el-col>
                <el-col :span="2"/>
                <el-col :span="1" style="margin-top: 75px;">
                </el-col>
                <el-col :span="5"/>
            </el-row>
            <el-row>
                <el-col :span="17"/>
                <el-col :span="7">
                    <el-button @click="gotoHome" type="success" icon="el-icon-check" circle/>&emsp;
                    <span style="font-size: 17px;font-family:Microsoft YaHei">点击我完成付款</span>
                </el-col>

            </el-row>
            <el-row><br/></el-row>
            <el-row><br/></el-row>
        <Footer/>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";
    import Header from '../header/Header'
    import Footer from '../footer/Footer'

    export default {
        name: "PayDone.vue",
        components: {  Header, Footer},
        data() {
            return {}
        },
        created() {
            document.documentElement.scrollTop=192;
        },
        methods:{
            gotoHome(){
                for(let i in this.$store.state.resultInfo.orderInfo.list){
                    ws_axios.fetchPost1('/order/payOrderInfoByOrderId',{'orderId':this.$store.state.resultInfo.orderInfo.list[i].orderId})
                }
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .el-col{
        min-height: 1px;
    }
</style>
