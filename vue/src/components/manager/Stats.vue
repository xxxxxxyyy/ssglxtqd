<template>
  <div>
    <el-radio-group v-model="year" size="large" style="margin:0 20px 20px 0" @change="change">
      <el-radio-button v-for="year in yearList" :label="year"/>
    </el-radio-group>
    <el-radio-group v-model="type" size="large" style="margin:0 20px 20px 0" @change="change">
      <el-radio-button v-for="type in typeList" :label="type"/>
    </el-radio-group>
  </div>

  <div id="main" style="width: 880px; height: 380px;"></div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import * as echarts from 'echarts';
import axios from "axios";

let myChart

let yearList=ref([])
let typeList=ref(["人数","缴费","访客","违纪"])
let year = ref()
let type = ref("人数")

let value1 = ref([])
let value2 = ref([])

let x1=[""]
let x2=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]

let legend = [["男生人数","女生人数"], ["男生缴费","女生缴费"],["男生访客","女生访客"],["男生违纪","女生违纪"]]

let option = {
  width:650,
  tooltip:{},
  title: {
    text: ""
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 20,
    top: 50,
    data:legend[0]
  },
  xAxis: {
    data: x1,
    interval:1
  },
  yAxis:{},
  series: [
    {
      name: legend[0][0],
      type: "bar",
      data: value1.value
    },
    {
      name: legend[0][1],
      type: "bar",
      data: value2.value
    }
  ],
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
}

const change=async () => {
  switch (type.value) {
    case "人数":
      await getNumberList()
      break;
    case "缴费":
      await getExpenseList()
      break;
    case "访客":
      await getVisitorList()
      break;
    case "违纪":
      await getViolationList()
      break;
  }
  changeData()
  updateChart()
}

const changeData =()=>{
  let index = typeList.value.indexOf(type.value)
  option.legend.data=legend[index]
  option.xAxis.data=index===0?x1:x2
  option.series[0].name=legend[index][0]
  option.series[0].data=value1.value
  option.series[1].name=legend[index][1]
  option.series[1].data=value2.value
}

const updateChart = ()=>{
  option.title.text = year.value + " 年度男女" + type.value + "情况统计分析"
  myChart.setOption(option)
}

const initChart = () => {
  myChart = echarts.init(document.getElementById('main'));
  option.title.text = year.value + " 年度男女" + type.value + "情况统计分析"
  myChart.setOption(option);
};

const getYearList=async () => {
  try{
    let response = await axios.get('http://localhost:8080/studentyear')
    yearList.value = response.data
    year.value = response.data[0]
    console.log(year.value)
  }catch(error){
    console.log(error)
  }
}

const getNumberList = async ()=>{
  try{
    let response = await axios.get(`http://localhost:8080/student/${year.value}`)
    value1.value = []
    value2.value = []
    value1.value.push(response.data[1])
    value2.value.push(response.data[2])
  }catch(error){
    console.log(error)
  }
}

const getExpenseList=async () => {
  try {
    let response = await axios.get(`http://localhost:8080/expense/${year.value}`)
    value1.value = response.data.male
    value2.value = response.data.female
  } catch (error) {
    console.log(error)
  }
}

const getVisitorList=async () => {
  try {
    let response = await axios.get(`http://localhost:8080/visitor/${year.value}`)
    value1.value = response.data.male
    value2.value = response.data.female
  } catch (error) {
    console.log(error)
  }
}

const getViolationList=async ()=>{
  try {
    let response = await axios.get(`http://localhost:8080/violation/${year.value}`)
    value1.value = response.data.male
    value2.value = response.data.female
  } catch (error) {
    console.log(error)
  }
}

const initData=async () => {
  await getYearList()
  await getNumberList()
  changeData()
  initChart();
}


onMounted(() => {
  initData()
});
</script>

<style scoped>

</style>

