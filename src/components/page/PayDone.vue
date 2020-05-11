<template>
    <div>
        <Header/>
        <div >
            <img src="assets/img/payImage/pay-demo.png">
        </div>
        <div>
            <img src="assets/img/payImage/pay-qrscan.png">
        </div>
        <div>
            <el-button @click="gotoHome" type="success" icon="el-icon-check" circle/>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from '../header/Header'
    import Footer from '../footer/Footer'
    export default {
        name: ".vue",
        components: {  Header, Footer},
        data() {
            return {}
        },
        methods:{
            gotoHome(){
                this.$store.commit('setOrderConfirm',true);
                this.$router.push("/")
            }
        }
    }
</script>

<style>
    html,
    body,
    #app,
    .shop_car-page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
    }
</style>
