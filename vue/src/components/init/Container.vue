<template>
  <!--
    <div>
      <span>username</span>
      <input type="text" ref="usernameInput" @blur="existsUser">
    </div>
    <div>
      <span>password</span>
      <input type="text" ref="passwordInput">
    </div>
    <button @click="submit">登录</button>
  -->
  <div class="container">
  <div id="form-ui" style="position: absolute;top:calc(50% - 330px);left:calc(50% - 215px)">
    <form action="" method="post" id="form">
      <div id="form-body">
        <div id="welcome-lines" style="margin-top: 60px">
          <div id="welcome-line-1">学生宿舍管理系统</div>
          <div id="welcome-line-2">Welcome Back</div>
        </div>
        <div id="input-area">
          <div class="form-inp">
            <input placeholder="用户名"  type="text" ref="usernameInput" @blur="existsUser" >
          </div>
          <div class="form-inp">
            <input placeholder="密码" type="password" ref="passwordInput">
          </div>
        </div>
<!--        <div id="submit-button-cvr" v-if="state === 0">
          <span id="submit-button">登陆 / 注册</span>
        </div>-->
        <div id="submit-button-cvr">
          <span id="submit-button" @click="submit1">登陆</span>
        </div>
<!--        <div id="submit-button-cvr" v-if="state === 2">
          <span id="submit-button" @click="submit2">注册</span>
        </div>-->

        <div class="loader">
          <div class="circle">
            <div class="dot"></div>
            <div class="outline"></div>
          </div>
          <div class="circle">
            <div class="dot"></div>
            <div class="outline"></div>
          </div>
          <div class="circle">
            <div class="dot"></div>
            <div class="outline"></div>
          </div>
          <div class="circle">
            <div class="dot"></div>
            <div class="outline"></div>
          </div>
        </div>
      </div>

    </form>
  </div>
  </div>


</template>

<script setup>
import {ref} from "vue";
import router from "../../router.js";
import axios from "axios";

let usernameInput = ref()
let passwordInput = ref()
let state = ref(0)



const submit1=()=>{
  const uid = usernameInput.value.value
  const passwd = passwordInput.value.value
  console.log(uid,passwd)
  axios.post(`http://localhost:8080/user/login?uid=${uid}&passwd=${passwd}`).then(response =>{
    console.log("sdadsadasda")
    localStorage.setItem('uid', uid);
    localStorage.setItem('passwd', passwd);
    localStorage.setItem('authority', response.data);
    if(response.data === 0){
      router.push("/manager")
    }
    if(response.data === 1){
      router.push("/student")
    }
  }).catch(error=>{
    console.log(error)
  })
}


/*const submit2=()=>{
  const uid = usernameInput.value.value
  const passwd = passwordInput.value.value
  const user = {
    uid:uid,
    passwd:passwd,
    authority:1,
  }
  axios.post(`http://localhost:8080/user`,user).then(response =>{
    alert("注册成功！！")
    state.value = 1
  }).catch(error=>{
    console.log(error)
  })
}*/

const existsUser = () => {
  const uid = usernameInput.value.value;
  if(uid !== ""){
      axios.post(`http://localhost:8080/user/check?uid=${uid}`).then(response => {
        console.log(response.data);
        if (response.data) {
          state.value = 1
        } else {
          state.value = 2
        }
      }).catch(error => {
        console.log('错误:', error);
      });
  }else{
    state.value = 0
  }

};

</script>

<style scoped>
#form {
  display: grid;
  place-items: center;
  width: 300px;
  height: 472px;
  padding: 25px;
  background-color:white;
  box-shadow: 0px 15px 60px #409EFF;
  outline: 1px solid #409EFF;
  border-radius: 10px;
  margin: 75px auto 0 auto

}

#form-body {
  position: absolute;
  top: 50%;
  right: 25px;
  left: 25px;
  width: 230px;
  margin: -220px auto 0 auto;
}

#welcome-lines {
  text-align: center;
  line-height: 1;
}

#welcome-line-1 {
  color: #409EFF;
  font-weight: 600;
  font-size: 20px;
}

#welcome-line-2 {
  color: #409EFF;
  font-size: 18px;
  margin-top: 17px;
  margin-bottom: 70px;
}

#input-area {
  margin-top: 40px;
}

