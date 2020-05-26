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
              bookRemark: {
                  goodAnalyse: 90,
                  remarksTags: [ '实惠优选', '质量没话说', '比定做还合适', '完美品质', '正品行货', '包装有档次', '书籍很好看' ],
                  remarksNumDetail: [ 3000, 900, 1 ],
                  detail: [
                      {
                          username: '3581Nicezza',
                          values: 3,
                          content: '包装很好，质量也不错！',
                          create_at: '2018-05-15 09:20'
                      },
                  ]
              },
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
