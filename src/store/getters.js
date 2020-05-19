export default {
    webImg_wsLogo: state => state.webImg.wsLogo,
    webImg_homeTopJgtj: state => state.webImg.homeTopJgtj,
    webImg_homeTopPltj: state => state.webImg.homeTopPltj,
    webImg_homeTopPjtj: state => state.webImg.homeTopPjtj,
    webImg_homeBottomDjtj: state => state.webImg.homeBottomDjtj,

    currUserInfo: state => state.currUserInfo,
    adminInfo: state => state.adminInfo,
    businessInfo: state => state.businessInfo,

    searchInfo_searchWord: state => state.searchInfo.searchWord,

    resultInfo_homeInfo_topInfo_bookList: state => state.resultInfo.homeInfo.topInfo.bookList,
    resultInfo_homeInfo_bottomInfo_bookList: state => state.resultInfo.homeInfo.bottomInfo.bookList,

    resultInfo_bookListInfo_hotBookInfo: state => state.resultInfo.bookListInfo.hotBookInfo,

    resultInfo_bookDetailInfo_bookInfo: state => state.resultInfo.bookDetailInfo.bookInfo,
    resultInfo_bookDetailInfo_businessInfo: state => state.resultInfo.bookDetailInfo.businessInfo,

}

