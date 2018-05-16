import vue from 'vue';
import router from './router';
import axios from 'axios';
import qs from 'qs';

vue.prototype.axios = axios;

//axios 全局配置
axios.defaults.timeout = 10000;//超时时间
axios.defaults.baseURL = '';//接口公共前缀
let mumutoktn = '1413c52f-0075-44ad-95a9-c311ed6e7cd4';
// axios.defaults.headers.common['token'] = 'c11aaa4f-10ad-4b12-8ff3-7234398feefb';//请求头

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if(!config.headers){
    config.headers = {};
  }
  //config:请求参数配置 ，一般关注method/data/hearders
  // 在发送请求之前做些什么
  //1.判断localStorage有无token即是否登录 2.对请求参数做转换
  let token = 'c11aaa4f-10ad-4b12-8ff3-7234398feefb';
  if(token!=''){
    //如果请求不需要参数，以防config.data序列化时报错
    if(!config.data){
      config.data={};
    }
    if (config.method === 'post') {
      let ct = config.headers['Content-Type'];
      if(ct && ct.indexOf('application/x-www-form-urlencoded')>=0){
        config.data = qs.stringify(config.data);//表单数据序列化
      }
      else
        config.data = JSON.stringify(config.data);//json数据序列化
    }
    config.headers['token']=token;
  }else{
    if(router.path!="/"){
      router.push('/')
    }
  }
  return config;
}, function (error) {
  alert(error)
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.url=config.url+'?accessToken='+mumutoktn;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export function fetch(url,params,method,headers) {
  method = method || 'post';
  return new Promise((resolve, reject) => {
    var config = {
      method: method,
      url: url,
      headers:headers
    };
    if (method=='get'){
      config.params = params;
    }else{
      config.data = params;
    }
    axios(config).then(response => {
      resolve(response.data);
    }, err => {
      alert('接口出错了，请联系管理员！');
      reject(err);//后台报错
    }).catch((error) => {
      console.log(error)
      reject(error);//前端出错
    });
  });
}

export default {
  /*章节树*/
  getLessonList(params){
    return fetch('/resource/myResource/findBookDir',params,'post',{
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    })
  },
  /*获取用户章节*/
  getUserSelectedLesson(){
    return fetch('/resource/myResource/loadUserSelected','post')
  },
  /*获取用户章节*/
  getsubjectWithClass(){
    return fetch('/resource/myResource/getUserSubjectWithClass','post')
  },
  /*记录用户选中章节*/
  rememberUserSelected(params){
    return fetch('/resource/myResource/rememberUserSelected',params,'post')
  },
  /*获取我的资源*/
  getMyResource(params){
    return fetch('/resource/myResource/findMyResource',params,'post',{
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    })
  }
}


