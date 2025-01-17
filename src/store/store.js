import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      // 商城静态图片
      webImg: {
          wsLogo: "http://image.nicezza.online/web_img/ws_logo.png",
          homeBottomDjtj: "http://image.nicezza.online/web_img/home_bottom_djtj.jpg",
          homeBottomXttj: "http://image.nicezza.online/web_img/home_bottom_xttj.jpg",
      },

      // 书籍分类信息
      systemType: {

      },

      // 储存进入系统的用户信息
      currUserInfo: {},
      // 存储店铺信息
      businessInfo: {},
      // 储存进入系统的用户全部收货地址信息
      currShippingAddress: {},

      // 查询存储
      searchInfo: {
          searchWord: '',
      },

      // 储存商城后台返回内容（首页、查询结果显示页、书籍详情信息）
      resultInfo: {
          // 首页
          homeInfo: {
              topInfo: {
                  imgList: [
                      {
                          imgBlock: "http://image.nicezza.online/static_img/lb_dzs.jpg"
                      },
                      {
                          imgBlock: "http://image.nicezza.online/static_img/lb_sfj.jpg"
                      },
                  ],
                  bookList: [],
              },
              bottomInfo: {
                  bookListM: [],
                  bookListS: [],
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
              number:''
          }
      },
  },
  mutations,
  actions,
})
