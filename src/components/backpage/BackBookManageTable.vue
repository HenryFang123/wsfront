<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-grid"/> 订单列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
                <el-form ref="form" :model="formDelete" label-width="70px"  >
                    <el-input v-model="formDelete.bookName" placeholder="书名" class="handle-input mr10"/>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    <el-button type="primary" icon="el-icon-upload2" @click="handleUpload" style="float: right">上架图书</el-button>
                </el-form>
            </div>
            <el-table v-bind:data="List"
                      border
                      class="table"
                      ref="multipleTable"
                      header-cell-class-name="table-header">
                <el-table-column prop="bookId" label="图书ID" width="55" align="center"/>
                <el-table-column property="bookName" label="书名" width="150"/>
                <el-table-column property="bookImagePath" label="图片"/>
                <el-table-column property="bookAuthor" label="作者"/>
                <el-table-column property="bookPub" label="出版社"/>
                <el-table-column property="bookYear" label="出版年"/>
                <el-table-column  prop="bookIsbn" label="ISBN"/>
                <el-table-column  prop="bookPrice" label="价格(元)"/>
                <el-table-column  prop="bookDescription" label="简介"/>
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
                    <el-table-column prop="bookId" label="图书ID" width="55" align="center"/>
                    <el-table-column property="bookName" label="书名" width="150"/>
                    <el-table-column property="bookImagePath" label="图片"/>
                    <el-table-column property="bookAuthor" label="作者" width="200"/>
                    <el-table-column property="bookPub" label="出版社"/>
                    <el-table-column property="bookYear" label="出版年"/>
                    <el-table-column  prop="bookIsbn" label="ISBN"/>
                    <el-table-column  prop="bookPrice" label="价格(元)"/>
                    <el-table-column  prop="bookDescription" label="简介"/>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-delete" class="red" @click="deleteSearch">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="图书ID">
                        <el-input v-model="form.bookId"/>
                    </el-form-item>
                    <el-form-item label="书名">
                        <el-input v-model="form.bookName"/>
                    </el-form-item>
                    <el-form-item label="图片">
                        <el-input v-model="form.bookImagePath"/>
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
            this.getCount();
            this.getData();
        },
        methods: {
            current_change:function(currentPage){
                this.currentPage = currentPage;
                this.getData();
                console.log(currentPage)
            },

            getCount(){
                let params = {
                    businessId : this.$store.getters.adminInfo.businessId,
                };
                ws_axios.fetchPost1('/book/getBookInfoCountByBusinessId',params).then((back) =>{
                    this.itemTotal = back.data;
                });
            },

            getData() {
                let params = {
                    businessId : this.$store.getters.adminInfo.businessId,
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize
                };
                ws_axios.fetchPost1('/book/getBookInfoListByBusinessId', params).then((back) => {
                    this.List = back.data;
                    for (let i in this.List) {
                        this.List[i].id = ++this.count
                    }
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
                    })
                })
            },

            deleteSearch(){
                let params = {
                    'bookName': this.formDelete.bookName,
                    'businessId':this.$store.getters.adminInfo.businessId
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
                    this.queryVisible = true
                })
            },

            handleUpload(){
                this.editVisible=true
            },

            uploadBook(){
                let params = {
                    'businessId':this.$store.getters.adminInfo.businessId,
                    'bookId':this.form.bookId,
                    'bookName' :this.form.bookName,
                    'bookImagePath':this.form.bookImagePath,
                    'bookAuthor':this.form.bookAuthor,
                    'bookPub':this.form.bookPub,
                    'bookYear':this.form.bookYear,
                    'bookIsbn':this.form.bookIsbn,
                    'bookPrice':this.form.bookPrice,
                    'bookDescription':this.form.bookDescription
                };
                ws_axios.fetchPost1('/book/insertBookInfo',params).then((back)=>{
                    location.reload()
                })
            }
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
