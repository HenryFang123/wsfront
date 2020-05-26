import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const home = () => import('components/Home.vue');
const login = () => import('components/Login.vue');
const register = () => import('components/Register.vue');
const person_page = () => import('components/page/PersonPage');
const shop_car = () => import('components/page/ShopCar');
const settlement_page = () => import('components/page/SettlementPage');
const to_list = () => import('components/jump/ToList');
const book_list = () => import('components/page/BookList');
const book_detail = () => import('components/page/BookDetail');
const business_page = () => import('components/page/BusinessPage');
const pay_done = () => import('components/page/PayDone');
const back_home = () => import('components/BackHome');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: home,
        meta: {title: '首页--WS商城'}
    },

    {
        path: '/login',
        component: login,
        meta: {title: '商城登录'}
    },

    {
        path: '/register',
        component: register,
        meta: {title: '商城注册'}
    },

    {
        path: '/person_page',
        component: person_page,
        redirect: '/PersonInfo',
        meta: {title: '个人信息'},
        children: [
            {
                path: '/PersonInfo',
                component: () => import('components/personpage/PersonInfo'),
                meta: {title: '个人信息'}
            },
            {
                path: '/PersonAddress',
                component: () => import( 'components/personpage/PersonAddress'),
                meta: {title: '我的收货地址'}
            },
            {
                path: '/AddAddress',
                component: () => import( 'components/personpage/AddAddress'),
                meta: {title: '添加收货地址'}
            },
            {
                path: '/PersonOrder1',
                component: () => import('components/personpage/PersonOrder/PersonOrder1'),
                meta: {title: '进行中'}
            },
            {
                path: '/PersonOrder2',
                component: () => import('components/personpage/PersonOrder/PersonOrder2'),
                meta: {title: '待发货'}
            },
            {
                path: '/PersonOrder3',
                component: () => import('components/personpage/PersonOrder/PersonOrder3'),
                meta: {title: '待确认'}
            },
            {
                path: '/PersonOrder4',
                component: () => import('components/personpage/PersonOrder/PersonOrder4'),
                meta: {title: '历史订单'}
            },
            {
                path: '/PersonStarBook',
                component: () => import('components/personpage/PersonStarBook'),
                meta: {title: '收藏图书'}
            },
            {
                path: '/PersonStarBusiness',
                component: () => import('components/personpage/PersonStarBusiness'),
                meta: {title: '收藏店铺'}
            },
        ]
    },

    {
        path: '/shop_car',
        component: shop_car,
        meta: {title: '购物车'}
    },

    {
        path: '/settlement_page',
        component: settlement_page,
        meta: {title: '订单'}
    },

    {
        path: '/to_list',
        component: to_list
    },

    {
        path: '/book_list',
        component: book_list,
        meta: {title: '查询...'}
    },

    {
        path: '/book_detail',
        component: book_detail,
        meta: {title: '书籍详情'}
    },

    {
        path: '/business_page',
        component: business_page,
        meta: {title: '店铺详情'}
    },

    {
        path: '/pay_done',
        component: pay_done,
        meta: {title: '订单支付'}
    },

    {
        path: '/BackHome',
        component: back_home,
        redirect: '/BackDashBoard',
        meta: {title: '后台管理'},
        children: [
            {
                path: '/BackDashBoard',
                component: () => import('components/backpage/BackDashboard'),
                meta: {title: '系统首页'}
            },
            {
                path: '/BackOrderTable',
                component: () => import('components/backpage/BackOrderTable'),
                meta: {title: '订单列表'}
            },
            {
                path: '/BackBookManageTable',
                component: () => import('components/backpage/BackBookManageTable'),
                meta: {title: '图书操作'}
            },
            {
                path: '/BackReturnTable',
                component: () => import('components/backpage/BackReturnTable'),
                meta: {title: '退货管理'}
            },
            {
                path: '/BackOrderDetail',
                component: () => import('components/backpage/BackOrderDetail'),
                meta: {title: '订单详情'}
            },
            {
                path: '/BackBookList',
                component: () => import('components/backpage/BackBookList'),
                meta: {title: '图书列表'}
            },
            {
                path: '/BackClassification',
                component: () => import( 'components/backpage/BackClassification'),
                meta: {title: '图书分类'}
            }
        ]
    },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
