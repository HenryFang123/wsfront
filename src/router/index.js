import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const home = () => import('components/Home.vue');
const login = () => import('components/Login.vue');
const register = () => import('components/Register.vue');
const person_page = () => import('components/page/PersonPage');
const to_list = () => import('components/jump/ToList');
const book_list = () => import('components/page/BookList');
const to_detail = () => import('components/jump/ToDetail');
const book_detail = () => import('components/page/BookDetail');
const shop_car = () => import('components/page/ShopCar');
const settlement_page = () => import('components/page/SettlementPage');
const pay_done = () => import('components/page/PayDone');

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/person_page',
        component: person_page
    },
    {
        path: '/to_list',
        component: to_list
    },
    {
        path: '/book_list',
        component: book_list
    },
    {
        path: '/to_detail',
        component: to_detail
    },
    {
        path: '/book_detail',
        component: book_detail
    },
    {
        path: '/shop_car',
        component: shop_car
    },
    {
        path: '/settlement_page',
        component: settlement_page
    },
    {
        path: '/pay_done',
        component: pay_done
    },
    {
        path: '/BackHome',
        redirect: '/BackDashBoard',
    },
    {
        path: '/BackLogin',
        component: () => import('components/backpage/BackLogin'),
        meta: {title: '登录'}
    },
    {
        path: '/BackHome',
        component: () => import('components/BackHome'),
        meta: {title: '自述文件'},
        children: [
            {
                path: '/BackDashBoard',
                component: () => import('components/backpage/BackDashboard'),
                meta: {title: '系统首页'}
            },
            {
                path: '/BackOrderTable',
                component: () => import( 'components/backpage/BackOrderTable'),
                meta: {title: '订单列表'}
            },
            {
                path: '/BackBookManageTable',
                component: () => import( 'components/backpage/BackBookManageTable'),
                meta: {title: '图书操作'}
            },
            {
                path: '/BackReturnTable',
                component: () => import('components/backpage/BackReturnTable'),
                meta: {title: '退货管理'}
            },
            {
                path: '/BackBookList',
                component: () => import( 'components/backpage/BackBookList'),
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

export default router
