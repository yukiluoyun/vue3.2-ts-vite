import axios from 'axios'

const http = axios.create({
  baseURL:import.meta.env.VITE_URL,
  withCredentials:true
})

// 请求拦截器
http.interceptors.request.use(request => {
  if (request.headers) {
    request.headers.token = localStorage.getItem("token") || '0'
    request.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return request
  }
})
// 返回拦截器
http.interceptors.response.use(response=>{
  const res = response.data
  if(res.code === 200) {
      return res
  } else if(res.code === 10001) {
      alert('未登录或者登录过期,请登录')
  }else if(res.code === 10002) {
      alert('权限不足')
  } else {
      alert(res.message)
  }
})


export default http