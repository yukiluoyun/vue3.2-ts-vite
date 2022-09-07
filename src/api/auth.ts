// import http from "@/api/axios"
import http from "./axios"

// 获取用户登录图片验证码
export function getCode() {
  return http({
    url: '/auth/code',
    method:'get'
  })
}

  // 账号密码登录
  export function login(requestUser:object) {
    return http({
      url: '/auth/login',
      method: 'post',
      data: requestUser
    })
  }
  
// 通过token登录
export function loginByToken(token: string) {
  return http({
    url: "/auth/loginByToken?token=" + token,
    method:'post'
  })
}