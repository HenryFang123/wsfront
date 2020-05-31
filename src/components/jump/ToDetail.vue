<template>

</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "ToDetail.vue",
        methods: {
            gotoBookDetail: function () {
                this.$router.push("/book_detail");
            }
        },
        mounted() {
            this.gotoBookDetail();
        }
    }
</script>

<style scoped>

</style>
