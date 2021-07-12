<template>
<div class="SignUp-page">
  <LoginLogo/>
  <div class="signUp">
    <div class="signUp-head">
      <span>用户注册</span>
    </div>
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="80px" class="demo-ruleForm">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio-group v-model="registerForm.sex">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phoneNum" label="手机号码">
        <el-input v-model="registerForm.phoneNum" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱号">
        <el-input  v-model="registerForm.email" placeholder="邮箱号"></el-input>
      </el-form-item>
      <el-form-item prop="birth" label="生日">
        <el-date-picker v-model="registerForm.birth" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item prop="introduction" label="个性签名">
        <el-input  type="textarea" v-model="registerForm.introduction" placeholder="个性签名"></el-input>
      </el-form-item>
      <el-form-item prop="location" label="地区">
        <el-select v-model="registerForm.location" placeholder="请选择地区">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SignUp('registerForm')">立即注册</el-button>
        <el-button @click="goback(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import LoginLogo from "../components/LoginLogo";
import mixin from "../mixins";
import {cities} from "../assets/data/form";
import { SignUp} from "../api/index";

export default {
  name: "SignUp-page",
  mixins: [mixin],
  components: {
  LoginLogo
},
  data(){
    var validateCheckPass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      registerForm:{//注册格式
        username:'',
        password:'',
        checkPass:'',
        sex:'',
        phoneNum:'',
        email:'',
        birth:'',
        introduction:'',
        location:''
      },
      rules:{
        username: [
          { required: true,message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        checkPass:[
          { required: true,message: '请再次输入密码', trigger: 'blur' },
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phoneNum: [
          { message: '请输入手机号码', trigger: 'blur' }
        ],
        email: [
          { message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        birth: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        introduction: [
          { message: '请输入介绍', trigger: 'blur' }
        ],
        location: [
          { message: '请输入地区', trigger: 'change' }
        ]
      },
      cities:[]
    }
  },
  created() {
    this.cities=cities
  },
  methods:{
    SignUp(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this=this;
          let d= this.registerForm.birth
          let datetime =d.getFullYear() + '-' + (d.getMonth() + 1 ) + '-' + d.getDate()
          let params = new URLSearchParams()
          params.append('username',this.registerForm.username)
          params.append('password',this.registerForm.password)
          params.append('sex',this.registerForm.sex)
          params.append('birth',datetime)
          params.append('introduction',this.registerForm.introduction)
          params.append('location',this.registerForm.location)
          params.append('email',this.registerForm.email)
          params.append('phone_num',this.registerForm.phoneNum)
          params.append('avatar','/avatarImages/user.jpg')
          SignUp(params).then(res=>{
            console.log(res)
            if(res.code===1){
              _this.notify('注册成功','success')
              _this.$message({
                message:'登陆成功',
                type:'success'
              })
              _this.setUserMsg(res.userMsg[0])
              _this.$store.commit('setLoginIn',true)

              setTimeout(function (){
                _this.$router.push({path:'/'})
              },2000)
            }else if(res.code===2){
              _this.notify('用户名已存在，换个试试吧','warning')
            }else{
              _this.notify('注册失败','error')
            }
          })
          .catch(err=>{
            console.log(err)
          })
        } else {
          this.notify('看清楚格式哦','error');
          return false;
        }
      });

    },
    setUserMsg (item) {
      this.$store.commit('setUserId', item.id)
      this.$store.commit('setUsername', item.username)
      this.$store.commit('setAvatar', item.avatar)
    },
    goback(index){
      this.$router.go(index)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/sign-up.scss";
</style>
