export default {
    // 触发保存 保存登录成功后返回的用户信息
    saveCurrUserInfo: ({commit}, payload) => {
        commit('saveCurrUserInfo', payload);
    },
    // 触发保存 店铺信息
    saveBusinessInfo: ({commit}, payload) => {
        commit('saveBusinessInfo', payload);
    },

    // 触发保存 用户全部收货收货地址信息
    saveCurrShippingAddress: ({commit}, payload) => {
        commit('saveCurrShippingAddress', payload);
    },

    // 触发保存 查询表单提交内容
    saveSearchInfoSearchWord: ({commit}, payload) => {
        commit('saveSearchInfoSearchWord', payload);
    },

    // 触发保存 首页面顶部排行推荐书籍信息
    saveHomeInfoTopInfoBookList: ({commit}, payload) => {
        commit('saveHomeInfoTopInfoBookList', payload);
    },

    // 触发保存 首页面底部推荐书籍信息 M
    saveHomeInfoBottomInfoBookListM: ({commit}, payload) => {
        commit('saveHomeInfoBottomInfoBookListM', payload);
    },

    // 触发保存 首页面底部推荐书籍信息 S
    saveHomeInfoBottomInfoBookListS: ({commit}, payload) => {
        commit('saveHomeInfoBottomInfoBookListS', payload);
    },

    // 触发保存 转至查找结果显示页面的热门书籍信息
    saveBookListInfoHotBookInfo: ({commit}, payload) => {
        commit('saveBookListInfoHotBookInfo', payload);
    },

    // 触发保存 转至书籍详情页面的书籍信息
    saveBookDetailInfoBookInfo: ({commit}, payload) => {
        commit('saveBookDetailInfoBookInfo', payload);
    },

    // 触发保存 转至书籍详情页面的店铺信息
    saveBookDetailInfoBusinessInfo: ({commit}, payload) => {
        commit('saveBookDetailInfoBusinessInfo', payload);
    },

}
