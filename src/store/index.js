import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      // 商城静态图片
      webImg: {
          wsLogo: "http://image.nicezza.online/web_img/ws_logo.png",
          homeTopJgtj: "http://image.nicezza.online/web_img/home_top_jgtj.jpg",
          homeTopPltj: "http://image.nicezza.online/web_img/home_top_pltj.jpg",
          homeTopPjtj: "http://image.nicezza.online/web_img/home_top_pjtj.jpg",
          homeBottomDjtj: "http://image.nicezza.online/web_img/home_bottom_djtj.jpg",
      },

      // 储存进入系统的用户信息
      currUserInfo: {},
      // 存管理员信息
      adminInfo: {},
      // 存储店铺信息
      businessInfo: {},

      // 查询存储
      searchInfo: {
          searchWord: '',
      },

      // 储存商城后台返回内容（首页、查询结果显示页、书籍详情信息）
      resultInfo: {
          // 首页
          homeInfo: {
              topInfo: {
                  bookList: [],
              },
              bottomInfo: {
                  bookList: [],
              },
          },

          // 查询结果显示页
          bookListInfo: {
              hotBookInfo: [],
          },

          // 书籍详情页
          bookDetailInfo: {
              bookInfo: {},
              businessInfo: {},
          },

          // 购物车页
          shopCarInfo: {
              list: [],
              number:''
          },

          //订单
          orderInfo:{
              list: [],
              number:'',
              orderConfirm: ''
          }
      },
  },
  mutations,
  actions,
  getters
})
