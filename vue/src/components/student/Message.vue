<template>

  <div class="container">
    <form class="form">
      <p class="title">个人信息 </p>
      <div class="flex">
        <label style="margin-right:10px">
          <input required="" placeholder="" type="text" class="input" style="width:100px" v-model="message1.name" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">姓名</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" class="input" style="width:212px" v-model="message1.sid" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">学号</span>
        </label>
      </div>

      <div class="flex">
        <label style="margin-right:10px">
          <input required="" placeholder="" type="text" class="input" style="width:40px" v-model="message1.sex" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">性别</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" class="input" style="width:272px" v-model="message1.tel" @change="state=true">
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">联系方式</span>
        </label>
      </div>

      <div class="flex">
        <label style="margin-right:10px">
          <input required="" placeholder="" type="text" class="input" style="width:80px" v-model="message1.date" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">入学年份</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" class="input"  style="width:233px" v-model="message1.college" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">所属学院</span>
        </label>
      </div>

      <span class="submit" @click="changeData1">保存</span>
      <p class="signin">修改信息后记得保存</p>


      <p class="title" style="margin-top: 20px">宿舍信息</p>
      <div class="flex">
        <label style="margin-right:10px">
          <input required="" placeholder="" type="text" class="input" style="width:100px" v-model="message2.sex" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">类型</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" class="input"  style="width:213px" v-model="message2.did" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">宿舍号</span>
        </label>
      </div>
      <div class="flex">
        <label>
          <input required="" placeholder="" type="text" class="input" style="width:40px" v-model="message2.building" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">栋</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" class="input" style="width:40px" v-model="message2.unit" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">单元</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" class="input" style="width:40px" v-model="message2.floor" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">楼层</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" class="input" style="width:40px" v-model="message2.room" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">房间</span>
        </label>

        <span class="span1" @click="changeData3">换宿</span>
      </div>

      <div class="flex">
        <label>
          <input required="" placeholder="" type="text" class="input" style="width:80px" v-model="message2.cost" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">余额</span>
        </label>
        <label>
          <input required="" placeholder="" type="text" class="input" style="width:80px" v-model="message2.number" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">床位数</span>
        </label>
        <label>
          <input required="" placeholder="" type="text" class="input" style="width:133px" v-model="message2.count" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">当前入住人数</span>
        </label>
      </div>

      <div class="flex">
        <label>
          <input required="" placeholder="" type="text" class="input" style="width:80px" v-model="message2.cost" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">余额</span>
        </label>
        <label>
          <input required="" placeholder="" type="text" class="input" style="width:135px" v-model="message2.state" disabled>
          <span style="color:green;position: absolute;font-size: 12px;top:30px;font-weight: bold">设备状态</span>
        </label>
        <span class="span1" @click="changeData4">报修</span>
      </div>
    </form>
    <form class="form" style="left:-120px">
      <p class="title">修改密码</p>
      <label>
        <input required="" placeholder="" type="password" class="input" style="width:352px" ref="password1">
        <span>新密码</span>
      </label>
      <label>
        <input required="" placeholder="" type="password" class="input" style="width:352px" ref="password2">
        <span>再次输入密码</span>
      </label>

      <span class="submit" @click="changeData2">保存</span>
    </form>

  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
  import axios from "axios"
  import router from "../../router.js";
  let password1 = ref()
  let password2 = ref()
  let state = false

  let message1 = ref({
    name: "",
    sid:"",
    sex:"",
    tel:"",
    date:"",
    college:"",
    state:"",
    did:"",
  })

let message2 = ref({
  did:"",
  building:"",
  unit:"",
  floor:"",
  room:"",
  number:0,
  count:0,
  state:"",
  cost:0,
  sex:"",
})

  onMounted(()=>{
    getData()
  })

  const getData=()=>{
    let uid = localStorage.getItem('uid')
    if(uid){
      axios.get(`http://localhost:8080/student/message/${uid}`).then(response=>{
        message1.value = response.data
        axios.get(`http://localhost:8080/dormitory/message/${response.data.did}`).then(response=>{
          message2.value = response.data
        }).catch(error=>{
          console.log(error)
        })
      }).catch(error=>{
        console.log(error)
      })
    }else{
      router.push("/")
    }
  }

  const changeData1=()=>{
    let uid = localStorage.getItem('uid')
    if(state){
      axios.put(`http://localhost:8080/student/${uid}`,message1.value).then(response=>{
        console.log(response.data)
        alert("个人信息修改成功")
        getData()
      }).catch(error=>{
        console.log(error)
      })
      state=false
    }
  }

  const changeData2=()=>{
    let uid = localStorage.getItem('uid')
    let authority = localStorage.getItem('authority')
    let p1 = password1.value.value
    let p2 = password2.value.value
    let user = {
      uid:uid,
      passwd:p1,
      authority:authority
    }
    if(p1&&p2&&p1===p2){
      axios.put(`http://localhost:8080/user/${uid}`,user).then(response=>{
        localStorage.setItem('passwd',p1)
        alert("密码修改成功")
        password1.value.value = ""
        password2.value.value = ""
      }).catch(error=>{
        console.log(error)
      })
    }
  }

  const changeData3=()=>{
    let did = prompt("请输入想要换的宿舍号：")
    if(did){
      axios.get(`http://localhost:8080/generateAuid`)
          .then(response => {
            let sid = localStorage.getItem('uid')
            let audit = {
              aid:response.data,
              sid:sid,
              type:"换宿",
              content:"我想要换宿到"+did+"宿舍去",
              state:"待审核",
              text:"",
            }
            axios.post(`http://localhost:8080/audit`,audit).then(response=>{
              alert("申请成功，等待审核")
            }).catch(error=>{
              console.log(error)
            })
          })
          .catch(error => {
            console.error(error);
          });
    }
  }

  const changeData4=()=>{
    let content = prompt("请输入报修的内容：")
    if(content){
      axios.get(`http://localhost:8080/generateAuid`)
          .then(response => {
            let sid = localStorage.getItem('uid')
            let audit = {
              aid:response.data,
              sid:sid,
              type:"报修",
              content:content,
              state:"待审核",
              text:"",
            }
            axios.post(`http://localhost:8080/audit`,audit).then(response=>{
              let dormitory = {
                ...message2.value,
                state:"待维修",
              }
              console.log(dormitory)
              axios.put(`http://localhost:8080/dormitory/${message2.value.did}`,dormitory).then(response=>{
                alert("报修成功，等待审核")
                getData()
              }).catch(error=>{
                console.log(error)
              })
            }).catch(error=>{
              console.log(error)
            })
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
</script>

<style scoped>
#app {

}
.container {
  height:600px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 150px 150px 150px;
  grid-template-areas: 'a b c'
                       'a d e'
                       'a f g';
}
/*.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); !* 3列等宽 *!
  grid-gap: 20px; !* 列间隙 *!
  padding: 20px;
}*/
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  font-size: 28px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title::before,.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message, .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  margin-top: 10px;
  width:350px;
  text-align: center;
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: 0.3s ease;
}

.submit:hover {
  cursor:pointer;
  background-color: rgb(56, 90, 194);
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}

.span1{
  width: 80px;
  height:26px;
  line-height: 26px;
  cursor:pointer;
  text-align: center;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  position: absolute;
  left:290px;
  font-weight: bold;
}
</style>