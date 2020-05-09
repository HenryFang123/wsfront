export default {
    // 触发保存 保存登录成功后返回的 userId
    saveUserInfoUserId: ({commit}, payload) => {
        commit('saveUserInfoUserId', payload);
    },
// 触发保存 保存登录成功的 userSelf
    saveUserInfoUserSelf: ({commit}, payload) => {
        commit('saveUserInfoUserSelf', payload);
    },
// 触发保存 用户验证手机号的验证码
    saveUserInfoPhoneCode: ({commit}, payload) => {
        commit('saveUserInfoPhoneCode', payload);
    },

    saveAdminInfoAdminId: ({commit}, payload) => {
        commit('saveAdminInfoAdminId', payload);
    },

    saveAdminInfoAdminPassword: ({commit}, payload) => {
        commit('saveAdminInfoAdminPassword', payload);
    },

    saveAdminInfoAdminName: ({commit}, payload) => {
        commit('saveAdminInfoAdminName', payload);
    },

    saveAdminInfoBusinessId: ({commit}, payload) => {
        commit('saveAdminInfoBusinessId', payload);
    },

// 触发保存 查询表单提交内容
    saveSearchInfoSearchWord: ({commit}, payload) => {
        commit('saveSearchInfoSearchWord', payload);
    },

    // 触发保存 首页面顶部排行推荐书籍信息
    saveHomeInfoTopInfoBookList: ({commit}, payload) => {
        commit('saveHomeInfoTopInfoBookList', payload);
    },
// 触发保存 首页面底部推荐书籍信息
    saveHomeInfoBottomInfoBookList: ({commit}, payload) => {
        commit('saveHomeInfoBottomInfoBookList', payload);
    },

// 触发保存 转至查找结果显示页面的热门书籍信息
    saveBookListInfoHotBookInfo: ({commit}, payload) => {
        commit('saveBookListInfoHotBookInfo', payload);
    },
    // 触发保存 转至查找结果显示页面的查找信息总条数
    saveBookListInfoItemTotal: ({commit}, payload) => {
        commit('saveBookListInfoItemTotal', payload);
    },
// 触发保存 转至查找结果显示页面的查找信息
    saveBookListInfoBookList: ({commit}, payload) => {
        commit('saveBookListInfoBookList', payload);
    },

// 触发保存 转至书籍详情页面的书籍ID
    saveBookDetailInfoBookId: ({commit}, payload) => {
        commit('saveBookDetailInfoBookId', payload);
    },
// 触发保存 转至书籍详情页面的店铺ID
    saveBookDetailInfoBusinessId: ({commit}, payload) => {
        commit('saveBookDetailInfoBusinessId', payload);
    },
// 触发保存 转至书籍详情页面的书籍信息
    saveBookDetailInfoBookInfo: ({commit}, payload) => {
        commit('saveBookDetailInfoBookInfo', payload);
    },
// 触发保存 转至书籍详情页面的店铺信息
    saveBookDetailInfoBusinessInfo: ({commit}, payload) => {
        commit('saveBookDetailInfoBusinessInfo', payload);
    },
// 触发保存 转至书籍详情页面的相同作者推荐书籍信息
    saveBookDetailInfoAuthorBookList: ({commit}, payload) => {
        commit('saveBookDetailInfoAuthorBookList', payload);
    },
// 触发保存 转至书籍详情页面的相同类型推荐书籍信息
    saveBookDetailInfoTypeBookList: ({commit}, payload) => {
        commit('saveBookDetailInfoTypeBookList', payload);
    },
// 触发保存 转至书籍详情页面的相同出版社推荐书籍信息
    saveBookDetailInfoPressBookList: ({commit}, payload) => {
        commit('saveBookDetailInfoPressBookList', payload);
    },

// 触发保存 当前用户的购物车信息列表
    saveShopCarInfoList: ({commit}, payload) => {
        commit('saveShopCarInfoList', payload);
    },

}
