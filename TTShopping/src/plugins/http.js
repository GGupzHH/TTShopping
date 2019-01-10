import axios from 'axios'
import { Message } from 'element-ui'

const Http = {}
Http.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      config.headers.Authorization = AUTH_TOKEN
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  // 响应拦截   同意处理拦截响应 做出提示
  axios.interceptors.response.use(function (response) {
    if (response.data.meta.status === 200 || response.data.meta.status === 201) {
      Message.success(response.data.meta.msg)
    }
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })

  Vue.prototype.$http = axios
}

export default Http
