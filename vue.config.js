const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    chainWebpack: config => {
        // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('network',resolve('src/network'))
            .set('views', resolve('src/views'))
    },
    outputDir: 'dist', // 打包的目录
    lintOnSave: true, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        host: '0.0.0.0',
        port: 81, // 服务端口
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {
        }
    },
};
