import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isLoading: false,

      // 商城静态图片
      webImg: {
          wsLogo: "http://image.nicezza.online/web_img/ws_logo.png",
          homeTopJgtj: "http://image.nicezza.online/web_img/home_top_jgtj.jpg",
          homeTopPltj: "http://image.nicezza.online/web_img/home_top_pltj.jpg",
          homeTopPjtj: "http://image.nicezza.online/web_img/home_top_pjtj.jpg",
          homeBottomDjtj: "http://image.nicezza.online/web_img/home_bottom_djtj.jpg",
      },

      // 储存进入系统的用户信息
      userInfo: {
          // 用户登录ID
          userId: '',
          // 用户登录使用名
          userSelf: '',
          // 用户验证手机号的验证码
          phoneCode: ''
      },

      adminInfo: {
          adminId: '',
          adminPassword: '',
          adminName: '',
          businessId: ''
      },

      // 查询存储
      searchInfo: {
          // 查询表单提交内容
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
              itemTotal: 0,
              bookList: [],
          },

          // 书籍详情页
          bookDetailInfo: {
              bookId: '',
              businessId: '',
              bookInfo: {},
              businessInfo: {},
              businessBookList: [],
              authorBookList: [],
              typeBookList: [],
              pressBookList: [],
          },

          // 购物车页
          shopCarInfo: {
              list: []
          },

          //订单数量，header显示
          orderNum:'',
          orderConfirm:''
      },
  },
  mutations,
  actions,
  getters
})
