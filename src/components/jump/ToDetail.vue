<template>

</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "ToDetail.vue",
        methods: {
            getBookDetailInfo: function () {
                if (this.$store.getters.resultInfo_bookDetailInfo_bookId.length > 0
                    && this.$store.getters.resultInfo_bookDetailInfo_businessId.length > 0) {
                    let params = {
                        'bookId': this.$store.getters.resultInfo_bookDetailInfo_bookId,
                        'businessId': this.$store.getters.resultInfo_bookDetailInfo_businessId
                    };
                    // ws_axios.setBaseIrl(1);
                    ws_axios.fetchPost1('/utils/getInfoById', params).then((back) => {
                        if (back.data.resultCode === "0") {
                            console.log("error");
                        } else {
                            this.$store.dispatch("saveBookDetailInfoBookInfo", back.data.bookInfo);
                            this.$store.dispatch("saveBookDetailInfoBusinessInfo", back.data.businessInfo);
                            this.$router.push("/book_detail");
                        }
                    });
                } else {
                    console.log("no detail page need data in vuex.");
                }
            },
        },
        mounted() {
            this.getBookDetailInfo();
        },
    }
</script>

<style scoped>

</style>