.form-inp {
  padding: 11px 25px;
  background: transparent;
  border: 1px solid #409EFF;
  line-height: 1;
  border-radius: 8px;
}

.form-inp:focus {
  border: 1px solid #409EFF;
}

.form-inp:first-child {
  margin-bottom: 15px;
}

.form-inp input {
  width: 100%;
  background: none;
  font-size: 13px;
  color: #409EFF;
  border: none;
  padding: 0;
  margin: 0;
}

.form-inp input:focus {
  outline: none;
}

#submit-button-cvr {
  margin-top: 20px;
}

#submit-button {
  display: block;
  width: 204px;
  color: #409EFF;
  background-color: transparent;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  padding: 14px 13px 12px 13px;
  border: 0;
  outline: 1px solid #409EFF;
  border-radius: 8px;
  line-height: 1;
  cursor: pointer;
  transition: all ease-in-out .3s;
  text-align: center;
}

#submit-button:hover {
  transition: all ease-in-out .3s;
  background-color: #409EFF;
  color: #161616;
  cursor: pointer;
}

#forgot-pass {
  text-align: center;
  margin-top: 10px;
}

#forgot-pass a {
  color: #409EFF;
  font-size: 12px;
  text-decoration: none;
}

#bar {
  position: absolute;
  left: 50%;
  bottom: -50px;
  width: 28px;
  height: 8px;
  margin-left: -33px;
  background-color: #409EFF;
  border-radius: 10px;
}

/*#bar:before,
#bar:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ececec;
  border-radius: 50%;
}

#bar:before {
  right: -20px;
}

#bar:after {
  right: -38px;
}*/

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  --color: #409EFF;
  --animation: 2s ease-in-out infinite;
  margin: 40px auto 0 auto;
}

.loader .circle {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;
  border: solid 2px var(--color);
  border-radius: 50%;
  margin: 0 10px;
  background-color: transparent;
  animation: circle-keys var(--animation);
}

.loader .circle .dot {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color);
  animation: dot-keys var(--animation);
}

.loader .circle .outline {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: outline-keys var(--animation);
}

.circle:nth-child(2) {
  animation-delay: 0.3s;
}

.circle:nth-child(3) {
  animation-delay: 0.6s;
}

.circle:nth-child(4) {
  animation-delay: 0.9s;
}

.circle:nth-child(5) {
  animation-delay: 1.2s;
}

.circle:nth-child(2) .dot {
  animation-delay: 0.3s;
}

.circle:nth-child(3) .dot {
  animation-delay: 0.6s;
}

.circle:nth-child(4) .dot {
  animation-delay: 0.9s;
}

.circle:nth-child(5) .dot {
  animation-delay: 1.2s;
}

.circle:nth-child(1) .outline {
  animation-delay: 0.9s;
}

.circle:nth-child(2) .outline {
  animation-delay: 1.2s;
}

.circle:nth-child(3) .outline {
  animation-delay: 1.5s;
}

.circle:nth-child(4) .outline {
  animation-delay: 1.8s;
}

.circle:nth-child(5) .outline {
  animation-delay: 2.1s;
}

@keyframes circle-keys {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dot-keys {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes outline-keys {
  0% {
    transform: scale(0);
    outline: solid 20px var(--color);
    outline-offset: 0;
    opacity: 1;
  }

  100% {
    transform: scale(1);
    outline: solid 0 transparent;
    outline-offset: 20px;
    opacity: 0;
  }
}

.container {
  width: 100vw;
  height: 100vh;
  --s: 100px; /* control the size */
  --c1: #f8b195;
  --c2: #355c7d;

  --_g: var(--c2) 6% 14%, var(--c1) 16% 24%, var(--c2) 26% 34%,
  var(--c1) 36% 44%, var(--c2) 46% 54%, var(--c1) 56% 64%, var(--c2) 66% 74%,
  var(--c1) 76% 84%, var(--c2) 86% 94%;
  background: radial-gradient(
      100% 100% at 100% 0,
      var(--c1) 4%,
      var(--_g),
      #0008 96%,
      #0000
  ),
  radial-gradient(
      100% 100% at 0 100%,
      #0000,
      #0008 4%,
      var(--_g),
      var(--c1) 96%
  )
  var(--c1);
  background-size: var(--s) var(--s);
}



</style>