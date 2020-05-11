<!--项目前端，页面底部块-->
<template>
    <div class="div-footer">
        <footer class="footer">
            <div class="clearfix"></div>
            <div class="icon-row">
                <div class="footer-icon">
                    <h5 class="footer-icon-child"/>
                    <span class="footer-icon-text">品类齐全，轻松购物</span>
                </div>
                <div class="footer-icon">
                    <h5 class="footer-icon-child footer-icon-child-2"/>
                    <span class="footer-icon-text">多仓直发，极速配送</span>
                </div>
                <div class="footer-icon">
                    <h5 class="footer-icon-child footer-icon-child-3"/>
                    <span class="footer-icon-text">正品行货，精致服务</span>
                </div>
                <div class="footer-icon">
                    <h5 class="footer-icon-child footer-icon-child-4"/>
                    <span class="footer-icon-text">天天低价，畅选无忧</span>
                </div>
            </div>
            <div class="service-intro">
                <div class="servece-type">
                    <div :key="index" class="servece-type-info" v-for="(guide, index) in guideArr">
                        <ul>
                            <li :key="index" v-for="(item, index) in guide">{{item}}</li>
                        </ul>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="friend-link">
                    <div class="friend-link-item">
                        <ul>
                            <li :key="index" v-for="(link, index) in moreLink">
                                <span :class="[linkItemClass, {'link-last-item': index === 9}]">{{link}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="copyright">
                    <p>Copyright © 2020 by FZZ
                        <span>WS商城</span></p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'Footer.vue',
        data() {
            return {
                linkItemClass: 'link-item',
                guideArr: [
                    ['购物指南', '购物流程', '会员介绍', '联系客服'],
                    ['配送方式', '上门自提', '211限时达', '配送服务查询', '收取标准'],
                    ['支付方式', '货到付款', '在线支付', '分期付款', '邮局汇款', '公司转账'],
                    ['售后服务', '售后政策', '价格保护', '退款说明', '退货换货', '取消订单']
                ],
                moreLink: [
                    '关于我们', '联系我们', '联系客服', '合作招商', '商家帮助', '营销中心', '销售联盟', '校园社区', '风险监测', '隐私政策'
                ]
            };
        }
    };
</script>

<style scoped>
    .div-footer {
        width: 100%;
        background-color: #F7F7F7;
        border-top: 2px solid #f56c6c;
        bottom: 0;
    }

    .footer {
        width: 100%;
    }

    .icon-row {
        margin: 0 auto;
        padding-top: 8px;
        width: 1000px;
        height: 64px;
    }

    .footer-icon {
        margin-left: 17px;
        margin-right: 17px;
        float: left;
    }

    .footer-icon-child {
        margin-top: 10px;
        overflow: hidden;
        position: absolute;
        width: 36px;
        height: 42px;
        background-image: url("../../assets/img/footer/ico_service.png");
        text-indent: -999px;
    }

    .footer-icon-child-2 {
        background-position: 0 -43px;
    }

    .footer-icon-child-3 {
        background-position: 0 -86px;
    }

    .footer-icon-child-4 {
        background-position: 0 -129px;
    }

    .footer-icon-text {
        margin-left: 45px;
        color: #444444;
        font-size: 18px;
        font-weight: bold;
        line-height: 64px;
    }

    .service-intro {
        width: 100%;
        border-top: 1px solid #e9e9eb;
        background-color: #FFFFFF;
    }

    .servece-type {
        margin: 15px auto;
        height: 200px;
        width: 800px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .servece-type-info {
        color: #666666;
    }

    .servece-type-info ul {
        list-style: none;
    }

    .servece-type-info li {
        font-size: 14px;
        cursor: pointer;
        line-height: 26px;
    }

    .servece-type-info li:first-child {
        font-size: 16px;
        line-height: 28px;
        font-weight: bold;
    }

    .friend-link {
        display: flex;
        align-items: center;
        width: 908px;
        height: 30px;
        margin: 0 auto;
        color: #666;
        border-top: 1px solid #b2dfdb;
    }

    .friend-link-item {
        margin: 0 auto;
    }

    .friend-link-item ul {
        list-style: none;
    }

    .friend-link-item li {
        padding: 5px 0;
        float: left;
    }

    .link-item {
        padding: 0 8px;
        cursor: pointer;
        border-right: 1px solid #ccc;
    }

    .link-last-item {
        border: none;
    }

    .copyright {
        margin: 0 auto;
        width: 100%;
        color: #666666;
        line-height: 25px;
        text-align: center;
    }
</style>

