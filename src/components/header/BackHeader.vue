<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div @click="collapseChage" class="collapse-btn">
            <i class="el-icon-s-fold" v-if="!collapse"/>
            <i class="el-icon-s-unfold" v-else/>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                    <el-image v-bind:src="this.$store.state.businessInfo.businessImagePath"/>
                </div>

                <!-- 用户名下拉菜单 -->
                <el-dropdown @command="handleCommand" class="user-name" trigger="click">
                    <span class="el-dropdown-link">
                        {{this.$store.state.currUserInfo.userName}} <i class="el-icon-caret-bottom"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="loginout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from 'components/common/bus';

    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                message: 2
            };
        },
        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'loginout') {
                    this.$router.push('/person_page');
                }
            },

            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
        }
    };
</script>

<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }

    .header .logo {
        float: left;
        width: 250px;
        line-height: 70px;
    }

    .header-right {
        float: right;
        padding-right: 50px;
    }

    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator .el-image {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
