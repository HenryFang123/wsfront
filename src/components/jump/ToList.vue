<template>

</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "ToList.vue",
        methods: {
            gotoBookList: function () {
                this.$router.push("/book_list");
            }
        },
        mounted() {
            this.gotoBookList();
        }
    }
</script>

<style scoped>

</style>
