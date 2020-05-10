<template>
    <div class="sidebar">
        <el-menu
            :collapse="collapse"
            :default-active="onRoutes"
            active-text-color="#20a0ff"
            background-color="#324157"
            class="sidebar-el-menu"
            router
            text-color="#bfcbd9"
            unique-opened>
            <template>
                <el-menu-item index="BackDashBoard">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">系统首页</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item-group>

                        <el-menu-item index="BackOrderTable">订单列表</el-menu-item>

                        <el-menu-item index="BackReturnTable">退货管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-help"></i>
                        <span>图书管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="BackBookList">图书列表</el-menu-item>
                        <el-menu-item index="BackBookManageTable">图书操作</el-menu-item>
                        <!--<el-menu-item index="classification">图书分类</el-menu-item>-->

                    </el-menu-item-group>
                </el-submenu>
            </template>
        </el-menu>

    </div>
</template>

<script>
    import bus from 'components/common/bus';

    export default {
        methods: {},
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
        top: 70px;
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
