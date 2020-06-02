<template>
    <div>
        <div class="info-box">
            <div class="info-header">
                <span>我的信息</span>
            </div>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
                <el-form :model="form" label-width="80px " ref="form">
                    <el-form-item label="用户头像">
                        <el-upload
                            :action="actionPath"
                            :before-upload="beforeAvatarUpload"
                            :data="postData"
                            :multiple="true"
                            :on-success="handleAvatarSuccess"
                            :show-file-list="false"
                            class="avatar-uploader">
                            <el-image class="avatar" style="width: 220px; height: 200px;" v-bind:src="imageUrl"
                                      v-if="imageUrl"/>
                            <i class="el-icon-plus avatar-uploader-icon" v-else/>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="form.userName"/>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.userEmail"/>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.userSex">
                            <el-radio label="男"/>
                            <el-radio label="女"/>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form.userAge"/>
                    </el-form-item>
                    <el-form-item label="省市区">
                        <VDistpicker :area="form.userRegion" :city="form.userCity" :province="form.userProvince"
                                     @selected="onSelected"/>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="form.userAddress"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onSubmit" type="primary">保存</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";
    import {genUpToken} from "network/ws_qn_token";
    import VDistpicker from 'v-distpicker'

    export default {
        inject: ['reload'],
        name: "PersonInfo.vue",
        data() {
            return {
                form: {},
                List: {},
                actionPath: "http://upload-z1.qiniup.com",
                postData: {
                    token: ''
                },
                imageUrl: '',
            }
        },
        components: {
            VDistpicker
        },
        created() {
            this.getData();

            if (this.$store.state.currUserInfo.userImagePath !== undefined){
                this.imageUrl = this.$store.state.currUserInfo.userImagePath;
            }

            let token;
            const policy = {};
            const bucketName = '3581nicezza-web-images';
            const AK = '_WtTGNKBR2oDXYb-WSTZnS2R0hwkWTAyLTlN-rI_';
            const SK = 'RV5R_r7v3dHm391ghR_oqfsM_qwl2q0-QOECNltQ';
            const deadline = Math.round(new Date().getTime() / 1000) + 3600;
            policy.scope = bucketName;
            policy.deadline = deadline;
            token = genUpToken(AK, SK, policy);
            this.postData.token = token;
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = 'http://img.nicezza.online/' + res.key;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            onSelected(data) {
                this.form.userProvince = data.province.value;
                this.form.userCity = data.city.value;
                this.form.userRegion = data.area.value
            },
            getData() {
                let params = {
                    'userPhone': this.$store.state.currUserInfo.userPhone,
                };
                ws_axios.fetchPost1('/user/getUserInfoByUserPhone', params).then((back) => {
                    this.form = back.data;
                })
            },
            onSubmit() {
                let params = {
                    'userImagePath': this.imageUrl,
                    'userPhone': this.$store.state.currUserInfo.userPhone,
                    'userName': this.form.userName,
                    'userEmail': this.form.userEmail,
                    'userSex': this.form.userSex,
                    userAge: this.form.userAge,
                    'userProvince': this.form.userProvince,
                    'userCity': this.form.userCity,
                    'userRegion': this.form.userRegion,
                    'userAddress': this.form.userAddress
                };
                this.$store.state.currUserInfo.userName = this.form.userName;
                ws_axios.fetchPost1('/user/updateUserInfo', params).then((back) => {
                    this.$message.success("修改个人信息成功")
                })
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .info-box {
        padding: 15px;
        margin: 0;
        border-radius: 5px;
        box-shadow: 0 0 5px #ccc;
        background-color: #ffffff;
    }

    .info-header {
        height: 35px;
        display: flex;
        justify-content: space-between;
        color: #232323;
        font-size: 18px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .el-upload--text {
        background-color: #fff;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        box-sizing: border-box;
        width: 220px;
        height: 220px;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .el-upload--text .el-icon-upload {
        font-size: 67px;
        color: #97a8be;
        margin: 40px 0 16px;
        line-height: 50px;
    }

    .el-upload--text {
        color: #97a8be;
        font-size: 14px;
        text-align: center;
    }

    .el-upload--text em {
        font-style: normal;
    }
</style>
