export default {
    webImg_wsLogo: state => state.webImg.wsLogo,
    webImg_homeTopJgtj: state => state.webImg.homeTopJgtj,
    webImg_homeTopPltj: state => state.webImg.homeTopPltj,
    webImg_homeTopPjtj: state => state.webImg.homeTopPjtj,
    webImg_homeBottomDjtj: state => state.webImg.homeBottomDjtj,

    userInfo_userId: state => state.userInfo.userId,
    userInfo_userSelf: state => state.userInfo.userSelf,
    userInfo_phoneCode: state => state.userInfo.phoneCode,

    AdminInfo_adminId: state => state.adminInfo.adminId,
    AdminInfo_adminPassword: state => state.adminInfo.adminPassword,
    AdminInfo_adminName: state => state.adminInfo.adminName,
    AdminInfo_businessId: state => state.adminInfo.businessId,

    searchInfo_searchWord: state => state.searchInfo.searchWord,

    resultInfo_homeInfo_topInfo_bookList: state => state.resultInfo.homeInfo.topInfo.bookList,
    resultInfo_homeInfo_bottomInfo_bookList: state => state.resultInfo.homeInfo.bottomInfo.bookList,

    resultInfo_bookListInfo_hotBookInfo: state => state.resultInfo.bookListInfo.hotBookInfo,
    resultInfo_bookListInfo_itemTotal: state => state.resultInfo.bookListInfo.itemTotal,
    resultInfo_bookListInfo_bookList: state => state.resultInfo.bookListInfo.bookList,

    resultInfo_bookDetailInfo_bookId: state => state.resultInfo.bookDetailInfo.bookId,
    resultInfo_bookDetailInfo_businessId: state => state.resultInfo.bookDetailInfo.businessId,
    resultInfo_bookDetailInfo_bookInfo: state => state.resultInfo.bookDetailInfo.bookInfo,
    resultInfo_bookDetailInfo_businessInfo: state => state.resultInfo.bookDetailInfo.businessInfo,
    resultInfo_bookDetailInfo_businessBookList: state => state.resultInfo.bookDetailInfo.businessBookList,
    resultInfo_bookDetailInfo_authorBookList: state => state.resultInfo.bookDetailInfo.authorBookList,
    resultInfo_bookDetailInfo_typeBookList: state => state.resultInfo.bookDetailInfo.typeBookList,
    resultInfo_bookDetailInfo_pressBookList: state => state.resultInfo.bookDetailInfo.pressBookList,

    shopCar_getBookPrice(state) {
        return index => {
            return  state.resultInfo.shopCarInfo.list[index].book_price * state.resultInfo.shopCarInfo.list[index].book_number
        }
    }
}

