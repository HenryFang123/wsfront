<template>
    <div class="business_page">
        <Header/>
        <div class="business_page_main">
            <BusinessTop/>
            <BusinessBottom/>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "../header/Header";
    import Footer from "../footer/Footer";
    import BusinessTop from "../page_block/BusinessTop";
    import BusinessBottom from "../page_block/BusinessBottom";
    export default {
        name: "BusinessPage",
        components: {Header, Footer, BusinessTop, BusinessBottom},
    }
</script>

<style scoped>
    html,
    body,
    #app,
    .business_page {
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: #FFFFFF;
    }

    .business_page .business_page_main {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        text-align: center;
    }
</style>
