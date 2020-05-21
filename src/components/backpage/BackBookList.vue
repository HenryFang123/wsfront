<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-grid"/> 图书列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="margin-top: 15px">
            <div class="handle-box">
                <el-form :model="formQuery" label-width="70px" ref="form">
                    <el-input class="handle-input mr10" placeholder="书名" v-model="formQuery.bookName"/>
                    <el-button @click="handleSearch" icon="el-icon-search" type="primary">搜索</el-button>
                </el-form>
            </div>
            <el-table v-bind:data="List"
                      border
                      class="table"
                      header-cell-class-name="table-header"
                      ref="multipleTable">
                <el-table-column align="center" label="图书ID" prop="bookId" width="60"/>
                <el-table-column label="书名" property="bookName" v-model="query.bookName" width="150"/>
                <el-table-column label="图片" property="bookImagePath" v-model="query.bookImagePath" width="130">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.bookImagePath" width="110" height="150"/>
                    </template>
                </el-table-column>
                <el-table-column label="作者" property="bookAuthor" />
                <el-table-column label="出版社" property="bookPub"/>
                <el-table-column label="出版年" property="bookYear"/>
                <el-table-column label="ISBN" prop="bookIsbn"/>
                <el-table-column label="价格(元)" prop="bookPrice" v-model="query.bookPrice"/>
                <el-table-column label="简介" prop="briefDescription" v-model="query.bookDescription">
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
                <el-table-column align="center" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" type="text">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total="itemTotal"
                @current-change="current_change"
                background
                layout="prev, pager, next">
            </el-pagination>

            <el-dialog :visible.sync="editVisible" title="编辑" width="30%">
                <el-form :model="form" label-width="70px" ref="form">
                    <el-form-item label="书名">
                        <el-input disabled="true" v-model="form.bookName"/>
                    </el-form-item>
                    <el-form-item label="图片">
                        <el-input v-model="form.bookImagePath"/>
                    </el-form-item>
                    <el-form-item label="价格(元)">
                        <el-input v-model="form.bookPrice"/>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input v-model="form.bookDescription"/>
                    </el-form-item>
                </el-form>
                <span class="dialog-footer" slot="footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button @click="saveEdit" type="primary">确 定</el-button>
            </span>
            </el-dialog>

            <el-dialog :visible.sync="queryVisible" title="编辑" width="100%">
                <el-table v-bind:data="QueryList">
                    <el-table-column align="center" label="图书ID" prop="bookId" width="60"/>
                    <el-table-column label="书名" property="bookName" width="150"/>
                    <el-table-column label="图片" property="bookImagePath" width="130">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.bookImagePath" width="110" height="150"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="作者" property="bookAuthor" />
                    <el-table-column label="出版社" property="bookPub"/>
                    <el-table-column label="出版年" property="bookYear"/>
                    <el-table-column label="ISBN" prop="bookIsbn"/>
                    <el-table-column label="价格(元)" prop="bookPrice"/>
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
                    <el-table-column align="center" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" type="text">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        inject: ['reload'],
        name: 'BackBookList.vue',
        data() {
            return {
                count: 0,
                pageSize: 5,//每页的数据条数
                currentPage: 1,//默认开始页面
                itemTotal: 0,
                List: [],
                QueryList: [],
                query: {},
                editVisible: false,
                queryVisible: false,
                form: {},
                formQuery: {},
                idx: -1,
                id: -1,
            };
        },

        created() {
            this.getCount();
            this.getData();
        },

        methods: {
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.getData();
            },

            getCount() {
                let params = {
                    businessId: this.$store.getters.adminInfo.businessId,
                };
                ws_axios.fetchPost1('/book/getBookInfoCountByBusinessId', params).then((back) => {
                    this.itemTotal = back.data;
                });
            },

            getData() {
                let params = {
                    businessId: this.$store.state.adminInfo.businessId,
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize
                };
                ws_axios.fetchPost1('/book/getBookInfoListByBusinessId', params).then((back) => {
                    this.List = back.data;
                    for(let i in this.List) {
                        this.List[i].briefDescription = this.List[i].bookDescription.substring(0,10);
                    }
                    this.reload()
                })
            },

            handleSearch() {
                let params = {
                    'bookName': this.formQuery.bookName
                };
                ws_axios.fetchPost1('/book/getBookInfoByBookName', params).then((back) => {
                    this.QueryList = back.data;
                    for(let i in this.QueryList) {
                        this.QueryList[i].briefDescription = this.QueryList[i].bookDescription.substring(0,10);
                    }
                    this.queryVisible = true;
                })

            },

            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },

            // 保存编辑
            saveEdit() {
                let params = {
                    'businessId': this.$store.getters.adminInfo.businessId,
                    'bookName': this.form.bookName,
                    'bookImagePath': this.form.bookImagePath,
                    'bookPrice': this.form.bookPrice,
                    'bookDescription': this.form.bookDescription
                };
                ws_axios.fetchPost1('/book/updateBookInfo', params).then((back) => {
                    this.editVisible = false;
                    location.reload();
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.form);
                })
            },
        }
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
