<template>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "ToList.vue",
        methods: {
            getBookListInfo: function () {
                if (this.$store.getters.searchInfo_searchWord.length > 0) {
                    // 提交到 doSearch 方法
                    let params = {
                        'searchWord': this.$store.getters.searchInfo_searchWord,
                        'pageNum': 1,
                        'pageSize': 10
                    };
                    ws_axios.fetchPost2('/solr/doSearch', params).then((back) => {
                        if (back.data.resultCode === "0") {
                            console.log("error");
                        } else {
                            this.$store.dispatch("saveBookListInfoItemTotal", back.data.itemTotal);
                            this.$store.dispatch("saveBookListInfoBookList", back.data.jsonArraySolrDocument);
                            this.$router.push("/book_list");
                        }
                    })
                } else {
                    console.log("error");
                }
            },
        },
        mounted() {
            this.getBookListInfo();
        }
    }
</script>

<style scoped>

</style>
