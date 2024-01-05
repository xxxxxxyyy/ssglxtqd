<template>
  <div>
    <div>
      <span class="span box" @click="router.push(`/manager/buildingmanagement/sexs`)">宿舍</span>
    </div>
    <div class="box" v-for="sex in sexs" @click="router.push(`/manager/buildingmanagement/buildings?sex=${sex}`)">{{ sex }}</div>
  </div>

</template>

<script setup>
import router from "../../router.js";
import {ref} from "vue";

let sexs = ref(["男生宿舍","女生宿舍"])
</script>

<style scoped>
.box{
  display: inline-block;
  margin: 10px;
  font-size: 30px;
  color:black;
  width:400px;
  height:300px;
  line-height: 300px;
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