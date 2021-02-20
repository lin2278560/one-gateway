import axios from 'axios'
import iView from 'iview'
import qs from 'qs'

axios.defaults.timeout = 300000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = '/'; //配置接口地址
// axios.defaults.baseURL = 'https://192.168.16.22:10000';
// axios.defaults.baseURL = 'https://192.168.104.33:10000';
axios.defaults.withCredentials = true;
// axios.defaults.timeout = 300000;

//localhost:8013
//192.168.10.114:8080

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if (config.method === 'post') {
        //config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    // //对响应数据做些事


    //license不可用拦截
    // console.log(res,"response")
    if (res.data.code == 603) {
        // sessionStorage.removeItem("users");
        // sessionStorage.removeItem("userName");
        // sessionStorage.removeItem("loginType");
        // alert("登录失效,请重新登录后,在访问。");
        iView.Notice.error({ title: "license不可用", desc: "请登录重新上传license文件后,再访问。", duration: 5 });
        setTimeout(function() { window.location.href = "/sys/license"; }, 1500)
    }
    //ip地址黑名单
    if (res.data.status == 455) {
        iView.Notice.error({ title: "此IP地址被禁用", desc: "请使用其他ip访问。", duration: 5 });
        setTimeout(function() { window.location.href = "/login"; }, 1000)
    }
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    //ip地址白名单
    if (error.response.data.status == 455) {
        iView.Notice.error({ title: "此IP地址被禁用", desc: "请使用其他ip访问。", duration: 5 });
        setTimeout(function() { window.location.href = "/login"; }, 1000)
    }
    // console.log(error.response,"error")
    console.log('网络异常')
    return Promise.reject(error.response.data.desc);
});


//返回一个Promise(发送post请求)
export function fetchPost(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
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

//返回一个Promise(发送get请求)
export function fetchGet(url, param, config) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param }, config)
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


export function getAxios() {
    return axios;
}

export function getAxiosBaseurl() {
    return axios.defaults.baseURL;
}

export default {
    fetchPost,
    fetchGet,
    getAxios,
    getAxiosBaseurl
}