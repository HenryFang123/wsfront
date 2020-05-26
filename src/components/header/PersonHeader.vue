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
                        {{this.$store.state.currUserInfo.userName}} <i class="el-icon-caret-bottom"/>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="loginout" divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="header-link">
                <el-link :underline="false" href="/" icon="el-icon-s-home" type="info">主页</el-link>&nbsp;
                <el-link v-if="ifUserTar" :underline="false" @click="goToCurrUserBackHome" icon="el-icon-s-home" type="info">我的店铺</el-link>&nbsp;
            </div>
        </div>
    </div>
</template>

<script>
    import bus from 'components/common/bus';
    import ws_axios from "network/ws_axios";

    export default {
        name: "PersonHeader.vue",
        data() {
            return {
                ifUserImage: false,
                ifUserTar: false,
                collapse: false,
            };
        },
        created() {
            if (this.$store.state.currUserInfo.userImagePath !== undefined){
                this.ifUserImage = true;
            }
            if (this.$store.state.currUserInfo.userTar === 1){
                this.ifUserTar = true;
            }
        },
        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'loginout') {
                    this.$router.push('/login');
                }
            },
            // 进入我的店铺
            goToCurrUserBackHome() {
                let params = {
                    'userId': this.$store.state.currUserInfo.userId,
                };
                ws_axios.fetchPost1('/business/getBusinessInfoByUserId', params).then((back) => {
                    this.$store.dispatch("saveBusinessInfo", back.data);
                });

                this.$router.push({path: '/BackHome'});
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
