<template>
  <div class="login-container">
    <video poster="@/assets/login/1.jpg" loop autoplay muted>
      <source src="@/assets/login/Particles.mp4" />
    </video>
    <div class="login-form">
      <!-- 标题 -->
      <header>
        <img src="@/assets/logo.png" />
        <h3>vue3-admin</h3>
      </header>
      <el-form :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input
            placeholder="username"
            v-model="loginForm.username"
            type="text"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="password"
            v-model="loginForm.password"
            type="password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
            placeholder="验证码"
            v-model="loginForm.verifyCode"
            type="text"
            style="width: 40%; display: inline-block"
          ></el-input>
          <div style="margin-left: 15px; display: inline-block; height: 40px">
            <img
              :src="codeUrl"
              @click="getValidaCode"
              style="
                margin-bottom: -12px;
                width: 100%;
                height: 100%;
                object-fit: cover;
              "
            />
          </div>
        </el-form-item>
        <el-form-item style="border: none; background: none">
          <el-button type="primary" style="width: 100%" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getCode, login, loginByToken } from '@/api/auth';
import { useRouter } from 'vue-router';
import { User, Lock } from '@element-plus/icons-vue';
import { useStore } from '@/store';

const store = useStore();
const router = useRouter();
const loginForm = reactive({
  ip: '',
  username: 'admin',
  password: '123456',
  uuid: '',
  verifyCode: ''
});
const loginRules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA_Z0-9]{2,10}/,
      message: '请输入2-10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 15,
      message: '请输入3-15位的字母或数字',
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    },
    {
      whitespace: true,
      message: '不能使用空格'
    }
  ],
  uuid: ''
});
// 加载或更新图片验证码
const codeUrl = ref<string>();
const loadValidateImg = () => {
  getCode().then((res) => {
    codeUrl.value = res.data.image;
  });
};
onMounted(() => {
  getValidaCode();
  handleLoginByToken();
});
const getValidaCode = () => {
  loadValidateImg();
  getCode().then((res) => {
    codeUrl.value = res.data.image;
    loginForm.uuid = res.data.uuid;
  });
};
// 登录提交
const handleLogin = () => {
  store.dispatch('authStore/login', loginForm);
};
// 当有token 的情况下，自动登录，不经过登陆页
const handleLoginByToken = () => {
  let token = localStorage.getItem('token');
  if (token) {
    store.dispatch('authStore/loginByToken', token);
  }
};
</script>

<style lang="scss" scoped>
// 隐藏滚动条
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
input::input-placeholder {
  color: red !important;
}
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    position: absolute;
    /* Vertical and Horizontal center*/
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: -1;
  }
  .login-form {
    width: 380px;
    height: 380px;
    padding: 4vh;
    margin-top: 20px;
    background: url('@/assets/login/login_form.png');
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(224, 24, 9, 0.06);
    opacity: '0.2';
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      img {
        display: inline-block;
        width: 40px;
      }

      h3 {
        margin-bottom: 0;
        font-size: 18px;
        color: #fff;
        text-align: center;
      }
    }
    .el-input {
      input {
        height: 44px;
        background: transparent;
        padding: 12px 5px 12px 50px;
        color: $lightGray;
        caret-color: $loginCursorColor;
        -webkit-appearance: none;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $loginBg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      display: flex;
      flex-wrap: nowrap;
      border-radius: 5px;
      color: #454545;
    }
  }
  :deep .el-input__wrapper {
    background-color: transparent !important;
  }
}
</style>
