export default {
    // 保存登录成功后返回的 userId
    saveUserInfoUserId: (state, param) => {
        state.userInfo.userId = param;
    },
    // 保存登录成功后的 userSelf
    saveUserInfoUserSelf: (state, param) => {
        state.userInfo.userSelf = param;
    },
    // 保存用户验证手机号的验证码
    saveUserInfoPhoneCode: (state, param) => {
        state.userInfo.phoneCode = param;
    },

    saveAdminInfoAdminId: (state, param) => {
        state.adminInfo.adminId = param;
    },

    saveAdminInfoAdminPassword: (state, param) => {
        state.adminInfo.adminPassword = param;
    },

    saveAdminInfoAdminName: (state, param) => {
        state.adminInfo.adminName = param;
    },

    saveAdminInfoBusinessId: (state, param) => {
        state.adminInfo.businessId = param;
    },

    // 保存进入店铺获取的店铺信息
    saveBusinessInfoBusinessDetail: (state, param) => {
        state.businessInfo.businessDetail = param;
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
    // 保存转至查找结果显示页面的查找信息总条数
    saveBookListInfoItemTotal: (state, param) => {
        state.resultInfo.bookListInfo.itemTotal = param;
    },
    // 保存转至查找结果显示页面的查找信息
    saveBookListInfoBookList: (state, param) => {
        state.resultInfo.bookListInfo.bookList = param;
    },

    // 保存转至书籍详情页面的书籍ID
    saveBookDetailInfoBookId: (state, param) => {
        state.resultInfo.bookDetailInfo.bookId = param;
    },
    // 保存转至书籍详情页面的店铺ID
    saveBookDetailInfoBusinessId: (state, param) => {
        state.resultInfo.bookDetailInfo.businessId = param;
    },
    // 保存转至书籍详情页面的书籍信息
    saveBookDetailInfoBookInfo: (state, param) => {
        state.resultInfo.bookDetailInfo.bookInfo = param;
    },
    // 保存转至书籍详情页面的店铺信息
    saveBookDetailInfoBusinessInfo: (state, param) => {
        state.resultInfo.bookDetailInfo.businessInfo = param;
    },
    // 保存转至书籍详情页面的相同作者推荐书籍信息
    saveBookDetailInfoAuthorBookList: (state, param) => {
        state.resultInfo.bookDetailInfo.authorBookList = param;
    },
    // 保存转至书籍详情页面的相同类型推荐书籍信息
    saveBookDetailInfoTypeBookList: (state, param) => {
        state.resultInfo.bookDetailInfo.typeBookList = param;
    },
    // 保存转至书籍详情页面的相同出版社推荐书籍信息
    saveBookDetailInfoPressBookList: (state, param) => {
        state.resultInfo.bookDetailInfo.pressBookList = param;
    },

    // 保存当前用户的购物车信息列表
    saveShopCarInfoList: (state, param) => {
        state.resultInfo.shopCarInfo.list = param;
    },

    //购物车移除操作
    removeBookByIndex(state, index) {
        state.resultInfo.shopCarInfo.list.splice(index, 1)
    },

    //购物车加数量
    increment(state, index) {
        state.resultInfo.shopCarInfo.list[index].book_number++
    },
    //购物车减数量
    decrement(state, index) {
        state.resultInfo.shopCarInfo.list[index].book_number--
    },


    //订单数，用于header显示
    setOrderNum(state,payload){
        state.resultInfo.orderNum = payload
    },

    setOrderConfirm(state,payload){
        state.resultInfo.orderConfirm = payload
    },
}
