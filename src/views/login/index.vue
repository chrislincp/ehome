<template lang="html">
  <div class="login_container">
    <el-form
      :model="loginForm"
      :rules="loginRule"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="login_wrap"
      >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          @keyup.enter.native="loginSubmit"
          placeholder="手机号"
          >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          @keyup.enter.native="loginSubmit"
          auto-complete="off"
          placeholder="密码"
          @change="notToken"
          >
        </el-input>
      </el-form-item>
      <div class="about_pass">
        <el-checkbox
          v-model="checked"
          class="remember"
          >
          记住密码
        </el-checkbox>
        <el-button class="forget" type="text">忘记密码</el-button>
      </div>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="loginSubmit"
          :loading="logining"
          >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRule: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: false,
      isToken: false
    };
  },
  computed: {
    ...mapGetters([
      'status'
    ])
  },
  methods: {
    notToken () {
      this.isToken = false
    },
    loginSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('login success')
          // this.logining = true;
          // let [username, password] = [
          //   this.loginForm.username,
          //   this.isToken ? this.loginForm.password : md5(this.loginForm.password)
          // ]
          // let loginParams = { username, password };
          // this.UserLogin(loginParams).then(() => {
          //   this.logining = false
          //   const data = this.status
          //   console.log(data)
          //   if (data.code != 200) {
          //     this.$message({
          //       message: data.msg,
          //       type: 'error'
          //     });
          //   }else {
          //     this.$message({
          //       message: data.msg,
          //       type: 'success'
          //     })
          //     this.checked ?
          //     localStorage.setItem('remember', data.remember)
          //     :localStorage.removeItem('remember')
          //     this.$router.push({ path: '/home' });
          //   }
          // })
          this.$router.push({ path: '/home' });
        } else return false;
      });
    },
    ...mapActions([
      'UserLogin'
    ])
  },
  mounted () {
    const token = localStorage.getItem('remember')
    if (token) {
      const [username, password] = [window.atob(token.split('#')[0]), token.split('#')[1]]
      this.loginForm = { username, password }
      this.isToken = this.checked = true
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  .login_wrap {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .about_pass {
      height: 21px;
      margin-bottom: 25px;
      overflow: hidden;
      .forget {
        padding: 0;
        line-height: 21px;
        float: right;
      }
    }

  }
}

</style>
