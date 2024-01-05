<template>
  <div class="container">
    <el-tabs v-model="message">
      <el-tab-pane :label="`未读消息(${state.unread.length})`" name="first">
        <el-table :data="state.unread" :show-header="false" style="width: 100%">
          <el-table-column>
            <template #default="scope">
              <span class="message-title">【{{ scope.row.title }}】{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" width="200">
            <template #default="expense">
              <span>{{new Date(expense.row.date).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })}}</span>
            </template>
          </el-table-column>
          <el-table-column width="120">
            <template #default="scope">
              <el-button size="small" @click="handleRead(scope.row)">标为已读</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <div class="handle-row">
          <el-button type="primary">全部标为已读</el-button>
        </div>-->
      </el-tab-pane>
      <el-tab-pane :label="`已读消息(${state.read.length})`" name="second">
        <template v-if="message === 'second'">
          <el-table :data="state.read" :show-header="false" style="width: 100%">
            <el-table-column>
              <template #default="scope">
                <span class="message-title">【{{ scope.row.title }}】{{scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="200">
              <template #default="expense">
                <span>{{new Date(expense.row.date).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template #default="scope">
                <el-button size="small" @click="handleRead(scope.row)">标记未读</el-button>
              </template>
            </el-table-column>
          </el-table>
<!--          <div class="handle-row">
            <el-button type="primary">全部标为未读</el-button>
          </div>-->
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts" name="Announcement">
import {ref, reactive, onMounted} from 'vue';
import axios from "axios"

const message = ref('first');
const state = reactive({
  unread: [],
  read: [],
});

onMounted(()=>{
  getData1()
  getData2()
})

const getData1=()=>{
  let sid = localStorage.getItem('uid')
  let state1 = "未读"
  axios.get(`http://localhost:8080/stuann/${sid}/${state1}`).then(response=>{
    console.log(response.data)
    axios.delete(`http://localhost:8080/announcementlist`,{data:response.data}).then(response=>{
      console.log(response.data)
      state.unread= response.data
      console.log(state)
    }).catch(error=>{
      console.log(error)
    })
  }).catch(error=>{
    console.log(error)
  })
}

const getData2=()=>{
  let sid = localStorage.getItem('uid')
  let state1 = "已读"
  axios.get(`http://localhost:8080/stuann/${sid}/${state1}`).then(response=>{
    console.log(response.data)
    axios.delete(`http://localhost:8080/announcementlist`,{data:response.data}).then(response=>{
      console.log(response.data)
      state.read=response.data
    }).catch(error=>{
      console.log(error)
    })
  }).catch(error=>{
    console.log(error)
  })
}

const handleRead = (row) => {
  let said = localStorage.getItem('uid')+row.aid
  axios.put(`http://localhost:8080/stuann/${said}`).then(response=>{
    console.log(response.data)
    getData1()
    getData2()
  }).catch(error=>{
    console.log(error)
  })
};
const handleDel = (row) => {
  console.log(row)
};
</script>
<style scoped>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}

</style>