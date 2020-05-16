export default {
    // 保存登录成功后返回的用户信息
    saveCurrUserInfo: (state, param) => {
        state.currUserInfo = param;
    },
    // 存管理员信息
    saveAdminInfo: (state, param) => {
        state.adminInfo = param;
    },
    // 保存店铺信息
    saveBusinessInfo: (state, param) => {
        state.businessInfo = param;
    },

    // 保存查询表单提交内容
    saveSearchInfoSearchWord: (state, param) => {
        state.searchInfo.searchWord = param;
    },

    // 保存首页面顶部排行推荐书籍信息
    saveHomeInfoTopInfoBookList: (state, param) => {
        state.resultInfo.homeInfo.topInfo.bookList = param;
    },
    // 保存首页面底部推荐书籍信息
    saveHomeInfoBottomInfoBookList: (state, param) => {
        state.resultInfo.homeInfo.bottomInfo.bookList = param;
    },

    // 保存转至查找结果显示页面的热门书籍信息
    saveBookListInfoHotBookInfo: (state, param) => {
        state.resultInfo.bookListInfo.hotBookInfo = param;
    },

    // 保存转至书籍详情页面的书籍信息
    saveBookDetailInfoBookInfo: (state, param) => {
        state.resultInfo.bookDetailInfo.bookInfo = param;
    },
    // 保存转至书籍详情页面的店铺信息
    saveBookDetailInfoBusinessInfo: (state, param) => {
        state.resultInfo.bookDetailInfo.businessInfo = param;
    },

    // 保存当前用户的购物车信息列表
    saveShopCarInfoList: (state, param) => {
        state.resultInfo.shopCarInfo.list = param;
        state.resultInfo.shopCarInfo.number = state.resultInfo.shopCarInfo.list.length
    },

    //   //购物车移除操作
    // removeBookByIndex(state, index) {
    //     state.resultInfo.shopCarInfo.list.splice(index, 1)
    // },
    // //购物车加数量
    // increment(state, index) {
    //     state.resultInfo.shopCarInfo.list[index].book_number++
    // },
    // //购物车减数量
    // decrement(state, index) {
    //     state.resultInfo.shopCarInfo.list[index].book_number--
    // },

    //设置订单状态
    setOrderConfirm(state,payload){
        state.resultInfo.orderInfo.orderConfirm = payload
    },
    //保存订单
    saveOrderInfoList(state,payload){
        state.resultInfo.orderInfo.list = payload;
        state.resultInfo.orderInfo.number = state.resultInfo.orderInfo.list.length
    },
}
