<template>
  <div>
    <span class="box span" @click="router.push(`/manager/buildingmanagement/sexs`)">{{sex}}</span>
    <span class="box span" @click="router.push(`/manager/buildingmanagement/buildings?sex=${sex}`)">{{building}} 栋</span>
    <span class="box span" @click="router.push(`/manager/buildingmanagement/units?sex=${sex}&building=${building}`)">{{unit}} 单元</span>
    <span class="box span" @click="router.push(`/manager/buildingmanagement/floors?sex=${sex}&building=${building}&unit=${unit}`)">{{floor}} 层</span>
    <span class="box span" @click="router.push(`/manager/buildingmanagement/rooms?sex=${sex}&building=${building}&unit=${unit}&floor=${floor}`)">房间</span>
  </div>
  <div class="box" v-for="room in rooms">{{ room }}</div>
  <div class="box" @click="add">
    <el-icon style="position: relative;top:5px;"><CirclePlusFilled /></el-icon>
  </div>
</template>

<script setup>
import router from "../../router.js";
import {onMounted, ref} from "vue";
import {CirclePlusFilled} from "@element-plus/icons-vue"
import axios from "axios";

let sex = router.currentRoute.value.query.sex
let building = router.currentRoute.value.query.building
let unit = router.currentRoute.value.query.unit
let floor = router.currentRoute.value.query.floor

let rooms =ref([])

  onMounted(()=>{
    getData()
  })

  const getData=()=>{
    axios.get(`http://localhost:8080/dormitorylc3?building=${building}&unit=${unit}&floor=${floor}`).then(response=>{
      console.log(response.data)
      rooms.value = response.data
    }).catch(error=>{
      console.log(error)
    })
  }

const add=()=> {
  let room = prompt("请输入房间号")
  if (room) {
       let dormitory = {
          did:building + unit + floor + room,
          building: building,
          unit: unit,
          floor:floor,
          room:room,
          number: 6,
          count:0,
          state:"一切完好",
          cost:0,
          sex: sex
        }
        axios.post("http://localhost:8080/dormitory",dormitory).then(response=>{
          console.log(response.data)
          getData()
        }).catch(error=>{
          console.log(error)
        })
  }
}


</script>

<style scoped>
.box{
  display: inline-block;
  margin: 10px;
  font-size: 30px;
  color:black;
  width:100px;
  height:100px;
  line-height: 100px;
  text-align: center;
  border-radius: 10px;
  cursor:pointer;
  transition: all 0.2s linear;
  box-shadow: 5px 5px 5px #9ea0a4;
  font-family: 阿里妈妈刀隶体;
}
.box:hover{
  box-shadow: 10px 10px 10px #9ea0a4;
  transform: translateY(-5px) ;
  color:#409eff;
}
.span{
  font-size: 20px;
  width:auto;
  padding:0 10px;
  height:40px;
  line-height: 40px;
  cursor: pointer;
}
</style>