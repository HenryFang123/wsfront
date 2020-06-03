<template>
    <div class="home-main-middle-top">
        <div class="home-main-middle-top-block">
            <!--占位块-->
        </div>
        <div class="home-main-middle-top-main">
            <el-row>
                <el-col :span="4">
                    <div class="home-main-middle-top-main-menu_top">
                        <a>图书分类</a>
                    </div>
                    <div class="home-main-middle-top-main-menu_side" ref="menuSide">
                        <ul>
                            <li style="white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" :key="liIndex" v-for="(liItem, liIndex) in tsflList" @mouseenter="showDetail(liIndex)" @mouseleave="hideDetail()">
                                <span class="menu_side-item" :key="headTagsIndex" v-for="(headTagsItem, headTagsIndex) in liItem.headTags">{{headTagsItem.headTagsName}} / </span>
                            </li>
                        </ul>
                    </div>
                    <transition name="fade">
                        <div :duration="{ enter: 100, leave: 100 }"
                             class="detail-item-panel" ref="itemPanel" @mouseenter="showPanel()" @mouseleave="hideDetail()" v-show="panel">
                            <div class="nav-detail-item">
                                <span :key="navTagsIndex" v-for="(navTagsItem, navTagsIndex) in tsflIndexList.navTags">{{navTagsItem.navTagsName}} > </span>
                            </div>
                            <ul>
                                <li :key="classNavIndex" class="detail-item-row" v-for="(classNavItem, classNavIndex) in tsflIndexList.classNav">
                                    <span class="detail-item-title">{{classNavItem.title}}<span class="glyphicon glyphicon-menu-right"/></span>
                                    <router-link :key="tagsIndex" to="/goodsList" v-for="(tagsItem, tagsIndex) in classNavItem.tags">
                                        <span class="detail-item">{{tagsItem.classNavTagsName}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </el-col>
                <el-col :span="20">
                    <div class="home-main-middle-top-main-select_content-suggest">
                        <div class="home-main-middle-top-main-select_content-suggest-top">
                            <a>图书推荐</a>
                        </div>
                        <div class="home-main-middle-top-main-select_content-suggest-book">
                            <el-row>
                                <el-col :span="16">
                                    <el-carousel :interval="5000" arrow="always">
                                        <el-carousel-item v-for="(imgItem, index) in this.$store.state.resultInfo.homeInfo.topInfo.imgList" :key="index">
                                            <div class="img_block">
                                                <el-image style="margin: 0 auto;" v-bind:src="imgItem.imgBlock"/>
                                            </div>
                                        </el-carousel-item>
                                    </el-carousel>
                                </el-col>
                                <el-col :span="8">
                                    <div :key="index" class="rating_sort_card"
                                         v-for="(ratingSortItem,index) in this.$store.state.resultInfo.homeInfo.topInfo.bookList">
                                        <el-row>
                                            <el-col :span="20">
                                                <span style="display:block; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">{{ratingSortItem.bookName}}</span>
                                            </el-col>
                                            <el-col :span="4">
                                                <span style="display:block; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">评分:{{ratingSortItem.bookRating}}</span>
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
                tsflList: [
                    {
                        headTags: [
                            {
                                headTagsName: "计算机"
                            },
                            {
                                headTagsName: "操作系统"
                            },
                            {
                                headTagsName: "人工智能"
                            },
                        ],
                        navTags: [
                            {
                                navTagsName: "C语言",
                            },
                            {
                                navTagsName: "Java",
                            },
                            {
                                navTagsName: "面向对象",
                            },
                            {
                                navTagsName: "人工智能",
                            },
                        ],
                        classNav: [
                            {
                                title: '计算机',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        headTags: [
                            {
                                headTagsName: "名著"
                            },
                            {
                                headTagsName: "外国名著"
                            },
                        ],
                        navTags: [
                            {
                                navTagsName: "网书精选",
                            },
                            {
                                navTagsName: "四大名著",
                            },
                            {
                                navTagsName: "老舍",
                            },
                            {
                                navTagsName: "鲁迅",
                            },
                        ],
                        classNav: [
                            {
                                title: '名著',
                                tags: [
                                    {
                                        classNavTagsName: "西游记（全二册）",
                                    },
                                    {
                                        classNavTagsName: "三国演义（全二册）",
                                    },
                                    {
                                        classNavTagsName: "了不起的盖茨比",
                                    },
                                    {
                                        classNavTagsName: "红与黑",
                                    },
                                    {
                                        classNavTagsName: "悲惨世界（上中下）",
                                    },
                                    {
                                        classNavTagsName: "童年",
                                    },
                                ]
                            },
                            {
                                title: '外国名著',
                                tags: [
                                    {
                                        classNavTagsName: "巴黎圣母院",
                                    },
                                    {
                                        classNavTagsName: "鲁滨孙飘流记",
                                    },
                                    {
                                        classNavTagsName: "复活",
                                    },
                                    {
                                        classNavTagsName: "麦田守望者",
                                    },
                                    {
                                        classNavTagsName: "福尔摩斯探案全集2",
                                    },
                                    {
                                        classNavTagsName: "老人与海",
                                    },
                                    {
                                        classNavTagsName: "巴黎圣母院",
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        headTags: [
                            {
                                headTagsName: "经典"
                            },
                            {
                                headTagsName: "武侠"
                            },
                            {
                                headTagsName: "金庸精选"
                            },
                        ],
                        navTags: [
                            {
                                navTagsName: "刘慈欣",
                            },
                            {
                                navTagsName: "金庸",
                            },
                        ],
                        classNav: [
                            {
                                title: '经典',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '武侠',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '金庸精选',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        headTags: [
                            {
                                headTagsName: "文学"
                            },
                            {
                                headTagsName: "中国文学"
                            },
                            {
                                headTagsName: "当代文学"
                            },
                        ],
                        navTags: [
                            {
                                navTagsName: "东野圭吾",
                            },
                            {
                                navTagsName: "巴金",
                            },
                            {
                                navTagsName: "南派三叔",
                            },
                        ],
                        classNav: [
                            {
                                title: '文学',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '古典文学',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '当代文学',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '中国文学',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '日本文学',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        headTags: [
                            {
                                headTagsName: "历史"
                            },
                            {
                                headTagsName: "中国历史"
                            },
                            {
                                headTagsName: "近代史"
                            },
                        ],
                        navTags: [
                            {
                                navTagsName: "网书精选",
                            },
                        ],
                        classNav: [
                            {
                                title: '历史',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '中国历史',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '近代史',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        headTags: [
                            {
                                headTagsName: "文化"
                            },
                            {
                                headTagsName: "社会"
                            },
                            {
                                headTagsName: "哲学"
                            },
                            {
                                headTagsName: "思想"
                            },
                        ],
                        navTags: [
                            {
                                navTagsName: "网书精选",
                            },
                        ],
                        classNav: [
                            {
                                title: '文化',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '社会',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '哲学',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '思想',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        headTags: [
                            {
                                headTagsName: "诗词"
                            },
                            {
                                headTagsName: "诗歌"
                            },
                        ],
                        navTags: [
                            {
                                navTagsName: "网书精选",
                            },
                        ],
                        classNav: [
                            {
                                title: '诗词',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '诗歌',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        headTags: [
                            {
                                headTagsName: "推理"
                            },
                            {
                                headTagsName: "悬疑"
                            },
                            {
                                headTagsName: "小说"
                            },
                        ],
                        navTags: [
                            {
                                navTagsName: "网书精选",
                            },
                        ],
                        classNav: [
                            {
                                title: '推理',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '悬疑',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                            {
                                title: '小说',
                                tags: [
                                    {
                                        classNavTagsName: "",
                                    },
                                ]
                            },
                        ],
                    },
                ],
                tsflIndexList: [],
                panel: false,
            }
        },
        methods: {
            // 首页图书分类, 弹出框显示方法函数
            showDetail(liIndex) {
                this.tsflIndexList = this.tsflList[liIndex];
                this.panel = true;
            },
            showPanel() {
                this.panel = true;
            },
            hideDetail() {
                this.panel = false;
            },

            // 获取后端系统排行推荐的信息
            getSystemSortRecommend: function () {
                ws_axios.fetchPost2('redis/getSystemSortList',{}).then((back) => {
                    this.$store.dispatch("saveHomeInfoTopInfoBookList", back.data);
                })
            }
        },
        mounted() {
            // 首页图书分类, 弹出框显示高度起始、长度起始设置
            this.$refs.itemPanel.style.left = this.$refs.menuSide.offsetLeft + this.$refs.menuSide.offsetWidth + 'px';
            this.$refs.itemPanel.style.top = this.$refs.menuSide.offsetTop + 'px';
        },
        updated() {
            this.$refs.itemPanel.style.left = this.$refs.menuSide.offsetLeft + this.$refs.menuSide.offsetWidth + 'px';
            this.$refs.itemPanel.style.top = this.$refs.menuSide.offsetTop + 'px';
        },
        created() {
            this.getSystemSortRecommend();
        },
    }
</script>

<style scoped>
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
        margin: 10px auto;
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
        width: 690px;
        position: absolute;
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
        font-size: 13px;
        background-color: #f44336;
    }

    .nav-detail-item span:hover {
        margin-left: 15px;
        background-color: #b2dfdb;
        color: #000000;
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
        font-size: 15px;
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
        font-size: 13px;
        padding-left: 5px;
        padding-right: 5px;
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

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-book .el-row .el-col .el-carousel__item .img_block {
        margin: 0 auto;
    }

    .home-main-middle-top .home-main-middle-top-main .home-main-middle-top-main-select_content-suggest .home-main-middle-top-main-select_content-suggest-book .el-row .el-col .rating_sort_card {
        margin: 5px auto;
        padding: 2px;
        font-size: 14px;
        border-left: 1px solid #b2dfdb;
        border-bottom: 1px solid #e9e9eb;
    }
</style>
