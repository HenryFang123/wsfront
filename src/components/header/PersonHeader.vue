<template>
    <div class="header">
        <div>
            <div @click="collapseChage" class="collapse-btn">
                <i class="el-icon-s-fold" v-if="!collapse"/>
                <i class="el-icon-s-unfold" v-else/>
            </div>
            <div class="logo">我的网书</div>
            <div class="header-right">
                <div class="header-user-con">
                    <!-- 全屏显示 -->
                    <div @click="handleFullScreen" class="btn-fullscreen">
                        <el-tooltip :content="fullscreen?`取消全屏`:`全屏`" effect="dark" placement="bottom">
                            <i class="el-icon-rank"/>
                        </el-tooltip>
                    </div>

                    <!-- 用户头像 -->
                    <div class="user-avator_1" v-if="ifUserImage">
                        <el-image v-bind:src="this.$store.state.currUserInfo.userImagePath"/>
                    </div>
                    <div class="user-avator_2" v-if="!ifUserImage">
                        <el-avatar>Hello</el-avatar>
                    </div>

                    <!-- 用户名下拉菜单 -->
                    <el-dropdown @command="handleCommand" class="user-name" trigger="click">
                    <span class="el-dropdown-link">
                       {{this.$store.getters.currUserInfo.userName}}

                        <i class="el-icon-caret-bottom"/>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="loginout" divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="header-link">
                <el-link :underline="false" href="/" icon="el-icon-s-home" type="info">主页</el-link>&nbsp;
            </div>
        </div>
    </div>
</template>

<script>
    import bus from 'components/common/bus';

    export default {
        name: "PersonHeader.vue",
        data() {
            return {
                ifUserImage: false,
                collapse: false,
                fullscreen: false,
                message: 2
            };
        },
        computed: {
            username() {
                let adminId = localStorage.getItem('adminId');
                return adminId ? adminId : adminId;
            }
        },
        created() {
            if (this.$store.state.currUserInfo.userImagePath !== undefined){
                this.ifUserImage = true;
            }
        },
        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'loginout') {
                    localStorage.removeItem('adminId');
                    this.$router.push('/login');
                }
            },

            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },

            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
        },
    };
</script>

<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;

        color: #909399;
        background-color: #f7f7f7;
    }
    .header-link{
        padding-right:20px;
        line-height: 40px;
        float: right
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 40px;

    }

    .header .logo {
        float: left;
        width: 250px;
        line-height: 40px;
    }

    .header-right {
        float: right;
        padding-right: 20px;
    }

    .header-user-con {
        display: flex;
        height: 40px;
        align-items: center;
    }

    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }

    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator_1 {
        margin-left: 20px;
    }

    .user-avator_2 {
        margin-left: 20px;
    }

    .user-avator_1 .el-image {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #909399;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
