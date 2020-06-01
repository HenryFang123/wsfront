import axios from 'axios'
import qs from 'qs'

// 响应时间
axios.defaults.timeout = 30000;

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
        console.log(config.data)
    }
    return config;
}, (error) => {
    console.log('错误的传参');
    return Promise.reject(error);
});

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    // 对响应数据做些事
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    console.log('网络异常');
    let originalRequest = error.config;
    if(error.code === 'ECONNABORTED' && error.message.indexOf('timeout')!==-1 && !originalRequest._retry){
        originalRequest._retry = true}
    return Promise.reject(error);
});

export function fetchPost1(url, params){
    const instance = axios.create({
        baseURL : 'http://localhost:8080/',
        headers : {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    });
    return new Promise((resolve, reject) => {
        instance.post(url, qs.stringify(params))
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function fetchGet1(url, param){
    const instance = axios.create({
        baseURL : 'http://localhost:8080/',
        headers : {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    });
    return new Promise((resolve, reject) => {
        instance.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function fetchPost2(url, params){
    const instance = axios.create({
        baseURL : 'http://121.36.70.19:8080/netbook/',
        headers : {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    });
    return new Promise((resolve, reject) => {
        instance.post(url, qs.stringify(params))
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function fetchGet2(url, param){
    const instance = axios.create({
        baseURL : 'http://121.36.70.19:8080/netbook/',
        headers : {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    });
    return new Promise((resolve, reject) => {
        instance.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default{
    fetchPost1,
    fetchPost2,
    fetchGet1,
    fetchGet2,
}
