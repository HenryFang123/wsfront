<template>
    <div class="sidebar">
        <el-menu
            :collapse="collapse"
            :default-active="onRoutes"
            active-text-color="#20a0ff"
            background-color="#f7f7f7"
            class="sidebar-el-menu"
            router
            text-color="#909399"
            unique-opened>
            <template>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu"/>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item-group>

                        <el-menu-item index="PersonInfo">个人信息</el-menu-item>

                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"/>
                        <span>收货地址</span>
                    </template>
                    <el-menu-item-group>

                        <el-menu-item index="PersonAddress">我的收货地址</el-menu-item>
                        <el-menu-item index="AddAddress">添加收货地址</el-menu-item>

                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-bangzhu"/>
                        <span>我的订单</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="PersonOrder1">进行中</el-menu-item>
                      <el-menu-item index="PersonOrder2">待发货</el-menu-item>
                      <el-menu-item index="PersonOrder3">待确认</el-menu-item>
                      <el-menu-item index="PersonOrder4">历史订单</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-star-off"/>
                        <span>收藏</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="PersonStarBook">收藏书籍</el-menu-item>
                        <el-menu-item index="PersonStarBusiness">收藏店铺</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>
        </el-menu>

    </div>
</template>

<script>
    import bus from 'components/common/bus';

    export default {
        name: "PersonSideBar.vue",
        data() {
            return {
                collapse: false,
                count: 1,
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 40px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
