<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-grid"/> 图书操作
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
                <el-form ref="form" :model="formDelete" label-width="70px"  >
                    <el-input size="mini" v-model="formDelete.bookName" placeholder="书名" class="handle-input mr10"/>
                    <el-button size="mini" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    <el-button size="mini" type="primary" icon="el-icon-upload2" @click="handleUpload" style="float: right">上架图书</el-button>
                </el-form>
            </div>
            <el-table v-bind:data="List"
                      border
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      class="table"
                      ref="multipleTable"
                      header-cell-class-name="table-header">
                <el-table-column prop="bookId" label="图书ID" width="60" align="center"/>
                <el-table-column property="bookName" label="书名" width="150"/>
                <el-table-column label="图片" property="bookImagePath"  width="130">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.bookImagePath" width="110" height="150"/>
                    </template>
                </el-table-column>
                <el-table-column property="bookAuthor" label="作者"/>
                <el-table-column property="bookPub" label="出版社"/>
                <el-table-column property="bookYear" label="出版年"/>
                <el-table-column prop="bookIsbn" label="ISBN"/>
                <el-table-column prop="bookPrice" label="价格(元)"/>
                <el-table-column label="简介" prop="briefDescription">
                    <template slot-scope="scope">
                        <el-popover
                            placement="top-start"
                            title="详细介绍"
                            width="250"
                            trigger="hover"
                        >
                            <div slot="default">
                                {{scope.row.bookDescription}}
                            </div>
                            <div slot="reference">{{scope.row.briefDescription}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click.native.prevent="deleteRow(scope.$index, List)">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="current_change"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="itemTotal">
            </el-pagination>
            <el-dialog title="编辑" :visible.sync="queryVisible" width="100%">
                <el-table v-bind:data="QueryList">
                    <el-table-column prop="bookId" label="图书ID" width="60" align="center"/>
                    <el-table-column property="bookName" label="书名" width="150"/>
                    <el-table-column label="图片" property="bookImagePath" width="130">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.bookImagePath" width="110" height="150"/>
                        </template>
                    </el-table-column>
                    <el-table-column property="bookAuthor" label="作者" width="200"/>
                    <el-table-column property="bookPub" label="出版社"/>
                    <el-table-column property="bookYear" label="出版年"/>
                    <el-table-column  prop="bookIsbn" label="ISBN"/>
                    <el-table-column  prop="bookPrice" label="价格(元)"/>
                    <el-table-column label="简介" prop="briefDescription" >
                        <template slot-scope="scope">
                            <el-popover
                                placement="top-start"
                                title="详细介绍"
                                width="250"
                                trigger="hover"
                            >
                                <div slot="default">
                                    {{scope.row.bookDescription}}
                                </div>
                                <div slot="reference">{{scope.row.briefDescription}}</div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="red" @click="deleteSearch">下架</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <el-dialog title="编辑" :visible.sync="editVisible" width="45%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="图书类型">
                        <label>
                            <select style="height: 30px; width: 150px; border: 1px solid #ccc;" v-model="form.bookTypeId">
                                <option :key="typeIndex" v-for="(typeItem, typeIndex) in currBusinessTypeList" :value="typeItem.bookTypeId">{{typeItem.bookTypeName}}</option>
                            </select>
                        </label>
                    </el-form-item>
                    <el-form-item label="书名">
                        <el-input v-model="form.bookName"/>
                    </el-form-item>
                    <el-form-item label="图片">
                        <el-upload
                            class="upload-demo"
                            action="http://localhost:8080/utils/uploadBookImage"
                            :on-exceed="handleExceed"
                            :before-upload="beforeUpload"
                            :before-remove="beforeRemove"
                            :on-success="getMessage"
                            multiple
                            :limit="1"
                            :file-list="fileList"
                            name="file">
                            <el-button size="small" type="primary" :disabled="isDisable">点击 上传文件</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传 jpg/png 文件，且不超过2Mb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="form.bookAuthor"/>
                    </el-form-item>
                    <el-form-item label="出版社">
                        <el-input v-model="form.bookPub"/>
                    </el-form-item>
                    <el-form-item label="出版年">
                        <el-input v-model="form.bookYear"/>
                    </el-form-item>
                    <el-form-item label="ISBN">
                        <el-input v-model="form.bookIsbn"/>
                    </el-form-item>
                    <el-form-item label="价格(元)">
                        <el-input v-model="form.bookPrice"/>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input v-model="form.bookDescription"/>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadBook">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: 'BackBookManageTable.vue',
        data() {
            return {
                currBusinessTypeList: [],
                fileList: [],
                bookId: "",
                bookImagePath: "",
                isDisable: false,
                loading: true,
                count: 0,
                pageSize:5,//每页的数据条数
                currentPage:1,//默认开始页面
                itemTotal:0,
                businessId:'',
                List: [],
                QueryList: [],
                editVisible: false,
                queryVisible:false,
                form: {},
                formDelete: {},
                idx: -1,
                id: -1,
            };
        },
        created() {
            this.getTypeListByBusinessId();
            this.getCount();
            this.getData();
        },
        methods: {
            // 上传图片
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeUpload(file, fileList){
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
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            getMessage(response, file, fileList){
                if (response.resultCode === "1") {
                    this.bookImagePath = response.bookImagePath;
                    this.isDisable = true;
                } else {
                    this.$notify.error({
                        title: '上传失败',
                        message: '上传图片失败，请重新选择！'
                    });
                }
            },

            current_change:function(currentPage){
                this.currentPage = currentPage;
                this.getData();
            },
            getCount(){
                let params = {
                    businessId : this.$store.state.businessInfo.businessId,
                };
                ws_axios.fetchPost1('/book/getBookInfoCountByBusinessId',params).then((back) =>{
                    this.itemTotal = back.data;
                });
            },
            getData() {
                let params = {
                    businessId : this.$store.state.businessInfo.businessId,
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize
                };
                ws_axios.fetchPost1('/book/getBookInfoListByBusinessId', params).then((back) => {
                    this.List = back.data;
                    for(let i in this.List) {
                        this.List[i].briefDescription = this.List[i].bookDescription.substring(0,10);
                    }
                    this.loading = false;
                })
            },
            deleteRow(index, rows) {
                let params = {
                    'bookId': this.List[index].bookId,
                };
                this.$confirm(
                    "确认下架吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('/book/deleteBookInfoByBookId', params).then((back) => {
                        rows.splice(index, 1);
                        location.reload()
                    })
                })
            },
            deleteSearch(){
                let params = {
                    'bookName': this.formDelete.bookName,
                    'businessId':this.$store.state.businessInfo.businessId
                };
                this.$confirm(
                    "确认下架吗？",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then((back) => {
                    ws_axios.fetchPost1('/book/deleteBookInfoByBookNameAndBusinessId', params).then((back) => {
                        location.reload();
                    })
                })
            },
            handleSearch() {
                let params = {
                    'bookName': this.formDelete.bookName
                };
                ws_axios.fetchPost1('/book/getBookInfoByBookName', params).then((back) => {
                    this.QueryList = back.data;
                    for(let i in this.QueryList) {
                        this.QueryList[i].briefDescription = this.QueryList[i].bookDescription.substring(0,10);
                    }
                    this.queryVisible = true
                })
            },
            handleUpload(){
                this.editVisible=true
            },
            uploadBook(){
                if (this.bookImagePath !== ""){
                    let params = {
                        'businessId': this.$store.state.businessInfo.businessId,
                        'bookTypeId': this.form.bookTypeId,
                        'bookName' : this.form.bookName,
                        'bookImagePath': this.bookImagePath,
                        'bookAuthor': this.form.bookAuthor,
                        'bookPub': this.form.bookPub,
                        'bookYear': this.form.bookYear,
                        'bookIsbn': this.form.bookIsbn,
                        'bookPrice': this.form.bookPrice,
                        'bookDescription': this.form.bookDescription
                    };
                    ws_axios.fetchPost1('/book/insertBookInfo',params).then((back)=>{
                        location.reload()
                    })
                }
            },
            // 获取后端查找店铺下分类信息
            getTypeListByBusinessId() {
                let params = {
                    businessId: this.$store.state.businessInfo.businessId,
                };
                ws_axios.fetchPost1('/book/getBookInfoTypeListByBusinessId', params).then((back) => {
                    this.currBusinessTypeList = back.data;
                });
            },
        },
    };
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

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
