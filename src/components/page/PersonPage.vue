<template>
    <div class="wrapper">
        <PersonHeader/>
        <PersonSidebar/>
        <div :class="{'content-collapse':collapse}" class="content-box">
            <div class="content">
                <transition mode="out-in" name="move">
                    <keep-alive :include="tagsList">
                        <router-view/>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"/>
            </div>
        </div>
    </div>
</template>

<script>
    import PersonHeader from '../header/PersonHeader'
    import PersonSidebar from '../sidebar/PersonSidebar';
    import bus from 'components/common/bus';

    export default {
        data() {
            return {
                tagsList: [],
                collapse: false
            };
        },
        name: "PersonPage.vue",
        components: {
            PersonHeader,
            PersonSidebar,
        },
        created() {
            bus.$on('collapse-content', msg => {
                this.collapse = msg;
            });

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            });
        }
    }
</script>

<style scoped>
    @import "../../assets/css/personmain.css";
    @import "../../assets/css/color-light.css"; /*深色主题*/
</style>
