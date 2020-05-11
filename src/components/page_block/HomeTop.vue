<template>
    <div class="home-main-middle-top">
        <div class="home-main-middle-top-block">
            <!--占位块-->
        </div>
        <div class="home-main-middle-top-tag">
            <el-row>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">图书排行榜</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">计算机</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">国内名著</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">国内文学</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">国外文学</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">小说悬疑</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">经典</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">历史文化</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">哲学思想</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">诗词诗歌</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">金庸武侠</el-link>
                </el-col>
                <el-divider direction="vertical"/>
                <el-col :span="2">
                    <el-link :underline="false" href="" type="info">国外名著</el-link>
                </el-col>
            </el-row>
        </div>
        <div class="home-main-middle-top-main">
            <el-row>
                <el-col :span="4">
                    <div class="home-main-middle-top-main-menu_top">
                        <a>图书分类</a>
                    </div>
                    <div class="home-main-middle-top-main-menu_side" ref="menuSide">
                        <ul>
                            <li @mouseenter="showDetail(1)" @mouseleave="hideDetail(1)">
                                <span class="menu_side-item">名著</span> /
                                <span class="menu_side-item">外国名著</span>
                            </li>
                            <li @mouseenter="showDetail(2)" @mouseleave="hideDetail(2)">
                                <span class="menu_side-item">计算机</span> /
                                <span class="menu_side-item">大数据</span> /
                                <span class="menu_side-item">人工智能</span>
                            </li>
                            <li @mouseenter="showDetail(3)" @mouseleave="hideDetail(3)">
                                <span class="menu_side-item">经典</span> /
                                <span class="menu_side-item">武侠</span> /
                                <span class="menu_side-item">金庸精选</span>
                            </li>
                        </ul>
                    </div>
                    <!-- 右侧弹出框布局 -->
                    <!--第一个弹出框-->
                    <transition name="fade">
                        <div :duration="{ enter: 100, leave: 100 }" @mouseenter="showDetail(1)"
                             @mouseleave="hideDetail(1)"
                             class="detail-item-panel panel-1" ref="itemPanel1" v-show="panel1">
                            <div class="nav-detail-item">
                                <span :key="index" v-for="(item, index) in panelData1.navTags">{{item}} > </span>
                            </div>
                            <ul>
                                <li :key="index" class="detail-item-row" v-for="(items, index) in panelData1.classNav">
                              <span class="detail-item-title">{{items.title}}
                                <span class="glyphicon glyphicon-menu-right"/>
                              </span>
                                    <router-link :key="subIndex" to="/goodsList" v-for="(item, subIndex) in items.tags">
                                        <span class="detail-item">{{item}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div :duration="{ enter: 100, leave: 100 }" @mouseenter="showDetail(2)"
                             @mouseleave="hideDetail(2)"
                             class="detail-item-panel panel-2" ref="itemPanel2" v-show="panel2">
                            <div class="nav-detail-item">
                                <span :key="index" v-for="(item, index) in panelData2.navTags">{{item}} > </span>
                            </div>
                            <ul>
                                <li :key="index" class="detail-item-row" v-for="(items, index) in panelData2.classNav">
                            <span class="detail-item-title">{{items.title}}
                              <span class="glyphicon glyphicon-menu-right"/>
                            </span>
                                    <router-link :key="subIndex" to="/goodsList" v-for="(item, subIndex) in items.tags">
                                        <span class="detail-item">{{item}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div :duration="{ enter: 100, leave: 100 }" @mouseenter="showDetail(3)"
                             @mouseleave="hideDetail(3)"
                             class="detail-item-panel panel-3" ref="itemPanel3" v-show="panel3">
                            <div class="nav-detail-item">
                                <span :key="index" v-for="(item, index) in panelData3.navTags">{{item}} > </span>
                            </div>
                            <ul>
                                <li :key="index" class="detail-item-row" v-for="(items, index) in panelData3.classNav">
                            <span class="detail-item-title">{{items.title}}
                              <span class="glyphicon glyphicon-menu-right"/>
                            </span>
                                    <router-link :key="subIndex" to="/goodsList" v-for="(item, subIndex) in items.tags">
                                        <span class="detail-item">{{item}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </el-col>
                <el-col :span="20">
                    <div class="home-main-middle-top-main-select_content-suggest">
                        <div class="home-main-middle-top-main-select_content-suggest-top">
                            <a>排行推荐</a>
                        </div>
                        <div class="home-main-middle-top-main-select_content-suggest-book">
                            <el-row>
                                <el-col :span="8">
                                    <el-divider content-position="left">
                                        <el-image style="height: 35px; width: 87px;" v-bind:src="this.$store.getters.webImg_homeTopJgtj"/>
                                    </el-divider>
                                    <div :key="index"
                                         class="price_sort_card"
                                         v-for="(priceSortItem,index) in this.$store.getters.resultInfo_homeInfo_topInfo_bookList.topPrice">
                                        <el-row>
                                            <el-col :span="1">
                                                <span>{{index+1}}</span>
                                            </el-col>
                                            <el-col :span="18">
                                                <span>{{priceSortItem.bookName}}</span>
                                            </el-col>
                                            <el-col :span="5">
                                                <span>￥{{priceSortItem.bookPrice}}</span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <el-divider content-position="left">
                                        <el-image style="height: 35px; width: 87px;" v-bind:src="this.$store.getters.webImg_homeTopPltj"/>
                                    </el-divider>
                                    <div :key="index"
                                         class="comment_sort_card"
                                         v-for="(commentSortItem,index) in this.$store.getters.resultInfo_homeInfo_topInfo_bookList.topComment">
                                        <el-row>
                                            <el-col :span="1">
                                                <span>{{index+1}}</span>
                                            </el-col>
                                            <el-col :span="18">
                                                <span>{{commentSortItem.bookName}}</span>
                                            </el-col>
                                            <el-col :span="5">
                                                <span>{{commentSortItem.bookComment}} 评论</span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <el-divider content-position="left">
                                        <el-image style="height: 35px; width: 87px;" v-bind:src="this.$store.getters.webImg_homeTopPjtj"/>
                                    </el-divider>
                                    <div :key="index" class="rating_sort_card"
                                         v-for="(ratingSortItem,index) in this.$store.getters.resultInfo_homeInfo_topInfo_bookList.topRating">
                                        <el-row>
                                            <el-col :span="1">
                                                <span>{{index+1}}</span>
                                            </el-col>
                                            <el-col :span="18">
                                                <span>{{ratingSortItem.bookName}}</span>
                                            </el-col>
                                            <el-col :span="5">
                                                <span>评分: {{ratingSortItem.bookRating}}</span>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import ws_axios from "network/ws_axios";

    export default {
        name: "HomeTop.vue",
        data() {
            return {
                panel1: false,
                panel2: false,
                panel3: false,
                panelData1: {
                    navTags: ['图像识别', ''],
                    classNav: [
                        {
                            title: '计算机',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        },
                        {
                            title: '人工智能',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        },
                        {
                            title: '大数据',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        },
                    ]
                },
                panelData2: {
                    navTags: ['XXXXX', 'XXXXX'],
                    classNav: [
                        {
                            title: '人工智能',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        },
                        {
                            title: '大数据',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        },
                        {
                            title: '云计算',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        }
                    ]
                },
                panelData3: {
                    navTags: ['XXXXX', 'XXXXX'],
                    classNav: [
                        {
                            title: '经典',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        },
                        {
                            title: '名著',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        },
                        {
                            title: '古典文学',
                            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX']
                        }
                    ]
                },
            }
        },
        methods: {
            // 首页图书分类, 弹出框显示方法函数
            showDetail(index) {
                if (index === 1) {
                    this.panel1 = true;
                    this.panel2 = false;
                    this.panel3 = false;
                } else if (index === 2) {
                    this.panel2 = true;
                    this.panel1 = false;
                    this.panel3 = false;
                } else if (index === 3) {
                    this.panel3 = true;
                    this.panel1 = false;
                    this.panel2 = false;
                }
            },
            hideDetail(index) {
                if (index === 1) {
                    this.panel1 = false;
                } else if (index === 2) {
                    this.panel2 = false;
                } else if (index === 3) {
                    this.panel3 = false;
                }
            },

            // 获取后端系统排行推荐的信息
            getSystemSortRecommend: function () {
                let params = {};
                ws_axios.fetchGet2('redis/getSystemSortList', params).then((back) => {
                    this.$store.dispatch("saveHomeInfoTopInfoBookList", back.data);
                })
            }
        },
        mounted() {
            // 首页图书分类, 弹出框显示高度起始、长度起始设置
            this.getSystemSortRecommend();
            this.$refs.itemPanel1.style.left = this.$refs.menuSide.offsetLeft + this.$refs.menuSide.offsetWidth + 'px';
            this.$refs.itemPanel2.style.left = this.$refs.menuSide.offsetLeft + this.$refs.menuSide.offsetWidth + 'px';
            this.$refs.itemPanel3.style.left = this.$refs.menuSide.offsetLeft + this.$refs.menuSide.offsetWidth + 'px';
            this.$refs.itemPanel1.style.top = this.$refs.menuSide.offsetTop + 'px';
            this.$refs.itemPanel2.style.top = this.$refs.menuSide.offsetTop + 'px';
            this.$refs.itemPanel3.style.top = this.$refs.menuSide.offsetTop + 'px';
        },
        updated() {
            this.$refs.itemPanel1.style.left = this.$refs.menuSide.offsetLeft + this.$refs.menuSide.offsetWidth + 'px';
            this.$refs.itemPanel2.style.left = this.$refs.menuSide.offsetLeft + this.$refs.menuSide.offsetWidth + 'px';
            this.$refs.itemPanel3.style.left = this.$refs.menuSide.offsetLeft + this.$refs.menuSide.offsetWidth + 'px';
            this.$refs.itemPanel1.style.top = this.$refs.menuSide.offsetTop + 'px';
            this.$refs.itemPanel2.style.top = this.$refs.menuSide.offsetTop + 'px';
            this.$refs.itemPanel3.style.top = this.$refs.menuSide.offsetTop + 'px';
        },
    }
</script>

<style scoped>
    /******************首页面顶部分类推荐开始******************/
    .home-main-middle-top {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .home-main-middle-top .home-main-middle-top-block {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .home-main-middle-top .home-main-middle-top-tag {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        background-color: #f7f7f7;
    }

    .home-main-middle-top .home-main-middle-top-tag .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex
    }

    .home-main-middle-top .home-main-middle-top-tag .el-row .el-col {
        margin: 5px auto;
        padding: 0;
        height: 100%;
    }

    .home-main-middle-top .home-main-middle-top-tag .el-row .el-divider {
        margin-top: 10px;
        margin-left: 1px;
        margin-right: 1px;
    }

    .home-main-middle-top .home-main-middle-top-main {
        margin: 0 auto;
        padding: 0;
        width: 100%;
    }

    .home-main-middle-top .home-main-middle-top-main .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex;
        text-align: left;
    }

    .home-main-middle-top .home-main-middle-top-main .el-row .el-col {
        margin: 5px auto;
        padding: 0;
        height: 100%;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-menu_top {
        width: 100%;
        margin: 5px auto;
        padding: 0;
        color: #FFFFFF;
        font-size: 20px;
        background-color: #b2dfdb;
        text-align: center;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-menu_side {
        width: 100%;
        margin: 0 auto;
        padding: 0;
        color: #000000;
        background-color: #F7F7F7;
        text-align: left;
        border: 1px solid #b2dfdb;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-menu_side ul {
        width: 100%;
        padding-top: 10px;
        list-style: none;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-menu_side li {
        padding: 8px;
        font-size: 14px;
        line-height: 18px;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-menu_side li:hover {
        background: #FFFFFF;
        border-top: 1px solid #b2dfdb;
        border-bottom: 1px solid #b2dfdb;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-menu_side .menu_side-item:hover {
        cursor: pointer;
        color: #c81623;
    }

    .detail-item-panel {
        text-align: left;
        width: 720px;
        position: absolute;
        /*top: 168px;*/
        /*left: 389px;*/
        z-index: 999;
        background-color: #FFFFFF;
        border-top: 1px solid #b2dfdb;
        border-right: 1px solid #b2dfdb;
        border-bottom: 1px solid #b2dfdb;
    }

    .nav-detail-item {
        margin-left: 25px;
        margin-top: 15px;
        margin-bottom: 15px;
        cursor: pointer;
        color: #eee;
    }

    .nav-detail-item span {
        padding: 6px 6px 6px 12px;
        margin-left: 15px;
        font-size: 12px;
        background-color: #6e6568;
    }

    .nav-detail-item span:hover {
        margin-left: 15px;
        background-color: #f44336;
    }

    .detail-item-panel ul {
        list-style: none;
    }

    .detail-item-panel li {
        line-height: 38px;
        margin-left: 40px;
    }

    .detail-item-title {
        padding-right: 6px;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
        color: #555555;
    }

    .detail-item-title:hover {
        color: #d9534f;
    }

    .detail-item-row a {
        color: #555555;
    }

    .detail-item {
        font-size: 14px;
        padding-left: 12px;
        padding-right: 8px;
        cursor: pointer;
        border-left: 1px solid #ccc;
    }

    .detail-item:hover {
        color: #d9534f;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest {
        margin-top: 0;
        margin-left: 10px;
        padding: 0;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-top {
        width: 100%;
        margin: 5px auto;
        padding: 0;
        color: #FFFFFF;
        font-size: 20px;
        background-color: #b2dfdb;
        text-align: center;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-book {
        margin: 0 auto;
        width: 100%;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-book .el-row {
        margin: 0 auto;
        padding: 0;
        width: 100%;
        display: flex
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-book .el-row .el-col {
        margin: 0 10px;
        padding: 0;
        height: 100%;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-book .el-row .el-col .price_sort_card {
        margin: 5px auto;
        padding: 0;
        font-size: 14px;
        border-bottom: 1px solid #e9e9eb;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-book .el-row .el-col .comment_sort_card {
        margin: 5px auto;
        padding: 0;
        font-size: 14px;
        border-bottom: 1px solid #e9e9eb;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-book .el-row .el-col .rating_sort_card {
        margin: 5px auto;
        padding: 0;
        font-size: 14px;
        border-bottom: 1px solid #e9e9eb;
    }

    /******************首页面顶部分类推荐结束******************/
</style>
